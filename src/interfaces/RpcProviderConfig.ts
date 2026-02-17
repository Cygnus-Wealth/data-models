import { ChainRpcConfig } from './ChainRpcConfig';
import { CircuitBreakerConfig } from './CircuitBreakerConfig';
import { RetryConfig } from './RetryConfig';
import { HealthCheckConfig } from './HealthCheckConfig';

/**
 * Top-level RPC provider configuration for multi-chain operations.
 *
 * The root configuration object that composes per-chain endpoint configs
 * with shared operational policies (circuit breaking, retry, health checking).
 * This is the primary type consumed by downstream RPC fallback chain implementations.
 *
 * @example
 * ```typescript
 * import { RpcProviderConfig, RpcProviderRole, RpcProviderType } from '@cygnus-wealth/data-models';
 *
 * const config: RpcProviderConfig = {
 *   chains: {
 *     '1': {
 *       chainId: 1,
 *       chainName: 'Ethereum Mainnet',
 *       endpoints: [{
 *         url: 'https://eth-mainnet.g.alchemy.com/v2/key',
 *         provider: 'Alchemy',
 *         role: RpcProviderRole.PRIMARY,
 *         type: RpcProviderType.MANAGED,
 *         rateLimitRps: 100,
 *         timeoutMs: 5000
 *       }],
 *       totalOperationTimeoutMs: 30000,
 *       cacheStaleAcceptanceMs: 60000
 *     }
 *   },
 *   circuitBreaker: {
 *     failureThreshold: 5,
 *     openDurationMs: 30000,
 *     halfOpenMaxAttempts: 2,
 *     monitorWindowMs: 60000
 *   },
 *   retry: {
 *     maxAttempts: 3,
 *     baseDelayMs: 1000,
 *     maxDelayMs: 10000
 *   },
 *   healthCheck: {
 *     intervalMs: 30000,
 *     timeoutMs: 5000,
 *     method: 'eth_blockNumber'
 *   }
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link ChainRpcConfig} for per-chain configuration
 * @see {@link CircuitBreakerConfig} for failure isolation policy
 * @see {@link RetryConfig} for retry strategy
 * @see {@link HealthCheckConfig} for endpoint monitoring
 */
export interface RpcProviderConfig {
  /** Per-chain RPC configurations, keyed by chain ID string (e.g. "1", "137") */
  chains: Record<string, ChainRpcConfig>;

  /** Circuit breaker policy applied to all endpoints */
  circuitBreaker: CircuitBreakerConfig;

  /** Retry strategy applied to individual RPC requests */
  retry: RetryConfig;

  /** Health check policy for endpoint monitoring */
  healthCheck: HealthCheckConfig;
}
