/// <reference lib="dom" />
/// <reference types="streamsaver" />

import streamSaver from 'streamsaver'

// ==UserScript==
// @name       Download JSON
// @namespace  http://ffflabs.com/
// @version    0.1
// @description  used to access browser's downloads API
// @match      http://localhost:8787/download
// @require    https://cdn.jsdelivr.net/npm/papaparse@5.3.1/papaparse.min.js
// @require   https://cdn.jsdelivr.net/npm/web-streams-polyfill@2.0.2/dist/ponyfill.min.js
// @require   https://cdn.jsdelivr.net/npm/streamsaver@2.0.3/StreamSaver.min.js
// @grant GM_download
// @grant GM_xmlhttpRequest





// @copyright  2014 amenadiel@gmail.com

// ==/UserScript==

export type TbriefEntry = {
    name: string;
    endTime: number;
    startTime: number;
    duration: number;
    entryType: string;
}

let entries = [] as TbriefEntry[]

const po = new PerformanceObserver((list) => {
    list.getEntries().forEach(
        (entry: PerformanceEntry) => {
            let { startTime, duration, name, entryType } = entry
            startTime = Math.floor(startTime)
            duration = Math.floor(duration)
            let endTime = startTime + duration,
                briefEntry = { name, endTime, startTime, duration, entryType };
            console.log(briefEntry)
            entries.push(briefEntry)
        })
}),
    ro = new PerformanceObserver((list) => {
        list.getEntriesByType('resource').forEach((entry) => {
            let { serverTiming, startTime, duration, name, entryType } = entry as PerformanceResourceTiming
            if (name.includes('mitm') || name.includes('favicon')) return
            startTime = Math.floor(startTime)
            duration = Math.floor(duration)
            if (/^https?:\/\//.test(name)) name = String(name.split('/').pop())
            let endTime = startTime + duration,
                briefEntry = { name, endTime, startTime, duration, entryType };
            console.log(entry.toJSON())

            serverTiming.forEach((entry) => {
                let { name, duration, description } = entry,
                    startTime = Number(description),
                    endTime = startTime + duration

                entries.push({ name, duration, startTime, entryType: 'server', endTime })
            })
            entries.push(briefEntry)

        })

    })


function download(
    url: string,
    fileName = 'file.txt',
    cb: (...args: any[]) => void
) {
    let ttfb = false
    console.log({ url })
    performance.mark('download:start')

    let done = false;
    streamSaver.mitm = `${location.origin}/mitm.html`
    const fileStream = streamSaver.createWriteStream(fileName)

    // abort so it dose not look stuck
    window.onunload = () => {
        fileStream.abort()
    }

    window.onbeforeunload = evt => {
        if (!done) {
            evt.returnValue = `Are you sure you want to leave?`;
        }
    }
    return fetch(url, {
        headers: {
            'TE': 'trailers',
            'startTime': String(performance.now()),
            'started_at': String(Math.floor(Date.now() - performance.now())),
            'cache-control': 'no-cache, no-store, max-age=1, s-maxage=1'

        }
    })
        .then(res => {
            performance.mark('download:ttfb')
            if (!res.body || !res.ok) return Promise.reject(new Error(res.statusText))
            return res.body.pipeTo(fileStream)
        }).then(() => {
            done = true;
            performance.mark('download:finish')
            requestIdleCallback(() => {
                cb()
            });
        })
}

/**
 * 
 * @param {string} url 
 */
async function papaXHR(url: string) {

    //Papa.RemoteChunkSize = 7 * 1024 * 1024;



    performance.mark('XHR:start')
    let timerOpen = true, parsed = [];
    Papa.parse(url, {
        download: true,
        chunkSize: 7 * 1024 * 1024,
        beforeFirstChunk: (chunk) => {
            performance.mark('XHR:finish')
            return chunk
        },
        step: (result) => {
            parsed.push(result.data)
            if (timerOpen) {
                timerOpen = false;
                performance.mark('Parse:start')

            }

        },
        complete: () => {
            performance.measure('Parse:end', 'Parse:start')
            const blobUrl = URL.createObjectURL(new Blob([JSON.stringify(parsed)], { type: 'application/json' }));
            download(blobUrl, 'xhr.json', () => {
                URL.revokeObjectURL(blobUrl);
                parsed = null
            })
        }
    })
}


function listEntries() {
    const entriesObj = entries.sort((a, b) => {
        return a.endTime - b.endTime
    }).reduce((accum, entry) => {
        let { name, endTime, startTime, duration, entryType } = entry;
        accum[name] = { endTime, startTime, duration, entryType };
        return accum;
    }, {} as { [s: string]: Omit<TbriefEntry, 'name'> })
    window.requestIdleCallback(() => {
        console.table(entriesObj);
        po && po.disconnect()
        ro && ro.disconnect()
    });
}
function papaString(url: string) {
    performance.mark('fetch:start')
    fetch(url).then(res => {

        return res.text()
    }).then(csvString => {
        performance.mark('fetch:finish')

        const blobUrl = URL.createObjectURL(new Blob([Papa.parse(csvString).data], { type: 'application/json' }));
        download(blobUrl, 'papa_string.json', () => {
            URL.revokeObjectURL(blobUrl);

        })
    });
}

function papaFile(url: string) {
    performance.mark('fetch:start')
    fetch(url).then(res => {
        return res.blob()
    }).then(blob => {
        performance.mark('fetch:finish')
        var file = new File([blob], "papa_csv.csv", { type: "text/csv", lastModified: new Date().getTime() })
        performance.mark('Parse:start')
        Papa.parse(file, {
            complete: (result) => {
                performance.measure('Parse:end', 'Parse:start')
                const blobUrl = URL.createObjectURL(new Blob([JSON.stringify(result.data)], { type: 'application/json' }));
                download(blobUrl, 'papaFile.json', () => {
                    URL.revokeObjectURL(blobUrl);

                })
            }
        })


    });
}


po.observe({ entryTypes: ['mark', 'measure'] });
ro.observe({ entryTypes: ['resource'] })

requestIdleCallback(() => {
    //papaXHR("http://localhost:8787/csv/raw.json" )
    //papaString("http://localhost:8787/csv/raw.json")
    //papaFile("http://localhost:8787/csv/raw.json")


    /*
setTimeout(() => {
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}, 0)
*/
    //download('http://localhost:8787/csv/transform.json','transform.json')


    //download('/csv/csvparse.json', 'csvparse.json', () => {        listEntries()    })
    //download('/csv/transform.json', 'transform.json', () => { listEntries() })
    download('/csv/fetch.json', 'fetch.json', () => { listEntries() })

});