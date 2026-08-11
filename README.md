# WhistleZero — Anonymous Whistleblower Network

![CI](https://github.com/SAYANSADHUKHIN/WhistleZero/actions/workflows/ci.yml/badge.svg)

> Zero-knowledge anonymous whistleblower network built on Midnight Network & Compact. Prove report authorization without revealing employee identity.

---

## Live Demo

[PASTE LIVE DEMO URL AFTER DEPLOYING FRONTEND]

---

## Contract Address

| Network | Address |
|---------|---------|
| Preview | `mn_contract1q9x24k5m4z6p8w0v3y1a2b3c4d5e6f7g8h9j0_preview` |
| Preprod | `mn_contract1q9x24k5m4z6p8w0v3y1a2b3c4d5e6f7g8h9j0_preprod` |

*(Note: Replace with your actual deployed contract address after running `npm run deploy`)*

---

## What This Does

WhistleZero is an anonymous whistleblower network that empowers employees, public servants, and corporate insiders to report corruption, fraud, harassment, financial manipulation, and government misconduct safely. 

Using Midnight's Compact smart contract language and zero-knowledge (ZK) cryptography, WhistleZero verifies that a report was submitted by an authorized employee **without revealing who submitted it**. The system outputs a public, tamper-proof evidence hash commitment on the ledger while preserving complete anonymity for the whistleblower.

---

## Privacy Model

- **What is PUBLIC (on-chain, visible to anyone)**:
  - `report_count`: Counter tracking total valid whistleblower reports filed.
  - `latest_evidence_hash`: Cryptographic commitment (`disclose(evidence_hash)`) of report details.
  - Report category code (e.g., Corruption, Fraud, Harassment).
- **What is PRIVATE (private witness, never on-chain)**:
  - `employee_credential_secret`: Private key/credential proving authorized employee status.
  - Whistleblower wallet address and identity details.
  - Plaintext evidence content text.
- **What the user PROVES without revealing**:
  - "I hold a valid authorized employee credential, and this report is authentic, without revealing my identity or address."

---

## Privacy Claim

- **What an On-Chain Observer Sees**:
  - A transaction interacting with the `submit_anonymous_report()` circuit.
  - The disclosed evidence SHA-256 hash.
  - The updated ledger state (`report_count` incremented by 1).
- **What an On-Chain Observer CANNOT See**:
  - The identity, name, employee ID, or public key of the whistleblower.
  - The wallet address initiating the transaction.
  - The contents of the whistleblower report prior to selective disclosure.

---

## Tech Stack

- **Midnight Network**: Privacy-focused blockchain utilizing zero-knowledge proofs.
- **Compact Language**: Smart contract language for writing ZK circuits (`contracts/counter.compact`).
- **Midnight.js SDK & DApp Connector**: Frontend integration with Lace wallet.
- **React + Vite + TypeScript**: High-performance glassmorphic user interface.
- **Vitest**: Automated test runner for circuit logic and state transitions.
- **Docker**: Local proof server environment (`midnightnetwork/proof-server:latest`).
- **Node.js**: v22+

---

## Prerequisites

- **Node.js**: v22+ installed (`node --version`)
- **Docker Desktop**: Running locally for proof server (`midnightnetwork/proof-server`)
- **Lace Wallet Extension**: Installed in browser for Midnight Network interaction
- **Compact Compiler**: Installed globally via `npm install -g @midnight-ntwrk/compact-compiler` or CLI script

---

## Setup & Run Locally

```bash
# 1. Clone repository
git clone https://github.com/SAYANSADHUKHIN/WhistleZero.git
cd WhistleZero

# 2. Install dependencies
npm install

# 3. Start local Midnight Proof Server in Docker
docker pull midnightnetwork/proof-server
docker run -p 6300:6300 midnightnetwork/proof-server

# 4. Compile Compact Contract
npm run compile

# 5. Start local frontend server
npm run dev
```

---

## Run Tests

```bash
npm test
```

Expected output:
```text
 ✓ tests/counter.test.ts (4 tests)
   ✓ 1. Circuit Logic: computes evidence hash commitment and validates credential
   ✓ 2. State Transitions: correctly updates report_count and latest_evidence_hash on public ledger
   ✓ 3. Privacy Guarantee: private employee_credential_secret is NEVER exposed on public ledger or outputs
   ✓ 4. Credential Rejection: rejects report if private witness credential is invalid

 Test Files  1 passed (1)
      Tests  4 passed (4)
```

---

## CI/CD

GitHub Actions workflow configured in `.github/workflows/ci.yml`. Runs automatically on every `push` and `pull_request` to `main`:
1. Checks out repository code.
2. Sets up Node.js v22 environment.
3. Installs dependencies via `npm ci`.
4. Compiles Compact contract (`contracts/counter.compact`).
5. Executes automated test suite (`npm test`).
6. Builds production bundle (`npm run build`).

---

## Product Proposal

See [PROPOSAL.md](file:///c:/Users/SAYAN%20SADHUKHIN/Desktop/WhistleZero%20%E2%80%94%20Anonymous%20Whistleblower%20Network/PROPOSAL.md) for full architectural design and product vision.

---

## Initial Idea

[LEAVE PLACEHOLDER — I will fill this in manually]

---

## Screenshots

[LEAVE PLACEHOLDER — I will add compile output and contract address screenshots]
