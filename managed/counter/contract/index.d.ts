/**
 * Auto-generated TypeScript bindings for WhistleZero Compact Smart Contract
 * Produced by Compact Compiler v0.14.0
 */

import type { Contract, Ledger, WitnessContext } from '@midnight-ntwrk/compact-runtime';

export interface LedgerState {
  report_count: bigint;
  latest_evidence_hash: Uint8Array;
}

export interface ContractWitnesses {
  employee_credential_secret: (context: WitnessContext) => Promise<Uint8Array>;
  report_content_hash: (context: WitnessContext) => Promise<Uint8Array>;
}

export interface WhistleZeroCircuits {
  submit_anonymous_report: (categoryCode: number) => Promise<void>;
  increment: () => Promise<void>;
}

export declare class WhistleZeroContract implements Contract<LedgerState, ContractWitnesses, WhistleZeroCircuits> {
  readonly initialLedgerState: LedgerState;
  readonly witnesses: ContractWitnesses;
  readonly circuits: WhistleZeroCircuits;
  constructor(witnesses: ContractWitnesses);
}
