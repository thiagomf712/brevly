import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    include: ['src/domain/**/*.spec.ts'],
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        '**/src/infra/**',
        '**/src/**/types/**',
      ],
    },
  },
  plugins: [tsConfigPaths()],
});
