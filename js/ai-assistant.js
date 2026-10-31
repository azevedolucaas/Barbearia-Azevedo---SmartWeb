/**
 * ASSISTENTE INTELIGENTE DE VISAGISMO E RECOMENDAÇÃO
 * BARBEARIA AZEVEDO CORTA
 * 
 * Automação desenvolvida em JavaScript puro (sem APIs pagas ou chaves secretas).
 * Analisa as necessidades e formato de rosto do cliente, recomenda os serviços ideais
 * do catálogo oficial e gera automaticamente a mensagem formatada para agendamento no WhatsApp
 * ou pré-preenche o formulário da página.
 */

import { businessConfig } from '../data/config.js';
import { createWhatsAppUrl } from './utils/whatsapp.js';

// Base de conhecimento e regras de negócio para recomendação
const visagismoRules = {
  rosto: [
    {
      tipo: 'redondo',
      keywords: ['redondo', 'bochecha', 'afinar'],
      recomendacao: 'Cortes com volume vertical no topo e degradê lateral (Skin Fade) para alongar as proporções faciais. Barba alinhada com linhas retas.',
      servicoId: 'degrade',
      servicoNome: 'Degradê de Precisão (R$ 80)'
    },
    {
      tipo: 'quadrado',
      keywords: ['quadrado', 'maxilar', 'angular', 'largo'],
      recomendacao: 'Laterais clássicas ou degradê médio com topo texturizado ou pompadour. Realce do maxilar marcado na navalha.',
      servicoId: 'corte-barba',
      servicoNome: 'Corte + Barba (R$ 115)'
    },
    {
      tipo: 'oval',
      keywords: ['oval', 'comprido'],
      recomendacao: 'O formato mais versátil da barbearia clássica. Adapta-se ao corte na tesoura, degradê navalhado ou topete estruturado.',
      servicoId: 'corte-masculino',
      servicoNome: 'Corte Masculino (R$ 70)'
    },
    {
      tipo: 'triangular',
      keywords: ['triangular', 'fino', 'queixo'],
      recomendacao: 'Barba mais cheia na base para dar peso à mandíbula, combinada a corte com volume e textura no topo.',
      servicoId: 'barba-toalha-quente',
      servicoNome: 'Barba com Toalha Quente (R$ 75)'
    }
  ],

  barba: [
    {
      keywords: ['barba', 'cuidar', 'toalha', 'quente', 'vapor', 'completa', 'relaxar'],
      recomendacao: 'Ritual clássico com toalha quente aromática, vapor de ozônio, navalhete descartável e massagem facial relaxante.',
      servicoId: 'barba-toalha-quente',
      servicoNome: 'Barba com Toalha Quente (R$ 75)'
    },
    {
      keywords: ['aparar', 'alinhar', 'desenho', 'modelar', 'rapida'],
      recomendacao: 'Alinhamento anatômico com navalha, controle de volume e hidratação profunda com balm artesanal.',
      servicoId: 'barba',
      servicoNome: 'Barba & Modelagem (R$ 55)'
    }
  ],

  combos: [
    {
      keywords: ['combo', 'completo', 'tudo', 'casamento', 'festa', 'evento'],
      recomendacao: 'Experiência máxima Azevedo: Corte sob medida, Barboterapia tradicional com toalha quente e finalização com produto nobre.',
      servicoId: 'combo-azevedo',
      servicoNome: 'Combo Azevedo (R$ 150)'
    }
  ]
};

