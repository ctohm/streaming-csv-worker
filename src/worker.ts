///
import { StreamingCSVParser } from './StreamingCSVParser'

//import Papa from '../lib/papaparse_with_fetch'
import { default as Papa, TransformStreamer } from './TransformStreamer'
import { getHugeCSVRequest, getSmallCSVRequest, getCSVPassThrough, getMediumCSVRequest } from './getHugeCSV';
import { getPapaXHR } from './getPapaXHR';

const faviconSvg = `<svg width="256.8" height="256.24" version="1.1" viewBox="0 0 67.946032 67.796278" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<ellipse cx="68.186" cy="219.86" rx="8.4048" ry="7.7212" fill="url(#a)" stroke="#25b244" stroke-width="3.237"/>
</svg>`;


async function getWithPapaParse(req: Request): Promise<Response> {
    console.log('TransformStreamer')
    const transformStreamer = new TransformStreamer({
        download: true, skipEmptyLines: 'greedy'

    }),
        res = await fetch(req)
    if (!res.ok || !res.body) {
        throw new Error("Couldn't obtain readable body")
    }
    res.body.pipeThrough(transformStreamer)

    return new Response(
        transformStreamer.readable, {
        headers: {
            'content-type': 'application/json',
            'cache-control': 'no-cache, no-store, s-maxage=0',

        }
    });

}

async function getWithPapaParseStreamMethod(req: Request): Promise<Response> {
    console.log('getWithPapaParseStreamMethod');
    console.time('fetch:getWithPapaParseStreamMethod');

    console.time('Papaparse');



    return Papa.parse(req, {
        download: true,
        //  preview: 10,


    })


}
async function getWithStreamingCSV(req: Request): Promise<Response> {
    const t_ini = Date.now(),
        isSmallCsv = req.url.includes('invesco')
    //console.time('fetch');
    console.log({ url: req.url })
    //  const res = await fetch(req)
    console.timeEnd('fetch');
    let firstLine = true
    console.time('StreamingCSVParser');
    return new StreamingCSVParser({
        delimiter: isSmallCsv ? ',' : ',',
        from_line: isSmallCsv ? 1 : 10,
        skip_lines_with_error: true,

    }, {
        started_at: String(t_ini),
        'Content-Type': 'application/json',
        'cache-control': 'no-cache, no-store, s-maxage=1, max-age=1'
    })
        .on('readable', () => {
            if (firstLine) {
                firstLine = false;
                console.log(Date.now() + ' on record')
            }
        })
        .stream(req)


}
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
                'Access-Control-Allow-Headers': 'Range',
                'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range',
            }
        })
        const url = new URL(request.url)
        if (url.pathname.includes('favicon')) return getFavicon()

        if (url.pathname.includes('xhr')) return new Response(getPapaXHR(), { headers: { 'content-type': 'text/html; charset=utf-8' } })
        if (url.pathname.includes('transform')) return getWithPapaParse(getMediumCSVRequest(request))
        //new Request('https://csv.riff.one/files/ishares'))
        if (url.pathname.includes('csvparse')) return getWithStreamingCSV(getMediumCSVRequest(request))
        if (url.pathname.includes('stream')) return getWithPapaParseStreamMethod(getMediumCSVRequest(request))
        //new Request('https://csv.riff.one/files/ishares'))
        if (url.pathname.includes('raw')) return getCSVPassThrough(getMediumCSVRequest(request))
        const headerEntries = Object.fromEntries(request.headers)
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