import { describe, it, expect } from 'vitest';
import { Price, MarketData } from '../../src/index';
import { ethPrice, btcPrice, ethMarketData, btcMarketData, minimalMarketData } from '../fixtures';

/**
 * Unit tests for Market Data types (Price, MarketData).
 * Coverage target: 95%
 */

describe('Market Data Models', () => {
  describe('Price', () => {
    it('should create price with all fields', () => {
      expect(ethPrice.value).toBe(2000);
      expect(ethPrice.currency).toBe('USD');
      expect(ethPrice.timestamp).toBeInstanceOf(Date);
      expect(ethPrice.source).toBe('coingecko');
      expect(ethPrice.change24h).toBe(50);
    });

    it('should create price without optional fields', () => {
      const minimalPrice: Price = {
        value: 1500,
        currency: 'EUR',
        timestamp: new Date()
      };

      expect(minimalPrice.value).toBe(1500);
      expect(minimalPrice.source).toBeUndefined();
      expect(minimalPrice.change24h).toBeUndefined();
    });

    it('should handle timestamp correctly', () => {
      const now = new Date('2025-10-11T12:00:00Z');
      const price: Price = {
        value: 100,
        currency: 'USD',
        timestamp: now
      };

      expect(price.timestamp).toEqual(now);
      expect(price.timestamp.getTime()).toBe(now.getTime());
    });

    it('should support positive change24h', () => {
      expect(ethPrice.change24h).toBe(50);
      expect(ethPrice.change24h).toBeGreaterThan(0);
    });

    it('should support negative change24h', () => {
      expect(btcPrice.change24h).toBe(-1000);
      expect(btcPrice.change24h).toBeLessThan(0);
    });

    it('should support various currencies', () => {
      expect(ethPrice.currency).toBe('USD');

      const eurPrice: Price = {
        value: 1800,
        currency: 'EUR',
        timestamp: new Date()
      };

      expect(eurPrice.currency).toBe('EUR');
    });

    it('should support different price sources', () => {
      expect(ethPrice.source).toBe('coingecko');

      const coinbasePrice: Price = {
        value: 2005,
        currency: 'USD',
        timestamp: new Date(),
        source: 'coinbase'
      };

      expect(coinbasePrice.source).toBe('coinbase');
    });
  });

  describe('MarketData', () => {
    it('should create market data with price', () => {
      expect(ethMarketData.assetId).toBe('ethereum-eth');
      expect(ethMarketData.currentPrice).toEqual(ethPrice);
      expect(ethMarketData.lastUpdated).toBeInstanceOf(Date);
    });

    it('should include market cap', () => {
      expect(ethMarketData.marketCap).toBe(240000000000);
      expect(btcMarketData.marketCap).toBe(780000000000);
    });

    it('should calculate market cap from supply and price', () => {
      const expectedMarketCap = ethMarketData.circulatingSupply! * ethMarketData.currentPrice.value;
      expect(ethMarketData.marketCap).toBe(expectedMarketCap);
    });

    it('should include volume data', () => {
      expect(ethMarketData.volume24h).toBe(15000000000);
      expect(typeof ethMarketData.volume24h).toBe('number');
    });

    it('should track price changes', () => {
      expect(ethMarketData.priceChange24h).toBe(50);
      expect(ethMarketData.priceChangePercentage24h).toBe(2.56);
    });

    it('should include supply constraints', () => {
      expect(btcMarketData.circulatingSupply).toBe(19500000);
      expect(btcMarketData.totalSupply).toBe(19500000);
      expect(btcMarketData.maxSupply).toBe(21000000);

      // Verify: maxSupply >= totalSupply >= circulatingSupply
      expect(btcMarketData.maxSupply!).toBeGreaterThanOrEqual(btcMarketData.totalSupply!);
      expect(btcMarketData.totalSupply!).toBeGreaterThanOrEqual(btcMarketData.circulatingSupply!);
    });

    it('should handle assets without max supply', () => {
      expect(ethMarketData.maxSupply).toBeUndefined();
      expect(ethMarketData.circulatingSupply).toBe(ethMarketData.totalSupply);
    });

    it('should track high and low prices', () => {
      expect(ethMarketData.high24h).toBe(2100);
      expect(ethMarketData.low24h).toBe(1950);
      expect(ethMarketData.high24h!).toBeGreaterThan(ethMarketData.low24h!);
    });

    it('should track all-time high', () => {
      expect(ethMarketData.ath).toBe(4878);
      expect(ethMarketData.athDate).toBeInstanceOf(Date);
      expect(ethMarketData.ath!).toBeGreaterThan(ethMarketData.currentPrice.value);
    });

    it('should track all-time low', () => {
      expect(ethMarketData.atl).toBe(0.43);
      expect(ethMarketData.atlDate).toBeInstanceOf(Date);
      expect(ethMarketData.atl!).toBeLessThan(ethMarketData.currentPrice.value);
    });

    it('should include market rank', () => {
      expect(ethMarketData.rank).toBe(2);
      expect(btcMarketData.rank).toBe(1);
      expect(btcMarketData.rank!).toBeLessThan(ethMarketData.rank!);
    });

    it('should support minimal market data', () => {
      expect(minimalMarketData.assetId).toBe('test-token');
      expect(minimalMarketData.currentPrice).toBeDefined();
      expect(minimalMarketData.lastUpdated).toBeInstanceOf(Date);
      expect(minimalMarketData.marketCap).toBeUndefined();
    });

    it('should handle stablecoins with minimal volatility', () => {
      const stablecoinData: MarketData = {
        assetId: 'usdc',
        currentPrice: {
          value: 1.0,
          currency: 'USD',
          timestamp: new Date(),
          change24h: 0.001
        },
        priceChangePercentage24h: 0.1,
        lastUpdated: new Date()
      };

      expect(Math.abs(stablecoinData.priceChangePercentage24h!)).toBeLessThan(1);
    });
  });
});
