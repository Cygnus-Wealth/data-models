import { AccountId } from '../types/AccountId';
import { WalletConnectionId } from '../types/WalletConnectionId';
import { Asset } from './Asset';
import { Price } from './Price';

/**
 * Portfolio slice for a single account.
 *
 * Represents the holdings attributed to one specific account, whether
 * it's a connected wallet account or a watch address.
 *
 * @example
 * ```typescript
 * import { AccountPortfolio } from '@cygnus-wealth/data-models';
 *
 * const accountPortfolio: AccountPortfolio = {
 *   accountId: 'metamask:a1b2c3d4:0xAbCdEf1234567890',
 *   accountLabel: 'Main DeFi',
 *   walletConnectionId: 'metamask:a1b2c3d4',
 *   providerName: 'MetaMask',
 *   assets: [],
 *   totalValue: { value: 25000, currency: 'USD', timestamp: new Date() },
 *   lastUpdated: '2026-02-19T08:00:00Z'
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link WalletPortfolio} for per-wallet rollup
 * @see {@link Portfolio} for aggregate portfolio
 */
export interface AccountPortfolio {
  /** Account this portfolio slice belongs to */
  accountId: AccountId;

  /** User-assigned account label */
  accountLabel: string;

  /** Wallet connection this account belongs to, or 'watch' for watch addresses */
  walletConnectionId: WalletConnectionId | 'watch';

  /** Human-readable provider name */
  providerName: string;

  /** Assets held in this account */
  assets: Asset[];

  /** Total value of this account's holdings */
  totalValue: Price;

  /** ISO 8601 timestamp of last data update */
  lastUpdated: string;
}
