import { Chain } from '../enums/Chain';
import { DeFiPositionType } from '../enums/DeFiPositionType';
import { DeFiProtocol } from '../enums/DeFiProtocol';
import { DeFiDiscoverySource } from '../enums/DeFiDiscoverySource';
import { AccountId } from '../types/AccountId';
import { Balance } from './Balance';
import { Price } from './Price';
import { Metadata } from './Metadata';

/**
 * Base interface for all DeFi positions across protocols and chains.
 *
 * Provides a unified shape for any DeFi position — vaults, lending, liquidity
 * pools, staking, farming, and perp positions. Concrete subtypes
 * ({@link VaultPosition}, {@link LendingPosition}, {@link LiquidityPosition},
 * {@link StakedPosition}) add protocol-specific fields.
 *
 * **Discovery Paths:**
 * - `WALLET_TOKEN_SCAN` — position inferred from receipt tokens in wallet
 * - `CONTRACT_QUERY` — position read from protocol contract state
 *
 * @example
 * ```typescript
 * import {
 *   DeFiPosition,
 *   DeFiPositionType,
 *   DeFiProtocol,
 *   DeFiDiscoverySource,
 *   Chain
 * } from '@cygnus-wealth/data-models';
 *
 * const position: DeFiPosition = {
 *   id: 'aave-supply-usdc-1',
 *   type: DeFiPositionType.LENDING_SUPPLY,
 *   protocol: DeFiProtocol.AAVE,
 *   chain: Chain.ETHEREUM,
 *   underlyingAssets: [{
 *     assetId: 'ethereum-usdc',
 *     asset: { id: 'ethereum-usdc', symbol: 'USDC', name: 'USD Coin', type: 'CRYPTOCURRENCY', decimals: 6 },
 *     amount: '50000'
 *   }],
 *   value: { value: 50125.50, currency: 'USD', timestamp: new Date() },
 *   apy: 3.5,
 *   rewards: [],
 *   discoverySource: DeFiDiscoverySource.CONTRACT_QUERY
 * };
 * ```
 *
 * @since 1.3.0
 * @stability extended
 *
 * @see {@link VaultPosition} for vault-specific fields
 * @see {@link LendingPosition} for lending-specific fields
 * @see {@link LiquidityPosition} for LP-specific fields
 * @see {@link StakedPosition} for staking-specific fields
 */
export interface DeFiPosition {
  /** Unique identifier for this position */
  id: string;

  /** Classification of the DeFi position */
  type: DeFiPositionType;

  /** Protocol where the position exists */
  protocol: DeFiProtocol;

  /** Blockchain network where the position exists */
  chain: Chain;

  /** Underlying assets in this position (tokens deposited, staked, or provided) */
  underlyingAssets: Balance[];

  /** Current total value of the position */
  value?: Price;

  /** Annual Percentage Yield or Rate (e.g., 8.5 = 8.5%) */
  apy?: number;

  /** Earned rewards (claimable or accrued incentive tokens) */
  rewards: Balance[];

  /** How this position was discovered during portfolio scanning */
  discoverySource?: DeFiDiscoverySource;

  /** Account identifier for multi-wallet attribution (alongside ownerAddress) */
  accountId?: AccountId;

  /** Protocol-specific metadata (version, contract addresses, TVL, etc.) */
  metadata?: Metadata;
}
