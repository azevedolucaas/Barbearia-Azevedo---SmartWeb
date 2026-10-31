/**
 * DOM UTILITIES & HYDRATION - BARBEARIA AZEVEDO
 * Central helper functions for DOM manipulation and business data hydration.
 */

import { businessConfig } from '../../data/config.js';

export function $(selector, scope = document) {
  return scope.querySelector(selector);
}

export function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export function hydrateBusinessData() {
  if (!businessConfig) return;

  // Address
  if (businessConfig.address) {
    document.querySelectorAll('.js-biz-address').forEach(el => {
      el.textContent = businessConfig.address;
    });
  }

  // WhatsApp Display and Link
  if (businessConfig.whatsappDisplay) {
    document.querySelectorAll('.js-biz-whatsapp').forEach(el => {
      el.textContent = businessConfig.whatsappDisplay;
      if (el.tagName === 'A') {
        const currentHref = el.getAttribute('href') || '';
        if (!currentHref.includes('?text=')) {
          el.href = businessConfig.whatsappUrl || `https://wa.me/${businessConfig.whatsappNumber}`;
        }
      }
    });
  }

  // Hours
  if (businessConfig.hours && businessConfig.hours.length) {
    const formattedHours = businessConfig.hours.map(h => `${h.days}: ${h.time}`).join(' | ');
    document.querySelectorAll('.js-biz-hours').forEach(el => {
      el.textContent = formattedHours;
    });
  }

  // Instagram
  if (businessConfig.instagramHandle) {
    document.querySelectorAll('.js-biz-instagram').forEach(el => {
      if (el.tagName === 'A') {
        el.href = businessConfig.instagramUrl || '#';
      } else {
        el.textContent = `@${businessConfig.instagramHandle}`;
      }
    });
  }
}
