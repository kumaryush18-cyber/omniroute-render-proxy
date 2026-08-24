import fs from 'fs';

const log = fs.readFileSync('full_log.txt', 'utf8');
const regex = /[^/]+:\d+:\d+\s+error\s+[^]+?(?=\n\S|$)/g;
let match;
let count = 0;
while ((match = regex.exec(log)) !== null && count < 20) {
  console.log(match[0]);
  count++;
}

if (count === 0) {
  console.log("No detailed eslint errors found in the log directly using that regex.");
  
  // Let's try to just find lines that mention the files we changed
  const lines = log.split('\n');
  const interestingLines = lines.filter(l => 
    l.includes('setup-codex') || 
    l.includes('devin-cli') || 
    l.includes('storageState') || 
    l.includes('auggie') ||
    l.includes('zcode') ||
    l.includes('setup-crush') ||
    l.includes('backup.mjs')
  ).filter(l => l.toLowerCase().includes('error'));
  
  console.log("Interesting lines with 'error':");
  console.log(interestingLines.slice(0, 20).join('\n'));
}
