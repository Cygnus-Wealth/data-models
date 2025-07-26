import { describe, it, expect } from 'vitest';
import {
  AssetType,
  Chain,
  IntegrationSource,
  TransactionType,
  AccountType,
  Asset,
  NFT,
  Price,
  MarketData,
  Balance,
  LiquidityPosition,
  StakedPosition,
  LendingPosition,
  Account,
  Portfolio,
  Transaction,
  IntegrationCredentials,
  SyncStatus,
  ApiResponse,
  PaginatedResponse,
  AssetIdentifier,
  TimeRange,
  FilterOptions,
  PortfolioItem
} from './index';

describe('CygnusWealth Data Models', () => {
  describe('Enums', () => {
    it('should have all required asset types', () => {
      expect(AssetType.CRYPTOCURRENCY).toBe('CRYPTOCURRENCY');
      expect(AssetType.STOCK).toBe('STOCK');
      expect(AssetType.ETF).toBe('ETF');
      expect(AssetType.NFT).toBe('NFT');
      expect(AssetType.LIQUIDITY_POOL).toBe('LIQUIDITY_POOL');
    });

    it('should have all supported chains', () => {
      expect(Chain.ETHEREUM).toBe('ETHEREUM');
      expect(Chain.SOLANA).toBe('SOLANA');
      expect(Chain.SUI).toBe('SUI');
      expect(Chain.POLYGON).toBe('POLYGON');
    });

    it('should have all integration sources', () => {
      expect(IntegrationSource.ROBINHOOD).toBe('ROBINHOOD');
      expect(IntegrationSource.KRAKEN).toBe('KRAKEN');
      expect(IntegrationSource.COINBASE).toBe('COINBASE');
      expect(IntegrationSource.METAMASK).toBe('METAMASK');
      expect(IntegrationSource.PHANTOM).toBe('PHANTOM');
      expect(IntegrationSource.SLUSH).toBe('SLUSH');
    });

    it('should have all transaction types', () => {
      expect(TransactionType.BUY).toBe('BUY');
      expect(TransactionType.SELL).toBe('SELL');
      expect(TransactionType.SWAP).toBe('SWAP');
      expect(TransactionType.STAKE).toBe('STAKE');
      expect(TransactionType.PROVIDE_LIQUIDITY).toBe('PROVIDE_LIQUIDITY');
    });
  });

  describe('Asset Models', () => {
    it('should create a valid Asset', () => {
      const asset: Asset = {
        id: 'eth-1',
        symbol: 'ETH',
        name: 'Ethereum',
        type: AssetType.CRYPTOCURRENCY,
        decimals: 18,
        contractAddress: '0x0000000000000000000000000000000000000000',
        chain: Chain.ETHEREUM,
        logoUrl: 'https://example.com/eth.png',
        coingeckoId: 'ethereum'
      };

      expect(asset.symbol).toBe('ETH');
      expect(asset.type).toBe(AssetType.CRYPTOCURRENCY);
      expect(asset.chain).toBe(Chain.ETHEREUM);
    });

    it('should create a valid NFT', () => {
      const nft: NFT = {
        id: 'bayc-1',
        symbol: 'BAYC',
        name: 'Bored Ape Yacht Club #1',
        type: AssetType.NFT,
        tokenId: '1',
        collectionAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
        collectionName: 'Bored Ape Yacht Club',
        chain: Chain.ETHEREUM,
        imageUrl: 'https://example.com/bayc1.png',
        attributes: [
          { trait_type: 'Background', value: 'Blue' },
          { trait_type: 'Fur', value: 'Golden Brown' }
        ]
      };

      expect(nft.type).toBe(AssetType.NFT);
      expect(nft.tokenId).toBe('1');
      expect(nft.attributes).toHaveLength(2);
    });
  });

  describe('Pricing Models', () => {
    it('should create a valid Price', () => {
      const price: Price = {
        value: 2500.50,
        currency: 'USD',
        timestamp: new Date('2024-01-26T12:00:00Z'),
        source: IntegrationSource.COINBASE
      };

      expect(price.value).toBe(2500.50);
      expect(price.currency).toBe('USD');
      expect(price.source).toBe(IntegrationSource.COINBASE);
    });

    it('should create valid MarketData', () => {
      const marketData: MarketData = {
        assetId: 'eth-1',
        currentPrice: {
          value: 2500,
          currency: 'USD',
          timestamp: new Date(),
          source: IntegrationSource.COINBASE
        },
        marketCap: 300000000000,
        volume24h: 15000000000,
        priceChange24h: 50,
        priceChangePercentage24h: 2.04,
        lastUpdated: new Date()
      };

      expect(marketData.marketCap).toBe(300000000000);
      expect(marketData.priceChangePercentage24h).toBe(2.04);
    });
  });

  describe('Position Models', () => {
    it('should create a valid Balance', () => {
      const balance: Balance = {
        assetId: 'eth-1',
        asset: {
          id: 'eth-1',
          symbol: 'ETH',
          name: 'Ethereum',
          type: AssetType.CRYPTOCURRENCY,
          chain: Chain.ETHEREUM
        },
        amount: '10.5',
        value: {
          value: 26250,
          currency: 'USD',
          timestamp: new Date(),
          source: IntegrationSource.COINBASE
        },
        cost_basis: 20000,
        unrealized_pnl: 6250
      };

      expect(balance.amount).toBe('10.5');
      expect(balance.unrealized_pnl).toBe(6250);
    });

    it('should create a valid LiquidityPosition', () => {
      const lpPosition: LiquidityPosition = {
        id: 'uni-v3-eth-usdc',
        protocol: 'Uniswap V3',
        poolAddress: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
        poolName: 'ETH/USDC',
        chain: Chain.ETHEREUM,
        tokens: [],
        lpTokenBalance: '1000',
        share: 0.001,
        fees_earned: 150.50
      };

      expect(lpPosition.protocol).toBe('Uniswap V3');
      expect(lpPosition.share).toBe(0.001);
    });

    it('should create a valid StakedPosition', () => {
      const stakedPosition: StakedPosition = {
        id: 'eth-staking-1',
        protocol: 'Ethereum 2.0',
        chain: Chain.ETHEREUM,
        asset: {
          id: 'eth-1',
          symbol: 'ETH',
          name: 'Ethereum',
          type: AssetType.CRYPTOCURRENCY,
          chain: Chain.ETHEREUM
        },
        stakedAmount: '32',
        rewards: [],
        apr: 4.5
      };

      expect(stakedPosition.stakedAmount).toBe('32');
      expect(stakedPosition.apr).toBe(4.5);
    });

    it('should create a valid LendingPosition', () => {
      const lendingPosition: LendingPosition = {
        id: 'aave-supply-usdc',
        protocol: 'Aave V3',
        chain: Chain.ETHEREUM,
        type: 'SUPPLY',
        asset: {
          id: 'usdc-1',
          symbol: 'USDC',
          name: 'USD Coin',
          type: AssetType.CRYPTOCURRENCY,
          chain: Chain.ETHEREUM
        },
        amount: '10000',
        apy: 3.2,
        health_factor: 1.8
      };

      expect(lendingPosition.type).toBe('SUPPLY');
      expect(lendingPosition.apy).toBe(3.2);
    });
  });

  describe('Account and Portfolio Models', () => {
    it('should create a valid Account', () => {
      const account: Account = {
        id: 'coinbase-main',
        name: 'Coinbase Main Account',
        type: AccountType.SPOT,
        source: IntegrationSource.COINBASE,
        sourceAccountId: 'cb-123',
        balances: [],
        lastSynced: new Date()
      };

      expect(account.type).toBe(AccountType.SPOT);
      expect(account.source).toBe(IntegrationSource.COINBASE);
    });

    it('should create a valid Portfolio', () => {
      const portfolio: Portfolio = {
        id: 'portfolio-1',
        userId: 'user-123',
        name: 'My Crypto Portfolio',
        accounts: [],
        totalValue: {
          value: 100000,
          currency: 'USD',
          timestamp: new Date(),
          source: IntegrationSource.MANUAL_ENTRY
        },
        performance: {
          day: 2.5,
          week: 5.0,
          month: 10.0,
          year: 50.0,
          all_time: 200.0
        },
        lastUpdated: new Date()
      };

      expect(portfolio.performance?.year).toBe(50.0);
      expect(portfolio.totalValue.value).toBe(100000);
    });
  });

  describe('Transaction Models', () => {
    it('should create a valid Transaction', () => {
      const transaction: Transaction = {
        id: 'tx-1',
        accountId: 'account-1',
        type: TransactionType.SWAP,
        status: 'COMPLETED',
        hash: '0x1234567890abcdef',
        chain: Chain.ETHEREUM,
        timestamp: new Date(),
        assets_in: [{
          asset: {
            id: 'usdc-1',
            symbol: 'USDC',
            name: 'USD Coin',
            type: AssetType.CRYPTOCURRENCY,
            chain: Chain.ETHEREUM
          },
          amount: '1000'
        }],
        assets_out: [{
          asset: {
            id: 'eth-1',
            symbol: 'ETH',
            name: 'Ethereum',
            type: AssetType.CRYPTOCURRENCY,
            chain: Chain.ETHEREUM
          },
          amount: '0.4'
        }]
      };

      expect(transaction.type).toBe(TransactionType.SWAP);
      expect(transaction.status).toBe('COMPLETED');
      expect(transaction.assets_in).toHaveLength(1);
      expect(transaction.assets_out).toHaveLength(1);
    });
  });

  describe('Integration Models', () => {
    it('should create valid IntegrationCredentials', () => {
      const credentials: IntegrationCredentials = {
        source: IntegrationSource.KRAKEN,
        apiKey: 'test-key',
        apiSecret: 'test-secret'
      };

      expect(credentials.source).toBe(IntegrationSource.KRAKEN);
      expect(credentials.apiKey).toBe('test-key');
    });

    it('should create valid SyncStatus', () => {
      const syncStatus: SyncStatus = {
        source: IntegrationSource.COINBASE,
        accountId: 'account-1',
        status: 'SUCCESS',
        lastSyncTime: new Date(),
        itemsSynced: 150
      };

      expect(syncStatus.status).toBe('SUCCESS');
      expect(syncStatus.itemsSynced).toBe(150);
    });
  });

  describe('Response Wrappers', () => {
    it('should create a valid ApiResponse', () => {
      const response: ApiResponse<Asset> = {
        success: true,
        data: {
          id: 'btc-1',
          symbol: 'BTC',
          name: 'Bitcoin',
          type: AssetType.CRYPTOCURRENCY,
          chain: Chain.BITCOIN
        },
        timestamp: new Date()
      };

      expect(response.success).toBe(true);
      expect(response.data?.symbol).toBe('BTC');
    });

    it('should create a valid error ApiResponse', () => {
      const errorResponse: ApiResponse<Asset> = {
        success: false,
        error: {
          code: 'RATE_LIMIT',
          message: 'Rate limit exceeded',
          details: { retryAfter: 60 }
        },
        timestamp: new Date()
      };

      expect(errorResponse.success).toBe(false);
      expect(errorResponse.error?.code).toBe('RATE_LIMIT');
    });

    it('should create a valid PaginatedResponse', () => {
      const paginatedResponse: PaginatedResponse<Asset> = {
        items: [],
        total: 100,
        page: 1,
        pageSize: 20,
        hasMore: true
      };

      expect(paginatedResponse.total).toBe(100);
      expect(paginatedResponse.hasMore).toBe(true);
    });
  });

  describe('Utility Types', () => {
    it('should create valid AssetIdentifier', () => {
      const identifier: AssetIdentifier = {
        symbol: 'ETH',
        contractAddress: '0x123',
        chain: Chain.ETHEREUM
      };

      expect(identifier.symbol).toBe('ETH');
      expect(identifier.chain).toBe(Chain.ETHEREUM);
    });

    it('should create valid TimeRange', () => {
      const timeRange: TimeRange = {
        start: new Date(2025, 0, 1), // January 1, 2025
        end: new Date(2025, 0, 31)    // January 31, 2025
      };

      expect(timeRange.start.getMonth()).toBe(0);
      expect(timeRange.end.getDate()).toBe(31);
    });

    it('should create valid FilterOptions', () => {
      const filters: FilterOptions = {
        chains: [Chain.ETHEREUM, Chain.SOLANA],
        assetTypes: [AssetType.CRYPTOCURRENCY, AssetType.NFT],
        sources: [IntegrationSource.METAMASK],
        minValue: 100,
        maxValue: 10000
      };

      expect(filters.chains).toHaveLength(2);
      expect(filters.minValue).toBe(100);
    });
  });

  describe('Backward Compatibility', () => {
    it('should maintain PortfolioItem interface', () => {
      const item: PortfolioItem = {
        id: 'item-1',
        balance: 1000
      };

      expect(item.id).toBe('item-1');
      expect(item.balance).toBe(1000);
    });
  });
});