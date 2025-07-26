import { IntegrationSource } from '../enums/IntegrationSource';
import { Metadata } from './Metadata';

export interface IntegrationCredentials {
  source: IntegrationSource;
  apiKey?: string;
  apiSecret?: string;
  passphrase?: string;
  walletAddress?: string;
  chainId?: string;
  metadata?: Metadata;
}