import { Account } from './Account';
import { Price } from './Price';
import { PortfolioAsset } from './PortfolioAsset';
import { Metadata } from './Metadata';

export interface Portfolio {
  id: string;
  userId?: string;
  name: string;
  accounts?: Account[];
  items?: PortfolioAsset[];
  totalValue: Price;
  totalValueHistory?: Array<{
    timestamp: Date;
    value: Price;
  }>;
  performance?: {
    day: number;
    week: number;
    month: number;
    year: number;
    all_time: number;
  };
  lastUpdated: Date;
  metadata?: Metadata;
}