import { AccountId } from '../types/AccountId';
import { Chain } from '../enums/Chain';
import { Balance } from './Balance';

/**
 * A single account's balance result for a specific chain.
 *
 * Contains the native balance and token balances for one account
 * on one chain, with the AccountId for attribution.
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link AccountBalanceList} for the container type
 */
export interface AccountBalance {
  /** Account this balance belongs to */
  accountId: AccountId;

  /** Checksummed address */
  address: string;

  /** Chain this balance was fetched from */
  chainId: Chain;

  /** Native token balance (e.g., ETH on Ethereum) */
  nativeBalance: Balance;

  /** ERC-20 and other token balances */
  tokenBalances: Balance[];
}

/**
 * Error encountered while fetching data for a specific account.
 *
 * Supports partial failure: some accounts may succeed while others fail.
 *
 * @since 1.3.0
 * @stability extended
 */
export interface AccountError {
  /** Account that encountered the error */
  accountId: AccountId;

  /** Chain where the error occurred */
  chainId: Chain;

  /** Error message */
  message: string;

  /** Error code for programmatic handling */
  code?: string;
}

/**
 * Account-attributed balance results with support for partial failure.
 *
 * Returned by integration contracts when fetching balances for multiple
 * accounts. Each balance carries its AccountId for attribution, and
 * per-account errors are reported separately.
 *
 * @example
 * ```typescript
 * import { AccountBalanceList } from '@cygnus-wealth/data-models';
 *
 * const result: AccountBalanceList = {
 *   balances: [
 *     {
 *       accountId: 'metamask:a1b2:0xAbc',
 *       address: '0xAbc',
 *       chainId: Chain.ETHEREUM,
 *       nativeBalance: ethBalance,
 *       tokenBalances: [usdcBalance, daiBalance]
 *     }
 *   ],
 *   errors: [],
 *   timestamp: '2026-02-19T08:00:00Z'
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link AddressRequest} for the request format
 * @see {@link AccountBalance} for individual balance results
 * @see {@link AccountError} for per-account errors
 */
export interface AccountBalanceList {
  /** Successful balance results */
  balances: AccountBalance[];

  /** Per-account errors (partial failure) */
  errors: AccountError[];

  /** ISO 8601 timestamp of the fetch */
  timestamp: string;
}
