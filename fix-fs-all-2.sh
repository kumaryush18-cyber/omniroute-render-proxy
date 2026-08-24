#!/bin/bash

# Find files with "import fs from " in these directories
FILES=$(grep -rl "import fs from " bin/cli/ open-sse/executors/ src/app/api/tools/agent-bridge/)

for file in $FILES; do
  if [ -f "$file" ]; then
    sed -i 's/import fs from "node:fs";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' "$file"
    sed -i 's/import fs from "fs";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' "$file"
    sed -i 's/import fs from "node:fs\/promises";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' "$file"
    sed -i 's/import fs from "fs\/promises";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' "$file"
    
    sed -i 's/fs\.existsSync/fsNative.existsSync/g' "$file"
    sed -i 's/fs\.readFileSync/fsNative.readFileSync/g' "$file"
    sed -i 's/fs\.mkdirSync/fsNative.mkdirSync/g' "$file"
    sed -i 's/fs\.writeFileSync/fsNative.writeFileSync/g' "$file"
    sed -i 's/fs\.unlinkSync/fsNative.unlinkSync/g' "$file"
    sed -i 's/fs\.statSync/fsNative.statSync/g' "$file"
    sed -i 's/fs\.createReadStream/fsNative.createReadStream/g' "$file"
    sed -i 's/fs\.createWriteStream/fsNative.createWriteStream/g' "$file"
    sed -i 's/fs\.copyFileSync/fsNative.copyFileSync/g' "$file"
    sed -i 's/fs\.rmSync/fsNative.rmSync/g' "$file"
    
    git add "$file"
  fi
done
