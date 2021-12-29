import streamSaver from 'streamsaver';





export function download(
    url: string,
    fileName = 'file.txt',
    cb: (...args: any[]) => void
) {
    let ttfb = false;
    console.log({ url });
    performance.mark('download:start');

    let done = false;
    streamSaver.mitm = `${location.origin}/mitm.html`;
    const fileStream = streamSaver.createWriteStream(fileName);

    // abort so it dose not look stuck
    window.onunload = () => {
        fileStream.abort();
    };

    window.onbeforeunload = evt => {
        if (!done) {
            evt.returnValue = `Are you sure you want to leave?`;
        }
    };
    return fetch(url, {
        headers: {
            'TE': 'trailers',
            'startTime': String(performance.now()),
            'started_at': String(Math.floor(Date.now() - performance.now())),
            'cache-control': 'no-cache, no-store, max-age=1, s-maxage=1'
        }
    })
        .then(res => {

            if (!res.body || !res.ok)
                return Promise.reject(new Error(res.statusText));
            return res.body.pipeTo(fileStream);
        }).then(() => {
            done = true;
            performance.mark('download:tear_down');
            requestIdleCallback(() => {
                cb();
            });
        });
}
