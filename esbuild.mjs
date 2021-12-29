

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
let optionsStatic = buildOptions(
    {
        format: 'iife',
        outdir: 'docs',
        sourcemap: false,
        entryPoints: ['src/bench2.ts']
    }),
    optionsLibEsm = buildOptions(
        {
            format: 'esm',
            outdir: 'dist',
            sourcemap: false,
            outExtension: { '.js': '.mjs' },
            entryPoints: ['src/lib/index.ts']
        }),
    optionsLibCjs = buildOptions(
        {
            format: 'cjs',
            outdir: 'dist',
            sourcemap: false,
            outExtension: { '.js': '.cjs' },
            entryPoints: ['src/lib/index.ts']
        }
    ),
    optionsWorker=buildOptions(
        {
            format: 'esm',
            outdir: 'dist',
            outExtension: { '.js': '.mjs' },
            entryPoints: ['src/worker.ts']
        })


esbuild
    .build(optionsWorker)

    .then(result => esbuild.build(optionsStatic))
    .then(result => esbuild.build(optionsLibEsm))
    .then(result => esbuild.build(optionsLibCjs))

    .then(result => {
        return console.log({ ...buildOptions, mode, resultkeys: Object.keys(result) })

    })
    .catch((err) => {
        console.error(err)
        return process.exit(1)
    })

