# Data Models Architecture

## Bounded Context Overview

The Data Models bounded context serves as the foundational **Contract Domain** for the entire CygnusWealth ecosystem. It defines the unified data structures and contracts that ensure consistency, type safety, and clear communication between all domains.

## Strategic Position

As defined in the enterprise architecture, this bounded context:
- Acts as the **ubiquitous language** across all domains
- Provides the **canonical representation** for all financial entities
- Ensures **type safety** through TypeScript interfaces
- Enables **domain isolation** by serving as the only shared dependency

## Core Responsibilities

### Primary Functions
1. **Unified Data Structures**: Define all shared data models across the system
2. **Domain Contracts**: Establish interfaces between domains
3. **Data Validation**: Provide validation rules and constraints
4. **Standardization**: Ensure consistent data representation
5. **Versioning**: Manage data model evolution

### Domain Boundaries
- **Owns**: All shared data definitions, validation rules, and constants
- **Does NOT Own**: Business logic, data fetching, UI components, persistence

## Architecture Principles

### 1. Pure Types Package
- **No Business Logic**: Contains only TypeScript type definitions and interfaces
- **Minimal Runtime Code**: Compiles to declaration files only (`emitDeclarationOnly: true`)
  - **Architectural Exception**: TypeScript enums generate minimal runtime code for reverse mapping and are explicitly permitted as the sole exception to the "no runtime code" principle. This is an intentional architectural decision that balances type safety with practical usability.
- **Zero Dependencies**: No external dependencies to maintain purity
- **ESM Module**: Modern module format for tree-shaking and optimal bundling

### 2. Domain-Driven Design Alignment
- **Value Objects**: Immutable data structures (Price, Balance, MarketData)
- **Entities**: Identity-based models (Account, Portfolio, Transaction)
- **Aggregates**: Composite structures (Portfolio containing PortfolioAssets)
- **Domain Events**: Transaction types and state changes

### 3. Standardization Strategy
- **Unified Representation**: Consistent structure regardless of data source
- **Source Agnostic**: Models accommodate CEX, DEX, and blockchain data
- **Extensible Design**: Optional fields for source-specific data
- **Type Composition**: Build complex types from simpler primitives

## Data Standardization Principles

### Unified Representation
- All monetary values use consistent decimal precision
- Timestamps are ISO 8601 formatted
- Addresses are checksummed where applicable
- Token amounts account for decimals

### Cross-Domain Consistency
- Same asset has identical structure regardless of source
- Transaction format unified across CEX and DEX sources
- Error codes standardized across all integrations
- Status enums consistent throughout system

## Core Model Categories

### 1. Foundation Layer
```
BaseEntity          - Common fields (id, timestamps)
Metadata           - Extensible key-value pairs for source-specific data
Enums              - Type-safe constants for standardization
Constants           - Shared validation rules and limits
```

### 2. Asset Models
```
Asset              - Universal asset representation
NFT                - Non-fungible token specifics
Balance            - Quantity and decimal handling
Value              - Monetary valuation with currency and timestamp
PortfolioAsset     - Asset with valuation context
```

### 3. Market Data Models
```
Price              - Point-in-time pricing
PriceHistory       - Historical price points for charting
MarketData         - Comprehensive market metrics
VolumeData         - Trading volume across timeframes
TimeRange          - Historical data queries
```

### 4. Position Models
```
LiquidityPosition  - DEX liquidity provisions
StakedPosition     - Staking and delegation
LendingPosition    - DeFi lending protocols
```

### 5. Transaction Models
```
Transaction        - Unified transaction format
TransactionType    - Categorized operations (transfer, swap, deposit, withdrawal, mint, burn, trade)
TransactionStatus  - States (pending, confirmed, failed, cancelled)
TransactionMetadata - Additional context and source-specific data
```

### 6. Integration Models
```
IntegrationSource  - Data origin identification (EVM, Solana, Robinhood, etc.)
ConnectionState    - Status of integration connections
SyncStatus         - Data freshness and last update times
ErrorStates        - Standardized error representations
Account            - External account mapping
```

### 7. Response Models
```
ApiResponse        - Standardized API responses
ApiError           - Error representation
PaginatedResponse  - Pagination metadata
```

