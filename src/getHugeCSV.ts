export function getHugeCSVRequest(req: Request): Request {

    let newReq = new Request("https://www.ishares.com/us/products/239756/ishares-growth-allocation-etf/1467271812596.ajax?fileType=csv&fileName=AOR_holdings&dataType=fund", req);
    newReq.headers.set('cache-control', 'no-cache');
    return newReq;

}
export function getSmallCSVRequest(req: Request): Request {

    let newReq = new Request("https://www.ishares.com/us/products/239566/ishares-iboxx-investment-grade-corporate-bond-etf/1467271812596.ajax?fileType=csv&fileName=LQD_holdings&dataType=fund", req);
    newReq.headers.set('cache-control', 'no-cache');
    return newReq;

}

export function getCSVPassThrough(request: Request): Promise<Response> {


    return fetch(request).then((res: Response) => {
        res = new Response(res.body, res);
        res.headers.set('Access-Control-Allow-Origin', '*');
        res.headers.set('Access-Control-Allow-Headers', 'Range');
        res.headers.set('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');


        res.headers.set('cache-control', 'no-cache, no-store, s-maxage=0');
        return res;
    });


}

