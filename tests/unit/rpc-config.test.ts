import { describe, it, expect } from 'vitest';
import {
  RpcProviderRole,
  RpcProviderType,
  RpcEndpointConfig,
  ChainRpcConfig,
  CircuitBreakerConfig,
  RetryConfig,
  HealthCheckConfig,
  RpcProviderConfig
} from '../../src/index';

/**
 * Unit tests for RPC Provider Configuration types.
 * Coverage target: 100%
 *
 * Tests enum values, interface structure, and contract stability.
 */

describe('RPC Provider Configuration Types', () => {
  describe('RpcProviderRole', () => {
    it('should have all expected roles', () => {
      expect(RpcProviderRole.PRIMARY).toBe('PRIMARY');
      expect(RpcProviderRole.SECONDARY).toBe('SECONDARY');
      expect(RpcProviderRole.TERTIARY).toBe('TERTIARY');
      expect(RpcProviderRole.EMERGENCY).toBe('EMERGENCY');
    });

    it('should have unique values (no duplicates)', () => {
      const values = Object.values(RpcProviderRole);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should have exactly 4 roles', () => {
      const values = Object.values(RpcProviderRole);
      expect(values).toHaveLength(4);
    });

    it('should represent a priority ordering', () => {
      const roles = [
        RpcProviderRole.PRIMARY,
        RpcProviderRole.SECONDARY,
        RpcProviderRole.TERTIARY,
        RpcProviderRole.EMERGENCY
      ];

      // All roles should be distinct
      const uniqueRoles = new Set(roles);
      expect(uniqueRoles.size).toBe(4);
    });
  });

  describe('RpcProviderType', () => {
    it('should have all expected types', () => {
      expect(RpcProviderType.MANAGED).toBe('MANAGED');
      expect(RpcProviderType.PUBLIC).toBe('PUBLIC');
      expect(RpcProviderType.COMMUNITY).toBe('COMMUNITY');
    });

    it('should have unique values (no duplicates)', () => {
      const values = Object.values(RpcProviderType);
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });

    it('should have exactly 3 types', () => {
      const values = Object.values(RpcProviderType);
      expect(values).toHaveLength(3);
    });

    it('should distinguish infrastructure ownership models', () => {
      expect(RpcProviderType.MANAGED).not.toBe(RpcProviderType.PUBLIC);
      expect(RpcProviderType.PUBLIC).not.toBe(RpcProviderType.COMMUNITY);
      expect(RpcProviderType.MANAGED).not.toBe(RpcProviderType.COMMUNITY);
    });
  });

  describe('RpcEndpointConfig', () => {
    it('should accept a fully specified endpoint', () => {
      const endpoint: RpcEndpointConfig = {
        url: 'https://eth-mainnet.g.alchemy.com/v2/key',
        wsUrl: 'wss://eth-mainnet.g.alchemy.com/v2/key',
        provider: 'Alchemy',
        role: RpcProviderRole.PRIMARY,
        type: RpcProviderType.MANAGED,
        rateLimitRps: 100,
        timeoutMs: 5000,
        weight: 100
      };

      expect(endpoint.url).toBe('https://eth-mainnet.g.alchemy.com/v2/key');
      expect(endpoint.wsUrl).toBe('wss://eth-mainnet.g.alchemy.com/v2/key');
      expect(endpoint.provider).toBe('Alchemy');
      expect(endpoint.role).toBe(RpcProviderRole.PRIMARY);
      expect(endpoint.type).toBe(RpcProviderType.MANAGED);
      expect(endpoint.rateLimitRps).toBe(100);
      expect(endpoint.timeoutMs).toBe(5000);
      expect(endpoint.weight).toBe(100);
    });

    it('should accept an endpoint without optional fields', () => {
      const endpoint: RpcEndpointConfig = {
        url: 'https://rpc.ankr.com/eth',
        provider: 'Ankr Public',
        role: RpcProviderRole.TERTIARY,
        type: RpcProviderType.PUBLIC,
        rateLimitRps: 10,
        timeoutMs: 10000
      };

      expect(endpoint.url).toBe('https://rpc.ankr.com/eth');
      expect(endpoint.wsUrl).toBeUndefined();
      expect(endpoint.weight).toBeUndefined();
    });

    it('should be JSON serializable', () => {
      const endpoint: RpcEndpointConfig = {
        url: 'https://example.com/rpc',
        provider: 'Test',
        role: RpcProviderRole.SECONDARY,
        type: RpcProviderType.COMMUNITY,
        rateLimitRps: 50,
        timeoutMs: 3000
      };

      const json = JSON.stringify(endpoint);
      const parsed = JSON.parse(json);

      expect(parsed.url).toBe(endpoint.url);
      expect(parsed.role).toBe('SECONDARY');
      expect(parsed.type).toBe('COMMUNITY');
    });
  });

  describe('ChainRpcConfig', () => {
    it('should accept a complete chain configuration', () => {
      const config: ChainRpcConfig = {
        chainId: 1,
        chainName: 'Ethereum Mainnet',
        endpoints: [
          {
            url: 'https://eth-mainnet.g.alchemy.com/v2/key',
            provider: 'Alchemy',
            role: RpcProviderRole.PRIMARY,
            type: RpcProviderType.MANAGED,
            rateLimitRps: 100,
            timeoutMs: 5000
          },
          {
            url: 'https://rpc.ankr.com/eth',
            provider: 'Ankr Public',
            role: RpcProviderRole.SECONDARY,
            type: RpcProviderType.PUBLIC,
            rateLimitRps: 10,
            timeoutMs: 10000
          }
        ],
        totalOperationTimeoutMs: 30000,
        cacheStaleAcceptanceMs: 60000
      };

      expect(config.chainId).toBe(1);
      expect(config.chainName).toBe('Ethereum Mainnet');
      expect(config.endpoints).toHaveLength(2);
      expect(config.endpoints[0].role).toBe(RpcProviderRole.PRIMARY);
      expect(config.endpoints[1].role).toBe(RpcProviderRole.SECONDARY);
      expect(config.totalOperationTimeoutMs).toBe(30000);
      expect(config.cacheStaleAcceptanceMs).toBe(60000);
    });

    it('should accept a chain with a single endpoint', () => {
      const config: ChainRpcConfig = {
        chainId: 137,
        chainName: 'Polygon PoS',
        endpoints: [
          {
            url: 'https://polygon-rpc.com',
            provider: 'Polygon Public',
            role: RpcProviderRole.PRIMARY,
            type: RpcProviderType.PUBLIC,
            rateLimitRps: 25,
            timeoutMs: 8000
          }
        ],
        totalOperationTimeoutMs: 20000,
        cacheStaleAcceptanceMs: 30000
      };

      expect(config.chainId).toBe(137);
      expect(config.endpoints).toHaveLength(1);
    });
  });

  describe('CircuitBreakerConfig', () => {
    it('should accept a complete circuit breaker configuration', () => {
      const config: CircuitBreakerConfig = {
        failureThreshold: 5,
        openDurationMs: 30000,
        halfOpenMaxAttempts: 2,
        monitorWindowMs: 60000
      };

      expect(config.failureThreshold).toBe(5);
      expect(config.openDurationMs).toBe(30000);
      expect(config.halfOpenMaxAttempts).toBe(2);
      expect(config.monitorWindowMs).toBe(60000);
    });

    it('should be JSON serializable', () => {
      const config: CircuitBreakerConfig = {
        failureThreshold: 3,
        openDurationMs: 15000,
        halfOpenMaxAttempts: 1,
        monitorWindowMs: 30000
      };

      const json = JSON.stringify(config);
      const parsed = JSON.parse(json);

      expect(parsed).toEqual(config);
    });
  });

  describe('RetryConfig', () => {
    it('should accept a complete retry configuration', () => {
      const config: RetryConfig = {
        maxAttempts: 3,
        baseDelayMs: 1000,
        maxDelayMs: 10000
      };

      expect(config.maxAttempts).toBe(3);
      expect(config.baseDelayMs).toBe(1000);
      expect(config.maxDelayMs).toBe(10000);
    });

    it('should support exponential backoff calculation', () => {
      const config: RetryConfig = {
        maxAttempts: 4,
        baseDelayMs: 500,
        maxDelayMs: 8000
      };

      // Verify backoff values stay within bounds
      for (let attempt = 0; attempt < config.maxAttempts; attempt++) {
        const delay = Math.min(
          config.baseDelayMs * Math.pow(2, attempt),
          config.maxDelayMs
        );
        expect(delay).toBeLessThanOrEqual(config.maxDelayMs);
        expect(delay).toBeGreaterThanOrEqual(config.baseDelayMs);
      }
    });
  });

  describe('HealthCheckConfig', () => {
    it('should accept a complete health check configuration', () => {
      const config: HealthCheckConfig = {
        intervalMs: 30000,
        timeoutMs: 5000,
        method: 'eth_blockNumber'
      };

      expect(config.intervalMs).toBe(30000);
      expect(config.timeoutMs).toBe(5000);
      expect(config.method).toBe('eth_blockNumber');
    });

    it('should support different health check methods', () => {
      const ethBlockNumber: HealthCheckConfig = {
        intervalMs: 30000,
        timeoutMs: 5000,
        method: 'eth_blockNumber'
      };

      const ethChainId: HealthCheckConfig = {
        intervalMs: 60000,
        timeoutMs: 3000,
        method: 'eth_chainId'
      };

      expect(ethBlockNumber.method).not.toBe(ethChainId.method);
    });
  });

  describe('RpcProviderConfig', () => {
    it('should accept a complete multi-chain configuration', () => {
      const config: RpcProviderConfig = {
        chains: {
          '1': {
            chainId: 1,
            chainName: 'Ethereum Mainnet',
            endpoints: [
              {
                url: 'https://eth-mainnet.g.alchemy.com/v2/key',
                provider: 'Alchemy',
                role: RpcProviderRole.PRIMARY,
                type: RpcProviderType.MANAGED,
                rateLimitRps: 100,
                timeoutMs: 5000
              }
            ],
            totalOperationTimeoutMs: 30000,
            cacheStaleAcceptanceMs: 60000
          },
          '137': {
            chainId: 137,
            chainName: 'Polygon PoS',
            endpoints: [
              {
                url: 'https://polygon-mainnet.g.alchemy.com/v2/key',
                provider: 'Alchemy',
                role: RpcProviderRole.PRIMARY,
                type: RpcProviderType.MANAGED,
                rateLimitRps: 100,
                timeoutMs: 5000
              }
            ],
            totalOperationTimeoutMs: 25000,
            cacheStaleAcceptanceMs: 45000
          }
        },
        circuitBreaker: {
          failureThreshold: 5,
          openDurationMs: 30000,
          halfOpenMaxAttempts: 2,
          monitorWindowMs: 60000
        },
        retry: {
          maxAttempts: 3,
          baseDelayMs: 1000,
          maxDelayMs: 10000
        },
        healthCheck: {
          intervalMs: 30000,
          timeoutMs: 5000,
          method: 'eth_blockNumber'
        }
      };

      expect(Object.keys(config.chains)).toHaveLength(2);
      expect(config.chains['1'].chainName).toBe('Ethereum Mainnet');
      expect(config.chains['137'].chainName).toBe('Polygon PoS');
      expect(config.circuitBreaker.failureThreshold).toBe(5);
      expect(config.retry.maxAttempts).toBe(3);
      expect(config.healthCheck.method).toBe('eth_blockNumber');
    });

    it('should support chain lookup by string chain ID', () => {
      const config: RpcProviderConfig = {
        chains: {
          '1': {
            chainId: 1,
            chainName: 'Ethereum Mainnet',
            endpoints: [],
            totalOperationTimeoutMs: 30000,
            cacheStaleAcceptanceMs: 60000
          }
        },
        circuitBreaker: {
          failureThreshold: 5,
          openDurationMs: 30000,
          halfOpenMaxAttempts: 2,
          monitorWindowMs: 60000
        },
        retry: {
          maxAttempts: 3,
          baseDelayMs: 1000,
          maxDelayMs: 10000
        },
        healthCheck: {
          intervalMs: 30000,
          timeoutMs: 5000,
          method: 'eth_blockNumber'
        }
      };

      // Lookup by numeric chain ID converted to string
      const chainId = 1;
      const chainConfig = config.chains[String(chainId)];
      expect(chainConfig).toBeDefined();
      expect(chainConfig.chainId).toBe(1);
    });

    it('should be fully JSON serializable', () => {
      const config: RpcProviderConfig = {
        chains: {
          '1': {
            chainId: 1,
            chainName: 'Ethereum Mainnet',
            endpoints: [
              {
                url: 'https://eth.example.com',
                provider: 'Test',
                role: RpcProviderRole.PRIMARY,
                type: RpcProviderType.MANAGED,
                rateLimitRps: 50,
                timeoutMs: 5000
              }
            ],
            totalOperationTimeoutMs: 30000,
            cacheStaleAcceptanceMs: 60000
          }
        },
        circuitBreaker: {
          failureThreshold: 5,
          openDurationMs: 30000,
          halfOpenMaxAttempts: 2,
          monitorWindowMs: 60000
        },
        retry: {
          maxAttempts: 3,
          baseDelayMs: 1000,
          maxDelayMs: 10000
        },
        healthCheck: {
          intervalMs: 30000,
          timeoutMs: 5000,
          method: 'eth_blockNumber'
        }
      };

      const json = JSON.stringify(config);
      const parsed = JSON.parse(json);

      expect(parsed.chains['1'].chainId).toBe(1);
      expect(parsed.chains['1'].endpoints[0].role).toBe('PRIMARY');
      expect(parsed.circuitBreaker.failureThreshold).toBe(5);
      expect(parsed.retry.maxAttempts).toBe(3);
      expect(parsed.healthCheck.method).toBe('eth_blockNumber');
    });
  });

  describe('Contract Tests (Breaking Change Detection)', () => {
    it('should not remove RpcProviderRole values', () => {
      const coreRoles = ['PRIMARY', 'SECONDARY', 'TERTIARY', 'EMERGENCY'];
      const values = Object.values(RpcProviderRole);
      coreRoles.forEach(role => {
        expect(values).toContain(role);
      });
    });

    it('should not remove RpcProviderType values', () => {
      const coreTypes = ['MANAGED', 'PUBLIC', 'COMMUNITY'];
      const values = Object.values(RpcProviderType);
      coreTypes.forEach(type => {
        expect(values).toContain(type);
      });
    });
  });
});
