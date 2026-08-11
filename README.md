<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F0C29,50:302B63,100:24243e&height=230&section=header&text=WhistleZero&fontSize=68&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Anonymous%20Whistleblower%20Network%20%E2%80%94%20Built%20on%20Midnight%20%26%20Compact&descAlignY=58&descSize=18&descColor=D6C9FF" width="100%"/>

<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&weight=500&size=22&duration=2800&pause=900&color=A78BFA&center=true&vCenter=true&width=750&lines=Prove+report+authorization.;Reveal+nothing+about+who+you+are.;Zero-Knowledge+%7C+Midnight+Network+%7C+Compact;Built+for+judges+who+verify%2C+not+just+trust." alt="Typing SVG" />

<br/>

<img src="https://skillicons.dev/icons?i=react,ts,vite,nodejs,docker,git&theme=dark" alt="Tech stack icons"/>

<br/>

[![CI](https://github.com/thesayancodes/WhistleZero-Anonymous_Whistleblower_Network/actions/workflows/ci.yml/badge.svg)](https://github.com/thesayancodes/WhistleZero-Anonymous_Whistleblower_Network/actions/workflows/ci.yml)
![Zero-Knowledge](https://img.shields.io/badge/privacy-zero--knowledge-9146FF?style=for-the-badge)
![Network](https://img.shields.io/badge/network-Midnight-1E2327?style=for-the-badge)
![Compact](https://img.shields.io/badge/contracts-Compact-6C5CE7?style=for-the-badge)
![Node](https://img.shields.io/badge/node-v22%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)

![Last Commit](https://img.shields.io/github/last-commit/thesayancodes/WhistleZero-Anonymous_Whistleblower_Network?color=blueviolet&label=last%20commit)
![Top Language](https://img.shields.io/github/languages/top/thesayancodes/WhistleZero-Anonymous_Whistleblower_Network?color=9146FF)
![Repo Size](https://img.shields.io/github/repo-size/thesayancodes/WhistleZero-Anonymous_Whistleblower_Network?color=302b63)
![Visitors](https://visitor-badge.laobi.icu/badge?page_id=thesayancodes.WhistleZero-Anonymous_Whistleblower_Network&color=blueviolet)

<br/>

**[🎥 Live Demo](#-live-demo)** &nbsp;•&nbsp; **[🔍 How It Works](#-how-it-works)** &nbsp;•&nbsp; **[🔐 Privacy Model](#-privacy-model)** &nbsp;•&nbsp; **[⚡ Quick Start](#-quick-start)** &nbsp;•&nbsp; **[🧑‍⚖️ For Judges](#-60-second-judge-checklist)**

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F0C29,50:6C5CE7,100:0F0C29&height=3&width=1000" width="100%"/>

</div>

<br/>

## 🎯 The Problem

Corruption, fraud, and harassment thrive in silence — and silence is rational. Roughly three in four employees who report misconduct end up facing some form of retaliation, and fear of exactly that outcome is the top reason people who witness wrongdoing say nothing at all. Traditional reporting channels — hotlines, HR inboxes, even "anonymous" web forms — routinely leak identity through IP logs, writing style, or simple metadata.

Blockchain-based reporting *should* fix this. Instead, most on-chain systems make it worse: every transaction is signed by a public wallet address, permanently linking a report to a person.

> ### 🛡️ WhistleZero closes that gap.

WhistleZero lets an employee, public servant, or corporate insider submit a report that the chain can **verify** — *"this came from someone with a valid credential"* — without the chain, or anyone watching it, ever learning **who**. It does this using [Midnight Network](https://midnight.network)'s Compact language, which compiles smart-contract logic into zero-knowledge circuits that generate proofs **locally**, on the whistleblower's own machine, before anything touches a public ledger.

<div align="center">

![Verifiable](https://img.shields.io/badge/-Cryptographically%20Verifiable-0F0C29?style=flat-square) ![Anonymous](https://img.shields.io/badge/-Provably%20Anonymous-6C5CE7?style=flat-square) ![Tamper--proof](https://img.shields.io/badge/-Tamper--proof-9146FF?style=flat-square) ![Auditable](https://img.shields.io/badge/-Publicly%20Auditable-302B63?style=flat-square)

</div>

<br/>

## 🔍 How It Works

```mermaid
sequenceDiagram
    participant E as Employee (Whistleblower)
    participant W as Lace Wallet (local, never on-chain)
    participant C as Compact Circuit
    participant P as Local Proof Server (Docker)
    participant L as Midnight Ledger (public)

    E->>W: Holds employee_credential_secret (private)
    E->>C: submit_anonymous_report(evidence_hash, category)
    C->>P: Generate ZK proof of valid, unrevoked credential
    P-->>C: Proof returned — no identity attached
    C->>L: disclose(evidence_hash) + increment report_count
    L-->>E: Transaction confirmed
    Note over L: An on-chain observer sees only a hash and a counter.<br/>Identity, wallet address, and raw evidence never appear.
```

> 💡 Tip for judges: GitHub renders this diagram natively — click it to pan/zoom.

## 🏗️ Architecture

```mermaid
graph TD
    A["React + Vite + TypeScript UI"] -->|connects via| B["Midnight DApp Connector"]
    B --> C["Lace Wallet Extension"]
    A --> D["Midnight.js SDK"]
    D --> E["Compact Circuit (counter.compact)"]
    E --> F["Local Proof Server (Docker)"]
    F --> G["Midnight Ledger (Preview / Preprod)"]
    G --> H[("Public state: report_count, evidence hash")]
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F0C29,50:6C5CE7,100:0F0C29&height=3&width=1000" width="100%"/>

## 🔐 Privacy Model

| | Field | Visibility |
|---|---|---|
| 🌐 **Public** (on-chain) | `report_count` — running total of valid reports | Anyone |
| 🌐 **Public** (on-chain) | `latest_evidence_hash` — `disclose()` commitment of the report | Anyone |
| 🌐 **Public** (on-chain) | Report category code (Corruption, Fraud, Harassment, …) | Anyone |
| 🔒 **Private** (witness, never on-chain) | `employee_credential_secret` — proof of authorized status | No one |
| 🔒 **Private** (witness, never on-chain) | Whistleblower wallet address & identity details | No one |
| 🔒 **Private** (witness, never on-chain) | Plaintext evidence content | No one |

**What the circuit proves, without revealing it:**
> "I hold a valid, authorized employee credential, and this report is authentic" — without disclosing identity, wallet address, or credential contents.

<details>
<summary><b>👁️ What an on-chain observer sees vs. can never see (click to expand)</b></summary>
<br/>

| ✅ Visible | ❌ Never visible |
|---|---|
| A call to `submit_anonymous_report()` | The whistleblower's identity, name, or employee ID |
| The disclosed SHA-256 evidence hash | The wallet address that initiated the transaction |
| `report_count` incremented by 1 | The plaintext report contents before disclosure |

</details>

## ⚖️ Why Midnight, Specifically

Traditional chains expose the caller's wallet address, permanently linking a whistleblower's identity to their transaction. Midnight's Compact language generates zero-knowledge proofs **locally**, so an employee can prove membership against an organization's credential root without ever disclosing their public key or wallet address on-chain. It's the one piece of infrastructure that makes "anonymous but verifiable" possible at the protocol level, rather than bolted on as a policy promise.

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F0C29,50:6C5CE7,100:0F0C29&height=3&width=1000" width="100%"/>

## 🧑‍⚖️ 60-Second Judge Checklist

<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&weight=600&size=18&duration=2000&pause=800&color=D6C9FF&center=true&vCenter=true&width=600&lines=Don't+take+our+word+for+it...;Verify+it+yourself+in+under+a+minute." alt="Typing SVG" />

1. **Run the test suite** — `npm test` → 4/4 passing, including an explicit assertion that the private credential never leaks.
2. **Check the CI badge above** — wired to GitHub Actions, running on every push.
3. **Read the Privacy Model table** — every field is explicitly classified public or private; nothing is hand-waved.
4. **Inspect the contract** — `contracts/counter.compact` is the entire trust boundary; it's small enough to read in one sitting.

<br/>

<div align="center">

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Privacy / ZK layer | ![Midnight](https://img.shields.io/badge/-Midnight%20Network-1E2327?style=flat-square) |
| Smart contract language | ![Compact](https://img.shields.io/badge/-Compact-6C5CE7?style=flat-square) `contracts/counter.compact` |
| Chain integration | ![Midnight.js](https://img.shields.io/badge/-Midnight.js%20SDK-302B63?style=flat-square) Lace Wallet |
| Frontend | ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| Testing | ![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white) |
| Local proving | ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white) `midnightnetwork/proof-server` |
| Runtime | ![Node.js](https://img.shields.io/badge/-Node.js%20v22%2B-339933?style=flat-square&logo=node.js&logoColor=white) |

</div>

## 🌐 Live Demo

> _[Add your deployed frontend URL here once hosted]_

## 📜 Contract Address

| Network | Address |
|---|---|
| Preview | `mn_contract1q9x24k5m4z6p8w0v3y1a2b3c4d5e6f7g8h9j0_preview` |
| Preprod | `mn_contract1q9x24k5m4z6p8w0v3y1a2b3c4d5e6f7g8h9j0_preprod` |

> ⚠️ Placeholder addresses — replace with your real deployed contract address after running `npm run deploy`.

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F0C29,50:6C5CE7,100:0F0C29&height=3&width=1000" width="100%"/>

## ⚡ Quick Start

<details open>
<summary><b>Prerequisites</b></summary>
<br/>

- **Node.js v22+** — `node --version`
- **Docker Desktop** — running locally, for the proof server
- **Lace Wallet** browser extension — for Midnight Network interaction
- **Compact Compiler** — `npm install -g @midnight-ntwrk/compact-compiler`

</details>

<details open>
<summary><b>Setup</b></summary>
<br/>

```bash
# 1. Clone the repository
git clone https://github.com/thesayancodes/WhistleZero-Anonymous_Whistleblower_Network.git
cd WhistleZero-Anonymous_Whistleblower_Network

# 2. Install dependencies
npm install

# 3. Start the local Midnight proof server
docker pull midnightnetwork/proof-server
docker run -p 6300:6300 midnightnetwork/proof-server

# 4. Compile the Compact contract
npm run compile

# 5. Start the frontend
npm run dev
```

</details>

## 🧪 Testing

```bash
npm test
```

<details open>
<summary><b>Expected output</b></summary>
<br/>

```
✓ tests/counter.test.ts (4 tests)
  ✓ 1. Circuit Logic: computes evidence hash commitment and validates credential
  ✓ 2. State Transitions: correctly updates report_count and latest_evidence_hash on public ledger
  ✓ 3. Privacy Guarantee: private employee_credential_secret is NEVER exposed on public ledger or outputs
  ✓ 4. Credential Rejection: rejects report if private witness credential is invalid

Test Files  1 passed (1)
     Tests  4 passed (4)
```

</details>

Test #3 is the one worth pointing a judge at directly — it's an automated, repeatable assertion of the core privacy guarantee, not just a claim in this README.

## ⚙️ CI/CD

GitHub Actions (`.github/workflows/ci.yml`) runs on every push and pull request to `main`:

`Checkout` → `Setup Node v22` → `npm ci` → `Compile Compact contract` → `npm test` → `npm run build`

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0F0C29,50:6C5CE7,100:0F0C29&height=3&width=1000" width="100%"/>

## 🗺️ Roadmap

| Status | Milestone |
|---|---|
| ![done](https://img.shields.io/badge/-done-2ea44f?style=flat-square) | Core `submit_anonymous_report()` circuit with credential-gated ZK proof |
| ![done](https://img.shields.io/badge/-done-2ea44f?style=flat-square) | Public/private field separation validated by automated tests |
| ![done](https://img.shields.io/badge/-done-2ea44f?style=flat-square) | CI pipeline: compile → test → build on every push |
| ![next](https://img.shields.io/badge/-next-dbab09?style=flat-square) | Deploy to Preview/Preprod and record real contract addresses |
| ![planned](https://img.shields.io/badge/-planned-6c5ce7?style=flat-square) | Selective disclosure flow for an authorized audit board to decrypt evidence |
| ![planned](https://img.shields.io/badge/-planned-6c5ce7?style=flat-square) | Organization membership root management (onboarding/offboarding employees) |
| ![planned](https://img.shields.io/badge/-planned-6c5ce7?style=flat-square) | Mainnet launch — core circuit needs only a membership proof + SHA-256 commitment, so gas overhead stays minimal at scale |

See [`PROPOSAL.md`](./PROPOSAL.md) for the full product proposal and data model.

## 📸 Screenshots

> _[Add compile output and contract address screenshots here]_

<br/>

<div align="center">

<img src="https://github-readme-stats.vercel.app/api/pin/?username=thesayancodes&repo=WhistleZero-Anonymous_Whistleblower_Network&theme=midnight-purple&hide_border=true" alt="Repo card"/>

### 📄 License

_No license file yet — add one (MIT is a common default for hackathon projects) so others know how they can use this._

### 👤 Author

Built by [**@thesayancodes**](https://github.com/thesayancodes)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302B63,100:0F0C29&height=140&section=footer&animation=fadeIn" width="100%"/>

</div>
