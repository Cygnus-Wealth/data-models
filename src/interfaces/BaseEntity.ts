/**
 * Base entity interface providing common identity and timestamp fields.
 *
 * BaseEntity serves as the foundational building block for all entity types in the
 * CygnusWealth system. It establishes the pattern for entity identity and audit
 * tracking across all bounded contexts.
 *
 * In Domain-Driven Design terms, this represents the common characteristics of all
 * Entities (objects with identity), as distinguished from Value Objects (objects
 * defined by their attributes).
 *
 * @example
 * ```typescript
 * interface Account extends BaseEntity {
 *   name: string;
 *   type: AccountType;
 * }
 *
 * const account: Account = {
 *   id: "acc_123",
 *   createdAt: new Date("2025-01-01T00:00:00Z"),
 *   updatedAt: new Date("2025-01-01T00:00:00Z"),
 *   name: "Main Wallet",
 *   type: AccountType.WALLET
 * };
 * ```
 *
 * @since 0.0.1
 * @stability core
 *
 * @see {@link Account} for an example entity using BaseEntity
 * @see {@link Portfolio} for another example entity
 */
export interface BaseEntity {
  /**
   * Unique identifier for the entity.
   *
   * Format varies by entity type but must be globally unique within the entity's
   * bounded context. Common patterns include:
   * - UUID v4: `"550e8400-e29b-41d4-a716-446655440000"`
   * - Prefixed ID: `"acc_123"`, `"txn_abc"`
   * - Composite ID: `"eth-ethereum"`, `"btc-mainnet"`
   *
   * Consumers should treat IDs as opaque strings and not parse or derive meaning
   * from their structure, as ID formats may evolve.
   */
  id: string;

  /**
   * Timestamp when the entity was first created.
   *
   * Must be in UTC timezone. Immutable after initial creation.
   * Used for audit trails and chronological sorting.
   *
   * @example new Date("2025-01-01T00:00:00Z")
   */
  createdAt: Date;

  /**
   * Timestamp when the entity was last modified.
   *
   * Must be in UTC timezone. Updated on every mutation.
   * Used for cache invalidation and optimistic locking.
   *
   * @example new Date("2025-01-15T14:30:00Z")
   */
  updatedAt: Date;
}