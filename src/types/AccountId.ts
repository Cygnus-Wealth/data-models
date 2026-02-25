/**
 * Unique identifier for a specific account across the system.
 *
 * Format: `{walletConnectionId}:{chainFamily}:{address}` for connected accounts
 * (e.g., `metamask:a1b2c3d4:evm:0xAbC...123`), or `watch:{address}`
 * for watch addresses.
 *
 * The `chainFamily` segment (introduced in en-o8w) disambiguates addresses
 * from the same wallet connection that span different chain families.
 *
 * This is the primary key used throughout the system to reference a specific
 * account. It disambiguates the same address appearing in different wallet
 * connections (e.g., imported into both MetaMask and Rabby).
 *
 * @example
 * ```typescript
 * import { AccountId } from '@cygnus-wealth/data-models';
 *
 * const evmAccountId: AccountId = 'metamask:a1b2c3d4:evm:0xAbCdEf1234567890';
 * const solanaAccountId: AccountId = 'phantom:abc123:solana:7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
 * const watchAccountId: AccountId = 'watch:0xAbCdEf1234567890';
 * ```
 *
 * @since 1.3.0
 * @stability extended
 */
export type AccountId = string;
