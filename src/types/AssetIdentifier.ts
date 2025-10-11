import { Chain } from '../enums/Chain';

/**
 * Flexible asset lookup criteria requiring at least one identifier.
 *
 * Used for asset resolution and lookup operations where different identification
 * methods may be available (symbol, contract address, database ID). At least
 * one field must be provided for successful asset identification.
 *
 * **Design Pattern:** Partial type enabling flexible asset lookup based on
 * available information. Useful for user input, API queries, and data normalization.
 *
 * @example
 * ```typescript
 * import { AssetIdentifier, Chain } from '@cygnus-wealth/data-models';
 *
 * // Lookup by symbol only
 * const symbolLookup: AssetIdentifier = {
 *   symbol: 'ETH'
 * };
 *
 * // Lookup by contract address (most precise)
 * const contractLookup: AssetIdentifier = {
 *   contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
 *   chain: Chain.ETHEREUM
 * };
 *
 * // Lookup by symbol + chain (for disambiguation)
 * const chainedLookup: AssetIdentifier = {
 *   symbol: 'USDC',
 *   chain: Chain.POLYGON  // Distinguish from Ethereum USDC
 * };
 *
 * // Lookup by internal ID
 * const idLookup: AssetIdentifier = {
 *   assetId: 'ethereum-usdc'
 * };
 *
 * // Asset resolution function example
 * async function findAsset(identifier: AssetIdentifier): Promise<Asset | null> {
 *   if (identifier.assetId) {
 *     return await db.assets.findById(identifier.assetId);
 *   }
 *   if (identifier.contractAddress && identifier.chain) {
 *     return await db.assets.findByContract(identifier.contractAddress, identifier.chain);
 *   }
 *   if (identifier.symbol) {
 *     return await db.assets.findBySymbol(identifier.symbol, identifier.chain);
 *   }
 *   return null;
 * }
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link Asset} for full asset structure
 * @see {@link Chain} for blockchain identification
 */
export type AssetIdentifier = {
  /** Asset trading symbol (e.g., 'ETH', 'USDC', 'BTC') */
  symbol?: string;

  /** Smart contract address for on-chain assets */
  contractAddress?: string;

  /** Blockchain network for contract-based assets */
  chain?: Chain;

  /** Internal database asset ID */
  assetId?: string;
};
