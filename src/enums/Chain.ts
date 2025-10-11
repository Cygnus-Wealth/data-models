/**
 * Blockchain network identifiers for multi-chain asset tracking.
 *
 * Provides standardized identifiers for all supported blockchain networks.
 * Enables consistent asset identification across EVM chains, alternative L1s,
 * and traditional finance systems.
 *
 * **Design Rationale:**
 * - Covers major EVM chains (Ethereum, Polygon, Arbitrum, Optimism, Avalanche, BSC, Base)
 * - Includes alternative L1s (Solana, SUI, Bitcoin)
 * - Extensible via OTHER for new chains without breaking changes
 * - Chain-agnostic operations use Chain type for abstraction
 *
 * **Integration Guidance:**
 * - Map chain IDs (1, 137, 42161) to these enum values in integration domains
 * - Use Chain.OTHER for unsupported chains, document actual chain in metadata
 * - Testnets should be distinguished in metadata, not separate enum values
 *
 * @example
 * ```typescript
 * function getChainFromId(chainId: number): Chain {
 *   const chainMap: Record<number, Chain> = {
 *     1: Chain.ETHEREUM,
 *     137: Chain.POLYGON,
 *     42161: Chain.ARBITRUM,
 *     10: Chain.OPTIMISM,
 *     43114: Chain.AVALANCHE,
 *     56: Chain.BSC,
 *     8453: Chain.BASE
 *   };
 *   return chainMap[chainId] || Chain.OTHER;
 * }
 * ```
 *
 * @since 0.0.1
 * @stability core
 *
 * @see {@link Asset} for usage in asset identification
 * @see {@link Transaction} for usage in transaction tracking
 */
export enum Chain {
  /** Ethereum mainnet (Chain ID: 1) - Primary EVM L1 */
  ETHEREUM = 'ETHEREUM',

  /** Polygon PoS (Chain ID: 137) - EVM sidechain for Ethereum */
  POLYGON = 'POLYGON',

  /** Arbitrum One (Chain ID: 42161) - Optimistic rollup L2 for Ethereum */
  ARBITRUM = 'ARBITRUM',

  /** Optimism (Chain ID: 10) - Optimistic rollup L2 for Ethereum */
  OPTIMISM = 'OPTIMISM',

  /** Avalanche C-Chain (Chain ID: 43114) - EVM-compatible L1 */
  AVALANCHE = 'AVALANCHE',

  /** Binance Smart Chain (Chain ID: 56) - EVM-compatible chain */
  BSC = 'BSC',

  /** Base (Chain ID: 8453) - Coinbase's Optimistic rollup L2 */
  BASE = 'BASE',

  /** Solana mainnet - High-performance L1, non-EVM */
  SOLANA = 'SOLANA',

  /** SUI mainnet - Move-based L1, non-EVM */
  SUI = 'SUI',

  /** Bitcoin mainnet - Original blockchain, UTXO model */
  BITCOIN = 'BITCOIN',

  /**
   * Unsupported or emerging chains.
   *
   * Use for chains not yet explicitly enumerated. Store actual chain
   * identifier in asset metadata for future classification.
   */
  OTHER = 'OTHER'
}
