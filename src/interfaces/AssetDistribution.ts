import { Balance } from './Balance';
import { Price } from './Price';
import { AccountAssetEntry } from './AccountAssetEntry';

/**
 * Distribution of a specific asset across multiple accounts.
 *
 * Shows how holdings of a single asset (by symbol) are distributed
 * across the user's accounts, useful for concentration analysis.
 *
 * @example
 * ```typescript
 * import { AssetDistribution } from '@cygnus-wealth/data-models';
 *
 * const ethDistribution: AssetDistribution = {
 *   symbol: 'ETH',
 *   totalQuantity: { assetId: 'eth', asset: ethAsset, amount: '10.5' },
 *   totalValue: { value: 21000, currency: 'USD', timestamp: new Date() },
 *   distribution: [
 *     {
 *       accountId: 'metamask:a1b2:0xAbc',
 *       accountLabel: 'Main',
 *       connectionLabel: 'MetaMask',
 *       quantity: { assetId: 'eth', asset: ethAsset, amount: '7.0' },
 *       value: { value: 14000, currency: 'USD', timestamp: new Date() },
 *       percentage: 66.67
 *     }
 *   ]
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link AccountAssetEntry} for per-account breakdown
 */
export interface AssetDistribution {
  /** Asset trading symbol */
  symbol: string;

  /** Total quantity across all accounts */
  totalQuantity: Balance;

  /** Total value across all accounts */
  totalValue: Price;

  /** Per-account breakdown of this asset's distribution */
  distribution: AccountAssetEntry[];
}
