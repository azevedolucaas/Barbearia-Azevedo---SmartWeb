const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'index.html',
  'pages/contato.html',
  'pages/equipe.html',
  'pages/privacidade.html',
  'pages/servicos.html',
  'pages/sobre.html',
  'pages/termos.html'
];

let rootRelativeErrors = [];
let caseMismatchErrors = [];
let checked = 0;

function checkExactCase(filePath) {
  const parts = path.normalize(filePath).split(path.sep);
  let current = process.cwd();
  
  for (const part of parts) {
    if (!part || part === '.') continue;
    if (part === '..') {
      current = path.dirname(current);
      continue;
    }
    const entries = fs.readdirSync(current);
    const exactMatch = entries.find(e => e === part);
    if (!exactMatch) {
      const insensitiveMatch = entries.find(e => e.toLowerCase() === part.toLowerCase());
      if (insensitiveMatch) {
        return { ok: false, expected: part, actual: insensitiveMatch, dir: current };
      }
      return { ok: false, missing: true, path: filePath };
    }
    current = path.join(current, exactMatch);
  }
  return { ok: true };
}

// 1. Check HTML files
htmlFiles.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  const dir = path.dirname(hf);
  
  const regex = /(?:src|href)=["']([^"'#]+)["']/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const ref = m[1];
    if (ref.startsWith('http:') || ref.startsWith('https:') || ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('javascript:') || ref.startsWith('data:')) {
      continue;
    }
    
    checked++;
    
    if (ref.startsWith('/') && !ref.startsWith('//')) {
      rootRelativeErrors.push({ file: hf, ref });
    }
    
    const cleanRef = ref.split('?')[0];
    const resolvedRel = path.join(dir, cleanRef);
    const caseResult = checkExactCase(resolvedRel);
    
    if (!caseResult.ok) {
      caseMismatchErrors.push({ file: hf, ref: cleanRef, result: caseResult });
    }
  }
});

// 2. Check CSS imports recursively
function checkCssFile(file) {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  const regex = /@import\s+['"]([^'"]+)['"]/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const imp = m[1];
    checked++;
    const resolvedRel = path.join(dir, imp);
    const caseResult = checkExactCase(resolvedRel);
    if (!caseResult.ok) {
      caseMismatchErrors.push({ file, ref: imp, result: caseResult });
    }
    checkCssFile(resolvedRel);
  }
}
checkCssFile('css/main.css');

// 3. Check JS imports
function scanJsDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanJsDir(full);
    } else if (entry.name.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      const regex = /(?:import|export)\s+(?:.*?from\s+)?['"]([^'"]+)['"]/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        const imp = m[1];
        if (imp.startsWith('.')) {
          checked++;
          const resolvedRel = path.join(dir, imp);
          const caseResult = checkExactCase(resolvedRel);
          if (!caseResult.ok) {
            caseMismatchErrors.push({ file: full, ref: imp, result: caseResult });
          }
        }
      }
    }
  }
}
scanJsDir('js');
scanJsDir('data');

console.log('--- GitHub Pages Compatibility Audit ---');
console.log(`Total references checked (HTML, CSS, JS): ${checked}`);
console.log(`Root-relative references (incompatible with GitHub Pages subfolder): ${rootRelativeErrors.length}`);
if (rootRelativeErrors.length > 0) {
  rootRelativeErrors.forEach(e => console.log(`  - [${e.file}] -> ${e.ref}`));
}
console.log(`Case mismatches (breaks on Linux/GitHub Pages): ${caseMismatchErrors.length}`);
if (caseMismatchErrors.length > 0) {
  caseMismatchErrors.forEach(e => console.log(`  - [${e.file}] -> ${e.ref}: expected ${e.result.expected}, actual ${e.result.actual}`));
}

const pass = rootRelativeErrors.length === 0 && caseMismatchErrors.length === 0;
console.log(`Result: ${pass ? '100% GITHUB PAGES COMPATIBLE ✅' : 'ISSUES DETECTED ❌'}`);
process.exit(pass ? 0 : 1);
