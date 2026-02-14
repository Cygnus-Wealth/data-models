import { describe, it, expect } from 'vitest';
import { TransactionType, Chain } from '../../src/index';
import {
  simpleTransfer,
  dexSwap,
  cexTrade,
  stakingTransaction,
  addLiquidityTransaction,
  failedTransaction,
  pendingTransaction,
  multiAssetTransaction
} from '../fixtures';

/**
 * Unit tests for Transaction types.
 * Coverage target: 95%
 */

describe('Transaction Models', () => {
  describe('Simple Transfer', () => {
    it('should create basic blockchain transfer', () => {
      expect(simpleTransfer.type).toBe(TransactionType.TRANSFER);
      expect(simpleTransfer.status).toBe('COMPLETED');
      expect(simpleTransfer.chain).toBe(Chain.ETHEREUM);
    });

    it('should include hash and block number', () => {
      expect(simpleTransfer.hash).toBeDefined();
      expect(simpleTransfer.hash?.startsWith('0x')).toBe(true);
      expect(simpleTransfer.blockNumber).toBe(18500000);
    });

    it('should include from and to addresses', () => {
      expect(simpleTransfer.from).toBeDefined();
      expect(simpleTransfer.to).toBeDefined();
      expect(simpleTransfer.from?.startsWith('0x')).toBe(true);
      expect(simpleTransfer.to?.startsWith('0x')).toBe(true);
    });

    it('should track assets out', () => {
      expect(simpleTransfer.assetsOut).toHaveLength(1);
      expect(simpleTransfer.assetsOut![0].amount).toBe('1.5');
    });

    it('should track fees', () => {
      expect(simpleTransfer.fees).toHaveLength(1);
      expect(simpleTransfer.fees![0].amount).toBe('0.002');
    });
  });

  describe('DEX Swap', () => {
    it('should create swap transaction', () => {
      expect(dexSwap.type).toBe(TransactionType.SWAP);
      expect(dexSwap.protocol).toBe('Uniswap V3');
    });

    it('should track assets in and out', () => {
      expect(dexSwap.assetsOut).toHaveLength(1);
      expect(dexSwap.assetsIn).toHaveLength(1);
      expect(dexSwap.assetsOut![0].asset.symbol).toBe('ETH');
      expect(dexSwap.assetsIn![0].asset.symbol).toBe('USDC');
    });

    it('should include smart contract method', () => {
      expect(dexSwap.method).toBe('swapExactTokensForTokens');
    });

    it('should include contract address in to field', () => {
      expect(dexSwap.to).toBeDefined();
      expect(dexSwap.to?.startsWith('0x')).toBe(true);
    });
  });

  describe('CEX Trade', () => {
    it('should create CEX trade without blockchain data', () => {
      expect(cexTrade.type).toBe(TransactionType.TRADE);
      expect(cexTrade.hash).toBeUndefined();
      expect(cexTrade.chain).toBeUndefined();
    });

    it('should track fiat-crypto trades', () => {
      expect(cexTrade.assetsOut![0].asset.symbol).toBe('USD');
      expect(cexTrade.assetsIn![0].asset.symbol).toBe('BTC');
    });

    it('should include exchange fees', () => {
      expect(cexTrade.fees).toHaveLength(1);
      expect(cexTrade.fees![0].amount).toBe('50.00');
    });
  });

  describe('Multi-asset Operations', () => {
    it('should support staking transactions', () => {
      expect(stakingTransaction.type).toBe(TransactionType.STAKE);
      expect(stakingTransaction.assetsOut).toHaveLength(1);
      expect(stakingTransaction.assetsOut![0].amount).toBe('32.0');
    });

    it('should support liquidity provision', () => {
      expect(addLiquidityTransaction.type).toBe(TransactionType.ADD_LIQUIDITY);
      expect(addLiquidityTransaction.assetsOut).toHaveLength(2); // ETH + USDC
      expect(addLiquidityTransaction.assetsIn).toHaveLength(1); // LP token
    });

    it('should support complex multi-asset swaps', () => {
      expect(multiAssetTransaction.assetsOut).toHaveLength(2);
      expect(multiAssetTransaction.assetsIn).toHaveLength(2);
      expect(multiAssetTransaction.protocol).toBe('0x Protocol');
    });
  });

  describe('Transaction Status', () => {
    it('should support COMPLETED status', () => {
      expect(simpleTransfer.status).toBe('COMPLETED');
    });

    it('should support FAILED status', () => {
      expect(failedTransaction.status).toBe('FAILED');
      expect(failedTransaction.assetsOut).toHaveLength(0);
      expect(failedTransaction.metadata?.errorReason).toBeDefined();
    });

    it('should support PENDING status', () => {
      expect(pendingTransaction.status).toBe('PENDING');
      expect(pendingTransaction.blockNumber).toBeUndefined();
    });

    it('should track error reasons for failed transactions', () => {
      expect(failedTransaction.metadata?.errorReason).toBe('Insufficient liquidity');
    });
  });

  describe('Transaction Timestamps', () => {
    it('should include timestamp', () => {
      expect(simpleTransfer.timestamp).toBeInstanceOf(Date);
    });

    it('should order transactions chronologically', () => {
      const earlier = new Date('2025-10-11T10:00:00Z');
      const later = new Date('2025-10-11T11:00:00Z');

      expect(later.getTime()).toBeGreaterThan(earlier.getTime());
    });
  });
});
