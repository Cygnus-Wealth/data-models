import { describe, it, expect } from 'vitest';
import {
  Chain,
  AssetType,
  Asset,
  Transaction,
  TransactionType,
  DeFiPosition,
  DeFiPositionType,
  DeFiProtocol,
  DeFiDiscoverySource,
  Portfolio,
  FilterOptions,
  IntegrationCredentials,
  IntegrationSource,
} from '../../src/index';

import type {
  WalletProviderId,
  WalletConnectionId,
  AccountId,
  WalletConnection,
  ConnectedAccount,
  WatchAddress,
  AccountGroup,
  AccountPortfolio,
  WalletPortfolio,
  GroupPortfolio,
  AccountSummary,
  AssetDistribution,
  AccountAssetEntry,
  TrackedAddress,
  AccountMetadata,
  AddressRequest,
  AccountBalanceList,
  AccountBalance,
  AccountError,
} from '../../src/index';

/**
 * Unit tests for multi-wallet multi-account identity types.
 * Phase 1 of en-fr0z architecture.
 */

describe('Multi-Wallet Identity Types', () => {
  describe('WalletProviderId', () => {
    it('should accept all canonical provider values', () => {
      const providers: WalletProviderId[] = [
        'metamask',
        'rabby',
        'walletconnect',
        'coinbase-wallet',
        'trust-wallet',
        'frame',
        'crypto-com-onchain',
        'phantom',
        'solflare',
        'backpack',
        'exodus',
        'manual',
      ];

      expect(providers).toHaveLength(12);
      providers.forEach(p => expect(typeof p).toBe('string'));
    });

    it('should support all EVM wallet providers', () => {
      const evmProviders: WalletProviderId[] = [
        'metamask',
        'rabby',
        'walletconnect',
        'coinbase-wallet',
        'trust-wallet',
        'frame',
        'crypto-com-onchain',
      ];

      expect(evmProviders).toHaveLength(7);
    });

    it('should support non-EVM wallet providers', () => {
      const nonEvmProviders: WalletProviderId[] = [
        'phantom',
        'solflare',
        'backpack',
        'exodus',
      ];

      expect(nonEvmProviders).toHaveLength(4);
    });

    it('should support manual provider for imported addresses', () => {
      const manual: WalletProviderId = 'manual';
      expect(manual).toBe('manual');
    });
  });

  describe('WalletConnectionId', () => {
    it('should follow {providerId}:{randomId} format', () => {
      const connectionId: WalletConnectionId = 'metamask:a1b2c3d4';
      expect(connectionId).toContain(':');
      const [provider, randomId] = connectionId.split(':');
      expect(provider).toBe('metamask');
      expect(randomId).toBeTruthy();
    });

    it('should support multiple connections from same provider', () => {
      const conn1: WalletConnectionId = 'walletconnect:session1';
      const conn2: WalletConnectionId = 'walletconnect:session2';
      expect(conn1).not.toBe(conn2);
    });
  });

  describe('AccountId', () => {
    it('should follow {walletConnectionId}:{checksummedAddress} format', () => {
      const accountId: AccountId = 'metamask:a1b2c3d4:0xAbCdEf1234567890';
      const parts = accountId.split(':');
      expect(parts).toHaveLength(3);
      expect(parts[0]).toBe('metamask');
      expect(parts[2]).toMatch(/^0x/);
    });

    it('should support watch address format', () => {
      const watchId: AccountId = 'watch:0xAbCdEf1234567890';
      expect(watchId).toMatch(/^watch:/);
      const [prefix, address] = watchId.split(':');
      expect(prefix).toBe('watch');
      expect(address).toMatch(/^0x/);
    });

    it('should disambiguate same address across different connections', () => {
      const id1: AccountId = 'metamask:abc:0xSameAddress';
      const id2: AccountId = 'rabby:xyz:0xSameAddress';
      expect(id1).not.toBe(id2);
    });
  });
});

