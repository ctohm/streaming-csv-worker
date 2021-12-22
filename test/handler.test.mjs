
import { ConsoleLog, Miniflare } from "miniflare";
import {StreamingCSVParser} from '../dist/index.mjs'
import test from "ava";

  const CFMColumns = ['run_fondo',
    'nombre_fondo',
    'ffm_6010100',
    'ffm_6010211',
    'ffm_6010212',
    'ffm_6010300',
    'ffm_6010400',
    'ffm_6010500',
    'ffm_6010600',
    'ffm_6010700',
    'ffm_6010800',
    'ffm_6010900',
    'ffm_6011000',
    'ffm_tir_6011111',
    'ffm_par_6011111',
    'ffm_rel_6011111',
    'ffm_6011112',
    'ffm_6011113',
    'ffm_6011114',
    'ffm_6011200',
    'ffm_6011300',
    'ffm_6011400',
    'ffm_6011511',
    'ffm_6011512',
    'ffm_6011513'];

console.log(StreamingCSVParser)

test.beforeEach((t) => {
  // Create a new Miniflare environment for each test
  const mf = new Miniflare({
    scriptPath: "./dist/worker.mjs",
    // Some options omitted, see src/options/index.ts for the full list
    sourceMap: true,
    log: new ConsoleLog(), // Defaults to no-op logger
    wranglerConfigPath: "./wrangler.toml",
    watch: true,
    port: 8778,
    upstream: "https://www.cmfchile.cl",
    crons: ["*/55 * * * *"],
    //kvNamespaces: ["TEST_NAMESPACE"],
    kvPersist: 'redis://localhost:6379',
    cachePersist: false,
    modules: true,
    modulesRules: [
      { type: "ESModule", include: ["**/*.mjs"], fallthrough: true }]
    //sitePath: "./public/",
    //  envPath: ".env",
  });
  t.context = { mf };
  console.log(t.context)
});

test("request to small CSV source is tranformed to a json parsable response", async (t) => {
  // Get the Miniflare instance
  const { mf } = t.context;
  // Dispatch a fetch event to our worker

  /**
   * @type {Response} response1
   */
  const response1 = await mf.dispatchFetch('http://127.0.0.1:8787'),
  ct=response1.headers.get('content-type');

  t.is(ct,'application/json;charset=UTF-8')

  t.is(response1.status, 200)
  
  let holdings=await response1.json()
  // Check the count is "1" as this is the first time we've been to this path
  t.assert(Array.isArray(holdings));
});

test("request to huge CSV source is tranformed to a json parsable response", async (t) => {
  // Get the Miniflare instance
  const { mf } = t.context;
  // Dispatch a fetch event to our worker

  /**
   * @type {Response} response1
   */
  const response1 = await mf.dispatchFetch('http://127.0.0.1:8787/ishares'),
  ct=response1.headers.get('content-type');

  t.is(ct,'application/json;charset=UTF-8')

  t.is(response1.status, 200)
  
  
});
