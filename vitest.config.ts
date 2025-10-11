import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            exclude: [
                'node_modules/',
                'dist/',
                '**/*.test.ts',
                '**/*.config.*',
                '**/fixtures/**',
                'eslint.config.mjs'
            ],
            all: true,
            lines: 95,
            functions: 95,
            branches: 95,
            statements: 95
        },
        include: ['**/*.test.ts'],
        globals: true
    }
});