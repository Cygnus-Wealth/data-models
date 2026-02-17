/**
 * Well-known DeFi protocol identifiers for position attribution.
 *
 * Provides standardized identifiers for major DeFi protocols across chains.
 * Extensible via OTHER for protocols not yet explicitly enumerated.
 * Protocol-specific version info (e.g., "Aave V3") should be stored in
 * position metadata rather than the enum.
 *
 * @example
 * ```typescript
 * import { DeFiProtocol } from '@cygnus-wealth/data-models';
 *
 * const protocol = DeFiProtocol.AAVE;
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link DeFiPosition} for usage in position interfaces
 */
export enum DeFiProtocol {
  /** Beefy Finance — multi-chain yield optimizer / auto-compounder */
  BEEFY = 'BEEFY',

  /** Aave — decentralized lending and borrowing protocol */
  AAVE = 'AAVE',

  /** Uniswap — Ethereum-native AMM / DEX */
  UNISWAP = 'UNISWAP',

  /** Compound — algorithmic money market protocol */
  COMPOUND = 'COMPOUND',

  /** Lido — liquid staking for Ethereum and other PoS chains */
  LIDO = 'LIDO',

  /** Marinade Finance — liquid staking for Solana */
  MARINADE = 'MARINADE',

  /** Raydium — Solana AMM and liquidity provider */
  RAYDIUM = 'RAYDIUM',

  /** Jupiter — Solana DEX aggregator and perps platform */
  JUPITER = 'JUPITER',

  /** Orca — Solana concentrated liquidity DEX */
  ORCA = 'ORCA',

  /** Protocol not covered by other values; store name in metadata */
  OTHER = 'OTHER'
}
