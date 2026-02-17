/**
 * Classification of RPC provider infrastructure ownership.
 *
 * Categorizes RPC endpoints by their operational model, which affects
 * reliability expectations, rate limits, and cost considerations.
 *
 * @example
 * ```typescript
 * import { RpcProviderType } from '@cygnus-wealth/data-models';
 *
 * const endpoint = {
 *   type: RpcProviderType.MANAGED,
 *   provider: 'Alchemy',
 *   rateLimitRps: 100
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link RpcEndpointConfig} for endpoint configuration
 */
export enum RpcProviderType {
  /** Paid/managed provider (Alchemy, Infura, QuickNode) — highest reliability */
  MANAGED = 'MANAGED',

  /** Free public endpoint (chain-provided, Ankr public) — best-effort availability */
  PUBLIC = 'PUBLIC',

  /** Community-run node (POKT, Llama Nodes) — variable reliability */
  COMMUNITY = 'COMMUNITY'
}
