/**
 * Health check configuration for RPC endpoint monitoring.
 *
 * Controls periodic health probes that determine endpoint availability
 * and inform circuit breaker state transitions.
 *
 * @example
 * ```typescript
 * import { HealthCheckConfig } from '@cygnus-wealth/data-models';
 *
 * const healthCheck: HealthCheckConfig = {
 *   intervalMs: 30000,
 *   timeoutMs: 5000,
 *   method: 'eth_blockNumber'
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link RpcProviderConfig} for top-level configuration
 * @see {@link CircuitBreakerConfig} for failure isolation
 */
export interface HealthCheckConfig {
  /** Interval in milliseconds between health check probes */
  intervalMs: number;

  /** Timeout in milliseconds for each health check request */
  timeoutMs: number;

  /** JSON-RPC method used for health probes (e.g. "eth_blockNumber", "eth_chainId") */
  method: string;
}
