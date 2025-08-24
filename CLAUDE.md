# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CygnusWealth Project Overview

CygnusWealth is a decentralized, client-side dApp for portfolio aggregation and tracking, emphasizing user sovereignty, privacy, and read-only integrations without handling private keys or transaction signing. Built as a browser-first application in a single React + TypeScript codebase, it aggregates data from CEXs, DEXs, and multi-chain wallets, with future cross-platform extensions. The design focuses on intuitive, hierarchical UI/UX to provide seamless overviews, drills, and visualizations while reinforcing decentralization through visual cues and local encryption.

### Key Features
- **CEX Integration**: Read-only access to Robinhood, Kraken, and Coinbase via user-provided API keys, fetched client-side with Axios and encrypted locally.
- **DEX and On-Chain Tracking**: Real-time data from subgraphs and RPCs for positions, NFTs, and histories across Ethereum/EVM, Solana, and SUI.
- **Multi-Wallet Support**: Read-only connections to MetaMask/Rabby (EVM), Phantom (Solana), and Slush (SUI) for balance and transaction aggregation; manual inputs for unsupported platforms stored encrypted on IPFS.
- **Usability Enhancements**: Hierarchical dashboard with charts (Recharts), real-time alerts, exports, and progressive disclosure; privacy-forward elements like lock icons and ZK proofs.
- **Decentralization & Security**: All operations in-browser, using Web Crypto API + tweetnacl for encryption via BIP39-derived keys; no servers, deployed on IPFS via Fleek.
- **Monetization Potential**: Freemium model with optional premium features like advanced analytics.

### Technology Stack
- **Frontend Framework**: React + TypeScript with Chakra UI and React Router.
- **State & Data**: Zustand for management; Axios for APIs; ethers.js, viem/wagmi, @solana/web3.js, @mysten/sui.js for Web3 reads.
- **Security & Tools**: Web Crypto API, tweetnacl, zk.js; Formik/Yup for forms; Vitest for testing.
- **Deployment**: IPFS (Fleek); future Capacitor/Tauri for mobile/desktop.
- **UI/UX Elements**: Minimalist layouts, neutral palette, WCAG-compliant accessibility, micro-interactions, and modular screens (onboarding, dashboard, drills).

### Goals & Constraints
Primary goals include secure, effortless multi-chain tracking with high decentralization and extensibility for features like simulations. Constraints encompass browser limitations, RPC reliabilities, audit costs (~$5k-10k), and no server infrastructure, mitigated by client-side focus and modular repositories.

## Repository Overview

This is a TypeScript types package (`@cygnus-wealth/data-models`) that serves as a standardization layer for financial data coming from various sources. It provides shared type definitions and structures to normalize data feeds from different financial libraries and APIs into a consistent format for the CygnusWealth project. It's configured as an ESM module and publishes only type declarations to npm.

## Common Commands

- `npm run build` - Compiles TypeScript type declarations to `dist/` directory
- `npm run test` - Runs the Vitest test suite in watch mode
- `npm run test -- --run` - Runs tests once without watch mode
- `npm run lint` - Runs ESLint on all TypeScript files

## Architecture

This is a types-only package that standardizes financial data structures across multiple data sources:
- Exports TypeScript interfaces and types from `src/index.ts`
- Compiles to declaration files only (`emitDeclarationOnly: true` in tsconfig.json)
- Uses Vitest with jsdom environment for testing type definitions
- Configured as an ESM module (`"type": "module"` in package.json)

The package structure:
- `src/index.ts` - Main entry point exporting all shared types for financial data (portfolios, assets, transactions, market data, etc.)
- `src/index.test.ts` - Tests for type definitions ensuring data structure consistency
- `dist/` - Generated TypeScript declaration files (gitignored)

## Type Design Principles

When adding new financial data types:
1. Design types to accommodate multiple data sources (brokers, banks, crypto exchanges, etc.)
2. Use union types for fields that vary between sources
3. Include source identifiers to track data origin
4. Prefer optional fields over provider-specific interfaces
5. Export all types from `src/index.ts` and add corresponding tests
6. Consider data normalization needs when structuring types

## DDD Architecture Agent Selection Guide

When working on CygnusWealth's Domain-Driven Design architecture, use these specialized agents based on the task scope and keywords:

### Agent Selection Decision Tree

1. **Keywords indicating STRATEGIC/ENTERPRISE scope** → `ddd-enterprise-architect`
   - "bounded contexts", "domain decomposition", "microservices", "monolith refactoring"
   - "business strategy", "enterprise standards", "cross-domain communication"
   - "event storming", "ubiquitous language", "context mapping"