export function initAiAssistant() {
  const existing = document.getElementById('aiAssistantWidget');
  if (existing) existing.remove();

  // Injetar DOM do Assistente de Automação
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'aiAssistantWidget';
  widgetContainer.innerHTML = `
    <button type="button" class="ai-trigger-btn" id="aiTriggerBtn" aria-label="Abrir Consultoria Inteligente de Estilo">
      <span class="iconify" data-icon="solar:magic-stick-linear"></span>
      <span class="ai-trigger-label">Consultor de Estilo</span>
    </button>

    <div class="ai-chat-drawer" id="aiChatDrawer" aria-hidden="true" role="dialog" aria-label="Consultor Inteligente de Visagismo">
      <div class="ai-chat-header">
        <div class="ai-header-info">
          <div class="ai-avatar">
            <span class="iconify" data-icon="solar:magic-stick-bold"></span>
          </div>
          <div>
            <h4 class="ai-title">Consultor de Visagismo</h4>
            <div style="display:flex; align-items:center; gap:6px; margin-top:2px;">
              <span class="ai-badge-live">● Automação Ativa</span>
            </div>
          </div>
        </div>
        <button type="button" class="ai-close-btn" id="aiCloseBtn" aria-label="Fechar consultor">✕</button>
      </div>

      <div class="ai-chat-messages" id="aiChatMessages" aria-live="polite">
        <div class="ai-msg bot">
          Olá! Sou o <strong>Consultor Inteligente da Barbearia Azevedo</strong>.<br><br>
          Posso recomendar o serviço ideal de acordo com o <strong>formato do seu rosto</strong> ou necessidade de barba e preparar sua mensagem de agendamento para o WhatsApp. Como posso ajudar?
        </div>
      </div>

      <div class="ai-quick-pills">
        <button type="button" class="ai-pill" data-ask="Tenho rosto redondo">Rosto Redondo</button>
        <button type="button" class="ai-pill" data-ask="Tenho rosto quadrado">Rosto Quadrado</button>
        <button type="button" class="ai-pill" data-ask="Quero cuidar da barba">Ritual de Barba</button>
        <button type="button" class="ai-pill" data-ask="Quero o pacote completo para evento">Combo Completo</button>
      </div>

      <div class="ai-chat-input-row">
        <input type="text" id="aiChatInput" class="ai-input" placeholder="Ex: tenho rosto redondo, qual corte indica?" autocomplete="off" />
        <button type="button" id="aiSendBtn" class="ai-send-btn" aria-label="Enviar mensagem">
          <span class="iconify" data-icon="solar:plain-bold"></span>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(widgetContainer);

  const triggerBtn = document.getElementById('aiTriggerBtn');
  const drawer = document.getElementById('aiChatDrawer');
  const closeBtn = document.getElementById('aiCloseBtn');
  const messagesContainer = document.getElementById('aiChatMessages');
  const chatInput = document.getElementById('aiChatInput');
  const sendBtn = document.getElementById('aiSendBtn');

  function toggleDrawer(open) {
    const shouldOpen = open !== undefined ? open : !drawer.classList.contains('active');
    if (shouldOpen) {
      drawer.classList.add('active');
      drawer.setAttribute('aria-hidden', 'false');
      setTimeout(() => chatInput.focus(), 200);
    } else {
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
    }
  }

  triggerBtn.addEventListener('click', () => toggleDrawer());
  closeBtn.addEventListener('click', () => toggleDrawer(false));

  // Adicionar mensagem ao histórico visual de forma segura contra DOM XSS
  function addMessage(sender, content, actionData = null) {
    const msgEl = document.createElement('div');
    msgEl.className = `ai-msg ${sender}`;

    if (sender === 'user') {
      // Entrada do visitante: NUNCA interpreta como HTML (segurança contra DOM XSS)
      msgEl.textContent = content;
    } else {
      // Respostas da automação utilizam templates controlados com formatação
      msgEl.innerHTML = content;
    }

    // Se houver card de ação gerado pela automação
    if (actionData) {
      const actionCard = document.createElement('div');
      actionCard.className = 'ai-action-card';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'ai-action-title';
      titleSpan.textContent = 'Automação de Agendamento';

      const serviceDescP = document.createElement('p');
      serviceDescP.style.cssText = 'font-size:0.75rem; color:var(--color-text-dim); margin:0 0 6px 0;';
      serviceDescP.appendChild(document.createTextNode('Serviço sugerido: '));
      const strongServico = document.createElement('strong');
      strongServico.textContent = actionData.servicoNome || '';
      serviceDescP.appendChild(strongServico);

      const btnsDiv = document.createElement('div');
      btnsDiv.className = 'ai-action-btns';

      const waLink = document.createElement('a');
      waLink.href = actionData.waUrl || '#';
      waLink.target = '_blank';
      waLink.rel = 'noopener noreferrer';
      waLink.className = 'ai-btn-action';
      waLink.innerHTML = '<span class="iconify" data-icon="solar:chat-round-dots-bold"></span><span>Agendar no WhatsApp com Mensagem Pronta</span>';

      const fillBtn = document.createElement('button');
      fillBtn.type = 'button';
      fillBtn.className = 'ai-btn-action secondary';
      fillBtn.setAttribute('data-action-fill', actionData.servicoId || '');
      fillBtn.innerHTML = '<span class="iconify" data-icon="solar:calendar-linear"></span><span>Preencher no Formulário</span>';

      btnsDiv.appendChild(waLink);
      btnsDiv.appendChild(fillBtn);

      actionCard.appendChild(titleSpan);
      actionCard.appendChild(serviceDescP);
      actionCard.appendChild(btnsDiv);

      // Ação: Preencher no Formulário da Página (compatível com home e páginas secundárias)
      actionCard.querySelector('[data-action-fill]').addEventListener('click', (e) => {
        const sId = e.currentTarget.getAttribute('data-action-fill');
        toggleDrawer(false);

        const serviceSelect = document.getElementById('clientService');
        const notesField = document.getElementById('clientNotes');
        const bookingSection = document.getElementById('agendamento');

        // Se o formulário estiver na página atual (Landing Page principal)
        if (serviceSelect && bookingSection) {
          if (sId) {
            serviceSelect.value = sId;
            serviceSelect.dispatchEvent(new Event('change'));
          }

          if (notesField && actionData.perfilDetectado) {
            notesField.value = `Consultoria no site: ${actionData.perfilDetectado}`;
          }

          bookingSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const nameField = document.getElementById('clientName');
            if (nameField) nameField.focus();
          }, 600);
        } else {
          // Se estiver em página secundária (ex: pages/servicos.html, pages/contato.html),
          // salva a recomendação no sessionStorage e redireciona para o formulário na página inicial
          try {
            sessionStorage.setItem('azevedo_pending_service', JSON.stringify({
              serviceId: sId,
              perfilDetectado: actionData.perfilDetectado || ''
            }));
          } catch (_) {}

          const isPagesSubdir = window.location.pathname.includes('/pages/') || window.location.pathname.endsWith('/pages');
          const homeUrl = (isPagesSubdir ? '../index.html' : 'index.html') + '#agendamento';
          window.location.href = homeUrl;
        }
      });

      msgEl.appendChild(actionCard);
    }

    messagesContainer.appendChild(msgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Motor de Recomendação por Regras e Heurística (100% Client-Side)
  function processRecommendation(query) {
    const text = query.toLowerCase();

    // 1. Verificar regras de formato de rosto
    for (const item of visagismoRules.rosto) {
      if (item.keywords.some(k => text.includes(k))) {
        const waMsg = `Olá! Realizei a consultoria no site da Barbearia Azevedo para o meu perfil (Rosto ${item.tipo.toUpperCase()}).\n` +
                      `Gostaria de agendar a recomendação: *${item.servicoNome}*.\n` +
                      `Poderiam me informar a disponibilidade de horário?`;
        return {
          text: `Para o formato de **rosto ${item.tipo}**, nossa recomendação técnica é:<br><br>` +
                `• ${item.recomendacao}<br><br>` +
                `O serviço mais indicado em nosso cardápio é o **${item.servicoNome}**.`,
          action: {
            servicoId: item.servicoId,
            servicoNome: item.servicoNome,
            perfilDetectado: `Rosto ${item.tipo}`,
            waUrl: createWhatsAppUrl(waMsg)
          }
        };
      }
    }

    // 2. Verificar regras de barba
    for (const item of visagismoRules.barba) {
      if (item.keywords.some(k => text.includes(k))) {
        const waMsg = `Olá! Estive no site da Barbearia Azevedo e quero cuidar da minha barba com o serviço: *${item.servicoNome}*.\n` +
                      `Quais os próximos horários disponíveis?`;
        return {
          text: `Para os cuidados com a sua barba, recomendamos:<br><br>` +
                `• ${item.recomendacao}<br><br>` +
                `Serviço sugerido: **${item.servicoNome}**.`,
          action: {
            servicoId: item.servicoId,
            servicoNome: item.servicoNome,
            perfilDetectado: 'Cuidados com a Barba',
            waUrl: createWhatsAppUrl(waMsg)
          }
        };
      }
    }

    // 3. Verificar combos ou eventos
    for (const item of visagismoRules.combos) {
      if (item.keywords.some(k => text.includes(k))) {
        const waMsg = `Olá! Gostaria de agendar o pacote completo na Barbearia Azevedo (*${item.servicoNome}*). Aguardo opções de horários!`;
        return {
          text: `Para uma transformação completa ou ocasião especial:<br><br>` +
                `• ${item.recomendacao}<br><br>` +
                `Serviço sugerido: **${item.servicoNome}**.`,
          action: {
            servicoId: item.servicoId,
            servicoNome: item.servicoNome,
            perfilDetectado: 'Combo Completo / Evento',
            waUrl: createWhatsAppUrl(waMsg)
          }
        };
      }
    }

    // 4. Pergunta sobre horários ou localização
    if (text.includes('horario') || text.includes('horário') || text.includes('onde') || text.includes('endereco') || text.includes('endereço')) {
      return {
        text: `📍 **Localização:** ${businessConfig.address}<br>` +
              `⏰ **Horários:** Segunda a Sexta: 09:00 - 20:00 | Sábado: 09:00 - 18:00 (Domingos e Feriados fechado).<br><br>` +
              `Você pode solicitar um horário pelo formulário na página ou clicar abaixo para conversar com a equipe.`,
        action: {
          servicoId: 'corte-masculino',
          servicoNome: 'Consulta de Horário',
          perfilDetectado: 'Dúvida de Horário',
          waUrl: createWhatsAppUrl('Olá! Gostaria de consultar horários disponíveis na Barbearia Azevedo.')
        }
      };
    }

    // 5. Preços gerais
    if (text.includes('preco') || text.includes('preço') || text.includes('valor') || text.includes('quanto')) {
      return {
        text: `Principais opções do nosso cardápio:<br><br>` +
              `• **Corte Masculino:** R$ 70 (45 min)<br>` +
              `• **Degradê de Precisão:** R$ 80 (50 min)<br>` +
              `• **Barba & Modelagem:** R$ 55 (35 min)<br>` +
              `• **Corte + Barba:** R$ 115 (1h 15min)<br>` +
              `• **Barba com Toalha Quente:** R$ 75 (45 min)<br>` +
              `• **Combo Azevedo:** R$ 150 (1h 30min)`,
        action: {
          servicoId: 'corte-masculino',
          servicoNome: 'Corte Masculino (R$ 70)',
          perfilDetectado: 'Consulta de Valores',
          waUrl: createWhatsAppUrl('Olá! Gostaria de agendar um serviço na Barbearia Azevedo.')
        }
      };
    }

    // Resposta padrão convidativa
    const defaultWa = createWhatsAppUrl('Olá! Gostaria de tirar uma dúvida sobre cortes e serviços na Barbearia Azevedo.');
    return {
      text: `Posso ajudar você a encontrar o corte ideal para seu formato de rosto (redondo, quadrado, oval ou triangular) ou o melhor tratamento para sua barba.<br><br>` +
            `Diga-me como é o seu estilo ou selecione uma das opções rápidas abaixo!`,
      action: {
        servicoId: 'corte-masculino',
        servicoNome: 'Corte Masculino (R$ 70)',
        perfilDetectado: 'Atendimento Geral',
        waUrl: defaultWa
      }
    };
  }

  // Enviar consulta
  function handleSend(customText) {
    const text = customText || chatInput.value.trim();
    if (!text) return;

    addMessage('user', text);
    chatInput.value = '';

    // Efeito sutil de processamento da automação (300ms)
    setTimeout(() => {
      const result = processRecommendation(text);
      addMessage('bot', result.text, result.action);
    }, 300);
  }

  // Pílulas de acesso rápido
  document.querySelectorAll('.ai-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const question = pill.getAttribute('data-ask');
      if (question) handleSend(question);
    });
  });

  sendBtn.addEventListener('click', () => handleSend());
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });
}