### 8. Chain and Network Models
```
ChainIdentity      - Blockchain identifiers and metadata
NetworkConfiguration - RPC endpoints and chain parameters
TokenStandards     - ERC-20, ERC-721, ERC-1155, SPL tokens
AddressFormats     - Chain-specific address representations and validation
```

## Data Flow Architecture

```
External APIs → Integration Domains → [Data Models Transform] → Portfolio Domain → Experience Domain
                                              ↑
                                    Contract Enforcement
                                    Type Validation
                                    Data Normalization
```

## Model Design Patterns

### 1. Union Types for Flexibility
```typescript
// Accommodate multiple sources
type AssetType = 'cryptocurrency' | 'stock' | 'nft' | 'fiat';
type Chain = 'ethereum' | 'solana' | 'polygon' | 'robinhood';
```

### 2. Optional Fields for Extensibility
```typescript
interface Asset {
  // Required core fields
  id: string;
  symbol: string;
  
  // Optional source-specific
  contractAddress?: string;
  mintAddress?: string;
  cusip?: string;
}
```

### 3. Metadata for Custom Data
```typescript
interface Metadata {
  [key: string]: any; // Source-specific data
}
```

### 4. Composition Over Inheritance
```typescript
// Compose complex models from primitives
interface PortfolioAsset extends Asset {
  balance: Balance;
  price?: Price;
  marketData?: MarketData;
}
```

## Integration Contract

### Provider Responsibilities
Integration domains (EVM, Solana, Robinhood) must:
1. Transform external data to these models
2. Validate required fields
3. Handle source-specific fields via metadata
4. Maintain data consistency

### Consumer Expectations
Consuming domains can expect:
1. Type-safe interfaces
2. Consistent structure
3. Validated data
4. Source identification

## Versioning Strategy

### Current Version Status
**Version**: 0.0.3 (Pre-1.0 Development Phase)

**Version Stability Commitment**:
- **0.x Versions**: Rapid iteration phase, breaking changes permitted with notice
- **1.0 Milestone**: First stable release with full API stability guarantees
- **Post-1.0**: Strict semantic versioning with contract stability tiers

### Roadmap to Version 1.0

**Version 0.x Milestones**:
- **v0.1.0** (Target: Q4 2025): Comprehensive JSDoc documentation coverage
- **v0.2.0** (Target: Q1 2026): Contract governance framework implemented
- **v0.3.0** (Target: Q1 2026): Architectural fitness functions operational
- **v0.4.0** (Target: Q2 2026): Breaking change detection automated
- **v0.5.0** (Target: Q2 2026): All consuming bounded contexts integrated and stable

**Version 1.0 Criteria**:
1. ✅ All core interfaces documented with JSDoc
2. ✅ Contract Governance Board established with active representation
3. ✅ Automated breaking change detection in CI/CD
4. ✅ 100% test coverage for all models
5. ✅ Three consuming bounded contexts in production use
6. ✅ Zero critical issues outstanding
7. ✅ Migration guide from 0.x to 1.0 published

**Target Date**: Q2 2026 (Subject to Governance Board approval)

### Semantic Versioning
- **Major**: Breaking changes to existing interfaces (post-1.0 requires RFC)
- **Minor**: New interfaces or optional fields
- **Patch**: Documentation and type refinements

### Backward Compatibility Rules
1. Never remove required fields (post-1.0)
2. New fields are optional by default
3. Deprecation notices minimum one major version before removal
4. Provide migration paths for breaking changes
5. Version flags for conditional handling during transitions

### Pre-1.0 Evolution Policy
During the 0.x phase, we reserve the right to make breaking changes, but will:
- Announce breaking changes via CHANGELOG and GitHub Releases
- Provide migration guidance for all breaking changes
- Coordinate with consuming bounded contexts before changes
- Use minor version bumps for breaking changes (e.g., 0.1.0 → 0.2.0)

### Schema Evolution
- Semantic versioning for model changes
- Documentation of all changes in CHANGELOG
- Automated migration tooling support (codemods) for major versions
- Compatibility testing across domains in CI/CD pipeline

## Security Considerations

