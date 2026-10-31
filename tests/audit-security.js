const fs = require('fs');
const path = require('path');

function getAllFiles(dir, fileList = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === '.git') continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles('.');
const activeFiles = allFiles.filter(f => !f.includes('_backup') && !f.includes('.playwright-mcp'));

console.log('====================================================');
console.log('AUDITORIA DE SEGURANÇA E PRIVACIDADE PRÉ-PUBLICAÇÃO');
console.log('Projeto: Barbearia Azevedo Corta');
console.log('Data:', new Date().toISOString());
console.log('Arquivos totais (com backups):', allFiles.length);
console.log('Arquivos ativos (sem backups):', activeFiles.length);
console.log('====================================================\n');

// 1. Arquivos sensíveis por extensão / nome
console.log('--- 1. BUSCA POR ARQUIVOS SENSÍVEIS OU BINÁRIOS ---');
const sensitiveExtensions = ['.env', '.pem', '.key', '.pfx', '.p12', '.cer', '.crt', '.kdbx', '.exe', '.bat', '.cmd', '.ps1', '.vbs', '.dll', '.bin'];
const foundSensitiveFiles = [];

allFiles.forEach(file => {
  const base = path.basename(file).toLowerCase();
  const ext = path.extname(file).toLowerCase();
  if (base.startsWith('.env') || sensitiveExtensions.includes(ext)) {
    foundSensitiveFiles.push({ file: file.replace(/\\/g, '/'), isBackup: file.includes('_backup') });
  }
});

if (foundSensitiveFiles.length === 0) {
  console.log('[OK] Nenhum arquivo .env, chave, certificado ou executável binário encontrado.');
} else {
  console.log('[ALERTA] Arquivos sensíveis encontrados:');
  foundSensitiveFiles.forEach(f => console.log(`  - ${f.file} (Backup: ${f.isBackup})`));
}
console.log('');

// 2. Varredura de segredos e credenciais em arquivos de texto
console.log('--- 2. VARREDURA DE SEGREDOS E CREDENCIAIS (VALORES MASCARADOS) ---');
const textExts = ['.js', '.json', '.html', '.css', '.md', '.yml', '.yaml', '.txt', '.log'];
const secretRules = [
  { name: 'Private Key', regex: /BEGIN (RSA|DSA|EC|OPENSSH|PGP)?\s*PRIVATE KEY/i },
  { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/ },
  { name: 'GitHub Token', regex: /(ghp|gho|ghu|ghs|ghr|github_pat)_[a-zA-Z0-9_]{16,}/ },
  { name: 'Generic Token / Secret String', regex: /(api_key|apikey|app_secret|client_secret|auth_token)\s*[:=]\s*['"][a-zA-Z0-9_\-\.]{12,}['"]/i },
  { name: 'Database URI', regex: /(mongodb|postgres|postgresql|mysql|redis|mssql):\/\/[^\s'"]+/i },
  { name: 'Password assignment', regex: /(password|senha|passwd)\s*[:=]\s*['"][^'"]{4,}['"]/i }
];

function maskSecret(str) {
  if (str.length <= 6) return '***';
  return str.substring(0, 3) + '***' + str.substring(str.length - 3);
}

const foundSecrets = [];
allFiles.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!textExts.includes(ext)) return;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    secretRules.forEach(rule => {
      const match = line.match(rule.regex);
      if (match) {
        foundSecrets.push({
          file: file.replace(/\\/g, '/'),
          line: idx + 1,
          type: rule.name,
          snippetMasked: line.replace(match[0], maskSecret(match[0])).trim().substring(0, 80)
        });
      }
    });
  });
});

if (foundSecrets.length === 0) {
  console.log('[OK] Nenhum segredo ou credencial privada identificado nas regras padrão.');
} else {
  console.log(`[ALERTA] ${foundSecrets.length} ocorrência(s) de credenciais/senhas encontradas:`);
  foundSecrets.forEach(s => console.log(`  - [${s.type}] ${s.file}:${s.line} -> ${s.snippetMasked}`));
}
console.log('');

