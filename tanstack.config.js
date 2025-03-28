import { defineConfig } from '@tanstack/config';

export default defineConfig({
  // Whether the CLI should check for updates when running commands
  // Default: true
  versionCheck: true,

  // Package builds
  build: {
    // Define which files to include in the builds
    entrypoints: ['./src/index.ts'],
    // Define output formats (esm, cjs)
    formats: ['esm', 'cjs'],
    // Include source maps
    sourcemap: true,
    // Minify the output
    minify: true,
    // Clean the output directory before building
    clean: true,
    // Generate d.ts files
    dts: true,
    // Target ESM version
    target: 'es2022',
    // Bundle external packages
    bundleNodeModules: false,
    // Bundle exports individually
    bundleExports: true,
  },

  // Testing
  test: {
    // Environment to use: jsdom, node, or happy-dom
    environment: 'node',
    // Test file patterns
    includeSource: ['/src/**/*.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    // Coverage settings
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.d.ts', '**/*.test.ts'],
    },
  },
});
