/**
 * Extensible metadata container for source-specific and custom data.
 *
 * Metadata provides a flexible mechanism for storing additional information that
 * doesn't fit into standardized model fields. This pattern enables the core data
 * models to remain clean and source-agnostic while allowing integration domains
 * to preserve source-specific details.
 *
 * **Design Pattern: Extension Object**
 * The Metadata interface implements the Extension Object pattern, allowing models
 * to be extended without modifying their core structure. This maintains backward
 * compatibility while enabling forward extensibility.
 *
 * **Use Cases**:
 * - Source-specific identifiers (e.g., Robinhood internal IDs, CEX trade IDs)
 * - Integration-specific flags or configuration
 * - Experimental data during feature development
 * - Custom tags or labels added by consuming domains
 * - Raw response data for debugging
 *
 * **Guidelines**:
 * - Keys should be namespaced to avoid conflicts (e.g., `"robinhood:accountId"`)
 * - Values should be JSON-serializable
 * - Do NOT store sensitive data (API keys, private keys, passwords)
 * - Document custom metadata keys in consuming domain documentation
 *
 * @example
 * ```typescript
 * // Asset with Coinbase-specific metadata
 * const asset: Asset = {
 *   id: "btc-bitcoin",
 *   symbol: "BTC",
 *   name: "Bitcoin",
 *   type: AssetType.CRYPTOCURRENCY,
 *   metadata: {
 *     "coinbase:currencyCode": "BTC",
 *     "coinbase:tradingPair": "BTC-USD",
 *     "coinbase:minSize": "0.00000001",
 *     "tags": ["major", "layer1"],
 *     "lastSyncedAt": "2025-01-15T10:30:00Z"
 *   }
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Transaction with chain-specific metadata
 * const transaction: Transaction = {
 *   id: "txn_123",
 *   hash: "0xabc...",
 *   type: TransactionType.SWAP,
 *   // ... other fields
 *   metadata: {
 *     "ethereum:gasUsed": "21000",
 *     "ethereum:gasPrice": "50000000000",
 *     "ethereum:blockNumber": "18500000",
 *     "uniswap:poolAddress": "0xdef...",
 *     "uniswap:fee": "0.003"
 *   }
 * };
 * ```
 *
 * @since 0.0.1
 * @stability core
 *
 * @see {@link Asset} for usage in asset models
 * @see {@link Transaction} for usage in transaction models
 */
export interface Metadata {
  /**
   * Arbitrary key-value pairs for extensibility.
   *
   * Keys should follow namespacing convention: `"source:field"` or `"domain:field"`
   * to prevent collisions between different integration sources.
   *
   * Values must be JSON-serializable types (string, number, boolean, object, array, null).
   * Avoid storing functions, circular references, or non-serializable types.
   *
   * @example
   * {
   *   "robinhood:accountId": "RH_ACC_123",
   *   "robinhood:isFractional": true,
   *   "custom:tags": ["watchlist", "high-priority"]
   * }
   */
  [key: string]: unknown;
}