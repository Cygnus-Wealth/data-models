/**
 * Unique identifier for a specific account across the system.
 *
 * Format: `{walletConnectionId}:{checksummedAddress}` for connected accounts
 * (e.g., `metamask:a1b2c3d4:0xAbC...123`), or `watch:{checksummedAddress}`
 * for watch addresses.
 *
 * This is the primary key used throughout the system to reference a specific
 * account. It disambiguates the same address appearing in different wallet
 * connections (e.g., imported into both MetaMask and Rabby).
 *
 * @example
 * ```typescript
 * import { AccountId } from '@cygnus-wealth/data-models';
 *
 * const connectedAccountId: AccountId = 'metamask:a1b2c3d4:0xAbCdEf1234567890';
 * const watchAccountId: AccountId = 'watch:0xAbCdEf1234567890';
 * ```
 *
 * @since 1.3.0
 * @stability extended
 */
export type AccountId = string;
