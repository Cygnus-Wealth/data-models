import { describe, it, expect } from 'vitest';
import { Account, IntegrationCredentials, SyncStatus, IntegrationSource, AccountType } from '../../src/index';
import {
  metamaskWallet,
  coinbaseAccount,
  emptyAccount,
  krakenCredentials,
  coinbaseCredentials,
  metamaskCredentials,
  successSyncStatus,
  errorSyncStatus,
  syncingSyncStatus,
  idleSyncStatus
} from '../fixtures';

/**
 * Unit tests for Integration types (Account, IntegrationCredentials, SyncStatus).
 * Coverage target: 95%
 */

describe('Integration Models', () => {
  describe('Account', () => {
    it('should create wallet account', () => {
      expect(metamaskWallet.type).toBe(AccountType.WALLET);
      expect(metamaskWallet.source).toBe(IntegrationSource.METAMASK);
    });

    it('should create CEX account', () => {
      expect(coinbaseAccount.type).toBe(AccountType.CEX);
      expect(coinbaseAccount.source).toBe(IntegrationSource.COINBASE);
    });

    it('should aggregate balances', () => {
      expect(metamaskWallet.balances).toHaveLength(2);
      expect(Array.isArray(metamaskWallet.balances)).toBe(true);
    });

    it('should aggregate liquidity positions', () => {
      expect(metamaskWallet.liquidityPositions).toHaveLength(1);
    });

    it('should calculate total value', () => {
      expect(metamaskWallet.totalValue?.value).toBe(25250);
      expect(metamaskWallet.totalValue?.currency).toBe('USD');
    });

    it('should track sync timestamp', () => {
      expect(metamaskWallet.lastSynced).toBeInstanceOf(Date);
    });

    it('should support empty accounts', () => {
      expect(emptyAccount.balances).toHaveLength(0);
      expect(emptyAccount.totalValue).toBeUndefined();
    });

    it('should link to source account ID', () => {
      expect(coinbaseAccount.sourceAccountId).toBe('cb-spot-123456');
    });
  });

  describe('IntegrationCredentials', () => {
    it('should store CEX API credentials', () => {
      expect(krakenCredentials.source).toBe(IntegrationSource.KRAKEN);
      expect(krakenCredentials.apiKey).toBeDefined();
      expect(krakenCredentials.apiSecret).toBeDefined();
    });

    it('should support passphrase for Coinbase', () => {
      expect(coinbaseCredentials.passphrase).toBeDefined();
    });

    it('should store wallet addresses', () => {
      expect(metamaskCredentials.walletAddress).toBeDefined();
      expect(metamaskCredentials.walletAddress?.startsWith('0x')).toBe(true);
    });

    it('should include chain ID for wallets', () => {
      expect(metamaskCredentials.chainId).toBe(1); // Ethereum mainnet
    });

    it('should NOT store private keys', () => {
      // Verify credentials don't have privateKey field
      expect('privateKey' in krakenCredentials).toBe(false);
      expect('privateKey' in coinbaseCredentials).toBe(false);
      expect('privateKey' in metamaskCredentials).toBe(false);
    });

    it('should support metadata for additional fields', () => {
      expect(krakenCredentials.metadata).toBeDefined();
      expect(krakenCredentials.metadata?.permissions).toEqual(['query', 'trade']);
    });
  });

  describe('SyncStatus', () => {
    it('should track SUCCESS status', () => {
      expect(successSyncStatus.status).toBe('SUCCESS');
      expect(successSyncStatus.itemsSynced).toBe(150);
      expect(successSyncStatus.lastError).toBeUndefined();
    });

    it('should track ERROR status with error details', () => {
      expect(errorSyncStatus.status).toBe('ERROR');
      expect(errorSyncStatus.lastError).toBeDefined();
      expect(errorSyncStatus.lastError?.code).toBe('RATE_LIMIT');
      expect(errorSyncStatus.lastError?.message).toBeDefined();
    });

    it('should track SYNCING status', () => {
      expect(syncingSyncStatus.status).toBe('SYNCING');
      expect(syncingSyncStatus.metadata?.progress).toBe(0.5);
    });

    it('should track IDLE status', () => {
      expect(idleSyncStatus.status).toBe('IDLE');
    });

    it('should link to source and account', () => {
      expect(successSyncStatus.source).toBe(IntegrationSource.COINBASE);
      expect(successSyncStatus.accountId).toBe('coinbase-spot-1');
    });

    it('should track last sync time', () => {
      expect(successSyncStatus.lastSyncTime).toBeInstanceOf(Date);
    });

    it('should handle never-synced accounts', () => {
      const neverSynced: SyncStatus = {
        source: IntegrationSource.MANUAL,
        accountId: 'manual-1',
        status: 'IDLE'
      };

      expect(neverSynced.lastSyncTime).toBeUndefined();
      expect(neverSynced.itemsSynced).toBeUndefined();
    });

    it('should include error details for failures', () => {
      expect(errorSyncStatus.lastError?.details).toBeDefined();
      expect(errorSyncStatus.lastError?.details.retryAfter).toBe(60);
    });
  });
});
