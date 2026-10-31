const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getAllJsFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_backup') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllJsFiles(full, list);
    } else if (entry.name.endsWith('.js')) {
      list.push(full);
    }
  }
  return list;
}

const jsFiles = getAllJsFiles('js').concat(getAllJsFiles('data'));
console.log('--- Checking JS Syntax for', jsFiles.length, 'files ---');

let syntaxErrors = 0;
for (const file of jsFiles) {
  try {
    execSync(`node --check "${file}"`, { stdio: 'pipe' });
    console.log('Syntax OK:', file);
  } catch (err) {
    console.error('Syntax ERROR in', file, err.message);
    syntaxErrors++;
  }
}

console.log('\n--- Checking ES Module Import Resolution ---');
let importErrors = 0;
const importRegex = /(?:import|export)\s+(?:.*?from\s+)?['"]([^'"]+)['"]/g;

for (const file of jsFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importTarget = match[1];
    if (importTarget.startsWith('.')) {
      const resolved = path.normalize(path.join(path.dirname(file), importTarget));
      if (!fs.existsSync(resolved)) {
        console.error('BROKEN IMPORT in', file, '->', importTarget, '(resolved:', resolved, ')');
        importErrors++;
      } else {
        console.log('Resolved import:', file, '->', importTarget);
      }
    }
  }
}

console.log('\n--- Summary ---');
console.log('Syntax Errors:', syntaxErrors);
console.log('Import Errors:', importErrors);
const success = syntaxErrors === 0 && importErrors === 0;
console.log('Result:', success ? 'ALL JS CHECKS PASSED ✅' : 'FAILURES DETECTED ❌');
process.exit(success ? 0 : 1);

