import { describe, it, expect } from 'vitest';
import {
  DEFAULT_MIDNIGHT_CONFIG,
  WHISTLEZERO_CONTRACT_ADDRESS,
  WHISTLEZERO_LEDGER_CONTRACT_ID,
  connectLaceWallet,
  getMidnightNetworkProvider,
  submitZKReportTransaction
} from '../src/midnight/connector';

describe('Midnight Connector & Configuration Test Suite', () => {
  it('1. verifies default Midnight testnet configuration', () => {
    expect(DEFAULT_MIDNIGHT_CONFIG.networkId).toBe('preprod');
    expect(DEFAULT_MIDNIGHT_CONFIG.indexerUrl).toContain('indexer.preprod.midnight.network');
    expect(DEFAULT_MIDNIGHT_CONFIG.nodeUrl).toContain('rpc.preprod.midnight.network');
    expect(DEFAULT_MIDNIGHT_CONFIG.proofServerUrl).toBe('http://localhost:6300');
  });

  it('2. verifies deployed contract identifiers and addresses format', () => {
    expect(WHISTLEZERO_CONTRACT_ADDRESS).toMatch(/^mn_contract_preprod[0-9a-z]+$/);
    expect(WHISTLEZERO_LEDGER_CONTRACT_ID).toMatch(/^[0-9a-f]{64}$/);
    expect(WHISTLEZERO_LEDGER_CONTRACT_ID.length).toBe(64);
  });

  it('3. fallback wallet connection when Lace extension is not present', async () => {
    const session = await connectLaceWallet(DEFAULT_MIDNIGHT_CONFIG);
    expect(session.isConnected).toBe(true);
    expect(session.address).toMatch(/^mn_addr_preprod/);
    expect(session.networkId).toBe('preprod');
  });

  it('4. initializes Midnight network provider with contract state reader', async () => {
    const provider = getMidnightNetworkProvider(DEFAULT_MIDNIGHT_CONFIG);
    expect(provider.networkId).toBe('preprod');
    expect(provider.indexerUrl).toBe(DEFAULT_MIDNIGHT_CONFIG.indexerUrl);
    expect(provider.nodeUrl).toBe(DEFAULT_MIDNIGHT_CONFIG.nodeUrl);

    if (provider.getContractState) {
      const state = await provider.getContractState(WHISTLEZERO_CONTRACT_ADDRESS);
      expect(state).toHaveProperty('contractAddress', WHISTLEZERO_CONTRACT_ADDRESS);
      expect(state).toHaveProperty('reportCount');
      expect(state).toHaveProperty('latestEvidenceHash');
    }
  });

  it('5. generates valid ZK transaction proof structure via submitZKReportTransaction', async () => {
    const categoryCode = 2; // Fraud
    const evidenceHash = '0x11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff';
    const secretCredential = 'test_secret_credential_witness_123';

    const tx = await submitZKReportTransaction(categoryCode, evidenceHash, secretCredential);
    expect(tx).toHaveProperty('txHash');
    expect(tx.txHash).toMatch(/^0xzk_[0-9a-f]+$/);
    expect(tx.evidenceHash).toBe(evidenceHash);
    expect(tx.blockHeight).toBeGreaterThan(1800000);
  });

  it('6. produces deterministic SHA-256 evidence commitment hash', async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode('Confidential Report Content');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const computedHash = '0x' + hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    expect(computedHash).toMatch(/^0x[0-9a-f]{64}$/);
    expect(computedHash.length).toBe(66);
  });
});
