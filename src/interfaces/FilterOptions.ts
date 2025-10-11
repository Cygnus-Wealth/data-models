import { Chain } from '../enums/Chain';
import { AssetType } from '../enums/AssetType';
import { IntegrationSource } from '../enums/IntegrationSource';
import { TimeRange } from '../types/TimeRange';

/**
 * Flexible filtering criteria for portfolio and transaction queries.
 *
 * Composable filter interface supporting multi-dimensional filtering across
 * chains, asset types, sources, time ranges, and value thresholds. All filters
 * use AND logic between different filter types and OR logic within array filters.
 *
 * **Filter Logic:**
 * - Multiple filter types are combined with AND
 * - Array values within a filter type are combined with OR
 * - Example: chains=[ETHEREUM, POLYGON] AND assetTypes=[CRYPTOCURRENCY]
 *
 * @example
 * ```typescript
 * import { FilterOptions, Chain, AssetType, IntegrationSource } from '@cygnus-wealth/data-models';
 *
 * // Filter for Ethereum/Polygon crypto assets
 * const cryptoFilter: FilterOptions = {
 *   chains: [Chain.ETHEREUM, Chain.POLYGON],
 *   assetTypes: [AssetType.CRYPTOCURRENCY]
 * };
 *
 * // Filter for high-value positions in last 30 days
 * const recentHighValueFilter: FilterOptions = {
 *   minValue: 10000,  // >= $10k
 *   timeRange: {
 *     start: new Date('2025-09-11'),
 *     end: new Date('2025-10-11')
 *   }
 * };
 *
 * // Filter for wallet assets only
 * const walletFilter: FilterOptions = {
 *   sources: [
 *     IntegrationSource.METAMASK,
 *     IntegrationSource.RABBY,
 *     IntegrationSource.PHANTOM
 *   ]
 * };
 *
 * // Complex multi-dimensional filter
 * const complexFilter: FilterOptions = {
 *   chains: [Chain.ETHEREUM],
 *   assetTypes: [AssetType.CRYPTOCURRENCY, AssetType.NFT],
 *   sources: [IntegrationSource.METAMASK],
 *   minValue: 1000,
 *   maxValue: 50000,
 *   timeRange: {
 *     start: new Date('2025-01-01'),
 *     end: new Date()
 *   }
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link Chain} for blockchain filtering
 * @see {@link AssetType} for asset classification filtering
 * @see {@link IntegrationSource} for source filtering
 * @see {@link TimeRange} for time-based filtering
 */
export interface FilterOptions {
  /** Filter by blockchain networks (OR within array) */
  chains?: Chain[];

  /** Filter by asset types (OR within array) */
  assetTypes?: AssetType[];

  /** Filter by data sources (OR within array) */
  sources?: IntegrationSource[];

  /** Filter by time range (inclusive start and end) */
  timeRange?: TimeRange;

  /** Minimum value threshold (inclusive, in base currency like USD) */
  minValue?: number;

  /** Maximum value threshold (inclusive, in base currency like USD) */
  maxValue?: number;
}
