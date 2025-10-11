import { Asset } from './Asset';
import { Price } from './Price';
import { Metadata } from './Metadata';

/**
 * Asset quantity with market value and profit/loss tracking.
 *
 * Represents the amount of an asset held in an account along with valuation
 * and performance metrics. Uses string for amount to preserve precision beyond
 * JavaScript number limits (e.g., for high-decimal tokens or very large quantities).
 *
 * **Design Pattern:** Composition of Asset reference, quantity, current value,
 * and historical cost basis for P&L calculations. The amount field stores raw
 * quantity respecting the asset's decimal places.
 *
 * @example
 * ```typescript
 * import { Balance, Asset, AssetType } from '@cygnus-wealth/data-models';
 *
 * // Cryptocurrency balance with P&L
 * const ethBalance: Balance = {
 *   assetId: 'ethereum-eth',
 *   asset: {
 *     id: 'ethereum-eth',
 *     symbol: 'ETH',
 *     name: 'Ethereum',
 *     type: AssetType.CRYPTOCURRENCY,
 *     decimals: 18
 *   },
 *   amount: '2.5',  // 2.5 ETH
 *   value: {
 *     value: 5000,
 *     currency: 'USD',
 *     timestamp: new Date()
 *   },
 *   cost_basis: 4000,  // Purchased for $4000
 *   unrealized_pnl: 1000,  // Current profit
 *   realized_pnl: 0
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link Asset} for asset definition
 * @see {@link Price} for valuation structure
 * @see {@link PortfolioAsset} for composed portfolio view
 */
export interface Balance {
  /** Reference to the Asset.id being held */
  assetId: string;

  /** Complete asset details for display and calculations */
  asset: Asset;

  /** Quantity held as string to preserve precision (respects asset.decimals) */
  amount: string;

  /** Current market value of the balance (amount * current price) */
  value?: Price;

  /** Total cost paid to acquire this balance (in value.currency) */
  cost_basis?: number;

  /** Profit/loss from realized sales (in value.currency) */
  realized_pnl?: number;

  /** Profit/loss from current market value vs cost basis (value.value - cost_basis) */
  unrealized_pnl?: number;

  /** Source-specific additional data and custom fields */
  metadata?: Metadata;
}
