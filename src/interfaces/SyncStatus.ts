import { IntegrationSource } from '../enums/IntegrationSource';
import { Metadata } from './Metadata';

export interface SyncStatus {
  source: IntegrationSource;
  accountId: string;
  status: 'IDLE' | 'SYNCING' | 'SUCCESS' | 'ERROR';
  lastSyncTime?: Date;
  lastError?: string;
  itemsSynced?: number;
  metadata?: Metadata;
}