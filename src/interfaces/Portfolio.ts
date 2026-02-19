import { AccountId } from '../types/AccountId';
import { WalletConnectionId } from '../types/WalletConnectionId';
import { Account } from './Account';
import { AccountPortfolio } from './AccountPortfolio';
import { WalletPortfolio } from './WalletPortfolio';
import { Price } from './Price';
import { PortfolioAsset } from './PortfolioAsset';
import { Metadata } from './Metadata';

/**
 * Complete user portfolio aggregating all accounts and holdings.
 *
 * Top-level aggregate combining all user accounts, positions, and assets into
 * a unified portfolio view. Calculates total value, tracks historical performance,
 * and maintains deduplicated asset lists across accounts.
 *
 * **Design Pattern:** Aggregate root pattern at portfolio level, composing multiple
 * Account aggregates. Supports both account-based view (accounts array) and
 * asset-based view (items array) for flexible UI rendering.
 *
 * **Aggregation Rules:**
 * - totalValue = sum of all Account.totalValue
 * - items = deduplicated PortfolioAssets across all accounts (same asset, different accounts)
 * - performance = calculated from totalValueHistory changes
 *
 * @example
 * ```typescript
 * import { Portfolio } from '@cygnus-wealth/data-models';
 *
 * // Complete portfolio with multiple accounts
 * const userPortfolio: Portfolio = {
 *   id: 'portfolio-user-123',
 *   userId: 'user-123',
 *   name: 'My Portfolio',
 *   accounts: [
 *     {
 *       id: 'metamask-wallet-1',
 *       name: 'Main Wallet',
 *       type: AccountType.WALLET,
 *       source: IntegrationSource.METAMASK,
 *       balances: [...],
 *       totalValue: { value: 50000, currency: 'USD', timestamp: new Date() }
 *     },
 *     {
 *       id: 'kraken-spot-1',
 *       name: 'Kraken Trading',
 *       type: AccountType.SPOT,
 *       source: IntegrationSource.KRAKEN,
 *       balances: [...],
 *       totalValue: { value: 30000, currency: 'USD', timestamp: new Date() }
 *     }
 *   ],
 *   items: [
 *     {
 *       id: 'portfolio-eth',
 *       assetId: 'ethereum-eth',
 *       asset: { symbol: 'ETH', name: 'Ethereum', ... },
 *       balance: { amount: '10.0', ... },
 *       value: { value: 20000, currency: 'USD', timestamp: new Date() },
 *       allocation: 0.25  // 25% of portfolio
 *     },
 *     // ... more assets
 *   ],
 *   totalValue: {
 *     value: 80000,  // Sum of all accounts
 *     currency: 'USD',
 *     timestamp: new Date()
 *   },
 *   totalValueHistory: [
 *     { timestamp: new Date('2025-09-11'), value: { value: 75000, currency: 'USD', ... } },
 *     { timestamp: new Date('2025-10-11'), value: { value: 80000, currency: 'USD', ... } }
 *   ],
 *   performance: {
 *     day: 2.5,      // +2.5% today
 *     week: 5.0,     // +5.0% this week
 *     month: 6.67,   // +6.67% this month
 *     year: 45.0,    // +45% this year
 *     all_time: 60.0 // +60% all-time
 *   },
 *   lastUpdated: new Date()
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link Account} for individual account aggregation
 * @see {@link PortfolioAsset} for asset composition
 * @see {@link Price} for valuation structure
 */
export interface Portfolio {
  /** Unique identifier for this portfolio */
  id: string;

  /** User ID owning this portfolio (for multi-user systems) */
  userId?: string;

  /** User-friendly portfolio name */
  name: string;

  /** Array of all accounts in this portfolio */
  accounts?: Account[];

  /** Deduplicated array of all assets across accounts */
  items?: PortfolioAsset[];

  /** Total value of entire portfolio (sum of all account values) */
  totalValue: Price;

  /** Historical value snapshots for performance tracking */
  totalValueHistory?: Array<{
    /** Timestamp of the snapshot */
    timestamp: Date;

    /** Portfolio value at that time */
    value: Price;
  }>;

  /** Performance metrics as percentage changes (positive = gain, negative = loss) */
  performance?: {
    /** 24-hour performance change percentage */
    day: number;

    /** 7-day performance change percentage */
    week: number;

    /** 30-day performance change percentage */
    month: number;

    /** 365-day performance change percentage */
    year: number;

    /** All-time performance change percentage */
    all_time: number;
  };

  /** Timestamp of last portfolio data update */
  lastUpdated: Date;

  /** Per-account portfolio breakdown for multi-wallet attribution */
  accountBreakdown?: Map<AccountId, AccountPortfolio>;

  /** Per-wallet portfolio breakdown for multi-wallet attribution */
  walletBreakdown?: Map<WalletConnectionId, WalletPortfolio>;

  /** Portfolio-specific metadata (theme, display preferences, etc.) */
  metadata?: Metadata;
}
