import { AccountType } from '../enums/AccountType';
import { IntegrationSource } from '../enums/IntegrationSource';
import { Balance } from './Balance';
import { LiquidityPosition } from './LiquidityPosition';
import { StakedPosition } from './StakedPosition';
import { LendingPosition } from './LendingPosition';
import { NFT } from './NFT';
import { Price } from './Price';
import { Metadata } from './Metadata';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  source: IntegrationSource;
  sourceAccountId?: string;
  balances: Balance[];
  liquidityPositions?: LiquidityPosition[];
  stakedPositions?: StakedPosition[];
  lendingPositions?: LendingPosition[];
  nfts?: NFT[];
  totalValue?: Price;
  lastSynced?: Date;
  metadata?: Metadata;
}