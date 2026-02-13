import { Chain } from '../enums/Chain';

/**
 * Discriminator type for blockchain network environments.
 *
 * Distinguishes between production (mainnet), testnet, and local development
 * environments. Used to ensure operations target the correct network tier
 * and to prevent accidental cross-environment interactions.
 *
 * @example
 * ```typescript
 * import { NetworkEnvironment } from '@cygnus-wealth/data-models';
 *
 * const env: NetworkEnvironment = 'production';
 *
 * function getRpcUrl(env: NetworkEnvironment): string {
 *   switch (env) {
 *     case 'production': return 'https://mainnet.infura.io/v3/...';
 *     case 'testnet': return 'https://sepolia.infura.io/v3/...';
 *     case 'local': return 'http://localhost:8545';
 *   }
 * }
 * ```
 *
 * @since 1.1.0
 * @stability standard
 *
 * @see {@link EnvironmentConfig} for full environment configuration
 * @see {@link Chain} for blockchain network identifiers
 */
export type NetworkEnvironment = 'production' | 'testnet' | 'local';

/**
 * Configuration for a specific network environment.
 *
 * Pairs a {@link NetworkEnvironment} discriminator with the target blockchain
 * chain and an RPC endpoint URL. Provides a structured way to manage
 * environment-specific connection details.
 *
 * @example
 * ```typescript
 * import { EnvironmentConfig, Chain } from '@cygnus-wealth/data-models';
 *
 * const mainnetConfig: EnvironmentConfig = {
 *   environment: 'production',
 *   chain: Chain.ETHEREUM,
 *   rpcUrl: 'https://mainnet.infura.io/v3/YOUR_KEY'
 * };
 *
 * const testnetConfig: EnvironmentConfig = {
 *   environment: 'testnet',
 *   chain: Chain.ETHEREUM,
 *   rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY',
 *   label: 'Sepolia Testnet'
 * };
 *
 * const localConfig: EnvironmentConfig = {
 *   environment: 'local',
 *   chain: Chain.ETHEREUM,
 *   rpcUrl: 'http://localhost:8545',
 *   label: 'Hardhat Local'
 * };
 * ```
 *
 * @since 1.1.0
 * @stability standard
 *
 * @see {@link NetworkEnvironment} for environment discriminator values
 * @see {@link Chain} for supported blockchain networks
 */
export interface EnvironmentConfig {
  /** The network environment tier */
  environment: NetworkEnvironment;

  /** Target blockchain network */
  chain: Chain;

  /** RPC endpoint URL for this environment */
  rpcUrl: string;

  /** Optional human-readable label (e.g., 'Sepolia Testnet', 'Hardhat Local') */
  label?: string;
}
