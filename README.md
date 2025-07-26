# @cygnus-wealth/data-models

TypeScript type definitions for standardizing financial data across the CygnusWealth ecosystem.

## Overview

This package provides a unified type system for financial data from various sources including:
- Centralized exchanges (CEX) - Robinhood, Kraken, Coinbase
- Decentralized exchanges (DEX) and on-chain data
- Multi-chain wallets - MetaMask, Phantom, Sui Wallet
- Manual entries and external financial platforms

## Installation

```bash
npm install @cygnus-wealth/data-models
```

## Usage

```typescript
import { 
  Portfolio, 
  Asset, 
  Transaction, 
  MarketData 
} from '@cygnus-wealth/data-models';

// Example: Working with portfolio data
const portfolio: Portfolio = {
  id: 'portfolio-123',
  name: 'Main Portfolio',
  assets: [],
  totalValue: 50000,
  source: 'kraken',
  lastUpdated: new Date()
};
```

## Core Types

### Financial Data Types
- `Portfolio` - Complete portfolio representation
- `Asset` - Individual asset holdings
- `Transaction` - Transaction records across platforms
- `MarketData` - Real-time and historical market data
- `Position` - Trading positions and holdings
- `Balance` - Account and wallet balances

### Source Identifiers
- `DataSource` - Union type for all supported data sources
- `ChainId` - Blockchain network identifiers
- `AssetType` - Asset classification (crypto, stock, NFT, etc.)

## Type Design Principles

1. **Multi-source compatibility** - Types accommodate data from various financial platforms
2. **Optional fields** - Prefer optional properties over provider-specific interfaces
3. **Source tracking** - Include identifiers to track data origin
4. **Normalization-ready** - Structured for easy data transformation
5. **Type safety** - Leverage TypeScript's type system for compile-time guarantees

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Build type declarations
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

### Project Structure
```
src/
├── index.ts        # Main entry point with all type exports
└── index.test.ts   # Type definition tests

dist/               # Generated TypeScript declarations (gitignored)
```

### Testing
Tests ensure type consistency and proper structure:
```bash
npm test              # Run tests in watch mode
npm test -- --run     # Run tests once
```

## Contributing

When adding new types:
1. Define types in `src/index.ts`
2. Add corresponding tests in `src/index.test.ts`
3. Follow existing naming conventions
4. Document complex types with JSDoc comments
5. Run tests and linting before submitting

## License

Part of the CygnusWealth project. See LICENSE file for details.

## Related Packages

- `@cygnus-wealth/web-app` - Main web application
- `@cygnus-wealth/crypto-utils` - Blockchain utilities
- `@cygnus-wealth/api-clients` - Exchange API integrations