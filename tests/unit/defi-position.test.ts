import { describe, it, expect } from 'vitest';
import {
  DeFiPosition,
  DeFiPositionType,
  DeFiProtocol,
  DeFiDiscoverySource,
  Chain,
  VaultPosition,
  LendingPosition,
  LiquidityPosition,
  StakedPosition
} from '../../src/index';
import { ethAsset, usdcAsset } from '../fixtures/assets';

/**
 * Unit tests for DeFiPosition base interface and discoverySource on subtypes.
 * Coverage target: 95%
 */

describe('DeFiPosition Interface', () => {
  it('should create a base DeFiPosition with all required fields', () => {
    const position: DeFiPosition = {
      id: 'defi-pos-1',
      type: DeFiPositionType.LENDING_SUPPLY,
      protocol: DeFiProtocol.AAVE,
      chain: Chain.ETHEREUM,
      underlyingAssets: [
        {
          assetId: 'ethereum-usdc',
          asset: usdcAsset,
          amount: '50000'
        }
      ],
      rewards: []
    };

    expect(position.id).toBe('defi-pos-1');
    expect(position.type).toBe(DeFiPositionType.LENDING_SUPPLY);
    expect(position.protocol).toBe(DeFiProtocol.AAVE);
    expect(position.chain).toBe(Chain.ETHEREUM);
    expect(position.underlyingAssets).toHaveLength(1);
    expect(position.rewards).toHaveLength(0);
  });

  it('should support all optional fields', () => {
    const position: DeFiPosition = {
      id: 'defi-pos-2',
      type: DeFiPositionType.VAULT,
      protocol: DeFiProtocol.BEEFY,
      chain: Chain.ARBITRUM,
      underlyingAssets: [
        {
          assetId: 'ethereum-eth',
          asset: ethAsset,
          amount: '10.0'
        }
      ],
      value: {
        value: 20000,
        currency: 'USD',
        timestamp: new Date()
      },
      apy: 12.3,
      rewards: [
        {
          assetId: 'ethereum-eth',
          asset: ethAsset,
          amount: '0.1'
        }
      ],
      discoverySource: DeFiDiscoverySource.CONTRACT_QUERY,
      metadata: {
        'beefy:vaultId': 'arb-eth-usdc'
      }
    };

    expect(position.value?.value).toBe(20000);
    expect(position.apy).toBe(12.3);
    expect(position.rewards).toHaveLength(1);
    expect(position.discoverySource).toBe(DeFiDiscoverySource.CONTRACT_QUERY);
    expect(position.metadata?.['beefy:vaultId']).toBe('arb-eth-usdc');
  });

  it('should support WALLET_TOKEN_SCAN discovery source', () => {
    const position: DeFiPosition = {
      id: 'wallet-discovered-1',
      type: DeFiPositionType.LENDING_SUPPLY,
      protocol: DeFiProtocol.AAVE,
      chain: Chain.ETHEREUM,
      underlyingAssets: [{
        assetId: 'ethereum-usdc',
        asset: usdcAsset,
        amount: '50000'
      }],
      rewards: [],
      discoverySource: DeFiDiscoverySource.WALLET_TOKEN_SCAN
    };

    expect(position.discoverySource).toBe(DeFiDiscoverySource.WALLET_TOKEN_SCAN);
  });

  it('should support all DeFiPositionType values as type discriminator', () => {
    const types = [
      DeFiPositionType.VAULT,
      DeFiPositionType.LENDING_SUPPLY,
      DeFiPositionType.LENDING_BORROW,
      DeFiPositionType.LIQUIDITY_POOL,
      DeFiPositionType.STAKING,
      DeFiPositionType.FARMING,
      DeFiPositionType.PERP_POSITION
    ];

    types.forEach(posType => {
      const position: DeFiPosition = {
        id: `test-${posType}`,
        type: posType,
        protocol: DeFiProtocol.OTHER,
        chain: Chain.ETHEREUM,
        underlyingAssets: [],
        rewards: []
      };
      expect(position.type).toBe(posType);
    });
  });

  it('should support all DeFiProtocol values', () => {
    const protocols = [
      DeFiProtocol.BEEFY,
      DeFiProtocol.AAVE,
      DeFiProtocol.UNISWAP,
      DeFiProtocol.COMPOUND,
      DeFiProtocol.LIDO,
      DeFiProtocol.MARINADE,
      DeFiProtocol.RAYDIUM,
      DeFiProtocol.JUPITER,
      DeFiProtocol.ORCA,
      DeFiProtocol.OTHER
    ];

    protocols.forEach(proto => {
      const position: DeFiPosition = {
        id: `test-${proto}`,
        type: DeFiPositionType.VAULT,
        protocol: proto,
        chain: Chain.ETHEREUM,
        underlyingAssets: [],
        rewards: []
      };
      expect(position.protocol).toBe(proto);
    });
  });

  it('should support multiple underlying assets', () => {
    const lpPosition: DeFiPosition = {
      id: 'lp-multi-asset-1',
      type: DeFiPositionType.LIQUIDITY_POOL,
      protocol: DeFiProtocol.UNISWAP,
      chain: Chain.ETHEREUM,
      underlyingAssets: [
        { assetId: 'ethereum-eth', asset: ethAsset, amount: '5.0' },
        { assetId: 'ethereum-usdc', asset: usdcAsset, amount: '10000' }
      ],
      rewards: []
    };

    expect(lpPosition.underlyingAssets).toHaveLength(2);
    expect(lpPosition.underlyingAssets[0].asset.symbol).toBe('ETH');
    expect(lpPosition.underlyingAssets[1].asset.symbol).toBe('USDC');
  });

  it('should support Solana-based positions', () => {
    const solPosition: DeFiPosition = {
      id: 'sol-staking-1',
      type: DeFiPositionType.STAKING,
      protocol: DeFiProtocol.MARINADE,
      chain: Chain.SOLANA,
      underlyingAssets: [],
      rewards: [],
      discoverySource: DeFiDiscoverySource.CONTRACT_QUERY
    };

    expect(solPosition.chain).toBe(Chain.SOLANA);
    expect(solPosition.protocol).toBe(DeFiProtocol.MARINADE);
  });
});

