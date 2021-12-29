import { IttyDurable } from 'itty-durable'
import { EnvWithDurableObject, json } from 'itty-router-extras';
import { default as Papa, TransformStreamer } from './lib/TransformStreamer'
import { StreamingCSVParser } from './lib/StreamingCSVParser';
import { FetchPapaStreamer } from './lib/FetchPapaStreamer'
import { HeadersWithTimings } from './HeadersWithTimings';
export interface IRequestParams {
    startTime?: string,
    started_at?: string
}
type TSourceCsvParams = {
    sourceUrl: string;
    startTime: string;
    started_at: string;
    reqHeaders: Record<string, string>;
    ip: string
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
                if (websocket instanceof WebSocket) websocket.send(JSON.stringify(responseHeaders.appendPartialTiming('fetchStreamer.complete')))
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
            if (websocket instanceof WebSocket) websocket.send(JSON.stringify(responseHeaders.appendPartialTiming('TransformStreamer.end')))
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
            if (websocket instanceof WebSocket) websocket.send(JSON.stringify(responseHeaders.appendPartialTiming('source_csv.end')))
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
        if (websocket instanceof WebSocket) websocket.send(JSON.stringify(responseHeaders.appendPartialTiming('source_csv.sent_request')))
        const originRes = await fetch(sourceUrl, { headers: reqHeaders })
        if (!originRes.body || !originRes.ok) {
            throw new Error(originRes.statusText)
        }
        if (websocket instanceof WebSocket) websocket.send(JSON.stringify(responseHeaders.appendPartialTiming('source_csv.got_response')))
        return { originRes, responseHeaders, websocket }
    }
    async handleSession(webSocket: WebSocket, ip: string) {
        //@ts-ignore
        webSocket.accept()
        if (this.sessions.has(ip)) return
        this.sessions.set(ip, webSocket)
        webSocket.addEventListener("close", () => this.sessions.delete(ip) && webSocket.close());
        webSocket.addEventListener("error", () => this.sessions.delete(ip) && webSocket.close());
    }

    async getWebsocketServer(ip: string): Promise<Response> {
        const [client, server] = Object.values(new WebSocketPair())
        await this.handleSession(server, ip)
        return new Response(null, {
            status: 101,
            webSocket: client
        })
    }

}