const {
  makeContractCall,
  broadcastTransaction,
  PostConditionMode,
} = require("@stacks/transactions");

const { StacksMainnet } = require("@stacks/network");
const { getBotPrivateKey } = require("./wallet");
require("dotenv").config();

const network = new StacksMainnet();

async function autoIncrement() {
  const senderKey = await getBotPrivateKey();

  const tx = await makeContractCall({
    contractAddress: process.env.CONTRACT_ADDRESS,
    contractName: process.env.CONTRACT_NAME,
    functionName: "increment",
    functionArgs: [],
    senderKey,
    network,
    postConditionMode: PostConditionMode.Allow,
    fee: 1000,
  });

  const result = await broadcastTransaction(tx, network);
  console.log("✅ Transaction sent:", result);
}

module.exports = { autoIncrement };
