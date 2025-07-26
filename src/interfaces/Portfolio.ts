import { Account } from './Account';
import { Price } from './Price';

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  accounts: Account[];
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
}