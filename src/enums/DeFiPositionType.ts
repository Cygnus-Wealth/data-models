/**
 * Classification of DeFi position types across protocols.
 *
 * Provides a unified taxonomy for all DeFi position categories, enabling
 * consistent categorization regardless of the specific protocol. Used as
 * a discriminator on the base {@link DeFiPosition} interface.
 *
 * @example
 * ```typescript
 * import { DeFiPositionType } from '@cygnus-wealth/data-models';
 *
 * const positionType = DeFiPositionType.VAULT;
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link DeFiPosition} for usage in the base position interface
 */
export enum DeFiPositionType {
  /** Yield vault deposit (Yearn, Beefy, Harvest, Sommelier) */
  VAULT = 'VAULT',

  /** Lending protocol supply position (Aave, Compound — depositing to earn interest) */
  LENDING_SUPPLY = 'LENDING_SUPPLY',

  /** Lending protocol borrow position (Aave, Compound — borrowing against collateral) */
  LENDING_BORROW = 'LENDING_BORROW',

  /** AMM liquidity pool position (Uniswap, Curve, Balancer) */
  LIQUIDITY_POOL = 'LIQUIDITY_POOL',

  /** Proof-of-stake or liquid staking position (Lido, Rocket Pool, native staking) */
  STAKING = 'STAKING',

  /** Yield farming / incentive mining position (LP rewards, token emissions) */
  FARMING = 'FARMING',

  /** Perpetual futures or leveraged position (Jupiter, GMX, dYdX) */
  PERP_POSITION = 'PERP_POSITION'
}
