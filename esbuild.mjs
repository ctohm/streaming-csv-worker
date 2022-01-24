

import esbuild from 'esbuild'
import fs from 'fs/promises'


const mode = process.env.NODE_ENV || 'production'
/**
 * @returns {import('esbuild').BuildOptions}
 */
const buildOptions = ({ outdir = 'dist', format = 'cjs', outExtension, entryPoints }) => {
    return {
        bundle: true,
        platform: 'browser',
        write: true,
        metafile: true,
        entryPoints,
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
let  optionsWorkerEsm=buildOptions(
    {
        format: 'esm',
        outdir: 'packages/worker/dist',
        outExtension: { '.js': '.mjs' },
        entryPoints: ['packages/worker/src/worker.ts']
    }) ,
    optionsWorkerCjs=buildOptions(
        {
            format: 'cjs',
            outdir: 'packages/worker/dist',
            outExtension: { '.js': '.cjs' },
            entryPoints: ['packages/worker/src/worker.ts']
        }) 

esbuild
    .build(optionsWorkerEsm)
    .then(result => esbuild.build(    optionsWorkerCjs))

     .then(result => {
        return console.log({ ...buildOptions, mode, resultkeys: Object.keys(result) })

    })
    .catch((err) => {
        console.error(err)
        return process.exit(1)
    })

