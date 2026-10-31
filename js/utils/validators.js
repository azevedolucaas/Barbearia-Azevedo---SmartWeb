/**
 * INPUT VALIDATORS - BARBEARIA AZEVEDO
 * Centralized client-side form validation logic.
 */

export function validateEmail(email) {
  if (!email || !email.trim()) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validatePhone(phone) {
  const cleanPhone = (phone || '').replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

export function validateField(inputEl, condition) {
  if (!inputEl) return true;
  if (!condition) {
    inputEl.classList.add('has-error');
    return false;
  } else {
    inputEl.classList.remove('has-error');
    return true;
  }
}

export function clearFieldError(inputEl) {
  if (inputEl) {
    inputEl.classList.remove('has-error');
  }
}
