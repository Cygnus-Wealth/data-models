/**
 * A user-provided custom RPC endpoint configuration.
 *
 * Represents an RPC endpoint supplied by the end user, enabling
 * self-sovereign infrastructure choices. These endpoints are not
 * managed or verified by the platform.
 *
 * @example
 * ```typescript
 * import type { UserRpcEndpoint } from '@cygnus-wealth/data-models';
 *
 * const myNode: UserRpcEndpoint = {
 *   chainId: '1',
 *   url: 'https://my-private-node.example.com/rpc',
 *   wsUrl: 'wss://my-private-node.example.com/ws',
 *   label: 'My Private Ethereum Node'
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link UserRpcConfig} for aggregating user endpoints
 */
export interface UserRpcEndpoint {
  /** Target chain ID as a string (e.g. "1", "137") */
  chainId: string;

  /** HTTP(S) RPC endpoint URL */
  url: string;

  /** Optional WebSocket endpoint URL for subscriptions */
  wsUrl?: string;

  /** Optional human-readable label for the endpoint */
  label?: string;
}
