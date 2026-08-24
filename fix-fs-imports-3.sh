#!/bin/bash

# Find files with "import { ... } from 'node:fs';"
# and replace the import + usages
FILES=(
  "bin/cli/commands/backup.mjs"
  "bin/cli/commands/setup-codex.mjs"
  "bin/cli/commands/setup-crush.mjs"
  "open-sse/executors/auggie.ts"
  "open-sse/executors/chatgpt-web-codex/storageState.ts"
  "open-sse/executors/chatgpt-web-codex/tunnelClient.ts"
  "open-sse/executors/codex/appServerConfig.ts"
  "open-sse/executors/devin-cli-agentic.ts"
  "open-sse/executors/devin-cli.ts"
  "open-sse/executors/zcode.ts"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # We'll just replace the specific destructured imports with fsNative
    sed -i 's/import {/import * as fsNative from "node:fs";\n\/\/ import {/g' "$file"
    
    # Actually, the destructured methods might just be used directly like `existsSync(path)`
    sed -i 's/existsSync(/fsNative.existsSync(/g' "$file"
    sed -i 's/readFileSync(/fsNative.readFileSync(/g' "$file"
    sed -i 's/mkdirSync(/fsNative.mkdirSync(/g' "$file"
    sed -i 's/writeFileSync(/fsNative.writeFileSync(/g' "$file"
    sed -i 's/unlinkSync(/fsNative.unlinkSync(/g' "$file"
    sed -i 's/statSync(/fsNative.statSync(/g' "$file"
    sed -i 's/createReadStream(/fsNative.createReadStream(/g' "$file"
    sed -i 's/createWriteStream(/fsNative.createWriteStream(/g' "$file"
    sed -i 's/copyFileSync(/fsNative.copyFileSync(/g' "$file"
    sed -i 's/rmSync(/fsNative.rmSync(/g' "$file"
    sed -i 's/readdirSync(/fsNative.readdirSync(/g' "$file"
    sed -i 's/rmdirSync(/fsNative.rmdirSync(/g' "$file"
    
    # For cases where they import from node:fs directly (already fixed the fs. prefix, now fixing naked imports)
    
    git add "$file"
  fi
done
