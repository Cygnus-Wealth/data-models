/**
 * Standardized transaction type classification.
 *
 * Unified categorization for all financial operations across CEX, DEX,
 * blockchain transfers, and DeFi protocols. Enables consistent transaction
 * history and analytics across all integration sources.
 *
 * @example
 * ```typescript
 * import { TransactionType } from '@cygnus-wealth/data-models';
 *
 * // Classify transaction based on operation
 * function getTransactionIcon(type: TransactionType): string {
 *   switch(type) {
 *     case TransactionType.BUY:
 *       return '📈';
 *     case TransactionType.SELL:
 *       return '📉';
 *     case TransactionType.STAKE:
 *       return '🔒';
 *     case TransactionType.SWAP:
 *       return '🔄';
 *     default:
 *       return '📄';
 *   }
 * }
 * ```
 *
 * @since 0.0.1
 * @stability standard
 */
export enum TransactionType {
  /** Purchase of an asset with fiat or another asset */
  BUY = 'BUY',

  /** Sale of an asset for fiat or another asset */
  SELL = 'SELL',

  /** Incoming transfer of assets to account */
  TRANSFER_IN = 'TRANSFER_IN',

  /** Outgoing transfer of assets from account */
  TRANSFER_OUT = 'TRANSFER_OUT',

  /** Exchange of one asset for another via DEX or CEX */
  SWAP = 'SWAP',

  /** Locking assets for staking rewards */
  STAKE = 'STAKE',

  /** Unlocking previously staked assets */
  UNSTAKE = 'UNSTAKE',

  /** Claiming earned staking or liquidity rewards */
  CLAIM_REWARD = 'CLAIM_REWARD',

  /** Adding assets to a liquidity pool */
  PROVIDE_LIQUIDITY = 'PROVIDE_LIQUIDITY',

  /** Removing assets from a liquidity pool */
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',

  /** Borrowing assets from a lending protocol */
  BORROW = 'BORROW',

  /** Repaying borrowed assets to a lending protocol */
  REPAY = 'REPAY',

  /** Forced liquidation of collateralized position */
  LIQUIDATION = 'LIQUIDATION',

  /** Creation of new tokens (NFT minting, token minting) */
  MINT = 'MINT',

  /** Destruction of tokens */
  BURN = 'BURN',

  /** Transaction fee payment */
  FEE = 'FEE',

  /** Dividend payment received */
  DIVIDEND = 'DIVIDEND',

  /** Interest payment received or paid */
  INTEREST = 'INTEREST',

  /** Other or unclassified transaction type */
  OTHER = 'OTHER'
}
