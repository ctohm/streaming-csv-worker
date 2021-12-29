import { IttyDurable } from 'itty-durable'
import { EnvWithDurableObject, json } from 'itty-router-extras';
import { default as Papa, TransformStreamer } from './lib/TransformStreamer'
import { StreamingCSVParser } from './lib/StreamingCSVParser';
import { FetchPapaStreamer } from './lib/FetchPapaStreamer'
import { HeadersWithTimings } from './HeadersWithTimings';
import { websocket } from './bench/websocket';
export interface IRequestParams {
    startTime?: string,
    started_at?: string,
    ip?: string
    sourceUrl?: string

}
type TSourceCsvParams = {
    sourceUrl: string;
    startTime: string;
    started_at: string;
    reqHeaders: Record<string, string>;
    ip: string
};
type ErrorObject = {
    name: string;
    message: string;
    url?: string;
    stack: string[];
};
export class DurableWk extends IttyDurable implements DurableObject {
    [s: string]: unknown
    sessions: Map<string, WebSocket>
    constructor(state: DurableObjectState, env: EnvWithDurableObject) {
        super(state, env)
        this.counter = 0
        this.sessions = new Map<string, WebSocket>()
    }





    async getWithFetchStreamer({ sourceUrl, startTime, started_at, reqHeaders, ip }: TSourceCsvParams): Promise<Response> {
        console.time('fetch:getWithFetchStreamer');
        let separator = '[', encoder = new TextEncoder(), { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
        const { originRes, websocket, responseHeaders } = await this.getSourceResponse({ sourceUrl, startTime, started_at, reqHeaders, ip })
        const writer = writable.getWriter();

        new FetchPapaStreamer({
            download: true,
            chunk: (result) => {
                writer.write(encoder.encode(separator + JSON.stringify(result.data).replace(/^\[\[(.*)\]\]$/, '[$1]')));
                separator = ',';
            },
            complete: (result) => {
                console.timeEnd('fetch:getWithFetchStreamer');
                this.emitWs(websocket, responseHeaders.appendPartialTiming('fetchStreamer.complete'))
                writer.write(encoder.encode(']'));
                writer.close();
            }
        }).stream(originRes)
        return new Response(readable, {
            headers: responseHeaders
        })



    }
    async getWithTransformStreamer({ sourceUrl, startTime, started_at, reqHeaders, ip }: TSourceCsvParams): Promise<Response> {
        console.time('TransformStreamer')
        const { originRes, websocket, responseHeaders } = await this.getSourceResponse({ sourceUrl, startTime, started_at, reqHeaders, ip }),
            transformStreamer = new TransformStreamer({
                download: true
            })
        if (!originRes.body) throw new Error('Could not get a parsable body')
        originRes.body.pipeTo(transformStreamer.writable).then(() => {
            console.timeEnd('TransformStreamer')
            this.emitWs(websocket, responseHeaders.appendPartialTiming('TransformStreamer.end'))
        })

        return new Response(
            transformStreamer.readable, {
            headers: responseHeaders
        });

    }

    async getWithStreamingCSVParser({ sourceUrl, startTime, started_at, reqHeaders, ip }: TSourceCsvParams): Promise<Response> {
        console.time('StreamingCSVParser')
        const { originRes, websocket, responseHeaders } = await this.getSourceResponse({
            sourceUrl, startTime, started_at, reqHeaders, ip
        });
        if (!originRes.body) throw new Error('Could not get a parsable body')
        const streamingCSVParser = new StreamingCSVParser({
            delimiter: ',',
            from_line: 10,
            skip_lines_with_error: true,
        }, responseHeaders)

        originRes.body.pipeTo(streamingCSVParser.writable).then(() => {
            console.timeEnd('StreamingCSVParser')
            this.emitWs(websocket, responseHeaders.appendPartialTiming('source_csv.end'))
        })

        return new Response(
            streamingCSVParser.readable, {
            headers: responseHeaders
        });
    }

    async getSourceResponse({ sourceUrl, startTime, started_at, reqHeaders, ip }: TSourceCsvParams): Promise<{ originRes: Response; responseHeaders: HeadersWithTimings; websocket: WebSocket | undefined; }> {

        let websocket = this.sessions.get(ip)
        const init = {
            started_at,
            startTime,
            'content-type': 'application/json',
            'cache-control': 'no-cache, no-store, s-maxage=0, max-age=0',
        }
        const responseHeaders = new HeadersWithTimings(init as Record<string, string>)
        this.emitWs(websocket, responseHeaders.appendPartialTiming('source_csv.sent_request'))
        const originRes = await fetch(sourceUrl, { headers: reqHeaders })
        if (!originRes.body || !originRes.ok) {
            throw new Error(originRes.statusText)
        }
        this.emitWs(websocket, responseHeaders.appendPartialTiming('source_csv.got_response'))
        return { originRes, responseHeaders, websocket }
    }
    private emitWs(websocket: WebSocket | undefined, payload: { [s: string]: string | number }): void {
        if (websocket instanceof WebSocket && websocket.readyState === websocket.OPEN) websocket.send(JSON.stringify(payload))
    }
    async handleSession(webSocket: WebSocket, ip: string) {
        //@ts-ignore
        webSocket.accept()

        let existing = this.sessions.get(ip)
        console.log({ existing })
        if (existing && existing instanceof WebSocket && existing.readyState === existing.OPEN) {
            console.log({ OPEN: existing.OPEN })
            return
        }
        this.sessions.set(ip, webSocket)
        webSocket.addEventListener("close", () => {
            this.sessions.delete(ip)
            webSocket.close(1011, "WebSocket close");
        });
        return webSocket
        //webSocket.addEventListener("error", () => this.sessions.delete(ip) && webSocket.close());
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



        let { sourceUrl, startTime, started_at, reqHeaders, ip } = (body[0] || {}) as TSourceCsvParams,

            jsonParams = { sourceUrl, startTime, started_at, reqHeaders, ip }

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