///

import { getHugeCSVRequest, getSmallCSVRequest, getCSVPassThrough, getMediumCSVRequest } from './getHugeCSV';
import { getPapaXHR } from './getPapaXHR';
import { HeadersWithTimings } from './HeadersWithTimings';

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
function getCSV(pathname: string, req: Request): Request {
    console.log({ getCSV: pathname })
    if (pathname.includes('ishares')) return getHugeCSVRequest(req)
    return getSmallCSVRequest(req)
}
type PagesFuncParams = Parameters<PagesFunction>[0]
type CFRequest = PagesFuncParams['request']



import { ThrowableRouter, missing, withParams, EnvWithDurableObject, DurableStubGetter, TRequestWithParams, json } from 'itty-router-extras'
import { IttyDurable, withDurables } from 'itty-durable'

// export the durable class, per spec
import { DurableWk } from './DurableWk';
import { Router } from 'itty-router';

type TBadgerMethod<TMethodName extends string> = DurableWk[TMethodName] extends Function ? DurableWk[TMethodName] : { (args: unknown): Promise<Response> }

type ittyWithMethod<TMethodName extends string> = { [K in TMethodName]: TBadgerMethod<TMethodName> }
function getEnhancedIttyDurable<TMethodName extends string>(stubGetter: DurableStubGetter, nameId: string): IttyDurable & ittyWithMethod<TMethodName> {
    return stubGetter.get(nameId) as unknown as IttyDurable & ittyWithMethod<TMethodName>
}

const router = Router()

router
    // add upstream middleware, allowing Durable access off the request
    .all('*', withDurables())

    .all('*', withParams, (request: TRequestWithParams) => {
        request.params = request.params || {}
        request.params.startTime = request.headers.get('startTime') || '0'
        request.params.started_at = request.headers.get('started_at') || String(Date.now())
        const sourceCSVReq = getSmallCSVRequest(request)
        request.reqHeaders = Object.fromEntries(sourceCSVReq.headers)
        request.params.sourceUrl = sourceCSVReq.url
        request.params.ip = request.headers.get("CF-Connecting-IP");

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
    .get('/*/ws*', (request: TRequestWithParams, env: EnvWithDurableObject) => {
        const upgradeHeader = request.headers.get("Upgrade")
        if (upgradeHeader !== "websocket") {
            return new Response("Expected websocket", { status: 400 })
        }
        let ip = request.headers.get("CF-Connecting-IP");

        return getEnhancedIttyDurable<'getWebsocketServer'>(request.DurableWk, 'DurableWk').getWebsocketServer(ip)
    })
    .get('/*/transform*', (request: TRequestWithParams) => {
        const sourceCSVReq = getMediumCSVRequest(request)
        let ip = request.headers.get("CF-Connecting-IP") || '127.0.0.1';

        //@ts-ignore
        let reqHeaders = Object.fromEntries(sourceCSVReq.headers),
            startTime = request.headers.get('startTime') || '0',
            started_at = request.headers.get('started_at') || String(Date.now()),
            sourceUrl = sourceCSVReq.url

        return getEnhancedIttyDurable<'getWithTransformStreamer'>(request.DurableWk, 'DurableWk').getWithTransformStreamer({
            startTime,
            started_at,
            sourceUrl,
            reqHeaders, ip
        })
    })
    .get('/*/xhr*', (req: TRequestWithParams) => {
        return getCSVPassThrough(getMediumCSVRequest(req))

    })
    .get('/*/raw*', (req: TRequestWithParams) => {
        return getCSVPassThrough(getMediumCSVRequest(req))

    })
    .get('/*/csvparse*', (request: TRequestWithParams) => {

        const sourceCSVReq = getMediumCSVRequest(request)
        let ip = request.headers.get("CF-Connecting-IP") || '127.0.0.1';

        //@ts-ignore
        let reqHeaders = Object.fromEntries(sourceCSVReq.headers),
            startTime = request.headers.get('startTime') || '0',
            started_at = request.headers.get('started_at') || String(Date.now()),
            sourceUrl = sourceCSVReq.url

        return getEnhancedIttyDurable<'getWithStreamingCSVParser'>(request.DurableWk, 'DurableWk').getWithStreamingCSVParser({
            startTime,
            started_at,
            sourceUrl,
            reqHeaders, ip
        })
    })
    .get('/*/fetch*', (request: TRequestWithParams) => {
        console.info(request.params,)
        const sourceCSVReq = getMediumCSVRequest(request)
        let ip = request.headers.get("CF-Connecting-IP") || '127.0.0.1';

        //@ts-ignore
        let reqHeaders = Object.fromEntries(sourceCSVReq.headers),
            startTime = request.headers.get('startTime') || '0',
            started_at = request.headers.get('started_at') || String(Date.now()),
            sourceUrl = sourceCSVReq.url

        return getEnhancedIttyDurable<'getWithFetchStreamer'>(request.DurableWk, 'DurableWk').getWithFetchStreamer({
            startTime,
            started_at,
            sourceUrl,
            reqHeaders,
            ip
        })
    })

    // 404 for everything else
    .all('*', (request: TRequestWithParams & { cf: RequestInitCfProperties, headers: Headers }) => json({ url: request.url, method: request.method }, {
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
    fetch: (request: CFRequest, env, ctx): Response | Promise<Response> => {

        return router.handle(request, env)
            .catch(err => {
                return json({ message: err.message, stack: String(err.stack).split('\n') })

            })


    }
}
