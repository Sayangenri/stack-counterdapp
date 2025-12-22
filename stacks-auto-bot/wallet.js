const { generateWallet } = require("@stacks/wallet-sdk");
require("dotenv").config();

async function getBotPrivateKey() {
  const wallet = await generateWallet({
    secretKey: process.env.MNEMONIC,
    password: "",
  });

  return wallet.accounts[0].stxPrivateKey;
}

module.exports = { getBotPrivateKey };