describe('Multi-Wallet Connection Models', () => {
  const now = new Date().toISOString();

  describe('ConnectedAccount', () => {
    it('should represent a provider-discovered account', () => {
      const account: ConnectedAccount = {
        accountId: 'metamask:a1b2:0xAbC123',
        address: '0xAbC123',
        accountLabel: 'Main DeFi',
        chainScope: [Chain.ETHEREUM, Chain.POLYGON],
        source: 'provider',
        discoveredAt: now,
        isStale: false,
        isActive: true,
      };

      expect(account.source).toBe('provider');
      expect(account.isStale).toBe(false);
      expect(account.isActive).toBe(true);
      expect(account.chainScope).toContain(Chain.ETHEREUM);
    });

    it('should represent a manually-added account', () => {
      const manual: ConnectedAccount = {
        accountId: 'metamask:a1b2:0xDef456',
        address: '0xDef456',
        accountLabel: 'Cold Storage',
        chainScope: [Chain.ETHEREUM],
        source: 'manual',
        discoveredAt: now,
        isStale: false,
        isActive: false,
      };

      expect(manual.source).toBe('manual');
      expect(manual.isActive).toBe(false);
    });

    it('should support stale accounts', () => {
      const stale: ConnectedAccount = {
        accountId: 'metamask:a1b2:0xOld789',
        address: '0xOld789',
        accountLabel: 'Old Account',
        chainScope: [Chain.ETHEREUM],
        source: 'provider',
        discoveredAt: '2025-06-01T00:00:00Z',
        isStale: true,
        isActive: false,
      };

      expect(stale.isStale).toBe(true);
      expect(stale.isActive).toBe(false);
    });
  });

  describe('WalletConnection', () => {
    it('should represent a connected wallet session', () => {
      const connection: WalletConnection = {
        connectionId: 'metamask:a1b2c3d4',
        providerId: 'metamask',
        providerName: 'MetaMask',
        providerIcon: 'https://metamask.io/icon.svg',
        connectionLabel: 'My MetaMask',
        accounts: [],
        activeAccountAddress: '0xAbC123',
        supportedChains: [Chain.ETHEREUM, Chain.POLYGON, Chain.ARBITRUM],
        connectedAt: now,
        lastActiveAt: now,
        sessionStatus: 'active',
      };

      expect(connection.providerId).toBe('metamask');
      expect(connection.sessionStatus).toBe('active');
      expect(connection.accounts).toHaveLength(0);
      expect(connection.supportedChains).toContain(Chain.ETHEREUM);
    });

    it('should support multiple accounts in a connection', () => {
      const accounts: ConnectedAccount[] = [
        {
          accountId: 'metamask:a1b2:0xAcc1',
          address: '0xAcc1',
          accountLabel: 'Account 1',
          chainScope: [Chain.ETHEREUM],
          source: 'provider',
          discoveredAt: now,
          isStale: false,
          isActive: true,
        },
        {
          accountId: 'metamask:a1b2:0xAcc2',
          address: '0xAcc2',
          accountLabel: 'Account 2',
          chainScope: [Chain.ETHEREUM],
          source: 'provider',
          discoveredAt: now,
          isStale: false,
          isActive: false,
        },
        {
          accountId: 'metamask:a1b2:0xAcc3',
          address: '0xAcc3',
          accountLabel: 'Account 3',
          chainScope: [Chain.ETHEREUM, Chain.POLYGON],
          source: 'provider',
          discoveredAt: now,
          isStale: false,
          isActive: false,
        },
      ];

      const connection: WalletConnection = {
        connectionId: 'metamask:a1b2',
        providerId: 'metamask',
        providerName: 'MetaMask',
        providerIcon: 'https://metamask.io/icon.svg',
        connectionLabel: 'My MetaMask',
        accounts,
        activeAccountAddress: '0xAcc1',
        supportedChains: [Chain.ETHEREUM, Chain.POLYGON],
        connectedAt: now,
        lastActiveAt: now,
        sessionStatus: 'active',
      };

      expect(connection.accounts).toHaveLength(3);
      const active = connection.accounts.filter(a => a.isActive);
      expect(active).toHaveLength(1);
      expect(active[0].address).toBe('0xAcc1');
    });

    it('should support stale session status', () => {
      const staleConn: WalletConnection = {
        connectionId: 'walletconnect:old123',
        providerId: 'walletconnect',
        providerName: 'WalletConnect',
        providerIcon: 'https://walletconnect.org/icon.svg',
        connectionLabel: 'Old WC Session',
        accounts: [],
        activeAccountAddress: null,
        supportedChains: [Chain.ETHEREUM],
        connectedAt: '2025-01-01T00:00:00Z',
        lastActiveAt: '2025-06-01T00:00:00Z',
        sessionStatus: 'stale',
      };

      expect(staleConn.sessionStatus).toBe('stale');
      expect(staleConn.activeAccountAddress).toBeNull();
    });

    it('should support disconnected session status', () => {
      const disconnected: WalletConnection = {
        connectionId: 'rabby:disc456',
        providerId: 'rabby',
        providerName: 'Rabby',
        providerIcon: 'rabby-icon',
        connectionLabel: 'Rabby Wallet',
        accounts: [],
        activeAccountAddress: null,
        supportedChains: [Chain.ETHEREUM],
        connectedAt: now,
        lastActiveAt: now,
        sessionStatus: 'disconnected',
      };

      expect(disconnected.sessionStatus).toBe('disconnected');
    });
  });

  describe('WatchAddress', () => {
    it('should represent a watch-only address', () => {
      const watched: WatchAddress = {
        accountId: 'watch:0xVitalik',
        address: '0xVitalik',
        addressLabel: 'Vitalik.eth',
        chainScope: [Chain.ETHEREUM, Chain.POLYGON, Chain.ARBITRUM],
        addedAt: now,
      };

      expect(watched.accountId).toMatch(/^watch:/);
      expect(watched.addressLabel).toBe('Vitalik.eth');
      expect(watched.chainScope).toHaveLength(3);
    });

    it('should support single-chain watch addresses', () => {
      const single: WatchAddress = {
        accountId: 'watch:0xSingleChain',
        address: '0xSingleChain',
        addressLabel: 'ETH-only Watch',
        chainScope: [Chain.ETHEREUM],
        addedAt: now,
      };

      expect(single.chainScope).toHaveLength(1);
    });
  });

  describe('AccountGroup', () => {
    it('should group accounts from different connections', () => {
      const group: AccountGroup = {
        groupId: 'group-defi-1',
        groupName: 'DeFi Accounts',
        accountIds: [
          'metamask:a1b2:0xAcc1',
          'rabby:c3d4:0xAcc2',
          'watch:0xAcc3',
        ],
        createdAt: now,
      };

      expect(group.accountIds).toHaveLength(3);
      expect(group.groupName).toBe('DeFi Accounts');
    });

    it('should support empty groups', () => {
      const empty: AccountGroup = {
        groupId: 'group-empty',
        groupName: 'Future Accounts',
        accountIds: [],
        createdAt: now,
      };

      expect(empty.accountIds).toHaveLength(0);
    });
  });
});

