import { Asset } from './Asset';
import { Price } from './Price';
import { Metadata } from './Metadata';

export interface Balance {
  assetId: string;
  asset: Asset;
  amount: string; // Use string for precision with large numbers
  value?: Price;
  cost_basis?: number;
  realized_pnl?: number;
  unrealized_pnl?: number;
  metadata?: Metadata;
}