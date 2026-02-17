import { RpcProviderRole } from '../enums/RpcProviderRole';
import { RpcProviderType } from '../enums/RpcProviderType';

/**
 * Configuration for a single RPC endpoint within a chain's fallback chain.
 *
 * Describes connection details, provider metadata, and operational limits
 * for one RPC endpoint. Multiple endpoints are composed into a
 * {@link ChainRpcConfig} to form a prioritized fallback chain.
 *
 * @example
 * ```typescript
 * import { RpcEndpointConfig, RpcProviderRole, RpcProviderType } from '@cygnus-wealth/data-models';
 *
 * const alchemyEndpoint: RpcEndpointConfig = {
 *   url: 'https://eth-mainnet.g.alchemy.com/v2/key',
 *   wsUrl: 'wss://eth-mainnet.g.alchemy.com/v2/key',
 *   provider: 'Alchemy',
 *   role: RpcProviderRole.PRIMARY,
 *   type: RpcProviderType.MANAGED,
 *   rateLimitRps: 100,
 *   timeoutMs: 5000,
 *   weight: 100
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link RpcProviderRole} for endpoint priority in fallback chain
 * @see {@link RpcProviderType} for provider classification
 * @see {@link ChainRpcConfig} for chain-level endpoint composition
 */
export interface RpcEndpointConfig {
  /** HTTP(S) JSON-RPC endpoint URL */
  url: string;

  /** WebSocket endpoint URL for subscriptions (optional — not all providers support WS) */
  wsUrl?: string;

  /** Human-readable provider name (e.g. "Alchemy", "Infura", "Ankr Public") */
  provider: string;

  /** Priority role within the fallback chain */
  role: RpcProviderRole;

  /** Infrastructure classification of the provider */
  type: RpcProviderType;

  /** Maximum requests per second allowed by this endpoint */
  rateLimitRps: number;

  /** Per-request timeout in milliseconds */
  timeoutMs: number;

  /** Relative weight for load balancing among same-role endpoints (higher = more traffic) */
  weight?: number;
}