// 3. Varredura de caminhos locais do Windows e nomes de usuário nos arquivos ativos
console.log('--- 3. EXPOSIÇÃO DE CAMINHOS LOCAIS E USUÁRIO DO WINDOWS (ARQUIVOS ATIVOS) ---');
const pathRegexes = [
  { name: 'Windows User Path', regex: /C:[\\\/]Users[\\\/][a-zA-Z0-9_\s]+/i },
  { name: 'OneDrive Path', regex: /OneDrive/i },
  { name: 'Trabalho Mod 2 Local Folder', regex: /Trabalho Mod 2/i }
];

const foundLocalPaths = [];
activeFiles.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!textExts.includes(ext)) return;
  // Ignora o proprio script de auditoria
  if (file.includes('audit-security.js')) return;

  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    pathRegexes.forEach(pr => {
      if (pr.regex.test(line)) {
        foundLocalPaths.push({
          file: file.replace(/\\/g, '/'),
          line: idx + 1,
          rule: pr.name,
          snippet: line.trim().substring(0, 100)
        });
      }
    });
  });
});

if (foundLocalPaths.length === 0) {
  console.log('[OK] Nenhum caminho absoluto local encontrado nos arquivos ativos.');
} else {
  console.log(`[ATENÇÃO] ${foundLocalPaths.length} ocorrência(s) de caminhos locais encontradas em arquivos ativos:`);
  // deduplicate by file & line
  const seen = new Set();
  foundLocalPaths.forEach(p => {
    const key = `${p.file}:${p.line}`;
    if (!seen.has(key)) {
      seen.add(key);
      console.log(`  - ${p.file}:${p.line} -> ${p.snippet}`);
    }
  });
}
console.log('');

// 4. Verificação de código perigoso no JavaScript do projeto
console.log('--- 4. ANÁLISE DE CONSTRUTOS JAVASCRIPT POTENCIALMENTE PERIGOSOS ---');
const jsFiles = activeFiles.filter(f => f.endsWith('.js') && !f.includes('audit-security.js'));
const dangerousConstructs = [];
const domSinkUsages = [];

jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    if (/\beval\s*\(/.test(line)) dangerousConstructs.push({ file, line: idx + 1, issue: 'eval()' });
    if (/new\s+Function\s*\(/.test(line)) dangerousConstructs.push({ file, line: idx + 1, issue: 'new Function()' });
    if (/child_process/.test(line)) dangerousConstructs.push({ file, line: idx + 1, issue: 'child_process' });
    if (/document\.write\s*\(/.test(line)) dangerousConstructs.push({ file, line: idx + 1, issue: 'document.write()' });

    if (/\.(innerHTML|outerHTML)\s*=/.test(line)) {
      domSinkUsages.push({
        file: file.replace(/\\/g, '/'),
        line: idx + 1,
        snippet: line.trim()
      });
    }
    if (/\.insertAdjacentHTML\s*\(/.test(line)) {
      domSinkUsages.push({
        file: file.replace(/\\/g, '/'),
        line: idx + 1,
        snippet: line.trim()
      });
    }
  });
});

if (dangerousConstructs.length === 0) {
  console.log('[OK] Nenhum eval(), new Function(), document.write() ou child_process detectado no JS ativo do site.');
} else {
  console.log('[ALERTA] Construtos perigosos detectados:');
  dangerousConstructs.forEach(c => console.log(`  - ${c.file}:${c.line} -> ${c.issue}`));
}

console.log(`\nDOM Sinks (innerHTML / outerHTML / insertAdjacentHTML): ${domSinkUsages.length} ocorrência(s):`);
domSinkUsages.forEach(u => console.log(`  - ${u.file}:${u.line} -> ${u.snippet.substring(0, 90)}`));
console.log('');

// 5. Conexões externas e requisições de rede
console.log('--- 5. CONEXÕES EXTERNAS E REQUISIÇÕES DE REDE ---');
const urlRegex = /https?:\/\/[^\s'"\)<>]+/g;
const externalEndpoints = new Map();

activeFiles.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!textExts.includes(ext) || file.includes('audit-security.js')) return;

  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    let url = match[0];
    // Limpeza de pontuação final
    url = url.replace(/[\.,;]+$/, '');
    try {
      const parsed = new URL(url);
      const origin = parsed.origin;
      if (!externalEndpoints.has(origin)) {
        externalEndpoints.set(origin, []);
      }
      externalEndpoints.get(origin).push({ file: file.replace(/\\/g, '/'), url });
    } catch(e) {}
  }
});

