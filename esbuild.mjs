

import esbuild from 'esbuild'
import fs from 'fs/promises'
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
console.log({GlobalsPolyfills,NodeModulesPolyfills})
const mode = process.env.NODE_ENV || 'production'
/**
 * @type {import('esbuild').BuildOptions}
 */
let buildOptions={
    bundle: true,
 platform:'browser',
    write: true,
    metafile: true,
    entryPoints: [ 'src/index.ts'],
    outExtension:{'.js':'.mjs'},
    outdir:'dist',
   // format:'esm',
    sourcemap: mode!=="production",
    minify:mode==="production",
    target:'es2020',
    plugins: [
         NodeModulesPolyfills.default(),
        GlobalsPolyfills.default({
            process: true,
            buffer: true,
           // define: { 'process.env.var': '"hello"' }, // inject will override define, to keep env vars you must also pass define here https://github.com/evanw/esbuild/issues/660
        }),
    ],

}
esbuild
.build(buildOptions)
.then(result=>{
    console.log({...buildOptions,mode,resultkeys:Object.keys(result)})
    return fs.writeFile('meta.json',  JSON.stringify(result.metafile))
})
.catch((err) => {
    console.error(err)
    return   process.exit(1)
})

