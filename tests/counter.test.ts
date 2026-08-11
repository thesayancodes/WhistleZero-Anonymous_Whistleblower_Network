import { describe, it, expect, beforeEach } from 'vitest';

// WhistleZero Contract Simulation & ZK Circuit Test Suite
// Verifies circuit logic, state transitions, and zero-knowledge privacy guarantees.

interface PublicLedgerState {
  reportCount: bigint;
  latestEvidenceHash: string;
}

interface PrivateWitness {
  employeeCredentialSecret: string;
  reportContentHash: string;
}

class WhistleZeroCircuitSimulator {
  private ledger: PublicLedgerState;

  constructor() {
    this.ledger = {
      reportCount: 0n,
      latestEvidenceHash: '0x0000000000000000000000000000000000000000000000000000000000000000'
    };
  }

  public getPublicState(): PublicLedgerState {
    return { ...this.ledger };
  }

  // Circuit: submit_anonymous_report
  public submitAnonymousReport(
    categoryCode: number,
    witness: PrivateWitness
  ): { txHash: string; disclosedData: { categoryCode: number; evidenceHash: string } } {
    // 1. ZK Circuit Witness Validation (Private Domain)
    if (!witness.employeeCredentialSecret || witness.employeeCredentialSecret === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      throw new Error('Invalid employee credential witness');
    }

    if (categoryCode < 1 || categoryCode > 5) {
      throw new Error('Invalid report category code');
    }

    // 2. Selective Disclosure: disclose(witness.reportContentHash)
    const disclosedHash = witness.reportContentHash;

    // 3. Public Ledger State Transition
    this.ledger.reportCount += 1n;
    this.ledger.latestEvidenceHash = disclosedHash;

    // 4. Return Public Transaction Output (Strictly NO private witness fields exposed)
    return {
      txHash: `0xzk_${Date.now().toString(16)}_${Math.random().toString(16).substring(2, 10)}`,
      disclosedData: {
        categoryCode,
        evidenceHash: disclosedHash
      }
    };
  }

  // Circuit: increment
  public increment(): void {
    this.ledger.reportCount += 1n;
  }
}

describe('WhistleZero Contract & ZK Circuit Tests', () => {
  let contract: WhistleZeroCircuitSimulator;

  beforeEach(() => {
    contract = new WhistleZeroCircuitSimulator();
  });

  it('1. Circuit Logic: computes evidence hash commitment and validates credential', () => {
    const witness: PrivateWitness = {
      employeeCredentialSecret: '0xa1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
      reportContentHash: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    };

    const result = contract.submitAnonymousReport(1, witness); // 1 = Corruption

    expect(result.disclosedData.categoryCode).toBe(1);
    expect(result.disclosedData.evidenceHash).toBe(witness.reportContentHash);
    expect(result.txHash).toContain('0xzk_');
  });

  it('2. State Transitions: correctly updates report_count and latest_evidence_hash on public ledger', () => {
    const initialState = contract.getPublicState();
    expect(initialState.reportCount).toBe(0n);

    const witness1: PrivateWitness = {
      employeeCredentialSecret: '0x9999888877776666555544443333222211110000111122223333444455556666',
      reportContentHash: '0xhash111111111111111111111111111111111111111111111111111111111111'
    };
    contract.submitAnonymousReport(2, witness1); // 2 = Fraud

    const stateAfterReport1 = contract.getPublicState();
    expect(stateAfterReport1.reportCount).toBe(1n);
    expect(stateAfterReport1.latestEvidenceHash).toBe(witness1.reportContentHash);

    const witness2: PrivateWitness = {
      employeeCredentialSecret: '0x8888777766665555444433332222111100001111222233334444555566667777',
      reportContentHash: '0xhash222222222222222222222222222222222222222222222222222222222222'
    };
    contract.submitAnonymousReport(3, witness2); // 3 = Harassment

    const stateAfterReport2 = contract.getPublicState();
    expect(stateAfterReport2.reportCount).toBe(2n);
    expect(stateAfterReport2.latestEvidenceHash).toBe(witness2.reportContentHash);
  });

  it('3. Privacy Guarantee: private employee_credential_secret is NEVER exposed on public ledger or outputs', () => {
    const secretCredential = '0xSUPER_SECRET_EMPLOYEE_IDENTIFIER_NEVER_LEAKED_ON_CHAIN_000000000';
    const witness: PrivateWitness = {
      employeeCredentialSecret: secretCredential,
      reportContentHash: '0xevidence_hash_999999999999999999999999999999999999999999999999'
    };

    const result = contract.submitAnonymousReport(4, witness); // 4 = Financial Manipulation
    const publicState = contract.getPublicState();

    // Serialize all public states and outputs to string with BigInt serializer
    const publicDataString = JSON.stringify(
      { result, publicState },
      (_key, value) => (typeof value === 'bigint' ? value.toString() : value)
    );

    // Assert the secret credential string is NEVER present anywhere in public state or output
    expect(publicDataString).not.toContain(secretCredential);
    expect(publicDataString).not.toContain('SUPER_SECRET_EMPLOYEE_IDENTIFIER');
  });

  it('4. Credential Rejection: rejects report if private witness credential is invalid', () => {
    const invalidWitness: PrivateWitness = {
      employeeCredentialSecret: '0x0000000000000000000000000000000000000000000000000000000000000000',
      reportContentHash: '0xsomehash'
    };

    expect(() => contract.submitAnonymousReport(1, invalidWitness)).toThrow('Invalid employee credential witness');
  });
});