describe('Multi-Wallet Portfolio Models', () => {
  const now = new Date();

  describe('AccountPortfolio', () => {
    it('should represent a single account portfolio slice', () => {
      const portfolio: AccountPortfolio = {
        accountId: 'metamask:a1b2:0xAbc',
        accountLabel: 'Main DeFi',
        walletConnectionId: 'metamask:a1b2',
        providerName: 'MetaMask',
        assets: [],
        totalValue: { value: 25000, currency: 'USD', timestamp: now },
        lastUpdated: now.toISOString(),
      };

      expect(portfolio.accountId).toContain('metamask');
      expect(portfolio.totalValue.value).toBe(25000);
      expect(portfolio.assets).toHaveLength(0);
    });

    it('should support watch address portfolio', () => {
      const watchPortfolio: AccountPortfolio = {
        accountId: 'watch:0xWatchAddr',
        accountLabel: 'Watched Whale',
        walletConnectionId: 'watch',
        providerName: 'Watch',
        assets: [],
        totalValue: { value: 1000000, currency: 'USD', timestamp: now },
        lastUpdated: now.toISOString(),
      };

      expect(watchPortfolio.walletConnectionId).toBe('watch');
    });
  });

  describe('WalletPortfolio', () => {
    it('should aggregate accounts within a wallet connection', () => {
      const account1: AccountPortfolio = {
        accountId: 'metamask:a1b2:0xAcc1',
        accountLabel: 'Account 1',
        walletConnectionId: 'metamask:a1b2',
        providerName: 'MetaMask',
        assets: [],
        totalValue: { value: 15000, currency: 'USD', timestamp: now },
        lastUpdated: now.toISOString(),
      };

      const account2: AccountPortfolio = {
        accountId: 'metamask:a1b2:0xAcc2',
        accountLabel: 'Account 2',
        walletConnectionId: 'metamask:a1b2',
        providerName: 'MetaMask',
        assets: [],
        totalValue: { value: 10000, currency: 'USD', timestamp: now },
        lastUpdated: now.toISOString(),
      };

      const walletPortfolio: WalletPortfolio = {
        walletConnectionId: 'metamask:a1b2',
        connectionLabel: 'My MetaMask',
        providerName: 'MetaMask',
        accounts: [account1, account2],
        totalValue: { value: 25000, currency: 'USD', timestamp: now },
      };

      expect(walletPortfolio.accounts).toHaveLength(2);
      expect(walletPortfolio.totalValue.value).toBe(25000);
    });
  });

  describe('GroupPortfolio', () => {
    it('should aggregate accounts across wallet connections', () => {
      const groupPortfolio: GroupPortfolio = {
        groupId: 'group-defi-1',
        groupName: 'DeFi Accounts',
        accounts: [],
        totalValue: { value: 75000, currency: 'USD', timestamp: now },
        lastUpdated: now.toISOString(),
      };

      expect(groupPortfolio.groupId).toBe('group-defi-1');
      expect(groupPortfolio.groupName).toBe('DeFi Accounts');
    });
  });

  describe('AccountSummary', () => {
    it('should provide lightweight account overview', () => {
      const summary: AccountSummary = {
        accountId: 'metamask:a1b2:0xAbc',
        accountLabel: 'Main DeFi',
        connectionLabel: 'My MetaMask',
        providerId: 'metamask',
        totalValue: { value: 25000, currency: 'USD', timestamp: now },
        assetCount: 12,
        chains: [Chain.ETHEREUM, Chain.POLYGON],
        lastUpdated: now.toISOString(),
      };

      expect(summary.assetCount).toBe(12);
      expect(summary.chains).toHaveLength(2);
      expect(summary.providerId).toBe('metamask');
    });

    it('should support watch address summary', () => {
      const watchSummary: AccountSummary = {
        accountId: 'watch:0xWatchAddr',
        accountLabel: 'Watched Whale',
        connectionLabel: 'Watch',
        providerId: 'watch',
        totalValue: { value: 500000, currency: 'USD', timestamp: now },
        assetCount: 30,
        chains: [Chain.ETHEREUM, Chain.POLYGON, Chain.ARBITRUM],
        lastUpdated: now.toISOString(),
      };

      expect(watchSummary.providerId).toBe('watch');
    });
  });

  describe('AssetDistribution', () => {
    it('should show distribution of an asset across accounts', () => {
      const ethAssetObj: Asset = {
        id: 'ethereum-eth',
        symbol: 'ETH',
        name: 'Ethereum',
        type: AssetType.CRYPTOCURRENCY,
      };

      const entry1: AccountAssetEntry = {
        accountId: 'metamask:a1b2:0xAcc1',
        accountLabel: 'Main',
        connectionLabel: 'MetaMask',
        quantity: { assetId: 'ethereum-eth', asset: ethAssetObj, amount: '7.0' },
        value: { value: 14000, currency: 'USD', timestamp: now },
        percentage: 66.67,
      };

      const entry2: AccountAssetEntry = {
        accountId: 'rabby:c3d4:0xAcc2',
        accountLabel: 'DeFi',
        connectionLabel: 'Rabby',
        quantity: { assetId: 'ethereum-eth', asset: ethAssetObj, amount: '3.5' },
        value: { value: 7000, currency: 'USD', timestamp: now },
        percentage: 33.33,
      };

      const dist: AssetDistribution = {
        symbol: 'ETH',
        totalQuantity: { assetId: 'ethereum-eth', asset: ethAssetObj, amount: '10.5' },
        totalValue: { value: 21000, currency: 'USD', timestamp: now },
        distribution: [entry1, entry2],
      };

      expect(dist.distribution).toHaveLength(2);
      const totalPct = dist.distribution.reduce((sum, e) => sum + e.percentage, 0);
      expect(totalPct).toBeCloseTo(100, 0);
    });
  });
});

