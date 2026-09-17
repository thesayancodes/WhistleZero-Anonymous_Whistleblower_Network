import { describe, it, expect } from 'vitest';
import deploymentRegistry from '../deployment.json';

describe('Contract Deployment Registry & Network Verification Suite', () => {
  it('1. validates primary contract metadata and default network', () => {
    expect(deploymentRegistry.contractName).toBe('WhistleZeroProtocol');
    expect(deploymentRegistry.defaultNetwork).toBe('preprod');
  });

  it('2. validates verified Preprod testnet deployment parameters', () => {
    const preprod = deploymentRegistry.deployments.preprod;
    expect(preprod).toBeDefined();
    expect(preprod.network).toBe('preprod');
    expect(preprod.contractAddress).toMatch(/^mn_contract_preprod[a-z0-9]+$/);
    expect(preprod.ledgerContractId).toMatch(/^[a-f0-9]{64}$/);
    expect(preprod.deploymentTxHash).toMatch(/^0xzk_deploy_[a-f0-9]+$/);
    expect(preprod.blockHeight).toBeGreaterThan(1000000);
    expect(preprod.indexer).toMatch(/^https:\/\/indexer\.preprod\.midnight\.network/);
    expect(preprod.nodeRpc).toMatch(/^https:\/\/rpc\.preprod\.midnight\.network/);
  });

  it('3. validates verified Preview testnet deployment parameters', () => {
    const preview = deploymentRegistry.deployments.preview;
    expect(preview).toBeDefined();
    expect(preview.network).toBe('preview');
    expect(preview.contractAddress).toMatch(/^mn_contract_preview[a-z0-9]+$/);
    expect(preview.ledgerContractId).toMatch(/^[a-f0-9]{64}$/);
    expect(preview.deploymentTxHash).toMatch(/^0xzk_deploy_[a-f0-9]+$/);
    expect(preview.blockHeight).toBeGreaterThan(1000000);
    expect(preview.indexer).toMatch(/^https:\/\/indexer\.preview\.midnight\.network/);
    expect(preview.nodeRpc).toMatch(/^https:\/\/rpc\.preview\.midnight\.network/);
  });

  it('4. ensures all defined protocol circuits are registered', () => {
    const expectedCircuits = [
      'submit_anonymous_report',
      'escalate_investigation',
      'update_organization_root'
    ];
    expect(deploymentRegistry.circuits).toEqual(expect.arrayContaining(expectedCircuits));
  });

  it('5. ensures all public ledger state properties are accounted for', () => {
    const expectedStateProps = [
      'total_reports',
      'latest_evidence_commitment',
      'organization_credential_root',
      'active_investigations'
    ];
    expect(deploymentRegistry.ledgerState).toEqual(expect.arrayContaining(expectedStateProps));
  });
});
