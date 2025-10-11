/**
 * Classification of account types.
 *
 * Categorizes account containers for display, grouping, and business logic.
 * Enables specialized UI components and processing based on account purpose
 * and characteristics.
 *
 * @example
 * ```typescript
 * import { AccountType } from '@cygnus-wealth/data-models';
 *
 * // Route account to specialized handler
 * function processAccount(type: AccountType) {
 *   switch(type) {
 *     case AccountType.SPOT:
 *       return processCEXSpotAccount();
 *     case AccountType.WALLET:
 *       return processWalletAccount();
 *     case AccountType.DEFI:
 *       return processDeFiPositions();
 *     case AccountType.RETIREMENT:
 *       return processTaxAdvantaged();
 *     default:
 *       return processGenericAccount();
 *   }
 * }
 * ```
 *
 * @since 0.0.1
 * @stability standard
 */
export enum AccountType {
  /** Spot trading account on centralized exchange */
  SPOT = 'SPOT',

  /** Margin trading account with leverage */
  MARGIN = 'MARGIN',

  /** Futures or derivatives trading account */
  FUTURES = 'FUTURES',

  /** Savings or interest-earning account */
  SAVINGS = 'SAVINGS',

  /** Staking account for proof-of-stake rewards */
  STAKING = 'STAKING',

  /** Self-custody blockchain wallet */
  WALLET = 'WALLET',

  /** DeFi protocol positions (lending, liquidity, etc.) */
  DEFI = 'DEFI',

  /** Traditional brokerage account */
  BROKERAGE = 'BROKERAGE',

  /** Tax-advantaged retirement account (IRA, 401k, etc.) */
  RETIREMENT = 'RETIREMENT',

  /** Other or unclassified account type */
  OTHER = 'OTHER'
}
