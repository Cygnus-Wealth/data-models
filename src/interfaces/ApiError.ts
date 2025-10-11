/**
 * Standardized error structure for API responses.
 *
 * Provides machine-readable error codes and human-readable messages for
 * consistent error handling across all integrations. Details field allows
 * source-specific error information like stack traces or validation errors.
 *
 * **Design Pattern:** Structured error with code for programmatic handling
 * and message for display. Details field accommodates varying error contexts.
 *
 * @example
 * ```typescript
 * import { ApiError } from '@cygnus-wealth/data-models';
 *
 * // Simple error
 * const simpleError: ApiError = {
 *   code: 'UNAUTHORIZED',
 *   message: 'Invalid API key'
 * };
 *
 * // Error with validation details
 * const validationError: ApiError = {
 *   code: 'VALIDATION_ERROR',
 *   message: 'Request validation failed',
 *   details: {
 *     fields: {
 *       amount: 'Must be positive number',
 *       symbol: 'Required field'
 *     }
 *   }
 * };
 *
 * // Error with stack trace (development)
 * const serverError: ApiError = {
 *   code: 'INTERNAL_ERROR',
 *   message: 'An unexpected error occurred',
 *   details: {
 *     stack: 'Error: ...',
 *     timestamp: new Date().toISOString()
 *   }
 * };
 *
 * // Common error codes
 * const errorCodes = {
 *   RATE_LIMIT: 'Too many requests',
 *   NOT_FOUND: 'Resource not found',
 *   UNAUTHORIZED: 'Authentication required',
 *   FORBIDDEN: 'Insufficient permissions',
 *   TIMEOUT: 'Request timeout',
 *   NETWORK_ERROR: 'Network connection failed'
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link ApiResponse} for error usage in responses
 */
export interface ApiError {
  /** Machine-readable error code (e.g., 'RATE_LIMIT', 'UNAUTHORIZED') */
  code: string;

  /** Human-readable error message for display */
  message: string;

  /** Optional error-specific details (stack trace, field errors, etc.) */
  details?: unknown;
}