describe('Multi-Wallet Integration Models', () => {
  const now = new Date().toISOString();

  describe('TrackedAddress', () => {
    it('should represent a connected account tracked address', () => {
      const tracked: TrackedAddress = {
        accountId: 'metamask:a1b2:0xAbC123',
        address: '0xAbC123',
        walletConnectionId: 'metamask:a1b2',
        providerId: 'metamask',
        accountLabel: 'Main DeFi',
        connectionLabel: 'My MetaMask',
        chainScope: [Chain.ETHEREUM, Chain.POLYGON],
      };

      expect(tracked.providerId).toBe('metamask');
      expect(tracked.chainScope).toContain(Chain.ETHEREUM);
    });

    it('should represent a watch address as tracked', () => {
      const watchTracked: TrackedAddress = {
        accountId: 'watch:0xWatchAddr',
        address: '0xWatchAddr',
        walletConnectionId: 'watch',
        providerId: 'watch',
        accountLabel: 'Watched Whale',
        connectionLabel: 'Watch',
        chainScope: [Chain.ETHEREUM],
      };

      expect(watchTracked.walletConnectionId).toBe('watch');
      expect(watchTracked.providerId).toBe('watch');
    });
  });

  describe('AccountMetadata', () => {
    it('should provide full account metadata', () => {
      const metadata: AccountMetadata = {
        accountId: 'metamask:a1b2:0xAbC123',
        address: '0xAbC123',
        accountLabel: 'Main DeFi',
        connectionLabel: 'My MetaMask',
        providerId: 'metamask',
        walletConnectionId: 'metamask:a1b2',
        groups: ['group-defi-1', 'group-main'],
        discoveredAt: now,
        isStale: false,
        isActive: true,
      };

      expect(metadata.groups).toHaveLength(2);
      expect(metadata.isStale).toBe(false);
      expect(metadata.isActive).toBe(true);
    });

    it('should support watch address metadata', () => {
      const watchMeta: AccountMetadata = {
        accountId: 'watch:0xWatchAddr',
        address: '0xWatchAddr',
        accountLabel: 'Watched Whale',
        connectionLabel: 'Watch',
        providerId: 'watch',
        walletConnectionId: 'watch',
        groups: [],
        discoveredAt: now,
        isStale: false,
        isActive: false,
      };

      expect(watchMeta.providerId).toBe('watch');
      expect(watchMeta.isActive).toBe(false);
    });
  });

  describe('AddressRequest', () => {
    it('should request data for a specific account', () => {
      const request: AddressRequest = {
        accountId: 'metamask:a1b2:0xAbC123',
        address: '0xAbC123',
        chainScope: [Chain.ETHEREUM, Chain.POLYGON, Chain.ARBITRUM],
      };

      expect(request.chainScope).toHaveLength(3);
      expect(request.address).toBe('0xAbC123');
    });
  });

  describe('AccountBalanceList', () => {
    const ethAssetObj: Asset = {
      id: 'ethereum-eth',
      symbol: 'ETH',
      name: 'Ethereum',
      type: AssetType.CRYPTOCURRENCY,
    };

    it('should represent successful balance results', () => {
      const balance: AccountBalance = {
        accountId: 'metamask:a1b2:0xAbC123',
        address: '0xAbC123',
        chainId: Chain.ETHEREUM,
        nativeBalance: { assetId: 'ethereum-eth', asset: ethAssetObj, amount: '5.0' },
        tokenBalances: [],
      };

      const result: AccountBalanceList = {
        balances: [balance],
        errors: [],
        timestamp: now,
      };

      expect(result.balances).toHaveLength(1);
      expect(result.errors).toHaveLength(0);
    });

    it('should support partial failure', () => {
      const error: AccountError = {
        accountId: 'metamask:a1b2:0xFail',
        chainId: Chain.POLYGON,
        message: 'RPC timeout',
        code: 'TIMEOUT',
      };

      const balance: AccountBalance = {
        accountId: 'metamask:a1b2:0xAbC123',
        address: '0xAbC123',
        chainId: Chain.ETHEREUM,
        nativeBalance: { assetId: 'ethereum-eth', asset: ethAssetObj, amount: '5.0' },
        tokenBalances: [],
      };

      const result: AccountBalanceList = {
        balances: [balance],
        errors: [error],
        timestamp: now,
      };

      expect(result.balances).toHaveLength(1);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].code).toBe('TIMEOUT');
    });

    it('should support error without code', () => {
      const error: AccountError = {
        accountId: 'metamask:a1b2:0xFail',
        chainId: Chain.ETHEREUM,
        message: 'Unknown error',
      };

      expect(error.code).toBeUndefined();
    });
  });
});

