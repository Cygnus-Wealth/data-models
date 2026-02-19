import { AccountId } from '../types/AccountId';

/**
 * User-defined grouping of accounts for organizational purposes.
 *
 * Allows users to create custom groups like "DeFi Accounts", "Long-term Holdings",
 * or "Family" that span across wallet connections and watch addresses.
 *
 * @example
 * ```typescript
 * import { AccountGroup } from '@cygnus-wealth/data-models';
 *
 * const group: AccountGroup = {
 *   groupId: 'group-defi-1',
 *   groupName: 'DeFi Accounts',
 *   accountIds: [
 *     'metamask:a1b2c3d4:0xAbC...123',
 *     'rabby:e5f6g7h8:0xDef...456'
 *   ],
 *   createdAt: '2026-02-10T09:00:00Z'
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link AccountId} for account identifier format
 */
export interface AccountGroup {
  /** Unique group identifier */
  groupId: string;

  /** User-assigned group name */
  groupName: string;

  /** References to accounts from any connection or watch addresses */
  accountIds: AccountId[];

  /** ISO 8601 timestamp when the group was created */
  createdAt: string;
}
