/**
 * Sort direction for query results.
 *
 * Standard sort order specification for ordering collections in ascending
 * or descending order. Used in query parameters, API requests, and UI controls.
 *
 * @example
 * ```typescript
 * import { SortOrder, Transaction } from '@cygnus-wealth/data-models';
 *
 * // Sort transactions by timestamp descending (newest first)
 * function sortTransactions(
 *   transactions: Transaction[],
 *   order: SortOrder = 'DESC'
 * ): Transaction[] {
 *   return [...transactions].sort((a, b) => {
 *     const comparison = a.timestamp.getTime() - b.timestamp.getTime();
 *     return order === 'ASC' ? comparison : -comparison;
 *   });
 * }
 *
 * // Sort assets by value ascending (smallest first)
 * function sortAssetsByValue(
 *   assets: PortfolioAsset[],
 *   order: SortOrder = 'ASC'
 * ): PortfolioAsset[] {
 *   return [...assets].sort((a, b) => {
 *     const comparison = (a.value.value || 0) - (b.value.value || 0);
 *     return order === 'ASC' ? comparison : -comparison;
 *   });
 * }
 *
 * // API query with sort order
 * interface QueryParams {
 *   sortBy: 'timestamp' | 'value' | 'symbol';
 *   order: SortOrder;
 * }
 *
 * const query: QueryParams = {
 *   sortBy: 'timestamp',
 *   order: 'DESC'  // Most recent first
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link PaginatedResponse} for paginated sorting
 * @see {@link FilterOptions} for combined filtering and sorting
 */
export type SortOrder = 'ASC' | 'DESC';
