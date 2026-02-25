import { describe, it, expect } from 'vitest';
import {
  ChainFamily,
  IntegrationSource,
} from '../../src/index';
import type {
  Caip2ChainId,
  WalletConnection,
  ConnectedAccount,
  AccountId,
  WatchAddress,
  TrackedAddress,
  AddressRequest,
} from '../../src/index';
import { Chain } from '../../src/enums/Chain';

describe('ChainFamily enum (en-o8w)', () => {
  it('should have all required chain family values', () => {
    expect(ChainFamily.EVM).toBe('evm');
    expect(ChainFamily.SOLANA).toBe('solana');
    expect(ChainFamily.SUI).toBe('sui');
    expect(ChainFamily.BITCOIN).toBe('bitcoin');
    expect(ChainFamily.COSMOS).toBe('cosmos');
    expect(ChainFamily.APTOS).toBe('aptos');
  });

  it('should have exactly 6 members', () => {
    const values = Object.values(ChainFamily);
    expect(values).toHaveLength(6);
  });

  it('should use lowercase string values', () => {
    for (const value of Object.values(ChainFamily)) {
      expect(value).toBe(value.toLowerCase());
    }
  });
});

describe('Caip2ChainId type (en-o8w)', () => {
  it('should accept valid CAIP-2 format strings', () => {
    const ethereumMainnet: Caip2ChainId = 'eip155:1';
    const solanaMainnet: Caip2ChainId = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp';
    const bitcoinMainnet: Caip2ChainId = 'bip122:000000000019d6689c085ae165831e93';

    expect(ethereumMainnet).toBe('eip155:1');
    expect(solanaMainnet).toContain('solana:');
    expect(bitcoinMainnet).toContain('bip122:');
  });
});

describe('IntegrationSource extensions (en-o8w)', () => {
  it('should have new chain-family integration sources', () => {
    expect(IntegrationSource.SUI).toBe('SUI');
    expect(IntegrationSource.BITCOIN).toBe('BITCOIN');
    expect(IntegrationSource.COSMOS).toBe('COSMOS');
    expect(IntegrationSource.APTOS).toBe('APTOS');
  });

  it('should retain all existing integration sources', () => {
    expect(IntegrationSource.ROBINHOOD).toBe('ROBINHOOD');
    expect(IntegrationSource.KRAKEN).toBe('KRAKEN');
    expect(IntegrationSource.COINBASE).toBe('COINBASE');
    expect(IntegrationSource.METAMASK).toBe('METAMASK');
    expect(IntegrationSource.PHANTOM).toBe('PHANTOM');
    expect(IntegrationSource.SLUSH).toBe('SLUSH');
    expect(IntegrationSource.SUIET).toBe('SUIET');
    expect(IntegrationSource.BLOCKCHAIN_DIRECT).toBe('BLOCKCHAIN_DIRECT');
    expect(IntegrationSource.MANUAL_ENTRY).toBe('MANUAL_ENTRY');
  });
});

describe('WalletConnection extensions (en-o8w)', () => {
  it('should support supportedChainFamilies field', () => {
    const connection: WalletConnection = {
      connectionId: 'phantom:abc123',
      providerId: 'phantom',
      providerName: 'Phantom',
      providerIcon: 'https://phantom.app/icon.svg',
      connectionLabel: 'My Phantom',
      accounts: [],
      activeAccountAddress: null,
      supportedChains: [Chain.ETHEREUM, Chain.SOLANA],
      supportedChainFamilies: [ChainFamily.EVM, ChainFamily.SOLANA],
      connectedAt: '2026-02-25T10:00:00Z',
      lastActiveAt: '2026-02-25T10:00:00Z',
      sessionStatus: 'active',
    };

    expect(connection.supportedChainFamilies).toEqual([ChainFamily.EVM, ChainFamily.SOLANA]);
    expect(connection.supportedChainFamilies).toHaveLength(2);
  });

  it('should support single chain family wallet', () => {
    const connection: WalletConnection = {
      connectionId: 'metamask:xyz789',
      providerId: 'metamask',
      providerName: 'MetaMask',
      providerIcon: 'https://metamask.io/icon.svg',
      connectionLabel: 'My MetaMask',
      accounts: [],
      activeAccountAddress: '0xAbCdEf1234567890',
      supportedChains: [Chain.ETHEREUM],
      supportedChainFamilies: [ChainFamily.EVM],
      connectedAt: '2026-02-25T10:00:00Z',
      lastActiveAt: '2026-02-25T10:00:00Z',
      sessionStatus: 'active',
    };

    expect(connection.supportedChainFamilies).toEqual([ChainFamily.EVM]);
  });

  it('should support multi-chain wallet with many families', () => {
    const connection: WalletConnection = {
      connectionId: 'trust:def456',
      providerId: 'trust-wallet',
      providerName: 'Trust Wallet',
      providerIcon: 'https://trustwallet.com/icon.svg',
      connectionLabel: 'Trust Wallet',
      accounts: [],
      activeAccountAddress: null,
      supportedChains: [Chain.ETHEREUM, Chain.SOLANA, Chain.SUI],
      supportedChainFamilies: [ChainFamily.EVM, ChainFamily.SOLANA, ChainFamily.SUI, ChainFamily.COSMOS, ChainFamily.APTOS],
      connectedAt: '2026-02-25T10:00:00Z',
      lastActiveAt: '2026-02-25T10:00:00Z',
      sessionStatus: 'active',
    };

    expect(connection.supportedChainFamilies).toHaveLength(5);
  });
});

