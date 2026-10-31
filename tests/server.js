const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5176;
const ROOT = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // 1. Extração e decodificação recursiva de URI para prevenir bypass por dupla codificação
  let reqPath;
  try {
    let raw = req.url.split('?')[0];
    let decoded = raw;
    let prev;
    do {
      prev = decoded;
      decoded = decodeURIComponent(prev);
    } while (decoded !== prev && decoded.includes('%'));

    reqPath = decoded;
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request: URI malformada');
    return;
  }

  // 2. Rejeição de caracteres nulos (Null Byte Injection)
  if (reqPath.includes('\0')) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request: Caractere nulo detectado');
    return;
  }

  // 3. Rejeição explícita de segmentos '..' (Anti-Path Traversal imediato)
  const segments = reqPath.split(/[\\\/]+/);
  if (segments.includes('..')) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden: Path traversal detectado');
    return;
  }

  // 4. Rota raiz padrão
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // 5. Normalização estrita e resolução absoluta a partir de ROOT
  const sanitizedSubPath = reqPath.replace(/^[\\\/]+/, '');
  const filePath = path.resolve(ROOT, sanitizedSubPath);

  // 6. Barreira de Diretório: Compara caminho absoluto normalizado
  const normalizedRoot = path.normalize(ROOT).toLowerCase();
  const normalizedFile = path.normalize(filePath).toLowerCase();

  const isInsideRoot = normalizedFile === normalizedRoot || normalizedFile.startsWith(normalizedRoot + path.sep);
  if (!isInsideRoot) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden: Acesso fora do escopo do projeto negado');
    return;
  }

  // 7. Verificação de existência física e bloqueio de diretórios
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found: ' + reqPath);
    return;
  }

  // 8. Entrega segura do recurso com tipo MIME correspondente
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': mime,
    'Access-Control-Allow-Origin': '*',
    'X-Content-Type-Options': 'nosniff'
  });
  fs.createReadStream(filePath).pipe(res);
});

// Limitação estrita à interface de loopback local
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
