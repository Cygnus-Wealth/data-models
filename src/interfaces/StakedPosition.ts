import { Chain } from '../enums/Chain';
import { Asset } from './Asset';
import { Balance } from './Balance';
import { Price } from './Price';
import { Metadata } from './Metadata';

export interface StakedPosition {
  id: string;
  protocol: string;
  validator?: string;
  chain: Chain;
  asset: Asset;
  stakedAmount: string;
  rewards: Balance[];
  lockupPeriod?: number;
  unlockDate?: Date;
  apr?: number;
  value?: Price;
  metadata?: Metadata;
}