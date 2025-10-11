import { AssetType } from '../enums/AssetType';
import { Chain } from '../enums/Chain';
import { Metadata } from './Metadata';

/**
 * Universal asset representation normalizing data from multiple sources.
 *
 * Core entity representing any tradeable or holdable financial instrument including
 * cryptocurrencies, stocks, ETFs, NFTs, bonds, fiat currencies, and commodities.
 * Designed to accommodate data from CEX APIs, DEX subgraphs, blockchain RPCs,
 * and traditional finance systems.
 *
 * **Design Pattern:** Flexible field set supports source-specific identifiers
 * (contractAddress for tokens, cusip/isin for securities, coingeckoId for market data)
 * while maintaining consistent core identity (id, symbol, name, type).
 *
 * @example
 * ```typescript
 * import { Asset, AssetType, Chain } from '@cygnus-wealth/data-models';
 *
 * // ERC-20 token from blockchain
 * const usdcAsset: Asset = {
 *   id: 'ethereum-usdc',
 *   symbol: 'USDC',
 *   name: 'USD Coin',
 *   type: AssetType.CRYPTOCURRENCY,
 *   decimals: 6,
 *   contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
 *   chain: Chain.ETHEREUM,
 *   coingeckoId: 'usd-coin'
 * };
 *
 * // Traditional stock from brokerage
 * const appleStock: Asset = {
 *   id: 'us-aapl',
 *   symbol: 'AAPL',
 *   name: 'Apple Inc.',
 *   type: AssetType.STOCK,
 *   cusip: '037833100',
 *   isin: 'US0378331005'
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link AssetType} for classification values
 * @see {@link Chain} for blockchain identifiers
 * @see {@link NFT} for NFT-specific extensions
 */
export interface Asset {
  /** Unique identifier across all sources (e.g., 'ethereum-usdc', 'us-aapl') */
  id: string;

  /** Trading symbol or ticker (e.g., 'USDC', 'AAPL', 'BTC') */
  symbol: string;

  /** Human-readable asset name (e.g., 'USD Coin', 'Apple Inc.') */
  name: string;

  /** Asset classification for filtering and display logic */
  type: AssetType;

  /** Decimal places for balance precision (e.g., 18 for ETH, 6 for USDC, 2 for USD) */
  decimals?: number;

  /** Smart contract address for blockchain tokens (ERC-20, SPL, etc.) */
  contractAddress?: string;

  /** Blockchain network for token assets */
  chain?: Chain;

  /** URL to asset logo or icon for UI display */
  logoUrl?: string;

  /** CoinGecko API identifier for market data integration */
  coingeckoId?: string;

  /** CoinMarketCap API identifier for market data integration */
  cmc_id?: string;

  /** CUSIP identifier for North American securities */
  cusip?: string;

  /** ISIN identifier for international securities */
  isin?: string;

  /** Source-specific additional data and custom fields */
  metadata?: Metadata;
}
