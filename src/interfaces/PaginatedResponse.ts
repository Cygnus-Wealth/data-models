/**
 * Paginated response wrapper for large datasets.
 *
 * Standard structure for paginated API responses enabling efficient handling
 * of large collections (transactions, assets, etc.). Uses 1-indexed pages and
 * provides hasMore flag for infinite scroll implementations.
 *
 * **Design Pattern:** Cursor-based pagination pattern with metadata for UI
 * pagination controls and infinite scroll detection.
 *
 * @template T - Type of items in the collection
 *
 * @example
 * ```typescript
 * import { PaginatedResponse, Transaction } from '@cygnus-wealth/data-models';
 *
 * // First page of transactions
 * const page1: PaginatedResponse<Transaction> = {
 *   items: [
 *     { id: 'tx-1', type: TransactionType.BUY, ... },
 *     { id: 'tx-2', type: TransactionType.SELL, ... },
 *     // ... 48 more items
 *   ],
 *   total: 523,
 *   page: 1,
 *   pageSize: 50,
 *   hasMore: true  // (1 * 50) < 523
 * };
 *
 * // Last page calculation
 * const lastPage: PaginatedResponse<Transaction> = {
 *   items: [ ... 23 items ... ],
 *   total: 523,
 *   page: 11,
 *   pageSize: 50,
 *   hasMore: false  // (11 * 50) >= 523
 * };
 *
 * // Empty result set
 * const emptyPage: PaginatedResponse<Transaction> = {
 *   items: [],
 *   total: 0,
 *   page: 1,
 *   pageSize: 50,
 *   hasMore: false
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link ApiResponse} for response wrapping
 * @see {@link Transaction} for common paginated type
 */
export interface PaginatedResponse<T> {
  /** Array of items for the current page */
  items: T[];

  /** Total number of items across all pages */
  total: number;

  /** Current page number (1-indexed) */
  page: number;

  /** Number of items per page */
  pageSize: number;

  /** Whether more pages exist after the current page (page * pageSize \< total) */
  hasMore: boolean;
}
