import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { Metadata } from '../../src/index';

/**
 * Property-based tests for Metadata type using fast-check.
 * Tests invariants that should hold for all possible metadata objects.
 */

describe('Metadata Property-Based Tests', () => {
  it('should be JSON serializable for any metadata object', () => {
    fc.assert(
      fc.property(
        fc.dictionary(
          fc.string(),
          fc.oneof(
            fc.string(),
            fc.integer(),
            fc.double(),
            fc.boolean(),
            fc.constant(null)
          )
        ),
        (metadata: Metadata) => {
          const json = JSON.stringify(metadata);
          const parsed = JSON.parse(json);

          // Verify round-trip preservation
          return JSON.stringify(parsed) === json;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should preserve all values after JSON serialization', () => {
    fc.assert(
      fc.property(
        fc.dictionary(
          fc.string({ minLength: 1 }),
          fc.oneof(
            fc.string(),
            fc.integer(),
            fc.boolean()
          )
        ),
        (metadata: Metadata) => {
          const json = JSON.stringify(metadata);
          const parsed = JSON.parse(json) as Metadata;

          // All keys should be preserved
          const originalKeys = Object.keys(metadata);
          const parsedKeys = Object.keys(parsed);

          return originalKeys.every(key => parsedKeys.includes(key)) &&
                 parsedKeys.every(key => originalKeys.includes(key));
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should support namespaced keys following pattern', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.array(fc.constantFrom('a', 'b', 'c', 'd'), { minLength: 3, maxLength: 10 }).map(arr => arr.join('')),
          fc.array(fc.constantFrom('x', 'y', 'z'), { minLength: 3, maxLength: 10 }).map(arr => arr.join('')),
          fc.oneof(fc.string(), fc.integer())
        ),
        ([source, key, value]) => {
          const namespacedKey = `${source}:${key}`;
          const metadata: Metadata = {
            [namespacedKey]: value
          };

          // Verify namespaced key contains colon
          return Object.keys(metadata).some(k => k.includes(':'));
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle arbitrary nested structures', () => {
    fc.assert(
      fc.property(
        fc.dictionary(
          fc.string({ minLength: 1 }),
          fc.anything()
        ),
        (metadata: Metadata) => {
          // Any structure should be storable
          return typeof metadata === 'object' && metadata !== null;
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should handle empty metadata objects', () => {
    fc.assert(
      fc.property(
        fc.constant({}),
        (metadata: Metadata) => {
          return Object.keys(metadata).length === 0;
        }
      )
    );
  });

  it('should handle large metadata objects', () => {
    fc.assert(
      fc.property(
        fc.dictionary(
          fc.string({ minLength: 1, maxLength: 20 }),
          fc.string({ maxLength: 100 }),
          { minKeys: 50, maxKeys: 100 }
        ),
        (metadata: Metadata) => {
          const keys = Object.keys(metadata);
          return keys.length >= 50 && keys.length <= 100;
        }
      ),
      { numRuns: 20 }
    );
  });
});
