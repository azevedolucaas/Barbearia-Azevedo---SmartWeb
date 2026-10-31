/**
 * CEP AUTO-COMPLETE FEATURE - BARBEARIA AZEVEDO
 * Integration with ViaCEP API for automatic address resolution.
 */

export function initCep() {
  const cepInput = document.getElementById('cepInput');
  const streetInput = document.getElementById('streetInput');
  const neighborhoodInput = document.getElementById('neighborhoodInput');
  const cityInput = document.getElementById('cityInput');
  const ufInput = document.getElementById('ufInput');

  if (!cepInput) return;

  cepInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.substring(0, 8);
    if (val.length > 5) {
      val = val.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
    }
    e.target.value = val;

    const rawCep = val.replace(/\D/g, '');
    if (rawCep.length === 8) {
      lookupCep(rawCep);
    }
  });

  async function lookupCep(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        if (streetInput) streetInput.value = data.logradouro || '';
        if (neighborhoodInput) neighborhoodInput.value = data.bairro || '';
        if (cityInput) cityInput.value = data.localidade || '';
        if (ufInput) ufInput.value = data.uf || '';
      }
    } catch (err) {
      console.warn('ViaCEP Lookup failed:', err);
    }
  }
}
