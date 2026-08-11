import { useState, useEffect, useCallback } from 'react';

export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  network: string;
  error: string | null;
}

export interface ReportTransaction {
  txHash: string;
  evidenceHash: string;
  category: string;
  timestamp: string;
  blockHeight: number;
}

export interface LedgerState {
  reportCount: number;
  latestEvidenceHash: string;
}

export const useMidnight = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    isConnecting: false,
    address: null,
    network: 'Preprod',
    error: null
  });

  const [ledger, setLedger] = useState<LedgerState>({
    reportCount: 3,
    latestEvidenceHash: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  });

  const [recentReports, setRecentReports] = useState<ReportTransaction[]>([
    {
      txHash: '0xzk_019a84f3e091b2c4',
      evidenceHash: '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      category: 'Financial Manipulation',
      timestamp: '10 mins ago',
      blockHeight: 1842091
    },
    {
      txHash: '0xzk_019a84b2a110c9d1',
      evidenceHash: '0x8f4b21901a88b209c18277a1099238e81122a001928374650192837465019283',
      category: 'Corruption',
      timestamp: '1 hour ago',
      blockHeight: 1842045
    },
    {
      txHash: '0xzk_019a83f98212e3a4',
      evidenceHash: '0x1290384750192837465019283746501928374650192837465019283746501928',
      category: 'Harassment',
      timestamp: '3 hours ago',
      blockHeight: 1841980
    }
  ]);

  // Connect to Lace Wallet
  const connectWallet = useCallback(async () => {
    setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      // Simulate Lace DApp connector check
      const windowObj = window as any;
      if (!windowObj.midnight && !windowObj.lace) {
        // Fallback demo connection if Lace extension not detected
        await new Promise((resolve) => setTimeout(resolve, 800));
        setWallet({
          isConnected: true,
          isConnecting: false,
          address: 'mn_preprod1q9x24k5m4z6p8w0v3y1a2b3c4d5e6f7g8h9j0',
          network: 'Preprod',
          error: null
        });
        return;
      }

      // Real Lace API call if injected
      const laceApi = windowObj.midnight?.lace || windowObj.lace;
      const api = await laceApi.enable();
      const addresses = await api.getAddresses();
      
      setWallet({
        isConnected: true,
        isConnecting: false,
        address: addresses[0] || 'mn_preprod1q9x24k5m4z6p8w0v3y1a2b3c4d5e6f7g8h9j0',
        network: 'Preprod',
        error: null
      });
    } catch (err: any) {
      setWallet((prev) => ({
        ...prev,
        isConnecting: false,
        error: err?.message || 'Failed to connect Lace wallet. User rejected or wallet not found.'
      }));
    }
  }, []);

  // Disconnect Wallet
  const disconnectWallet = useCallback(() => {
    setWallet({
      isConnected: false,
      isConnecting: false,
      address: null,
      network: 'Preprod',
      error: null
    });
  }, []);

  // Submit Anonymous Whistleblower Circuit Call
  const submitAnonymousReportCircuit = useCallback(
    async (category: string, evidenceText: string, credentialSecret: string) => {
      if (!credentialSecret.trim()) {
        throw new Error('Employee Secret Credential is required for ZK witness generation');
      }
      if (!evidenceText.trim()) {
        throw new Error('Report evidence content cannot be empty');
      }

      // 1. Generate evidence hash commitment locally
      const encoder = new TextEncoder();
      const data = encoder.encode(evidenceText);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const computedHash = '0x' + hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      // 2. Simulate Local ZK Proof Generation (Browser side proof-server execution)
      await new Promise((resolve) => setTimeout(resolve, 3200));

      const newTxHash = `0xzk_${Math.random().toString(16).substring(2, 18)}`;
      const newTx: ReportTransaction = {
        txHash: newTxHash,
        evidenceHash: computedHash,
        category,
        timestamp: 'Just now',
        blockHeight: 1842100 + ledger.reportCount
      };

      // 3. Update public ledger state
      setLedger((prev) => ({
        reportCount: prev.reportCount + 1,
        latestEvidenceHash: computedHash
      }));

      setRecentReports((prev) => [newTx, ...prev]);

      return {
        txHash: newTxHash,
        evidenceHash: computedHash
      };
    },
    [ledger.reportCount]
  );

  return {
    wallet,
    ledger,
    recentReports,
    connectWallet,
    disconnectWallet,
    submitAnonymousReportCircuit
  };
};
