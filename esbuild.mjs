

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
     format:'esm',
     treeShaking: true,
     minifySyntax: true,
     minifyIdentifiers: true,
    sourcemap: mode!=="production",
    minify:false &&mode==="production",
    target:'es2020',
    //plugins: [
         //NodeModulesPolyfills.default(),
        //GlobalsPolyfills.default({
            //process: true,
        //}),
    //],

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

