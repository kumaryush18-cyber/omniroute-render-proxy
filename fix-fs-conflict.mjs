import fs from 'fs';

const files = [
  './bin/cli/data-dir.mjs',
  './bin/cli/sqlite.mjs',
  './bin/cli/commands/status.mjs',
  './bin/cli/commands/setup-codex.mjs',
  './bin/cli/commands/setup-crush.mjs',
  './bin/cli/commands/doctor.mjs',
  './bin/cli/commands/backup.mjs',
  './bin/cli/commands/config.mjs',
  './src/mitm/tproxy/caTrust.ts',
  './src/lib/memory/embedding/staticPotion.ts',
  './src/lib/localCorpus/index.ts',
  './src/app/api/cli-tools/qwen-settings/route.ts',
  './src/app/api/cli-tools/grok-build-settings/route.ts',
  './src/app/api/tools/agent-bridge/diagnose/route.ts',
  './open-sse/executors/devin-cli-agentic.ts',
  './open-sse/executors/zcode.ts',
  './open-sse/executors/auggie.ts',
  './open-sse/executors/devin-cli.ts',
  './open-sse/executors/codex/appServerConfig.ts',
  './open-sse/executors/chatgpt-web-codex/tunnelClient.ts',
  './open-sse/executors/chatgpt-web-codex/storageState.ts'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  
  // What else could ESLint be complaining about?
  // Maybe `import { existsSync } from "node:fs";` in the same file as `import * as fsNative from "node:fs";`?
  // ESLint might flag unused imports or duplicate imports from the same module.
  
  const hasFsNative = content.includes('import * as fsNative from "node:fs"');
  const hasFsDestructured = content.match(/import\s+{([^}]+)}\s+from\s+["'](node:)?fs["']/);
  
  if (hasFsNative && hasFsDestructured) {
    console.log(`Potential conflict in ${f}:`);
    console.log(`  Has fsNative: ${hasFsNative}`);
    console.log(`  Has destructured: import { ${hasFsDestructured[1].trim()} } from ...`);
  }
}
