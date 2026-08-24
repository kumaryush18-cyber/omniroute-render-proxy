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
  
  // We want to completely remove the `import * as fsNative from "node:fs";` if we didn't actually need it or if it was added automatically by our earlier regex.
  // Wait, the original bug was that a script changed `import fs from "node:fs";` into `import * as fsNative from "node:fs";` globally, which broke things.
  // But SOME files might actually need it because they use `fsNative.existsSync()` now, or maybe they didn't?
  // Let's see how many times `fsNative.` is used in the file.
  
  const fsNativeCount = (content.match(/fsNative\./g) || []).length;
  if (fsNativeCount === 0 && content.includes('import * as fsNative from "node:fs";')) {
    console.log(`Removing unused fsNative from ${f}`);
    content = content.replace(/import \* as fsNative from "node:fs";\n?/g, '');
    fs.writeFileSync(f, content, 'utf8');
  } else if (content.includes('import * as fsNative from "node:fs";')) {
     console.log(`Keeping fsNative in ${f} (used ${fsNativeCount} times)`);
  }
}
