
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
    scriptPath: "./test/worker.mjs",
    // Some options omitted, see src/options/index.ts for the full list
    sourceMap: true,
    log: new ConsoleLog(), // Defaults to no-op logger
    wranglerConfigPath: "./wrangler.toml",
    watch: true,
    port: 8778,
    upstream: "https://workers.roboadwiser.com",
    crons: ["*/5 * * * *"],
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
const CMF_API_URL = "https://www.cmfchile.cl/institucional/estadisticas/ffm_download.php";
test("increments path count for new paths", async (t) => {
  // Get the Miniflare instance
  const { mf } = t.context;
  // Dispatch a fetch event to our worker
  const response1 = await mf.dispatchFetch(CMF_API_URL);
  t.is(response1.status, 200)
   
let holdings=await response1.json()
  // Check the count is "1" as this is the first time we've been to this path
  t.assert(Array.isArray(holdings));
});
