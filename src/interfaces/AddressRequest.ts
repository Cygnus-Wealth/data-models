import { AccountId } from '../types/AccountId';
import { Chain } from '../enums/Chain';
import { ChainFamily } from '../enums/ChainFamily';

/**
 * Request to query data for a specific account address.
 *
 * Used by integration contracts to request data with account attribution.
 * Carries the AccountId so results can be attributed back to the originating
 * account, and includes chain scope for per-account chain filtering.
 *
 * @example
 * ```typescript
 * import { AddressRequest, Chain } from '@cygnus-wealth/data-models';
 *
 * const request: AddressRequest = {
 *   accountId: 'metamask:a1b2c3d4:0xAbCdEf1234567890',
 *   address: '0xAbCdEf1234567890',
 *   chainScope: [Chain.ETHEREUM, Chain.POLYGON, Chain.ARBITRUM]
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link AccountBalanceList} for the response format
 */
export interface AddressRequest {
  /** Account identifier for result attribution */
  accountId: AccountId;

  /** Checksummed address to query */
  address: string;

  /** Chain family for routing to the correct integration */
  chainFamily: ChainFamily;

  /** Chains to query for this address */
  chainScope: Chain[];
}
