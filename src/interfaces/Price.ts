import { IntegrationSource } from '../enums/IntegrationSource';

export interface Price {
  value: number;
  currency: string;
  timestamp: Date;
  source: IntegrationSource;
}