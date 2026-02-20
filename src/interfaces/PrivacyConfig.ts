/**
 * Privacy-related configuration for RPC request handling.
 *
 * Controls endpoint rotation and query obfuscation strategies to
 * reduce correlation of user activity across RPC providers.
 *
 * @example
 * ```typescript
 * import type { PrivacyConfig } from '@cygnus-wealth/data-models';
 *
 * const privacy: PrivacyConfig = {
 *   rotateWithinTier: true,
 *   privacyMode: true,
 *   queryJitterMs: 150
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link RpcProviderConfig} for top-level usage
 */
export interface PrivacyConfig {
  /** Rotate between endpoints of the same tier/role to avoid fingerprinting */
  rotateWithinTier: boolean;

  /** Enable full privacy mode (distributes queries across providers) */
  privacyMode: boolean;

  /** Random jitter added to query timing to resist timing analysis (in milliseconds) */
  queryJitterMs: number;
}
