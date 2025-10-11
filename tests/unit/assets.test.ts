import { describe, it, expect } from 'vitest';
import { Asset, NFT, Balance, PortfolioAsset, AssetType, Chain } from '../../src/index';
import {
  ethAsset,
  usdcAsset,
  btcAsset,
  minimalAsset,
  baycNFT,
  cryptopunkNFT,
  ethBalance,
  zeroBalance,
  largeBalance,
  noPriceBalance,
  weiBalance,
  ethPortfolioAsset,
  noPricePortfolioAsset
} from '../fixtures';

/**
 * Unit tests for Asset-related types (Asset, NFT, Balance, PortfolioAsset).
 * Coverage target: 100%
 */

describe('Asset Models', () => {
  describe('Asset', () => {
    it('should create asset with all fields', () => {
      expect(ethAsset.id).toBe('ethereum-eth');
      expect(ethAsset.symbol).toBe('ETH');
      expect(ethAsset.name).toBe('Ethereum');
      expect(ethAsset.type).toBe(AssetType.CRYPTOCURRENCY);
      expect(ethAsset.decimals).toBe(18);
      expect(ethAsset.chain).toBe(Chain.ETHEREUM);
      expect(ethAsset.logoUrl).toBeDefined();
      expect(ethAsset.coingeckoId).toBe('ethereum');
    });

    it('should create asset with minimal required fields', () => {
      expect(minimalAsset.id).toBe('minimal-token');
      expect(minimalAsset.symbol).toBe('MIN');
      expect(minimalAsset.name).toBe('Minimal Token');
      expect(minimalAsset.type).toBe(AssetType.CRYPTOCURRENCY);
      expect(minimalAsset.decimals).toBeUndefined();
      expect(minimalAsset.chain).toBeUndefined();
    });

    it('should support various asset types', () => {
      expect(ethAsset.type).toBe(AssetType.CRYPTOCURRENCY);
      expect(usdcAsset.type).toBe(AssetType.CRYPTOCURRENCY);
      expect(btcAsset.type).toBe(AssetType.CRYPTOCURRENCY);
    });

    it('should validate ID format (string)', () => {
      expect(typeof ethAsset.id).toBe('string');
      expect(ethAsset.id.length).toBeGreaterThan(0);
    });

    it('should support symbol normalization', () => {
      // Symbols should be uppercase strings
      expect(ethAsset.symbol).toBe(ethAsset.symbol.toUpperCase());
      expect(usdcAsset.symbol).toBe(usdcAsset.symbol.toUpperCase());
      expect(btcAsset.symbol).toBe(btcAsset.symbol.toUpperCase());
    });

    it('should support contract addresses for tokens', () => {
      expect(ethAsset.contractAddress).toBeDefined();
      expect(usdcAsset.contractAddress).toBeDefined();
      expect(usdcAsset.contractAddress?.startsWith('0x')).toBe(true);
    });

    it('should support traditional finance identifiers', () => {
      const stockAsset: Asset = {
        id: 'stock-aapl',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        type: AssetType.STOCK,
        cusip: '037833100',
        isin: 'US0378331005'
      };

      expect(stockAsset.cusip).toBe('037833100');
      expect(stockAsset.isin).toBe('US0378331005');
    });

    it('should support metadata for source-specific data', () => {
      const assetWithMetadata: Asset = {
        id: 'custom-token',
        symbol: 'CUSTOM',
        name: 'Custom Token',
        type: AssetType.CRYPTOCURRENCY,
        metadata: {
          'coingecko:rank': 100,
          'custom:tag': 'defi'
        }
      };

      expect(assetWithMetadata.metadata).toBeDefined();
      expect(assetWithMetadata.metadata?.['coingecko:rank']).toBe(100);
    });

    it('should support different decimal precisions', () => {
      expect(ethAsset.decimals).toBe(18); // Standard ERC-20
      expect(usdcAsset.decimals).toBe(6);  // USDC
      expect(btcAsset.decimals).toBe(8);   // Bitcoin
    });
  });

  describe('NFT', () => {
    it('should extend Asset interface', () => {
      // NFT should have all Asset fields
      expect(baycNFT.id).toBeDefined();
      expect(baycNFT.symbol).toBeDefined();
      expect(baycNFT.name).toBeDefined();
      expect(baycNFT.type).toBe(AssetType.NFT);
    });

    it('should include NFT-specific fields', () => {
      expect(baycNFT.tokenId).toBe('1');
      expect(baycNFT.collectionAddress).toBeDefined();
      expect(baycNFT.collectionName).toBe('Bored Ape Yacht Club');
      expect(baycNFT.imageUrl).toBeDefined();
    });

    it('should support traits/attributes array', () => {
      expect(baycNFT.attributes).toBeDefined();
      expect(Array.isArray(baycNFT.attributes)).toBe(true);
      expect(baycNFT.attributes!.length).toBeGreaterThan(0);

      const firstTrait = baycNFT.attributes![0];
      expect(firstTrait).toHaveProperty('trait_type');
      expect(firstTrait).toHaveProperty('value');
    });

    it('should support rarity scores', () => {
      expect(baycNFT.rarity).toBeDefined();
      expect(typeof baycNFT.rarity).toBe('number');
      expect(baycNFT.rarity).toBeGreaterThan(0);
      expect(baycNFT.rarity).toBeLessThanOrEqual(1);
    });

    it('should support metadata URIs', () => {
      expect(baycNFT.metadataUri).toBeDefined();
      expect(baycNFT.metadataUri?.startsWith('ipfs://')).toBe(true);
    });

    it('should detect ERC-721 collections', () => {
      // Collection address should be valid Ethereum address
      expect(baycNFT.collectionAddress.startsWith('0x')).toBe(true);
      expect(baycNFT.collectionAddress.length).toBe(42);
      expect(cryptopunkNFT.collectionAddress.startsWith('0x')).toBe(true);
    });

    it('should support optional description', () => {
      expect(baycNFT.description).toBeDefined();
      expect(typeof baycNFT.description).toBe('string');
    });

    it('should support NFTs without rarity data', () => {
      const simpleNFT: NFT = {
        id: 'nft-simple',
        symbol: 'SIMPLE',
        name: 'Simple NFT',
        type: AssetType.NFT,
        tokenId: '999',
        collectionAddress: '0x123',
        chain: Chain.ETHEREUM
      };

      expect(simpleNFT.rarity).toBeUndefined();
      expect(simpleNFT.attributes).toBeUndefined();
    });
  });

  describe('Balance', () => {
    it('should represent asset quantity with string precision', () => {
      expect(ethBalance.amount).toBe('10.5');
      expect(typeof ethBalance.amount).toBe('string');
    });

    it('should handle raw string precision for large numbers', () => {
      expect(weiBalance.amount).toBe('1500000000000000000');
      expect(typeof weiBalance.amount).toBe('string');

      // Verify precision is maintained beyond JavaScript number limits
      expect(largeBalance.amount).toBe('9999999999999999.000000');
    });

    it('should handle large numbers exceeding 2^53', () => {
      const veryLargeNumber = '9007199254740992000000'; // > MAX_SAFE_INTEGER
      const balance: Balance = {
        assetId: 'test',
        asset: minimalAsset,
        amount: veryLargeNumber
      };

      expect(balance.amount).toBe(veryLargeNumber);
      expect(balance.amount.length).toBeGreaterThan(15);
    });

    it('should handle zero balance', () => {
      expect(zeroBalance.amount).toBe('0');
      expect(zeroBalance.value?.value).toBe(0);
    });

    it('should support value with market price', () => {
      expect(ethBalance.value).toBeDefined();
      expect(ethBalance.value?.value).toBe(21000);
      expect(ethBalance.value?.currency).toBe('USD');
      expect(ethBalance.value?.timestamp).toBeInstanceOf(Date);
    });

    it('should support balances without price data', () => {
      expect(noPriceBalance.amount).toBeDefined();
      expect(noPriceBalance.value).toBeUndefined();
    });

    it('should support cost basis tracking', () => {
      expect(ethBalance.cost_basis).toBe(18000);
      expect(typeof ethBalance.cost_basis).toBe('number');
    });

    it('should calculate unrealized P&L', () => {
      expect(ethBalance.unrealized_pnl).toBe(3000);
      // P&L = value - cost_basis = 21000 - 18000 = 3000
      const calculatedPnL = ethBalance.value!.value - ethBalance.cost_basis!;
      expect(calculatedPnL).toBe(ethBalance.unrealized_pnl);
    });

    it('should support realized P&L', () => {
      expect(ethBalance.realized_pnl).toBe(0);
      expect(typeof ethBalance.realized_pnl).toBe('number');
    });

    it('should support metadata for additional fields', () => {
      const balanceWithMetadata: Balance = {
        assetId: 'test',
        asset: minimalAsset,
        amount: '100',
        metadata: {
          source: 'aggregated',
          confidence: 0.95
        }
      };

      expect(balanceWithMetadata.metadata).toBeDefined();
    });

    it('should maintain decimal precision', () => {
      // USDC with 6 decimals
      expect(usdcAsset.decimals).toBe(6);

      const usdcBal: Balance = {
        assetId: 'usdc',
        asset: usdcAsset,
        amount: '5000.000000'
      };

      expect(usdcBal.amount).toContain('.');
      expect(usdcBal.amount.split('.')[1]?.length).toBe(6);
    });
  });

  describe('PortfolioAsset', () => {
    it('should compose Asset, Balance, and Price', () => {
      expect(ethPortfolioAsset.asset).toBeDefined();
      expect(ethPortfolioAsset.balance).toBeDefined();
      expect(ethPortfolioAsset.value).toBeDefined();
    });

    it('should track account association', () => {
      expect(ethPortfolioAsset.accountId).toBe('metamask-wallet-1');
      expect(ethPortfolioAsset.assetId).toBe('ethereum-eth');
    });

    it('should support price-less assets', () => {
      expect(noPricePortfolioAsset.asset).toBeDefined();
      expect(noPricePortfolioAsset.balance).toBeDefined();
      expect(noPricePortfolioAsset.value).toBeUndefined();
    });

    it('should calculate total value', () => {
      expect(ethPortfolioAsset.value?.value).toBe(21000);
      // Total value should match balance value
      expect(ethPortfolioAsset.value?.value).toBe(ethPortfolioAsset.balance.value?.value);
    });

    it('should track allocation percentage', () => {
      expect(ethPortfolioAsset.allocation).toBe(28.0);
      expect(typeof ethPortfolioAsset.allocation).toBe('number');
      expect(ethPortfolioAsset.allocation).toBeGreaterThanOrEqual(0);
      expect(ethPortfolioAsset.allocation).toBeLessThanOrEqual(100);
    });

    it('should include lastUpdated timestamp', () => {
      expect(ethPortfolioAsset.lastUpdated).toBeInstanceOf(Date);
    });

    it('should support zero allocation', () => {
      expect(noPricePortfolioAsset.allocation).toBe(0);
    });

    it('should support metadata', () => {
      const assetWithMeta: PortfolioAsset = {
        id: 'pa-1',
        accountId: 'acc-1',
        assetId: 'asset-1',
        asset: minimalAsset,
        balance: noPriceBalance,
        allocation: 5,
        lastUpdated: new Date(),
        metadata: {
          source: 'manual',
          notes: 'Cold storage'
        }
      };

      expect(assetWithMeta.metadata).toBeDefined();
    });
  });
});
