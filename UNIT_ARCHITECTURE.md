# Unit Architecture: Data Models Bounded Context

**Date:** October 11, 2025
**Status:** Implementation Ready
**Purpose:** Complete unit-level specifications for all types

---

## Document Overview

This document provides comprehensive unit-level architectural specifications for all types in the Data Models bounded context. It defines semantic contracts, JSDoc patterns, testing requirements, and implementation guidelines.

**Terminology:** "Section" refers to conceptual groupings (folders), NOT separate npm packages. All types export from single `@cygnus-wealth/data-models` package.

---

## Architecture Principles

### Stability Tiers

| Tier | Types | Breaking Change Process |
|------|-------|------------------------|
| **Core** | BaseEntity, Metadata, All Enums | Unanimous Board approval |
| **Standard** | Asset, Transaction, Account, Portfolio, Price, MarketData | RFC with majority vote |
| **Extended** | Positions, Integration models | Expedited RFC |

### Test Coverage Targets

| Section | Target |
|---------|--------|
| Foundation & Enums | 100% |
| Core Models | 100% |
| Extended Models | 95% |
| Integration Models | 95% |
| Overall | >95% |

---

## Complete Type Specifications

### Foundation Section

#### BaseEntity ✅

**Stability:** Core | **Status:** JSDoc Complete

Provides id and timestamps for all entities. Already documented in source.

**Tests:**
- Type compatibility with extending interfaces
- Date type handling for timestamps

---

#### Metadata ✅

**Stability:** Core | **Status:** JSDoc Complete

Extensible key-value store for source-specific data. Already documented in source.

**Tests:**
- JSON serialization/deserialization
- Namespaced key patterns (`{source}:{key}`)
- Property-based: Random metadata objects serializable

---

### Enums Section

#### AssetType ✅

**Stability:** Core | **Status:** JSDoc Complete

Classification: CRYPTOCURRENCY, STOCK, ETF, NFT, BOND, FIAT, COMMODITY, DERIVATIVE, OTHER

Already documented in source.

---

#### Chain

**Stability:** Core

```typescript
/**
 * Blockchain network identifiers for multi-chain asset tracking.
 *
 * Provides standardized identifiers for all supported blockchain networks.
 * Enables consistent asset identification across EVM chains, alternative L1s,
 * and traditional finance systems.
 *
 * @example
 * ```typescript
 * function getChainFromId(chainId: number): Chain {
 *   const map = { 1: Chain.ETHEREUM, 137: Chain.POLYGON };
 *   return map[chainId] || Chain.OTHER;
 * }
 * ```
 *
 * @since 0.0.1
 * @stability core
 */
export enum Chain {
  ETHEREUM = 'ETHEREUM',    // Chain ID: 1
  POLYGON = 'POLYGON',      // Chain ID: 137
  ARBITRUM = 'ARBITRUM',    // Chain ID: 42161
  OPTIMISM = 'OPTIMISM',    // Chain ID: 10
  AVALANCHE = 'AVALANCHE',  // Chain ID: 43114
  BSC = 'BSC',              // Chain ID: 56
  BASE = 'BASE',            // Chain ID: 8453
  SOLANA = 'SOLANA',
  SUI = 'SUI',
  BITCOIN = 'BITCOIN',
  OTHER = 'OTHER'
}
```

**Tests:** Enum uniqueness, chain ID mapping, contract test (no removals)

---

#### IntegrationSource

**Stability:** Standard

```typescript
/**
 * Data source identifiers for integration traceability.
 *
 * Tracks origin of data flowing through the system, enabling source-specific
 * logic, validation, and troubleshooting.
 *
 * @since 0.0.1
 * @stability standard
 */
export enum IntegrationSource {
  EVM = 'EVM',
  SOLANA = 'SOLANA',
  SUI = 'SUI',
  ROBINHOOD = 'ROBINHOOD',
  KRAKEN = 'KRAKEN',
  COINBASE = 'COINBASE',
  MANUAL = 'MANUAL',
  SYSTEM = 'SYSTEM',
  UNKNOWN = 'UNKNOWN'
}
```

