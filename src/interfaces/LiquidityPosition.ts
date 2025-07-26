import { Chain } from '../enums/Chain';
import { Balance } from './Balance';
import { Price } from './Price';
import { Metadata } from './Metadata';

export interface LiquidityPosition {
  id: string;
  protocol: string;
  poolAddress: string;
  poolName: string;
  chain: Chain;
  tokens: Balance[];
  lpTokenBalance?: string;
  share?: number; // Percentage of pool
  value?: Price;
  fees_earned?: number;
  impermanent_loss?: number;
  metadata?: Metadata;
}