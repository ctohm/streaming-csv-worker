export const getPapaXHR = () => `<!DOCTYPE html>
<html>
    <head>
    <script src="https://cdn.jsdelivr.net/npm/papaparse@5.3.1/papaparse.min.js" integrity="sha256-tDf9H6Pr0oXtuyG0hGdMQ5OU5EuM5IK8WMK2iTbdvd0=" crossorigin="anonymous"></script>
 
        <script type="application/javascript" >

async function getWithPapaParse(req  ) {
    
    Papa.RemoteChunkSize=7*1024*1024;
    return new Promise((resolve, reject) => {
        let timerOpen=true, parsed=[]
        console.time('First Row');
        console.time('Papaparse Complete');
            Papa.parse(req.url, {
                download: true,
                chunkSize:7*1024*1024,
                step:(result)=>{
                    parsed.push(result.data)
                    if(timerOpen) {
                        timerOpen=false;
                        resolve(result.data)
                    }

                },
                complete:()=>{
                    const response=new Response(JSON.stringify(parsed))
                    console.timeEnd('Papaparse Complete');
                }
            })
        })
    }
let rq=new Request("https://csv.riff.one/files/ishares" ,{headers:{'cache-control':'no-cache'}})
        getWithPapaParse(rq).then(data=>{
            document.body.textContent=JSON.stringify(data)
            console.timeEnd('First Row');
        })
        </script>
        </head>
        <body>
    </body>
</html>

`;
