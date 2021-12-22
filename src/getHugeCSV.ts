export function getHugeCSV(req: Request): Request {

    let newReq = new Request("https://www.ishares.com/us/products/239756/ishares-growth-allocation-etf/1467271812596.ajax?fileType=csv&fileName=AOR_holdings&dataType=fund", req);
    newReq.headers.set('cache-control', 'no-cache');
    return newReq;

}
export function getHugeCSVPassThrough(request: Request): Promise<Response> {

    let newReq = getHugeCSV(request);
    return fetch(newReq).then((res: Response) => {
        res = new Response(res.body, res);
        res.headers.set('Access-Control-Allow-Origin', '*');
        res.headers.set('Access-Control-Allow-Headers', 'Range');
        res.headers.set('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');


        res.headers.set('cache-control', 'no-cache, no-store, s-maxage=0');
        return res;
    });


}
export function getSmallCSVPassThrough(request: Request): Promise<Response> {

    let newReq = getSmallCSV(request);
    return fetch(newReq).then((res: Response) => {
        res = new Response(res.body, res);
        res.headers.set('Access-Control-Allow-Origin', '*');
        res.headers.set('Access-Control-Allow-Headers', 'Range');
        res.headers.set('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');


        res.headers.set('cache-control', 'no-cache, no-store, s-maxage=0');
        return res;
    });

}
export function getSmallCSV(req: Request): Request {

    let newReq = new Request("https://www.ishares.com/us/products/239566/ishares-iboxx-investment-grade-corporate-bond-etf/1467271812596.ajax?fileType=csv&fileName=LQD_holdings&dataType=fund", req);
    newReq.headers.set('cache-control', 'no-cache');
    return newReq;

}
