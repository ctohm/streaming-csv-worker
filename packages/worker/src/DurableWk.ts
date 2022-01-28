import { IttyDurable, DurableStateWithSessions, DurableSessionsMap } from 'itty-durable'
import { EnvWithDurableObject, json } from 'itty-router-extras';

import { FetchPapaStreamer, StreamingCSVParser, TransformStreamer } from '@ctohm/streaming-csv-adapters'
import { HeadersWithTimings, TWsTimingSnapshot } from './HeadersWithTimings';

export interface IRequestParams {
    startTime?: string,
    timeOrigin?: string,
    ip?: string
    sourceUrl?: string

}
type TSourceEntry = {
    name: string;
    start: number;
    startTime: number;
    duration: number;
    endTime: number;
    baseLine: number;
}

type TSourceCsvParams = {
    sourceUrl: string;
    startTime?: string;
    timeOrigin?: string;
    reqHeaders: Record<string, string>;
    ip: string
};
type ErrorObject = {
    name: string;
    message: string;
    url?: string;
    stack: string[];
};
type WebSocketWithTimings = {
    webSocket: WebSocket,
    timings?: HeadersWithTimings
}
export class DurableWk extends IttyDurable<WebSocketWithTimings> implements DurableObject {
    [s: string]: unknown

    constructor(state: DurableStateWithSessions<WebSocketWithTimings>, env: EnvWithDurableObject) {
        super(state, env)
        this.counter = 0
        this.state.sessions = new Map<string, WebSocketWithTimings>()
    }





    async getWithFetchStreamer({ sourceUrl, reqHeaders, ip }: TSourceCsvParams): Promise<Response> {
        console.time('fetch:getWithFetchStreamer');
        let separator = '[', encoder = new TextEncoder(), { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
        const { originRes, session, requestEntry } = await this.getSourceResponse({ sourceUrl, reqHeaders, ip })
        const writer = writable.getWriter();

        new FetchPapaStreamer({
            download: true,
            chunk: (result) => {
                writer.write(encoder.encode(separator + JSON.stringify(result.data).replace(/^\[\[(.*)\]\]$/, '[$1]')));
                separator = ',';
            },
            complete: (result) => {
                console.timeEnd('fetch:getWithFetchStreamer');
                writer.write(encoder.encode(']'));
                writer.close();
                this.sendFinalTiming({ requestEntry, sourceUrl, session })
            }
        }).stream(originRes)
        return new Response(readable, {
            headers: {
                'content-type': 'application/json',
                'cache-control': 'no-cache, no-store, s-maxage=0, max-age=0',
            }
        })



    }
    async getWithTransformStreamer({ sourceUrl, reqHeaders, ip }: TSourceCsvParams): Promise<Response> {
        console.time('TransformStreamer')
        const { originRes, session, requestEntry } = await this.getSourceResponse({ sourceUrl, reqHeaders, ip }),
            transformStreamer = new TransformStreamer({
                download: true
            })

        if (!originRes.body) throw new Error('Could not get a parsable body')
        originRes.body.pipeTo(transformStreamer.writable).then(() => {
            this.sendFinalTiming({ requestEntry, sourceUrl, session })
            console.timeEnd('TransformStreamer')

        })

        return new Response(
            transformStreamer.readable, {
            headers: {
                'content-type': 'application/json',
                'cache-control': 'no-cache, no-store, s-maxage=0, max-age=0'
            }
        });

    }

    async getWithStreamingCSVParser({ sourceUrl, reqHeaders, ip }: TSourceCsvParams): Promise<Response> {
        console.time('StreamingCSVParser')
        const { originRes, session, requestEntry } = await this.getSourceResponse({
            sourceUrl, reqHeaders, ip
        });
        if (!originRes.body) throw new Error('Could not get a parsable body')
        const streamingCSVParser = new StreamingCSVParser({
            delimiter: ',',
            from_line: 10,
            skip_lines_with_error: true,
        })

        originRes.body.pipeTo(streamingCSVParser.writable).then(() => {
            console.timeEnd('StreamingCSVParser')
            this.sendFinalTiming({ requestEntry, sourceUrl, session })
        })

        return new Response(
            streamingCSVParser.readable, {
            headers: {
                'content-type': 'application/json',
                'cache-control': 'no-cache, no-store, s-maxage=0, max-age=0'
            }
        });
    }
    private sendFinalTiming({ requestEntry, sourceUrl, session }: { requestEntry: TSourceEntry, sourceUrl: string, session: WebSocketWithTimings }) {
        let wsTimings = session.timings as HeadersWithTimings

        let {
            name,
            startTime: requestStart,
            duration: requestDuration,
            endTime: requestEnd,
            baseLine

        } = requestEntry,
            endTime = wsTimings.now() + baseLine,
            responseDuration = endTime - requestEnd,

            url = new URL(sourceUrl),
            websocketTimings = wsTimings.toJSON(),
            completeMessage = {
                name,
                start: requestStart,
                startTime: requestStart,
                requestStart,
                requestDuration,
                requestEnd,
                responseStart: requestEnd,
                responseDuration,
                duration: requestDuration + responseDuration,
                responseEnd: endTime,
                endTime,
                entryType: 'final',
                url: url.searchParams.get('fileName') + '.csv',
                details: { websocketTimings, now: wsTimings.now() }
            }
        console.log(completeMessage)
        this.emitWs(session.webSocket, completeMessage as TSourceEntry)

    }
    private async getSourceResponse({ sourceUrl, reqHeaders, ip }: TSourceCsvParams): Promise<{
        originRes: Response;

        requestEntry: TSourceEntry & { details: TWsTimingSnapshot },
        session: WebSocketWithTimings
    }> {

        let session = this.state.sessions.get(ip) as WebSocketWithTimings
        if (!session) throw new Error('No session found for IP ' + ip)
        if (!session.timings) throw new Error('webSocket session has no "timings" property')

        let wsTimings = session.timings as HeadersWithTimings,
            websocketTimings = wsTimings.toJSON(),
            startTime = wsTimings.now() + websocketTimings.baseLine

        const originRes = await fetch(sourceUrl, { headers: reqHeaders })
        if (!originRes.body || !originRes.ok) {
            throw new Error(originRes.statusText)
        }
        console.info(Object.fromEntries(originRes.headers))

        let endTime = wsTimings.now() + websocketTimings.baseLine,
            duration = endTime - startTime,


            requestEntry = {
                name: 'source_csv',
                start: startTime,
                startTime,
                duration,
                endTime,
                baseLine: websocketTimings.baseLine,
                details: websocketTimings
            } as TSourceEntry & { details: TWsTimingSnapshot }
        console.log(requestEntry)
        this.emitWs(session.webSocket, requestEntry)
        return { originRes, session, requestEntry }
    }
    private emitWs(webSocket: WebSocket | undefined, payload: TSourceEntry & { details: TWsTimingSnapshot }): void {
        if (webSocket instanceof WebSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify(payload))
        } else {
            console.warn({ OPEN: WebSocket.OPEN, readyState: webSocket && webSocket.readyState })
        }
    }
    async lystSessions() {
        return Object.fromEntries(this.state.sessions)
    }
    async handleSession(webSocket: WebSocket, ip: string) {
        //@ts-ignore
        webSocket.accept()
        let existing = this.state.sessions.get(ip)



        if (existing && existing.webSocket instanceof WebSocket && existing.webSocket.readyState === existing.webSocket.OPEN) {
            console.log({ readyState: existing.webSocket.readyState })
            return
        }
        existing = existing || { webSocket, timings: null, created: Date.now() } as WebSocketWithTimings
        this.state.sessions.set(ip, existing)
        webSocket.addEventListener("message", event => {

            let payload = JSON.parse(event.data)
            if (payload.timeOrigin && payload.now && payload.timestamp) {
                console.log({ payload, })
                const timings = new HeadersWithTimings({
                    timeOrigin: payload.timeOrigin,
                    startTime: payload.now,
                    timestamp: payload.timestamp
                })
                existing = (this.state.sessions.get(ip) || { webSocket, timings }) as WebSocketWithTimings
                existing.timings = timings
                this.state.sessions.set(ip, existing)


                console.log({ timings: timings.toJSON ? timings.toJSON() : timings, existing })
            } else if (payload.type === 'beacon' && existing && existing.timings) {
                webSocket.send(JSON.stringify(existing.timings))
            } else {
                console.info(payload)
            }
        })
        webSocket.addEventListener("close", () => {
            this.state.sessions.delete(ip)
            // if (webSocket.readyState === webSocket.OPEN) webSocket.close(1011, "WebSocket close");
        });
        return webSocket
        //webSocket.addEventListener("error", () => this.state.sessions.delete(ip) && webSocket.close());
    }

