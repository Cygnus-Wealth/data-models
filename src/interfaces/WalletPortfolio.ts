import { WalletConnectionId } from '../types/WalletConnectionId';
import { AccountPortfolio } from './AccountPortfolio';
import { Price } from './Price';

/**
 * Portfolio slice for all accounts in a wallet connection.
 *
 * Aggregates holdings across all accounts within a single wallet
 * connection session.
 *
 * @example
 * ```typescript
 * import { WalletPortfolio } from '@cygnus-wealth/data-models';
 *
 * const walletPortfolio: WalletPortfolio = {
 *   walletConnectionId: 'metamask:a1b2c3d4',
 *   connectionLabel: 'My MetaMask',
 *   providerName: 'MetaMask',
 *   accounts: [],
 *   totalValue: { value: 50000, currency: 'USD', timestamp: new Date() }
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link AccountPortfolio} for per-account breakdown
 * @see {@link Portfolio} for aggregate portfolio
 */
export interface WalletPortfolio {
  /** Wallet connection this portfolio belongs to */
  walletConnectionId: WalletConnectionId;

  /** User-assigned connection label */
  connectionLabel: string;

  /** Human-readable provider name */
  providerName: string;

  /** Per-account portfolio breakdowns within this wallet */
  accounts: AccountPortfolio[];

  /** Total value across all accounts in this wallet connection */
  totalValue: Price;
}
