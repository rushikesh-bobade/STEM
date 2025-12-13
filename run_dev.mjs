#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nextBin = path.join(__dirname, 'node_modules', '.bin', 'next');

try {
  console.log('Starting Next.js dev server...');
  execSync(`${nextBin} dev --turbopack`, { 
    stdio: 'inherit',
    cwd: __dirname,
    env: { ...process.env, NODE_ENV: 'development' }
  });
} catch (err) {
  console.error('Failed to start dev server:', err.message);
  process.exit(1);
}
