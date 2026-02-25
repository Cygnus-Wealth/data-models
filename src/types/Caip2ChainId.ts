/**
 * CAIP-2 chain identifier string type.
 *
 * Format: `{namespace}:{reference}` as defined by the Chain Agnostic
 * Improvement Proposal 2. Used for WalletConnect v2 interoperability.
 *
 * Common namespace prefixes map to ChainFamily values:
 * - `eip155` → ChainFamily.EVM (e.g., `eip155:1` for Ethereum mainnet)
 * - `solana` → ChainFamily.SOLANA (e.g., `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`)
 * - `bip122` → ChainFamily.BITCOIN
 * - `cosmos` → ChainFamily.COSMOS
 *
 * @example
 * ```typescript
 * import { Caip2ChainId } from '@cygnus-wealth/data-models';
 *
 * const ethereumMainnet: Caip2ChainId = 'eip155:1';
 * const polygon: Caip2ChainId = 'eip155:137';
 * const solanaMainnet: Caip2ChainId = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp';
 * ```
 *
 * @since 1.5.0
 * @stability extended
 *
 * @see {@link ChainFamily} for chain family classification
 */
export type Caip2ChainId = string;
