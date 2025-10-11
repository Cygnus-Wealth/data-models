import { IntegrationSource } from '../enums/IntegrationSource';

/**
 * Point-in-time asset price with currency and timestamp.
 *
 * Essential for portfolio valuation, historical tracking, and performance
 * calculations. Supports multiple price representations (value and amount)
 * to accommodate different data sources.
 *
 * **Design Pattern:** Simple value object with timestamp for price history
 * and source attribution for data quality tracking. Either value or amount
 * should be present.
 *
 * @example
 * ```typescript
 * import { Price, IntegrationSource } from '@cygnus-wealth/data-models';
 *
 * // Market price from price feed
 * const currentPrice: Price = {
 *   value: 2000.00,
 *   currency: 'USD',
 *   timestamp: new Date('2025-10-11T10:30:00Z'),
 *   source: IntegrationSource.BLOCKCHAIN_DIRECT
 * };
 *
 * // Historical price for performance calculation
 * const historicalPrice: Price = {
 *   amount: 1800.00,
 *   currency: 'USD',
 *   timestamp: new Date('2025-09-11T10:30:00Z')
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link MarketData} for extended market information
 * @see {@link Balance} for asset valuation usage
 */
export interface Price {
  /** Price value (primary field for current prices) */
  value?: number;

  /** Alternative price field (used by some data sources) */
  amount?: number;

  /** Currency code (ISO 4217 for fiat, symbol for crypto, e.g., 'USD', 'ETH') */
  currency: string;

  /** Timestamp when this price was recorded or fetched */
  timestamp: Date;

  /** Data source providing this price (for quality tracking) */
  source?: IntegrationSource;
}
