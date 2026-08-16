/**
 * Ambient type definitions for Midnight Network SDK packages
 */

declare module '@midnight-ntwrk/dapp-connector-api' {
  export type NetworkId = 'preprod' | 'preview' | 'mainnet' | 'undeployed';

  export interface DAppConnectorWalletAPI {
    getAddresses(): Promise<string[]>;
    enable?(): Promise<DAppConnectorWalletAPI>;
    connect?(networkId: NetworkId): Promise<DAppConnectorWalletAPI>;
  }

  export interface DAppConnectorAPI {
    isEnabled?(): Promise<boolean>;
    enable?(): Promise<DAppConnectorWalletAPI>;
    connect?(networkId: NetworkId): Promise<DAppConnectorWalletAPI>;
  }
}

declare module '@midnight-ntwrk/midnight-js-network-provider' {
  export type NetworkId = 'preprod' | 'preview' | 'mainnet' | 'undeployed';

  export interface MidnightNetworkProvider {
    networkId: NetworkId;
    indexerUrl: string;
    nodeUrl: string;
    proofServerUrl: string;
    getContractState(contractAddress: string): Promise<any>;
  }
}

declare module '@midnight-ntwrk/compact-runtime' {
  export interface WitnessContext {
    [key: string]: any;
  }

  export interface Ledger {
    [key: string]: any;
  }

  export interface Contract<L = any, W = any, C = any> {
    initialLedgerState: L;
    witnesses: W;
    circuits: C;
  }
}

declare module '@midnight-ntwrk/midnight-js-contracts' {
  export interface ContractConfig {
    contractAddress: string;
    networkId: string;
  }
}

declare module '@midnight-ntwrk/midnight-js-types' {
  export interface TransactionResult {
    txHash: string;
    blockHeight: number;
  }
}

declare module '@midnight-ntwrk/zswap' {
  export interface ZSwapProof {
    proof: string;
  }
}
