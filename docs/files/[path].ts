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
export async function onRequestGet({ env, request }) {

    let response = await env.ASSETS.fetch(request)
    response = new Response(response.body, response)
    response.headers.set("Cache-Control", "no-cache, no-store")
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Expose-Headers", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")
    return response
}