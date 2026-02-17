/**
 * Priority role of an RPC endpoint within a chain's fallback chain.
 *
 * Defines the priority ordering for endpoint selection during RPC calls.
 * The fallback chain progresses through roles in order: primary → secondary
 * → tertiary → emergency when higher-priority endpoints fail or are unavailable.
 *
 * @example
 * ```typescript
 * import { RpcProviderRole } from '@cygnus-wealth/data-models';
 *
 * const endpoint = {
 *   role: RpcProviderRole.PRIMARY,
 *   url: 'https://eth-mainnet.alchemyapi.io/v2/...'
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link RpcEndpointConfig} for endpoint configuration
 * @see {@link ChainRpcConfig} for chain-level fallback ordering
 */
export enum RpcProviderRole {
  /** First-choice endpoint — used under normal operating conditions */
  PRIMARY = 'PRIMARY',

  /** Second-choice endpoint — activated when primary is degraded or unavailable */
  SECONDARY = 'SECONDARY',

  /** Third-choice endpoint — activated when primary and secondary are unavailable */
  TERTIARY = 'TERTIARY',

  /** Last-resort endpoint — used only when all other roles are exhausted */
  EMERGENCY = 'EMERGENCY'
}
