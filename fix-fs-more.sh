#!/bin/bash
sed -i 's/import fs from "node:fs";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' src/app/api/tools/agent-bridge/tproxy/route.ts
sed -i 's/import fs from "fs";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' src/app/api/tools/agent-bridge/tproxy/route.ts
sed -i 's/import fs from "node:fs\/promises";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' src/app/api/tools/agent-bridge/tproxy/route.ts
sed -i 's/import fs from "fs\/promises";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' src/app/api/tools/agent-bridge/tproxy/route.ts

sed -i 's/import fs from "node:fs";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' src/app/api/tools/agent-bridge/server/route.ts
sed -i 's/import fs from "fs";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' src/app/api/tools/agent-bridge/server/route.ts
sed -i 's/import fs from "node:fs\/promises";/import * as fsNative from "node:fs";\nconst fs = fsNative.promises;/g' src/app/api/tools/agent-bridge/server/route.ts
sed -i 's/import fs from "fs\/promises";/import * as fsNative from "fs";\nconst fs = fsNative.promises;/g' src/app/api/tools/agent-bridge/server/route.ts