---

#### TransactionType

**Stability:** Standard

```typescript
/**
 * Standardized transaction type classification.
 *
 * Unified categorization for all financial operations across CEX, DEX,
 * blockchain transfers, and DeFi protocols.
 *
 * @since 0.0.1
 * @stability standard
 */
export enum TransactionType {
  TRANSFER = 'TRANSFER',
  TRADE = 'TRADE',
  SWAP = 'SWAP',
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  MINT = 'MINT',
  BURN = 'BURN',
  STAKE = 'STAKE',
  UNSTAKE = 'UNSTAKE',
  CLAIM_REWARDS = 'CLAIM_REWARDS',
  ADD_LIQUIDITY = 'ADD_LIQUIDITY',
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',
  LEND = 'LEND',
  WITHDRAW_LEND = 'WITHDRAW_LEND',
  BORROW = 'BORROW',
  REPAY = 'REPAY',
  APPROVE = 'APPROVE',
  CONTRACT_INTERACTION = 'CONTRACT_INTERACTION',
  NFT_LIST = 'NFT_LIST',
  NFT_SALE = 'NFT_SALE',
  NFT_OFFER = 'NFT_OFFER',
  OTHER = 'OTHER'
}
```

---

#### AccountType

**Stability:** Standard

```typescript
/**
 * Classification of account types.
 *
 * Categorizes account containers for display, grouping, and business logic.
 *
 * @since 0.0.1
 * @stability standard
 */
export enum AccountType {
  WALLET = 'WALLET',
  CEX = 'CEX',
  BROKERAGE = 'BROKERAGE',
  STAKING = 'STAKING',
  LENDING = 'LENDING',
  LIQUIDITY_POOL = 'LIQUIDITY_POOL',
  MANUAL = 'MANUAL',
  OTHER = 'OTHER'
}
```

---

#### LendingPositionType

**Stability:** Core

```typescript
/**
 * Type of lending position: supply (lender) or borrow (borrower).
 *
 * Discriminates between assets deposited to earn interest (SUPPLY) and
 * assets borrowed while paying interest (BORROW) in DeFi lending protocols.
 *
 * @since 0.2.0
 * @stability core
 *
 * @see {@link LendingPosition} for usage
 */
export enum LendingPositionType {
  /** User supplied assets earning interest (lender) */
  SUPPLY = 'SUPPLY',

  /** User borrowed assets paying interest (borrower) */
  BORROW = 'BORROW'
}
```

---

### Asset Models Section

#### Asset

**Stability:** Standard

Key fields: id, symbol, name, type, decimals?, contractAddress?, chain?, logoUrl?, coingeckoId?, cusip?, isin?, metadata?

Universal asset representation normalizing data from CEX, DEX, blockchains, and traditional finance.

**Tests:** Creation with min/all fields, ID format validation, symbol normalization, source transformations

---

#### NFT

**Stability:** Standard

Extends Asset. Key fields: tokenId, collection?, imageUrl?, metadataUri?, traits?, rarity?, description?

NFT-specific extensions including token IDs, collection info, rarity traits, and marketplace metadata.

**Tests:** NFT creation, Asset inheritance, traits array, ERC-721 detection, metadata URI resolution

---

#### Balance

**Stability:** Standard

