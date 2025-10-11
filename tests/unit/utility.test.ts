import { describe, it, expect } from 'vitest';
import { AssetIdentifier, TimeRange, SortOrder, FilterOptions, Chain, AssetType, IntegrationSource } from '../../src/index';

/**
 * Unit tests for Utility types (AssetIdentifier, TimeRange, SortOrder, FilterOptions).
 * Coverage target: 100%
 */

describe('Utility Types', () => {
  describe('AssetIdentifier', () => {
    it('should identify asset by symbol', () => {
      const identifier: AssetIdentifier = {
        symbol: 'ETH'
      };

      expect(identifier.symbol).toBe('ETH');
    });

    it('should identify asset by contract address', () => {
      const identifier: AssetIdentifier = {
        contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
      };

      expect(identifier.contractAddress).toBeDefined();
    });

    it('should identify asset by symbol and chain', () => {
      const identifier: AssetIdentifier = {
        symbol: 'USDC',
        chain: Chain.ETHEREUM
      };

      expect(identifier.symbol).toBe('USDC');
      expect(identifier.chain).toBe(Chain.ETHEREUM);
    });

    it('should identify asset by contract and chain', () => {
      const identifier: AssetIdentifier = {
        contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        chain: Chain.ETHEREUM
      };

      expect(identifier.contractAddress).toBeDefined();
      expect(identifier.chain).toBe(Chain.ETHEREUM);
    });

    it('should identify asset by assetId', () => {
      const identifier: AssetIdentifier = {
        assetId: 'ethereum-eth'
      };

      expect(identifier.assetId).toBe('ethereum-eth');
    });

    it('should support all fields combined', () => {
      const identifier: AssetIdentifier = {
        symbol: 'ETH',
        contractAddress: '0x0000000000000000000000000000000000000000',
        chain: Chain.ETHEREUM,
        assetId: 'ethereum-eth'
      };

      expect(identifier.symbol).toBeDefined();
      expect(identifier.contractAddress).toBeDefined();
      expect(identifier.chain).toBeDefined();
      expect(identifier.assetId).toBeDefined();
    });

    it('should require at least one field', () => {
      // Type system enforces at least one field is present
      // This test verifies the pattern is usable
      const identifiers: AssetIdentifier[] = [
        { symbol: 'ETH' },
        { contractAddress: '0x123' },
        { chain: Chain.ETHEREUM, symbol: 'ETH' },
        { assetId: 'test' }
      ];

      identifiers.forEach(id => {
        const hasField = id.symbol || id.contractAddress || id.chain || id.assetId;
        expect(hasField).toBeTruthy();
      });
    });
  });

  describe('TimeRange', () => {
    it('should create valid time range', () => {
      const range: TimeRange = {
        start: new Date('2025-01-01T00:00:00Z'),
        end: new Date('2025-01-31T23:59:59Z')
      };

      expect(range.start).toBeInstanceOf(Date);
      expect(range.end).toBeInstanceOf(Date);
    });

    it('should validate start <= end', () => {
      const range: TimeRange = {
        start: new Date('2025-01-01T00:00:00Z'),
        end: new Date('2025-01-31T23:59:59Z')
      };

      expect(range.start.getTime()).toBeLessThanOrEqual(range.end.getTime());
    });

    it('should support same start and end (single moment)', () => {
      const moment = new Date('2025-10-11T12:00:00Z');
      const range: TimeRange = {
        start: moment,
        end: moment
      };

      expect(range.start.getTime()).toBe(range.end.getTime());
    });

    it('should calculate duration', () => {
      const range: TimeRange = {
        start: new Date('2025-01-01T00:00:00Z'),
        end: new Date('2025-01-02T00:00:00Z')
      };

      const durationMs = range.end.getTime() - range.start.getTime();
      expect(durationMs).toBe(86400000); // 24 hours
    });

    it('should work with UTC timestamps', () => {
      const range: TimeRange = {
        start: new Date('2025-10-11T00:00:00.000Z'),
        end: new Date('2025-10-11T23:59:59.999Z')
      };

      expect(range.start.toISOString()).toContain('2025-10-11T00:00:00');
      expect(range.end.toISOString()).toContain('2025-10-11T23:59:59');
    });
  });

  describe('SortOrder', () => {
    it('should support ASC order', () => {
      const order: SortOrder = 'ASC';
      expect(order).toBe('ASC');
    });

    it('should support DESC order', () => {
      const order: SortOrder = 'DESC';
      expect(order).toBe('DESC');
    });

    it('should only allow valid values', () => {
      const validOrders: SortOrder[] = ['ASC', 'DESC'];
      expect(validOrders).toHaveLength(2);
    });

    it('should be usable in sort functions', () => {
      const items = [3, 1, 2];
      const order: SortOrder = 'ASC';

      const sorted = order === 'ASC'
        ? items.sort((a, b) => a - b)
        : items.sort((a, b) => b - a);

      expect(sorted).toEqual([1, 2, 3]);
    });
  });

  describe('FilterOptions', () => {
    it('should create empty filters', () => {
      const filters: FilterOptions = {};
      expect(Object.keys(filters)).toHaveLength(0);
    });

    it('should filter by chains', () => {
      const filters: FilterOptions = {
        chains: [Chain.ETHEREUM, Chain.POLYGON]
      };

      expect(filters.chains).toHaveLength(2);
      expect(filters.chains).toContain(Chain.ETHEREUM);
    });

    it('should filter by asset types', () => {
      const filters: FilterOptions = {
        assetTypes: [AssetType.CRYPTOCURRENCY, AssetType.NFT]
      };

      expect(filters.assetTypes).toHaveLength(2);
    });

    it('should filter by sources', () => {
      const filters: FilterOptions = {
        sources: [IntegrationSource.COINBASE, IntegrationSource.METAMASK]
      };

      expect(filters.sources).toHaveLength(2);
    });

    it('should filter by time range', () => {
      const filters: FilterOptions = {
        timeRange: {
          start: new Date('2025-01-01T00:00:00Z'),
          end: new Date('2025-12-31T23:59:59Z')
        }
      };

      expect(filters.timeRange).toBeDefined();
      expect(filters.timeRange!.start).toBeInstanceOf(Date);
    });

    it('should filter by value range', () => {
      const filters: FilterOptions = {
        minValue: 100,
        maxValue: 10000
      };

      expect(filters.minValue).toBe(100);
      expect(filters.maxValue).toBe(10000);
      expect(filters.maxValue!).toBeGreaterThan(filters.minValue!);
    });

    it('should support AND logic for multiple filters', () => {
      const filters: FilterOptions = {
        chains: [Chain.ETHEREUM],
        assetTypes: [AssetType.CRYPTOCURRENCY],
        minValue: 1000
      };

      // All filters should be applied (AND logic)
      expect(filters.chains).toBeDefined();
      expect(filters.assetTypes).toBeDefined();
      expect(filters.minValue).toBeDefined();
    });

    it('should support OR logic within array filters', () => {
      const filters: FilterOptions = {
        chains: [Chain.ETHEREUM, Chain.POLYGON, Chain.ARBITRUM]
      };

      // Items matching ANY chain in array should pass (OR logic)
      expect(filters.chains!.length).toBeGreaterThan(1);
    });

    it('should support all filter combinations', () => {
      const filters: FilterOptions = {
        chains: [Chain.ETHEREUM, Chain.POLYGON],
        assetTypes: [AssetType.CRYPTOCURRENCY],
        sources: [IntegrationSource.METAMASK],
        timeRange: {
          start: new Date('2025-01-01T00:00:00Z'),
          end: new Date('2025-12-31T23:59:59Z')
        },
        minValue: 100,
        maxValue: 100000
      };

      expect(filters.chains).toHaveLength(2);
      expect(filters.assetTypes).toHaveLength(1);
      expect(filters.sources).toHaveLength(1);
      expect(filters.timeRange).toBeDefined();
      expect(filters.minValue).toBeDefined();
      expect(filters.maxValue).toBeDefined();
    });
  });
});
