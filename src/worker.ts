///
import { StreamingCSVParser } from './StreamingCSVParser'

//import Papa from '../lib/papaparse_with_fetch'
import { default as Papa, TransformStreamer, FetchPapaStreamer } from '.'
import { getHugeCSVRequest, getSmallCSVRequest, getCSVPassThrough, getMediumCSVRequest } from './getHugeCSV';
import { getPapaXHR } from './getPapaXHR';
import { HeadersWithTimings } from './HeadersWithTimings';

const faviconSvg = `<svg width="256.8" height="256.24" version="1.1" viewBox="0 0 67.946032 67.796278" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<ellipse cx="68.186" cy="219.86" rx="8.4048" ry="7.7212" fill="url(#a)" stroke="#25b244" stroke-width="3.237"/>
</svg>`;

async function getWithTransformStreamer(req: Request): Promise<Response> {
    console.log('TransformStreamer')
    const init = {
        started_at: req.headers.get('started_at'),
        'startTime': req.headers.get('startTime'),
        'content-type': 'application/json',
        'cache-control': 'no-cache, no-store, s-maxage=0, max-age=0',

    },
        headers = new HeadersWithTimings(init as Record<string, string>),
        transformStreamer = new TransformStreamer({
            download: true, skipEmptyLines: 'greedy'
        })
    headers.appendPartialTiming('origin_csv:start')

    let res = await fetch(req)
    headers.appendPartialTiming('origin_csv:ttfb')

    if (!res.ok || !res.body) {
        throw new Error("Couldn't obtain readable body")
    }

    res.body.pipeThrough(transformStreamer)

    return new Response(
        transformStreamer.readable, {
        headers
    });

}

async function getWithFetchStreamer(req: Request): Promise<Response> {
    console.log('getWithFetchStreamer');
    console.time('fetch:getWithFetchStreamer');
    const init = {
        started_at: req.headers.get('started_at'),
        'startTime': req.headers.get('startTime'),
        'content-type': 'application/json',
        'cache-control': 'no-cache, no-store, s-maxage=0, max-age=0',
    }

    let separator = '['
    console.time('Papaparse');

    let encoder = new TextEncoder(),
        transformStream = new TransformStream<Uint8Array, Uint8Array>()

    let { readable, writable } = transformStream

    const writer = writable.getWriter(),
        headers = new HeadersWithTimings(init as Record<string, string>)
    headers.appendPartialTiming('source_csv.start')

    const originRes = await fetch(req)

    let res = new Response(
        readable, {
        headers
    });

    new FetchPapaStreamer({
        download: true,
        beforeFirstChunk: (chunk) => {
            headers.appendPartialTiming('source_csv:ttfb')
            return chunk
        },
        chunk: (result) => {
            writer.write(encoder.encode(separator + JSON.stringify(result.data)));
            separator = ',';
        },
        complete: (result) => {
            console.timeEnd('Papaparse');
            writer.write(encoder.encode(']'));
            writer.close();
            headers.appendPartialTiming('source_csv:complete')
        }
    }).stream(originRes)
    return res


}
async function getWithStreamingCSVParser(req: Request): Promise<Response> {
    const init = {
        started_at: req.headers.get('started_at'),
        'startTime': req.headers.get('startTime'),
        'content-type': 'application/json',
        'cache-control': 'no-cache, no-store, s-maxage=0, max-age=0',
    },
        headers = new HeadersWithTimings(init as Record<string, string>)

    return new StreamingCSVParser({
        delimiter: ',',
        from_line: 10,
        skip_lines_with_error: true,

    },
        headers
    )

        .stream(req)


}
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
export default {
    fetch: (request: CFRequest): Response | Promise<Response> => {
        if (request.method.toLowerCase().includes('option')) return new Response('', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Range, Content-Range, Content-MD5, Content-Type, Date, X-Api-Version',
                'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range',
            }
        })

        const url = new URL(request.url)
        if (url.pathname.includes('favicon')) return getFavicon()

        if (url.pathname.includes('xhr')) return new Response(getPapaXHR(), { headers: { 'content-type': 'text/html; charset=utf-8' } })
        if (url.pathname.includes('transform')) return getWithTransformStreamer(getMediumCSVRequest(request))

        if (url.pathname.includes('csvparse')) return getWithStreamingCSVParser(getMediumCSVRequest(request))
        if (url.pathname.includes('fetch')) return getWithFetchStreamer(getMediumCSVRequest(request))

        if (url.pathname.includes('raw')) return getCSVPassThrough(getMediumCSVRequest(request))
        //@ts-ignore
        const headerEntries = Object.fromEntries(request.headers)
        //@ts-ignore
        return new Response(JSON.stringify({ cf: { ...request.cf }, ...headerEntries, method: request.method }), {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Expose-Headers": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Range, Content-Range, Content-MD5, Content-Type, Date, X-Api-Version'
            }
        })


    }
}