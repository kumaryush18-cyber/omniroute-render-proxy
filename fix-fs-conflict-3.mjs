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

let fixed = 0;
for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  
  // A common ESLint error is "import/no-duplicates" when importing from the same module twice
  // e.g. 
  // import * as fsNative from "node:fs";
  // import { existsSync } from "node:fs";
  
  const hasFsNative = content.includes('import * as fsNative from "node:fs"');
  
  // Find destructured imports from "node:fs" or "fs"
  const destructuredMatch = content.match(/import\s+{([^}]+)}\s+from\s+["'](node:)?fs["'];?/);
  
  if (hasFsNative && destructuredMatch) {
    console.log(`Fixing duplicate import in ${f}`);
    
    // The names that were destructured
    const importedNames = destructuredMatch[1].split(',').map(n => n.trim()).filter(Boolean);
    
    // We remove the destructured import line
    content = content.replace(destructuredMatch[0], '');
    
    // And we replace usages of `name` with `fsNative.name`
    for (const name of importedNames) {
      // Create a regex to match the identifier `name` when it's used as a function call or variable, 
      // but not when it's part of another word.
      // e.g. existsSync( -> fsNative.existsSync(
      const regex = new RegExp(`\\b${name}\\b`, 'g');
      content = content.replace(regex, `fsNative.${name}`);
    }
    
    // Write back
    fs.writeFileSync(f, content, 'utf8');
    fixed++;
  }
}
console.log(`Fixed ${fixed} files with duplicate imports`);