    async getWebsocketServer({ ip }: TSourceCsvParams): Promise<Response> {
        const [client, server] = Object.values(new WebSocketPair())
        await this.handleSession(server, ip)
        return new Response(null, {
            status: 101,
            webSocket: client
        })
    }
    async fetch(req: Request): Promise<Response> {


        let method: string = req.url.split('/call/').pop() as string
        if (method === 'getWebsocketServer') {
            let ip = req.headers.get("CF-Connecting-IP") || '127.0.0.1';
            return this.getWebsocketServer({ ip } as TSourceCsvParams)
        }

        let body = await req.json();



        let { sourceUrl, reqHeaders, ip } = (body[0] || {}) as TSourceCsvParams,

            jsonParams = { sourceUrl, reqHeaders, ip }

        try {

            if (typeof this[method] === 'function') {

                console.log({ method })
                // eslint-disable-next-line @typescript-eslint/ban-types
                return (this[method] as Function)(jsonParams).then((result: unknown) => {
                    return result instanceof Response ? result : new Response(JSON.stringify(result), {
                        headers: {
                            "content-type": "application/json",
                            "cache-control": "no-cache, no-store, s-maxage=1",
                            "access-control-allow-origin": "*"
                        }
                    })
                })
            }
            return json(jsonParams)
        } catch (err) {
            const httpError = err as Error & { status: number }
            return json(this.processError(httpError, {}), { status: httpError.status || 500 })
        }
    }
    protected processError(err: Error & { status?: unknown, url?: string }, extra: { [s: string]: string | number }): ErrorObject & { eventId?: string } {

        err.status = err.status || 500
        return { name: err.name, message: err.message, url: err.url, stack: (err.stack || '').split('\n'), ...extra }
    }
}