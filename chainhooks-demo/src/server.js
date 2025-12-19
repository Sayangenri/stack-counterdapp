import express from "express";
import cors from "cors";
import {
  ChainhooksClient,
  CHAINHOOKS_BASE_URL,
} from "@hirosystems/chainhooks-client";
import "dotenv/config";

const app = express();

// ✅ FIX CORS (this line is the key)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const client = new ChainhooksClient({
  baseUrl: CHAINHOOKS_BASE_URL.mainnet,
  apiKey: process.env.HIRO_API_KEY,
});

const CHAINHOOK_UUID = "48c0f565-1bf4-4a2d-a690-9668aa36d61a";

// API for frontend
app.get("/api/chainhook-status", async (req, res) => {
  try {
    const hook = await client.getChainhook(CHAINHOOK_UUID);

    res.json({
      enabled: hook.status?.enabled,
      status: hook.status?.status,
      lastBlock: hook.status?.last_evaluated_block_height,
      occurrences: hook.status?.occurrence_count,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chainhook status" });
  }
});

// Webhook endpoint (Chainhooks)
app.post("/webhook", (req, res) => {
  console.log("📦 Chainhook event received");
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("🚀 Backend running on http://localhost:3000");
});