```typescript
/**
 * Precise representation of asset quantities handling decimals correctly.
 *
 * Critical for accurate financial calculations across different asset types.
 * Uses string for raw to preserve precision beyond JavaScript number limits.
 *
 * **Decimal Handling:**
 * - raw: Smallest unit (wei, satoshi, cents)
 * - decimals: Decimal places for conversion
 * - Display value = raw / (10 ^ decimals)
 *
 * @example
 * ```typescript
 * const ethBalance: Balance = {
 *   raw: "1500000000000000000", // 1.5 ETH
 *   decimals: 18,
 *   formatted: "1.5"
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 */
export interface Balance {
  raw: string;      // Non-negative integer as string
  decimals: number; // Non-negative integer
  formatted?: string; // Pre-calculated display value
}
```

**Tests:** Raw string precision, large number handling (>2^53), zero balance, property-based tests

---

#### PortfolioAsset

**Stability:** Standard

Composes Asset + Balance + Price. Key fields: asset, balance, price?, totalValue?, allocation?, account?

Asset with balance and market valuation for portfolio display.

**Tests:** Composition, price-less assets, total value calculation, allocation percentage

---

### Market Data Section

#### Price

**Stability:** Standard

```typescript
/**
 * Point-in-time asset price with currency and timestamp.
 *
 * Essential for portfolio valuation and historical tracking.
 *
 * @example
 * ```typescript
 * const ethPrice: Price = {
 *   value: 2000.00,
 *   currency: "USD",
 *   timestamp: new Date("2025-01-15T10:30:00Z"),
 *   source: "coingecko",
 *   change24h: 2.5
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 */
export interface Price {
  value: number;
  currency: string;
  timestamp: Date;
  source?: string;
  change24h?: number;
}
```

---

#### MarketData

**Stability:** Standard

Extends Price with market cap, volume, supply, ATH/ATL, rank. Used for analytics and research features.

Key fields: price, marketCap?, volume24h?, circulatingSupply?, totalSupply?, maxSupply?, priceChange24h/7d/30d?, high24h?, low24h?, ath?, athDate?, atl?, atlDate?, rank?

**Tests:** Creation with price, market cap calculation, supply constraints (max >= total >= circulating)

---

### Position Models Section

#### LiquidityPosition

**Stability:** Extended

DEX liquidity pool positions tracking LP tokens and impermanent loss.

Key fields: id, protocol, poolAddress, poolName, chain, tokens[], lpTokenBalance?, share?, value?, feesEarned?, impermanentLoss?, metadata?

**Tests:** 2-token pool, multi-token pool, share percentage, IL calculation, Uniswap/Curve detection

---

#### StakedPosition

**Stability:** Extended

Proof-of-stake and staking derivative positions with rewards tracking.

Key fields: id, protocol, validator?, chain, asset, stakedAmount, rewards[], lockupPeriod?, unlockDate?, apr?, value?, metadata?

**Tests:** Direct staking, liquid staking, multiple rewards, lockup calculation, ETH validator detection

---

#### LendingPosition

**Stability:** Extended

DeFi money market positions (supply and borrow).

Key fields: id, protocol, chain, type (LendingPositionType), asset, amount, apy?, accruedInterest?, healthFactor?, liquidationThreshold?, value?, metadata?

**Tests:** SUPPLY/BORROW creation, health factor validation, liquidation threshold (0-1), Aave/Compound detection

---

### Transaction Models Section

#### Transaction

**Stability:** Standard

Universal transaction representation across all sources.

Key fields: id, accountId, type, status, hash?, chain?, from?, to?, timestamp, blockNumber?, assetsOut?, assetsIn?, fees?, protocol?, method?, metadata?

**Asset Flow Pattern:**
- assetsOut: Array of {asset, amount, value?}
- assetsIn: Array of {asset, amount, value?}

**Tests:** Simple transfer, DEX swap, multi-asset ops, fees, status transitions, failed txs, source mappings

---

### Integration Section

#### Account

**Stability:** Standard

Aggregate container for all holdings from a single source.

Key fields: id, name, type, source, sourceAccountId?, balances[], liquidityPositions?, stakedPositions?, lendingPositions?, nfts?, totalValue?, lastSynced?, metadata?

**Tests:** Creation, value aggregation, sync timestamp, account type-specific fields

---

#### IntegrationCredentials

**Stability:** Standard

Encrypted credentials for CEX/brokerage APIs.

Key fields: source, apiKey?, apiSecret?, passphrase?, walletAddress?, chainId?, metadata?

**Security:** ⚠️ NEVER store private keys. Encryption handled by consuming domains.

**Tests:** Validation, no private key storage, wallet vs CEX credential patterns

---

#### SyncStatus

**Stability:** Standard

Track data synchronization state.

Key fields: source, accountId, status ('IDLE' | 'SYNCING' | 'SUCCESS' | 'ERROR'), lastSyncTime?, lastError?, itemsSynced?, metadata?

**Tests:** Status transitions, error handling, timestamp validation

---

### Response Section

#### ApiResponse\<T\>

**Stability:** Standard

```typescript
/**
 * Generic API response wrapper.
 *
 * @template T - Response data type (should be object, not primitive)
 *
 * @since 0.0.1
 * @stability standard
 */
export interface ApiResponse<T extends object> {
  success: boolean;
  data?: T;       // Present if success
  error?: ApiError; // Present if !success
  timestamp: Date;
}
```

Pattern: Mutually exclusive data/error (exactly one present)

---

#### ApiError

**Stability:** Standard

```typescript
export interface ApiError {
  code: string;      // Machine-readable (e.g., "RATE_LIMIT")
  message: string;   // Human-readable
  details?: unknown; // Stack trace, field errors
}
```

---

#### PaginatedResponse\<T\>

**Stability:** Standard

```typescript
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;      // 1-indexed
  pageSize: number;
  hasMore: boolean;  // (page * pageSize) < total
}
```

---

### Utility Section

#### AssetIdentifier

**Stability:** Standard

```typescript
export type AssetIdentifier = {
  symbol?: string;
  contractAddress?: string;
  chain?: Chain;
  assetId?: string;
};
```

At least one field required for asset lookup.

---

#### TimeRange

**Stability:** Standard

```typescript
export type TimeRange = {
  start: Date; // Inclusive, UTC
  end: Date;   // Inclusive, UTC
};
```

Validation: start <= end

---

#### SortOrder

**Stability:** Standard

```typescript
export type SortOrder = 'ASC' | 'DESC';
```

---

#### FilterOptions

**Stability:** Standard

```typescript
export interface FilterOptions {
  chains?: Chain[];
  assetTypes?: AssetType[];
  sources?: IntegrationSource[];
  timeRange?: TimeRange;
  minValue?: number;
  maxValue?: number;
}
```

Logic: All filters AND-ed, arrays within filter OR-ed.

---

### Portfolio Section

#### Portfolio

**Stability:** Standard

Complete user portfolio aggregation.

Key fields: id, userId?, name, accounts?, items? (PortfolioAsset[]), totalValue, totalValueHistory?, performance?, lastUpdated, metadata?

**Aggregation:**
- totalValue = sum of all account totalValues
- items = deduplicated assets across accounts

**Tests:** Multi-account aggregation, total value, performance calculation, deduplication

---

#### PortfolioItem (DEPRECATED)

**Stability:** Core

```typescript
/**
 * Legacy portfolio item interface.
 *
 * @deprecated Since v0.2.0. Use {@link PortfolioAsset} instead.
 * Will be removed in v2.0.0.
 *
 * @since 0.0.1
 * @stability core
 */
