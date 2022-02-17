import type { TRequestWithParams } from 'itty-router-extras';
import { HeadersWithTimings } from './HeadersWithTimings'

function getEtfURL(fundId: number, label: string, ticker: string): URL {
    return new URL(`https://www.ishares.com/us/products/${fundId}/${label}/1467271812596.ajax?fileType=csv&fileName=${ticker}_holdings&dataType=fund`)
}
function getHugeCSVRequest(req: Request): Request {

    let newReq = new Request(getEtfURL(239756, 'ishares-growth-allocation-etf', 'AOR').toString(), req);
    newReq.headers.set('cache-control', 'no-cache');
    newReq.headers.set('timeOrigin', String(Date.now()));
    return newReq;

}
function getSmallCSVRequest(req: Request): Request {

    let newReq = new Request(getEtfURL(239738, 'ishares-global-clean-energy-etf', 'ICLN').toString(), req);
    newReq.headers.set('cache-control', 'no-cache');
    newReq.headers.set('timeOrigin', String(Date.now()));
    return newReq;

}

function getMediumCSVRequest(req?: Request): Request {

    let newReq = new Request(getEtfURL(264615, 'ishares-core-total-usd-bond-market-etf', 'IUSB').toString(), req);
    newReq.headers.set('cache-control', 'no-cache');
    newReq.headers.set('timeOrigin', String(Date.now()));
    return newReq;

}



/**
 * 
 */
export function getCSVPassThrough(request: Request): Promise<Response> {


    let timingHeaders = new HeadersWithTimings({
        browserTimeOrigin: request.headers.get('timeOrigin'),
        startTime: request.headers.get('starttime'),
        timestamp: request.headers.get('timestamp')
    })
    return fetch(request).then((res: Response) => {

        res = new Response(res.body, res);
        timingHeaders.appendPartialTiming('source_csv.response_start')
        res.headers.set('Access-Control-Allow-Origin', '*');
        res.headers.set('Timing-Allow-Origin', '*');
        //res.headers.set('Trailer', 'Server-Timing');
        res.headers.set('Access-Control-Allow-Headers', 'Range');
        res.headers.set('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');
        res.headers.set('Server-Timing', timingHeaders.get('Server-Timing') || '')
        res.headers.set('cache-control', 'no-cache, no-store, s-maxage=0');
        return res;
    });


}

export function computeSourceRequest(request: TRequestWithParams): Request & { reqHeaders?: Record<string, string>, ip?: string, sourceUrl?: string } {
    let sourceCSVReq: Request & { reqHeaders?: Record<string, string>, ip?: string, sourceUrl?: string }
    if (request.url.includes('small')) {
        sourceCSVReq = getSmallCSVRequest(request);
    }
    else if (request.url.includes('huge')) {
        sourceCSVReq = getHugeCSVRequest(request);
    }
    else {
        sourceCSVReq = getMediumCSVRequest(request);
    }



    //@ts-ignore
    sourceCSVReq.reqHeaders = Object.fromEntries(sourceCSVReq.headers)
    sourceCSVReq.sourceUrl = sourceCSVReq.url
    sourceCSVReq.ip = request.headers.get("CF-Connecting-IP") || '127.0.0.1';


    return sourceCSVReq;
}
