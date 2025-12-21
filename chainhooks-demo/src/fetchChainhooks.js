import "dotenv/config";
import {
  ChainhooksClient,
  CHAINHOOKS_BASE_URL,
} from "@hirosystems/chainhooks-client";

const client = new ChainhooksClient({
  baseUrl: CHAINHOOKS_BASE_URL.mainnet,
  apiKey: process.env.HIRO_API_KEY,
});

async function run() {
  // Step 1: get list (summary)
  const list = await client.getChainhooks();

  console.log("Total chainhooks:", list.total);
  console.log("Limit:", list.limit);
  console.log("Offset:", list.offset);

  for (const [i, item] of list.results.entries()) {
    console.log(`\n#${i + 1}`);
    console.log("UUID:", item.uuid);

    // Step 2: get full details
    const full = await client.getChainhook(item.uuid);

    console.log("Name:", full.name);
    console.log("Chain:", full.chain);
    console.log("Network:", full.network);
    console.log("Enabled:", full.status?.enabled);
    console.log("Status:", full.status?.status);
  }
}

run().catch(console.error);
