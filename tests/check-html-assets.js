const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'index.html',
  'pages/contato.html',
  'pages/equipe.html',
  'pages/privacidade.html',
  'pages/servicos.html',
  'pages/sobre.html',
  'pages/termos.html',
  'tests/test-booking.html'
];

let missing = 0;
let checked = 0;

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
    const cleanRef = ref.split('?')[0];
    const resolved = path.normalize(path.join(dir, cleanRef));
    checked++;
    if (!fs.existsSync(resolved)) {
      console.error(`MISSING ASSET in ${hf} -> ${cleanRef} (resolved: ${resolved})`);
      missing++;
    }
  }
});

console.log(`--- Asset Verification Results ---`);
console.log(`Total HTML files scanned: ${htmlFiles.length}`);
console.log(`Total local asset references checked: ${checked}`);
console.log(`Total missing assets: ${missing}`);
const ok = missing === 0;
console.log(`Result: ${ok ? 'ALL ASSETS RESOLVED ON DISK ✅' : 'FAILURES DETECTED ❌'}`);
process.exit(ok ? 0 : 1);
