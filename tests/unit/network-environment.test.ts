import { describe, it, expect } from 'vitest';
import { NetworkEnvironment, EnvironmentConfig, Chain } from '../../src/index';

/**
 * Unit tests for NetworkEnvironment type and EnvironmentConfig interface.
 */

describe('NetworkEnvironment', () => {
  it('should accept production value', () => {
    const env: NetworkEnvironment = 'production';
    expect(env).toBe('production');
  });

  it('should accept testnet value', () => {
    const env: NetworkEnvironment = 'testnet';
    expect(env).toBe('testnet');
  });

  it('should accept local value', () => {
    const env: NetworkEnvironment = 'local';
    expect(env).toBe('local');
  });

  it('should enumerate all valid values', () => {
    const validEnvironments: NetworkEnvironment[] = ['production', 'testnet', 'local'];
    expect(validEnvironments).toHaveLength(3);
  });

  it('should be usable as a discriminator in switch statements', () => {
    const env: NetworkEnvironment = 'production';
    let result: string;

    switch (env) {
      case 'production':
        result = 'mainnet';
        break;
      case 'testnet':
        result = 'testnet';
        break;
      case 'local':
        result = 'localhost';
        break;
    }

    expect(result!).toBe('mainnet');
  });
});

describe('EnvironmentConfig', () => {
  it('should create a production config', () => {
    const config: EnvironmentConfig = {
      environment: 'production',
      chain: Chain.ETHEREUM,
      rpcUrl: 'https://mainnet.infura.io/v3/key'
    };

    expect(config.environment).toBe('production');
    expect(config.chain).toBe(Chain.ETHEREUM);
    expect(config.rpcUrl).toBe('https://mainnet.infura.io/v3/key');
  });

  it('should create a testnet config', () => {
    const config: EnvironmentConfig = {
      environment: 'testnet',
      chain: Chain.ETHEREUM,
      rpcUrl: 'https://sepolia.infura.io/v3/key',
      label: 'Sepolia Testnet'
    };

    expect(config.environment).toBe('testnet');
    expect(config.label).toBe('Sepolia Testnet');
  });

  it('should create a local config', () => {
    const config: EnvironmentConfig = {
      environment: 'local',
      chain: Chain.ETHEREUM,
      rpcUrl: 'http://localhost:8545',
      label: 'Hardhat Local'
    };

    expect(config.environment).toBe('local');
    expect(config.rpcUrl).toBe('http://localhost:8545');
    expect(config.label).toBe('Hardhat Local');
  });

  it('should support all chains', () => {
    const configs: EnvironmentConfig[] = [
      { environment: 'production', chain: Chain.ETHEREUM, rpcUrl: 'https://eth.rpc' },
      { environment: 'production', chain: Chain.POLYGON, rpcUrl: 'https://polygon.rpc' },
      { environment: 'production', chain: Chain.ARBITRUM, rpcUrl: 'https://arbitrum.rpc' },
      { environment: 'testnet', chain: Chain.SOLANA, rpcUrl: 'https://devnet.solana.rpc' },
      { environment: 'local', chain: Chain.BASE, rpcUrl: 'http://localhost:8545' }
    ];

    expect(configs).toHaveLength(5);
    configs.forEach(c => {
      expect(c.environment).toBeDefined();
      expect(c.chain).toBeDefined();
      expect(c.rpcUrl).toBeDefined();
    });
  });

  it('should make label optional', () => {
    const withLabel: EnvironmentConfig = {
      environment: 'production',
      chain: Chain.ETHEREUM,
      rpcUrl: 'https://eth.rpc',
      label: 'Ethereum Mainnet'
    };

    const withoutLabel: EnvironmentConfig = {
      environment: 'production',
      chain: Chain.ETHEREUM,
      rpcUrl: 'https://eth.rpc'
    };

    expect(withLabel.label).toBe('Ethereum Mainnet');
    expect(withoutLabel.label).toBeUndefined();
  });

  it('should be usable in environment maps', () => {
    const envMap: Record<NetworkEnvironment, EnvironmentConfig> = {
      production: {
        environment: 'production',
        chain: Chain.ETHEREUM,
        rpcUrl: 'https://mainnet.infura.io/v3/key'
      },
      testnet: {
        environment: 'testnet',
        chain: Chain.ETHEREUM,
        rpcUrl: 'https://sepolia.infura.io/v3/key'
      },
      local: {
        environment: 'local',
        chain: Chain.ETHEREUM,
        rpcUrl: 'http://localhost:8545'
      }
    };

    expect(Object.keys(envMap)).toHaveLength(3);
    expect(envMap.production.rpcUrl).toContain('mainnet');
    expect(envMap.testnet.rpcUrl).toContain('sepolia');
    expect(envMap.local.rpcUrl).toContain('localhost');
  });
});
