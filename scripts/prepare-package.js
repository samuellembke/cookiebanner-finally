#!/usr/bin/env node

/**
 * This script prepares the package for publication
 * It generates type definitions and copies essential files to the dist directory
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const PACKAGE_JSON_PATH = path.resolve(ROOT_DIR, 'package.json');
const README_PATH = path.resolve(ROOT_DIR, 'README.md');
const DIST_PACKAGE_JSON_PATH = path.resolve(DIST_DIR, 'package.json');
const DIST_README_PATH = path.resolve(DIST_DIR, 'README.md');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Generate type definitions
console.log('Generating type definitions...');
try {
  execSync('tsc --emitDeclarationOnly', { cwd: ROOT_DIR, stdio: 'inherit' });
  console.log('Type definitions generated successfully');
} catch (error) {
  console.error('Error generating type definitions:', error);
  process.exit(1);
}

// Copy README.md to dist
console.log('Copying README.md to dist...');
fs.copyFileSync(README_PATH, DIST_README_PATH);

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));

// Create simplified package.json for distribution
const distPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  main: 'index.js',
  module: 'index.js',
  types: 'index.d.ts',
  license: packageJson.license,
  author: packageJson.author,
  repository: packageJson.repository,
  keywords: packageJson.keywords,
  peerDependencies: packageJson.peerDependencies,
  dependencies: packageJson.dependencies
};

// Write simplified package.json to dist
console.log('Writing package.json to dist...');
fs.writeFileSync(
  DIST_PACKAGE_JSON_PATH,
  JSON.stringify(distPackageJson, null, 2),
  'utf-8'
);

console.log('Package preparation complete!');
