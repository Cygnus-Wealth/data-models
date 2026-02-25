import { AccountId } from '../types/AccountId';
import { WalletConnectionId } from '../types/WalletConnectionId';
import { WalletProviderId } from '../types/WalletProviderId';
import { Chain } from '../enums/Chain';
import { ChainFamily } from '../enums/ChainFamily';

/**
 * An address being tracked for portfolio purposes with full account context.
 *
 * Used by the WalletIntegrationContract to communicate tracked addresses
 * to PortfolioAggregation with all necessary attribution metadata.
 *
 * @example
 * ```typescript
 * import { TrackedAddress } from '@cygnus-wealth/data-models';
 *
 * const tracked: TrackedAddress = {
 *   accountId: 'metamask:a1b2c3d4:0xAbCdEf1234567890',
 *   address: '0xAbCdEf1234567890',
 *   walletConnectionId: 'metamask:a1b2c3d4',
 *   providerId: 'metamask',
 *   accountLabel: 'Main DeFi',
 *   connectionLabel: 'My MetaMask',
 *   chainScope: [Chain.ETHEREUM, Chain.POLYGON]
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link ConnectedAccount} for the source account data
 * @see {@link WatchAddress} for watch-only tracked addresses
 */
export interface TrackedAddress {
  /** Account identifier */
  accountId: AccountId;

  /** Checksummed address */
  address: string;

  /** Wallet connection this address belongs to, or 'watch' */
  walletConnectionId: WalletConnectionId | 'watch';

  /** Wallet provider identifier, or 'watch' */
  providerId: WalletProviderId | 'watch';

  /** User-assigned account label */
  accountLabel: string;

  /** Label of the parent wallet connection */
  connectionLabel: string;

  /** Chain family of this tracked address, used for integration routing */
  chainFamily: ChainFamily;

  /** Chains to query for this address */
  chainScope: Chain[];
}
