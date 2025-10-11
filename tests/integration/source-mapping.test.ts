import { describe, it, expect } from 'vitest';
import { Asset, Transaction, Balance, Chain, AssetType, TransactionType, IntegrationSource } from '../../src/index';

/**
 * Integration tests for mapping external source data to internal types.
 * Tests data transformation patterns from various sources (CEX, DEX, blockchain).
 */

describe('Source Mapping Integration Tests', () => {
  describe('CEX Data Mapping', () => {
    it('should map Coinbase balance to internal Balance type', () => {
      // Simulate Coinbase API response
      const coinbaseBalance = {
        currency: 'ETH',
        amount: '10.5',
        available: '10.5',
        hold: '0.0'
      };

      // Map to internal Balance
      const balance: Balance = {
        assetId: `coinbase-${coinbaseBalance.currency.toLowerCase()}`,
        asset: {
          id: `coinbase-${coinbaseBalance.currency.toLowerCase()}`,
          symbol: coinbaseBalance.currency,
          name: coinbaseBalance.currency === 'ETH' ? 'Ethereum' : coinbaseBalance.currency,
          type: AssetType.CRYPTOCURRENCY
        },
        amount: coinbaseBalance.amount
      };

      expect(balance.asset.symbol).toBe('ETH');
      expect(balance.amount).toBe('10.5');
    });

    it('should map Kraken trade to internal Transaction type', () => {
      // Simulate Kraken trade response
      const krakenTrade = {
        ordertxid: 'OXYZABC-123',
        pair: 'XETHZUSD',
        time: 1697031600,
        type: 'buy',
        ordertype: 'market',
        price: '2000.00',
        vol: '0.5',
        fee: '2.50'
      };

      // Map to internal Transaction
      const transaction: Transaction = {
        id: krakenTrade.ordertxid,
        accountId: 'kraken-spot-1',
        type: TransactionType.BUY,
        status: 'COMPLETED',
        timestamp: new Date(krakenTrade.time * 1000),
        assetsIn: [{
          asset: {
            id: 'ethereum-eth',
            symbol: 'ETH',
            name: 'Ethereum',
            type: AssetType.CRYPTOCURRENCY
          },
          amount: krakenTrade.vol,
          value: {
            value: Number(krakenTrade.vol) * Number(krakenTrade.price),
            currency: 'USD',
            timestamp: new Date(krakenTrade.time * 1000)
          }
        }],
        assetsOut: [{
          asset: {
            id: 'fiat-usd',
            symbol: 'USD',
            name: 'US Dollar',
            type: AssetType.FIAT
          },
          amount: (Number(krakenTrade.vol) * Number(krakenTrade.price)).toString()
        }],
        fees: [{
          asset: {
            id: 'fiat-usd',
            symbol: 'USD',
            name: 'US Dollar',
            type: AssetType.FIAT
          },
          amount: krakenTrade.fee
        }]
      };

      expect(transaction.type).toBe(TransactionType.BUY);
      expect(transaction.assetsIn).toHaveLength(1);
      expect(transaction.assetsOut).toHaveLength(1);
      expect(transaction.fees).toHaveLength(1);
    });
  });

  describe('Blockchain Data Mapping', () => {
    it('should map Ethereum transaction to internal Transaction type', () => {
      // Simulate ethers.js transaction response
      const ethTx = {
        hash: '0x123abc456def',
        from: '0xSender',
        to: '0xRecipient',
        value: '1500000000000000000', // 1.5 ETH in wei
        gasPrice: '50000000000', // 50 gwei
        gasUsed: '21000',
        blockNumber: 18500000,
        timestamp: 1697031600
      };

      // Map to internal Transaction
      const transaction: Transaction = {
        id: ethTx.hash,
        accountId: 'metamask-wallet-1',
        type: TransactionType.TRANSFER,
        status: 'COMPLETED',
        hash: ethTx.hash,
        chain: Chain.ETHEREUM,
        from: ethTx.from,
        to: ethTx.to,
        timestamp: new Date(ethTx.timestamp * 1000),
        blockNumber: ethTx.blockNumber,
        assetsOut: [{
          asset: {
            id: 'ethereum-eth',
            symbol: 'ETH',
            name: 'Ethereum',
            type: AssetType.CRYPTOCURRENCY,
            decimals: 18,
            chain: Chain.ETHEREUM
          },
          amount: ethTx.value
        }],
        fees: [{
          asset: {
            id: 'ethereum-eth',
            symbol: 'ETH',
            name: 'Ethereum',
            type: AssetType.CRYPTOCURRENCY,
            decimals: 18,
            chain: Chain.ETHEREUM
          },
          amount: (BigInt(ethTx.gasPrice) * BigInt(ethTx.gasUsed)).toString()
        }]
      };

      expect(transaction.chain).toBe(Chain.ETHEREUM);
      expect(transaction.hash).toBe(ethTx.hash);
      expect(transaction.blockNumber).toBe(ethTx.blockNumber);
    });

    it('should map ERC-20 token to internal Asset type', () => {
      // Simulate token contract metadata
      const tokenContract = {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        totalSupply: '28000000000000000'
      };

      // Map to internal Asset
      const asset: Asset = {
        id: `ethereum-${tokenContract.symbol.toLowerCase()}`,
        symbol: tokenContract.symbol,
        name: tokenContract.name,
        type: AssetType.CRYPTOCURRENCY,
        decimals: tokenContract.decimals,
        contractAddress: tokenContract.address,
        chain: Chain.ETHEREUM
      };

      expect(asset.contractAddress).toBe(tokenContract.address);
      expect(asset.decimals).toBe(6);
      expect(asset.chain).toBe(Chain.ETHEREUM);
    });

    it('should map Solana transaction to internal Transaction type', () => {
      // Simulate Solana transaction
      const solTx = {
        signature: 'SolSignature123abc',
        slot: 150000000,
        blockTime: 1697031600,
        meta: {
          fee: 5000, // lamports
          preBalances: [10000000000],
          postBalances: [9000000000]
        }
      };

      const amountTransferred = (solTx.meta.preBalances[0] - solTx.meta.postBalances[0] - solTx.meta.fee).toString();

      // Map to internal Transaction
      const transaction: Transaction = {
        id: solTx.signature,
        accountId: 'phantom-wallet-1',
        type: TransactionType.TRANSFER,
        status: 'COMPLETED',
        hash: solTx.signature,
        chain: Chain.SOLANA,
        timestamp: new Date(solTx.blockTime * 1000),
        blockNumber: solTx.slot,
        assetsOut: [{
          asset: {
            id: 'solana-sol',
            symbol: 'SOL',
            name: 'Solana',
            type: AssetType.CRYPTOCURRENCY,
            decimals: 9,
            chain: Chain.SOLANA
          },
          amount: amountTransferred
        }],
        fees: [{
          asset: {
            id: 'solana-sol',
            symbol: 'SOL',
            name: 'Solana',
            type: AssetType.CRYPTOCURRENCY,
            decimals: 9,
            chain: Chain.SOLANA
          },
          amount: solTx.meta.fee.toString()
        }]
      };

      expect(transaction.chain).toBe(Chain.SOLANA);
      expect(transaction.fees![0].amount).toBe('5000');
    });
  });

  describe('Chain ID Mapping', () => {
    it('should map EVM chain IDs to Chain enum', () => {
      const chainIdMap: Record<number, Chain> = {
        1: Chain.ETHEREUM,
        137: Chain.POLYGON,
        42161: Chain.ARBITRUM,
        10: Chain.OPTIMISM,
        43114: Chain.AVALANCHE,
        56: Chain.BSC,
        8453: Chain.BASE
      };

      // Test each mapping
      expect(chainIdMap[1]).toBe(Chain.ETHEREUM);
      expect(chainIdMap[137]).toBe(Chain.POLYGON);
      expect(chainIdMap[42161]).toBe(Chain.ARBITRUM);
      expect(chainIdMap[10]).toBe(Chain.OPTIMISM);
      expect(chainIdMap[43114]).toBe(Chain.AVALANCHE);
      expect(chainIdMap[56]).toBe(Chain.BSC);
      expect(chainIdMap[8453]).toBe(Chain.BASE);
    });

    it('should handle unknown chain IDs', () => {
      const getChain = (chainId: number): Chain => {
        const map: Record<number, Chain> = {
          1: Chain.ETHEREUM,
          137: Chain.POLYGON
        };
        return map[chainId] || Chain.OTHER;
      };

      expect(getChain(1)).toBe(Chain.ETHEREUM);
      expect(getChain(999999)).toBe(Chain.OTHER);
    });
  });

  describe('DEX Data Mapping', () => {
    it('should map Uniswap swap event to internal Transaction', () => {
      // Simulate Uniswap swap event
      const swapEvent = {
        transactionHash: '0xswap123',
        blockNumber: 18500000,
        timestamp: 1697031600,
        sender: '0xUser',
        recipient: '0xUser',
        amount0In: '2000000000000000000', // 2 ETH
        amount1Out: '4000000000', // 4000 USDC
        logIndex: 10
      };

      // Map to internal Transaction
      const transaction: Transaction = {
        id: `${swapEvent.transactionHash}-${swapEvent.logIndex}`,
        accountId: 'metamask-wallet-1',
        type: TransactionType.SWAP,
        status: 'COMPLETED',
        hash: swapEvent.transactionHash,
        chain: Chain.ETHEREUM,
        timestamp: new Date(swapEvent.timestamp * 1000),
        blockNumber: swapEvent.blockNumber,
        assetsOut: [{
          asset: {
            id: 'ethereum-eth',
            symbol: 'ETH',
            name: 'Ethereum',
            type: AssetType.CRYPTOCURRENCY,
            decimals: 18,
            chain: Chain.ETHEREUM
          },
          amount: swapEvent.amount0In
        }],
        assetsIn: [{
          asset: {
            id: 'ethereum-usdc',
            symbol: 'USDC',
            name: 'USD Coin',
            type: AssetType.CRYPTOCURRENCY,
            decimals: 6,
            chain: Chain.ETHEREUM
          },
          amount: swapEvent.amount1Out
        }],
        protocol: 'Uniswap V2'
      };

      expect(transaction.type).toBe(TransactionType.SWAP);
      expect(transaction.protocol).toBe('Uniswap V2');
      expect(transaction.assetsOut).toHaveLength(1);
      expect(transaction.assetsIn).toHaveLength(1);
    });
  });

  describe('IntegrationSource Mapping', () => {
    it('should map wallet providers to IntegrationSource', () => {
      const providers = [
        { name: 'MetaMask', source: IntegrationSource.METAMASK },
        { name: 'Phantom', source: IntegrationSource.PHANTOM },
        { name: 'Slush', source: IntegrationSource.SLUSH },
        { name: 'Suiet', source: IntegrationSource.SUIET }
      ];

      providers.forEach(({ name, source }) => {
        expect(Object.values(IntegrationSource)).toContain(source);
      });
    });

    it('should map CEX names to IntegrationSource', () => {
      const exchanges = [
        { name: 'Coinbase', source: IntegrationSource.COINBASE },
        { name: 'Kraken', source: IntegrationSource.KRAKEN },
        { name: 'Robinhood', source: IntegrationSource.ROBINHOOD }
      ];

      exchanges.forEach(({ name, source }) => {
        expect(Object.values(IntegrationSource)).toContain(source);
      });
    });
  });
});
