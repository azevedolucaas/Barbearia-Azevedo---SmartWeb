const net = require('net');
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const PORT = 5176;

function isPortOpen(port) {
  return new Promise(resolve => {
    const tester = net.createConnection({ port, host: '127.0.0.1' }, () => {
      tester.end();
      resolve(true);
    });
    tester.on('error', () => resolve(false));
  });
}

function sendRawRequest(rawPath) {
  return new Promise((resolve, reject) => {
    const client = net.connect({ port: PORT, host: '127.0.0.1' }, () => {
      client.write(`GET ${rawPath} HTTP/1.1\r\nHost: 127.0.0.1:${PORT}\r\nConnection: close\r\n\r\n`);
    });

    let rawData = '';
    client.on('data', chunk => rawData += chunk.toString());
    client.on('end', () => {
      const statusLine = rawData.split('\r\n')[0];
      const match = statusLine.match(/HTTP\/1\.[01]\s+(\d+)/);
      const statusCode = match ? parseInt(match[1], 10) : 0;
      resolve({ statusCode, rawData });
    });
    client.on('error', reject);
  });
}

async function start() {
  const alreadyRunning = await isPortOpen(PORT);
  let serverProcess = null;

  if (!alreadyRunning) {
    serverProcess = spawn('node', ['tests/server.js'], {
      cwd: path.resolve(__dirname, '..'),
      stdio: ['ignore', 'pipe', 'pipe']
    });

    await new Promise((resolve) => {
      serverProcess.stdout.on('data', data => {
        if (data.toString().includes('Server running at')) resolve();
      });
      setTimeout(resolve, 2000);
    });
  }

  console.log('--- Testing Local Server Security & Anti-Path Traversal ---');
  let passed = 0;
  let total = 0;

  async function testCase(desc, reqPath, expectedStatus) {
    total++;
    try {
      const res = await sendRawRequest(reqPath);
      const isOk = res.statusCode === expectedStatus;
      console.log(`[${isOk ? 'PASS' : 'FAIL'}] ${desc}: ${reqPath} -> Status ${res.statusCode} (Expected ${expectedStatus})`);
      if (isOk) passed++;
    } catch (err) {
      console.log(`[ERROR] ${desc}: ${err.message}`);
    }
  }

  // 1. Rotas Normais Válidas
  await testCase('Normal Root Route', '/', 200);
  await testCase('Normal index.html', '/index.html', 200);
  await testCase('Normal CSS file', '/css/main.css', 200);
  await testCase('Normal JS file', '/js/core/main.js', 200);

  // 2. Ataques de Path Traversal Brutos
  await testCase('Raw Traversal (..)', '/..', 403);
  await testCase('Raw Traversal (/../)', '/../', 403);
  await testCase('Raw Traversal with folder (/../project-folder/)', '/../project%20folder/', 403);
  await testCase('Encoded Traversal (%2e%2e/)', '/%2e%2e/', 403);
  await testCase('Double Encoded Traversal (%252e%252e/)', '/%252e%252e/', 403);
  await testCase('Windows File Traversal (../../Windows/win.ini)', '/..%2f..%2fWindows%2fwin.ini', 403);
  await testCase('Traversal with backslash (..\\..\\)', '/..\\..\\', 403);
  await testCase('Null Byte Injection (%00)', '/index.html%00test', 400);
  await testCase('Non-existent file', '/nao-existe.html', 404);

  console.log(`\nResults: ${passed}/${total} test cases passed.`);
  if (serverProcess) serverProcess.kill('SIGINT');
  process.exit(passed === total ? 0 : 1);
}

start().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
