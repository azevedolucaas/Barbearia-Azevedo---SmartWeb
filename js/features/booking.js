/**
 * BOOKING FORM MODULE - BARBEARIA AZEVEDO
 * Robust client-side validation, past date & invalid time blocking,
 * real backend API transmission, local ledger persistence, and WhatsApp bridge.
 */

import { businessConfig } from '../../data/config.js';
import { createWhatsAppUrl, buildBookingWhatsAppMessage } from '../utils/whatsapp.js';
import { validateEmail, validateField, clearFieldError } from '../utils/validators.js';
import { formatPhone } from '../utils/helpers.js';

// Helper: retorna a data no formato YYYY-MM-DD respeitando o fuso horário local do navegador
function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function initBooking() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  // Progressive enhancement: activate custom client-side validation dynamically
  form.noValidate = true;

  const nameInput = form.querySelector('#clientName');
  const phoneInput = form.querySelector('#clientPhone');
  const emailInput = form.querySelector('#clientEmail');
  const serviceSelect = form.querySelector('#clientService');
  const barberSelect = form.querySelector('#clientBarber');
  const dateInput = form.querySelector('#clientDate');
  const timeSelect = form.querySelector('#clientTime');
  const notesInput = form.querySelector('#clientNotes');
  const submitBtn = form.querySelector('#bookingSubmitBtn');
  const statusAlert = document.getElementById('bookingStatusAlert') || form.querySelector('#bookingStatusAlert');

  // 1. Setup Date Picker constraints (today onwards)
  const today = new Date();
  const todayStr = getLocalDateString(today);
  if (dateInput) {
    dateInput.min = todayStr;
  }

  // Helper: check if a date string YYYY-MM-DD is a Sunday
  function isSunday(dateStr) {
    if (!dateStr) return false;
    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3) return false;
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.getDay() === 0;
  }

  // Helper: check if a date string YYYY-MM-DD is a Saturday
  function isSaturday(dateStr) {
    if (!dateStr) return false;
    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3) return false;
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.getDay() === 6;
  }

  // 2. Dynamic Time Slot Filtering based on date and current clock
  function updateAvailableTimeSlots() {
    if (!timeSelect) return;
    const selectedDate = dateInput ? dateInput.value : '';
    if (!selectedDate) return;

    const now = new Date();
    const currentDateStr = getLocalDateString(now);
    const isToday = selectedDate === currentDateStr;
    const isSat = isSaturday(selectedDate);
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    Array.from(timeSelect.options).forEach((opt) => {
      if (!opt.value) return; // ignore placeholder

      let originalText = opt.getAttribute('data-original-label');
      if (!originalText) {
        originalText = opt.textContent.split('(')[0].trim();
        opt.setAttribute('data-original-label', originalText);
      }

      const [optHourStr, optMinStr] = opt.value.split(':');
      const optHour = parseInt(optHourStr, 10);
      const optMin = parseInt(optMinStr, 10);

      let disabled = false;
      let reason = '';

      // If today and time has already passed
      if (isToday) {
        if (optHour < currentHour || (optHour === currentHour && optMin <= currentMinute)) {
          disabled = true;
          reason = 'Horário decorrido hoje';
        }
      }

      // Saturday operating hours end at 18:00
      if (isSat && optHour >= 19) {
        disabled = true;
        reason = 'Fechado aos sábados após 18h';
      }

      opt.disabled = disabled;
      opt.textContent = disabled ? `${originalText} (${reason})` : originalText;
    });

    // If currently selected option became disabled, deselect it
    if (timeSelect.selectedOptions.length > 0 && timeSelect.selectedOptions[0].disabled) {
      timeSelect.value = '';
    }
  }

  // 3. Validation Helpers
  function validateDate() {
    if (!dateInput) return false;
    const val = dateInput.value;
    if (!val) {
      setDateError('Por favor, selecione uma data para o agendamento.');
      return false;
    }
    if (val < todayStr) {
      setDateError('Não é permitido agendar em datas passadas.');
      return false;
    }
    if (isSunday(val)) {
      setDateError('A barbearia não abre aos domingos. Selecione de segunda a sábado.');
      return false;
    }
    clearDateError();
    return true;
  }

  function setDateError(msg) {
    validateField(dateInput, false);
    dateInput.setAttribute('aria-invalid', 'true');
    const errSpan = dateInput.parentElement ? dateInput.parentElement.querySelector('.form-error-msg') : null;
    if (errSpan) {
      errSpan.textContent = msg;
      errSpan.style.display = 'block';
    }
  }

  function clearDateError() {
    validateField(dateInput, true);
    dateInput.removeAttribute('aria-invalid');
    const errSpan = dateInput.parentElement ? dateInput.parentElement.querySelector('.form-error-msg') : null;
    if (errSpan) {
      errSpan.style.display = 'none';
      errSpan.textContent = 'Selecione uma data preferencial.';
    }
  }

  // 4. Input Events & Real-time Validation
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = formatPhone(e.target.value);
    });

    phoneInput.addEventListener('blur', () => {
      const clean = phoneInput.value.replace(/\D/g, '');
      const valid = clean.length >= 10 && clean.length <= 11;
      validateField(phoneInput, valid);
      phoneInput.setAttribute('aria-invalid', valid ? 'false' : 'true');
    });
  }

  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      const valid = nameInput.value.trim().length >= 3;
      validateField(nameInput, valid);
      nameInput.setAttribute('aria-invalid', valid ? 'false' : 'true');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const val = emailInput.value.trim();
      if (val.length > 0) {
        const valid = validateEmail(val);
        validateField(emailInput, valid);
        emailInput.setAttribute('aria-invalid', valid ? 'false' : 'true');
      } else {
        clearFieldError(emailInput);
        emailInput.removeAttribute('aria-invalid');
      }
    });
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      const valid = serviceSelect.value !== '';
      validateField(serviceSelect, valid);
      serviceSelect.setAttribute('aria-invalid', valid ? 'false' : 'true');
    });
  }

  if (dateInput) {
    dateInput.addEventListener('change', () => {
      if (validateDate()) {
        updateAvailableTimeSlots();
      }
    });
  }

  if (timeSelect) {
    timeSelect.addEventListener('change', () => {
      const valid = timeSelect.value !== '';
      validateField(timeSelect, valid);
      timeSelect.setAttribute('aria-invalid', valid ? 'false' : 'true');
    });
  }

  // 5. Populate Service options dynamically from businessConfig if empty
  if (serviceSelect && serviceSelect.options.length <= 1 && businessConfig.services) {
    serviceSelect.innerHTML = '<option value="">Selecione o serviço desejado...</option>';
    businessConfig.services.forEach((s) => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = `${s.name} — ${s.price} (${s.duration})`;
      opt.setAttribute('data-name', s.name);
      serviceSelect.appendChild(opt);
    });
  }

  // 6. Populate Barbers dynamically from businessConfig if empty
  if (barberSelect && barberSelect.options.length <= 1 && businessConfig.barbers) {
    barberSelect.innerHTML = '<option value="">Qualquer profissional disponível</option>';
    businessConfig.barbers.forEach((b) => {
      const opt = document.createElement('option');
      opt.value = b.id;
      opt.textContent = `${b.name} (${b.role})`;
      opt.setAttribute('data-name', b.name);
      barberSelect.appendChild(opt);
    });
  }

  // 7b. Check for pending service selection from Assistant cross-page navigation
  try {
    const pendingRaw = sessionStorage.getItem('azevedo_pending_service');
    if (pendingRaw) {
      const pendingData = JSON.parse(pendingRaw);
      sessionStorage.removeItem('azevedo_pending_service');
      if (serviceSelect && pendingData.serviceId) {
        serviceSelect.value = pendingData.serviceId;
        validateField(serviceSelect, true);
        serviceSelect.dispatchEvent(new Event('change'));
      }
      if (notesInput && pendingData.perfilDetectado) {
        notesInput.value = `Consultoria no site: ${pendingData.perfilDetectado}`;
      }
      setTimeout(() => {
        if (nameInput) nameInput.focus();
      }, 500);
    }
  } catch (_) {}

  // 7. Service Card CTA Integration: Select service & smooth scroll & focus next field
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-select-service]');
    if (trigger) {
      e.preventDefault();
      const serviceId = trigger.getAttribute('data-select-service');
      if (serviceSelect && serviceId) {
        serviceSelect.value = serviceId;
        validateField(serviceSelect, true);
        
        const bookingSection = document.getElementById('agendamento');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            if (barberSelect && !barberSelect.value) {
              barberSelect.focus();
            } else if (nameInput && !nameInput.value) {
              nameInput.focus();
            } else if (dateInput) {
              dateInput.focus();
            }
          }, 600);
        }
      }
    }
  });

  // 8. Form Submission Handling with Real Backend Dispatch & Local Storage
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;

    // Validação dos campos obrigatórios (nome, telefone, serviço, data e horário)
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!validateField(nameInput, nameVal.length >= 3)) {
      nameInput.setAttribute('aria-invalid', 'true');
      isValid = false;
    } else {
      nameInput.removeAttribute('aria-invalid');
    }

    const cleanPhone = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
    const phoneValid = cleanPhone.length >= 10 && cleanPhone.length <= 11;
    if (!validateField(phoneInput, phoneValid)) {
      phoneInput.setAttribute('aria-invalid', 'true');
      isValid = false;
    } else {
      phoneInput.removeAttribute('aria-invalid');
    }

    if (emailInput && emailInput.value.trim().length > 0) {
      if (!validateField(emailInput, validateEmail(emailInput.value.trim()))) {
        emailInput.setAttribute('aria-invalid', 'true');
        isValid = false;
      } else {
        emailInput.removeAttribute('aria-invalid');
      }
    }

    if (!validateField(serviceSelect, serviceSelect && serviceSelect.value !== '')) {
      serviceSelect.setAttribute('aria-invalid', 'true');
      isValid = false;
    } else {
      serviceSelect.removeAttribute('aria-invalid');
    }

    if (!validateDate()) {
      isValid = false;
    }

    if (!validateField(timeSelect, timeSelect && timeSelect.value !== '')) {
      timeSelect.setAttribute('aria-invalid', 'true');
      isValid = false;
    } else {
      timeSelect.removeAttribute('aria-invalid');
    }

    // If validation failed, alert user and focus first faulty input
    if (!isValid) {
      showAlert(
        'error',
        `<div style="display:flex; flex-direction:column; gap:0.4rem;">
           <strong style="color:var(--color-error); font-size:1rem;">Campos Obrigatórios Pendentes</strong>
           <p style="margin:0;">Por favor, verifique os campos destacados em vermelho (nome, telefone com DDD, serviço, data válida e horário disponível).</p>
         </div>`
      );
      const firstError = form.querySelector('.has-error');
      if (firstError) firstError.focus();
      return;
    }

    // Extract human-readable names
    const selectedServiceOpt = serviceSelect.options[serviceSelect.selectedIndex];
    const serviceName = selectedServiceOpt
      ? (selectedServiceOpt.getAttribute('data-name') || selectedServiceOpt.textContent.split('—')[0].trim())
      : serviceSelect.value;

    const selectedBarberOpt = barberSelect && barberSelect.selectedIndex > 0
      ? barberSelect.options[barberSelect.selectedIndex]
      : null;
    const barberName = selectedBarberOpt
      ? (selectedBarberOpt.getAttribute('data-name') || selectedBarberOpt.textContent.split('(')[0].trim())
      : 'Qualquer profissional disponível';

    let formattedDate = dateInput.value;
    if (dateInput.value) {
      const parts = dateInput.value.split('-');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    // Generate Protocol ID
    const protocolCode = `AZV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const bookingPayload = {
      protocolo: protocolCode,
      criadoEm: new Date().toISOString(),
      cliente: {
        nome: nameVal,
        telefone: phoneInput.value.trim(),
        email: emailInput ? emailInput.value.trim() : ''
      },
      servico: {
        id: serviceSelect.value,
        nome: serviceName
      },
      barbeiro: barberName,
      agendamento: {
        data: formattedDate,
        dataIso: dateInput.value,
        horario: timeSelect.value
      },
      observacoes: notesInput ? notesInput.value.trim() : '',
      status: 'Solicitado (Aguardando Confirmação)',
      origem: 'Website Barbearia Azevedo'
    };

    // UI Loading State
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span style="display:inline-block; animation: rotate 1s linear infinite;">⏳</span>
      <span>Enviando solicitação ao sistema...</span>
    `;

    // 1. Save locally in localStorage ledger for persistence & audits
    try {
      const storageKey = businessConfig.booking?.storageKey || 'azevedo_agendamentos';
      const existingLedger = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existingLedger.unshift(bookingPayload);
      localStorage.setItem(storageKey, JSON.stringify(existingLedger));
    } catch (storageErr) {
      console.warn('Falha ao persistir em localStorage:', storageErr);
    }

    // 2. Disparo assíncrono transparente (sem falsas afirmações de envio externo)
    const endpoint = businessConfig.booking?.endpoint || 'https://formsubmit.co/ajax/contato@barbeariaazevedo.com.br';
    let emailStatus = 'não transmitido (modo acadêmico/demonstração)';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Solicitação de Agendamento Azevedo - #${protocolCode}`,
          protocolo: protocolCode,
          cliente_nome: bookingPayload.cliente.nome,
          cliente_telefone: bookingPayload.cliente.telefone,
          cliente_email: bookingPayload.cliente.email || 'Não informado',
          servico: bookingPayload.servico.nome,
          barbeiro: bookingPayload.barbeiro,
          data_agendada: bookingPayload.agendamento.data,
          horario_agendado: bookingPayload.agendamento.horario,
          observacoes: bookingPayload.observacoes || 'Nenhuma',
          origem_requisicao: 'Formulário Web Oficial'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      if (response.ok) {
        emailStatus = 'transmitido para a recepção';
      }
    } catch (netErr) {
      // Bloqueio de CORS esperado no ambiente estático sem backend autenticado
      console.info('Aviso de rede: envio assíncrono por e-mail não confirmado no navegador. Persistência local e WhatsApp mantidos.');
      emailStatus = 'não confirmado (ambiente de demonstração sem caixa postal ativa)';
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHtml;

    // Build WhatsApp direct bridge link
    const waData = {
      name: bookingPayload.cliente.nome,
      phone: bookingPayload.cliente.telefone,
      email: bookingPayload.cliente.email,
      serviceName: bookingPayload.servico.nome,
      barberName: bookingPayload.barbeiro,
      date: bookingPayload.agendamento.data,
      time: bookingPayload.agendamento.horario,
      notes: bookingPayload.observacoes,
      protocol: protocolCode
    };

    const waMsg = `${buildBookingWhatsAppMessage(waData)}\n*Protocolo:* ${protocolCode}`;
    const waUrl = createWhatsAppUrl(waMsg);

    // Constrói o card de feedback seguro utilizando nós DOM e textContent (blindagem contra DOM XSS)
    const successCard = createBookingSuccessCard({
      protocolCode,
      clientName: bookingPayload.cliente.nome,
      serviceName: bookingPayload.servico.nome,
      barberName: bookingPayload.barbeiro,
      date: bookingPayload.agendamento.data,
      time: bookingPayload.agendamento.horario,
      emailStatus,
      waUrl,
      onReset: () => {
        const el = statusAlert || document.getElementById('bookingStatusAlert');
        if (el) {
          el.className = 'form-status-alert';
          el.innerHTML = '';
        }
        form.reset();
        nameInput.focus();
      }
    });

    showAlert('success', successCard);

    // Reset fields while keeping success card visible
    form.reset();
  });

  // Construtor DOM seguro para o card de confirmação de solicitação
  function createBookingSuccessCard({ protocolCode, clientName, serviceName, barberName, date, time, emailStatus, waUrl, onReset }) {
    const card = document.createElement('div');
    card.style.cssText = 'display:flex; flex-direction:column; gap:0.85rem; text-align:left;';

    const header = document.createElement('div');
    header.style.cssText = 'display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; border-bottom:1px solid rgba(200,169,126,0.3); padding-bottom:0.6rem;';

    const headerLeft = document.createElement('div');
    headerLeft.style.cssText = 'display:flex; align-items:center; gap:8px;';
    const iconSpan = document.createElement('span');
    iconSpan.style.fontSize = '1.3rem';
    iconSpan.textContent = '📋';
    const titleStrong = document.createElement('strong');
    titleStrong.style.cssText = 'font-size:1.1rem; color:var(--color-accent); letter-spacing:0.04em;';
    titleStrong.textContent = 'SOLICITAÇÃO DE AGENDAMENTO REGISTRADA';
    headerLeft.appendChild(iconSpan);
    headerLeft.appendChild(titleStrong);

    const badgeSpan = document.createElement('span');
    badgeSpan.style.cssText = 'background:var(--color-accent); color:#000; font-size:0.75rem; font-weight:700; padding:3px 8px; border-radius:4px; letter-spacing:0.08em;';
    badgeSpan.textContent = `PROTOCOLO #${protocolCode}`;

    header.appendChild(headerLeft);
    header.appendChild(badgeSpan);
    card.appendChild(header);

    const greetingDiv = document.createElement('div');
    greetingDiv.style.cssText = 'font-size:0.92rem; color:var(--color-text-dim); line-height:1.6;';

    const greetingP = document.createElement('p');
    greetingP.style.margin = '0 0 0.5rem 0';
    greetingP.appendChild(document.createTextNode('Olá '));
    const strongName = document.createElement('strong');
    strongName.textContent = clientName;
    greetingP.appendChild(strongName);
    greetingP.appendChild(document.createTextNode(', sua solicitação de horário foi pré-registrada com sucesso.'));
    greetingDiv.appendChild(greetingP);

    const summaryList = document.createElement('ul');
    summaryList.style.cssText = 'list-style:none; padding:0; margin:0.5rem 0; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.4rem; font-size:0.88rem; background:rgba(0,0,0,0.25); padding:0.75rem; border-radius:4px;';

    const items = [
      { label: 'Serviço:', value: serviceName },
      { label: 'Barbeiro:', value: barberName },
      { label: 'Data solicitada:', value: date },
      { label: 'Horário solicitado:', value: time }
    ];

    items.forEach(it => {
      const li = document.createElement('li');
      const st = document.createElement('strong');
      st.textContent = it.label + ' ';
      li.appendChild(st);
      li.appendChild(document.createTextNode(it.value));
      summaryList.appendChild(li);
    });
    greetingDiv.appendChild(summaryList);
    card.appendChild(greetingDiv);

    const auditBox = document.createElement('div');
    auditBox.style.cssText = 'display:flex; flex-direction:column; gap:0.35rem; font-size:0.82rem; background:rgba(255,255,255,0.03); border:1px solid var(--color-border); padding:0.65rem 0.85rem; border-radius:4px;';

    const line1 = document.createElement('div');
    const st1 = document.createElement('strong');
    st1.textContent = '💾 Registro local: ';
    line1.appendChild(st1);
    line1.appendChild(document.createTextNode('Gravado no histórico deste navegador.'));

    const line2 = document.createElement('div');
    const st2 = document.createElement('strong');
    st2.textContent = '📧 Envio por e-mail: ';
    line2.appendChild(st2);
    line2.appendChild(document.createTextNode(emailStatus + '.'));

    const line3 = document.createElement('div');
    const st3 = document.createElement('strong');
    st3.textContent = '⏳ Status da cadeira: ';
    line3.appendChild(st3);
    line3.appendChild(document.createTextNode('Aguardando confirmação da equipe.'));

    auditBox.appendChild(line1);
    auditBox.appendChild(line2);
    auditBox.appendChild(line3);
    card.appendChild(auditBox);

    const noticeBox = document.createElement('div');
    noticeBox.style.cssText = 'background:rgba(200,169,126,0.08); border-left:3px solid var(--color-accent); padding:0.65rem 0.9rem; font-size:0.85rem; color:var(--color-text-dim);';
    const noticeSt = document.createElement('strong');
    noticeSt.textContent = 'Atenção: ';
    noticeBox.appendChild(noticeSt);
    noticeBox.appendChild(document.createTextNode('A geração deste protocolo não garante o agendamento como confirmado. Trata-se de uma solicitação de reserva. Para confirmar a disponibilidade e garantir sua cadeira, envie agora os dados para a recepção pelo WhatsApp.'));
    card.appendChild(noticeBox);

    const actionsRow = document.createElement('div');
    actionsRow.style.cssText = 'display:flex; flex-wrap:wrap; gap:0.6rem; align-items:center; margin-top:0.4rem;';

    const waBtn = document.createElement('a');
    waBtn.href = waUrl;
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.className = 'btn btn-whatsapp btn-sm';
    waBtn.style.cssText = 'display:inline-flex; align-items:center; gap:6px;';
    waBtn.innerHTML = '<span class="iconify" data-icon="solar:chat-round-dots-bold"></span><span>Confirmar Vaga via WhatsApp</span>';

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn btn-secondary btn-sm';
    resetBtn.id = 'btnResetBookingForm';
    resetBtn.style.cssText = 'font-size:0.8rem; padding:6px 12px;';
    resetBtn.textContent = 'Nova Solicitação';
    if (typeof onReset === 'function') {
      resetBtn.addEventListener('click', onReset);
    }

    actionsRow.appendChild(waBtn);
    actionsRow.appendChild(resetBtn);
    card.appendChild(actionsRow);

    return card;
  }

  function showAlert(type, content) {
    const el = statusAlert || document.getElementById('bookingStatusAlert');
    if (!el) return;
    el.className = `form-status-alert active ${type}`;
    el.innerHTML = '';
    if (typeof content === 'string') {
      // Usado apenas para mensagens estáticas internas de erro controladas pelo código
      el.innerHTML = content;
    } else if (content instanceof Node) {
      // Usado para o card de sucesso gerado de forma segura via DOM
      el.appendChild(content);
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
