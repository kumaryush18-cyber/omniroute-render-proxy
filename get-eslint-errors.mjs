import { execSync } from 'child_process';
import fs from 'fs';

try {
  // We don't have eslint installed globally or in node_modules, but we can see what CI complained about by fetching the exact file it ran
  // We know there are 21 errors. 
  // Let's just download the artifact or grep the log for the specific eslint output
  execSync('gh run view 32728325020 --log > full_log.txt');
  const log = fs.readFileSync('full_log.txt', 'utf8');
  
  const lines = log.split('\n');
  let capturing = false;
  let out = [];
  
  for (const line of lines) {
    if (line.includes('ESLint errors — 21 error(s)')) {
      capturing = true;
      continue;
    }
    
    if (capturing) {
      if (line.includes('──────── verdict ────────') || line.includes('Ratchet drift') || line.includes('DB rules')) {
        capturing = false;
        break;
      }
      if (line.trim().length > 0) {
        out.push(line);
      }
    }
  }
  
  console.log("ESLint errors from CI:");
  console.log(out.slice(0, 50).join('\n'));
} catch (e) {
  console.error(e);
}
