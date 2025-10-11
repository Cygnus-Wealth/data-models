import { Transaction, TransactionType, Chain } from '../../src/index';
import { ethAsset, usdcAsset, btcAsset } from './assets';

/**
 * Test fixtures for Transaction types.
 * Provides reusable sample transactions for testing various scenarios.
 */

export const simpleTransfer: Transaction = {
  id: 'tx-0x123abc',
  accountId: 'wallet-1',
  type: TransactionType.TRANSFER,
  status: 'COMPLETED',
  hash: '0x123abc456def789ghi012jkl345mno678pqr901stu234vwx567yz890abc',
  chain: Chain.ETHEREUM,
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  to: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
  timestamp: new Date('2025-10-11T10:30:00Z'),
  blockNumber: 18500000,
  assetsOut: [
    {
      asset: ethAsset,
      amount: '1.5',
      value: {
        value: 3000,
        currency: 'USD',
        timestamp: new Date('2025-10-11T10:30:00Z')
      }
    }
  ],
  fees: [
    {
      asset: ethAsset,
      amount: '0.002',
      value: {
        value: 4,
        currency: 'USD',
        timestamp: new Date('2025-10-11T10:30:00Z')
      }
    }
  ]
};

export const dexSwap: Transaction = {
  id: 'tx-0x456def',
  accountId: 'wallet-1',
  type: TransactionType.SWAP,
  status: 'COMPLETED',
  hash: '0x456def789ghi012jkl345mno678pqr901stu234vwx567yz890abc123def',
  chain: Chain.ETHEREUM,
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  to: '0xE592427A0AEce92De3Edee1F18E0157C05861564', // Uniswap Router
  timestamp: new Date('2025-10-11T11:00:00Z'),
  blockNumber: 18500123,
  assetsOut: [
    {
      asset: ethAsset,
      amount: '2.0',
      value: {
        value: 4000,
        currency: 'USD',
        timestamp: new Date('2025-10-11T11:00:00Z')
      }
    }
  ],
  assetsIn: [
    {
      asset: usdcAsset,
      amount: '3950.000000',
      value: {
        value: 3950,
        currency: 'USD',
        timestamp: new Date('2025-10-11T11:00:00Z')
      }
    }
  ],
  fees: [
    {
      asset: ethAsset,
      amount: '0.003',
      value: {
        value: 6,
        currency: 'USD',
        timestamp: new Date('2025-10-11T11:00:00Z')
      }
    }
  ],
  protocol: 'Uniswap V3',
  method: 'swapExactTokensForTokens'
};

export const cexTrade: Transaction = {
  id: 'kraken-trade-789',
  accountId: 'kraken-spot-1',
  type: TransactionType.TRADE,
  status: 'COMPLETED',
  timestamp: new Date('2025-10-11T09:00:00Z'),
  assetsOut: [
    {
      asset: {
        id: 'fiat-usd',
        symbol: 'USD',
        name: 'United States Dollar',
        type: 'FIAT' as const,
        decimals: 2
      },
      amount: '50000.00',
      value: {
        value: 50000,
        currency: 'USD',
        timestamp: new Date('2025-10-11T09:00:00Z')
      }
    }
  ],
  assetsIn: [
    {
      asset: btcAsset,
      amount: '1.25',
      value: {
        value: 50000,
        currency: 'USD',
        timestamp: new Date('2025-10-11T09:00:00Z')
      }
    }
  ],
  fees: [
    {
      asset: {
        id: 'fiat-usd',
        symbol: 'USD',
        name: 'United States Dollar',
        type: 'FIAT' as const,
        decimals: 2
      },
      amount: '50.00'
    }
  ]
};

export const stakingTransaction: Transaction = {
  id: 'tx-stake-1',
  accountId: 'wallet-1',
  type: TransactionType.STAKE,
  status: 'COMPLETED',
  hash: '0xstake123abc456def',
  chain: Chain.ETHEREUM,
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  to: '0x00000000219ab540356cBB839Cbe05303d7705Fa', // ETH2 Deposit Contract
  timestamp: new Date('2025-10-11T08:00:00Z'),
  blockNumber: 18499500,
  assetsOut: [
    {
      asset: ethAsset,
      amount: '32.0',
      value: {
        value: 64000,
        currency: 'USD',
        timestamp: new Date('2025-10-11T08:00:00Z')
      }
    }
  ],
  protocol: 'Ethereum 2.0',
  method: 'deposit'
};

