import { execSync } from 'child_process';
import * as fs from 'fs';

console.log('Starting installation with Node...');

try {
  // Try using Node's built-in npm
  const npmPath = process.execPath.replace('node', 'npm');
  console.log('Attempting install...');
  execSync('npm install --prefer-offline', { stdio: 'inherit', shell: true });
  console.log('Installation complete!');
} catch (e) {
  console.error('Install failed:', e.message);
  process.exit(1);
}
