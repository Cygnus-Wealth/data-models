/**
 * Retry strategy configuration for failed RPC calls.
 *
 * Controls exponential backoff behavior when individual RPC requests fail.
 * Applied per-request before escalating to the next endpoint in the fallback chain.
 *
 * @example
 * ```typescript
 * import { RetryConfig } from '@cygnus-wealth/data-models';
 *
 * const retry: RetryConfig = {
 *   maxAttempts: 3,
 *   baseDelayMs: 1000,
 *   maxDelayMs: 10000
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link RpcProviderConfig} for top-level configuration
 */
export interface RetryConfig {
  /** Maximum number of retry attempts per request (including the initial attempt) */
  maxAttempts: number;

  /** Base delay in milliseconds for exponential backoff (delay = baseDelayMs * 2^attempt) */
  baseDelayMs: number;

  /** Maximum delay in milliseconds — caps exponential growth */
  maxDelayMs: number;
}
