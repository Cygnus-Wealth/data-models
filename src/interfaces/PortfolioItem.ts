/**
 * Legacy portfolio item interface.
 *
 * @deprecated Since v0.2.0. Use {@link PortfolioAsset} instead.
 * Will be removed in v2.0.0.
 *
 * @since 0.0.1
 * @stability core
 *
 * @see {@link PortfolioAsset} for replacement interface
 */
export interface PortfolioItem {
  /** Legacy identifier */
  id: string;

  /** Legacy balance field (replaced by Balance.amount) */
  balance: number;
}
