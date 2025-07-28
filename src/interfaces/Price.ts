import { IntegrationSource } from '../enums/IntegrationSource';

export interface Price {
  value?: number;
  amount?: number;
  currency: string;
  timestamp: Date;
  source?: IntegrationSource;
}