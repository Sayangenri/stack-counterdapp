import 'dotenv/config';
import {
  ChainhooksClient,
  CHAINHOOKS_BASE_URL,
} from '@hirosystems/chainhooks-client';

const client = new ChainhooksClient({
  baseUrl: CHAINHOOKS_BASE_URL.mainnet,
  apiKey: process.env.HIRO_API_KEY,
});

async function fetchAllChainhooks() {
  const response = await client.getChainhooks();

  console.log('Total chainhooks:', response.total);
  console.log('Limit:', response.limit);
  console.log('Offset:', response.offset);

  response.results.forEach((hook, index) => {
    console.log(`\n#${index + 1}`);
    console.log('UUID:', hook.uuid);
    console.log('Name:', hook.name);
    console.log('Network:', hook.network);
    console.log('Enabled:', hook.enabled);
  });
}

fetchAllChainhooks().catch(console.error);
