import { execSync } from 'child_process';
import fs from 'fs';

const files = [
  './bin/cli/data-dir.mjs',
  './bin/cli/sqlite.mjs',
  './src/lib/localCorpus/index.ts',
  './src/lib/memory/embedding/staticPotion.ts',
  './src/mitm/tproxy/caTrust.ts',
  './bin/cli/commands/status.mjs',
  './bin/cli/commands/setup-codex.mjs',
  './bin/cli/commands/setup-crush.mjs',
  './bin/cli/commands/doctor.mjs',
  './bin/cli/commands/backup.mjs',
  './bin/cli/commands/config.mjs',
  './src/app/api/tools/agent-bridge/diagnose/route.ts',
  './open-sse/executors/devin-cli-agentic.ts',
  './open-sse/executors/zcode.ts',
  './open-sse/executors/auggie.ts',
  './open-sse/executors/devin-cli.ts',
  './src/app/api/cli-tools/qwen-settings/route.ts',
  './src/app/api/cli-tools/grok-build-settings/route.ts',
  './open-sse/executors/codex/appServerConfig.ts',
  './open-sse/executors/chatgpt-web-codex/tunnelClient.ts',
  './open-sse/executors/chatgpt-web-codex/storageState.ts'
];

let failed = false;

for (const file of files) {
  try {
    if (file.endsWith('.mjs')) {
      // Just check syntax for mjs
      execSync(`node --check ${file}`, { stdio: 'ignore' });
    } else {
      // It's TS, we can't typecheck easily without tsc, but we can do a quick check to see if it imports node:fs without error
      // Actually we're flying blind on syntax errors without tsc or eslint, but let's at least see if it parses
      
      const content = fs.readFileSync(file, 'utf8');
      if (content.match(/import \* as fsNative from "node:fs";/g)?.length > 1) {
        console.error(`Multiple fsNative in ${file}`);
        failed = true;
      }
    }
  } catch (e) {
    console.error(`Failed to check ${file}:`, e.message);
    failed = true;
  }
}

if (!failed) {
  console.log("All fixed files passed basic checks.");
}
