/**
 * Classification of financial asset types across all integration sources.
 *
 * AssetType provides standardized categorization for all tradeable, holdable, or
 * stakeable instruments within the CygnusWealth ecosystem. This enum serves as
 * the primary taxonomy for asset classification across CEX, DEX, traditional
 * finance, and DeFi sources.
 *
 * **Design Rationale:**
 * - Covers both traditional finance (stocks, bonds) and crypto (tokens, NFTs, DeFi positions)
 * - Distinguishes between base assets and derivative/yield-generating positions
 * - Extensible via OTHER for edge cases without breaking existing types
 *
 * **Integration Guidance:**
 * - Integration domains should map external classifications to these types
 * - When in doubt between similar types, prefer more specific (e.g., NFT over CRYPTOCURRENCY)
 * - Use metadata field for preserving source-specific asset classifications
 *
 * @example
 * ```typescript
 * // Mapping external asset types
 * function mapRobinhoodAsset(rhAsset: any): AssetType {
 *   switch (rhAsset.type) {
 *     case 'stock': return AssetType.STOCK;
 *     case 'cryptocurrency': return AssetType.CRYPTOCURRENCY;
 *     case 'etp': return AssetType.ETF;
 *     default: return AssetType.OTHER;
 *   }
 * }
 * ```
 *
 * @since 0.0.1
 * @stability core
 *
 * @see {@link Asset} for usage in asset models
 */
export enum AssetType {
  /**
   * Fungible digital currencies and tokens (BTC, ETH, ERC-20 tokens, SPL tokens).
   *
   * Includes all blockchain-based fungible assets that serve as currencies or
   * utility tokens. Does not include NFTs or DeFi positions (use specific types for those).
   */
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',

  /**
   * Equity securities in publicly traded companies (AAPL, TSLA, etc.).
   *
   * Represents ownership shares in corporations. Sourced from traditional
   * exchanges (NYSE, NASDAQ) via brokerages like Robinhood or Kraken.
   */
  STOCK = 'STOCK',

  /**
   * Exchange-Traded Funds - baskets of securities trading on exchanges (SPY, QQQ).
   *
   * Investment funds that track indices, commodities, or asset baskets and
   * trade like stocks on traditional exchanges.
   */
  ETF = 'ETF',

  /**
   * Mutual funds - professionally managed investment portfolios.
   *
   * Pooled investment vehicles typically accessed through brokerages,
   * not traded on exchanges. Examples: VTSAX, FXAIX.
   */
  MUTUAL_FUND = 'MUTUAL_FUND',

  /**
   * Fixed-income debt securities (government bonds, corporate bonds).
   *
   * Instruments representing loans to governments or corporations with
   * defined interest payments and maturity dates.
   */
  BOND = 'BOND',

  /**
   * Physical goods or raw materials (gold, oil, wheat).
   *
   * Tangible assets traded on commodity exchanges or held as commodities-backed
   * instruments. Includes precious metals, energy, agricultural products.
   */
  COMMODITY = 'COMMODITY',

  /**
   * Government-issued currencies (USD, EUR, JPY).
   *
   * Traditional fiat money held in brokerage cash accounts or wallets.
   * Represents purchasing power in sovereign currencies.
   */
  FIAT = 'FIAT',

  /**
   * Non-fungible tokens - unique digital assets (ERC-721, ERC-1155, Solana NFTs).
   *
   * Blockchain-based unique or semi-fungible assets with distinct identities.
   * Includes art, collectibles, gaming assets, membership tokens.
   */
  NFT = 'NFT',

  /**
   * Financial instruments deriving value from underlying assets (options, futures).
   *
   * Contracts whose value depends on underlying securities, indices, or commodities.
   * Includes options, futures, swaps, and structured products.
   */
  DERIVATIVE = 'DERIVATIVE',

  /**
   * DeFi liquidity pool positions (Uniswap V2/V3 LP, Curve LP tokens).
   *
   * Represents shares in automated market maker (AMM) liquidity pools.
   * These are yield-generating positions, not base assets.
   */
  LIQUIDITY_POOL = 'LIQUIDITY_POOL',

  /**
   * Staked cryptocurrency positions (ETH 2.0 staking, validator delegations).
   *
   * Assets locked in proof-of-stake protocols to earn rewards.
   * Includes direct staking and delegated staking positions.
   */
  STAKED_POSITION = 'STAKED_POSITION',

  /**
   * DeFi lending protocol positions (Aave deposits, Compound supplies).
   *
   * Assets supplied to lending protocols to earn interest.
   * Represents yield-generating positions in money markets.
   */
  LENDING_POSITION = 'LENDING_POSITION',

  /**
   * Catch-all for assets not fitting standard categories.
   *
   * Use sparingly for genuinely novel asset types. Document the specific
   * type in the asset's metadata field for future classification refinement.
   */
  OTHER = 'OTHER'
}