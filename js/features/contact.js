/**
 * CONTACT FORM FEATURE - BARBEARIA AZEVEDO
 * Validates contact form submission and links with WhatsApp bridge.
 */

import { validateEmail, validateField, validatePhone } from '../utils/validators.js';
import { createWhatsAppUrl } from '../utils/whatsapp.js';
import { formatPhone } from '../utils/helpers.js';

export function initContact() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = contactForm.querySelector('#contactName');
  const phoneInput = contactForm.querySelector('#contactPhone');
  const emailInput = contactForm.querySelector('#contactEmail');
  const messageInput = contactForm.querySelector('#contactMessage');
  const statusAlert = contactForm.querySelector('#contactStatusAlert');

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = formatPhone(e.target.value);
    });
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    if (nameInput && !validateField(nameInput, nameInput.value.trim().length >= 3)) isValid = false;
    if (phoneInput && !validateField(phoneInput, validatePhone(phoneInput.value))) isValid = false;
    if (emailInput && emailInput.value.trim() && !validateField(emailInput, validateEmail(emailInput.value))) isValid = false;
    if (messageInput && !validateField(messageInput, messageInput.value.trim().length >= 5)) isValid = false;

    if (!isValid) {
      if (statusAlert) {
        statusAlert.className = 'form-status-alert active error';
        statusAlert.innerHTML = '<strong>Erro:</strong> Por favor, preencha corretamente os campos destacados.';
      }
      return;
    }

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const msg = messageInput ? messageInput.value.trim() : '';

    const waText = `Olá! Meu nome é ${name} (${phone}). Mensagem: ${msg}`;
    const waUrl = createWhatsAppUrl(waText);

    if (statusAlert) {
      statusAlert.className = 'form-status-alert active success';
      statusAlert.innerHTML = '<strong>Mensagem enviada com sucesso!</strong> Abrindo atendimento no WhatsApp...';
    }

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    contactForm.reset();
  });
}
