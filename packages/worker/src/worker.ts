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
        request.params.timeOrigin = request.headers.get('timeOrigin') || String(Date.now())
        let sourceCSVReq: CFRequest = computeSourceRequest(request);
        console.log({ sourceCSVReq: sourceCSVReq.url })
        //@ts-ignore
        request.reqHeaders = Object.fromEntries(sourceCSVReq.headers.entries())
        request.params.sourceUrl = sourceCSVReq.url
        request.params.ip = request.headers.get("CF-Connecting-IP") || '127.0.0.' + Math.floor(Math.random() * 256);

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
    .all('/*/ws*', (request: TRequestWithParams, env: EnvWithDurableObject) => {
        const upgradeHeader = request.headers.get("Upgrade")
        console.log({ upgradeHeader })
        if (upgradeHeader !== "websocket") {
            return new Response("Expected websocket", { status: 400 })
        }
        return env.DurableWk.get(env.DurableWk.idFromName('DurableWk')).fetch(`https://streaming-csv-worker/call/getWebsocketServer`, request)
    })
    .get('/*/transform*', (request: TRequestWithParams) => {
        let { reqHeaders, ip, sourceUrl } = computeSourceRequest(request);
        return getEnhancedIttyDurable<'getWithTransformStreamer'>(request.DurableWk, 'DurableWk').getWithTransformStreamer({ reqHeaders, ip, sourceUrl })
    })
    .get('/*/xhr*', (req: TRequestWithParams) => {

        return getCSVPassThrough(computeSourceRequest(req))

    })
    .get('/*/gcloud*', (req: TRequestWithParams, env: EnvWithDurableObject) => {


        let newUrl = new URL(req.url)
        newUrl.host = env.GCLOUD_FUNCTION_HOST
        newUrl.pathname = 'csv-transform'

        let newReq = new Request(newUrl.toString(), req);
        newReq.headers.set('cache-control', 'no-cache');
        newReq.headers.set('timeOrigin', String(Date.now()));
        return fetch(newReq, req.headers as RequestInit).then(res => {
            res = new Response(res.body, res);
            res.headers.set('Access-Control-Allow-Origin', '*');
            res.headers.set('cache-control', 'no-cache, no-store, s-maxage=0');

            return res
        });




    })
    .get('/*/sessions', (req: TRequestWithParams) => {
        return getEnhancedIttyDurable<'listSessions'>(req.DurableWk, 'DurableWk').listSessions()

    })
    .get('/*/*.csv', (req: TRequestWithParams) => {

        return getCSVPassThrough(computeSourceRequest(req))

    })
    .get('/*/raw*', (req: TRequestWithParams) => {

        return getCSVPassThrough(computeSourceRequest(req))

    })
    .get('/*/csvparse*', (request: TRequestWithParams) => {

        let sourceCSVReq: Request = computeSourceRequest(request);
        let ip = request.headers.get("CF-Connecting-IP") || '127.0.0.1';

        //@ts-ignore
        let reqHeaders = Object.fromEntries(sourceCSVReq.headers),
            startTime = request.headers.get('startTime') || '0',
            timeOrigin = request.headers.get('timeOrigin') || String(Date.now()),
            sourceUrl = sourceCSVReq.url

        return getEnhancedIttyDurable<'getWithStreamingCSVParser'>(request.DurableWk, 'DurableWk').getWithStreamingCSVParser({
            startTime,
            timeOrigin,
            sourceUrl,
            reqHeaders, ip
        })
    })
    .get('/*/fetch*', (request: TRequestWithParams) => {
        console.info(request.params,)
        let sourceCSVReq: Request = computeSourceRequest(request);
        let ip = request.headers.get("CF-Connecting-IP") || '127.0.0.1';

        //@ts-ignore
        let reqHeaders = Object.fromEntries(sourceCSVReq.headers),
            startTime = request.headers.get('startTime') || '0',
            timeOrigin = request.headers.get('timeOrigin') || String(Date.now()),
            sourceUrl = sourceCSVReq.url

        return getEnhancedIttyDurable<'getWithFetchStreamer'>(request.DurableWk, 'DurableWk').getWithFetchStreamer({
            startTime,
            timeOrigin,
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
    fetch: (request: CFRequest, env: PagesFuncParams['env'], ctx: { waitUntil: PagesFuncParams['waitUntil'] }): Response | Promise<Response> => {
        console.log({ env })
        return router.handle(request, env)
            .catch((err: Error) => {
                return json({ message: err.message, stack: String(err.stack).split('\n') })

            })


    }
}

