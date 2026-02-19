import { AccountId } from '../types/AccountId';
import { WalletProviderId } from '../types/WalletProviderId';
import { Chain } from '../enums/Chain';
import { Price } from './Price';

/**
 * Summary view of an account for cross-account analysis.
 *
 * Lightweight representation containing key metrics for each account,
 * suitable for dashboard summary views and account comparison.
 *
 * @example
 * ```typescript
 * import { AccountSummary } from '@cygnus-wealth/data-models';
 *
 * const summary: AccountSummary = {
 *   accountId: 'metamask:a1b2c3d4:0xAbCdEf1234567890',
 *   accountLabel: 'Main DeFi',
 *   connectionLabel: 'My MetaMask',
 *   providerId: 'metamask',
 *   totalValue: { value: 25000, currency: 'USD', timestamp: new Date() },
 *   assetCount: 12,
 *   chains: [Chain.ETHEREUM, Chain.POLYGON],
 *   lastUpdated: '2026-02-19T08:00:00Z'
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link AccountPortfolio} for full account portfolio details
 */
export interface AccountSummary {
  /** Account identifier */
  accountId: AccountId;

  /** User-assigned account label */
  accountLabel: string;

  /** Label of the parent wallet connection */
  connectionLabel: string;

  /** Wallet provider identifier, or 'watch' for watch addresses */
  providerId: WalletProviderId | 'watch';

  /** Total value of the account's holdings */
  totalValue: Price;

  /** Number of distinct assets held */
  assetCount: number;

  /** Chains this account has activity on */
  chains: Chain[];

  /** ISO 8601 timestamp of last data update */
  lastUpdated: string;
}
