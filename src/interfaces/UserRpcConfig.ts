import { UserRpcEndpoint } from './UserRpcEndpoint';

/**
 * Configuration for user-provided RPC endpoint overrides.
 *
 * Determines how user-supplied endpoints interact with the
 * platform-managed endpoint list. In 'override' mode, user endpoints
 * completely replace managed endpoints for the given chains. In
 * 'prepend' mode, user endpoints are tried first before falling back
 * to managed endpoints.
 *
 * @example
 * ```typescript
 * import type { UserRpcConfig } from '@cygnus-wealth/data-models';
 *
 * const userConfig: UserRpcConfig = {
 *   endpoints: [
 *     { chainId: '1', url: 'https://my-eth.example.com/rpc', label: 'My ETH' }
 *   ],
 *   mode: 'prepend'
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link UserRpcEndpoint} for individual endpoint definition
 * @see {@link RpcProviderConfig} for top-level usage
 */
export interface UserRpcConfig {
  /** List of user-provided RPC endpoints */
  endpoints: UserRpcEndpoint[];

  /** How user endpoints interact with managed endpoints: 'override' replaces, 'prepend' adds before */
  mode: 'override' | 'prepend';
}
