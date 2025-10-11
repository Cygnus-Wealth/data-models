import { TransactionType } from '../enums/TransactionType';
import { Chain } from '../enums/Chain';
import { Asset } from './Asset';
import { Price } from './Price';
import { Metadata } from './Metadata';

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  hash?: string;
  chain?: Chain;
  from?: string;
  to?: string;
  timestamp: Date;
  blockNumber?: number;
  
  // Asset movements
  assetsIn?: Array<{
    asset: Asset;
    amount: string;
    value?: Price;
  }>;

  assetsOut?: Array<{
    asset: Asset;
    amount: string;
    value?: Price;
  }>;
  
  // Fees
  fees?: Array<{
    asset: Asset;
    amount: string;
    value?: Price;
  }>;
  
  // Additional data
  protocol?: string;
  method?: string;
  metadata?: Metadata;
}