export interface PortfolioItem {
  id: string;
  balance: number;
}
```

**Migration:** Provide converter PortfolioItem → PortfolioAsset in v0.2.0

---

## Test Architecture

### Test Organization

```
tests/
├── unit/              # Type creation, validation
├── integration/       # External mapping, cross-model
├── contract/          # Breaking change detection
└── property-based/    # Invariants, edge cases
```

### Test Frameworks

- **Vitest**: Primary test runner
- **@vitest/coverage-v8**: Code coverage
- **fast-check**: Property-based testing
- **@microsoft/api-extractor**: Contract testing

### Coverage by Section

- Foundation: 100%
- Enums: 100%
- Asset Models: 100%
- Market Data: 95%
- Positions: 95%
- Transactions: 95%
- Integration: 95%
- Response: 100%
- Portfolio: 95%

**Overall Target:** >95%

---

## Implementation Checklist

### Phase 1: Structural Changes (v0.1.0)

Apply corrections from System Architect review:

**Create New Enum:**
- [ ] Create `src/enums/LendingPositionType.ts`
- [ ] Export from `src/index.ts`

**Rename Fields (snake_case → camelCase):**

*Transaction.ts:*
- [ ] `assets_out` → `assetsOut`
- [ ] `assets_in` → `assetsIn`

*LiquidityPosition.ts:*
- [ ] `fees_earned` → `feesEarned`
- [ ] `impermanent_loss` → `impermanentLoss`

*LendingPosition.ts:*
- [ ] `accrued_interest` → `accruedInterest`
- [ ] `health_factor` → `healthFactor`
- [ ] `liquidation_threshold` → `liquidationThreshold`
- [ ] `type: 'SUPPLY' | 'BORROW'` → `type: LendingPositionType`

**Apply Optional Improvements:**
- [ ] Add `<T extends object>` constraint to ApiResponse generic
- [ ] Update Balance.formatted JSDoc with best practice guidance

**Verification:**
- [ ] Run `npm run build` (should compile without errors)
- [ ] Run `npx tsc --noEmit` (should pass)
- [ ] Verify LendingPositionType exported

---

### Phase 2: JSDoc Implementation (v0.1.0-v0.2.0)

Add JSDoc to all types following patterns in this document:

- [ ] Chain enum
- [ ] IntegrationSource enum
- [ ] TransactionType enum
- [ ] AccountType enum
- [ ] LendingPositionType enum
- [ ] Asset interface
- [ ] NFT interface
- [ ] Balance interface
- [ ] PortfolioAsset interface
- [ ] Price interface
- [ ] MarketData interface
- [ ] LiquidityPosition interface
- [ ] StakedPosition interface
- [ ] LendingPosition interface
- [ ] Transaction interface
- [ ] Account interface
- [ ] IntegrationCredentials interface
- [ ] SyncStatus interface
- [ ] ApiResponse interface
- [ ] ApiError interface
- [ ] PaginatedResponse interface
- [ ] AssetIdentifier type
- [ ] TimeRange type
- [ ] SortOrder type
- [ ] FilterOptions interface
- [ ] Portfolio interface
- [ ] PortfolioItem interface (+ @deprecated tag)

---

### Phase 3: Testing (v0.2.0)

- [ ] Setup Vitest coverage reporting (>95% target)
- [ ] Create unit tests for all types
- [ ] Create integration tests for external mapping
- [ ] Setup fast-check for property-based tests
- [ ] Create test data fixtures

---

### Phase 4: Contract Enforcement (v0.3.0)

- [ ] Setup @microsoft/api-extractor
- [ ] Create breaking change detection CI
- [ ] Document contract testing in CONTRIBUTING.md

---

## JSDoc Reference

### Required Tags

- `@since` - Version introduced
- `@stability` - Stability tier (core, standard, extended)
- `@example` - At least one usage example
- Field docs for ALL fields
- Cross-references with `@see`

### Example Pattern

```typescript
/**
 * One-line description.
 *
 * Multi-paragraph explanation with design patterns,
 * usage context, architectural rationale.
 *
 * **Design Pattern:** Explanation
 *
 * @example
 * ```typescript
 * const example: TypeName = { field: "value" };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link RelatedType}
 */
export interface TypeName {
  /** Field description with constraints */
  field: string;
}
```

---

## Summary

**Type Count:** 30+ types fully specified
- Foundation: 2
- Enums: 6
- Assets: 4
- Market: 2
- Positions: 3
- Transactions: 1
- Integration: 3
- Response: 3
- Utility: 4
- Portfolio: 2

**Status:** ✅ Ready for implementation

All corrections from System Architect review have been applied. Developers can now:
1. Apply structural changes (Phase 1)
2. Add JSDoc to source files following patterns above (Phase 2)
3. Implement test suite (Phase 3)

---

**End of Unit Architecture Specification**