### Data Validation
- No private keys or secrets in models
- Address checksums where applicable
- Address format validation per chain
- Numeric bounds checking for amounts
- Integer overflow protection
- String sanitization rules
- Required field enforcement
- Referential integrity between related models

### Data Sanitization
- Input validation on all external data
- XSS prevention in string fields
- SQL injection prevention in queries
- Integer overflow protection

### Privacy Protection
- No PII in core models
- API keys encrypted at rest (by consumers)
- Personal information minimized
- Encryption handled by consumers
- Read-only data representation
- No transaction signing capabilities
- Audit trails for data access (implemented by consumers)

## Performance Optimization

### Type-Level Optimization
- Minimal data structure nesting
- Efficient union types
- Avoid circular dependencies
- Tree-shakeable exports
- Efficient serialization formats

### Runtime Considerations
- Zero runtime overhead (types only)
- No validation logic (consumer responsibility)
- Optimal bundle size
- Fast compilation
- Lazy loading for heavy fields (implemented by consumers)
- Compression for large datasets (implemented by consumers)

### Caching Guidelines
- Immutable data can be cached indefinitely
- Market data requires TTL-based caching
- Balance data needs invalidation on updates
- Transaction history can be incrementally cached

## Architectural Fitness Functions

Architectural fitness functions are automated checks that continuously validate architectural constraints. These functions ensure the architecture doesn't degrade over time.

### Build-Time Fitness Functions

**1. Declaration-Only Compilation**
```bash
# Verify only .d.ts files are emitted (except enum runtime code)
npm run build && [[ $(find dist -type f ! -name "*.d.ts" | wc -l) -eq 0 ]]
```
- **Purpose**: Enforce "types-only" architectural constraint
- **Frequency**: Every build
- **Failure Action**: Block build, require architecture review

**2. Zero Runtime Dependencies**
```bash
# Verify no production dependencies exist
[[ $(jq '.dependencies | length' package.json) -eq 0 ]]
```
- **Purpose**: Maintain purity and prevent dependency conflicts
- **Frequency**: Pre-commit hook, CI/CD
- **Failure Action**: Block commit, require architectural waiver

**3. Breaking Change Detection**
```bash
# Use api-extractor or similar tool to detect breaking changes
npx api-extractor run --local
```
- **Purpose**: Prevent unintentional breaking changes
- **Frequency**: Pull request CI
- **Failure Action**: Require explicit breaking change acknowledgment

### Documentation Fitness Functions

**4. JSDoc Coverage**
```bash
# Verify all exported interfaces have JSDoc
npm run check-docs-coverage
```
- **Purpose**: Ensure contract documentation completeness
- **Target**: 100% coverage for all exported interfaces
- **Frequency**: Pull request CI
- **Failure Action**: Block merge until documentation added

**5. Changelog Entry**
```bash
# Verify CHANGELOG.md updated for non-patch changes
./scripts/check-changelog.sh
```
- **Purpose**: Maintain change history for consuming domains
- **Frequency**: Pull request CI
- **Failure Action**: Remind contributor to update CHANGELOG

### Contract Fitness Functions

**6. Contract Compatibility Tests**
```bash
# Run compatibility tests against previous versions
npm run test:compatibility
```
- **Purpose**: Ensure backward compatibility within same major version
- **Frequency**: Pull request CI
- **Failure Action**: Block merge or require major version bump

**7. Consumer Integration Tests**
```bash
# Test against consuming bounded contexts
npm run test:consumers
```
- **Purpose**: Validate changes don't break downstream consumers
- **Frequency**: Nightly builds, pre-release
- **Failure Action**: Alert Governance Board, require coordination

### Implementation Plan
- **Phase 1** (v0.1.0): Implement fitness functions #1, #2, #5
- **Phase 2** (v0.2.0): Implement fitness functions #3, #4
- **Phase 3** (v0.3.0): Implement fitness functions #6, #7

## Testing Strategy

### Type Testing
- Compile-time type checking via TypeScript compiler
- Interface compatibility tests across versions
- Mock data generation for consumer testing
- Cross-domain integration tests with consuming bounded contexts

### Contract Testing
- Consumer-driven contract tests (Pact or similar)
- Breaking change detection via api-extractor
- Version compatibility checks against previous releases
- Schema validation using JSON Schema or Zod
- Performance regression tests for bundle size

