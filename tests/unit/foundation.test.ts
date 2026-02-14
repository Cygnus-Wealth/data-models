import { describe, it, expect } from 'vitest';
import { BaseEntity, Metadata } from '../../src/index';

/**
 * Unit tests for Foundation types (BaseEntity, Metadata).
 * Coverage target: 100%
 */

describe('Foundation Types', () => {
  describe('BaseEntity', () => {
    it('should be compatible with types that extend it', () => {
      // BaseEntity is an interface, so we test its structure through implementing types
      type TestEntity = BaseEntity & { name: string };

      const entity: TestEntity = {
        id: 'test-1',
        name: 'Test Entity',
        createdAt: new Date('2025-10-11T12:00:00Z'),
        updatedAt: new Date('2025-10-11T13:00:00Z')
      };

      expect(entity.id).toBe('test-1');
      expect(entity.createdAt).toBeInstanceOf(Date);
      expect(entity.updatedAt).toBeInstanceOf(Date);
    });

    it('should allow entities with only id (minimal)', () => {
      type TestEntity = BaseEntity & { value: number };

      const entity: TestEntity = {
        id: 'minimal-1',
        value: 42
      };

      expect(entity.id).toBe('minimal-1');
      expect(entity.createdAt).toBeUndefined();
      expect(entity.updatedAt).toBeUndefined();
    });

    it('should handle Date objects correctly for timestamps', () => {
      type TestEntity = BaseEntity & { data: string };

      const now = new Date();
      const entity: TestEntity = {
        id: 'date-test-1',
        data: 'test',
        createdAt: now,
        updatedAt: now
      };

      expect(entity.createdAt).toEqual(now);
      expect(entity.updatedAt).toEqual(now);
      expect(entity.createdAt?.getTime()).toBe(now.getTime());
    });

    it('should support separate creation and update times', () => {
      type TestEntity = BaseEntity & { status: string };

      const created = new Date('2025-10-10T12:00:00Z');
      const updated = new Date('2025-10-11T12:00:00Z');

      const entity: TestEntity = {
        id: 'tracked-1',
        status: 'active',
        createdAt: created,
        updatedAt: updated
      };

      expect(entity.createdAt?.getTime()).toBeLessThan(entity.updatedAt!.getTime());
      expect(entity.updatedAt!.getTime() - entity.createdAt!.getTime()).toBe(86400000); // 24 hours
    });
  });

  describe('Metadata', () => {
    it('should support arbitrary key-value pairs', () => {
      const metadata: Metadata = {
        customField: 'value',
        numericField: 42,
        booleanField: true
      };

      expect(metadata.customField).toBe('value');
      expect(metadata.numericField).toBe(42);
      expect(metadata.booleanField).toBe(true);
    });

    it('should be JSON serializable', () => {
      const metadata: Metadata = {
        string: 'test',
        number: 123,
        boolean: true,
        nested: {
          field1: 'value1',
          field2: 42
        },
        array: [1, 2, 3]
      };

      const json = JSON.stringify(metadata);
      const parsed = JSON.parse(json);

      expect(parsed).toEqual(metadata);
      expect(parsed.nested.field1).toBe('value1');
      expect(parsed.array).toEqual([1, 2, 3]);
    });

    it('should support namespaced keys for source-specific data', () => {
      const metadata: Metadata = {
        'coinbase:accountType': 'spot',
        'coinbase:permissions': ['read', 'trade'],
        'kraken:tier': 'intermediate',
        'metamask:chainId': 1
      };

      expect(metadata['coinbase:accountType']).toBe('spot');
      expect(metadata['coinbase:permissions']).toEqual(['read', 'trade']);
      expect(metadata['kraken:tier']).toBe('intermediate');
      expect(metadata['metamask:chainId']).toBe(1);
    });

    it('should handle empty metadata objects', () => {
      const metadata: Metadata = {};

      expect(Object.keys(metadata)).toHaveLength(0);
      expect(JSON.stringify(metadata)).toBe('{}');
    });

    it('should support deeply nested objects', () => {
      const metadata: Metadata = {
        level1: {
          level2: {
            level3: {
              deepValue: 'found'
            }
          }
        }
      };

      expect((metadata.level1 as Record<string, unknown> & { level2: { level3: { deepValue: string } } }).level2.level3.deepValue).toBe('found');
    });

    it('should preserve null and undefined values', () => {
      const metadata: Metadata = {
        nullValue: null,
        undefinedValue: undefined,
        definedValue: 'present'
      };

      expect(metadata.nullValue).toBeNull();
      expect(metadata.undefinedValue).toBeUndefined();
      expect(metadata.definedValue).toBe('present');
    });

    it('should handle special characters in keys', () => {
      const metadata: Metadata = {
        'key-with-dashes': 'value1',
        'key.with.dots': 'value2',
        'key_with_underscores': 'value3',
        'key:with:colons': 'value4'
      };

      expect(metadata['key-with-dashes']).toBe('value1');
      expect(metadata['key.with.dots']).toBe('value2');
      expect(metadata['key_with_underscores']).toBe('value3');
      expect(metadata['key:with:colons']).toBe('value4');
    });

    it('should support arrays of objects', () => {
      const metadata: Metadata = {
        items: [
          { id: 1, name: 'First' },
          { id: 2, name: 'Second' }
        ]
      };

      expect(Array.isArray(metadata.items)).toBe(true);
      expect((metadata.items as Array<Record<string, unknown>>)).toHaveLength(2);
      expect((metadata.items as Array<Record<string, unknown>>)[0].name).toBe('First');
    });

    it('should handle dates serialized as ISO strings', () => {
      const date = new Date('2025-10-11T12:00:00Z');
      const metadata: Metadata = {
        timestamp: date.toISOString(),
        timestampMs: date.getTime()
      };

      expect(metadata.timestamp).toBe('2025-10-11T12:00:00.000Z');
      expect(metadata.timestampMs).toBe(date.getTime());
    });
  });
});
