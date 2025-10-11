import { Chain } from '../enums/Chain';
import { Asset } from './Asset';
import { Balance } from './Balance';
import { Price } from './Price';
import { Metadata } from './Metadata';

/**
 * Proof-of-stake and staking derivative positions with rewards tracking.
 *
 * Represents staked assets in proof-of-stake networks (direct validation) or
 * liquid staking protocols (derivative tokens). Tracks staked amount, earned
 * rewards, lockup periods, APR, and validator information.
 *
 * **Design Pattern:** DeFi position entity for staking operations, supporting
 * both direct staking (ETH validators) and liquid staking (stETH, rETH).
 * Rewards array handles multiple reward tokens common in DeFi protocols.
 *
 * @example
 * ```typescript
 * import { StakedPosition, Chain, AssetType } from '@cygnus-wealth/data-models';
 *
 * // Lido stETH liquid staking position
 * const lidoPosition: StakedPosition = {
 *   id: 'lido-steth-123',
 *   protocol: 'Lido',
 *   chain: Chain.ETHEREUM,
 *   asset: {
 *     id: 'ethereum-eth',
 *     symbol: 'ETH',
 *     name: 'Ethereum',
 *     type: AssetType.CRYPTOCURRENCY,
 *     decimals: 18
 *   },
 *   stakedAmount: '32.0',  // 32 ETH staked
 *   rewards: [
 *     {
 *       assetId: 'ethereum-steth',
 *       asset: {...},
 *       amount: '0.45'  // Accrued staking rewards
 *     }
 *   ],
 *   apr: 4.2,  // 4.2% annual percentage rate
 *   value: {
 *     value: 64000,
 *     currency: 'USD',
 *     timestamp: new Date()
 *   }
 * };
 *
 * // Direct validator staking with lockup
 * const validatorPosition: StakedPosition = {
 *   id: 'validator-eth-456',
 *   protocol: 'Ethereum 2.0',
 *   validator: '0x123abc...',
 *   chain: Chain.ETHEREUM,
 *   asset: {...},
 *   stakedAmount: '32.0',
 *   rewards: [],
 *   lockupPeriod: 2592000,  // 30 days in seconds
 *   unlockDate: new Date('2025-11-10'),
 *   apr: 3.8
 * };
 * ```
 *
 * @since 0.0.1
 * @stability extended
 *
 * @see {@link Asset} for staked asset definition
 * @see {@link Balance} for reward balance structure
 * @see {@link Account} for position aggregation
 */
export interface StakedPosition {
  /** Unique identifier for this staking position */
  id: string;

  /** Staking protocol or platform name (e.g., 'Lido', 'Rocket Pool', 'Ethereum 2.0') */
  protocol: string;

  /** Validator address or ID (for direct staking, optional for liquid staking) */
  validator?: string;

  /** Blockchain network where assets are staked */
  chain: Chain;

  /** Asset being staked (e.g., ETH, SOL, MATIC) */
  asset: Asset;

  /** Amount of asset staked (as string for precision) */
  stakedAmount: string;

  /** Array of reward balances (can be multiple tokens in some protocols) */
  rewards: Balance[];

  /** Lockup period in seconds before unstaking is allowed */
  lockupPeriod?: number;

  /** Date when the lockup expires and unstaking becomes available */
  unlockDate?: Date;

  /** Annual Percentage Rate for rewards (e.g., 4.2 = 4.2%) */
  apr?: number;

  /** Current total value of staked position plus rewards */
  value?: Price;

  /** Protocol-specific metadata (validator performance, slashing history, etc.) */
  metadata?: Metadata;
}
