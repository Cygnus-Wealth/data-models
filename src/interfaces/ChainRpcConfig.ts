import { RpcEndpointConfig } from './RpcEndpointConfig';

/**
 * RPC configuration for a single blockchain network.
 *
 * Groups all RPC endpoints for one chain into a prioritized fallback chain,
 * along with chain-level operational parameters. Endpoints within should be
 * ordered by {@link RpcProviderRole} priority.
 *
 * @example
 * ```typescript
 * import { ChainRpcConfig, RpcProviderRole, RpcProviderType } from '@cygnus-wealth/data-models';
 *
 * const ethereumRpc: ChainRpcConfig = {
 *   chainId: 1,
 *   chainName: 'Ethereum Mainnet',
 *   endpoints: [
 *     {
 *       url: 'https://eth-mainnet.g.alchemy.com/v2/key',
 *       provider: 'Alchemy',
 *       role: RpcProviderRole.PRIMARY,
 *       type: RpcProviderType.MANAGED,
 *       rateLimitRps: 100,
 *       timeoutMs: 5000
 *     }
 *   ],
 *   totalOperationTimeoutMs: 30000,
 *   cacheStaleAcceptanceMs: 60000
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link RpcEndpointConfig} for individual endpoint configuration
 * @see {@link RpcProviderConfig} for top-level multi-chain configuration
 */
export interface ChainRpcConfig {
  /** Numeric chain ID (e.g. 1 for Ethereum, 137 for Polygon) */
  chainId: number;

  /** Human-readable chain name (e.g. "Ethereum Mainnet") */
  chainName: string;

  /** Ordered list of RPC endpoints forming the fallback chain */
  endpoints: RpcEndpointConfig[];

  /** Maximum total time in milliseconds for an operation across all retry/fallback attempts */
  totalOperationTimeoutMs: number;

  /** Duration in milliseconds to accept stale cached data before forcing a fresh RPC call */
  cacheStaleAcceptanceMs: number;
}
