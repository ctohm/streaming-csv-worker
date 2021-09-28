

import esbuild from 'esbuild'
import fs from 'fs/promises'
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
//import { externalGlobalPlugin } from "esbuild-plugin-external-global"

console.log({GlobalsPolyfills,NodeModulesPolyfills})
const mode = process.env.NODE_ENV || 'production'
/**
 * @returns {import('esbuild').BuildOptions}
 */
const buildOptions=({outdir,format,outExtension})=>{
    return {
    bundle: true,
    platform:'browser',
    write: true,
    metafile: true,
    entryPoints: [ 'src/index.ts'],
    outExtension,
    outdir,
    format,
    treeShaking: true,
    minifySyntax: true,
    minifyIdentifiers: true,
    sourcemap: mode!=="production",
    minify:mode==="production",
    target:'es2020',
    //plugins: [
         //NodeModulesPolyfills.default(),
        //GlobalsPolyfills.default({
            //stream: true,
        //}),
        //externalGlobalPlugin( { 'Buffer': 'fetch' })   
    //],

}
}
esbuild
.build(buildOptions({format:'esm',outdir:'dist',outExtension:{'.js':'.mjs'}}))
.then(result=>{
    console.log({...buildOptions,mode,resultkeys:Object.keys(result)})
    return fs.writeFile('meta.json',  JSON.stringify(result.metafile))
})
.then(()=>{
    return esbuild
    .build(buildOptions({format:'cjs',outdir:'dist/cjs'}))

})
.then(result=>{
    console.log({...buildOptions,mode,resultkeys:Object.keys(result)})
    return fs.writeFile('meta.cjs.json',  JSON.stringify(result.metafile))
})
.catch((err) => {
    console.error(err)
    return   process.exit(1)
})

