import { AccountType } from '../enums/AccountType';
import { IntegrationSource } from '../enums/IntegrationSource';
import { Balance } from './Balance';
import { LiquidityPosition } from './LiquidityPosition';
import { StakedPosition } from './StakedPosition';
import { LendingPosition } from './LendingPosition';
import { VaultPosition } from './VaultPosition';
import { NFT } from './NFT';
import { Price } from './Price';
import { Metadata } from './Metadata';

/**
 * Aggregate container for all holdings from a single source.
 *
 * Represents a complete account (wallet, CEX account, brokerage, etc.) with all
 * associated balances, DeFi positions, and NFTs. Central aggregation point for
 * calculating total account value and tracking synchronization state.
 *
 * **Design Pattern:** Aggregate root pattern collecting all holdings from one
 * source. Supports flexible position types (balances, liquidity, staking, lending)
 * to accommodate diverse account types (spot, DeFi, wallet).
 *
 * @example
 * ```typescript
 * import { Account, AccountType, IntegrationSource } from '@cygnus-wealth/data-models';
 *
 * // MetaMask wallet account with balances and DeFi positions
 * const walletAccount: Account = {
 *   id: 'metamask-wallet-1',
 *   name: 'Main Wallet',
 *   type: AccountType.WALLET,
 *   source: IntegrationSource.METAMASK,
 *   sourceAccountId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
 *   balances: [
 *     {
 *       assetId: 'ethereum-eth',
 *       asset: {...},
 *       amount: '5.0',
 *       value: { value: 10000, currency: 'USD', timestamp: new Date() }
 *     },
 *     {
 *       assetId: 'ethereum-usdc',
 *       asset: {...},
 *       amount: '15000'
 *     }
 *   ],
 *   liquidityPositions: [
 *     {
 *       id: 'uniswap-eth-usdc-1',
 *       protocol: 'Uniswap V2',
 *       poolName: 'ETH/USDC',
 *       tokens: [...]
 *     }
 *   ],
 *   stakedPositions: [
 *     {
 *       id: 'lido-steth-1',
 *       protocol: 'Lido',
 *       stakedAmount: '2.0',
 *       rewards: [...]
 *     }
 *   ],
 *   totalValue: {
 *     value: 30000,  // Sum of all positions
 *     currency: 'USD',
 *     timestamp: new Date()
 *   },
 *   lastSynced: new Date()
 * };
 *
 * // Kraken CEX spot account
 * const cexAccount: Account = {
 *   id: 'kraken-spot-1',
 *   name: 'Kraken Spot Trading',
 *   type: AccountType.SPOT,
 *   source: IntegrationSource.KRAKEN,
 *   balances: [...],
 *   totalValue: { value: 50000, currency: 'USD', timestamp: new Date() },
 *   lastSynced: new Date()
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link AccountType} for account classification
 * @see {@link IntegrationSource} for source identification
 * @see {@link Balance} for asset holdings
 * @see {@link Portfolio} for multi-account aggregation
 */
export interface Account {
  /** Unique identifier for this account */
  id: string;

  /** User-friendly account name (e.g., 'Main Wallet', 'Trading Account') */
  name: string;

  /** Type of account for categorization and specialized processing */
  type: AccountType;

  /** Data source providing this account's information */
  source: IntegrationSource;

  /** Source-specific account identifier (wallet address, exchange account ID, etc.) */
  sourceAccountId?: string;

  /** Array of asset balances held in this account */
  balances: Balance[];

  /** Array of DEX liquidity positions (for DeFi accounts) */
  liquidityPositions?: LiquidityPosition[];

  /** Array of staking positions (for PoS and liquid staking) */
  stakedPositions?: StakedPosition[];

  /** Array of lending/borrowing positions (for DeFi money markets) */
  lendingPositions?: LendingPosition[];

  /** Array of yield vault positions (for vault deposits) */
  vaultPositions?: VaultPosition[];

  /** Array of NFTs held in this account */
  nfts?: NFT[];

  /** Total value of all holdings in this account (sum of all positions) */
  totalValue?: Price;

  /** Timestamp of last successful data synchronization */
  lastSynced?: Date;

  /** Source-specific metadata (connection status, permissions, etc.) */
  metadata?: Metadata;
}
