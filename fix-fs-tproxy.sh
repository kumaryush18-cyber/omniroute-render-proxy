#!/bin/bash
sed -i 's/import fs from "node:fs";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' src/mitm/tproxy/caTrust.ts
sed -i 's/import fs from "fs";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' src/mitm/tproxy/caTrust.ts
sed -i 's/import fs from "node:fs\/promises";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' src/mitm/tproxy/caTrust.ts
sed -i 's/import fs from "fs\/promises";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' src/mitm/tproxy/caTrust.ts

sed -i 's/import fs from "node:fs";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' src/mitm/manager.ts
sed -i 's/import fs from "fs";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' src/mitm/manager.ts
sed -i 's/import fs from "node:fs\/promises";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' src/mitm/manager.ts
sed -i 's/import fs from "fs\/promises";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' src/mitm/manager.ts

sed -i 's/import fs from "node:fs";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' src/mitm/manager.runtime.ts
sed -i 's/import fs from "fs";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' src/mitm/manager.runtime.ts
sed -i 's/import fs from "node:fs\/promises";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' src/mitm/manager.runtime.ts
sed -i 's/import fs from "fs\/promises";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' src/mitm/manager.runtime.ts
