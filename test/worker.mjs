import { StreamingCSVParser } from '../dist/index.mjs'


const CFMColumns = [ "Run Fondo", 
"Nombre Fondo", 
"FFM_6020100", 
"FFM_6020200", 
"FFM_6020300", 
"FFM_6020400", 
"FFM_6020500", 
"FFM_6020600", 
"FFM_6020700", 
"FFM_6020800", 
"FFM_6020900", 
"FFM_6021000", 
"FFM_tir_6021111", 
"FFM_par_6021111", 
"FFM_rel_6021111", 
"FFM_6021112", 
"FFM_6021113", 
"FFM_6021114", 
"FFM_6021200", 
"FFM_6021300", 
"FFM_6021400", 
"FFM_6021511", 
"FFM_6021512", 
"FFM_6021513",];

    

async function getNewest() {
    const response = await fetch("https://www.cmfchile.cl/institucional/estadisticas/ffm_download.php", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en,es-CL;q=0.9,es-419;q=0.8,es;q=0.7,it;q=0.6,fr;q=0.5,la;q=0.4",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",

            "referer": "https://www.cmfchile.cl/institucional/estadisticas/ffm_cartera.php",
        },

        "body": "mm=06&aa=2021&cartera=EXTR",
        "method": "POST",

    });
    return new StreamingCSVParser({ delimiter: ';', from_line: 2, columns: CFMColumns })
        .on('end', function () {
            console.log('parser end');
        })

        .transform(response)
}

addEventListener('fetch', (event) => {
    let { request, waitUntil } = event


    event.respondWith(getNewest());

});