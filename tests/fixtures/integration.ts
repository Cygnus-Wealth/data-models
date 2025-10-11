import { IntegrationCredentials, SyncStatus, IntegrationSource } from '../../src/index';

/**
 * Test fixtures for Integration types (IntegrationCredentials, SyncStatus).
 * Provides reusable sample integration data for testing.
 */

export const krakenCredentials: IntegrationCredentials = {
  source: IntegrationSource.KRAKEN,
  apiKey: 'kraken-api-key-123456',
  apiSecret: 'kraken-api-secret-abcdef',
  metadata: {
    permissions: ['query', 'trade']
  }
};

export const coinbaseCredentials: IntegrationCredentials = {
  source: IntegrationSource.COINBASE,
  apiKey: 'coinbase-api-key-789012',
  apiSecret: 'coinbase-api-secret-ghijkl',
  passphrase: 'coinbase-passphrase-xyz'
};

export const robinhoodCredentials: IntegrationCredentials = {
  source: IntegrationSource.ROBINHOOD,
  apiKey: 'robinhood-token-345678',
  metadata: {
    refreshToken: 'refresh-token-mnopqr',
    expiresAt: new Date('2025-11-11T12:00:00Z')
  }
};

export const metamaskCredentials: IntegrationCredentials = {
  source: IntegrationSource.METAMASK,
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  chainId: 1,
  metadata: {
    walletType: 'metamask',
    connected: true
  }
};

export const phantomCredentials: IntegrationCredentials = {
  source: IntegrationSource.PHANTOM,
  walletAddress: 'Phantom123abc456def789ghi',
  metadata: {
    walletType: 'phantom',
    network: 'mainnet-beta'
  }
};

export const manualCredentials: IntegrationCredentials = {
  source: IntegrationSource.MANUAL,
  metadata: {
    description: 'Manually entered cold wallet'
  }
};

export const successSyncStatus: SyncStatus = {
  source: IntegrationSource.COINBASE,
  accountId: 'coinbase-spot-1',
  status: 'SUCCESS',
  lastSyncTime: new Date('2025-10-11T12:00:00Z'),
  itemsSynced: 150
};

export const errorSyncStatus: SyncStatus = {
  source: IntegrationSource.KRAKEN,
  accountId: 'kraken-spot-1',
  status: 'ERROR',
  lastSyncTime: new Date('2025-10-11T11:55:00Z'),
  lastError: {
    code: 'RATE_LIMIT',
    message: 'API rate limit exceeded',
    details: {
      retryAfter: 60
    }
  },
  itemsSynced: 0
};

export const syncingSyncStatus: SyncStatus = {
  source: IntegrationSource.ROBINHOOD,
  accountId: 'robinhood-brokerage-1',
  status: 'SYNCING',
  lastSyncTime: new Date('2025-10-11T11:50:00Z'),
  itemsSynced: 50,
  metadata: {
    progress: 0.5,
    estimatedCompletion: new Date('2025-10-11T12:05:00Z')
  }
};

export const idleSyncStatus: SyncStatus = {
  source: IntegrationSource.METAMASK,
  accountId: 'metamask-wallet-1',
  status: 'IDLE',
  lastSyncTime: new Date('2025-10-11T10:00:00Z'),
  itemsSynced: 25
};

export const neverSyncedStatus: SyncStatus = {
  source: IntegrationSource.SLUSH,
  accountId: 'slush-wallet-1',
  status: 'IDLE'
};

export const authErrorSyncStatus: SyncStatus = {
  source: IntegrationSource.COINBASE,
  accountId: 'coinbase-spot-2',
  status: 'ERROR',
  lastSyncTime: new Date('2025-10-11T11:30:00Z'),
  lastError: {
    code: 'AUTH_FAILED',
    message: 'Invalid API credentials',
    details: {
      reason: 'API key expired'
    }
  },
  itemsSynced: 0
};

export const networkErrorSyncStatus: SyncStatus = {
  source: IntegrationSource.PHANTOM,
  accountId: 'phantom-wallet-1',
  status: 'ERROR',
  lastSyncTime: new Date('2025-10-11T11:45:00Z'),
  lastError: {
    code: 'NETWORK_ERROR',
    message: 'Failed to connect to blockchain RPC',
    details: {
      endpoint: 'https://api.mainnet-beta.solana.com',
      timeout: 30000
    }
  },
  itemsSynced: 0
};

// All integration credentials array for bulk testing
export const allCredentials: IntegrationCredentials[] = [
  krakenCredentials,
  coinbaseCredentials,
  robinhoodCredentials,
  metamaskCredentials,
  phantomCredentials,
  manualCredentials
];

// All sync statuses array for bulk testing
export const allSyncStatuses: SyncStatus[] = [
  successSyncStatus,
  errorSyncStatus,
  syncingSyncStatus,
  idleSyncStatus,
  neverSyncedStatus,
  authErrorSyncStatus,
  networkErrorSyncStatus
];
