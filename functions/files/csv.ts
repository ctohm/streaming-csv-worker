export async function onRequestOptions({ env, request }) {

    return new Response(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Expose-Headers": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Range, Content-Range",
        },
    });
}
function getHugeCSV(req: Request): Request {

    let newReq = new Request("https://www.ishares.com/us/products/239756/ishares-growth-allocation-etf/1467271812596.ajax?fileType=csv&fileName=AOR_holdings&dataType=fund", req);
    newReq.headers.set('cache-control', 'no-cache');
    return newReq;

}

export async function onRequestGet({ env, request }) {

    let response = await fetch(getHugeCSV(request))
    let csv = await response.text()
    response = new Response(csv, response)
    response.headers.set("Cache-Control", "no-cache, no-store")
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Expose-Headers", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Range, Content-Range")
    return response
}