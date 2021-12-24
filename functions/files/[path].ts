export async function onRequestOptions({ request }: { request: Request }) {

    return new Response(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Expose-Headers": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Range, Content-Range, Content-MD5, Content-Type, Date, X-Api-Version'
        },
    });
}
function getHugeCSV(req: Request): Request {

    let newReq = new Request("https://www.ishares.com/us/products/239756/ishares-growth-allocation-etf/1467271812596.ajax?fileType=csv&fileName=AOR_holdings&dataType=fund", req);
    newReq.headers.set('cache-control', 'no-cache');
    return newReq;

}

export async function onRequestGet({ request }: { request: Request }) {

    let response = await fetch(getHugeCSV(request))
    response = new Response(response.body, response)
    response.headers.set("Cache-Control", "no-cache, no-store")
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Expose-Headers", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Range, Content-Range, Content-MD5, Content-Type, Date, X-Api-Version')
    return response
}

export async function onRequestPost({ request }: { request: Request }) {



    let response = new Response(JSON.stringify({ ...request.cf }), { headers: { 'Content-Type': 'application/json' } });
    response.headers.set("Cache-Control", "no-cache, no-store, s-maxage=1, max-age=1")
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Expose-Headers", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Range, Content-Range, Content-MD5, Content-Type, Date, X-Api-Version')
    return response
}

