import 'dotenv/config';
import {
  ChainhooksClient,
  CHAINHOOKS_BASE_URL,
} from '@hirosystems/chainhooks-client';

const client = new ChainhooksClient({
  baseUrl: CHAINHOOKS_BASE_URL.mainnet,
  apiKey: process.env.HIRO_API_KEY,
});

async function checkStatus() {
  const uuid = '48c0f565-1bf4-4a2d-a690-9668aa36d61a';

  const chainhook = await client.getChainhook(uuid);

console.log('Enabled:', chainhook.status?.enabled);
console.log('Status:', chainhook.status?.status);

}

checkStatus().catch(console.error);
