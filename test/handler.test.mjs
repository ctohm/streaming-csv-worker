
import { ConsoleLog, Miniflare } from "miniflare";

import test from "ava";

test.beforeEach((t) => {
  // Create a new Miniflare environment for each test
  const mf = new Miniflare({
    scriptPath: "./dist/index.mjs",
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
    durableObjects:{SpdrHarvester:{className:'SpdrHarvester'}},
    durableObjectsPersist:'redis://localhost:6379',
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

test("increments path count for new paths", async (t) => {
  // Get the Miniflare instance
  const { mf } = t.context;
  // Dispatch a fetch event to our worker
  const result = await mf.dispatchFetch("http://localhost:8778/SPY");
  t.is(result.status, 200)
const content=await result.text(),
holdings=JSON.parse(content)
  // Check the count is "1" as this is the first time we've been to this path
  t.assert(Array.isArray(holdings));
});
