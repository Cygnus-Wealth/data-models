/**
 * Time range specification for filtering and queries.
 *
 * Defines an inclusive time range with start and end boundaries in UTC.
 * Used for filtering transactions, performance calculations, and historical
 * data queries.
 *
 * **Validation:** start must be less than or equal to end.
 * **Timezone:** All timestamps should be in UTC for consistency.
 *
 * @example
 * ```typescript
 * import { TimeRange } from '@cygnus-wealth/data-models';
 *
 * // Last 30 days
 * const last30Days: TimeRange = {
 *   start: new Date('2025-09-11T00:00:00Z'),
 *   end: new Date('2025-10-11T23:59:59Z')
 * };
 *
 * // Specific month
 * const september2025: TimeRange = {
 *   start: new Date('2025-09-01T00:00:00Z'),
 *   end: new Date('2025-09-30T23:59:59Z')
 * };
 *
 * // Year to date
 * const ytd: TimeRange = {
 *   start: new Date('2025-01-01T00:00:00Z'),
 *   end: new Date()
 * };
 *
 * // Usage in filtering
 * function filterTransactionsByTime(
 *   transactions: Transaction[],
 *   range: TimeRange
 * ): Transaction[] {
 *   return transactions.filter(tx =>
 *     tx.timestamp >= range.start && tx.timestamp <= range.end
 *   );
 * }
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link FilterOptions} for usage in filtering
 * @see {@link Portfolio} for performance period calculations
 */
export type TimeRange = {
  /** Range start time (inclusive, UTC) */
  start: Date;

  /** Range end time (inclusive, UTC) */
  end: Date;
};
