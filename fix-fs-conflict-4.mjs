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
  
  const hasFsNative = content.includes('import * as fsNative from "node:fs"');
  const destructuredMatch = content.match(/import\s+{([^}]+)}\s+from\s+["'](node:)?fs["'];?/);
  
  if (hasFsNative && destructuredMatch) {
    console.log(`Fixing duplicate import in ${f}`);
    
    // Instead of replacing usages with fsNative.*, let's just remove the `import * as fsNative` line IF it's not used 
    // OR we can change `import * as fsNative` to `import fs from "node:fs"` and `import { ... }` to `const { ... } = fs;`
    // Actually, Next.js / ESLint is complaining about something.
    // The previous error was that `import * as fsNative from "node:fs"` was defined MULTIPLE times in the file. We fixed that.
    // Now ESLint is likely complaining about `import/no-duplicates`.
    
    // The easiest fix is to remove the `import { ... } from "node:fs"` and replace all usage of those names with `fsNative.name`
    // EXCEPT some of them were ALREADY using `fsNative.name` because of my previous naive replacement.
    
    const importedNames = destructuredMatch[1].split(',').map(n => n.trim()).filter(Boolean);
    content = content.replace(destructuredMatch[0], '');
    
    for (const name of importedNames) {
      // Only replace if it doesn't already have fsNative. before it
      const regex = new RegExp(`(?<!fsNative\\.)\\b${name}\\b`, 'g');
      content = content.replace(regex, `fsNative.${name}`);
    }
    
    fs.writeFileSync(f, content, 'utf8');
    fixed++;
  }
}
console.log(`Fixed ${fixed} files with duplicate imports`);
