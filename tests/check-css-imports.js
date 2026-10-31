const fs = require('fs');
const path = require('path');

function checkCssImports(cssFile, visited = new Set()) {
  if (visited.has(cssFile)) return true;
  visited.add(cssFile);
  
  if (!fs.existsSync(cssFile)) {
    console.error('MISSING CSS FILE:', cssFile);
    return false;
  }
  
  const content = fs.readFileSync(cssFile, 'utf8');
  const importRegex = /@import\s+['"]([^'"]+)['"]/g;
  let match;
  let allOk = true;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    const resolved = path.normalize(path.join(path.dirname(cssFile), importPath));
    if (!fs.existsSync(resolved)) {
      console.error('BROKEN IMPORT in', cssFile, '->', importPath, '(resolved:', resolved, ')');
      allOk = false;
    } else {
      console.log('OK import:', cssFile, '->', importPath, '(', resolved, ')');
      const subOk = checkCssImports(resolved, visited);
      if (!subOk) allOk = false;
    }
  }
  return allOk;
}

console.log('--- Verifying CSS imports from css/main.css ---');
const ok = checkCssImports('css/main.css');
console.log('Result:', ok ? 'ALL CSS IMPORTS VALID ✅' : 'FAILURES FOUND ❌');
process.exit(ok ? 0 : 1);

