import { Asset } from './Asset';
import { Balance } from './Balance';
import { Price } from './Price';

/**
 * Asset with balance and market valuation for portfolio display.
 *
 * Composed view combining asset details, quantity held, current market value,
 * and portfolio allocation percentage. Primary interface for displaying assets
 * in portfolio dashboards and aggregation views.
 *
 * **Design Pattern:** Composition of Asset + Balance + Price + allocation metrics
 * to provide a complete, ready-to-render portfolio item. Simplifies UI logic by
 * pre-joining related data.
 *
 * @example
 * ```typescript
 * import { PortfolioAsset } from '@cygnus-wealth/data-models';
 *
 * // Complete portfolio asset ready for display
 * const portfolioAsset: PortfolioAsset = {
 *   id: 'portfolio-item-1',
 *   accountId: 'metamask-wallet-1',
 *   assetId: 'ethereum-usdc',
 *   asset: {
 *     id: 'ethereum-usdc',
 *     symbol: 'USDC',
 *     name: 'USD Coin',
 *     type: AssetType.CRYPTOCURRENCY,
 *     decimals: 6
 *   },
 *   balance: {
 *     assetId: 'ethereum-usdc',
 *     asset: {...},  // Same as above
 *     amount: '10000',
 *     value: {
 *       value: 10000,
 *       currency: 'USD',
 *       timestamp: new Date()
 *     }
 *   },
 *   value: {
 *     value: 10000,
 *     currency: 'USD',
 *     timestamp: new Date()
 *   },
 *   allocation: 0.25,  // 25% of total portfolio
 *   lastUpdated: new Date()
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link Asset} for asset details
 * @see {@link Balance} for quantity and P&L
 * @see {@link Price} for valuation
 * @see {@link Portfolio} for aggregated portfolio view
 */
export interface PortfolioAsset {
  /** Unique identifier for this portfolio item */
  id: string;

  /** Reference to the account holding this asset */
  accountId: string;

  /** Reference to the Asset.id */
  assetId: string;

  /** Complete asset definition including symbol, name, type, etc. */
  asset: Asset;

  /** Balance details including amount, cost basis, and P&L */
  balance: Balance;

  /** Current total market value of this position */
  value: Price;

  /** Percentage of total portfolio value (0.0-1.0, e.g., 0.25 = 25%) */
  allocation: number;

  /** Timestamp of last data update for this asset */
  lastUpdated: Date;
}
