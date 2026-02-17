/**
 * Circuit breaker configuration for RPC endpoint failure isolation.
 *
 * Controls the circuit breaker pattern that prevents cascading failures by
 * temporarily removing degraded endpoints from the active pool. Follows the
 * standard CLOSED → OPEN → HALF-OPEN state machine.
 *
 * @example
 * ```typescript
 * import { CircuitBreakerConfig } from '@cygnus-wealth/data-models';
 *
 * const circuitBreaker: CircuitBreakerConfig = {
 *   failureThreshold: 5,
 *   openDurationMs: 30000,
 *   halfOpenMaxAttempts: 2,
 *   monitorWindowMs: 60000
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link RpcProviderConfig} for top-level configuration
 */
export interface CircuitBreakerConfig {
  /** Number of consecutive failures before opening the circuit */
  failureThreshold: number;

  /** Duration in milliseconds the circuit stays open before transitioning to half-open */
  openDurationMs: number;

  /** Maximum probe requests allowed in half-open state before deciding to close or re-open */
  halfOpenMaxAttempts: number;

  /** Sliding window in milliseconds over which failures are counted */
  monitorWindowMs: number;
}
