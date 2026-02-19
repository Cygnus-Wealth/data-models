/**
 * Canonical identifier for a wallet provider.
 *
 * String union type representing supported wallet providers. Extensible
 * without breaking changes when new wallets are supported.
 *
 * @example
 * ```typescript
 * import { WalletProviderId } from '@cygnus-wealth/data-models';
 *
 * const provider: WalletProviderId = 'metamask';
 * ```
 *
 * @since 1.3.0
 * @stability extended
 */
export type WalletProviderId =
  | 'metamask'
  | 'rabby'
  | 'walletconnect'
  | 'coinbase-wallet'
  | 'trust-wallet'
  | 'frame'
  | 'crypto-com-onchain'
  | 'phantom'
  | 'solflare'
  | 'backpack'
  | 'exodus'
  | 'manual';
