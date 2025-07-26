import { AssetType } from '../enums/AssetType';
import { Chain } from '../enums/Chain';
import { Metadata } from './Metadata';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  decimals?: number;
  contractAddress?: string;
  chain?: Chain;
  logoUrl?: string;
  coingeckoId?: string;
  cmc_id?: string;
  cusip?: string;
  isin?: string;
  metadata?: Metadata;
}