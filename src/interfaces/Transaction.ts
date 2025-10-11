import { TransactionType } from '../enums/TransactionType';
import { Chain } from '../enums/Chain';
import { Asset } from './Asset';
import { Price } from './Price';
import { Metadata } from './Metadata';

/**
 * Universal transaction representation across all sources.
 *
 * Normalized transaction model supporting blockchain transfers, CEX trades,
 * DEX swaps, DeFi operations, and traditional finance transactions. Uses
 * asset flow pattern (assetsIn/assetsOut) to handle complex multi-asset
 * operations like swaps, liquidity provision, and protocol interactions.
 *
 * **Design Pattern:** Event sourcing pattern with asset flow arrays supporting
 * 1:1 transfers, 1:N distributions, N:1 swaps, and N:M complex operations.
 * Status field enables tracking pending and failed transactions.
 *
 * @example
 * ```typescript
 * import { Transaction, TransactionType, Chain } from '@cygnus-wealth/data-models';
 *
 * // Simple blockchain transfer
 * const transfer: Transaction = {
 *   id: 'tx-0x123abc',
 *   accountId: 'wallet-1',
 *   type: TransactionType.TRANSFER_OUT,
 *   status: 'COMPLETED',
 *   hash: '0x123abc...',
 *   chain: Chain.ETHEREUM,
 *   from: '0xSender...',
 *   to: '0xRecipient...',
 *   timestamp: new Date('2025-10-11T10:30:00Z'),
 *   blockNumber: 18500000,
 *   assetsOut: [{
 *     asset: { id: 'ethereum-eth', symbol: 'ETH', ... },
 *     amount: '1.5',
 *     value: { value: 3000, currency: 'USD', timestamp: new Date() }
 *   }],
 *   fees: [{
 *     asset: { id: 'ethereum-eth', symbol: 'ETH', ... },
 *     amount: '0.002',
 *     value: { value: 4, currency: 'USD', timestamp: new Date() }
 *   }]
 * };
 *
 * // DEX swap (ETH -> USDC)
 * const swap: Transaction = {
 *   id: 'tx-0x456def',
 *   accountId: 'wallet-1',
 *   type: TransactionType.SWAP,
 *   status: 'COMPLETED',
 *   hash: '0x456def...',
 *   chain: Chain.ETHEREUM,
 *   timestamp: new Date(),
 *   blockNumber: 18500123,
 *   assetsOut: [{
 *     asset: { id: 'ethereum-eth', symbol: 'ETH', ... },
 *     amount: '2.0'
 *   }],
 *   assetsIn: [{
 *     asset: { id: 'ethereum-usdc', symbol: 'USDC', ... },
 *     amount: '4000'
 *   }],
 *   protocol: 'Uniswap V3',
 *   method: 'swapExactTokensForTokens'
 * };
 *
 * // CEX trade
 * const trade: Transaction = {
 *   id: 'kraken-trade-789',
 *   accountId: 'kraken-spot-1',
 *   type: TransactionType.BUY,
 *   status: 'COMPLETED',
 *   timestamp: new Date(),
 *   assetsOut: [{
 *     asset: { id: 'fiat-usd', symbol: 'USD', ... },
 *     amount: '5000'
 *   }],
 *   assetsIn: [{
 *     asset: { id: 'bitcoin-btc', symbol: 'BTC', ... },
 *     amount: '0.1'
 *   }]
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link TransactionType} for operation classification
 * @see {@link Asset} for asset definitions in flows
 * @see {@link Account} for transaction aggregation
 */
export interface Transaction {
  /** Unique transaction identifier (blockchain hash, CEX order ID, etc.) */
  id: string;

  /** Reference to the Account.id where this transaction occurred */
  accountId: string;

  /** Type of transaction operation */
  type: TransactionType;

  /** Transaction status for lifecycle tracking */
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

  /** Blockchain transaction hash (for on-chain transactions) */
  hash?: string;

  /** Blockchain network where transaction occurred (for on-chain transactions) */
  chain?: Chain;

  /** Sender address (for blockchain transfers) */
  from?: string;

  /** Recipient address (for blockchain transfers) */
  to?: string;

  /** Timestamp when transaction was created or executed */
  timestamp: Date;

  /** Block number where transaction was included (for on-chain transactions) */
  blockNumber?: number;

  /** Assets received in this transaction */
  assetsIn?: Array<{
    /** Asset received */
    asset: Asset;

    /** Amount received (as string for precision) */
    amount: string;

    /** Value at transaction time (optional) */
    value?: Price;
  }>;

  /** Assets sent or consumed in this transaction */
  assetsOut?: Array<{
    /** Asset sent */
    asset: Asset;

    /** Amount sent (as string for precision) */
    amount: string;

    /** Value at transaction time (optional) */
    value?: Price;
  }>;

  /** Transaction fees paid (gas, network fees, exchange fees) */
  fees?: Array<{
    /** Fee asset (ETH for gas, native token for network fees) */
    asset: Asset;

    /** Fee amount (as string for precision) */
    amount: string;

    /** Fee value at transaction time (optional) */
    value?: Price;
  }>;

  /** DeFi protocol or platform involved (e.g., 'Uniswap V3', 'Aave V2') */
  protocol?: string;

  /** Smart contract method called (for on-chain transactions) */
  method?: string;

  /** Source-specific additional data (confirmations, memo, etc.) */
  metadata?: Metadata;
}
