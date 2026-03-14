import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['vitest'],
  rules: {
    'vitest/expect-expect': 'error',
    'vitest/no-commented-out-tests': 'error',
    'vitest/no-identical-title': 'error',
    'vitest/no-import-node-test': 'error',
    'vitest/require-local-test-context-for-concurrent-snapshots': 'error',
    'vitest/valid-describe-callback': 'error',
    'vitest/valid-expect': 'error',
  },
  overrides: [
    {
      files: [
        '**/*.{spec,test}.{js,ts,mts,tsx}',
        '**/__tests__/**/*.{js,ts,mts,tsx}',
      ],
      rules: {
        'vitest/consistent-test-it': ['error', { fn: 'test' }],
        'vitest/no-disabled-tests': 'error',
        'vitest/no-duplicate-hooks': 'error',
        'vitest/no-test-prefixes': 'error',
        'vitest/no-test-return-statement': 'error',
        'vitest/prefer-to-be': 'error',
        'vitest/prefer-todo': 'error',
        'vitest/require-to-throw-message': 'error',
      },
    },
  ],
});
