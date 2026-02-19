import { AccountPortfolio } from './AccountPortfolio';
import { Price } from './Price';

/**
 * Portfolio slice for a user-defined account group.
 *
 * Aggregates holdings across all accounts in a group, which may span
 * multiple wallet connections and watch addresses.
 *
 * @example
 * ```typescript
 * import { GroupPortfolio } from '@cygnus-wealth/data-models';
 *
 * const groupPortfolio: GroupPortfolio = {
 *   groupId: 'group-defi-1',
 *   groupName: 'DeFi Accounts',
 *   accounts: [],
 *   totalValue: { value: 75000, currency: 'USD', timestamp: new Date() },
 *   lastUpdated: '2026-02-19T08:00:00Z'
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link AccountGroup} for group definition
 * @see {@link AccountPortfolio} for per-account breakdown
 */
export interface GroupPortfolio {
  /** Group identifier */
  groupId: string;

  /** User-assigned group name */
  groupName: string;

  /** Per-account portfolio breakdowns within this group */
  accounts: AccountPortfolio[];

  /** Total value across all accounts in this group */
  totalValue: Price;

  /** ISO 8601 timestamp of last data update */
  lastUpdated: string;
}
