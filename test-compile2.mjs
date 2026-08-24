import { execSync } from 'child_process';
import fs from 'fs';

const files = [
  './bin/cli/commands/setup-codex.mjs',
  './bin/cli/commands/setup-crush.mjs',
  './bin/cli/commands/backup.mjs',
  './open-sse/executors/zcode.ts',
  './open-sse/executors/codex/appServerConfig.ts',
  './open-sse/executors/chatgpt-web-codex/tunnelClient.ts',
  './open-sse/executors/chatgpt-web-codex/storageState.ts'
];

for (const file of files) {
  try {
    if (file.endsWith('.mjs')) {
      execSync(`node --check ${file}`, { stdio: 'ignore' });
    }
  } catch (e) {
    console.error(`Failed to check ${file}:`, e.message);
  }
}
console.log("Checks done");
