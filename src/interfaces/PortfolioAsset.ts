import { Asset } from './Asset';
import { Balance } from './Balance';
import { Price } from './Price';

export interface PortfolioAsset {
  id: string;
  accountId: string;
  assetId: string;
  asset: Asset;
  balance: Balance;
  value: Price;
  allocation: number;
  lastUpdated: Date;
}