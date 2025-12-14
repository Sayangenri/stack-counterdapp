# Stacks Counter DApp (Clarity 4)

A full-stack **Stacks blockchain DApp** that demonstrates a **Clarity 4 smart contract deployed on Mainnet** with a **React + Vite frontend** for on-chain interaction using **Hiro Wallet**.

This project shows an end-to-end flow: **Clarity contract → Mainnet deployment → Wallet connection → Frontend interaction**.

---

## 🚀 Features

- 🧠 **Clarity 4 smart contract**
- ⛓️ **Deployed on Stacks Mainnet**
- 🔐 Wallet connection via **Hiro Wallet**
- 🔄 Read-only function (`get-count`)
- ✍️ Public transaction (`increment`)
- ⚛️ **React + Vite frontend**
- 🎨 Clean UI using external CSS
- 📁 Single mono-repo (contracts + frontend)

---

## 🏗️ Project Structure

```
hiro-structure/
│
├── contracts/
│   └── counter-contract.clar
│
├── deployments/
│   ├── default.devnet-plan.yaml
│   ├── default.testnet-plan.yaml
│   └── default.mainnet-plan.yaml
│
├── settings/
│   ├── Devnet.toml
│   ├── Testnet.toml
│   └── Mainnet.toml
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── .env
│   └── src/
│       ├── App.tsx
│       ├── App.css
│       ├── main.tsx
│       └── stacks.ts
│
├── tests/
│   └── contract.test.ts
│
├── Clarinet.toml
├── README.md
└── .gitignore
```

---

## Counter Contract

- Contract name: counter-contract-v1
- Network: Stacks Mainnet
- Language: Clarity 4

### 🚀 What It Does

#### Smart Contract (`counter-contract-v1`)
- **`get-count`** — Read-only function returning the current counter value on-chain
- **`increment`** — Transactional function that increments the counter by 1


## 🛠️ Deployment

### Deploy to Mainnet (Clarinet)

```bash
clarinet deployments apply --mainnet
```

**Deployment Configuration:**
- Uses `Clarinet.toml` for project settings
- Uses `deployments/default.mainnet-plan.yaml` for deployment plan
- Clarity version: **4**

---

#### Frontend
- Connect your Wallet
- View live counter value directly from the blockchain
- Submit increment transactions
- Monitor transaction status

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Smart Contract** | Clarity 4 |
| **Blockchain** | Stacks Mainnet |
| **Deployment Tool** | Clarinet |
| **Frontend Framework** | React + Vite |
| **Language** | TypeScript |
| **Wallet Integration** | Hiro Wallet + @stacks/connect |
| **Transaction Handling** | @stacks/transactions |

---

## 🌐 Deployed Contract

**Live on Stacks Mainnet:**
```
SP1JC5M9MYCNTJG3TV0HTBEYRQDCR9119RH7SB0BA.counter-contract-v1
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js ≥ 18
- Hiro Wallet Browser Extension ([install](https://wallet.hiro.so/))
- Clarinet CLI (for deployment only)

### Setup & Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **`http://localhost:5173`** in your browser.

### Environment Setup

Create `frontend/.env`:
```env
VITE_NETWORK=mainnet
VITE_CONTRACT_ADDRESS=SP1JC5M9MYCNTJG3TV0HTBEYRQDCR9119RH7SB0BA
VITE_CONTRACT_NAME=counter-contract-v1
```

---

## 🔐 How It Works

### Wallet Connection Flow
1. Click **"Connect Wallet"** in the UI
2. Approve connection in Hiro Wallet popup
3. Your wallet address is now connected

### Reading Data (View Function)
```
Click "Refresh" → Reads get-count from blockchain → Display updates instantly
```

### Writing Data (Transaction)
```
Click "Increment" → Sign transaction in Hiro Wallet → 
Submit to Stacks → Await confirmation → Counter updates on-chain
```

---

## 🙏 Built By

**Sayan Genri**  
Full-stack Web3 developer focused on Stacks, Clarity, and decentralized applications.

---

## 🤝 Credits

- [Stacks Foundation](https://www.stacks.co/) – The Stacks ecosystem
- [Hiro Systems](https://www.hiro.so/) – Developer tools & SDK
- [Clarity Community](https://discord.gg/stacks) – Amazing developer community