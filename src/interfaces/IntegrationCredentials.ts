import { IntegrationSource } from '../enums/IntegrationSource';
import { Metadata } from './Metadata';

/**
 * Encrypted credentials for CEX/brokerage API integration.
 *
 * Stores connection credentials for read-only API access to centralized exchanges,
 * brokerages, and blockchain wallets. Designed for client-side encryption and
 * secure storage patterns.
 *
 * **Security Pattern:** Credentials stored in this interface should be encrypted
 * before persistence using Web Crypto API or similar client-side encryption.
 * NEVER store private keys - only read-only API keys for data fetching.
 *
 * **Design Pattern:** Flexible credential structure supporting both API key-based
 * authentication (CEX) and address-based read-only access (wallets).
 *
 * @example
 * ```typescript
 * import { IntegrationCredentials, IntegrationSource } from '@cygnus-wealth/data-models';
 *
 * // Kraken CEX credentials (API key + secret)
 * const krakenCreds: IntegrationCredentials = {
 *   source: IntegrationSource.KRAKEN,
 *   apiKey: 'encrypted_api_key_here',
 *   apiSecret: 'encrypted_api_secret_here'
 * };
 *
 * // Coinbase Pro credentials (with passphrase)
 * const coinbaseCreds: IntegrationCredentials = {
 *   source: IntegrationSource.COINBASE,
 *   apiKey: 'encrypted_api_key',
 *   apiSecret: 'encrypted_secret',
 *   passphrase: 'encrypted_passphrase'
 * };
 *
 * // MetaMask wallet (address-based read-only)
 * const walletCreds: IntegrationCredentials = {
 *   source: IntegrationSource.METAMASK,
 *   walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
 *   chainId: '1'  // Ethereum mainnet
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link IntegrationSource} for supported sources
 * @see {@link Account} for credential usage in data fetching
 */
export interface IntegrationCredentials {
  /** Integration source requiring these credentials */
  source: IntegrationSource;

  /** API key for CEX/brokerage authentication (should be encrypted) */
  apiKey?: string;

  /** API secret for CEX/brokerage authentication (should be encrypted) */
  apiSecret?: string;

  /** Additional passphrase for some exchanges (Coinbase Pro, etc.) (should be encrypted) */
  passphrase?: string;

  /** Wallet address for read-only blockchain queries (NOT private key) */
  walletAddress?: string;

  /** Blockchain network ID for wallet connections (e.g., '1' for Ethereum mainnet) */
  chainId?: string;

  /** Source-specific metadata (permissions, connection settings, etc.) */
  metadata?: Metadata;
}
