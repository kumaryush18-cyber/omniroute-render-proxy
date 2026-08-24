import { execSync } from 'child_process';
import fs from 'fs';

// Try to use a local or npx eslint if we can
try {
  console.log("Attempting npx eslint...");
  // Use npx with --yes to avoid prompt, but it might fail on node version. Let's try.
  const result = execSync('npx --yes eslint . --ext .ts,.tsx,.mjs,.js --cache false', { encoding: 'utf8', stdio: 'pipe' });
  console.log(result);
} catch (e) {
  console.log("npx eslint failed with status", e.status);
  console.log(e.stdout || e.message);
  
  // What about just looking at the files we changed?
  console.log("\nTrying to parse just the files we touched for syntax errors using node --check:");
  const files = [
    './bin/cli/commands/setup-codex.mjs',
    './bin/cli/commands/setup-crush.mjs',
    './bin/cli/commands/backup.mjs',
    './open-sse/executors/auggie.ts',
    './open-sse/executors/zcode.ts',
    './open-sse/executors/devin-cli.ts',
    './open-sse/executors/devin-cli-agentic.ts',
    './open-sse/executors/chatgpt-web-codex/storageState.ts',
    './open-sse/executors/chatgpt-web-codex/tunnelClient.ts'
  ];
  
  for (const f of files) {
    if (fs.existsSync(f)) {
      if (f.endsWith('.mjs')) {
        try {
          execSync(`node --check ${f}`, { stdio: 'ignore' });
        } catch (err) {
          console.log(`${f}: Node check failed: ${err.message}`);
        }
      } else {
        // Can't easily check TS without tsc. Let's just check for obvious duplications again.
        const content = fs.readFileSync(f, 'utf8');
        const imports = content.match(/import \* as fsNative from "node:fs";/g);
        if (imports && imports.length > 1) {
          console.log(`${f}: HAS MULTIPLE IMPORTS (${imports.length})`);
        }
      }
    }
  }
}
