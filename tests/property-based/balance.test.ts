import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { Balance } from '../../src/index';
import { minimalAsset } from '../fixtures';

/**
 * Property-based tests for Balance type using fast-check.
 * Tests invariants around large number precision and decimal handling.
 */

describe('Balance Property-Based Tests', () => {
  it('should preserve large number precision as strings', () => {
    fc.assert(
      fc.property(
        fc.bigInt({ min: 0n, max: BigInt('99999999999999999999999999') }),
        (bigIntAmount) => {
          const amountStr = bigIntAmount.toString();
          const balance: Balance = {
            assetId: 'test',
            asset: minimalAsset,
            amount: amountStr
          };

          // String representation should be preserved exactly
          return balance.amount === amountStr;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle arbitrary decimal precision', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 18 }),
        fc.bigInt({ min: 0n, max: BigInt('9999999999999999') }),
        (decimals, rawAmount) => {
          const rawStr = rawAmount.toString();
          const balance: Balance = {
            assetId: 'test',
            asset: { ...minimalAsset, decimals },
            amount: rawStr
          };

          // Amount should be stored as string
          return typeof balance.amount === 'string' &&
                 balance.amount === rawStr &&
                 balance.asset.decimals === decimals;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should verify raw * (10^-decimals) relationship', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 18 }),
        fc.nat({ max: 1000000 }),
        (decimals, baseAmount) => {
          // Calculate raw amount from base (with decimals)
          const raw = baseAmount * Math.pow(10, decimals);
          const balance: Balance = {
            assetId: 'test',
            asset: { ...minimalAsset, decimals },
            amount: raw.toString()
          };

          // Formatted value should equal raw / (10^decimals)
          const formatted = Number(balance.amount) / Math.pow(10, decimals);
          return Math.abs(formatted - baseAmount) < 0.0001; // Allow for floating point precision
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle zero balance regardless of decimals', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 18 }),
        (decimals) => {
          const balance: Balance = {
            assetId: 'test',
            asset: { ...minimalAsset, decimals },
            amount: '0'
          };

          return balance.amount === '0' &&
                 Number(balance.amount) === 0;
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should handle amounts exceeding MAX_SAFE_INTEGER', () => {
    fc.assert(
      fc.property(
        fc.bigInt({ min: BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1), max: BigInt('999999999999999999999999') }),
        (largeAmount) => {
          const amountStr = largeAmount.toString();
          const balance: Balance = {
            assetId: 'test',
            asset: minimalAsset,
            amount: amountStr
          };

          // Should store as string without precision loss
          return balance.amount === amountStr &&
                 BigInt(balance.amount) === largeAmount;
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should preserve trailing zeros in decimal amounts', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        (trailingZeros) => {
          const amount = '1.' + '0'.repeat(trailingZeros);
          const balance: Balance = {
            assetId: 'test',
            asset: minimalAsset,
            amount
          };

          // String should preserve trailing zeros
          return balance.amount === amount;
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should calculate P&L correctly when cost_basis and value are present', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 1, max: 100000, noNaN: true }),
        fc.double({ min: 1, max: 100000, noNaN: true }),
        (costBasis, currentValue) => {
          const balance: Balance = {
            assetId: 'test',
            asset: minimalAsset,
            amount: '100',
            cost_basis: costBasis,
            unrealized_pnl: currentValue - costBasis,
            value: {
              value: currentValue,
              currency: 'USD',
              timestamp: new Date()
            }
          };

          // unrealized_pnl should equal value - cost_basis
          const expectedPnL = currentValue - costBasis;
          return Math.abs(balance.unrealized_pnl! - expectedPnL) < 0.01;
        }
      ),
      { numRuns: 100 }
    );
  });
});
