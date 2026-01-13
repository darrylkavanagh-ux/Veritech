import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts', '**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['engines/**/src/**/*.ts', 'shared/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.spec.ts']
    }
  },
  resolve: {
    alias: {
      '@orb-ai/verification': './engines/verification/src/index.ts',
      '@orb-ai/investigation': './engines/investigation/src/index.ts',
      '@orb-ai/shared': './shared'
    }
  }
});
