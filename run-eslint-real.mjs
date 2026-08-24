import { execSync } from 'child_process';
import fs from 'fs';

try {
  // Let's use the local eslint since npm install failed. Wait, it failed because of JSdom engine requirement.
  // We can install eslint locally with --force or --legacy-peer-deps
  execSync('npm install eslint@8 --no-save --legacy-peer-deps', { stdio: 'pipe' });
  console.log("Installed eslint");
  const result = execSync('npx eslint . --ext .ts,.tsx,.mjs,.js --cache false', { encoding: 'utf8', stdio: 'pipe' });
  console.log(result);
} catch (e) {
  console.log("Failed", e.status);
  console.log(e.stdout || e.message);
}
