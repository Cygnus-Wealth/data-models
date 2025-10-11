import { describe, it, expect } from 'vitest';
import { Portfolio, PortfolioItem } from '../../src/index';
import { fullPortfolio, minimalPortfolio, multiAccountPortfolio, walletOnlyPortfolio } from '../fixtures';

/**
 * Unit tests for Portfolio types (Portfolio, PortfolioItem).
 * Coverage target: 95%
 */

describe('Portfolio Models', () => {
  describe('Portfolio', () => {
    it('should aggregate multi-account portfolio', () => {
      expect(multiAccountPortfolio.accounts).toHaveLength(3);
      expect(multiAccountPortfolio.totalValue.value).toBe(90250);
    });

    it('should calculate total value', () => {
      expect(fullPortfolio.totalValue.value).toBe(75000);
      expect(fullPortfolio.totalValue.currency).toBe('USD');
    });

    it('should track portfolio items', () => {
      expect(fullPortfolio.items).toHaveLength(3);
      expect(Array.isArray(fullPortfolio.items)).toBe(true);
    });

    it('should support userId for multi-user systems', () => {
      expect(fullPortfolio.userId).toBe('user-123');
      expect(multiAccountPortfolio.userId).toBe('user-456');
    });

    it('should support portfolios without userId', () => {
      expect(walletOnlyPortfolio.userId).toBeUndefined();
    });

    it('should track value history', () => {
      expect(fullPortfolio.totalValueHistory).toHaveLength(3);
      expect(fullPortfolio.totalValueHistory![0].value).toBe(70000);
    });

    it('should track performance metrics', () => {
      expect(fullPortfolio.performance).toBeDefined();
      expect(fullPortfolio.performance!.day).toBe(2.5);
      expect(fullPortfolio.performance!.week).toBe(5.0);
      expect(fullPortfolio.performance!.month).toBe(10.0);
      expect(fullPortfolio.performance!.year).toBe(50.0);
      expect(fullPortfolio.performance!.all_time).toBe(200.0);
    });

    it('should include lastUpdated timestamp', () => {
      expect(fullPortfolio.lastUpdated).toBeInstanceOf(Date);
    });

    it('should support minimal portfolio', () => {
      expect(minimalPortfolio.name).toBe('Minimal Portfolio');
      expect(minimalPortfolio.totalValue.value).toBe(0);
      expect(minimalPortfolio.accounts).toBeUndefined();
      expect(minimalPortfolio.items).toBeUndefined();
    });

    it('should support wallet-only portfolios', () => {
      expect(walletOnlyPortfolio.items).toHaveLength(1);
      expect(walletOnlyPortfolio.accounts).toBeUndefined();
    });

    it('should support metadata', () => {
      expect(walletOnlyPortfolio.metadata).toBeDefined();
      expect(walletOnlyPortfolio.metadata?.tags).toContain('defi');
      expect(walletOnlyPortfolio.metadata?.notes).toBe('Hold for 5+ years');
    });

    it('should handle empty portfolios', () => {
      const emptyPortfolio: Portfolio = {
        id: 'empty-1',
        name: 'Empty Portfolio',
        accounts: [],
        totalValue: {
          value: 0,
          currency: 'USD',
          timestamp: new Date()
        },
        lastUpdated: new Date()
      };

      expect(emptyPortfolio.accounts).toHaveLength(0);
      expect(emptyPortfolio.totalValue.value).toBe(0);
    });

    it('should deduplicate assets across accounts', () => {
      // If same asset exists in multiple accounts, items should deduplicate
      expect(fullPortfolio.items).toHaveLength(3);
      const assetIds = fullPortfolio.items!.map(item => item.assetId);
      const uniqueAssetIds = new Set(assetIds);
      expect(assetIds.length).toBe(uniqueAssetIds.size); // No duplicates
    });

    it('should calculate performance over time', () => {
      const perf = multiAccountPortfolio.performance!;

      expect(perf.week).toBeGreaterThan(perf.day);
      expect(perf.month).toBeGreaterThan(perf.week);
      expect(perf.year).toBeGreaterThan(perf.month);
      expect(perf.all_time).toBeGreaterThan(perf.year);
    });
  });

  describe('PortfolioItem (DEPRECATED)', () => {
    it('should maintain backward compatibility', () => {
      const item: PortfolioItem = {
        id: 'item-1',
        balance: 1000
      };

      expect(item.id).toBe('item-1');
      expect(item.balance).toBe(1000);
    });

    it('should support simple structure', () => {
      const item: PortfolioItem = {
        id: 'legacy-item',
        balance: 42.5
      };

      expect(typeof item.balance).toBe('number');
      expect(item.balance).toBeGreaterThan(0);
    });

    it('should be deprecated in favor of PortfolioAsset', () => {
      // This test documents the deprecation
      // PortfolioAsset is the preferred type with richer data
      const legacyItem: PortfolioItem = {
        id: 'old-1',
        balance: 100
      };

      expect(legacyItem).toBeDefined();
      // In practice, use PortfolioAsset instead
    });
  });
});
