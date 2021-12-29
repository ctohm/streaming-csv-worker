
export async function websocket(url: URL, entries: unknown[], onOpen: () => void) {
    let ws = new WebSocket(url);
    if (!ws) {
        throw new Error("server didn't accept ws");
    }
    ws.addEventListener("open", () => {
        console.log('Opened websocket');
        onOpen()
    });
    ws.addEventListener("message", ({ data }) => {
        const { count, tz, error, name, duration, endTime } = JSON.parse(data);

        if (name && duration && endTime) {

            let startTime = endTime - duration,
                serverEntry = { name, duration, startTime, entryType: 'server', endTime }
            console.info(serverEntry)
            entries.push(serverEntry);
        } else if (error) {
            console.error(error);
        } else {

            console.info({ count, tz, error });
        }
    });
    ws.addEventListener("close", () => {
        console.log('Closed websocket');

    });
    return ws;
}
