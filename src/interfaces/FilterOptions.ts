import { Chain } from '../enums/Chain';
import { AssetType } from '../enums/AssetType';
import { IntegrationSource } from '../enums/IntegrationSource';
import { TimeRange } from '../types/TimeRange';

export interface FilterOptions {
  chains?: Chain[];
  assetTypes?: AssetType[];
  sources?: IntegrationSource[];
  timeRange?: TimeRange;
  minValue?: number;
  maxValue?: number;
}