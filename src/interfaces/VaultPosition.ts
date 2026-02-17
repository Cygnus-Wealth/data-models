import { Chain } from '../enums/Chain';
import { VaultStrategyType } from '../enums/VaultStrategyType';
import { DeFiDiscoverySource } from '../enums/DeFiDiscoverySource';
import { Asset } from './Asset';
import { Price } from './Price';
import { Metadata } from './Metadata';

/**
 * Yield vault deposit position tracking shares and performance.
 *
 * Represents user deposits in yield-generating vaults (Yearn, Beefy, Harvest,
 * Sommelier, etc.) where assets are deposited into a vault contract that
 * executes automated strategies. Tracks deposited amount, vault share tokens,
 * APY, and underlying asset.
 *
 * **Design Pattern:** DeFi position entity for vault operations. Vaults issue
 * share tokens representing proportional ownership. The share price (pricePerShare)
 * increases over time as the vault earns yield, meaning the same number of shares
 * becomes redeemable for more underlying tokens.
 *
 * @example
 * ```typescript
 * import { VaultPosition, VaultStrategyType, Chain, AssetType } from '@cygnus-wealth/data-models';
 *
 * // Yearn USDC vault deposit
 * const yearnPosition: VaultPosition = {
 *   id: 'yearn-usdc-vault-123',
 *   protocol: 'Yearn V3',
 *   vaultAddress: '0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE',
 *   vaultName: 'USDC yVault',
 *   chain: Chain.ETHEREUM,
 *   strategyType: VaultStrategyType.YIELD_AGGREGATOR,
 *   depositAsset: {
 *     id: 'ethereum-usdc',
 *     symbol: 'USDC',
 *     name: 'USD Coin',
 *     type: AssetType.CRYPTOCURRENCY,
 *     decimals: 6
 *   },
 *   depositedAmount: '50000.000000',
 *   shareBalance: '48500.000000',
 *   pricePerShare: 1.0309,
 *   apy: 8.5,
 *   value: {
 *     value: 50000,
 *     currency: 'USD',
 *     timestamp: new Date()
 *   }
 * };
 *
 * // Beefy auto-compounder on Arbitrum
 * const beefyPosition: VaultPosition = {
 *   id: 'beefy-arb-eth-usdc-456',
 *   protocol: 'Beefy',
 *   vaultAddress: '0xDeadBeef...',
 *   vaultName: 'mooArbETH-USDC',
 *   chain: Chain.ARBITRUM,
 *   strategyType: VaultStrategyType.LIQUIDITY_PROVISION,
 *   depositAsset: {
 *     id: 'arbitrum-eth',
 *     symbol: 'ETH',
 *     name: 'Ethereum',
 *     type: AssetType.CRYPTOCURRENCY,
 *     decimals: 18
 *   },
 *   depositedAmount: '2.5',
 *   shareBalance: '2.35',
 *   pricePerShare: 1.0638,
 *   apy: 12.3,
 *   value: {
 *     value: 5000,
 *     currency: 'USD',
 *     timestamp: new Date()
 *   }
 * };
 * ```
 *
 * @since 1.2.0
 * @stability extended
 *
 * @see {@link VaultStrategyType} for vault strategy classification
 * @see {@link Asset} for deposit asset definition
 * @see {@link Account} for position aggregation
 */
export interface VaultPosition {
  /** Unique identifier for this vault position */
  id: string;

  /** Vault protocol name (e.g., 'Yearn V3', 'Beefy', 'Harvest', 'Sommelier') */
  protocol: string;

  /** Smart contract address of the vault */
  vaultAddress: string;

  /** Human-readable vault name (e.g., 'USDC yVault', 'mooArbETH-USDC') */
  vaultName: string;

  /** Blockchain network where the vault exists */
  chain: Chain;

  /** Classification of the vault's underlying strategy */
  strategyType: VaultStrategyType;

  /** Asset deposited into the vault (the underlying token) */
  depositAsset: Asset;

  /** Amount of underlying asset deposited (as string for precision) */
  depositedAmount: string;

  /** Amount of vault share tokens held (as string for precision) */
  shareBalance?: string;

  /** Current price per share in terms of deposit asset (e.g., 1.03 means 3% profit) */
  pricePerShare?: number;

  /** Annual Percentage Yield for the vault (e.g., 8.5 = 8.5%) */
  apy?: number;

  /** Current total value of the vault position */
  value?: Price;

  /** How this position was discovered during portfolio scanning */
  discoverySource?: DeFiDiscoverySource;

  /** Protocol-specific metadata (strategy details, harvest frequency, TVL, etc.) */
  metadata?: Metadata;
}
