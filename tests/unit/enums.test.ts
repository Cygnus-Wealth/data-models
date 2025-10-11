import { describe, it, expect } from 'vitest';
import {
  AssetType,
  Chain,
  IntegrationSource,
  TransactionType,
  AccountType,
  LendingPositionType
} from '../../src/index';

/**
 * Unit tests for all Enum types.
 * Coverage target: 100%
 *
 * Tests enum uniqueness, no duplicate values, and contract stability.
 */

describe('Enum Types', () => {
  describe('AssetType', () => {
    it('should have all expected asset types', () => {
      expect(AssetType.CRYPTOCURRENCY).toBe('CRYPTOCURRENCY');
      expect(AssetType.STOCK).toBe('STOCK');
      expect(AssetType.ETF).toBe('ETF');
      expect(AssetType.NFT).toBe('NFT');
      expect(AssetType.BOND).toBe('BOND');
      expect(AssetType.FIAT).toBe('FIAT');
      expect(AssetType.COMMODITY).toBe('COMMODITY');
      expect(AssetType.DERIVATIVE).toBe('DERIVATIVE');
      expect(AssetType.LIQUIDITY_POOL).toBe('LIQUIDITY_POOL');
      expect(AssetType.OTHER).toBe('OTHER');
    });

    it('should have unique values (no duplicates)', () => {
      const values = Object.values(AssetType);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should have at least 10 types', () => {
      const values = Object.values(AssetType);
      expect(values.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('Chain', () => {
    it('should have all expected chains', () => {
      expect(Chain.ETHEREUM).toBe('ETHEREUM');
      expect(Chain.POLYGON).toBe('POLYGON');
      expect(Chain.ARBITRUM).toBe('ARBITRUM');
      expect(Chain.OPTIMISM).toBe('OPTIMISM');
      expect(Chain.AVALANCHE).toBe('AVALANCHE');
      expect(Chain.BSC).toBe('BSC');
      expect(Chain.BASE).toBe('BASE');
      expect(Chain.SOLANA).toBe('SOLANA');
      expect(Chain.SUI).toBe('SUI');
      expect(Chain.BITCOIN).toBe('BITCOIN');
      expect(Chain.OTHER).toBe('OTHER');
    });

    it('should have unique values (no duplicates)', () => {
      const values = Object.values(Chain);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should support chain ID mapping example', () => {
      // Example from JSDoc
      const chainIdMap: Record<number, Chain> = {
        1: Chain.ETHEREUM,
        137: Chain.POLYGON,
        42161: Chain.ARBITRUM,
        10: Chain.OPTIMISM,
        43114: Chain.AVALANCHE,
        56: Chain.BSC,
        8453: Chain.BASE
      };

      expect(chainIdMap[1]).toBe(Chain.ETHEREUM);
      expect(chainIdMap[137]).toBe(Chain.POLYGON);
      expect(chainIdMap[8453]).toBe(Chain.BASE);
    });

    it('should include major EVM chains', () => {
      const evmChains = [
        Chain.ETHEREUM,
        Chain.POLYGON,
        Chain.ARBITRUM,
        Chain.OPTIMISM,
        Chain.BASE,
        Chain.BSC,
        Chain.AVALANCHE
      ];

      evmChains.forEach(chain => {
        expect(Object.values(Chain)).toContain(chain);
      });
    });

    it('should include alternative L1 chains', () => {
      const altL1Chains = [Chain.SOLANA, Chain.SUI, Chain.BITCOIN];

      altL1Chains.forEach(chain => {
        expect(Object.values(Chain)).toContain(chain);
      });
    });
  });

  describe('IntegrationSource', () => {
    it('should have all expected integration sources', () => {
      // CEX sources
      expect(IntegrationSource.ROBINHOOD).toBe('ROBINHOOD');
      expect(IntegrationSource.KRAKEN).toBe('KRAKEN');
      expect(IntegrationSource.COINBASE).toBe('COINBASE');
      expect(IntegrationSource.BINANCE).toBe('BINANCE');
      // DEX sources
      expect(IntegrationSource.UNISWAP).toBe('UNISWAP');
      expect(IntegrationSource.SUSHISWAP).toBe('SUSHISWAP');
      expect(IntegrationSource.PANCAKESWAP).toBe('PANCAKESWAP');
      expect(IntegrationSource.CURVE).toBe('CURVE');
      expect(IntegrationSource.BALANCER).toBe('BALANCER');
      // Wallet sources
      expect(IntegrationSource.METAMASK).toBe('METAMASK');
      expect(IntegrationSource.RABBY).toBe('RABBY');
      expect(IntegrationSource.PHANTOM).toBe('PHANTOM');
      expect(IntegrationSource.SLUSH).toBe('SLUSH');
      expect(IntegrationSource.SUIET).toBe('SUIET');
      // Other sources
      expect(IntegrationSource.MANUAL_ENTRY).toBe('MANUAL_ENTRY');
      expect(IntegrationSource.BLOCKCHAIN_DIRECT).toBe('BLOCKCHAIN_DIRECT');
      expect(IntegrationSource.OTHER).toBe('OTHER');
    });

    it('should have unique values (no duplicates)', () => {
      const values = Object.values(IntegrationSource);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should include all CEX sources', () => {
      const cexSources = [
        IntegrationSource.ROBINHOOD,
        IntegrationSource.KRAKEN,
        IntegrationSource.COINBASE,
        IntegrationSource.BINANCE
      ];

      cexSources.forEach(source => {
        expect(Object.values(IntegrationSource)).toContain(source);
      });
    });

    it('should include all DEX sources', () => {
      const dexSources = [
        IntegrationSource.UNISWAP,
        IntegrationSource.SUSHISWAP,
        IntegrationSource.PANCAKESWAP,
        IntegrationSource.CURVE,
        IntegrationSource.BALANCER
      ];

      dexSources.forEach(source => {
        expect(Object.values(IntegrationSource)).toContain(source);
      });
    });

    it('should include all wallet sources', () => {
      const walletSources = [
        IntegrationSource.METAMASK,
        IntegrationSource.RABBY,
        IntegrationSource.PHANTOM,
        IntegrationSource.SLUSH,
        IntegrationSource.SUIET
      ];

      walletSources.forEach(source => {
        expect(Object.values(IntegrationSource)).toContain(source);
      });
    });

    it('should include manual and direct blockchain sources', () => {
      const otherSources = [
        IntegrationSource.MANUAL_ENTRY,
        IntegrationSource.BLOCKCHAIN_DIRECT,
        IntegrationSource.OTHER
      ];

      otherSources.forEach(source => {
        expect(Object.values(IntegrationSource)).toContain(source);
      });
    });
  });

  describe('TransactionType', () => {
    it('should have all expected transaction types', () => {
      // Basic trading
      expect(TransactionType.BUY).toBe('BUY');
      expect(TransactionType.SELL).toBe('SELL');
      expect(TransactionType.SWAP).toBe('SWAP');
      // Transfers
      expect(TransactionType.TRANSFER_IN).toBe('TRANSFER_IN');
      expect(TransactionType.TRANSFER_OUT).toBe('TRANSFER_OUT');
      // Staking
      expect(TransactionType.STAKE).toBe('STAKE');
      expect(TransactionType.UNSTAKE).toBe('UNSTAKE');
      expect(TransactionType.CLAIM_REWARD).toBe('CLAIM_REWARD');
      // Liquidity provision
      expect(TransactionType.PROVIDE_LIQUIDITY).toBe('PROVIDE_LIQUIDITY');
      expect(TransactionType.REMOVE_LIQUIDITY).toBe('REMOVE_LIQUIDITY');
      // Lending
      expect(TransactionType.BORROW).toBe('BORROW');
      expect(TransactionType.REPAY).toBe('REPAY');
      expect(TransactionType.LIQUIDATION).toBe('LIQUIDATION');
      // Token operations
      expect(TransactionType.MINT).toBe('MINT');
      expect(TransactionType.BURN).toBe('BURN');
      // Other
      expect(TransactionType.FEE).toBe('FEE');
      expect(TransactionType.DIVIDEND).toBe('DIVIDEND');
      expect(TransactionType.INTEREST).toBe('INTEREST');
      expect(TransactionType.OTHER).toBe('OTHER');
    });

    it('should have unique values (no duplicates)', () => {
      const values = Object.values(TransactionType);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should include basic transfer types', () => {
      const transferTypes = [
        TransactionType.TRANSFER_IN,
        TransactionType.TRANSFER_OUT
      ];

      transferTypes.forEach(type => {
        expect(Object.values(TransactionType)).toContain(type);
      });
    });

    it('should include trading types', () => {
      const tradeTypes = [
        TransactionType.BUY,
        TransactionType.SELL,
        TransactionType.SWAP
      ];

      tradeTypes.forEach(type => {
        expect(Object.values(TransactionType)).toContain(type);
      });
    });

    it('should include DeFi operation types', () => {
      const defiTypes = [
        TransactionType.STAKE,
        TransactionType.UNSTAKE,
        TransactionType.CLAIM_REWARD,
        TransactionType.PROVIDE_LIQUIDITY,
        TransactionType.REMOVE_LIQUIDITY,
        TransactionType.BORROW,
        TransactionType.REPAY,
        TransactionType.LIQUIDATION
      ];

      defiTypes.forEach(type => {
        expect(Object.values(TransactionType)).toContain(type);
      });
    });

    it('should include token and payment types', () => {
      const tokenTypes = [
        TransactionType.MINT,
        TransactionType.BURN,
        TransactionType.FEE,
        TransactionType.DIVIDEND,
        TransactionType.INTEREST
      ];

      tokenTypes.forEach(type => {
        expect(Object.values(TransactionType)).toContain(type);
      });
    });
  });

  describe('AccountType', () => {
    it('should have all expected account types', () => {
      // CEX account types
      expect(AccountType.SPOT).toBe('SPOT');
      expect(AccountType.MARGIN).toBe('MARGIN');
      expect(AccountType.FUTURES).toBe('FUTURES');
      expect(AccountType.SAVINGS).toBe('SAVINGS');
      expect(AccountType.STAKING).toBe('STAKING');
      // Wallet and DeFi
      expect(AccountType.WALLET).toBe('WALLET');
      expect(AccountType.DEFI).toBe('DEFI');
      // Traditional
      expect(AccountType.BROKERAGE).toBe('BROKERAGE');
      expect(AccountType.RETIREMENT).toBe('RETIREMENT');
      // Other
      expect(AccountType.OTHER).toBe('OTHER');
    });

    it('should have unique values (no duplicates)', () => {
      const values = Object.values(AccountType);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should include CEX trading account types', () => {
      const cexTypes = [
        AccountType.SPOT,
        AccountType.MARGIN,
        AccountType.FUTURES,
        AccountType.SAVINGS
      ];

      cexTypes.forEach(type => {
        expect(Object.values(AccountType)).toContain(type);
      });
    });

    it('should include wallet and DeFi account types', () => {
      const defiTypes = [
        AccountType.WALLET,
        AccountType.DEFI,
        AccountType.STAKING
      ];

      defiTypes.forEach(type => {
        expect(Object.values(AccountType)).toContain(type);
      });
    });

    it('should include traditional account types', () => {
      const traditionalTypes = [
        AccountType.BROKERAGE,
        AccountType.RETIREMENT
      ];

      traditionalTypes.forEach(type => {
        expect(Object.values(AccountType)).toContain(type);
      });
    });
  });

  describe('LendingPositionType', () => {
    it('should have both SUPPLY and BORROW types', () => {
      expect(LendingPositionType.SUPPLY).toBe('SUPPLY');
      expect(LendingPositionType.BORROW).toBe('BORROW');
    });

    it('should have unique values (no duplicates)', () => {
      const values = Object.values(LendingPositionType);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should have exactly 2 types', () => {
      const values = Object.values(LendingPositionType);
      expect(values).toHaveLength(2);
    });

    it('should be usable for discriminating lending positions', () => {
      type LendingPos = {
        type: LendingPositionType;
        amount: string;
      };

      const supplyPos: LendingPos = {
        type: LendingPositionType.SUPPLY,
        amount: '1000'
      };

      const borrowPos: LendingPos = {
        type: LendingPositionType.BORROW,
        amount: '500'
      };

      expect(supplyPos.type).toBe(LendingPositionType.SUPPLY);
      expect(borrowPos.type).toBe(LendingPositionType.BORROW);
      expect(supplyPos.type).not.toBe(borrowPos.type);
    });
  });

  describe('Contract Tests (Breaking Change Detection)', () => {
    it('should not remove AssetType values', () => {
      // Core asset types that must never be removed
      const coreTypes = [
        'CRYPTOCURRENCY',
        'STOCK',
        'ETF',
        'NFT',
        'BOND',
        'FIAT',
        'COMMODITY',
        'DERIVATIVE',
        'OTHER'
      ];

      const values = Object.values(AssetType);
      coreTypes.forEach(type => {
        expect(values).toContain(type);
      });
    });

    it('should not remove Chain values', () => {
      // Core chains that must never be removed
      const coreChains = [
        'ETHEREUM',
        'POLYGON',
        'SOLANA',
        'BITCOIN',
        'OTHER'
      ];

      const values = Object.values(Chain);
      coreChains.forEach(chain => {
        expect(values).toContain(chain);
      });
    });

    it('should not remove IntegrationSource values', () => {
      // Core sources that must never be removed
      const coreSources = [
        'COINBASE',
        'KRAKEN',
        'METAMASK',
        'PHANTOM',
        'MANUAL_ENTRY',
        'BLOCKCHAIN_DIRECT',
        'OTHER'
      ];

      const values = Object.values(IntegrationSource);
      coreSources.forEach(source => {
        expect(values).toContain(source);
      });
    });

    it('should not remove TransactionType values', () => {
      // Core transaction types that must never be removed
      const coreTypes = [
        'BUY',
        'SELL',
        'TRANSFER_IN',
        'TRANSFER_OUT',
        'SWAP',
        'STAKE',
        'OTHER'
      ];

      const values = Object.values(TransactionType);
      coreTypes.forEach(type => {
        expect(values).toContain(type);
      });
    });

    it('should not remove LendingPositionType values', () => {
      // Both values are core and must never be removed
      const values = Object.values(LendingPositionType);
      expect(values).toContain('SUPPLY');
      expect(values).toContain('BORROW');
    });
  });
});
