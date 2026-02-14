import { describe, it, expect } from 'vitest';
import { LendingPositionType, Chain } from '../../src/index';
import {
  uniswapLPPosition,
  curveLPPosition,
  ethStakingPosition,
  lidoStakingPosition,
  solStakingPosition,
  aaveSupplyPosition,
  aaveBorrowPosition,
  riskyBorrowPosition
} from '../fixtures';

/**
 * Unit tests for Position types (LiquidityPosition, StakedPosition, LendingPosition).
 * Coverage target: 95%
 */

describe('Position Models', () => {
  describe('LiquidityPosition', () => {
    it('should create 2-token pool position', () => {
      expect(uniswapLPPosition.tokens).toHaveLength(2);
      expect(uniswapLPPosition.protocol).toBe('Uniswap V3');
      expect(uniswapLPPosition.poolName).toContain('ETH/USDC');
    });

    it('should create multi-token pool position', () => {
      expect(curveLPPosition.tokens).toHaveLength(3);
      expect(curveLPPosition.protocol).toBe('Curve');
    });

    it('should track share percentage', () => {
      expect(uniswapLPPosition.share).toBe(0.05); // 5%
      expect(uniswapLPPosition.share).toBeGreaterThan(0);
      expect(uniswapLPPosition.share).toBeLessThanOrEqual(1);
    });

    it('should calculate impermanent loss', () => {
      expect(uniswapLPPosition.impermanentLoss).toBe(-25.30);
      expect(uniswapLPPosition.impermanentLoss).toBeLessThan(0); // Loss is negative
    });

    it('should track fees earned', () => {
      expect(uniswapLPPosition.feesEarned).toBe(150.50);
      expect(uniswapLPPosition.feesEarned).toBeGreaterThan(0);
    });

    it('should have minimal IL for stable pools', () => {
      expect(curveLPPosition.impermanentLoss).toBe(0);
    });

    it('should support LP token balance', () => {
      expect(uniswapLPPosition.lpTokenBalance).toBe('707.106781186548');
      expect(typeof uniswapLPPosition.lpTokenBalance).toBe('string');
    });

    it('should track pool address', () => {
      expect(uniswapLPPosition.poolAddress).toBeDefined();
      expect(uniswapLPPosition.poolAddress.startsWith('0x')).toBe(true);
    });
  });

  describe('StakedPosition', () => {
    it('should create direct staking position', () => {
      expect(ethStakingPosition.protocol).toBe('Ethereum 2.0');
      expect(ethStakingPosition.stakedAmount).toBe('32.0');
      expect(ethStakingPosition.chain).toBe(Chain.ETHEREUM);
    });

    it('should support liquid staking', () => {
      expect(lidoStakingPosition.protocol).toBe('Lido');
      expect(lidoStakingPosition.asset.symbol).toBe('stETH');
    });

    it('should track multiple rewards', () => {
      expect(ethStakingPosition.rewards).toHaveLength(1);
      expect(solStakingPosition.rewards).toHaveLength(1);
    });

    it('should track validator for Solana staking', () => {
      expect(solStakingPosition.validator).toBeDefined();
      expect(typeof solStakingPosition.validator).toBe('string');
    });

    it('should support lockup periods', () => {
      expect(solStakingPosition.lockupPeriod).toBe(3);
      expect(solStakingPosition.unlockDate).toBeInstanceOf(Date);
    });

    it('should track APR', () => {
      expect(ethStakingPosition.apr).toBe(4.5);
      expect(solStakingPosition.apr).toBe(7.5);
      expect(lidoStakingPosition.apr).toBe(4.2);
    });

    it('should calculate position value', () => {
      expect(ethStakingPosition.value?.value).toBe(64000);
      // 32 ETH * 2000 USD/ETH = 64000 USD
    });
  });

  describe('LendingPosition', () => {
    it('should create SUPPLY position', () => {
      expect(aaveSupplyPosition.type).toBe(LendingPositionType.SUPPLY);
      expect(aaveSupplyPosition.protocol).toBe('Aave V3');
    });

    it('should create BORROW position', () => {
      expect(aaveBorrowPosition.type).toBe(LendingPositionType.BORROW);
      expect(aaveBorrowPosition.accruedInterest).toBeLessThan(0); // Negative for debt
    });

    it('should validate health factor > 0', () => {
      expect(aaveBorrowPosition.healthFactor).toBe(2.5);
      expect(aaveBorrowPosition.healthFactor).toBeGreaterThan(0);
      expect(aaveBorrowPosition.healthFactor).toBeGreaterThan(1); // Safe position
    });

    it('should detect risky positions with low health factor', () => {
      expect(riskyBorrowPosition.healthFactor).toBe(1.05);
      expect(riskyBorrowPosition.healthFactor).toBeGreaterThan(1);
      expect(riskyBorrowPosition.healthFactor).toBeLessThan(1.1); // Close to liquidation
    });

    it('should validate liquidation threshold 0-1', () => {
      expect(aaveBorrowPosition.liquidationThreshold).toBe(0.85);
      expect(aaveBorrowPosition.liquidationThreshold).toBeGreaterThan(0);
      expect(aaveBorrowPosition.liquidationThreshold).toBeLessThanOrEqual(1);
    });

    it('should track accrued interest', () => {
      expect(aaveSupplyPosition.accruedInterest).toBe(125.50);
      expect(aaveSupplyPosition.accruedInterest).toBeGreaterThan(0); // Positive for supply

      expect(aaveBorrowPosition.accruedInterest).toBe(-85.30);
      expect(aaveBorrowPosition.accruedInterest).toBeLessThan(0); // Negative for borrow
    });

    it('should track APY', () => {
      expect(aaveSupplyPosition.apy).toBe(3.5);
      expect(aaveBorrowPosition.apy).toBe(5.2);
      expect(aaveBorrowPosition.apy).toBeGreaterThan(aaveSupplyPosition.apy!); // Borrow rate > supply rate
    });

    it('should handle negative value for BORROW positions', () => {
      expect(aaveBorrowPosition.value?.value).toBe(-30085.30);
      expect(aaveBorrowPosition.value?.value).toBeLessThan(0); // Debt is negative
    });

    it('should handle positive value for SUPPLY positions', () => {
      expect(aaveSupplyPosition.value?.value).toBe(50125.50);
      expect(aaveSupplyPosition.value?.value).toBeGreaterThan(0);
    });
  });
});