2. **Keywords indicating DOMAIN-LEVEL scope** → `ddd-domain-architect`
   - "domain implementation", "aggregate design", "repository pattern"
   - "API contracts", "inter-system communication", "domain events"
   - "translate enterprise to domain", "modular architecture within domain"

3. **Keywords indicating SYSTEM/REPO scope** → `ddd-system-architect`
   - "module structure", "library selection", "E2E testing", "deployment strategy"
   - "state management", "build configuration", "performance optimization"
   - "single repository", "application architecture", "tech stack decisions"

4. **Keywords indicating CODE-LEVEL design** → `ddd-unit-architect`
   - "file structure", "class design", "interface definition", "method signatures"
   - "unit test design", "code organization", "naming conventions"
   - "design patterns", "clean code principles", "TDD specifications"

5. **Keywords indicating IMPLEMENTATION** → `ddd-software-engineer`
   - "implement", "write code", "create tests", "fix bugs"
   - "refactor existing code", "add functionality", "complete implementation"
   - "based on design", "following specifications", "code review"

### ddd-enterprise-architect
**Trigger When**: Task involves strategic, cross-domain, or business-aligned architectural decisions
- Defining bounded contexts for portfolio aggregation domains (CEX, DEX, wallets)
- Establishing communication patterns between domains (e.g., how wallet data flows to portfolio aggregation)
- Decomposing the monolithic React app into domain modules
- Setting enterprise-wide standards for decentralization and client-side sovereignty
- Aligning technical architecture with business strategy
- Conducting event storming sessions
- Creating context maps between multiple domains

### ddd-domain-architect
**Trigger When**: Task involves translating enterprise guidance to specific domain implementations
- Translating enterprise directives into portfolio tracking domain models
- Designing aggregates for multi-chain wallet data
- Defining contracts between CEX integration and core aggregation modules
- Implementing modular repository structures for each blockchain ecosystem
- Negotiating boundaries between systems within a domain
- Establishing domain-specific API contracts
- Adapting enterprise standards to domain requirements

### ddd-system-architect
**Trigger When**: Task involves internal architecture of a single system or repository
- Designing module structure for portfolio tracking features
- Selecting state management libraries (e.g., Zustand vs alternatives)
- Planning E2E test scenarios for wallet connections
- Ensuring alignment with browser-first, decentralized principles
- Evaluating technical libraries and frameworks
- Defining deployment and build strategies
- Optimizing system performance and scalability

### ddd-unit-architect
**Trigger When**: Task involves detailed code-level design before implementation
- Designing TypeScript interfaces for financial data models
- Creating file structures for encryption utilities
- Defining unit test specifications for data normalization
- Implementing clean code patterns for client-side operations
- Specifying class hierarchies and method signatures
- Planning code organization and module boundaries
- Establishing coding standards and patterns

### ddd-software-engineer
**Trigger When**: Task involves actual code implementation or modification
- Writing TypeScript code based on unit architect specifications
- Implementing domain entities and value objects
- Creating comprehensive unit tests with Vitest
- Ensuring adherence to DDD patterns in actual code
- Refactoring existing implementations
- Fixing bugs and addressing code issues
- Completing feature implementations

### Sequential Agent Usage Patterns

1. **New Feature Development**:
   - Start: `ddd-enterprise-architect` (if crossing domains) OR `ddd-domain-architect` (if within domain)
   - Then: `ddd-unit-architect` (design the code structure)
   - Finally: `ddd-software-engineer` (implement the design)

2. **Library/Framework Selection**:
   - Use: `ddd-system-architect` (evaluate and decide)

3. **Refactoring Monolith**:
   - Start: `ddd-enterprise-architect` (define bounded contexts)
   - Then: `ddd-domain-architect` (implement domain separation)
   - Finally: `ddd-system-architect` (configure repositories)

4. **Bug Fix or Enhancement**:
   - Use: `ddd-software-engineer` (directly implement fix)

### Practical Selection Examples
- "How should we structure our portfolio aggregation?" → `ddd-enterprise-architect` (strategic decomposition)
- "Design the wallet connection module" → `ddd-unit-architect` (code-level design)
- "Implement the wallet connection module" → `ddd-software-engineer` (actual implementation)
- "Which state management library for this repo?" → `ddd-system-architect` (system-level decision)
- "Create API contract between CEX and aggregator" → `ddd-domain-architect` (inter-system contract)
- "Define bounded contexts for multi-chain support" → `ddd-enterprise-architect` (strategic boundaries)
- "Write tests for the Currency value object" → `ddd-software-engineer` (implementation task)
- "How should domains communicate?" → `ddd-enterprise-architect` (cross-domain strategy)