import { Price } from './Price';

export interface MarketData {
  assetId: string;
  currentPrice: Price;
  marketCap?: number;
  volume24h?: number;
  priceChange24h?: number;
  priceChangePercentage24h?: number;
  high24h?: number;
  low24h?: number;
  circulatingSupply?: number;
  totalSupply?: number;
  lastUpdated: Date;
}