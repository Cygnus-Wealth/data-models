import { Balance } from '../../src/index';
import { ethAsset, usdcAsset, btcAsset, solAsset } from './assets';

/**
 * Test fixtures for Balance types.
 * Provides reusable sample balances with various configurations.
 */

export const ethBalance: Balance = {
  assetId: 'ethereum-eth',
  asset: ethAsset,
  amount: '10.5',
  value: {
    value: 21000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z'),
    source: 'coingecko'
  },
  cost_basis: 18000,
  unrealized_pnl: 3000,
  realized_pnl: 0
};

export const usdcBalance: Balance = {
  assetId: 'ethereum-usdc',
  asset: usdcAsset,
  amount: '5000.000000',
  value: {
    value: 5000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z'),
    source: 'coingecko'
  },
  cost_basis: 5000,
  unrealized_pnl: 0,
  realized_pnl: 0
};

export const btcBalance: Balance = {
  assetId: 'bitcoin-btc',
  asset: btcAsset,
  amount: '1.25',
  value: {
    value: 50000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z'),
    source: 'coingecko'
  },
  cost_basis: 45000,
  unrealized_pnl: 5000,
  realized_pnl: 1000
};

export const solBalance: Balance = {
  assetId: 'solana-sol',
  asset: solAsset,
  amount: '250.5',
  value: {
    value: 12525,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z'),
    source: 'coingecko'
  },
  cost_basis: 10000,
  unrealized_pnl: 2525,
  realized_pnl: 0
};

// Zero balance
export const zeroBalance: Balance = {
  assetId: 'ethereum-eth',
  asset: ethAsset,
  amount: '0',
  value: {
    value: 0,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  cost_basis: 0,
  unrealized_pnl: 0,
  realized_pnl: 0
};

// Large balance with high precision (>2^53)
export const largeBalance: Balance = {
  assetId: 'ethereum-usdc',
  asset: usdcAsset,
  amount: '9999999999999999.000000', // Near JavaScript MAX_SAFE_INTEGER
  value: {
    value: Number.MAX_SAFE_INTEGER,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  }
};

// Balance without price data
export const noPriceBalance: Balance = {
  assetId: 'ethereum-eth',
  asset: ethAsset,
  amount: '5.0'
};

// Balance with only amount (minimal)
export const minimalBalance: Balance = {
  assetId: 'ethereum-eth',
  asset: ethAsset,
  amount: '1.0'
};

// Balance with raw string precision for wei
export const weiBalance: Balance = {
  assetId: 'ethereum-eth',
  asset: ethAsset,
  amount: '1500000000000000000', // 1.5 ETH in wei
  value: {
    value: 3000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  }
};

// All balances array for bulk testing
export const allBalances: Balance[] = [
  ethBalance,
  usdcBalance,
  btcBalance,
  solBalance,
  zeroBalance,
  largeBalance,
  noPriceBalance,
  minimalBalance,
  weiBalance
];
