import { StreamingCSVParser } from '../lib'
import Papa from 'papaparse'
import { FetchPapaStreamer } from '../lib'
import { getHugeCSV, getSmallCSV, getHugeCSVPassThrough, getSmallCSVPassThrough } from './getHugeCSV';
import { getPapaXHR } from './getPapaXHR';

const faviconSvg = `<svg width="256.8" height="256.24" version="1.1" viewBox="0 0 67.946032 67.796278" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<ellipse cx="68.186" cy="219.86" rx="8.4048" ry="7.7212" fill="url(#a)" stroke="#25b244" stroke-width="3.237"/>
</svg>`;


async function getWithPapaParse(req: Request): Promise<Response> {
    return new FetchPapaStreamer({
        download: true,
        chunkSize: 7 * 1024 * 1024,

    }).transform(req)

}

async function getWithPapaParseConvertingToText(req: Request): Promise<Response> {
    console.time('getWithPapaParseConvertingToText');
    console.time('fetch');
    const res = await fetch(req)//fetchCached(req, { env, waitUntil })
    console.timeEnd('fetch');
    if (!res.ok) {
        let err = new Error(res.statusText) as Error & { status: number };
        err.status = res.status;
        throw err;
    }


    let resCsv = await res.text(),


        parsed = (Papa.parse(resCsv).data)
    const stringified = JSON.stringify(parsed)
    console.timeEnd('getWithPapaParseConvertingToText');
    return new Response(JSON.stringify({ records: parsed.length }), { headers: { 'content-type': 'application/json' } })

}
async function getWithStreamingCSV(req: Request): Promise<Response> {
    const t_ini = Date.now(),
        isSmallCsv = req.url.includes('invesco')
    console.time('fetch');
    console.log({ url: req.url })
    const res = await fetch(req)
    console.timeEnd('fetch');

    console.time('StreamingCSVParser');
    return new StreamingCSVParser({
        delimiter: isSmallCsv ? ',' : ',',
        from_line: isSmallCsv ? 1 : 10,
        skip_lines_with_error: true
    }, { started_at: String(t_ini) })
        .on('end', function () {
            console.timeEnd('StreamingCSVParser');
        })

        .transform(res)


}
function getFavicon(): Response {
    return new Response(faviconSvg, { headers: { 'Content-Type': 'image/svg+xml' } })
}
function getCSV(pathname: string, req: Request): Request {
    console.log({ getCSV: pathname })
    if (pathname.includes('ishares')) return getHugeCSV(req)
    return getSmallCSV(req)
}
export default {
    fetch: (request: Request): Response | Promise<Response> => {
        if (request.method.toLowerCase().includes('option')) return new Response('', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Range',
                'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range',
            }
        })
        const url = new URL(request.url)
        if (url.pathname.includes('favicon')) return getFavicon()

        if (url.pathname.includes('xhr') || url.pathname.includes('AOK_holdings')) return new Response(getPapaXHR(), { headers: { 'content-type': 'text/html; charset=utf-8' } })
        if (url.pathname.includes('papa')) return getWithPapaParse(getCSV(url.pathname, request))
        if (url.pathname.includes('papa')) return getWithPapaParse(getCSV(url.pathname, request))
        if (url.pathname.includes('full')) return getWithPapaParseConvertingToText(getCSV(url.pathname, request))

        if (url.pathname.includes('stream')) return getWithStreamingCSV(getCSV(url.pathname, request))
        if (url.pathname.includes('ishares')) return getHugeCSVPassThrough(request)
        return getSmallCSVPassThrough(request)
    }
}