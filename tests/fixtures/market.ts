import { Price, MarketData } from '../../src/index';

/**
 * Test fixtures for Price and MarketData types.
 * Provides reusable sample market data for testing.
 */

export const ethPrice: Price = {
  value: 2000,
  currency: 'USD',
  timestamp: new Date('2025-10-11T12:00:00Z'),
  source: 'coingecko',
  change24h: 50
};

export const btcPrice: Price = {
  value: 40000,
  currency: 'USD',
  timestamp: new Date('2025-10-11T12:00:00Z'),
  source: 'coingecko',
  change24h: -1000
};

export const usdcPrice: Price = {
  value: 1.0,
  currency: 'USD',
  timestamp: new Date('2025-10-11T12:00:00Z'),
  source: 'coingecko',
  change24h: 0.001
};

export const solPrice: Price = {
  value: 50,
  currency: 'USD',
  timestamp: new Date('2025-10-11T12:00:00Z'),
  source: 'coingecko',
  change24h: 2.5
};

// Price without source
export const priceNoSource: Price = {
  value: 1500,
  currency: 'EUR',
  timestamp: new Date('2025-10-11T12:00:00Z')
};

// Price with negative change
export const priceNegativeChange: Price = {
  value: 35000,
  currency: 'USD',
  timestamp: new Date('2025-10-11T12:00:00Z'),
  source: 'coinbase',
  change24h: -5000
};

export const ethMarketData: MarketData = {
  assetId: 'ethereum-eth',
  currentPrice: ethPrice,
  marketCap: 240000000000,
  volume24h: 15000000000,
  circulatingSupply: 120000000,
  totalSupply: 120000000,
  priceChange24h: 50,
  priceChangePercentage24h: 2.56,
  high24h: 2100,
  low24h: 1950,
  ath: 4878,
  athDate: new Date('2021-11-10T14:24:11Z'),
  atl: 0.43,
  atlDate: new Date('2015-10-20T00:00:00Z'),
  rank: 2,
  lastUpdated: new Date('2025-10-11T12:00:00Z')
};

export const btcMarketData: MarketData = {
  assetId: 'bitcoin-btc',
  currentPrice: btcPrice,
  marketCap: 780000000000,
  volume24h: 35000000000,
  circulatingSupply: 19500000,
  totalSupply: 19500000,
  maxSupply: 21000000,
  priceChange24h: -1000,
  priceChangePercentage24h: -2.44,
  high24h: 42000,
  low24h: 39500,
  ath: 69045,
  athDate: new Date('2021-11-10T14:24:11Z'),
  atl: 67.81,
  atlDate: new Date('2013-07-06T00:00:00Z'),
  rank: 1,
  lastUpdated: new Date('2025-10-11T12:00:00Z')
};

export const usdcMarketData: MarketData = {
  assetId: 'ethereum-usdc',
  currentPrice: usdcPrice,
  marketCap: 28000000000,
  volume24h: 5000000000,
  circulatingSupply: 28000000000,
  totalSupply: 28000000000,
  priceChange24h: 0.001,
  priceChangePercentage24h: 0.1,
  high24h: 1.01,
  low24h: 0.99,
  rank: 6,
  lastUpdated: new Date('2025-10-11T12:00:00Z')
};

// Minimal market data (only required fields)
export const minimalMarketData: MarketData = {
  assetId: 'test-token',
  currentPrice: {
    value: 100,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  lastUpdated: new Date('2025-10-11T12:00:00Z')
};

// All market data array for bulk testing
export const allMarketData: MarketData[] = [
  ethMarketData,
  btcMarketData,
  usdcMarketData,
  minimalMarketData
];

export const allPrices: Price[] = [
  ethPrice,
  btcPrice,
  usdcPrice,
  solPrice,
  priceNoSource,
  priceNegativeChange
];
