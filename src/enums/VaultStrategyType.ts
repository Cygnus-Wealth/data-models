/**
 * Strategy type for yield vault positions.
 *
 * Classifies the underlying strategy used by a yield vault to generate returns.
 * Different strategy types carry different risk profiles and return characteristics.
 *
 * @example
 * ```typescript
 * import { VaultStrategyType } from '@cygnus-wealth/data-models';
 *
 * const strategyType = VaultStrategyType.YIELD_AGGREGATOR;
 * ```
 *
 * @since 1.2.0
 * @stability extended
 *
 * @see {@link VaultPosition} for usage in vault positions
 */
export enum VaultStrategyType {
  /** Auto-compounding yield aggregator (e.g., Yearn, Beefy) */
  YIELD_AGGREGATOR = 'YIELD_AGGREGATOR',

  /** Single-asset lending vault (e.g., Yearn USDC vault lending on Aave) */
  LENDING = 'LENDING',

  /** Liquidity provision strategy (vault deposits into LP pools) */
  LIQUIDITY_PROVISION = 'LIQUIDITY_PROVISION',

  /** Delta-neutral or options-based structured product */
  STRUCTURED_PRODUCT = 'STRUCTURED_PRODUCT',

  /** Strategy type not covered by other categories */
  OTHER = 'OTHER'
}
