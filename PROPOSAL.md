# Product Proposal

## What is the product, and who uses it?
[I WILL FILL THIS IN - WhistleZero is an anonymous whistleblower platform for corporate employees, government workers, and institution insiders to report corruption, financial fraud, harassment, and safety violations without exposing their identity.]

## Why Midnight specifically?
[I WILL FILL THIS IN — Traditional blockchains expose caller wallet addresses, linking whistleblower identities to transactions. Midnight's Compact smart contract language enables local Zero-Knowledge proof generation. Employees prove identity authorization against an organization membership root without disclosing their public key or wallet address.]

## Data Model
| Data Point | Type | Disclosed To |
|------------|------|--------------|
| Report Counter (`report_count`) | Public ledger | Everyone |
| Evidence Hash (`latest_evidence_hash`) | Public ledger (`disclose()`) | Everyone |
| Report Category Code | Public circuit input | Everyone |
| Employee Credential Secret Key | Private witness | No one |
| Whistleblower Wallet Address | Local private state | No one |
| Plaintext Evidence Document | Local encrypted payload | Authorized Audit Board |

## Mainnet Feasibility
[I WILL FILL THIS IN — Yes, WhistleZero is highly realistic for Mainnet launch by Level 6. The core circuit relies on efficient membership proof calculation and SHA-256 evidence commitments, requiring minimal on-chain state and low gas overhead.]