describe('Discovery Source on Position Subtypes', () => {
  it('should support discoverySource on VaultPosition', () => {
    const vault: VaultPosition = {
      id: 'vault-ds-1',
      protocol: 'Beefy',
      vaultAddress: '0xabc',
      vaultName: 'Test Vault',
      chain: Chain.ARBITRUM,
      strategyType: 'YIELD_AGGREGATOR' as const,
      depositAsset: ethAsset,
      depositedAmount: '1.0',
      discoverySource: DeFiDiscoverySource.WALLET_TOKEN_SCAN
    };

    expect(vault.discoverySource).toBe(DeFiDiscoverySource.WALLET_TOKEN_SCAN);
  });

  it('should support discoverySource on LendingPosition', () => {
    const lending: LendingPosition = {
      id: 'lending-ds-1',
      protocol: 'Aave V3',
      chain: Chain.ETHEREUM,
      type: 'SUPPLY' as const,
      asset: usdcAsset,
      amount: '50000',
      discoverySource: DeFiDiscoverySource.CONTRACT_QUERY
    };

    expect(lending.discoverySource).toBe(DeFiDiscoverySource.CONTRACT_QUERY);
  });

  it('should support discoverySource on LiquidityPosition', () => {
    const lp: LiquidityPosition = {
      id: 'lp-ds-1',
      protocol: 'Uniswap V3',
      poolAddress: '0xabc',
      poolName: 'ETH/USDC',
      chain: Chain.ETHEREUM,
      tokens: [],
      discoverySource: DeFiDiscoverySource.WALLET_TOKEN_SCAN
    };

    expect(lp.discoverySource).toBe(DeFiDiscoverySource.WALLET_TOKEN_SCAN);
  });

  it('should support discoverySource on StakedPosition', () => {
    const staked: StakedPosition = {
      id: 'staked-ds-1',
      protocol: 'Lido',
      chain: Chain.ETHEREUM,
      asset: ethAsset,
      stakedAmount: '32.0',
      rewards: [],
      discoverySource: DeFiDiscoverySource.CONTRACT_QUERY
    };

    expect(staked.discoverySource).toBe(DeFiDiscoverySource.CONTRACT_QUERY);
  });

  it('should leave discoverySource undefined when not set', () => {
    const vault: VaultPosition = {
      id: 'vault-no-ds',
      protocol: 'Test',
      vaultAddress: '0x123',
      vaultName: 'Test',
      chain: Chain.ETHEREUM,
      strategyType: 'OTHER' as const,
      depositAsset: ethAsset,
      depositedAmount: '1.0'
    };

    expect(vault.discoverySource).toBeUndefined();
  });
});
