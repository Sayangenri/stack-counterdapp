import "dotenv/config";
import {
  ChainhooksClient,
  CHAINHOOKS_BASE_URL,
} from "@hirosystems/chainhooks-client";

const client = new ChainhooksClient({
  baseUrl: CHAINHOOKS_BASE_URL.mainnet,
  apiKey: process.env.HIRO_API_KEY,
});

const CHAINHOOK_UUID = "48c0f565-1bf4-4a2d-a690-9668aa36d61a";

async function enable() {
  await client.enableChainhook(CHAINHOOK_UUID, true);
  console.log("✅ Chainhook enabled");
}

enable().catch(console.error);
