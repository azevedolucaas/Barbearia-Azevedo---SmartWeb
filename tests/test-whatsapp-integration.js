/**
 * TESTE AUTOMATIZADO DA INTEGRAÇÃO DO WHATSAPP
 * Barbearia Azevedo Corta
 */

import { businessConfig } from '../data/config.js';
import { createWhatsAppUrl, buildBookingWhatsAppMessage, getWhatsAppBaseUrl } from '../js/utils/whatsapp.js';
import fs from 'fs';
import path from 'path';

console.log('--- TESTE DA INTEGRAÇÃO CENTRALIZADA DO WHATSAPP ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Configuração centralizada
assert(businessConfig.whatsappNumber === '5521972428922', 'Número internacional configurado: 5521972428922');
assert(businessConfig.whatsappDisplay === '(21) 97242-8922', 'Número de exibição formatado: (21) 97242-8922');
assert(businessConfig.whatsappUrl === 'https://wa.me/5521972428922', 'URL base configurada: https://wa.me/5521972428922');
assert(getWhatsAppBaseUrl() === 'https://wa.me/5521972428922', 'getWhatsAppBaseUrl() retorna https://wa.me/5521972428922');

// 2. Geração de URLs com mensagem customizada
const defaultUrl = createWhatsAppUrl();
assert(defaultUrl.startsWith('https://wa.me/5521972428922?text='), 'URL padrão inicia com https://wa.me/5521972428922?text=');
assert(defaultUrl.includes(encodeURIComponent('Barbearia Azevedo')), 'URL padrão codifica o nome da marca');

// 3. Formatação da mensagem estruturada de agendamento
const sampleBookingData = {
  name: 'Lucas Azevedo',
  phone: '(21) 98888-7777',
  email: 'lucas@exemplo.com',
  serviceName: 'Degradê de Precisão',
  barberName: 'Rafael Costa',
  date: '2026-11-05',
  time: '14:30',
  notes: 'Primeira vez na barbearia'
};

const structuredMsg = buildBookingWhatsAppMessage(sampleBookingData);
assert(structuredMsg.includes('*Nome:* Lucas Azevedo'), 'Mensagem inclui campo *Nome:*');
assert(structuredMsg.includes('*Telefone:* (21) 98888-7777'), 'Mensagem inclui campo *Telefone:*');
assert(structuredMsg.includes('*E-mail:* lucas@exemplo.com'), 'Mensagem inclui campo *E-mail:*');
assert(structuredMsg.includes('*Serviço:* Degradê de Precisão'), 'Mensagem inclui campo *Serviço:*');
assert(structuredMsg.includes('*Barbeiro:* Rafael Costa'), 'Mensagem inclui campo *Barbeiro:*');
assert(structuredMsg.includes('*Data:* 2026-11-05'), 'Mensagem inclui campo *Data:*');
assert(structuredMsg.includes('*Horário:* 14:30'), 'Mensagem inclui campo *Horário:*');
assert(structuredMsg.includes('*Observações:* Primeira vez na barbearia'), 'Mensagem inclui campo *Observações:*');
assert(structuredMsg.includes('*Nota:* Aguardo confirmação de disponibilidade e horário.'), 'Mensagem inclui nota de confirmação');

// 4. Integração do protocolo ao link final de WhatsApp
const protocolCode = '#AZV-2026-784912';
const fullBookingMsg = `${structuredMsg}\n*Protocolo:* ${protocolCode}`;
const fullBookingUrl = createWhatsAppUrl(fullBookingMsg);
assert(fullBookingUrl.startsWith('https://wa.me/5521972428922?text='), 'Link de agendamento direciona para 5521972428922');
assert(fullBookingUrl.includes(encodeURIComponent(protocolCode)), 'Link codifica o código do protocolo rastreável');

// 5. Validação de links estáticos no index.html e páginas secundárias
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(!indexHtml.includes('5521999999999'), 'index.html não contém número antigo 5521999999999');
assert(indexHtml.includes('https://wa.me/5521972428922'), 'index.html contém link https://wa.me/5521972428922');
assert(indexHtml.includes('(21) 97242-8922'), 'index.html exibe o número formatado (21) 97242-8922');

const contatoHtml = fs.readFileSync('pages/contato.html', 'utf8');
assert(!contatoHtml.includes('5521999999999'), 'pages/contato.html não contém número antigo 5521999999999');
assert(contatoHtml.includes('https://wa.me/5521972428922'), 'pages/contato.html contém link https://wa.me/5521972428922');
assert(contatoHtml.includes('(21) 97242-8922'), 'pages/contato.html exibe (21) 97242-8922');

const privacidadeHtml = fs.readFileSync('pages/privacidade.html', 'utf8');
assert(privacidadeHtml.includes('(21) 97242-8922'), 'pages/privacidade.html exibe (21) 97242-8922');

const termosHtml = fs.readFileSync('pages/termos.html', 'utf8');
assert(termosHtml.includes('(21) 97242-8922'), 'pages/termos.html exibe (21) 97242-8922');

console.log('');
console.log(`--- RESULTADO: ${passed} passaram, ${failed} falharam ---`);
if (failed === 0) {
  console.log('INTEGRAÇÃO DO WHATSAPP 100% VALIDADA ✅');
  process.exit(0);
} else {
  console.error('ERROS NA VALIDAÇÃO DO WHATSAPP ❌');
  process.exit(1);
}

