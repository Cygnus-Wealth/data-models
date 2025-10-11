import { Chain } from '../enums/Chain';
import { LendingPositionType } from '../enums/LendingPositionType';
import { Asset } from './Asset';
import { Price } from './Price';
import { Metadata } from './Metadata';

export interface LendingPosition {
  id: string;
  protocol: string;
  chain: Chain;
  type: LendingPositionType;
  asset: Asset;
  amount: string;
  apy?: number;
  accruedInterest?: number;
  healthFactor?: number;
  liquidationThreshold?: number;
  value?: Price;
  metadata?: Metadata;
}