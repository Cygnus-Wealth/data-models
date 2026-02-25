/**
 * Classification of blockchain protocol families.
 *
 * Groups blockchain networks by their underlying protocol family rather than
 * individual chain identity. Used for routing (which integration handles which
 * addresses), discovery (which standard detects which providers), and display
 * (chain family badges in UI).
 *
 * `ChainFamily` is distinct from `Chain` — a chain family contains multiple
 * chains (e.g., EVM family includes Ethereum, Polygon, Arbitrum, etc.).
 *
 * This is a closed enum. Adding new families requires Enterprise Architecture
 * approval, a new integration bounded context, and correlation registry entries.
 *
 * @example
 * ```typescript
 * import { ChainFamily } from '@cygnus-wealth/data-models';
 *
 * // Route address to correct integration
 * function getIntegration(family: ChainFamily) {
 *   switch (family) {
 *     case ChainFamily.EVM:
 *       return evmIntegration;
 *     case ChainFamily.SOLANA:
 *       return solIntegration;
 *     default:
 *       throw new Error(`No integration for ${family}`);
 *   }
 * }
 * ```
 *
 * @since 1.5.0
 * @stability extended
 *
 * @see {@link Chain} for specific chain identification within a family
 */
export enum ChainFamily {
  /** EVM-compatible chains (Ethereum, Polygon, Arbitrum, Optimism, Avalanche, BSC, Base) */
  EVM = 'evm',

  /** Solana mainnet */
  SOLANA = 'solana',

  /** SUI mainnet (Move-based L1) */
  SUI = 'sui',

  /** Bitcoin mainnet (UTXO model) */
  BITCOIN = 'bitcoin',

  /** Cosmos ecosystem chains (Cosmos Hub, Osmosis, etc.) */
  COSMOS = 'cosmos',

  /** Aptos mainnet (Move-based L1) */
  APTOS = 'aptos',
}
