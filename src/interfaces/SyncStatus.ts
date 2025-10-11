import { IntegrationSource } from '../enums/IntegrationSource';
import { Metadata } from './Metadata';

/**
 * Track data synchronization state for accounts and integrations.
 *
 * Monitors the status and history of data synchronization operations from external
 * sources (CEX, DEX, wallets). Essential for UI loading states, error handling,
 * and determining data freshness.
 *
 * **Design Pattern:** State machine pattern with four states (IDLE, SYNCING, SUCCESS, ERROR)
 * tracking both current status and historical sync information for troubleshooting.
 *
 * @example
 * ```typescript
 * import { SyncStatus, IntegrationSource } from '@cygnus-wealth/data-models';
 *
 * // Successful sync status
 * const successStatus: SyncStatus = {
 *   source: IntegrationSource.KRAKEN,
 *   accountId: 'kraken-spot-1',
 *   status: 'SUCCESS',
 *   lastSyncTime: new Date('2025-10-11T10:30:00Z'),
 *   itemsSynced: 150  // 150 items fetched
 * };
 *
 * // Active syncing status
 * const syncingStatus: SyncStatus = {
 *   source: IntegrationSource.METAMASK,
 *   accountId: 'wallet-1',
 *   status: 'SYNCING',
 *   lastSyncTime: new Date('2025-10-11T10:25:00Z')
 * };
 *
 * // Error status with details
 * const errorStatus: SyncStatus = {
 *   source: IntegrationSource.COINBASE,
 *   accountId: 'coinbase-spot-1',
 *   status: 'ERROR',
 *   lastSyncTime: new Date('2025-10-11T10:20:00Z'),
 *   lastError: 'Rate limit exceeded. Retry after 60 seconds.',
 *   itemsSynced: 0
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link IntegrationSource} for data source identification
 * @see {@link Account} for account synchronization
 */
export interface SyncStatus {
  /** Data source being synchronized */
  source: IntegrationSource;

  /** Reference to Account.id being synchronized */
  accountId: string;

  /** Current synchronization status */
  status: 'IDLE' | 'SYNCING' | 'SUCCESS' | 'ERROR';

  /** Timestamp of last sync attempt (successful or failed) */
  lastSyncTime?: Date;

  /** Error message from last failed sync attempt */
  lastError?: string;

  /** Number of items successfully fetched in last sync */
  itemsSynced?: number;

  /** Source-specific metadata (retry count, rate limit info, etc.) */
  metadata?: Metadata;
}
