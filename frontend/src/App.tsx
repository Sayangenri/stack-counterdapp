import { useState, useEffect } from "react";
import { connect, openContractCall } from "@stacks/connect";
import {
  fetchCallReadOnlyFunction,
  cvToValue,
} from "@stacks/transactions";
import { STACKS_MAINNET } from "@stacks/network";
import { userSession } from "./stacks";
import "./App.css";

const network = STACKS_MAINNET;

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as string;
const CONTRACT_NAME = import.meta.env.VITE_CONTRACT_NAME as string;

function App() {
  const [count, setCount] = useState<number | null>(null);
  const [connected, setConnected] = useState(
    userSession.isUserSignedIn()
  );
const [chainhookStatus, setChainhookStatus] = useState<{
  enabled: boolean;
  status: string;
  lastBlock?: number;
  occurrences?: number;
} | null>(null);

useEffect(() => {
  const fetchChainhookStatus = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/chainhook-status");
      const data = await res.json();
      setChainhookStatus(data);
    } catch (err) {
      console.error("Failed to fetch chainhook status");
    }
  };

  fetchChainhookStatus();
  const interval = setInterval(fetchChainhookStatus, 5000);

  return () => clearInterval(interval);
}, []);

  // -------------------------
  // Connect wallet
  // -------------------------
const connectWallet = async () => {
  await connect();
  setConnected(true);
};

  // -------------------------
  // Read count
  // -------------------------
  const fetchCount = async () => {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-count",
      functionArgs: [],
      network,
      senderAddress: CONTRACT_ADDRESS,
    });

    // Convert Clarity value → JS value
    const value = cvToValue(result);
    setCount(Number(value));
  };

  // -------------------------
  // Increment counter
  // -------------------------
  const increment = async () => {
    openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "increment",
      functionArgs: [],
      network,
      onFinish: () => {
        alert("Transaction submitted!");
      },
    });
  };

  return (


    

    <div className="app">
    {chainhookStatus && (
  <div
    style={{
      marginTop: 12,
      padding: 12,
      borderRadius: 10,
      background: "#0b1220",
      color: "#e5e7eb",
      fontSize: 14,
    }}
  >
    <div>
      🔗 Chainhook:{" "}
      <strong
        style={{
          color: chainhookStatus.enabled ? "#22c55e" : "#ef4444",
        }}
      >
        {chainhookStatus.status}
      </strong>
    </div>

    <div style={{ opacity: 0.8, marginTop: 4 }}>
      Enabled: {chainhookStatus.enabled ? "Yes" : "No"} • Last block:{" "}
      {chainhookStatus.lastBlock ?? "--"} • Events:{" "}
      {chainhookStatus.occurrences ?? 0}
    </div>
  </div>
)}

      <div className="card" role="main" aria-labelledby="app-title">
        <div className="card-header">
          <div>
            <h1 id="app-title" className="title">Stacks Counter</h1>
            <p className="subtitle">Mainnet • Clarity 4</p>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6}}>
            <div className="network-chip">Mainnet</div>
            <div className="status-text">{connected ? 'Wallet connected' : 'Not connected'}</div>
          </div>
        </div>

        {!connected ? (
          <div style={{display:'flex',justifyContent:'center',marginTop:18}}>
            <button className="btn primary" onClick={connectWallet} type="button" aria-label="Connect Wallet">
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <div className="counter-box" aria-live="polite">
              <span className="label">Current Count</span>
              <span className="count">
                {count !== null ? count : "--"}
              </span>
            </div>

            <div className="actions">
              <button className="btn ghost" onClick={fetchCount} type="button">
                Refresh
              </button>

              <button className="btn primary" onClick={increment} type="button">
                Increment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