console.log('Domínios externos identificados em arquivos ativos:');
externalEndpoints.forEach((occurrences, origin) => {
  console.log(`  - Origem: ${origin} (${occurrences.length} referência(s))`);
  const uniqueSamples = Array.from(new Set(occurrences.map(o => o.url))).slice(0, 3);
  uniqueSamples.forEach(u => console.log(`      Exemplo: ${u}`));
});
console.log('');

// 6. Formulários, LocalStorage e Coleta de Dados
console.log('--- 6. FORMULÁRIOS E LOCALSTORAGE ---');
const storageUsages = [];
jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (/localStorage\.(getItem|setItem|removeItem|clear)/.test(line)) {
      storageUsages.push({
        file: file.replace(/\\/g, '/'),
        line: idx + 1,
        snippet: line.trim()
      });
    }
  });
});

console.log(`Uso de LocalStorage: ${storageUsages.length} chamada(s):`);
storageUsages.forEach(s => console.log(`  - ${s.file}:${s.line} -> ${s.snippet}`));
console.log('');

// 7. Auditoria de Links Externos e Atributos de Segurança nos HTMLs
console.log('--- 7. AUDITORIA DE LINKS EXTERNOS E REQUISITOS HTML ---');
const htmlFiles = ['index.html'].concat(
  fs.readdirSync('pages').filter(f => f.endsWith('.html')).map(f => 'pages/' + f)
);

const missingRel = [];
const insecureHttpLinks = [];
const formAudit = [];
const cspTags = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Forms
  const forms = content.match(/<form\b[^>]*>/gi) || [];
  forms.forEach(f => {
    formAudit.push({ file, form: f });
  });

  // CSP
  const csp = content.match(/<meta[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/i);
  if (csp) cspTags.push({ file, meta: csp[0] });

  // Links
  const aTags = content.match(/<a\b[^>]*>/gi) || [];
  aTags.forEach(tag => {
    if (tag.includes('target="_blank"') || tag.includes("target='_blank'")) {
      const hasNoopener = /rel=["'][^"']*noopener[^"']*["']/i.test(tag);
      const hasNoreferrer = /rel=["'][^"']*noreferrer[^"']*["']/i.test(tag);
      if (!hasNoopener || !hasNoreferrer) {
        missingRel.push({ file, tag });
      }
    }
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1];
      if (href.startsWith('http://') && !href.includes('127.0.0.1') && !href.includes('localhost')) {
        insecureHttpLinks.push({ file, href, tag });
      }
    }
  });
});

console.log(`Auditoria de Links target="_blank": ${missingRel.length} problema(s) detectado(s):`);
missingRel.forEach(m => console.log(`  - [Falta rel="noopener noreferrer"] ${m.file} -> ${m.tag}`));
if (missingRel.length === 0) console.log('  [OK] Todos os links target="_blank" possuem rel="noopener noreferrer".');

console.log(`\nLinks com protocolo inseguro (http:// em vez de https://): ${insecureHttpLinks.length} detectado(s):`);
insecureHttpLinks.forEach(l => console.log(`  - ${l.file} -> ${l.href}`));
if (insecureHttpLinks.length === 0) console.log('  [OK] Nenhum link inseguro http:// externo encontrado.');

console.log(`\nFormulários HTML encontrados: ${formAudit.length}`);
formAudit.forEach(f => console.log(`  - ${f.file} -> ${f.form}`));

console.log(`\nMeta tags Content-Security-Policy (CSP): ${cspTags.length}`);
cspTags.forEach(c => console.log(`  - ${c.file} -> ${c.meta}`));
if (cspTags.length === 0) console.log('  [OBSERVAÇÃO] Nenhuma meta tag CSP configurada nos arquivos HTML.');

console.log('\n====================================================');
console.log('FIM DA ANÁLISE ESTÁTICA PRELIMINAR');
console.log('====================================================');
