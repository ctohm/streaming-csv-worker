/// <reference types="@cloudflare/workers-types" />
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
    detail: { [s: string]: number }
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
export type WebSocketWithTimings = {
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
        let separator = '[', encoder = new TextEncoder(), { readable, writable } = new TransformStream()
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
        console.timeLog('TransformStreamer')

        transformStreamer.on('end', () => {
            console.info('transformStreamer end')
            console.timeLog('TransformStreamer')
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
            complete: (result) => {
                console.timeEnd('StreamingCSVParser');
                this.sendFinalTiming({ requestEntry, sourceUrl, session })
            }
        })
 
        originRes.body. pipeTo(streamingCSVParser.writable)

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
                start: websocketTimings.baseLine,
                startTime: websocketTimings.baseLine,
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
                detail: { ...websocketTimings, now: wsTimings.now() }
            }
        completeMessage.detail.baseLine = completeMessage.detail.now - (requestDuration + responseDuration)
        console.log(completeMessage)
        this.emitWs(session.webSocket, completeMessage as TSourceEntry)

    }
    private async getSourceResponse({ sourceUrl, reqHeaders, ip }: TSourceCsvParams): Promise<{
        originRes: Response;

        requestEntry: TSourceEntry & { detail: TWsTimingSnapshot },
        session: WebSocketWithTimings
    }> {

        let session = await this.state.sessions.get(ip) as WebSocketWithTimings
        if (!session) throw new Error('No session found for IP ' + ip)
        if (!session.timings) throw new Error('webSocket session has no "timings" property')

        let wsTimings = session.timings as HeadersWithTimings,
            websocketTimings = wsTimings.toJSON(),
            altStartTime = reqHeaders.starttime,
            startTime = websocketTimings.now + websocketTimings.baseLine

        const originRes = await fetch(sourceUrl, { headers: reqHeaders })
        if (!originRes.body || !originRes.ok) {
            throw new Error(originRes.statusText)
        }

        let requestEnd = wsTimings.now(),
            cf = originRes.cf,
            endTime = requestEnd + websocketTimings.baseLine,
            duration = endTime - startTime,


            requestEntry = {
                name: 'source_csv',
                start: startTime,
                requestStart: websocketTimings.now,
                requestEnd,
                duration,
                startTime,
                altStartTime,
                endTime,
                baseLine: websocketTimings.baseLine,
                detail: websocketTimings,
                cf
            } as TSourceEntry & { detail: TWsTimingSnapshot }
        console.log(requestEntry)
        // console.log('getSourceResponse', { ip, requestEntry, session, isWebsocket: session.webSocket instanceof WebSocket })
        this.emitWs(session.webSocket, requestEntry)
        return { originRes, session, requestEntry }
    }
    private emitWs(webSocket: WebSocket | undefined, payload: TSourceEntry & { detail: TWsTimingSnapshot }): void {
        if (!(webSocket instanceof WebSocket)) {
            console.warn(`session.webSocket is not an instance of WebSocket`)
        } else {
            try {
                webSocket.send(JSON.stringify(payload))
            } catch (err) {
                console.error(err)
            }
        }
    }

    async handleSession({ client, webSocket, ip }: { client: WebSocket, webSocket: WebSocket, ip: string }) {
        //@ts-ignore
        webSocket.accept()
        let existing = await this.state.sessions.get(ip)



        if (existing && existing.webSocket instanceof WebSocket && existing.webSocket.readyState === 1) {
            console.log({ existing: true, readyState: existing.webSocket.readyState })
            return
        }
        existing = existing || { ip, webSocket, timings: null, created: Date.now() } as unknown as WebSocketWithTimings
        await this.state.sessions.set(ip, existing)
        webSocket.addEventListener('error', err => {
            console.error(err)
        })
       // client.addEventListener('message', msg => console.log({ clientMessage: msg.data }))
        webSocket.addEventListener("message", async event => {

            let payload = JSON.parse(event.data)
            if (payload.timeOrigin && payload.now && payload.timestamp) {
                const timings = new HeadersWithTimings({
                    browserTimeOrigin: payload.timeOrigin,
                    startTime: payload.now,
                    timestamp: payload.timestamp
                })
                existing = await (this.state.sessions.get(ip) || { ip, webSocket, timings }) as WebSocketWithTimings
                existing.timings = timings
                existing.ip = ip
                existing.webSocket = existing.webSocket || webSocket
                let { readyState } = client
                await this.state.sessions.set(ip, existing)

                let jsonTimings = timings.toJSON ? timings.toJSON() : timings
                console.log('payload has timeOrigin', {
                    readyState, payload, timings: jsonTimings, webSocket: existing.webSocket
                })
                webSocket.send(JSON.stringify({ name: 'ready', ...jsonTimings }))

            } else if (payload.type === 'beacon' && existing && existing.timings) {
                webSocket.send(JSON.stringify(existing.timings))
            } else {
                console.info({ otherPayload: payload })
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
        await this.handleSession({ webSocket: server, client, ip })
        return new Response(null, {
            status: 101,
            webSocket: client
        })
    }
    async fetch(req: Request): Promise<Response> {


        let method: string = req.url.split('/call/').pop() as string
        let cfIP = req.headers.get("ip") || req.headers.get("CF-Connecting-IP") || '127.0.0.1';
        if (method === 'getWebsocketServer') {
            console.info({ method, cfIP })
            //console.log(Object.fromEntries(req.headers))
            return this.getWebsocketServer({ ip: cfIP } as TSourceCsvParams)
        }
        let body = await req.json();



        let { sourceUrl, reqHeaders, ip } = (body[0] || {}) as TSourceCsvParams,
            jsonParams = { sourceUrl, reqHeaders, ip }

     //   console.info({ reqHeaders, method, cfIP, ip })

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