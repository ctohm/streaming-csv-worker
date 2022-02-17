///

import { getCSVPassThrough, computeSourceRequest } from './getHugeCSV';

const faviconSvg = `<svg width="256.8" height="256.24" version="1.1" viewBox="0 0 67.946032 67.796278" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<ellipse cx="68.186" cy="219.86" rx="8.4048" ry="7.7212" fill="url(#a)" stroke="#25b244" stroke-width="3.237"/>
</svg>`;

/**
 * 
 * @returns {Response}
 */
function getFavicon(): Response {
    return new Response(faviconSvg, { headers: { 'Content-Type': 'image/svg+xml' } })
}

type PagesFuncParams = Parameters<PagesFunction>[0]
type CFRequest = PagesFuncParams['request']



import { ThrowableRouter, missing, withParams, EnvWithDurableObject, DurableStubGetter, TRequestWithParams, json } from 'itty-router-extras'
import { IttyDurable, withDurables } from 'itty-durable'

// export the durable class, per spec
import { DurableWk, } from './DurableWk';
import { Router } from 'itty-router';

type TBadgerMethod<TMethodName extends string> = DurableWk[TMethodName] extends Function ? DurableWk[TMethodName] : { (args: unknown): Promise<Response> }

type ittyWithMethod<TMethodName extends string> = { [K in TMethodName]: TBadgerMethod<TMethodName> }
function getEnhancedIttyDurable<TMethodName extends string>(stubGetter: DurableStubGetter<WebSocketWithTimings>, nameId: string): IttyDurable<WebSocketWithTimings> & ittyWithMethod<TMethodName> {
    return stubGetter.get(nameId) as unknown as IttyDurable<WebSocketWithTimings> & ittyWithMethod<TMethodName>
}
import type { WebSocketWithTimings } from './DurableWk'
const router = Router()

router
    // add upstream middleware, allowing Durable access off the request
    .all('*', withDurables())

    .all('*', withParams, (request: TRequestWithParams<WebSocketWithTimings>) => {
        request.params = request.params || {}
        request.params.startTime = request.headers.get('startTime') || '0'
        request.params.timeOrigin = request.headers.get('timeOrigin') || String(Date.now())
        let sourceCSVReq: CFRequest = computeSourceRequest(request),
            ip = request.headers.get("CF-Connecting-IP") || '127.0.0.' + Math.floor(Math.random() * 256);
        console.log({ sourceCSVReq: sourceCSVReq.url, ip })
        //@ts-ignore
        request.reqHeaders = Object.fromEntries(sourceCSVReq.headers.entries())
        request.params.sourceUrl = sourceCSVReq.url
        request.params.ip = ip
    })
    .options('*', () => {
        return new Response('', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Range, Content-Range, Content-MD5, Content-Type, Date, X-Api-Version',
                'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range',
            }
        })
    })
    .get('favicon*', () => getFavicon())
    .all('/*/ws*', (request: TRequestWithParams<WebSocketWithTimings>, env: EnvWithDurableObject) => {
        const upgradeHeader = request.headers.get("Upgrade")
        console.log({ upgradeHeader })
        if (upgradeHeader !== "websocket") {
            return new Response("Expected websocket", { status: 400 })
        }
        return env.DurableWk.get(env.DurableWk.idFromName('DurableWk_v2')).fetch(`https://streaming-csv-worker/call/getWebsocketServer`, request)
    })
    .get('/*/transform*', (request: TRequestWithParams<WebSocketWithTimings>) => {
        let { reqHeaders, ip, sourceUrl } = computeSourceRequest(request),
            startTime = request.headers.get('startTime') || '0',
            timeOrigin = request.headers.get('timeOrigin') || String(Date.now())
        console.time('getWithTransformStreamer')
        return getEnhancedIttyDurable<'getWithTransformStreamer'>(request.DurableWk, 'DurableWk_v2')
            .getWithTransformStreamer({ reqHeaders, ip, sourceUrl })
            .then(res => {
                console.timeEnd('getWithTransformStreamer')
                console.log({ startTime, timeOrigin, timeStamp: Date.now() })
                return res
            })
    })
    .get('/*/xhr*', (req: TRequestWithParams<WebSocketWithTimings>) => {

        return getCSVPassThrough(computeSourceRequest(req))

    })

    .get('/*/*.csv', (req: TRequestWithParams<WebSocketWithTimings>) => {

        return getCSVPassThrough(computeSourceRequest(req))

    })
    .get('/*/raw*', (req: TRequestWithParams<WebSocketWithTimings>) => {

        return getCSVPassThrough(computeSourceRequest(req))

    })
    .get('/*/csvparse*', (request: TRequestWithParams<WebSocketWithTimings>) => {

        let sourceCSVReq: Request = computeSourceRequest(request);
        let ip = request.headers.get("CF-Connecting-IP") || '127.0.0.1';

        //@ts-ignore
        let reqHeaders = Object.fromEntries(sourceCSVReq.headers),
            startTime = request.headers.get('startTime') || '0',
            timeOrigin = request.headers.get('timeOrigin') || String(Date.now()),
            sourceUrl = sourceCSVReq.url
        console.time('getWithStreamingCSVParser')
        return getEnhancedIttyDurable<'getWithStreamingCSVParser'>(request.DurableWk, 'DurableWk_v2').getWithStreamingCSVParser({
            startTime,
            timeOrigin,
            sourceUrl,
            reqHeaders, ip
        }) 
    })
    .get('/*/fetch*', (request: TRequestWithParams<WebSocketWithTimings>) => {
        console.info(request.params,)
        let sourceCSVReq: Request = computeSourceRequest(request);
        let ip = request.headers.get("CF-Connecting-IP") || '127.0.0.1';

        //@ts-ignore
        let reqHeaders = Object.fromEntries(sourceCSVReq.headers),
            startTime = request.headers.get('startTime') || '0',
            timeOrigin = request.headers.get('timeOrigin') || String(Date.now()),
            sourceUrl = sourceCSVReq.url
        console.time('getWithFetchStreamer')
        return getEnhancedIttyDurable<'getWithFetchStreamer'>(request.DurableWk, 'DurableWk_v2').getWithFetchStreamer({
            startTime,
            timeOrigin,
            sourceUrl,
            reqHeaders,
            ip
        }).then(res => {
            console.timeEnd('getWithFetchStreamer')
            console.log({ startTime, timeOrigin, timeStamp: Date.now() })
            return res
        })
    })

    // 404 for everything else
    .all('*', (request: TRequestWithParams<WebSocketWithTimings> & { cf: RequestInitCfProperties, headers: Headers }) => json({ url: request.url, method: request.method }, {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Expose-Headers": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Range, Content-Range, Content-MD5, Content-Type, Date, X-Api-Version'
        }
    }))
export { DurableWk }
export default {
    fetch: (request: CFRequest, env: PagesFuncParams['env'], ctx: { waitUntil: PagesFuncParams['waitUntil'] }): Response | Promise<Response> => {

        return router.handle(request, env)
            .catch((err: Error) => {
                return json({ message: err.message, stack: String(err.stack).split('\n') })

            })


    }
}

