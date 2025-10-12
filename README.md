# @cygnus-wealth/data-models

[![npm version](https://img.shields.io/npm/v/@cygnus-wealth/data-models.svg)](https://www.npmjs.com/package/@cygnus-wealth/data-models)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/cygnus-wealth/data-models)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)

**Production-ready TypeScript data models for multi-chain portfolio aggregation and financial data standardization.**

A comprehensive, battle-tested type system for the CygnusWealth ecosystem with 100% test coverage, complete JSDoc documentation, and automatic breaking change detection.

## Features

✅ **30+ Standardized Types** - Enums, interfaces, and types for all financial data
✅ **100% Test Coverage** - 286 tests across unit, integration, and property-based suites
✅ **Complete JSDoc** - Every type fully documented with examples and design patterns
✅ **API Contract Enforcement** - Automatic breaking change detection with @microsoft/api-extractor
✅ **Multi-Chain Support** - EVM chains, Solana, SUI, Bitcoin
✅ **Multi-Source Integration** - CEX, DEX, wallets, manual entries
✅ **Type Safety** - Strict TypeScript types with generic constraints
✅ **Stability Tiers** - Clear guarantees for breaking changes

## Installation

```bash
npm install @cygnus-wealth/data-models
```

## Quick Start

```typescript
import {
  Asset,
  AssetType,
  Chain,
  Transaction,
  TransactionType,
  Portfolio,
  LendingPosition,
  LendingPositionType
} from '@cygnus-wealth/data-models';

// Create an asset
const ethAsset: Asset = {
  id: 'ethereum-eth',
  symbol: 'ETH',
  name: 'Ethereum',
  type: AssetType.CRYPTOCURRENCY,
  chain: Chain.ETHEREUM,
  decimals: 18,
  coingeckoId: 'ethereum'
};

// Track a DeFi lending position
const aaveSupply: LendingPosition = {
  id: 'aave-usdc-supply',
  protocol: 'Aave V3',
  chain: Chain.ETHEREUM,
  type: LendingPositionType.SUPPLY,
  asset: {
    id: 'ethereum-usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    type: AssetType.CRYPTOCURRENCY,
    decimals: 6
  },
  amount: '50000',
  apy: 3.5,
  accruedInterest: 125.50
};

// Record a transaction
const swapTx: Transaction = {
  id: 'tx-0x123abc',
  accountId: 'wallet-1',
  type: TransactionType.SWAP,
  status: 'COMPLETED',
  chain: Chain.ETHEREUM,
  timestamp: new Date(),
  assetsOut: [{
    asset: ethAsset,
    amount: '1.5'
  }],
  assetsIn: [{
    asset: { id: 'ethereum-usdc', symbol: 'USDC', name: 'USD Coin', type: AssetType.CRYPTOCURRENCY, decimals: 6 },
    amount: '3000'
  }]
};
```

## Type Categories

### Foundation (2 types)
- `BaseEntity` - Common fields for all entities (id, timestamps)
- `Metadata` - Extensible key-value store for source-specific data

### Enums (6 types)
- `AssetType` - Asset classification (CRYPTOCURRENCY, STOCK, NFT, etc.)
- `Chain` - Blockchain networks (ETHEREUM, SOLANA, SUI, etc.)
- `IntegrationSource` - Data sources (CEX, DEX, wallets)
- `TransactionType` - Transaction operations (BUY, SELL, SWAP, STAKE, etc.)
- `AccountType` - Account categories (SPOT, WALLET, DEFI, etc.)
- `LendingPositionType` - Lending types (SUPPLY, BORROW)

### Assets (4 types)
- `Asset` - Universal asset representation
- `NFT` - Non-fungible tokens with metadata
- `Balance` - Asset quantities with P&L tracking
- `PortfolioAsset` - Aggregated asset view across accounts

### Market Data (2 types)
- `Price` - Point-in-time asset pricing
- `MarketData` - Comprehensive market metrics (volume, market cap, ATH/ATL)

### Positions (3 types)
- `LiquidityPosition` - DEX LP positions with impermanent loss tracking
- `StakedPosition` - Proof-of-stake positions with rewards
- `LendingPosition` - DeFi lending/borrowing with health factors

### Transactions (1 type)
- `Transaction` - Universal transaction model with asset flow pattern

### Integration (3 types)
- `Account` - Multi-source account aggregation
- `IntegrationCredentials` - Encrypted API credentials
- `SyncStatus` - Data synchronization state

### Response (3 types)
- `ApiResponse<T>` - Generic response wrapper with error handling
- `ApiError` - Structured error with retry metadata
- `PaginatedResponse<T>` - Paginated data with navigation

### Utility (4 types)
- `AssetIdentifier` - Flexible asset lookup
- `TimeRange` - Date range queries
- `SortOrder` - Sort direction
- `FilterOptions` - Universal filtering

### Portfolio (2 types)
- `Portfolio` - Complete portfolio with performance tracking
- `PortfolioItem` - ⚠️ **Deprecated** (use `PortfolioAsset`)

## Stability Tiers

All types follow semantic versioning with documented stability guarantees:

| Tier | Types | Breaking Change Process |
|------|-------|------------------------|
| **Core** | BaseEntity, Metadata, All Enums | Unanimous Board approval |
| **Standard** | Asset, Transaction, Account, Portfolio, Price, MarketData | RFC with majority vote |
| **Extended** | Positions, Integration models | Expedited RFC |

Breaking changes are automatically detected via API Extractor in CI/CD.

## Testing

**286 tests** with **100% coverage** across multiple test types:

```bash
# Run all tests
npm test

# Run tests once (no watch)
npm run test:run

# Run with coverage report
npm run test:coverage

# Run specific test suites
npm run test:unit          # Unit tests (240+ tests)
npm run test:integration   # Integration tests (10 tests)
npm run test:property      # Property-based tests (22 tests)
```

### Test Organization

```
tests/
├── unit/              # Type creation, validation, edge cases
├── integration/       # External API mapping (CEX, blockchain → types)
├── property-based/    # Invariant testing with fast-check
└── fixtures/          # Reusable test data (76+ samples)
```

### Coverage by Section

- Foundation & Enums: **100%**
- Core Models: **100%**
- Extended Models: **100%**
- Integration Models: **100%**
- **Overall: 100%**

## API Contract Management

This package uses **@microsoft/api-extractor** to enforce API contracts and prevent accidental breaking changes.

### For Consumers

All public API changes are tracked in `etc/data-models.api.md`. The API report serves as a changelog for type signatures.

### For Contributors

```bash
# Check for breaking changes (CI also runs this)
npm run api:check

# Update API report after intentional changes
npm run api:extract
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:
- Making changes to types
- API contract validation
- Breaking change approval process
- Pull request workflow

## Development

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm 9+

### Setup

```bash
# Clone repository
git clone https://github.com/cygnus-wealth/data-models.git
cd data-models

# Install dependencies
npm install

# Build project
npm run build

# Run tests
npm run test:coverage

# Lint code
npm run lint
```

### Project Structure

```
data-models/
├── src/
│   ├── enums/           # 6 enums (Chain, AssetType, etc.)
│   ├── interfaces/      # 21 interfaces (Asset, Transaction, etc.)
│   ├── types/           # 4 type aliases (AssetIdentifier, etc.)
│   └── index.ts         # Main export
├── tests/
│   ├── unit/            # 10 test files, 240+ tests
│   ├── integration/     # External mapping tests
│   ├── property-based/  # Invariant tests with fast-check
│   └── fixtures/        # 9 fixture files, 76+ samples
├── etc/
│   └── data-models.api.md  # API contract report
├── .github/
│   └── workflows/
│       └── api-contract.yml  # CI/CD for breaking changes
├── api-extractor.json   # API Extractor config
├── vitest.config.ts     # Vitest config (95% thresholds)
├── tsconfig.json        # TypeScript config
├── CONTRIBUTING.md      # Contributor guidelines
├── UNIT_ARCHITECTURE.md # Complete architecture specs
└── package.json
```

## Documentation

Every type includes comprehensive JSDoc with:
- **Description** - Purpose and use cases
- **Design patterns** - Architectural rationale
- **@example** - Realistic usage examples
- **@since** - Version introduced
- **@stability** - Stability tier
- **@see** - Related types
- **Field docs** - Inline documentation for all properties

Example:
```typescript
/**
 * Universal transaction representation across all sources.
 *
 * Normalized transaction model supporting blockchain transfers, CEX trades,
 * DEX swaps, DeFi operations, and traditional finance transactions. Uses
 * asset flow pattern (assetsIn/assetsOut) to handle complex multi-asset
 * operations like swaps, liquidity provision, and protocol interactions.
 *
 * **Design Pattern:** Event sourcing pattern with asset flow arrays supporting
 * 1:1 transfers, 1:N distributions, N:1 swaps, and N:M complex operations.
 * Status field enables tracking pending and failed transactions.
 *
 * @example
 * ```typescript
 * // DEX swap (ETH -> USDC)
 * const swap: Transaction = {
 *   id: 'tx-0x456def',
 *   accountId: 'wallet-1',
 *   type: TransactionType.SWAP,
 *   status: 'COMPLETED',
 *   assetsOut: [{ asset: ethAsset, amount: '2.0' }],
 *   assetsIn: [{ asset: usdcAsset, amount: '4000' }]
 * };
 * ```
 *
 * @since 0.0.1
 * @stability standard
 *
 * @see {@link TransactionType} for operation classification
 * @see {@link Account} for transaction aggregation
 */
export interface Transaction { ... }
```

## Multi-Chain Support

### EVM Chains
- Ethereum (mainnet)
- Polygon, Arbitrum, Optimism, Base
- Avalanche, Binance Smart Chain

### Alternative L1s
- Solana
- SUI
- Bitcoin

### Coming Soon
- Cosmos ecosystem
- Polkadot parachains
- Additional EVM L2s

## Integration Sources

### Centralized Exchanges (CEX)
- Robinhood, Kraken, Coinbase, Binance

### Decentralized Exchanges (DEX)
- Uniswap, SushiSwap, PancakeSwap
- Curve, Balancer

### Wallets
- MetaMask, Rabby (EVM)
- Phantom (Solana)
- Slush, Suiet (SUI)

### Other
- Manual entry
- Direct blockchain RPC

## Use Cases

### Portfolio Aggregation
Combine holdings from CEXs, DEXs, and wallets into unified portfolio view.

### Transaction History
Normalize transaction data across chains and platforms for unified history.

### DeFi Position Tracking
Monitor lending, staking, and liquidity positions with real-time health metrics.

### Cross-Chain Analytics
Aggregate and analyze assets across multiple blockchain networks.

### Data Integration
Transform external API responses into standardized internal types.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development setup
- Testing requirements (100% coverage)
- API contract management
- Stability tier approval process
- Pull request guidelines

**Quick checklist:**
- [ ] Tests added/updated (100% coverage maintained)
- [ ] JSDoc added for all public APIs
- [ ] API contract validated (`npm run api:check`)
- [ ] Build passes (`npm run build`)
- [ ] Linting passes (`npm run lint`)

## Architecture

This package follows Domain-Driven Design (DDD) principles with:
- **Bounded Context**: Data Models domain
- **Unit Architecture**: Complete specifications in UNIT_ARCHITECTURE.md
- **Stability Tiers**: Clear breaking change policies
- **Contract Testing**: Automated API surface validation

See [UNIT_ARCHITECTURE.md](UNIT_ARCHITECTURE.md) for complete architectural specifications.

## Version History

- **v1.0.0** - 🎉 Production release with 100% coverage, API contract enforcement, complete documentation
- **v0.0.3** - Initial types and enums (pre-architecture phases)

## License

ISC License - Part of the CygnusWealth project.

## Related Packages

- `@cygnus-wealth/web-app` - Main portfolio aggregation dApp
- `@cygnus-wealth/crypto-utils` - Blockchain utilities and encryption
- `@cygnus-wealth/api-clients` - Exchange API integrations

## Support

- 📖 Documentation: [UNIT_ARCHITECTURE.md](UNIT_ARCHITECTURE.md)
- 🤝 Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
- 🐛 Issues: [GitHub Issues](https://github.com/cygnus-wealth/data-models/issues)
- 📦 npm: [@cygnus-wealth/data-models](https://www.npmjs.com/package/@cygnus-wealth/data-models)

---

Built with ❤️ for the CygnusWealth ecosystem