### Model Validation
- Unit tests for all type guards and validators
- Property-based testing for data generators
- Edge case coverage for optional field combinations
- Cross-domain integration tests with real consumer scenarios

## Future Extensibility

### Planned Enhancements
1. **Additional Asset Types**: Commodities, bonds, derivatives
2. **New Chains**: Bitcoin, Cosmos, Near
3. **Advanced Positions**: Options, futures, perpetuals
4. **Analytics Models**: Performance metrics, risk indicators

### Extension Points
- Enum values can be extended
- Optional fields for new features
- Metadata for experimental data
- Version flags for migration

## Developer Guidelines

### When Adding New Models
1. Review existing patterns
2. Ensure source agnosticism
3. Add comprehensive JSDoc
4. Update index exports
5. Add test coverage
6. Document in CHANGELOG

### Model Naming Conventions
- **Interfaces**: PascalCase (e.g., `Portfolio`)
- **Enums**: PascalCase (e.g., `AssetType`)
- **Types**: PascalCase (e.g., `AssetIdentifier`)
- **Fields**: camelCase (e.g., `marketCap`)

## Documentation Standards

### JSDoc as Architectural Contract

Documentation in a contract-first system is not supplementary—it IS part of the architecture. Every exported interface represents a semantic contract with consuming bounded contexts.

**Documentation Philosophy**:
- JSDoc is not code commentary; it is contract specification
- Type signatures describe syntax; JSDoc describes semantics
- Consumers depend on semantic contracts as much as type signatures
- Documentation quality directly impacts architectural adoption

### Model Documentation Requirements

Every exported interface, type, and enum MUST include:

1. **Purpose and Context**
```typescript
/**
 * Represents a financial asset across all integration sources (CEX, DEX, blockchain).
 *
 * This is the unified representation that normalizes asset data from multiple sources
 * including Robinhood, Kraken, Ethereum, Solana, and other chains. The Asset interface
 * serves as the canonical identity for any tradeable or holdable financial instrument
 * within the CygnusWealth ecosystem.
 *
 * @example
 * const ethAsset: Asset = {
 *   id: "eth-ethereum",
 *   symbol: "ETH",
 *   name: "Ethereum",
 *   type: AssetType.CRYPTOCURRENCY,
 *   decimals: 18,
 *   chain: Chain.ETHEREUM,
 *   coingeckoId: "ethereum"
 * };
 *
 * @since 0.0.1
 * @stability standard
 */
export interface Asset { ... }
```

2. **Field-Level Documentation**
```typescript
export interface Asset {
  /** Unique identifier for the asset across all sources. Format: `{symbol}-{chain}` or provider-specific ID */
  id: string;

  /** Trading symbol or ticker (e.g., "BTC", "ETH", "AAPL") */
  symbol: string;

  /** Human-readable asset name (e.g., "Bitcoin", "Ethereum", "Apple Inc.") */
  name: string;

  /**
   * Number of decimal places for the asset.
   * For ERC-20 tokens, this matches the `decimals()` contract value.
   * For stocks, typically 2.
   * @default undefined for assets that don't require decimal precision
   */
  decimals?: number;
}
```

3. **Stability Indicators**
Use JSDoc tags to indicate contract stability tier:
- `@stability core` - Core tier, extremely stable
- `@stability standard` - Standard tier, stable with deprecation notices
- `@stability extended` - Extended tier, may evolve more rapidly
- `@stability experimental` - Experimental tier, no guarantees

4. **Version and Change History**
```typescript
/**
 * @since 0.0.1 - Initial implementation
 * @since 0.2.0 - Added `coingeckoId` field for market data integration
 * @deprecated Use {@link AssetV2} instead. Will be removed in v2.0.0
 */
```

5. **Cross-References and Relationships**
```typescript
/**
 * @see {@link Balance} for representing quantities of this asset
 * @see {@link Price} for current market pricing
 * @see {@link PortfolioAsset} for asset with portfolio context
 */
```

