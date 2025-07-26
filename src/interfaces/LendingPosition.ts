import { Chain } from '../enums/Chain';
import { Asset } from './Asset';
import { Price } from './Price';
import { Metadata } from './Metadata';

export interface LendingPosition {
  id: string;
  protocol: string;
  chain: Chain;
  type: 'SUPPLY' | 'BORROW';
  asset: Asset;
  amount: string;
  apy?: number;
  accrued_interest?: number;
  health_factor?: number;
  liquidation_threshold?: number;
  value?: Price;
  metadata?: Metadata;
}