export const addLiquidityTransaction: Transaction = {
  id: 'tx-add-liq-1',
  accountId: 'wallet-1',
  type: TransactionType.ADD_LIQUIDITY,
  status: 'COMPLETED',
  hash: '0xaddliq123abc456def',
  chain: Chain.ETHEREUM,
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  to: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', // Uniswap V3 Positions NFT
  timestamp: new Date('2025-10-11T07:00:00Z'),
  blockNumber: 18499000,
  assetsOut: [
    {
      asset: ethAsset,
      amount: '5.0',
      value: {
        value: 10000,
        currency: 'USD',
        timestamp: new Date('2025-10-11T07:00:00Z')
      }
    },
    {
      asset: usdcAsset,
      amount: '10000.000000',
      value: {
        value: 10000,
        currency: 'USD',
        timestamp: new Date('2025-10-11T07:00:00Z')
      }
    }
  ],
  assetsIn: [
    {
      asset: {
        id: 'uniswap-v3-lp-eth-usdc',
        symbol: 'UNI-V3-LP',
        name: 'Uniswap V3 Position NFT',
        type: 'LIQUIDITY_POOL' as const,
        chain: Chain.ETHEREUM
      },
      amount: '1' // NFT position
    }
  ],
  protocol: 'Uniswap V3',
  method: 'mint'
};

export const failedTransaction: Transaction = {
  id: 'tx-failed-1',
  accountId: 'wallet-1',
  type: TransactionType.SWAP,
  status: 'FAILED',
  hash: '0xfailed123abc456def',
  chain: Chain.ETHEREUM,
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  to: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  timestamp: new Date('2025-10-11T06:00:00Z'),
  blockNumber: 18498500,
  assetsOut: [],
  fees: [
    {
      asset: ethAsset,
      amount: '0.001',
      value: {
        value: 2,
        currency: 'USD',
        timestamp: new Date('2025-10-11T06:00:00Z')
      }
    }
  ],
  metadata: {
    errorReason: 'Insufficient liquidity'
  }
};

export const pendingTransaction: Transaction = {
  id: 'tx-pending-1',
  accountId: 'wallet-1',
  type: TransactionType.TRANSFER,
  status: 'PENDING',
  hash: '0xpending123abc456def',
  chain: Chain.ETHEREUM,
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  to: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
  timestamp: new Date('2025-10-11T12:00:00Z'),
  assetsOut: [
    {
      asset: ethAsset,
      amount: '0.5'
    }
  ]
};

// Multi-asset complex transaction
export const multiAssetTransaction: Transaction = {
  id: 'tx-multi-1',
  accountId: 'wallet-1',
  type: TransactionType.CONTRACT_INTERACTION,
  status: 'COMPLETED',
  hash: '0xmulti123abc456def',
  chain: Chain.ETHEREUM,
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  to: '0xdef1c0ded9bec7f1a1670819833240f027b25eff', // 0x Exchange Proxy
  timestamp: new Date('2025-10-11T05:00:00Z'),
  blockNumber: 18498000,
  assetsOut: [
    {
      asset: ethAsset,
      amount: '1.0'
    },
    {
      asset: usdcAsset,
      amount: '1000.000000'
    }
  ],
  assetsIn: [
    {
      asset: btcAsset,
      amount: '0.05'
    },
    {
      asset: {
        id: 'ethereum-link',
        symbol: 'LINK',
        name: 'Chainlink',
        type: 'CRYPTOCURRENCY' as const,
        decimals: 18,
        chain: Chain.ETHEREUM
      },
      amount: '100.0'
    }
  ],
  protocol: '0x Protocol',
  method: 'transformERC20'
};

// All transactions array for bulk testing
export const allTransactions: Transaction[] = [
  simpleTransfer,
  dexSwap,
  cexTrade,
  stakingTransaction,
  addLiquidityTransaction,
  failedTransaction,
  pendingTransaction,
  multiAssetTransaction
];
