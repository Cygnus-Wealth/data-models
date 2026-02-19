import { AccountId } from '../types/AccountId';
import { Balance } from './Balance';
import { Price } from './Price';

/**
 * A single account's holding of an asset within an asset distribution.
 *
 * Used as part of {@link AssetDistribution} to show how much of a specific
 * asset is held in each account and what percentage of the total it represents.
 *
 * @example
 * ```typescript
 * import { AccountAssetEntry } from '@cygnus-wealth/data-models';
 *
 * const entry: AccountAssetEntry = {
 *   accountId: 'metamask:a1b2:0xAbc',
 *   accountLabel: 'Main DeFi',
 *   connectionLabel: 'My MetaMask',
 *   quantity: { assetId: 'eth', asset: ethAsset, amount: '7.0' },
 *   value: { value: 14000, currency: 'USD', timestamp: new Date() },
 *   percentage: 66.67
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link AssetDistribution} for the parent distribution context
 */
export interface AccountAssetEntry {
  /** Account holding this portion of the asset */
  accountId: AccountId;

  /** User-assigned account label */
  accountLabel: string;

  /** Label of the parent wallet connection */
  connectionLabel: string;

  /** Quantity of the asset in this account */
  quantity: Balance;

  /** Value of this account's holding */
  value: Price;

  /** Percentage of total for this asset (e.g., 66.67 = 66.67%) */
  percentage: number;
}
