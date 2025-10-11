import { Price } from './Price';

/**
 * Extended market data for analytics and research features.
 *
 * Comprehensive market information including price, market cap, trading volume,
 * supply metrics, price changes, and 24-hour price range. Used for advanced
 * analytics, market research, and detailed asset views.
 *
 * **Design Pattern:** Extends basic Price with market-specific metrics from
 * CoinGecko, CoinMarketCap, or other market data providers. All fields except
 * assetId, currentPrice, and lastUpdated are optional to handle varying data
 * availability.
 *
 * @example
 * ```typescript
 * import { MarketData } from '@cygnus-wealth/data-models';
 *
 * // Comprehensive market data for analytics
 * const ethMarketData: MarketData = {
 *   assetId: 'ethereum-eth',
 *   currentPrice: {
 *     value: 2000,
 *     currency: 'USD',
 *     timestamp: new Date()
 *   },
 *   marketCap: 240000000000,  // $240B
 *   volume24h: 12000000000,    // $12B daily volume
 *   priceChange24h: 50,
 *   priceChangePercentage24h: 2.5,
 *   high24h: 2050,
 *   low24h: 1950,
 *   circulatingSupply: 120000000,
 *   totalSupply: 120000000,
 *   lastUpdated: new Date()
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link Price} for base price structure
 * @see {@link Asset} for asset definitions
 */
export interface MarketData {
  /** Reference to Asset.id for this market data */
  assetId: string;

  /** Current market price with timestamp */
  currentPrice: Price;

  /** Total market capitalization (price * circulating supply) */
  marketCap?: number;

  /** Trading volume in last 24 hours */
  volume24h?: number;

  /** Absolute price change in last 24 hours (in currentPrice.currency) */
  priceChange24h?: number;

  /** Percentage price change in last 24 hours (e.g., 2.5 = 2.5%) */
  priceChangePercentage24h?: number;

  /** Highest price in last 24 hours */
  high24h?: number;

  /** Lowest price in last 24 hours */
  low24h?: number;

  /** Number of tokens in circulation (available for trading) */
  circulatingSupply?: number;

  /** Total number of tokens that currently exist (including locked) */
  totalSupply?: number;

  /** Timestamp when this market data was last updated */
  lastUpdated: Date;
}
