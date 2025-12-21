import "dotenv/config";
import {
  ChainhooksClient,
  CHAINHOOKS_BASE_URL,
} from "@hirosystems/chainhooks-client";

// ------------------------------------
// Init client
// ------------------------------------
const client = new ChainhooksClient({
  baseUrl: CHAINHOOKS_BASE_URL.mainnet,
  apiKey: process.env.HIRO_API_KEY,
});

// ------------------------------------
// Update chainhook (FILTER + WEBHOOK)
// ------------------------------------
async function updateChainhook() {
  const CHAINHOOK_UUID = "48c0f565-1bf4-4a2d-a690-9668aa36d61a";

  if (!process.env.WEBHOOK_URL) {
    throw new Error("❌ WEBHOOK_URL is missing in .env");
  }

  const result = await client.updateChainhook(CHAINHOOK_UUID, {
    // ✅ FIXED FILTER (THIS WAS THE ROOT CAUSE)
    filters: {
      events: [
        {
          type: "contract_call",
          contract_identifier:
            "SP1JC5M9MYCNTJG3TV0HTBEYRQDCR9119RH7SB0BA.counter-contract-v1",
          function_name: "increment",
          principal: null, // listen to all callers
        },
      ],
    },

    // ✅ Webhook action
    action: {
      type: "http_post",
      url: process.env.WEBHOOK_URL,
    },
  });

  console.log("✅ Chainhook updated successfully");
  console.log("UUID:", result.uuid);
}

updateChainhook().catch((err) => {
  console.error("❌ Failed to update chainhook");
  console.error(err);
});