describe('ConnectedAccount extensions (en-o8w)', () => {
  it('should have chainFamily field for EVM account', () => {
    const account: ConnectedAccount = {
      accountId: 'metamask:abc123:evm:0xAbCdEf1234567890',
      address: '0xAbCdEf1234567890',
      accountLabel: 'Main DeFi',
      chainScope: [Chain.ETHEREUM, Chain.POLYGON],
      chainFamily: ChainFamily.EVM,
      source: 'provider',
      discoveredAt: '2026-02-25T10:00:00Z',
      isStale: false,
      isActive: true,
    };

    expect(account.chainFamily).toBe(ChainFamily.EVM);
  });

  it('should have chainFamily field for Solana account', () => {
    const account: ConnectedAccount = {
      accountId: 'phantom:abc123:solana:7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      accountLabel: 'Solana Main',
      chainScope: [Chain.SOLANA],
      chainFamily: ChainFamily.SOLANA,
      source: 'provider',
      discoveredAt: '2026-02-25T10:00:00Z',
      isStale: false,
      isActive: true,
    };

    expect(account.chainFamily).toBe(ChainFamily.SOLANA);
  });

  it('should have chainFamily field for Bitcoin account', () => {
    const account: ConnectedAccount = {
      accountId: 'trust:def456:bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      accountLabel: 'BTC Savings',
      chainScope: [Chain.BITCOIN],
      chainFamily: ChainFamily.BITCOIN,
      source: 'provider',
      discoveredAt: '2026-02-25T10:00:00Z',
      isStale: false,
      isActive: true,
    };

    expect(account.chainFamily).toBe(ChainFamily.BITCOIN);
  });
});

describe('AccountId format (en-o8w)', () => {
  it('should accept new format with chain family segment', () => {
    const connectedId: AccountId = 'metamask:abc123:evm:0xAbCdEf1234567890';
    expect(connectedId).toContain(':evm:');
  });

  it('should accept watch address format', () => {
    const watchId: AccountId = 'watch:0xAbCdEf1234567890';
    expect(watchId).toContain('watch:');
  });

  it('should accept Solana account format', () => {
    const solanaId: AccountId = 'phantom:abc123:solana:7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
    expect(solanaId).toContain(':solana:');
  });
});

describe('WatchAddress extensions (en-o8w)', () => {
  it('should have chainFamily field', () => {
    const watched: WatchAddress = {
      accountId: 'watch:0xAbCdEf1234567890',
      address: '0xAbCdEf1234567890',
      addressLabel: 'Vitalik.eth',
      chainScope: [Chain.ETHEREUM],
      chainFamily: ChainFamily.EVM,
      addedAt: '2026-02-01T12:00:00Z',
    };

    expect(watched.chainFamily).toBe(ChainFamily.EVM);
  });

  it('should support Solana watch address', () => {
    const watched: WatchAddress = {
      accountId: 'watch:7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      addressLabel: 'SOL Whale',
      chainScope: [Chain.SOLANA],
      chainFamily: ChainFamily.SOLANA,
      addedAt: '2026-02-01T12:00:00Z',
    };

    expect(watched.chainFamily).toBe(ChainFamily.SOLANA);
  });

  it('should support Bitcoin watch address', () => {
    const watched: WatchAddress = {
      accountId: 'watch:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      addressLabel: 'BTC Watch',
      chainScope: [Chain.BITCOIN],
      chainFamily: ChainFamily.BITCOIN,
      addedAt: '2026-02-01T12:00:00Z',
    };

    expect(watched.chainFamily).toBe(ChainFamily.BITCOIN);
  });
});

describe('TrackedAddress extensions (en-o8w)', () => {
  it('should have chainFamily field', () => {
    const tracked: TrackedAddress = {
      accountId: 'metamask:abc123:evm:0xAbCdEf1234567890',
      address: '0xAbCdEf1234567890',
      walletConnectionId: 'metamask:abc123',
      providerId: 'metamask',
      accountLabel: 'Main DeFi',
      connectionLabel: 'My MetaMask',
      chainScope: [Chain.ETHEREUM, Chain.POLYGON],
      chainFamily: ChainFamily.EVM,
    };

    expect(tracked.chainFamily).toBe(ChainFamily.EVM);
  });

  it('should have chainFamily for Solana tracked address', () => {
    const tracked: TrackedAddress = {
      accountId: 'phantom:abc123:solana:7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      walletConnectionId: 'phantom:abc123',
      providerId: 'phantom',
      accountLabel: 'Solana Main',
      connectionLabel: 'My Phantom',
      chainScope: [Chain.SOLANA],
      chainFamily: ChainFamily.SOLANA,
    };

    expect(tracked.chainFamily).toBe(ChainFamily.SOLANA);
  });
});

describe('AddressRequest extensions (en-o8w)', () => {
  it('should have chainFamily field', () => {
    const request: AddressRequest = {
      accountId: 'metamask:abc123:evm:0xAbCdEf1234567890',
      address: '0xAbCdEf1234567890',
      chainScope: [Chain.ETHEREUM, Chain.POLYGON],
      chainFamily: ChainFamily.EVM,
    };

    expect(request.chainFamily).toBe(ChainFamily.EVM);
  });

  it('should have chainFamily for Solana request', () => {
    const request: AddressRequest = {
      accountId: 'phantom:abc123:solana:7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      chainScope: [Chain.SOLANA],
      chainFamily: ChainFamily.SOLANA,
    };

    expect(request.chainFamily).toBe(ChainFamily.SOLANA);
  });

  it('should have chainFamily for Bitcoin request', () => {
    const request: AddressRequest = {
      accountId: 'trust:def456:bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      chainScope: [Chain.BITCOIN],
      chainFamily: ChainFamily.BITCOIN,
    };

    expect(request.chainFamily).toBe(ChainFamily.BITCOIN);
  });
});
