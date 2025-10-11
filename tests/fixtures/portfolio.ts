import { Portfolio, PortfolioAsset } from '../../src/index';
import { metamaskWallet, coinbaseAccount, robinhoodBrokerage } from './accounts';
import { ethAsset, usdcAsset, btcAsset } from './assets';
import { ethBalance, usdcBalance, btcBalance } from './balances';

/**
 * Test fixtures for Portfolio and PortfolioAsset types.
 * Provides reusable sample portfolio data for testing.
 */

export const ethPortfolioAsset: PortfolioAsset = {
  id: 'pa-eth-1',
  accountId: 'metamask-wallet-1',
  assetId: 'ethereum-eth',
  asset: ethAsset,
  balance: ethBalance,
  value: {
    value: 21000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  allocation: 28.0,
  lastUpdated: new Date('2025-10-11T12:00:00Z')
};

export const usdcPortfolioAsset: PortfolioAsset = {
  id: 'pa-usdc-1',
  accountId: 'metamask-wallet-1',
  assetId: 'ethereum-usdc',
  asset: usdcAsset,
  balance: usdcBalance,
  value: {
    value: 5000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  allocation: 6.67,
  lastUpdated: new Date('2025-10-11T12:00:00Z')
};

export const btcPortfolioAsset: PortfolioAsset = {
  id: 'pa-btc-1',
  accountId: 'coinbase-spot-1',
  assetId: 'bitcoin-btc',
  asset: btcAsset,
  balance: btcBalance,
  value: {
    value: 50000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  allocation: 66.67,
  lastUpdated: new Date('2025-10-11T12:00:00Z')
};

// Portfolio asset without price data
export const noPricePortfolioAsset: PortfolioAsset = {
  id: 'pa-noprice-1',
  accountId: 'wallet-1',
  assetId: 'test-token',
  asset: {
    id: 'test-token',
    symbol: 'TEST',
    name: 'Test Token',
    type: 'CRYPTOCURRENCY' as const
  },
  balance: {
    assetId: 'test-token',
    asset: {
      id: 'test-token',
      symbol: 'TEST',
      name: 'Test Token',
      type: 'CRYPTOCURRENCY' as const
    },
    amount: '1000.0'
  },
  allocation: 0,
  lastUpdated: new Date('2025-10-11T12:00:00Z')
};

export const fullPortfolio: Portfolio = {
  id: 'portfolio-1',
  userId: 'user-123',
  name: 'My Crypto Portfolio',
  accounts: [metamaskWallet, coinbaseAccount, robinhoodBrokerage],
  items: [ethPortfolioAsset, usdcPortfolioAsset, btcPortfolioAsset],
  totalValue: {
    value: 75000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z'),
    source: 'aggregated'
  },
  totalValueHistory: [
    {
      value: 70000,
      currency: 'USD',
      timestamp: new Date('2025-10-10T12:00:00Z')
    },
    {
      value: 68000,
      currency: 'USD',
      timestamp: new Date('2025-10-09T12:00:00Z')
    },
    {
      value: 72000,
      currency: 'USD',
      timestamp: new Date('2025-10-08T12:00:00Z')
    }
  ],
  performance: {
    day: 2.5,
    week: 5.0,
    month: 10.0,
    year: 50.0,
    all_time: 200.0
  },
  lastUpdated: new Date('2025-10-11T12:00:00Z')
};

export const minimalPortfolio: Portfolio = {
  id: 'portfolio-2',
  name: 'Minimal Portfolio',
  totalValue: {
    value: 0,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  lastUpdated: new Date('2025-10-11T12:00:00Z')
};

export const walletOnlyPortfolio: Portfolio = {
  id: 'portfolio-3',
  name: 'Wallet-only Portfolio',
  items: [ethPortfolioAsset],
  totalValue: {
    value: 21000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  lastUpdated: new Date('2025-10-11T12:00:00Z'),
  metadata: {
    tags: ['defi', 'long-term'],
    notes: 'Hold for 5+ years'
  }
};

export const multiAccountPortfolio: Portfolio = {
  id: 'portfolio-4',
  userId: 'user-456',
  name: 'Diversified Portfolio',
  accounts: [
    metamaskWallet,
    coinbaseAccount,
    robinhoodBrokerage
  ],
  totalValue: {
    value: 90250,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z'),
    source: 'aggregated'
  },
  performance: {
    day: 1.2,
    week: 3.5,
    month: 8.0,
    year: 35.0,
    all_time: 150.0
  },
  lastUpdated: new Date('2025-10-11T12:00:00Z')
};

// All portfolios array for bulk testing
export const allPortfolios: Portfolio[] = [
  fullPortfolio,
  minimalPortfolio,
  walletOnlyPortfolio,
  multiAccountPortfolio
];

export const allPortfolioAssets: PortfolioAsset[] = [
  ethPortfolioAsset,
  usdcPortfolioAsset,
  btcPortfolioAsset,
  noPricePortfolioAsset
];
