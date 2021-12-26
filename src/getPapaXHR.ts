export const getPapaXHR = () => `<!DOCTYPE html>
<html>

<head>
    <script src="https://cdn.jsdelivr.net/npm/papaparse@5.3.1/papaparse.min.js"
        integrity="sha256-tDf9H6Pr0oXtuyG0hGdMQ5OU5EuM5IK8WMK2iTbdvd0=" crossorigin="anonymous"></script>

    <script type="application/javascript">
        function downloadBlob(blob, fileName = 'file.txt') {
            // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
            const blobUrl = URL.createObjectURL(blob);
            console.log(performance.measure('Created Blob URL', 'Sending XHR'))
console.log(blobUrl)
//
//
//
            //let downloadItem = browser.downloads.download(
                //{
                    //url: blobUrl,
                    //saveAs: false,
                    //fileName
                //}
            //).then(console.log(performance.measure('Start Downloading', 'Sending XHR')))
            //browser.downloads.onChanged.addListener((downloadDelta) => {
                //console.log({ downloadDelta })
                //console.log(performance.measure('Download Complete', 'Sending XHR'))
            //})

        }
        async function getWithPapaParse(req) {

            Papa.RemoteChunkSize = 7 * 1024 * 1024;
            let startXhrMark, completeMark, frMark;


            return new Promise((resolve, reject) => {
                startXhrMark = performance.mark('Sending XHR')
                let timerOpen = true, parsed = []
                Papa.parse(req.url, {
                    download: true,
                    chunkSize: 7 * 1024 * 1024,
                    step: (result) => {
                        parsed.push(result.data)
                        if (timerOpen) {
                            timerOpen = false;
                            console.log(performance.measure('First Row', 'Sending XHR'))

                        }

                    },
                    complete: () => {
                        console.log(performance.measure('Parsed', 'Sending XHR'))
                        resolve(JSON.stringify(parsed))
                    }
                })
            })
        }
        let rq = new Request("https://csv.riff.one/files/ishares", { headers: { 'cache-control': 'no-cache' } })
        getWithPapaParse(rq)
            .then(stringified => {

                let jsonBlob = new Blob([stringified])
                downloadBlob(jsonBlob, 'xhr.json');
            });




    </script>
</head>

<body>
</body>

</html>`;
