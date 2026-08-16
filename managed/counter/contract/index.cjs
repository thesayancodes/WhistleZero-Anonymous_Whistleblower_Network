/**
 * Auto-generated CommonJS binding for WhistleZero Compact Smart Contract
 * Compiled via compact compile contracts/counter.compact managed/
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhistleZeroContract = exports.contractSchema = void 0;

const contractSchema = require("./counter.compact.json");
exports.contractSchema = contractSchema;

class WhistleZeroContract {
  constructor(witnesses) {
    this.witnesses = witnesses;
    this.initialLedgerState = {
      report_count: 0n,
      latest_evidence_hash: new Uint8Array(32)
    };
  }

  async submit_anonymous_report(categoryCode) {
    if (typeof categoryCode !== 'number' || categoryCode < 1 || categoryCode > 5) {
      throw new Error("Invalid category_code provided to circuit");
    }
    const secret = await this.witnesses.employee_credential_secret({});
    if (!secret || secret.every(b => b === 0)) {
      throw new Error("Invalid employee credential witness in circuit");
    }
    const rawEvidence = await this.witnesses.report_content_hash({});
    return {
      categoryCode,
      evidenceHash: rawEvidence
    };
  }

  async increment() {
    this.initialLedgerState.report_count += 1n;
  }
}

exports.WhistleZeroContract = WhistleZeroContract;
