import { ApiError } from './ApiError';

/**
 * Generic API response wrapper with success/error discrimination.
 *
 * Standard envelope for all API responses providing consistent structure for
 * success and error handling. Mutually exclusive data/error pattern ensures
 * type-safe response processing.
 *
 * **Design Pattern:** Result monad pattern with discriminated union - exactly
 * one of data or error is present based on success flag. Timestamp enables
 * response caching and freshness tracking.
 *
 * @template T - Response data type (should be object, not primitive)
 *
 * @example
 * ```typescript
 * import { ApiResponse, Account } from '@cygnus-wealth/data-models';
 *
 * // Successful response
 * const successResponse: ApiResponse<Account> = {
 *   success: true,
 *   data: {
 *     id: 'wallet-1',
 *     name: 'Main Wallet',
 *     type: AccountType.WALLET,
 *     balances: [...]
 *   },
 *   timestamp: new Date()
 * };
 *
 * // Error response
 * const errorResponse: ApiResponse<Account> = {
 *   success: false,
 *   error: {
 *     code: 'RATE_LIMIT',
 *     message: 'Rate limit exceeded. Retry after 60 seconds.'
 *   },
 *   timestamp: new Date()
 * };
 *
 * // Type-safe handling
 * function handleResponse(response: ApiResponse<Account>) {
 *   if (response.success && response.data) {
 *     console.log('Account:', response.data.name);
 *   } else if (response.error) {
 *     console.error('Error:', response.error.message);
 *   }
 * }
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link ApiError} for error structure
 * @see {@link PaginatedResponse} for paginated data
 */
export interface ApiResponse<T extends object> {
  /** Indicates whether the API call succeeded */
  success: boolean;

  /** Response data (present if success === true) */
  data?: T;

  /** Error details (present if success === false) */
  error?: ApiError;

  /** Timestamp when the response was generated */
  timestamp: Date;
}
