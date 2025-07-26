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