import { AccountId } from '../types/AccountId';
import { Chain } from '../enums/Chain';
import { ChainFamily } from '../enums/ChainFamily';

/**
 * A single account within a wallet connection.
 *
 * Represents an address discovered via a wallet provider (EIP-1193) or
 * manually added to a connection's account list. Tracks discovery time,
 * staleness, and active status relative to the wallet provider.
 *
 * @example
 * ```typescript
 * import { ConnectedAccount } from '@cygnus-wealth/data-models';
 *
 * const account: ConnectedAccount = {
 *   accountId: 'metamask:a1b2c3d4:0xAbCdEf1234567890',
 *   address: '0xAbCdEf1234567890',
 *   accountLabel: 'Main DeFi',
 *   chainScope: [Chain.ETHEREUM, Chain.POLYGON],
 *   source: 'provider',
 *   discoveredAt: '2026-01-15T10:30:00Z',
 *   isStale: false,
 *   isActive: true
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link WalletConnection} for the parent connection
 * @see {@link AccountId} for identifier format
 */
export interface ConnectedAccount {
  /** Unique account identifier: `{walletConnectionId}:{checksummedAddress}` */
  accountId: AccountId;

  /** Checksummed EVM address */
  address: string;

  /** User-assigned label (default: truncated address) */
  accountLabel: string;

  /** Chain family this account belongs to */
  chainFamily: ChainFamily;

  /** Chains to track this account on (default: all supported by the connection) */
  chainScope: Chain[];

  /** How this account was added: 'provider' = discovered via EIP-1193; 'manual' = user typed the address */
  source: 'provider' | 'manual';

  /** ISO 8601 timestamp when first seen */
  discoveredAt: string;

  /** True if the provider no longer includes this account in eth_requestAccounts responses */
  isStale: boolean;

  /** True if this is the currently selected account in the wallet provider */
  isActive: boolean;
}
