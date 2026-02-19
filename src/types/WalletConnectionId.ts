/**
 * Unique identifier for a specific wallet connection session.
 *
 * Format: `{providerId}:{randomId}` (e.g., `metamask:a1b2c3d4`).
 * The randomId component ensures uniqueness when the same provider
 * is connected multiple times (e.g., two WalletConnect sessions).
 *
 * @example
 * ```typescript
 * import { WalletConnectionId } from '@cygnus-wealth/data-models';
 *
 * const connectionId: WalletConnectionId = 'metamask:a1b2c3d4';
 * const wcConnectionId: WalletConnectionId = 'walletconnect:x9y8z7w6';
 * ```
 *
 * @since 1.3.0
 * @stability extended
 */
export type WalletConnectionId = string;
