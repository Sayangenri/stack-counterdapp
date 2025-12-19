import 'dotenv/config';
import {
  ChainhooksClient,
  CHAINHOOKS_BASE_URL,
} from '@hirosystems/chainhooks-client';

const client = new ChainhooksClient({
  baseUrl: CHAINHOOKS_BASE_URL.mainnet,
  apiKey: process.env.HIRO_API_KEY,
});

async function createChainhook() {
  const chainhook = await client.registerChainhook({
    version: '1',
    name: 'track-counter-increment',
    chain: 'stacks',
    network: 'mainnet',

    filters: {
      events: [
        {
          type: 'contract_call',
          contract_identifier:
            'SP1JC5M9MYCNTJG3TV0HTBEYRQDCR9119RH7SB0BA.counter',
          function_name: 'increment',

          // ✅ REQUIRED
          principal: null, // listen to all callers
        },
      ],
    },

    action: {
      type: 'http_post',
      url: process.env.WEBHOOK_URL,
    },

    options: {
      decode_clarity_values: true,
      enable_on_registration: true,
    },
  });

  console.log('✅ Chainhook created:', chainhook.uuid);
}

createChainhook().catch(console.error);
