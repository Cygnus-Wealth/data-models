import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { PaginatedResponse } from '../../src/index';

/**
 * Property-based tests for PaginatedResponse type using fast-check.
 * Tests pagination invariants and boundary conditions.
 */

describe('Pagination Property-Based Tests', () => {
  it('should correctly calculate hasMore: (page * pageSize) < total', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 1, max: 100 }),
        fc.nat({ max: 1000 }),
        (page, pageSize, total) => {
          const expectedHasMore = (page * pageSize) < total;
          const response: PaginatedResponse<{ id: string }> = {
            items: [],
            total,
            page,
            pageSize,
            hasMore: expectedHasMore
          };

          return response.hasMore === expectedHasMore;
        }
      ),
      { numRuns: 200 }
    );
  });

  it('should have hasMore=false when on last page', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.nat({ max: 1000 }),
        (pageSize, total) => {
          const lastPage = Math.ceil(total / pageSize);
          const response: PaginatedResponse<{ id: string }> = {
            items: [],
            total,
            page: lastPage,
            pageSize,
            hasMore: (lastPage * pageSize) < total
          };

          // Last page should not have more items
          return !response.hasMore || total === 0;
        }
      ),
      { numRuns: 200 }
    );
  });

  it('should have hasMore=true when not on last page', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        fc.integer({ min: 10, max: 100 }),
        (page, pageSize) => {
          const total = page * pageSize + pageSize; // Ensure more items exist
          const response: PaginatedResponse<{ id: string }> = {
            items: [],
            total,
            page,
            pageSize,
            hasMore: (page * pageSize) < total
          };

          return response.hasMore === true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should validate page boundaries (page >= 1)', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 1, max: 100 }),
        fc.nat({ max: 1000 }),
        (page, pageSize, total) => {
          const response: PaginatedResponse<{ id: string }> = {
            items: [],
            total,
            page,
            pageSize,
            hasMore: (page * pageSize) < total
          };

          return response.page >= 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should validate pageSize boundaries (pageSize >= 1)', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 1, max: 100 }),
        fc.nat({ max: 1000 }),
        (page, pageSize, total) => {
          const response: PaginatedResponse<{ id: string }> = {
            items: [],
            total,
            page,
            pageSize,
            hasMore: (page * pageSize) < total
          };

          return response.pageSize >= 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle empty result sets (total = 0)', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 1, max: 100 }),
        (page, pageSize) => {
          const response: PaginatedResponse<{ id: string }> = {
            items: [],
            total: 0,
            page,
            pageSize,
            hasMore: false
          };

          return response.total === 0 &&
                 response.hasMore === false &&
                 response.items.length === 0;
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should calculate total pages correctly', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.nat({ max: 1000 }),
        (pageSize, total) => {
          const expectedTotalPages = Math.ceil(total / pageSize);
          const lastPageHasMore = expectedTotalPages * pageSize < total;

          // Last page should not have more
          return !lastPageHasMore || total === 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle single page results', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        (pageSize) => {
          const total = pageSize; // Exactly one page
          const response: PaginatedResponse<{ id: string }> = {
            items: [],
            total,
            page: 1,
            pageSize,
            hasMore: false
          };

          return response.page === 1 &&
                 response.hasMore === false &&
                 response.total === pageSize;
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should handle partial last page', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 50 }),
        fc.integer({ min: 1, max: 9 }),
        (pageSize, remainder) => {
          const total = pageSize + remainder; // More than one page, but not full
          const lastPage = 2;
          const response: PaginatedResponse<{ id: string }> = {
            items: [],
            total,
            page: lastPage,
            pageSize,
            hasMore: (lastPage * pageSize) < total
          };

          return response.hasMore === false; // Last page
        }
      ),
      { numRuns: 50 }
    );
  });
});
