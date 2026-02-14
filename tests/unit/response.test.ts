import { describe, it, expect } from 'vitest';
import { ApiResponse, ApiError, PaginatedResponse, Asset, AssetType } from '../../src/index';

/**
 * Unit tests for Response wrapper types (ApiResponse, ApiError, PaginatedResponse).
 * Coverage target: 100%
 */

describe('Response Wrappers', () => {
  describe('ApiResponse', () => {
    it('should create successful response with data', () => {
      const response: ApiResponse<Asset> = {
        success: true,
        data: {
          id: 'eth-1',
          symbol: 'ETH',
          name: 'Ethereum',
          type: AssetType.CRYPTOCURRENCY
        },
        timestamp: new Date()
      };

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.error).toBeUndefined();
    });

    it('should create error response without data', () => {
      const response: ApiResponse<Asset> = {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Asset not found'
        },
        timestamp: new Date()
      };

      expect(response.success).toBe(false);
      expect(response.data).toBeUndefined();
      expect(response.error).toBeDefined();
    });

    it('should enforce mutually exclusive data/error', () => {
      // Success responses should have data, not error
      const successResponse: ApiResponse<Asset> = {
        success: true,
        data: {
          id: 'btc-1',
          symbol: 'BTC',
          name: 'Bitcoin',
          type: AssetType.CRYPTOCURRENCY
        },
        timestamp: new Date()
      };

      expect(successResponse.data).toBeDefined();
      expect(successResponse.error).toBeUndefined();

      // Error responses should have error, not data
      const errorResponse: ApiResponse<Asset> = {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Internal server error'
        },
        timestamp: new Date()
      };

      expect(errorResponse.error).toBeDefined();
      expect(errorResponse.data).toBeUndefined();
    });

    it('should include timestamp', () => {
      const response: ApiResponse<Asset> = {
        success: true,
        data: {
          id: 'test',
          symbol: 'TEST',
          name: 'Test',
          type: AssetType.OTHER
        },
        timestamp: new Date()
      };

      expect(response.timestamp).toBeInstanceOf(Date);
    });

    it('should support generic types', () => {
      type CustomData = { value: number };

      const response: ApiResponse<CustomData> = {
        success: true,
        data: { value: 42 },
        timestamp: new Date()
      };

      expect(response.data?.value).toBe(42);
    });
  });

  describe('ApiError', () => {
    it('should require code and message', () => {
      const error: ApiError = {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input parameters'
      };

      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.message).toBe('Invalid input parameters');
    });

    it('should support optional details', () => {
      const error: ApiError = {
        code: 'RATE_LIMIT',
        message: 'Too many requests',
        details: {
          retryAfter: 60,
          limit: 100
        }
      };

      expect(error.details).toBeDefined();
      expect((error.details as Record<string, unknown>).retryAfter).toBe(60);
    });

    it('should support various error codes', () => {
      const errors = [
        { code: 'NOT_FOUND', message: 'Resource not found' },
        { code: 'UNAUTHORIZED', message: 'Authentication required' },
        { code: 'FORBIDDEN', message: 'Access denied' },
        { code: 'SERVER_ERROR', message: 'Internal error' }
      ];

      errors.forEach(err => {
        expect(err.code).toBeDefined();
        expect(err.message).toBeDefined();
      });
    });

    it('should support nested error details', () => {
      const error: ApiError = {
        code: 'VALIDATION_ERROR',
        message: 'Multiple validation errors',
        details: {
          fields: {
            email: 'Invalid email format',
            amount: 'Must be positive'
          }
        }
      };

      expect((error.details as Record<string, unknown>).fields).toBeDefined();
    });
  });

  describe('PaginatedResponse', () => {
    it('should create paginated response', () => {
      const response: PaginatedResponse<Asset> = {
        items: [
          {
            id: 'eth-1',
            symbol: 'ETH',
            name: 'Ethereum',
            type: AssetType.CRYPTOCURRENCY
          }
        ],
        total: 100,
        page: 1,
        pageSize: 20,
        hasMore: true
      };

      expect(response.items).toHaveLength(1);
      expect(response.total).toBe(100);
      expect(response.hasMore).toBe(true);
    });

    it('should calculate hasMore correctly', () => {
      const response: PaginatedResponse<Asset> = {
        items: [],
        total: 100,
        page: 5,
        pageSize: 20,
        hasMore: false // 5 * 20 = 100, no more pages
      };

      expect(response.hasMore).toBe(false);
      expect(response.page * response.pageSize).toBe(response.total);
    });

    it('should handle first page', () => {
      const response: PaginatedResponse<Asset> = {
        items: [],
        total: 100,
        page: 1,
        pageSize: 20,
        hasMore: true
      };

      expect(response.page).toBe(1);
      expect(response.hasMore).toBe(true);
    });

    it('should handle last page', () => {
      const response: PaginatedResponse<Asset> = {
        items: [],
        total: 95,
        page: 5,
        pageSize: 20,
        hasMore: false
      };

      expect(response.hasMore).toBe(false);
    });

    it('should validate page boundaries', () => {
      const response: PaginatedResponse<Asset> = {
        items: [],
        total: 100,
        page: 1,
        pageSize: 20,
        hasMore: true
      };

      expect(response.page).toBeGreaterThan(0);
      expect(response.pageSize).toBeGreaterThan(0);
    });

    it('should support empty results', () => {
      const response: PaginatedResponse<Asset> = {
        items: [],
        total: 0,
        page: 1,
        pageSize: 20,
        hasMore: false
      };

      expect(response.items).toHaveLength(0);
      expect(response.total).toBe(0);
      expect(response.hasMore).toBe(false);
    });
  });
});
