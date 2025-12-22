const { autoIncrement } = require("./bot");

console.log("🤖 Stacks bot running...");

// run once
autoIncrement().catch(console.error);

// run every 60s
setInterval(() => {
  autoIncrement().catch(console.error);
}, 100_000);
