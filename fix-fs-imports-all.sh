#!/bin/bash
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.mjs" | while read -r file; do
  # Standard replacement: fs from "fs/promises" -> * as fsNative from "fs", fs = fsNative.promises
  sed -i 's/import fs from "fs\/promises";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' "$file"
  sed -i 's/import fs from "node:fs\/promises";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' "$file"

  # Sync versions
  sed -i 's/import fs from "fs";/import * as fs from "fs";/g' "$file"
  sed -i 's/import fs from "node:fs";/import * as fs from "node:fs";/g' "$file"

  # Special case where it's already named something else like fsPromises
  sed -i 's/import fsPromises from "fs\/promises";/import * as fsNative from "fs";\nconst fsPromises = fsNative.promises;/g' "$file"
done
