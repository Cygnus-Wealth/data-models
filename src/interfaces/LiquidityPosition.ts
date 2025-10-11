import { Chain } from '../enums/Chain';
import { Balance } from './Balance';
import { Price } from './Price';
import { Metadata } from './Metadata';

/**
 * DEX liquidity pool position tracking LP tokens and performance.
 *
 * Represents user's position in automated market maker (AMM) liquidity pools
 * across various DEX protocols (Uniswap, Curve, Balancer, etc.). Tracks deposited
 * tokens, LP token ownership, pool share, earned fees, and impermanent loss.
 *
 * **Design Pattern:** DeFi position entity capturing both the underlying tokens
 * deposited and the LP token representation, along with performance metrics
 * specific to liquidity provision.
 *
 * @example
 * ```typescript
 * import { LiquidityPosition, Chain } from '@cygnus-wealth/data-models';
 *
 * // Uniswap V2 ETH/USDC pool position
 * const uniswapPosition: LiquidityPosition = {
 *   id: 'uniswap-eth-usdc-123',
 *   protocol: 'Uniswap V2',
 *   poolAddress: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
 *   poolName: 'ETH/USDC',
 *   chain: Chain.ETHEREUM,
 *   tokens: [
 *     {
 *       assetId: 'ethereum-eth',
 *       asset: {...},
 *       amount: '5.0'
 *     },
 *     {
 *       assetId: 'ethereum-usdc',
 *       asset: {...},
 *       amount: '10000'
 *     }
 *   ],
 *   lpTokenBalance: '707.106781186548',  // LP token amount
 *   share: 0.05,  // 5% of the pool
 *   value: {
 *     value: 20000,
 *     currency: 'USD',
 *     timestamp: new Date()
 *   },
 *   feesEarned: 150.50,  // $150.50 earned in fees
 *   impermanentLoss: -25.30  // -$25.30 IL
 * };
 * ```
 *
 * @since 0.0.1
 * @stability extended
 *
 * @see {@link Balance} for token balance structure
 * @see {@link Account} for position aggregation
 */
export interface LiquidityPosition {
  /** Unique identifier for this liquidity position */
  id: string;

  /** DEX protocol name (e.g., 'Uniswap V3', 'Curve', 'Balancer V2') */
  protocol: string;

  /** Smart contract address of the liquidity pool */
  poolAddress: string;

  /** Human-readable pool name (e.g., 'ETH/USDC', 'stETH/ETH') */
  poolName: string;

  /** Blockchain network where the pool exists */
  chain: Chain;

  /** Array of token balances deposited in the pool (typically 2-8 tokens) */
  tokens: Balance[];

  /** Amount of LP tokens held (represents pool share) */
  lpTokenBalance?: string;

  /** Percentage of total pool owned (0.0-1.0, e.g., 0.05 = 5%) */
  share?: number;

  /** Current total value of the position (sum of all tokens) */
  value?: Price;

  /** Total trading fees earned from this position (in value.currency) */
  feesEarned?: number;

  /** Impermanent loss compared to holding tokens (negative = loss, positive = gain) */
  impermanentLoss?: number;

  /** Protocol-specific metadata (pool version, fee tier, range bounds, etc.) */
  metadata?: Metadata;
}
