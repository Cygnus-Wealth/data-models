import { WalletConnectionId } from '../types/WalletConnectionId';
import { WalletProviderId } from '../types/WalletProviderId';
import { Chain } from '../enums/Chain';
import { ChainFamily } from '../enums/ChainFamily';
import { ConnectedAccount } from './ConnectedAccount';

/**
 * A connected wallet provider session.
 *
 * Represents a single connection session to a wallet provider. A user may have
 * multiple connections to the same provider (e.g., two WalletConnect sessions)
 * or connections to different providers simultaneously.
 *
 * Each connection maintains its own list of accumulated accounts discovered
 * via EIP-1193 or manually added by the user.
 *
 * @example
 * ```typescript
 * import { WalletConnection } from '@cygnus-wealth/data-models';
 *
 * const connection: WalletConnection = {
 *   connectionId: 'metamask:a1b2c3d4',
 *   providerId: 'metamask',
 *   providerName: 'MetaMask',
 *   providerIcon: 'https://metamask.io/icon.svg',
 *   connectionLabel: 'My MetaMask',
 *   accounts: [],
 *   activeAccountAddress: '0xAbCdEf1234567890',
 *   supportedChains: [Chain.ETHEREUM, Chain.POLYGON],
 *   connectedAt: '2026-01-15T10:30:00Z',
 *   lastActiveAt: '2026-02-19T08:00:00Z',
 *   sessionStatus: 'active'
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link ConnectedAccount} for individual account entries
 * @see {@link WalletProviderId} for provider identification
 * @see {@link WalletConnectionId} for connection identifier format
 */
export interface WalletConnection {
  /** Unique connection identifier: `{providerId}:{randomId}` */
  connectionId: WalletConnectionId;

  /** Canonical wallet provider identifier */
  providerId: WalletProviderId;

  /** Human-readable provider name (e.g., "MetaMask") */
  providerName: string;

  /** URL or identifier for the provider's icon */
  providerIcon: string;

  /** User-assigned label (default: provider name) */
  connectionLabel: string;

  /** All accounts accumulated from this connection */
  accounts: ConnectedAccount[];

  /** Currently selected account address in the wallet provider, or null */
  activeAccountAddress: string | null;

  /** Chains this wallet connection supports */
  supportedChains: Chain[];

  /** Chain families this wallet connection supports (e.g., EVM, Solana, SUI) */
  supportedChainFamilies: ChainFamily[];

  /** ISO 8601 timestamp of initial connection */
  connectedAt: string;

  /** ISO 8601 timestamp of last activity */
  lastActiveAt: string;

  /** Session lifecycle status */
  sessionStatus: 'active' | 'stale' | 'disconnected';
}