### Change Documentation
- **CHANGELOG.md**: All modifications documented with version, date, and rationale
- **Migration Guides**: Step-by-step guides for breaking changes
- **Deprecation Schedules**: Clear timeline and alternatives for deprecated interfaces
- **Impact Analysis**: Assessment of which consuming domains are affected

### Documentation Quality Gates
- JSDoc coverage enforced via fitness function (target: 100%)
- Examples required for all complex interfaces
- Stability tags mandatory for all exported types
- Documentation review required in pull request process

## Integration Guidelines

### Using Data Models
- Import only required models
- Validate data at domain boundaries
- Transform external data immediately
- Maintain type safety throughout

### Extending Models
- Domain-specific extensions allowed locally
- Core models remain immutable
- Extensions documented clearly
- No breaking changes to contracts

## Dependencies and Constraints

### Technical Constraints
- TypeScript 5.0+ required
- ESM module format
- Node.js 18+ for development
- Vitest for testing

### Domain Constraints
- No business logic
- No external dependencies
- No side effects
- No implementation code

## Relationship to Other Bounded Contexts

### Upstream Dependencies
- None (foundational layer)

### Downstream Consumers
- **portfolio-aggregation**: Uses all models for orchestration
- **asset-valuator**: Uses pricing and market models
- **evm-integration**: Transforms to Asset, Transaction models
- **sol-integration**: Transforms to Asset, NFT models
- **robinhood-integration**: Transforms to Asset, Account models
- **wallet-integration-system**: Uses Account, Chain models
- **cygnus-wealth-app**: Consumes Portfolio, Asset models

### Contract Governance

#### Governance Framework
As the foundational Published Language for the CygnusWealth enterprise, this bounded context requires rigorous contract governance to prevent cascading breaking changes across all consuming domains.

**Contract Governance Board**:
- **Composition**: Representatives from each consuming bounded context (portfolio-aggregation, asset-valuator, evm-integration, sol-integration, robinhood-integration, wallet-integration-system, cygnus-wealth-app)
- **Purpose**: Review and approve all proposed changes to public contracts
- **Meeting Cadence**: As-needed for significant changes, with 48-hour minimum review period

**Change Classification**:
1. **Non-Breaking Changes** (Minor/Patch): New optional fields, new models, documentation improvements
   - Require: PR review by System Architect
   - Approval: Single approver from Governance Board

2. **Breaking Changes** (Major): Removed fields, renamed interfaces, type changes
   - Require: RFC (Request for Comments) process
   - Approval: Majority vote from Governance Board
   - Migration Path: Mandatory codemods or migration guide
   - Notice Period: Minimum 2 sprint cycles before implementation

**RFC Process for Breaking Changes**:
1. **Proposal**: Submit RFC document describing change rationale, impact analysis, migration path
2. **Review Period**: 5 business days for Governance Board feedback
3. **Discussion**: Synchronous or asynchronous discussion to address concerns
4. **Vote**: Majority approval required (>50% of active Board members)
5. **Implementation**: After approval with documented migration guide

**Contract Stability Tiers**:
- **Core Tier** (BaseEntity, Metadata, Enums): Extremely stable, breaking changes require unanimous Board approval
- **Standard Tier** (Asset, Transaction, Portfolio): Stable with deprecation notices, standard RFC process
- **Extended Tier** (Position models, specialized integrations): May evolve more rapidly, expedited RFC process
- **Experimental Tier** (marked with `@experimental` JSDoc tag): No stability guarantees, can change without RFC

#### Governance Rules
- Changes require cross-domain review via Governance Board
- Breaking changes need RFC approval and migration plan
- Deprecation follows 2-version policy with clear migration path
- All domains must coordinate updates for major versions
- Emergency fixes (security, critical bugs) may bypass RFC with post-facto review

## Monitoring and Metrics

### Quality Metrics
- Type coverage: 100%
- Documentation coverage: 100%
- Export completeness
- Breaking change frequency

### Usage Analytics
- Most imported interfaces
- Unused exports
- Version adoption rate
- Consumer feedback

## Migration Path

### From v0.x to v1.0
- Standardize all enum values
- Complete interface documentation
- Add missing optional fields
- Ensure backward compatibility

### Future Major Versions
- Provide codemods for migration
- Maintain previous version branch
- Gradual deprecation cycle
- Consumer migration support