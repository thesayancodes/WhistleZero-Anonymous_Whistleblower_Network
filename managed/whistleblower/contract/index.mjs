/**
 * Auto-generated ES Module binding for WhistleZero Compact Smart Contract
 * Compiled via compact compile contracts/whistleblower.compact managed/
 */

import contractSchema from "./whistleblower.compact.json" assert { type: "json" };

export { contractSchema };

export class WhistleZeroContract {
  constructor(witnesses) {
    this.witnesses = witnesses;
    this.ledger = {
      total_reports: 0n,
      latest_evidence_commitment: new Uint8Array(32),
      organization_credential_root: new Uint8Array(32),
      active_investigations: 0n
    };
  }

  async submit_anonymous_report(categoryCode, urgencyLevel = 1) {
    if (typeof categoryCode !== 'number' || categoryCode < 1 || categoryCode > 5) {
      throw new Error("Invalid report category code");
    }
    const secret = await this.witnesses.whistleblower_credential_secret({});
    if (!secret || secret.every(b => b === 0)) {
      throw new Error("Invalid or revoked whistleblower credential witness");
    }
    const deptToken = await this.witnesses.department_auth_token({});
    if (!deptToken || deptToken.every(b => b === 0)) {
      throw new Error("Department authorization witness failure");
    }

    const rawEvidence = await this.witnesses.report_content_hash({});
    this.ledger.total_reports += 1n;
    this.ledger.latest_evidence_commitment = rawEvidence;

    if (urgencyLevel >= 3) {
      this.ledger.active_investigations += 1n;
    }

    return {
      categoryCode,
      evidenceHash: rawEvidence,
      urgencyLevel
    };
  }

  async escalate_investigation() {
    const secret = await this.witnesses.whistleblower_credential_secret({});
    if (!secret || secret.every(b => b === 0)) {
      throw new Error("Unauthorized investigator credential");
    }
    this.ledger.active_investigations += 1n;
  }

  async update_organization_root(newRoot) {
    const secret = await this.witnesses.whistleblower_credential_secret({});
    if (!secret || secret.every(b => b === 0)) {
      throw new Error("Unauthorized root authority");
    }
    this.ledger.organization_credential_root = newRoot;
  }
}
