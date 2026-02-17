/**
 * How a DeFi position was discovered during portfolio scanning.
 *
 * Distinguishes between positions found by scanning wallet token balances
 * (receipt tokens like aTokens, cTokens, LP tokens) versus positions found
 * by querying protocol smart contract state directly.
 *
 * This distinction matters for reconciliation: wallet-scanned positions are
 * inferred from token holdings, while contract-queried positions come from
 * authoritative on-chain state.
 *
 * @example
 * ```typescript
 * import { DeFiDiscoverySource } from '@cygnus-wealth/data-models';
 *
 * // Found aUSDC in wallet — infer Aave supply position
 * const walletDiscovered = DeFiDiscoverySource.WALLET_TOKEN_SCAN;
 *
 * // Queried Aave LendingPool.getUserAccountData() directly
 * const contractDiscovered = DeFiDiscoverySource.CONTRACT_QUERY;
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link DeFiPosition} for usage in position interfaces
 */
export enum DeFiDiscoverySource {
  /** Position inferred from receipt/derivative tokens found in wallet balance scan */
  WALLET_TOKEN_SCAN = 'WALLET_TOKEN_SCAN',

  /** Position discovered by querying protocol smart contract state directly */
  CONTRACT_QUERY = 'CONTRACT_QUERY'
}
