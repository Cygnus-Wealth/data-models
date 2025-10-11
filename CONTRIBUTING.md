# Contributing to @cygnus-wealth/data-models

Thank you for contributing to the CygnusWealth Data Models package! This document provides guidelines for maintaining the quality and stability of our shared type definitions.

## Table of Contents

- [Development Setup](#development-setup)
- [Testing](#testing)
- [API Contract Management](#api-contract-management)
- [Stability Tiers](#stability-tiers)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)

## Development Setup

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/cygnus-wealth/data-models.git
cd data-models

# Install dependencies
npm install

# Build the project
npm run build
```

### Available Scripts

```bash
npm run build          # Compile TypeScript to dist/
npm test               # Run tests in watch mode
npm run test:run       # Run tests once
npm run test:coverage  # Run tests with coverage report
npm run test:unit      # Run unit tests only
npm run lint           # Run ESLint
npm run api:extract    # Generate API report (local mode)
npm run api:check      # Validate API contract (CI mode)
```

## Testing

We maintain **100% test coverage** for all executable code with comprehensive test suites:

### Test Organization

```
tests/
├── unit/              # Type creation, validation, edge cases
├── integration/       # External data mapping, cross-model tests
├── property-based/    # Invariant testing with fast-check
└── fixtures/          # Reusable test data
```

### Running Tests

```bash
# Run all tests
npm run test:run

# Run with coverage
npm run test:coverage

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:property
```

### Writing Tests

- **Unit tests**: Test individual type creation, validation, and edge cases
- **Integration tests**: Test mapping from external APIs (CEX, blockchain) to internal types
- **Property-based tests**: Test invariants with fast-check (e.g., JSON serializability, precision preservation)
- **Use fixtures**: Reuse test data from `tests/fixtures/` for consistency

Example:
```typescript
import { describe, it, expect } from 'vitest';
import { Asset, AssetType, Chain } from '../src/index';
import { sampleEthAsset } from './fixtures/assets';

describe('Asset', () => {
  it('should create valid Asset', () => {
    const asset: Asset = {
      id: 'ethereum-eth',
      symbol: 'ETH',
      name: 'Ethereum',
      type: AssetType.CRYPTOCURRENCY,
      chain: Chain.ETHEREUM,
      decimals: 18
    };

    expect(asset.symbol).toBe('ETH');
    expect(asset.decimals).toBe(18);
  });
});
```

## API Contract Management

We use **[@microsoft/api-extractor](https://api-extractor.com/)** to enforce API contracts and detect breaking changes automatically.

### What is an API Contract?

The API contract is a machine-readable report (`etc/data-models.api.md`) that captures the complete public API surface of the package:
- All exported types, interfaces, enums
- Type signatures and generics
- JSDoc comments
- Deprecated APIs

This enables automatic detection of breaking changes during CI/CD.

### Checking for Breaking Changes

Before pushing changes, validate your API contract:

```bash
# Build the project
npm run build

# Check for breaking changes
npm run api:check
```

**Exit codes:**
- `0` - No API changes or compatible changes only
- `1` - Breaking changes detected

### Updating the API Report

If you intentionally make breaking changes (following the appropriate approval process):

```bash
# Regenerate the API report
npm run api:extract

# Review the changes
git diff etc/data-models.api.md

# Commit the updated report
git add etc/data-models.api.md
git commit -m "docs: update API report for breaking changes"
```

### CI/CD Integration

Our GitHub Actions workflow automatically validates API contracts on all PRs:

- **On PR**: Checks for breaking changes and comments if detected
- **On merge**: Validates that API report is up to date

If CI fails with "API Contract Violation":
1. Review the detected changes
2. Ensure changes follow stability tier approval process
3. Update API report: `npm run api:extract`
4. Commit and push the updated report

## Stability Tiers

All types are classified into stability tiers that determine the approval process for breaking changes:

| Tier | Types | Breaking Change Process |
|------|-------|------------------------|
| **Core** | BaseEntity, Metadata, All Enums, LendingPositionType, PortfolioItem | Unanimous Board approval |
| **Standard** | Asset, Transaction, Account, Portfolio, Price, MarketData, Balance, PortfolioAsset | RFC with majority vote |
| **Extended** | LiquidityPosition, StakedPosition, LendingPosition, IntegrationCredentials, SyncStatus | Expedited RFC |

### What Constitutes a Breaking Change?

- Removing a type, interface, or enum
- Removing an enum value (even from non-Core enums)
- Changing a required field to optional or vice versa
- Renaming a field or type
- Changing a type signature
- Removing or changing generic constraints

### Non-Breaking Changes

- Adding a new type, interface, or enum
- Adding a new enum value (append only)
- Adding an optional field to an existing interface
- Adding JSDoc comments or improving documentation
- Internal refactoring that doesn't affect public API

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-fix-name
```

### 2. Make Your Changes

- Follow existing code style
- Add comprehensive JSDoc to all public APIs
- Include `@since`, `@stability`, `@example` tags
- Update or add tests for your changes

### 3. Validate Your Changes

```bash
# Run tests
npm run test:coverage

# Check for type errors
npm run build

# Lint your code
npm run lint

# Check API contract
npm run api:check
```

### 4. Update API Report (if needed)

If you made intentional API changes:

```bash
npm run api:extract
git add etc/data-models.api.md
```

### 5. Commit Your Changes

Follow conventional commit format:

```bash
git commit -m "feat: add new transaction type for cross-chain swaps"
git commit -m "fix: correct balance calculation for staked positions"
git commit -m "docs: improve JSDoc for Asset interface"
git commit -m "test: add property-based tests for metadata serialization"
```

## Pull Request Process

1. **Create PR** with clear title and description
2. **Ensure CI passes**:
   - All tests pass (100% coverage)
   - No TypeScript errors
   - No linting errors
   - No API contract violations (or intentional + documented)
3. **Request review** from maintainers
4. **Address feedback** and update PR
5. **Merge** once approved and CI is green

### PR Checklist

- [ ] Tests added/updated and passing
- [ ] JSDoc added/updated for all public APIs
- [ ] API contract validated (`npm run api:check`)
- [ ] API report updated if breaking changes (with approval)
- [ ] CLAUDE.md updated if architectural guidance changed
- [ ] Conventional commit messages used

## Questions?

- Open an issue for bugs or feature requests
- Tag maintainers in PRs for urgent reviews
- Reference UNIT_ARCHITECTURE.md for detailed type specifications

Thank you for contributing to CygnusWealth! 🚀
