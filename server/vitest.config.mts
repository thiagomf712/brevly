import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    include: ['src/domain/**/*.spec.ts'],
  },
  plugins: [tsConfigPaths()],
});
