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
  
  // We want to remove `import * as fsNative from "node:fs";` from anywhere that isn't the top level import block where it belongs,
  // BUT we noticed that the previous script just added one at the top. Let's see if we have duplicates in these files
  
  const matches = content.match(/import \* as fsNative from "node:fs";/g);
  if (matches && matches.length > 1) {
    console.log(`Fixing ${f} which has ${matches.length} occurrences`);
    content = content.replaceAll(/import \* as fsNative from "node:fs";\n?/g, '');
    
    // Add it exactly once at the top of the file, after hashbang or license comments if any
    let lines = content.split('\n');
    let insertIdx = 0;
    while (insertIdx < lines.length && (lines[insertIdx].startsWith('#!') || lines[insertIdx].startsWith('//') || lines[insertIdx].startsWith('/*'))) {
      if (lines[insertIdx].startsWith('/*')) {
         // skip block comment
         while (insertIdx < lines.length && !lines[insertIdx].includes('*/')) {
           insertIdx++;
         }
         insertIdx++;
      } else {
        insertIdx++;
      }
    }
    
    lines.splice(insertIdx, 0, 'import * as fsNative from "node:fs";');
    fs.writeFileSync(f, lines.join('\n'), 'utf8');
  }
}
console.log("Done checking all 21 files");
