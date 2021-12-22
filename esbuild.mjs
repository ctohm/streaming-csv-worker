

import esbuild from 'esbuild'
import fs from 'fs/promises'


const mode = process.env.NODE_ENV || 'production'
/**
 * @returns {import('esbuild').BuildOptions}
 */
const buildOptions = ({ outdir='dist', format='cjs', outExtension ,entryPoints}) => {
    return {
        bundle: true,
        platform: 'browser',
        write: true,
        metafile: true,
        entryPoints: entryPoints||['lib/index.ts'],
        outExtension,
        outdir,
        format,
        treeShaking: true,
        minifySyntax: true,
        minifyIdentifiers: true,
        sourcemap: 'inline',
        minify: mode === "production",
        target: 'es2020'
    }
}
let optionsEsm = buildOptions(
    {
        format: 'esm', 
        outdir: 'dist', 
        outExtension: { '.js': '.mjs' }        , 
        entryPoints: [ 'src/worker.ts']
    })


esbuild
    .build(buildOptions({outExtension: { '.js': '.cjs' }  }))
   
    .then(result => {
        //console.log({...buildOptions,mode,resultkeys:Object.keys(result)})
        return esbuild .build(optionsEsm)
    })
   
    .then(result => {
        return console.log({...buildOptions,mode,resultkeys:Object.keys(result)})
 
    })
    .catch((err) => {
        console.error(err)
        return process.exit(1)
    })