describe('Updated Existing Types — Multi-Wallet Fields', () => {
  describe('Asset — accountId and walletConnectionId', () => {
    it('should support accountId field', () => {
      const asset: Asset = {
        id: 'ethereum-eth',
        symbol: 'ETH',
        name: 'Ethereum',
        type: AssetType.CRYPTOCURRENCY,
        accountId: 'metamask:a1b2:0xAbC123',
      };

      expect(asset.accountId).toBe('metamask:a1b2:0xAbC123');
    });

    it('should support walletConnectionId field', () => {
      const asset: Asset = {
        id: 'ethereum-eth',
        symbol: 'ETH',
        name: 'Ethereum',
        type: AssetType.CRYPTOCURRENCY,
        walletConnectionId: 'metamask:a1b2',
      };

      expect(asset.walletConnectionId).toBe('metamask:a1b2');
    });

    it('should support watch wallet connection', () => {
      const asset: Asset = {
        id: 'ethereum-eth',
        symbol: 'ETH',
        name: 'Ethereum',
        type: AssetType.CRYPTOCURRENCY,
        accountId: 'watch:0xAbC',
        walletConnectionId: 'watch',
      };

      expect(asset.walletConnectionId).toBe('watch');
    });

    it('should remain backward compatible without new fields', () => {
      const asset: Asset = {
        id: 'ethereum-eth',
        symbol: 'ETH',
        name: 'Ethereum',
        type: AssetType.CRYPTOCURRENCY,
      };

      expect(asset.accountId).toBeUndefined();
      expect(asset.walletConnectionId).toBeUndefined();
    });
  });

  describe('Transaction — walletConnectionId', () => {
    it('should support walletConnectionId field', () => {
      const tx: Transaction = {
        id: 'tx-1',
        accountId: 'metamask:a1b2:0xAbC123',
        walletConnectionId: 'metamask:a1b2',
        type: TransactionType.TRANSFER_OUT,
        status: 'COMPLETED',
        timestamp: new Date(),
      };

      expect(tx.walletConnectionId).toBe('metamask:a1b2');
    });

    it('should support watch transaction', () => {
      const tx: Transaction = {
        id: 'tx-2',
        accountId: 'watch:0xAbC',
        walletConnectionId: 'watch',
        type: TransactionType.TRANSFER_IN,
        status: 'COMPLETED',
        timestamp: new Date(),
      };

      expect(tx.walletConnectionId).toBe('watch');
    });

    it('should remain backward compatible without walletConnectionId', () => {
      const tx: Transaction = {
        id: 'tx-3',
        accountId: 'wallet-1',
        type: TransactionType.SWAP,
        status: 'COMPLETED',
        timestamp: new Date(),
      };

      expect(tx.walletConnectionId).toBeUndefined();
    });
  });

  describe('DeFiPosition — accountId', () => {
    it('should support accountId alongside existing fields', () => {
      const position: DeFiPosition = {
        id: 'defi-pos-1',
        type: DeFiPositionType.LENDING_SUPPLY,
        protocol: DeFiProtocol.AAVE,
        chain: Chain.ETHEREUM,
        underlyingAssets: [],
        rewards: [],
        accountId: 'metamask:a1b2:0xAbC123',
      };

      expect(position.accountId).toBe('metamask:a1b2:0xAbC123');
    });

    it('should remain backward compatible without accountId', () => {
      const position: DeFiPosition = {
        id: 'defi-pos-2',
        type: DeFiPositionType.LIQUIDITY,
        protocol: DeFiProtocol.UNISWAP,
        chain: Chain.ETHEREUM,
        underlyingAssets: [],
        rewards: [],
      };

      expect(position.accountId).toBeUndefined();
    });
  });

  describe('Portfolio — accountBreakdown and walletBreakdown', () => {
    const now = new Date();

    it('should support accountBreakdown map', () => {
      const accountPortfolio: AccountPortfolio = {
        accountId: 'metamask:a1b2:0xAbC',
        accountLabel: 'Main',
        walletConnectionId: 'metamask:a1b2',
        providerName: 'MetaMask',
        assets: [],
        totalValue: { value: 25000, currency: 'USD', timestamp: now },
        lastUpdated: now.toISOString(),
      };

      const portfolio: Portfolio = {
        id: 'portfolio-1',
        name: 'Multi-Wallet Portfolio',
        totalValue: { value: 25000, currency: 'USD', timestamp: now },
        lastUpdated: now,
        accountBreakdown: new Map([
          ['metamask:a1b2:0xAbC', accountPortfolio],
        ]),
      };

      expect(portfolio.accountBreakdown).toBeDefined();
      expect(portfolio.accountBreakdown!.size).toBe(1);
      expect(portfolio.accountBreakdown!.get('metamask:a1b2:0xAbC')?.totalValue.value).toBe(25000);
    });

    it('should support walletBreakdown map', () => {
      const walletPort: WalletPortfolio = {
        walletConnectionId: 'metamask:a1b2',
        connectionLabel: 'My MetaMask',
        providerName: 'MetaMask',
        accounts: [],
        totalValue: { value: 50000, currency: 'USD', timestamp: now },
      };

      const portfolio: Portfolio = {
        id: 'portfolio-2',
        name: 'Multi-Wallet Portfolio',
        totalValue: { value: 50000, currency: 'USD', timestamp: now },
        lastUpdated: now,
        walletBreakdown: new Map([
          ['metamask:a1b2', walletPort],
        ]),
      };

      expect(portfolio.walletBreakdown).toBeDefined();
      expect(portfolio.walletBreakdown!.size).toBe(1);
    });

    it('should remain backward compatible without breakdowns', () => {
      const portfolio: Portfolio = {
        id: 'portfolio-3',
        name: 'Legacy Portfolio',
        totalValue: { value: 10000, currency: 'USD', timestamp: now },
        lastUpdated: now,
      };

      expect(portfolio.accountBreakdown).toBeUndefined();
      expect(portfolio.walletBreakdown).toBeUndefined();
    });
  });

  describe('FilterOptions — account filtering', () => {
    it('should support accountIds filter', () => {
      const filter: FilterOptions = {
        accountIds: ['metamask:a1b2:0xAcc1', 'rabby:c3d4:0xAcc2'],
      };

      expect(filter.accountIds).toHaveLength(2);
    });

    it('should support walletConnectionIds filter', () => {
      const filter: FilterOptions = {
        walletConnectionIds: ['metamask:a1b2', 'rabby:c3d4'],
      };

      expect(filter.walletConnectionIds).toHaveLength(2);
    });

    it('should support groupIds filter', () => {
      const filter: FilterOptions = {
        groupIds: ['group-defi-1', 'group-main'],
      };

      expect(filter.groupIds).toHaveLength(2);
    });

    it('should combine account filters with existing filters', () => {
      const filter: FilterOptions = {
        chains: [Chain.ETHEREUM],
        assetTypes: [AssetType.CRYPTOCURRENCY],
        accountIds: ['metamask:a1b2:0xAcc1'],
        walletConnectionIds: ['metamask:a1b2'],
        groupIds: ['group-defi-1'],
      };

      expect(filter.chains).toHaveLength(1);
      expect(filter.accountIds).toHaveLength(1);
      expect(filter.walletConnectionIds).toHaveLength(1);
      expect(filter.groupIds).toHaveLength(1);
    });

    it('should remain backward compatible without account filters', () => {
      const filter: FilterOptions = {
        chains: [Chain.ETHEREUM],
        minValue: 100,
      };

      expect(filter.accountIds).toBeUndefined();
      expect(filter.walletConnectionIds).toBeUndefined();
      expect(filter.groupIds).toBeUndefined();
    });
  });

  describe('IntegrationCredentials — accountId', () => {
    it('should support accountId for account-specific integrations', () => {
      const creds: IntegrationCredentials = {
        source: IntegrationSource.METAMASK,
        walletAddress: '0xAbC123',
        accountId: 'metamask:a1b2:0xAbC123',
      };

      expect(creds.accountId).toBe('metamask:a1b2:0xAbC123');
    });

    it('should remain backward compatible without accountId', () => {
      const creds: IntegrationCredentials = {
        source: IntegrationSource.KRAKEN,
        apiKey: 'encrypted_key',
      };

      expect(creds.accountId).toBeUndefined();
    });
  });
});

