// ==UserScript==
// @name       Download JSON
// @namespace  http://ffflabs.com/
// @version    0.1
// @description  used to access browser's downloads API
// @match      http://localhost:8787/download
// @require    https://cdn.jsdelivr.net/npm/papaparse@5.3.1/papaparse.min.js
// @grant GM_download
// @grant GM_xmlhttpRequest





// @copyright  2014 amenadiel@gmail.com

// ==/UserScript==

function isLoaded() {
    return (document.readyState === 'ready' ||
        document.readyState === 'complete')
}
let entries = []
const po = new PerformanceObserver((list) => {
    let newEntries = list.getEntries().map(
        /**
         * @param {PerformanceEntry} entry
         **/
        (entry) => {
            let { startTime, duration, name, entryType } = entry
            startTime = Math.floor(startTime)
            duration = Math.floor(duration)

            let endTime = startTime + duration
            //        console.log(entry.toJSON())
            return { name, endTime, startTime, duration, entryType }
        })
    newEntries.forEach(obj => console.log(obj))
    entries = entries.concat(newEntries);
});
function download(url, fileName = 'file.txt', cb) {
    let ttfb = false
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    performance.mark('download:start')
    GM_download({
        url,
        name: fileName,
        onerror: (e) => console.error(e),
        onload: (...args) => {
            performance.measure('download:complete', 'download:start')
            listEntries(po)
            cb && cb()
        },
        onprogress: (progress) => {
            if (!ttfb) {
                performance.measure('download:ttfb', 'download:start')

                ttfb = true;
            }
        }
    });
}
async function papaXHR(req) {

    Papa.RemoteChunkSize = 7 * 1024 * 1024;
    let startXhrMark, completeMark, frMark;


    startXhrMark = performance.mark('XHR:start')
    let timerOpen = true, parsed = [];
    Papa.parse(req.url, {
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


function listEntries(po) {
    const entriesObj = entries.sort((a, b) => {
        return a.endTime - b.endTime
    }).reduce((accum, entry) => {
        let { name, endTime, startTime, duration, entryType } = entry;
        accum[name] = { endTime, startTime, duration, entryType };
        return accum;
    }, {})
    window.requestIdleCallback(() => {

        console.table(entriesObj);
        po && po.disconnect()
    });
}
function papaString(url) {
    performance.mark('fetch:start')
    fetch(url).then(res => {

        /*try {
 
            Papa.parse(res.body,{
                step: (result) => {
                 console.log(result);
                },
                complete:(completeResult) =>{
                 console.log(completeResult)
                }
            })
 
        } catch(err) {
            console.error(err);
        }*/
        return res.text()
    }).then(csvString => {
        performance.mark('fetch:finish')

        const blobUrl = URL.createObjectURL(new Blob([Papa.parse(csvString).data], { type: 'application/json' }));
        download(blobUrl, 'papa_string.json', () => {
            URL.revokeObjectURL(blobUrl);

        })
    });
}

function papaFile(url) {
    performance.mark('fetch:start')
    fetch(url).then(res => {

        /*try {
 
            Papa.parse(res.body,{
                step: (result) => {
                 console.log(result);
                },
                complete:(completeResult) =>{
                 console.log(completeResult)
                }
            })
 
        } catch(err) {
            console.error(err);
        }*/
        return res.blob()
    }).then(blob => {
        performance.mark('fetch:finish')
        var file = new File([blob], "papa_csv.csv", { type: "text/csv", lastModified: new Date().getTime() })
        Papa.parse(file, {
            complete: (result) => {
                performance.measure('Parse:end', 'Parse:start')
                const blobUrl = URL.createObjectURL(new Blob([JSON.stringify(result.data)], { type: 'application/json' }));
                download(blobUrl, 'papaFile.json', () => {
                    URL.revokeObjectURL(blobUrl);
                    parsed = null
                })
            }
        })


    });
}
(function () {
    'use strict';


    po.observe({ entryTypes: ['mark', 'measure'] });

    window.requestIdleCallback(() => {
        performance.mark('window:idle')
        //papaXHR("http://localhost:8787/csv/raw.json")
        papaString("http://localhost:8787/csv/raw.json")



        // download('http://localhost:8787/csv/stream.json','stream.json')

    });
})();