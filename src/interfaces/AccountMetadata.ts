import { AccountId } from '../types/AccountId';
import { WalletConnectionId } from '../types/WalletConnectionId';
import { WalletProviderId } from '../types/WalletProviderId';

/**
 * Full metadata for an account, including group membership and lifecycle status.
 *
 * Provides comprehensive account context for portfolio aggregation and UI
 * display, combining identity, labeling, and status information.
 *
 * @example
 * ```typescript
 * import { AccountMetadata } from '@cygnus-wealth/data-models';
 *
 * const metadata: AccountMetadata = {
 *   accountId: 'metamask:a1b2c3d4:0xAbCdEf1234567890',
 *   address: '0xAbCdEf1234567890',
 *   accountLabel: 'Main DeFi',
 *   connectionLabel: 'My MetaMask',
 *   providerId: 'metamask',
 *   walletConnectionId: 'metamask:a1b2c3d4',
 *   groups: ['group-defi-1'],
 *   discoveredAt: '2026-01-15T10:30:00Z',
 *   isStale: false,
 *   isActive: true
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link TrackedAddress} for the lightweight address tracking variant
 */
export interface AccountMetadata {
  /** Account identifier */
  accountId: AccountId;

  /** Checksummed address */
  address: string;

  /** User-assigned account label */
  accountLabel: string;

  /** Label of the parent wallet connection */
  connectionLabel: string;

  /** Wallet provider identifier, or 'watch' for watch addresses */
  providerId: WalletProviderId | 'watch';

  /** Wallet connection identifier, or 'watch' for watch addresses */
  walletConnectionId: WalletConnectionId | 'watch';

  /** Group IDs this account belongs to */
  groups: string[];

  /** ISO 8601 timestamp when first discovered */
  discoveredAt: string;

  /** Whether the provider no longer exposes this account */
  isStale: boolean;

  /** Whether this is the currently active account in the provider */
  isActive: boolean;
}