describe('Contract Tests — Multi-Wallet Type Exports', () => {
  it('should export all identity types', () => {
    // These type imports would fail at compile-time if not exported
    const providerId: WalletProviderId = 'metamask';
    const connectionId: WalletConnectionId = 'metamask:a1b2';
    const accountId: AccountId = 'metamask:a1b2:0xAbc';
    expect(providerId).toBeDefined();
    expect(connectionId).toBeDefined();
    expect(accountId).toBeDefined();
  });

  it('should export all connection model types', () => {
    const conn: WalletConnection = {
      connectionId: 'metamask:a1b2',
      providerId: 'metamask',
      providerName: 'MetaMask',
      providerIcon: 'icon',
      connectionLabel: 'Label',
      accounts: [],
      activeAccountAddress: null,
      supportedChains: [],
      connectedAt: '',
      lastActiveAt: '',
      sessionStatus: 'active',
    };
    expect(conn).toBeDefined();
  });

  it('should export all portfolio breakdown types', () => {
    const now = new Date();
    const ap: AccountPortfolio = {
      accountId: 'a', accountLabel: 'a', walletConnectionId: 'w',
      providerName: 'p', assets: [],
      totalValue: { currency: 'USD', timestamp: now }, lastUpdated: '',
    };
    const wp: WalletPortfolio = {
      walletConnectionId: 'w', connectionLabel: 'c', providerName: 'p',
      accounts: [], totalValue: { currency: 'USD', timestamp: now },
    };
    const gp: GroupPortfolio = {
      groupId: 'g', groupName: 'n', accounts: [],
      totalValue: { currency: 'USD', timestamp: now }, lastUpdated: '',
    };
    expect(ap).toBeDefined();
    expect(wp).toBeDefined();
    expect(gp).toBeDefined();
  });

  it('should export all integration types', () => {
    const ta: TrackedAddress = {
      accountId: 'a', address: '0x', walletConnectionId: 'w',
      providerId: 'metamask', accountLabel: 'l', connectionLabel: 'c', chainScope: [],
    };
    const am: AccountMetadata = {
      accountId: 'a', address: '0x', accountLabel: 'l', connectionLabel: 'c',
      providerId: 'metamask', walletConnectionId: 'w',
      groups: [], discoveredAt: '', isStale: false, isActive: true,
    };
    const ar: AddressRequest = {
      accountId: 'a', address: '0x', chainScope: [],
    };
    expect(ta).toBeDefined();
    expect(am).toBeDefined();
    expect(ar).toBeDefined();
  });
});
