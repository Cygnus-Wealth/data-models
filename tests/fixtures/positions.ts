import { LiquidityPosition, StakedPosition, LendingPosition, LendingPositionType, VaultPosition, VaultStrategyType, Chain } from '../../src/index';
import { ethAsset, usdcAsset, solAsset } from './assets';

/**
 * Test fixtures for Position types (LiquidityPosition, StakedPosition, LendingPosition).
 * Provides reusable sample positions for testing.
 */

// Liquidity Positions
export const uniswapLPPosition: LiquidityPosition = {
  id: 'uniswap-eth-usdc-123',
  protocol: 'Uniswap V3',
  poolAddress: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
  poolName: 'ETH/USDC 0.05%',
  chain: Chain.ETHEREUM,
  tokens: [
    {
      assetId: 'ethereum-eth',
      asset: ethAsset,
      amount: '5.0'
    },
    {
      assetId: 'ethereum-usdc',
      asset: usdcAsset,
      amount: '10000.000000'
    }
  ],
  lpTokenBalance: '707.106781186548',
  share: 0.05,
  value: {
    value: 20000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  feesEarned: 150.50,
  impermanentLoss: -25.30
};

export const curveLPPosition: LiquidityPosition = {
  id: 'curve-3pool-456',
  protocol: 'Curve',
  poolAddress: '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7',
  poolName: '3Pool (DAI/USDC/USDT)',
  chain: Chain.ETHEREUM,
  tokens: [
    {
      assetId: 'ethereum-dai',
      asset: {
        id: 'ethereum-dai',
        symbol: 'DAI',
        name: 'Dai Stablecoin',
        type: 'CRYPTOCURRENCY' as const,
        decimals: 18,
        chain: Chain.ETHEREUM
      },
      amount: '10000.0'
    },
    {
      assetId: 'ethereum-usdc',
      asset: usdcAsset,
      amount: '10000.000000'
    },
    {
      assetId: 'ethereum-usdt',
      asset: {
        id: 'ethereum-usdt',
        symbol: 'USDT',
        name: 'Tether USD',
        type: 'CRYPTOCURRENCY' as const,
        decimals: 6,
        chain: Chain.ETHEREUM
      },
      amount: '10000.000000'
    }
  ],
  lpTokenBalance: '29850.123456',
  share: 0.001,
  value: {
    value: 30000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  feesEarned: 85.20,
  impermanentLoss: 0 // Stable pool, minimal IL
};

// Minimal LP position (only required fields)
export const minimalLPPosition: LiquidityPosition = {
  id: 'minimal-lp-1',
  protocol: 'TestDEX',
  poolAddress: '0x123',
  poolName: 'TEST/TOKEN',
  chain: Chain.ETHEREUM,
  tokens: []
};

// Staked Positions
export const ethStakingPosition: StakedPosition = {
  id: 'eth-staking-1',
  protocol: 'Ethereum 2.0',
  chain: Chain.ETHEREUM,
  asset: ethAsset,
  stakedAmount: '32.0',
  rewards: [
    {
      assetId: 'ethereum-eth',
      asset: ethAsset,
      amount: '0.5'
    }
  ],
  apr: 4.5,
  value: {
    value: 64000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  }
};

export const lidoStakingPosition: StakedPosition = {
  id: 'lido-steth-1',
  protocol: 'Lido',
  chain: Chain.ETHEREUM,
  asset: {
    id: 'ethereum-steth',
    symbol: 'stETH',
    name: 'Lido Staked Ether',
    type: 'CRYPTOCURRENCY' as const,
    decimals: 18,
    chain: Chain.ETHEREUM
  },
  stakedAmount: '10.0',
  rewards: [],
  apr: 4.2,
  value: {
    value: 20000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  }
};

export const solStakingPosition: StakedPosition = {
  id: 'solana-staking-1',
  protocol: 'Solana Native',
  validator: 'Validator123abc',
  chain: Chain.SOLANA,
  asset: solAsset,
  stakedAmount: '100.0',
  rewards: [
    {
      assetId: 'solana-sol',
      asset: solAsset,
      amount: '5.0'
    }
  ],
  lockupPeriod: 3,
  unlockDate: new Date('2025-11-11T12:00:00Z'),
  apr: 7.5,
  value: {
    value: 5000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  }
};

// Minimal staked position
export const minimalStakedPosition: StakedPosition = {
  id: 'minimal-stake-1',
  protocol: 'TestStaking',
  chain: Chain.ETHEREUM,
  asset: ethAsset,
  stakedAmount: '1.0',
  rewards: []
};

// Lending Positions
export const aaveSupplyPosition: LendingPosition = {
  id: 'aave-supply-usdc-1',
  protocol: 'Aave V3',
  chain: Chain.ETHEREUM,
  type: LendingPositionType.SUPPLY,
  asset: usdcAsset,
  amount: '50000.000000',
  apy: 3.5,
  accruedInterest: 125.50,
  value: {
    value: 50125.50,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  }
};

export const aaveBorrowPosition: LendingPosition = {
  id: 'aave-borrow-dai-1',
  protocol: 'Aave V3',
  chain: Chain.ETHEREUM,
  type: LendingPositionType.BORROW,
  asset: {
    id: 'ethereum-dai',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    type: 'CRYPTOCURRENCY' as const,
    decimals: 18,
    chain: Chain.ETHEREUM
  },
  amount: '30000.0',
  apy: 5.2,
  accruedInterest: -85.30,
  healthFactor: 2.5,
  liquidationThreshold: 0.85,
  value: {
    value: -30085.30,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  }
};

export const compoundSupplyPosition: LendingPosition = {
  id: 'compound-supply-eth-1',
  protocol: 'Compound V3',
  chain: Chain.ETHEREUM,
  type: LendingPositionType.SUPPLY,
  asset: ethAsset,
  amount: '15.0',
  apy: 2.8,
  accruedInterest: 50.75,
  value: {
    value: 30050.75,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  }
};

// Risky borrow position (low health factor)
export const riskyBorrowPosition: LendingPosition = {
  id: 'aave-borrow-risky-1',
  protocol: 'Aave V3',
  chain: Chain.ETHEREUM,
  type: LendingPositionType.BORROW,
  asset: usdcAsset,
  amount: '45000.000000',
  apy: 6.5,
  accruedInterest: -200.0,
  healthFactor: 1.05, // Close to liquidation
  liquidationThreshold: 0.80,
  value: {
    value: -45200.0,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  }
};

// Minimal lending position
export const minimalLendingPosition: LendingPosition = {
  id: 'minimal-lending-1',
  protocol: 'TestLending',
  chain: Chain.ETHEREUM,
  type: LendingPositionType.SUPPLY,
  asset: ethAsset,
  amount: '1.0'
};

// Vault Positions
export const yearnUsdcVault: VaultPosition = {
  id: 'yearn-usdc-vault-1',
  protocol: 'Yearn V3',
  vaultAddress: '0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE',
  vaultName: 'USDC yVault',
  chain: Chain.ETHEREUM,
  strategyType: VaultStrategyType.YIELD_AGGREGATOR,
  depositAsset: usdcAsset,
  depositedAmount: '50000.000000',
  shareBalance: '48500.000000',
  pricePerShare: 1.0309,
  apy: 8.5,
  value: {
    value: 50000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  }
};

export const beefyLpVault: VaultPosition = {
  id: 'beefy-arb-eth-usdc-1',
  protocol: 'Beefy',
  vaultAddress: '0xDeadBeef1234567890abcdef1234567890abcdef',
  vaultName: 'mooArbETH-USDC',
  chain: Chain.ARBITRUM,
  strategyType: VaultStrategyType.LIQUIDITY_PROVISION,
  depositAsset: ethAsset,
  depositedAmount: '2.5',
  shareBalance: '2.35',
  pricePerShare: 1.0638,
  apy: 12.3,
  value: {
    value: 5000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  },
  metadata: {
    'beefy:tvl': 15000000,
    'beefy:harvestFrequency': 'daily'
  }
};

export const sommelierStructuredVault: VaultPosition = {
  id: 'sommelier-eth-call-1',
  protocol: 'Sommelier',
  vaultAddress: '0x1234567890abcdef1234567890abcdef12345678',
  vaultName: 'Real Yield ETH',
  chain: Chain.ETHEREUM,
  strategyType: VaultStrategyType.STRUCTURED_PRODUCT,
  depositAsset: ethAsset,
  depositedAmount: '10.0',
  shareBalance: '9.8',
  pricePerShare: 1.0204,
  apy: 15.2,
  value: {
    value: 20000,
    currency: 'USD',
    timestamp: new Date('2025-10-11T12:00:00Z')
  }
};

// Minimal vault position (only required fields)
export const minimalVaultPosition: VaultPosition = {
  id: 'minimal-vault-1',
  protocol: 'TestVault',
  vaultAddress: '0xabc',
  vaultName: 'Test Vault',
  chain: Chain.ETHEREUM,
  strategyType: VaultStrategyType.OTHER,
  depositAsset: ethAsset,
  depositedAmount: '1.0'
};

// All positions arrays for bulk testing
export const allLiquidityPositions: LiquidityPosition[] = [
  uniswapLPPosition,
  curveLPPosition,
  minimalLPPosition
];

export const allStakedPositions: StakedPosition[] = [
  ethStakingPosition,
  lidoStakingPosition,
  solStakingPosition,
  minimalStakedPosition
];

export const allLendingPositions: LendingPosition[] = [
  aaveSupplyPosition,
  aaveBorrowPosition,
  compoundSupplyPosition,
  riskyBorrowPosition,
  minimalLendingPosition
];

export const allVaultPositions: VaultPosition[] = [
  yearnUsdcVault,
  beefyLpVault,
  sommelierStructuredVault,
  minimalVaultPosition
];
