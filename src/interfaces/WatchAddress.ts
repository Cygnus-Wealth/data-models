import { AccountId } from '../types/AccountId';
import { Chain } from '../enums/Chain';

/**
 * An address tracked independently of any wallet connection.
 *
 * Represents a read-only monitoring target that the user added manually
 * without connecting a wallet. Watch addresses have no associated provider,
 * no session lifecycle, and never receive `accountsChanged` events.
 *
 * @example
 * ```typescript
 * import { WatchAddress } from '@cygnus-wealth/data-models';
 *
 * const watched: WatchAddress = {
 *   accountId: 'watch:0xAbCdEf1234567890',
 *   address: '0xAbCdEf1234567890',
 *   addressLabel: 'Vitalik.eth',
 *   chainScope: [Chain.ETHEREUM],
 *   addedAt: '2026-02-01T12:00:00Z'
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link AccountId} for identifier format (watch:\{checksummedAddress\})
 */
export interface WatchAddress {
  /** Account identifier: `watch:{checksummedAddress}` */
  accountId: AccountId;

  /** Checksummed address being monitored */
  address: string;

  /** User-assigned label */
  addressLabel: string;

  /** Chains to track this address on */
  chainScope: Chain[];

  /** ISO 8601 timestamp when this watch address was added */
  addedAt: string;
}
