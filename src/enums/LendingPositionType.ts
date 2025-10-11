/**
 * Type of lending position: supply (lender) or borrow (borrower).
 *
 * Discriminates between assets deposited to earn interest (SUPPLY) and
 * assets borrowed while paying interest (BORROW) in DeFi lending protocols.
 *
 * @example
 * ```typescript
 * import { LendingPositionType } from '@cygnus-wealth/data-models';
 *
 * const supplyType = LendingPositionType.SUPPLY;
 * const borrowType = LendingPositionType.BORROW;
 * ```
 *
 * @since 0.2.0
 * @stability core
 *
 * @see {@link LendingPosition} for usage in lending positions
 */
export enum LendingPositionType {
  /** User supplied assets earning interest (lender) */
  SUPPLY = 'SUPPLY',

  /** User borrowed assets paying interest (borrower) */
  BORROW = 'BORROW'
}
