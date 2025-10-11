import { Account, AccountType, IntegrationSource } from '../../src/index';
import { ethBalance, usdcBalance, btcBalance } from './balances';
import { uniswapLPPosition } from './positions';

/**
 * Test fixtures for Account types.
 * Provides reusable sample data for various account types.
 */

export const metamaskWallet: Account = {
  id: 'metamask-wallet-1',
  name: 'MetaMask Main Wallet',
  type: AccountType.WALLET,
  source: IntegrationSource.METAMASK,
  sourceAccountId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  balances: [ethBalance, usdcBalance],
  liquidityPositions: [uniswapLPPosition],
  totalValue: {
    value: 25250,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  lastSynced: new Date('2025-10-11T12:00:00Z')
};

export const coinbaseAccount: Account = {
  id: 'coinbase-spot-1',
  name: 'Coinbase Spot Account',
  type: AccountType.CEX,
  source: IntegrationSource.COINBASE,
  sourceAccountId: 'cb-spot-123456',
  balances: [btcBalance],
  totalValue: {
    value: 50000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  lastSynced: new Date('2025-10-11T12:00:00Z')
};

export const krakenAccount: Account = {
  id: 'kraken-spot-1',
  name: 'Kraken Main',
  type: AccountType.CEX,
  source: IntegrationSource.KRAKEN,
  sourceAccountId: 'kraken-123',
  balances: [],
  totalValue: {
    value: 0,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  lastSynced: new Date('2025-10-11T12:00:00Z')
};

export const robinhoodBrokerage: Account = {
  id: 'robinhood-brokerage-1',
  name: 'Robinhood Brokerage',
  type: AccountType.BROKERAGE,
  source: IntegrationSource.ROBINHOOD,
  sourceAccountId: 'rh-brokerage-789',
  balances: [],
  totalValue: {
    value: 15000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  lastSynced: new Date('2025-10-11T12:00:00Z')
};

export const phantomWallet: Account = {
  id: 'phantom-wallet-1',
  name: 'Phantom Wallet',
  type: AccountType.WALLET,
  source: IntegrationSource.PHANTOM,
  sourceAccountId: 'Phantom123abc',
  balances: [],
  totalValue: {
    value: 5000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  lastSynced: new Date('2025-10-11T12:00:00Z')
};

export const manualAccount: Account = {
  id: 'manual-wallet-1',
  name: 'Manual Wallet Entry',
  type: AccountType.MANUAL,
  source: IntegrationSource.MANUAL,
  balances: [],
  totalValue: {
    value: 1000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  lastSynced: new Date('2025-10-11T12:00:00Z')
};

// Account with no balances
export const emptyAccount: Account = {
  id: 'empty-account-1',
  name: 'Empty Account',
  type: AccountType.WALLET,
  source: IntegrationSource.METAMASK,
  balances: [],
  lastSynced: new Date('2025-10-11T12:00:00Z')
};

// All accounts array for bulk testing
export const allAccounts: Account[] = [
  metamaskWallet,
  coinbaseAccount,
  krakenAccount,
  robinhoodBrokerage,
  phantomWallet,
  manualAccount,
  emptyAccount
];
