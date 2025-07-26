import { Chain } from '../enums/Chain';

export type AssetIdentifier = {
  symbol?: string;
  contractAddress?: string;
  chain?: Chain;
  assetId?: string;
};