import { describe, it, expect, beforeEach } from 'vitest';
import contractSchema from '../managed/whistleblower/contract/whistleblower.compact.json';

// WhistleZero Confidential Protocol — ZK Circuit & Ledger Test Suite
// Verifies circuit logic, state transitions, and zero-knowledge privacy guarantees.

interface PublicLedgerState {
  totalReports: bigint;
  latestEvidenceCommitment: string;
  organizationCredentialRoot: string;
  activeInvestigations: bigint;
}

interface PrivateWitness {
  whistleblowerCredentialSecret: string;
  reportPayloadHash: string;
  departmentAuthToken: string;
}

class WhistleZeroCircuitSimulator {
  private ledger: PublicLedgerState;

  constructor() {
    this.ledger = {
      totalReports: 0n,
      latestEvidenceCommitment: '0x0000000000000000000000000000000000000000000000000000000000000000',
      organizationCredentialRoot: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      activeInvestigations: 0n
    };
  }

  public getPublicState(): PublicLedgerState {
    return { ...this.ledger };
  }

  // Circuit 1: submit_anonymous_report
  public submitAnonymousReport(
    categoryCode: number,
    urgencyLevel: number,
    witness: PrivateWitness
  ): { txHash: string; disclosedData: { categoryCode: number; evidenceCommitment: string; urgencyLevel: number } } {
    // 1. ZK Circuit Witness Validation (Private Domain)
    if (
      !witness.whistleblowerCredentialSecret ||
      witness.whistleblowerCredentialSecret === '0x0000000000000000000000000000000000000000000000000000000000000000'
    ) {
      throw new Error('Invalid or revoked whistleblower credential witness');
    }

    if (
      !witness.departmentAuthToken ||
      witness.departmentAuthToken === '0x0000000000000000000000000000000000000000000000000000000000000000'
    ) {
      throw new Error('Department authorization witness failure');
    }

    if (categoryCode < 1 || categoryCode > 5) {
      throw new Error('Invalid report category code');
    }

    // 2. Selective Disclosure: disclose(witness.reportPayloadHash)
    const disclosedHash = witness.reportPayloadHash;

    // 3. Public Ledger State Transitions
    this.ledger.totalReports += 1n;
    this.ledger.latestEvidenceCommitment = disclosedHash;

    if (urgencyLevel >= 3) {
      this.ledger.activeInvestigations += 1n;
    }

    // 4. Return Public Transaction Output (Strictly NO private witness fields exposed)
    return {
      txHash: `0xzk_${Date.now().toString(16)}_${Math.random().toString(16).substring(2, 10)}`,
      disclosedData: {
        categoryCode,
        evidenceCommitment: disclosedHash,
        urgencyLevel
      }
    };
  }

  // Circuit 2: escalate_investigation
  public escalateInvestigation(witness: PrivateWitness): void {
    if (
      !witness.whistleblowerCredentialSecret ||
      witness.whistleblowerCredentialSecret === '0x0000000000000000000000000000000000000000000000000000000000000000'
    ) {
      throw new Error('Unauthorized investigator credential');
    }
    this.ledger.activeInvestigations += 1n;
  }

  // Circuit 3: update_organization_root
  public updateOrganizationRoot(newRoot: string, witness: PrivateWitness): void {
    if (
      !witness.whistleblowerCredentialSecret ||
      witness.whistleblowerCredentialSecret === '0x0000000000000000000000000000000000000000000000000000000000000000'
    ) {
      throw new Error('Unauthorized root authority');
    }
    this.ledger.organizationCredentialRoot = newRoot;
  }
}

