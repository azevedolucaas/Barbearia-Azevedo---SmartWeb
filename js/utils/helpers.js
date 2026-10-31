/**
 * GENERAL HELPERS - BARBEARIA AZEVEDO
 * Reusable utility functions for DOM manipulation, formatting, and smooth scrolling.
 */

export function formatPhone(value) {
  let val = value.replace(/\D/g, '');
  if (val.length > 11) val = val.substring(0, 11);

  if (val.length > 10) {
    return val.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (val.length > 6) {
    return val.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  } else if (val.length > 2) {
    return val.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
  }
  return val;
}

export function formatDateBR(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
}

export function smoothScrollTo(targetSelector, offset = 80) {
  const targetElement = document.querySelector(targetSelector);
  if (!targetElement) return;

  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}
