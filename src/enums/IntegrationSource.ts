/**
 * Data source identifiers for integration traceability.
 *
 * Tracks origin of data flowing through the system, enabling source-specific
 * logic, validation, and troubleshooting. This comprehensive enum covers centralized
 * exchanges (CEXs), decentralized exchanges (DEXs), wallet providers, and manual entries.
 *
 * @example
 * ```typescript
 * import { IntegrationSource } from '@cygnus-wealth/data-models';
 *
 * // Identify data source for routing logic
 * function processAccountData(source: IntegrationSource) {
 *   switch(source) {
 *     case IntegrationSource.ROBINHOOD:
 *       return fetchCEXData();
 *     case IntegrationSource.UNISWAP:
 *       return fetchDEXData();
 *     case IntegrationSource.METAMASK:
 *       return fetchWalletData();
 *     default:
 *       return fetchGenericData();
 *   }
 * }
 * ```
 *
 * @since 0.0.1
 * @stability standard
 */
export enum IntegrationSource {
  /** Robinhood centralized exchange */
  ROBINHOOD = 'ROBINHOOD',

  /** Kraken centralized exchange */
  KRAKEN = 'KRAKEN',

  /** Coinbase centralized exchange */
  COINBASE = 'COINBASE',

  /** Binance centralized exchange */
  BINANCE = 'BINANCE',

  /** Uniswap decentralized exchange */
  UNISWAP = 'UNISWAP',

  /** SushiSwap decentralized exchange */
  SUSHISWAP = 'SUSHISWAP',

  /** PancakeSwap decentralized exchange */
  PANCAKESWAP = 'PANCAKESWAP',

  /** Curve Finance decentralized exchange */
  CURVE = 'CURVE',

  /** Balancer decentralized exchange */
  BALANCER = 'BALANCER',

  /** MetaMask wallet provider */
  METAMASK = 'METAMASK',

  /** Rabby wallet provider */
  RABBY = 'RABBY',

  /** Phantom wallet provider (Solana) */
  PHANTOM = 'PHANTOM',

  /** Slush wallet provider (SUI) */
  SLUSH = 'SLUSH',

  /** Suiet wallet provider (SUI) */
  SUIET = 'SUIET',

  /** Manually entered data by user */
  MANUAL_ENTRY = 'MANUAL_ENTRY',

  /** Data fetched directly from blockchain via RPC */
  BLOCKCHAIN_DIRECT = 'BLOCKCHAIN_DIRECT',

  /** Other or unclassified data source */
  OTHER = 'OTHER'
}