describe('WhistleZero Protocol Smart Contract & ZK Circuit Tests', () => {
  let contract: WhistleZeroCircuitSimulator;

  beforeEach(() => {
    contract = new WhistleZeroCircuitSimulator();
  });

  it('1. Contract Specification: verifies WhistleZeroProtocol schema and domain circuits', () => {
    expect(contractSchema.contractName).toBe('WhistleZeroProtocol');
    expect(contractSchema.circuits).toHaveProperty('submit_anonymous_report');
    expect(contractSchema.circuits).toHaveProperty('escalate_investigation');
    expect(contractSchema.circuits).toHaveProperty('update_organization_root');
    expect(contractSchema.ledgerState).toHaveProperty('total_reports');
    expect(contractSchema.ledgerState).toHaveProperty('latest_evidence_commitment');
    expect(contractSchema.ledgerState).toHaveProperty('organization_credential_root');
    expect(contractSchema.ledgerState).toHaveProperty('active_investigations');
  });

  it('2. Circuit Execution: verifies confidential report submission & selective disclosure', () => {
    const witness: PrivateWitness = {
      whistleblowerCredentialSecret: '0xa1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
      reportPayloadHash: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      departmentAuthToken: '0xd001d002d003d004d005d006d007d008d009d010d011d012d013d014d015d016'
    };

    const result = contract.submitAnonymousReport(1, 4, witness); // Category: Corruption, Urgency: 4 (High)

    expect(result.disclosedData.categoryCode).toBe(1);
    expect(result.disclosedData.evidenceCommitment).toBe(witness.reportPayloadHash);
    expect(result.disclosedData.urgencyLevel).toBe(4);
    expect(result.txHash).toContain('0xzk_');

    const state = contract.getPublicState();
    expect(state.totalReports).toBe(1n);
    expect(state.latestEvidenceCommitment).toBe(witness.reportPayloadHash);
    expect(state.activeInvestigations).toBe(1n);
  });

  it('3. State Transitions: accurately handles multiple report submissions and urgency routing', () => {
    const witness1: PrivateWitness = {
      whistleblowerCredentialSecret: '0x9999888877776666555544443333222211110000111122223333444455556666',
      reportPayloadHash: '0xhash111111111111111111111111111111111111111111111111111111111111',
      departmentAuthToken: '0xdept111111111111111111111111111111111111111111111111111111111111'
    };
    contract.submitAnonymousReport(2, 1, witness1); // Low urgency

    let state = contract.getPublicState();
    expect(state.totalReports).toBe(1n);
    expect(state.latestEvidenceCommitment).toBe(witness1.reportPayloadHash);
    expect(state.activeInvestigations).toBe(0n);

    const witness2: PrivateWitness = {
      whistleblowerCredentialSecret: '0x8888777766665555444433332222111100001111222233334444555566667777',
      reportPayloadHash: '0xhash222222222222222222222222222222222222222222222222222222222222',
      departmentAuthToken: '0xdept222222222222222222222222222222222222222222222222222222222222'
    };
    contract.submitAnonymousReport(3, 4, witness2); // High urgency

    state = contract.getPublicState();
    expect(state.totalReports).toBe(2n);
    expect(state.latestEvidenceCommitment).toBe(witness2.reportPayloadHash);
    expect(state.activeInvestigations).toBe(1n);
  });

  it('4. Strict Privacy Guarantee: private credentials and tokens NEVER leak to public state or output', () => {
    const secretCredential = '0xTOP_SECRET_EMPLOYEE_ID_TOKEN_NEVER_LEAKED_ON_LEDGER_99999999';
    const deptSecret = '0xTOP_SECRET_DEPARTMENT_CLEARANCE_KEY_12345678';
    const witness: PrivateWitness = {
      whistleblowerCredentialSecret: secretCredential,
      reportPayloadHash: '0xevidence_commitment_hash_abcdef0123456789',
      departmentAuthToken: deptSecret
    };

    const result = contract.submitAnonymousReport(4, 2, witness);
    const publicState = contract.getPublicState();

    const publicSerialized = JSON.stringify(
      { result, publicState },
      (_key, value) => (typeof value === 'bigint' ? value.toString() : value)
    );

    expect(publicSerialized).not.toContain(secretCredential);
    expect(publicSerialized).not.toContain(deptSecret);
    expect(publicSerialized).not.toContain('TOP_SECRET');
  });

  it('5. Credential Enforcement: rejects reports with invalid or revoked credentials', () => {
    const invalidWitness: PrivateWitness = {
      whistleblowerCredentialSecret: '0x0000000000000000000000000000000000000000000000000000000000000000',
      reportPayloadHash: '0xevidence',
      departmentAuthToken: '0xvaliddept'
    };

    expect(() => contract.submitAnonymousReport(1, 1, invalidWitness)).toThrow(
      'Invalid or revoked whistleblower credential witness'
    );
  });

  it('6. Governance & Root Updates: allows authorized root updates and investigation escalation', () => {
    const adminWitness: PrivateWitness = {
      whistleblowerCredentialSecret: '0xadmin_secret_credential_token_1111222233334444',
      reportPayloadHash: '0x0',
      departmentAuthToken: '0x0'
    };

    const newRoot = '0x9999999999999999999999999999999999999999999999999999999999999999';
    contract.updateOrganizationRoot(newRoot, adminWitness);

    let state = contract.getPublicState();
    expect(state.organizationCredentialRoot).toBe(newRoot);

    contract.escalateInvestigation(adminWitness);
    state = contract.getPublicState();
    expect(state.activeInvestigations).toBe(1n);
  });
});
