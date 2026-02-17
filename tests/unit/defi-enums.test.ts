import { describe, it, expect } from 'vitest';
import {
  DeFiPositionType,
  DeFiProtocol,
  DeFiDiscoverySource
} from '../../src/index';

/**
 * Unit tests for DeFi enum types.
 * Coverage target: 100%
 */

describe('DeFi Enum Types', () => {
  describe('DeFiPositionType', () => {
    it('should have all expected position types', () => {
      expect(DeFiPositionType.VAULT).toBe('VAULT');
      expect(DeFiPositionType.LENDING_SUPPLY).toBe('LENDING_SUPPLY');
      expect(DeFiPositionType.LENDING_BORROW).toBe('LENDING_BORROW');
      expect(DeFiPositionType.LIQUIDITY_POOL).toBe('LIQUIDITY_POOL');
      expect(DeFiPositionType.STAKING).toBe('STAKING');
      expect(DeFiPositionType.FARMING).toBe('FARMING');
      expect(DeFiPositionType.PERP_POSITION).toBe('PERP_POSITION');
    });

    it('should have unique values (no duplicates)', () => {
      const values = Object.values(DeFiPositionType);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should have exactly 7 types', () => {
      const values = Object.values(DeFiPositionType);
      expect(values).toHaveLength(7);
    });

    it('should cover all DeFi position categories', () => {
      const yieldTypes = [
        DeFiPositionType.VAULT,
        DeFiPositionType.FARMING
      ];
      const lendingTypes = [
        DeFiPositionType.LENDING_SUPPLY,
        DeFiPositionType.LENDING_BORROW
      ];
      const lpTypes = [DeFiPositionType.LIQUIDITY_POOL];
      const stakingTypes = [DeFiPositionType.STAKING];
      const tradingTypes = [DeFiPositionType.PERP_POSITION];

      const allTypes = [...yieldTypes, ...lendingTypes, ...lpTypes, ...stakingTypes, ...tradingTypes];
      const values = Object.values(DeFiPositionType);
      allTypes.forEach(type => {
        expect(values).toContain(type);
      });
    });
  });

  describe('DeFiProtocol', () => {
    it('should have all expected protocols', () => {
      expect(DeFiProtocol.BEEFY).toBe('BEEFY');
      expect(DeFiProtocol.AAVE).toBe('AAVE');
      expect(DeFiProtocol.UNISWAP).toBe('UNISWAP');
      expect(DeFiProtocol.COMPOUND).toBe('COMPOUND');
      expect(DeFiProtocol.LIDO).toBe('LIDO');
      expect(DeFiProtocol.MARINADE).toBe('MARINADE');
      expect(DeFiProtocol.RAYDIUM).toBe('RAYDIUM');
      expect(DeFiProtocol.JUPITER).toBe('JUPITER');
      expect(DeFiProtocol.ORCA).toBe('ORCA');
      expect(DeFiProtocol.OTHER).toBe('OTHER');
    });

    it('should have unique values (no duplicates)', () => {
      const values = Object.values(DeFiProtocol);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should have exactly 10 protocols', () => {
      const values = Object.values(DeFiProtocol);
      expect(values).toHaveLength(10);
    });

    it('should include EVM protocols', () => {
      const evmProtocols = [
        DeFiProtocol.AAVE,
        DeFiProtocol.UNISWAP,
        DeFiProtocol.COMPOUND,
        DeFiProtocol.LIDO,
        DeFiProtocol.BEEFY
      ];
      const values = Object.values(DeFiProtocol);
      evmProtocols.forEach(p => {
        expect(values).toContain(p);
      });
    });

    it('should include Solana protocols', () => {
      const solanaProtocols = [
        DeFiProtocol.MARINADE,
        DeFiProtocol.RAYDIUM,
        DeFiProtocol.JUPITER,
        DeFiProtocol.ORCA
      ];
      const values = Object.values(DeFiProtocol);
      solanaProtocols.forEach(p => {
        expect(values).toContain(p);
      });
    });

    it('should be extensible via OTHER', () => {
      expect(DeFiProtocol.OTHER).toBe('OTHER');
    });
  });

  describe('DeFiDiscoverySource', () => {
    it('should have both discovery sources', () => {
      expect(DeFiDiscoverySource.WALLET_TOKEN_SCAN).toBe('WALLET_TOKEN_SCAN');
      expect(DeFiDiscoverySource.CONTRACT_QUERY).toBe('CONTRACT_QUERY');
    });

    it('should have unique values (no duplicates)', () => {
      const values = Object.values(DeFiDiscoverySource);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should have exactly 2 sources', () => {
      const values = Object.values(DeFiDiscoverySource);
      expect(values).toHaveLength(2);
    });

    it('should distinguish discovery paths', () => {
      // Wallet scan: found aUSDC in wallet -> infer Aave position
      const walletPath = DeFiDiscoverySource.WALLET_TOKEN_SCAN;
      // Contract query: called Aave getUserAccountData() directly
      const contractPath = DeFiDiscoverySource.CONTRACT_QUERY;

      expect(walletPath).not.toBe(contractPath);
    });
  });

  describe('Contract Tests (Breaking Change Detection)', () => {
    it('should not remove DeFiPositionType values', () => {
      const coreTypes = [
        'VAULT',
        'LENDING_SUPPLY',
        'LENDING_BORROW',
        'LIQUIDITY_POOL',
        'STAKING',
        'FARMING',
        'PERP_POSITION'
      ];
      const values = Object.values(DeFiPositionType);
      coreTypes.forEach(type => {
        expect(values).toContain(type);
      });
    });

    it('should not remove DeFiProtocol values', () => {
      const coreProtocols = [
        'BEEFY',
        'AAVE',
        'UNISWAP',
        'COMPOUND',
        'LIDO',
        'OTHER'
      ];
      const values = Object.values(DeFiProtocol);
      coreProtocols.forEach(p => {
        expect(values).toContain(p);
      });
    });

    it('should not remove DeFiDiscoverySource values', () => {
      const values = Object.values(DeFiDiscoverySource);
      expect(values).toContain('WALLET_TOKEN_SCAN');
      expect(values).toContain('CONTRACT_QUERY');
    });
  });
});
