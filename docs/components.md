# Guia de Componentes — Barbearia Azevedo Corta

Este documento descreve a biblioteca de componentes reutilizáveis e elementos de interface do projeto.

---

## 1. Botões (`.btn`)
Localização: `css/components/buttons.css`

- **`.btn-primary`**: Botão de ação principal em tom dourado nobre com gradiente sutil e realce luminoso no hover.
- **`.btn-secondary`**: Botão em contorno translúcido dourado com fundo escuro.
- **`.btn-whatsapp`**: Botão temático com verde oficial do WhatsApp para direcionamento imediato.
- **`.btn-block`**: Modificador que expande o botão para 100% da largura do contêiner pai (ideal para mobile).
- **`.btn-sm`**: Versão compacta para cabeçalhos e barras de navegação.

---

## 2. Cards de Serviço (`.service-card`)
Localização: `css/sections/services.css` e `css/components/cards.css`

- **Estrutura**:
  - Imagem do procedimento com proporção visual equilibrada e zoom sutil no hover.
  - Badge de destaque (ex: *Popular*, *Mais Pedido*, *Ritual*).
  - Número de identificação ordinal (ex: `01`, `02`).
  - Título do serviço, descrição detalhada, duração estimada e preço em reais.
  - Botão de atalho `data-select-service` que pré-seleciona o serviço diretamente no formulário de agendamento.

---

## 3. Cards de Barbeiro (`.team-card`)
Localização: `css/sections/team.css`

- **Estrutura**:
  - Foto em alta definição do profissional em tom contrastante com sobreposição de rede social (Instagram).
  - Anos de experiência e cargo do especialista (ex: *Mestre Barbeiro & Visagista*).
  - Breve biografia ressaltando as habilidades principais e assinatura visual.

---

## 4. Modal Lightbox (`#galleryLightbox`)
Localização: `css/components/modal.css` e `js/components/modal.js`

- **Funcionalidades**:
  - Visualização de imagens da galeria em tela cheia com alta resolução.
  - Suporte completo a navegação por teclado (teclas `Esc`, `ArrowLeft`, `ArrowRight`).
  - Acessibilidade ARIA (`aria-hidden="true/false"`, foco automático no botão de fechar e bloqueio de rolagem do fundo).

---

## 5. Carrossel de Depoimentos (`.testimonials-slider-wrap`)
Localização: `css/sections/testimonials.css` e `js/components/carousel.js`

- **Funcionalidades**:
  - Slider responsivo com suporte a gestos de toque (*touch swipe*) em telas de smartphones.
  - Autoplay contínuo com pausa automática ao passar o ponteiro do mouse (*pause-on-hover*) ou focar pelo teclado.
  - Indicadores de paginação interativos em formato de pontos (*dots*).

---

## 6. Consultor Inteligente de Visagismo & Estilo
Localização: `css/components/forms.css` e `js/ai-assistant.js`

- **Estrutura**:
  - **Gatilho Flutuante (`#aiTriggerBtn`):** Botão fixo no canto inferior direito da tela com ícone e badge visual.
  - **Gaveta Lateral (`#aiChatDrawer`):** Painel de conversação acessível com histórico de mensagens (`aria-live="polite"`).
  - **Pílulas de Atalho Rápido (`.ai-pill`):** Botões com perguntas frequentes de formato de rosto e rituais de barba.
  - **Cards de Ação Integrada (`.ai-action-card`):** Renderiza o diagnóstico e fornece botões para "Agendar via WhatsApp" ou "Preencher no Formulário".

---

## 7. Gaveta de Navegação Mobile & Hambúrguer
Localização: `css/components/navigation.css` e `js/components/navigation.js`

- **Estrutura**:
  - **Botão Hambúrguer (`#navHamburger`):** Botão acessível com atributo dinâmico `aria-expanded` e `aria-controls="mobileDrawer"`.
  - **Gaveta de Navegação (`#mobileDrawer`):** Painel móvel que desliza lateralmente no breakpoint mobile, agrupando links de seções, contato e botão de chamada para agendamento.
  - Fechamento inteligente ao clicar em qualquer link interno, ao clicar fora ou ao pressionar a tecla `Escape`.

---

## 8. Card de Status do Agendamento (`#bookingStatusAlert`)
Localização: `css/components/forms.css` e `js/features/booking.js`

- **Estados**:
  - **Erro (`.error`):** Exibe borda vermelha e lista os campos pendentes de preenchimento ou alertas de data inválida.
  - **Sucesso (`.success`):** Apresenta o número de protocolo `#AZV-2026-XXXXXX`, resumo da solicitação e botão para confirmação no WhatsApp. Possui atributo `role="alert"` para leitura imediata por leitores de tela.
