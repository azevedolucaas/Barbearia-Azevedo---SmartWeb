/**
 * MAIN CONTROLLER - BARBEARIA AZEVEDO CORTA
 * Modular ES-Module initialization entry point.
 */

import { hydrateBusinessData } from './dom.js';
import { initNavigation } from '../components/navigation.js';
import { initAnimations } from '../components/animations.js';
import { initGallery } from '../components/modal.js';
import { initTestimonials } from '../components/carousel.js';
import { initBooking } from '../features/booking.js';
import { initContact } from '../features/contact.js';
import { initCep } from '../features/cep.js';
import { initWhatsApp } from '../utils/whatsapp.js';
import { initAiAssistant } from '../ai-assistant.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    hydrateBusinessData();
    initNavigation();
    initAnimations();
    initGallery();
    initTestimonials();
    initBooking();
    initContact();
    initCep();
    initWhatsApp();
    initAiAssistant();
  } catch (error) {
    console.error('Initialization error in Barbearia Azevedo:', error);
  }
});
