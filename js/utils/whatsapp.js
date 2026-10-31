/**
 * WHATSAPP INTEGRATION - BARBEARIA AZEVEDO
 * Centralized WhatsApp message builder and dynamic link handlers.
 */

import { businessConfig } from '../../data/config.js';

export function getWhatsAppBaseUrl() {
  const number = (businessConfig.whatsappNumber || '').replace(/\D/g, '');
  return number ? `https://wa.me/${number}` : '#';
}

export function createWhatsAppUrl(customMessage) {
  const number = (businessConfig.whatsappNumber || '').replace(/\D/g, '');
  const message = customMessage || `Olá! Gostaria de obter mais informações sobre a ${businessConfig.brandName}.`;
  if (!number) return '#';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildBookingWhatsAppMessage(formData) {
  const lines = [
    `Olá! Gostaria de solicitar um agendamento na ${businessConfig.brandName}.`,
    ``,
    `*Nome:* ${formData.name}`,
    `*Telefone:* ${formData.phone}`,
    formData.email ? `*E-mail:* ${formData.email}` : null,
    `*Serviço:* ${formData.serviceName}`,
    `*Barbeiro:* ${formData.barberName}`,
    `*Data:* ${formData.date}`,
    `*Horário:* ${formData.time}`,
    formData.notes ? `*Observações:* ${formData.notes}` : null,
    ``,
    `*Nota:* Aguardo confirmação de disponibilidade e horário.`
  ].filter(Boolean);

  return lines.join('\n');
}

export function initWhatsApp() {
  // Bind all default WhatsApp CTA buttons
  const defaultLinks = document.querySelectorAll('.js-whatsapp-btn');
  defaultLinks.forEach((btn) => {
    btn.setAttribute('href', createWhatsAppUrl());
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // Floating WhatsApp button
  const floatingBtn = document.querySelector('.floating-whatsapp');
  if (floatingBtn) {
    floatingBtn.setAttribute('href', createWhatsAppUrl());
    floatingBtn.setAttribute('target', '_blank');
    floatingBtn.setAttribute('rel', 'noopener noreferrer');
    floatingBtn.setAttribute('aria-label', 'Falar conosco pelo WhatsApp');
  }
}
