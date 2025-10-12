import { Chain } from '../enums/Chain';
import { LendingPositionType } from '../enums/LendingPositionType';
import { Asset } from './Asset';
import { Price } from './Price';
import { Metadata } from './Metadata';

/**
 * DeFi money market positions for lending and borrowing.
 *
 * Represents user positions in lending protocols (Aave, Compound, etc.) where
 * users can supply assets to earn interest (SUPPLY) or borrow assets against
 * collateral (BORROW). Tracks amounts, interest rates, health factors, and
 * liquidation thresholds critical for position management.
 *
 * **Design Pattern:** DeFi position entity discriminated by type (SUPPLY vs BORROW).
 * Health factor and liquidation threshold are essential for monitoring borrow
 * position safety and preventing liquidations.
 *
 * @example
 * ```typescript
 * import { LendingPosition, LendingPositionType, Chain } from '@cygnus-wealth/data-models';
 *
 * // Aave supply position (earning interest)
 * const supplyPosition: LendingPosition = {
 *   id: 'aave-supply-usdc-123',
 *   protocol: 'Aave V3',
 *   chain: Chain.ETHEREUM,
 *   type: LendingPositionType.SUPPLY,
 *   asset: {
 *     id: 'ethereum-usdc',
 *     symbol: 'USDC',
 *     name: 'USD Coin',
 *     type: AssetType.CRYPTOCURRENCY,
 *     decimals: 6
 *   },
 *   amount: '50000',  // $50k supplied
 *   apy: 3.5,  // 3.5% APY
 *   accruedInterest: 125.50,
 *   value: {
 *     value: 50125.50,
 *     currency: 'USD',
 *     timestamp: new Date()
 *   }
 * };
 *
 * // Aave borrow position (paying interest)
 * const borrowPosition: LendingPosition = {
 *   id: 'aave-borrow-dai-456',
 *   protocol: 'Aave V3',
 *   chain: Chain.ETHEREUM,
 *   type: LendingPositionType.BORROW,
 *   asset: {
 *     id: 'ethereum-dai',
 *     symbol: 'DAI',
 *     name: 'Dai Stablecoin',
 *     type: AssetType.CRYPTOCURRENCY,
 *     decimals: 18
 *   },
 *   amount: '30000',  // $30k borrowed
 *   apy: 5.2,  // 5.2% borrow rate
 *   accruedInterest: -85.30,  // Interest owed
 *   healthFactor: 2.5,  // > 1.0 = safe
 *   liquidationThreshold: 0.85,  // 85% LTV
 *   value: {
 *     value: -30085.30,  // Negative for debt
 *     currency: 'USD',
 *     timestamp: new Date()
 *   }
 * };
 * ```
 *
 * @since 0.0.1
 * @stability extended
 *
 * @see {@link LendingPositionType} for SUPPLY vs BORROW discrimination
 * @see {@link Asset} for lent/borrowed asset definition
 * @see {@link Account} for position aggregation
 */
export interface LendingPosition {
  /** Unique identifier for this lending position */
  id: string;

  /** Lending protocol name (e.g., 'Aave V3', 'Compound', 'Venus') */
  protocol: string;

  /** Blockchain network where the lending position exists */
  chain: Chain;

  /** Position type: SUPPLY (lender) or BORROW (borrower) */
  type: LendingPositionType;

  /** Asset being supplied or borrowed */
  asset: Asset;

  /** Amount supplied or borrowed (as string for precision) */
  amount: string;

  /** Annual Percentage Yield (for supply) or Rate (for borrow) (e.g., 3.5 = 3.5%) */
  apy?: number;

  /** Interest accrued (positive for supply, negative for borrow) */
  accruedInterest?: number;

  /** Health factor for borrow positions (ratio of collateral to debt, \>1.0 = safe) */
  healthFactor?: number;

  /** Liquidation threshold as ratio (0.0-1.0, e.g., 0.85 = 85% LTV before liquidation) */
  liquidationThreshold?: number;

  /** Current total value of position (positive for supply, negative for borrow debt) */
  value?: Price;

  /** Protocol-specific metadata (collateral assets, liquidation price, etc.) */
  metadata?: Metadata;
}
