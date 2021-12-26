import Papa from 'papaparse'
const po = new PerformanceObserver((list) => {
    list.getEntries().map(
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
        }).sort((a, b) => {
            return b.endTime - a.endTime
        }).forEach(obj => console.log(obj))


});
// Start listening for `resource` entries to be dispatched.
//po.observe({ entryTypes: ['resource', 'mark', 'measure'] });


export async function getWithPapaParse(req: Request): Promise<string> {

    Papa.RemoteChunkSize = 7 * 1024 * 1024;
    let startXhrMark, completeMark, frMark;


    return new Promise((resolve, reject) => {
        startXhrMark = performance.mark('XHROrFetch:start')
        let timerOpen = true, parsed = [] as unknown[]
        Papa.parse(req.url, {
            download: true,
            chunkSize: 7 * 1024 * 1024,
            beforeFirstChunk: (chunk) => {
                performance.mark('XHROrFetch:finish')
                performance.measure('Download Finished', 'XHROrFetch:start', 'XHROrFetch:finish')
                return chunk
            },
            step: (result) => {
                parsed.push(result.data)
                if (timerOpen) {
                    timerOpen = false;
                    performance.measure('First Row', 'XHROrFetch:finish')

                }

            },
            complete: () => {
                performance.measure('Parsed', 'XHROrFetch:finish')
                resolve(JSON.stringify(parsed))
            }
        })
    })
}






export async function uploadStringified(stringified: string) {
    performance.measure('stringified', 'XHROrFetch:finish')


    return fetch('https://csv.riff.one/files/upload', { method: 'POST', body: stringified, mode: "cors", headers: { 'Content-Type': 'application/json' } }).then(res => {
        performance.measure('Upload Complete', 'XHROrFetch:finish')
        performance.getEntries().map(
            /**
             * @param {PerformanceEntry} entry
             **/
            (entry) => {
                let { startTime, duration, name, entryType } = entry
                startTime = Math.floor(startTime)
                duration = Math.floor(duration)

                let endTime = startTime + duration
                console.log({ name, endTime, entryType })
                return { ...entry.toJSON(), endTime }
            }).sort((a, b) => {
                return a.endTime - b.endTime
            })
        return// po.disconnect()

    })
}

globalThis.getWithPapaParse = getWithPapaParse

globalThis.uploadStringified = uploadStringified