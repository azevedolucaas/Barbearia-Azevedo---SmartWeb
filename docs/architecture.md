# Arquitetura do Projeto — Barbearia Azevedo Corta

## Visão Geral
O projeto da **Barbearia Azevedo Corta** foi desenvolvido seguindo uma arquitetura modular, semântica e orientada a componentes. A separação clara de responsabilidades garante facilidade de manutenção, estabilidade e capacidade de evolução contínua sem acumular débitos técnicos.

---

## 1. Estrutura Modular de CSS
O CSS foi estruturado utilizando metodologia em camadas e separação por responsabilidade funcional:

- **`css/base/`**: Define o reset global universal (`reset.css`), variáveis e Design Tokens (`variables.css`) e regras de escala tipográfica fluida (`typography.css`).
- **`css/layout/`**: Define os contêineres responsivos (`container.css`), grid estrutural (`grid.css`) e rodapé institucional (`footer.css`). (O cabeçalho e menu de navegação foram consolidados em `css/components/navigation.css`).
- **`css/components/`**: Estilos de elementos de interface reutilizáveis (`buttons.css`, `cards.css`, `forms.css`, `modal.css`, `navigation.css` — unificando cabeçalho, gaveta mobile e efeito glassmorphism).
- **`css/sections/`**: Estilização isolada de cada seção da landing page (`hero.css`, `about.css`, `services.css`, `team.css`, `gallery.css`, `testimonials.css`, `contact.css`).
- **`css/utilities/`**: Animações progressivas de scroll reveal (`animations.css`) e classes utilitárias complementares (`utilities.css`).
- **Orquestradores na raiz de `css/`**: `main.css` (ponto central unificado de carregamento), `base.css`, `layout.css`, `components.css` e `responsive.css` (breakpoints de tela).

---

## 2. Estrutura Modular de JavaScript
O JavaScript adota o padrão moderno **ES Modules (`import`/`export`)**:

- **Scripts Principais na raiz de `js/`**:
  - `ai-assistant.js`: Consultor de Visagismo & Automação Inteligente baseado em regras heurísticas locais em JavaScript.
  - `iconify.js`: Biblioteca de ícones vetoriais Solar Icons encapsulada localmente com fallback resiliente para CDN oficial.
- **`js/core/`**:
  - `main.js`: Ponto de inicialização oficial da aplicação no evento `DOMContentLoaded`.
  - `dom.js`: Utilitários de seleção DOM e hidratação de dados cadastrais.
- **`js/components/`**:
  - `navigation.js`: Lógica do menu móvel, gaveta (*drawer*), scroll suave e controle ARIA.
  - `modal.js`: Modal Lightbox acessível para visualização ampliada de fotos da galeria com atalhos de teclado.
  - `carousel.js`: Carrossel de depoimentos com suporte a autoplay, gestos de toque (*swipe*) e teclado.
  - `animations.js`: Revelação progressiva de elementos na rolagem via `IntersectionObserver`.
- **`js/features/`**:
  - `booking.js`: Formulário de agendamento online com validação temporal estrita de datas locais, bloqueio de domingos, geração de protocolo e persistência em `localStorage`.
  - `contact.js`: Validação e tratamento do formulário de contato e dúvidas gerais.
  - `cep.js`: Módulo de consulta de endereço via API pública do ViaCEP.
- **`js/utils/`**:
  - `helpers.js`: Formatadores de texto, telefone, datas e cálculo de horários.
  - `validators.js`: Funções de validação estrita para e-mail, telefone brasileiro e campos obrigatórios.
  - `whatsapp.js`: Gerador central de URLs e construtor de mensagens estruturadas para o WhatsApp.
- **`data/`**:
  - `config.js`: Dados centralizados do negócio (horários, contatos, cardápio de serviços, barbeiros).
  - `services.js`: Export especializado do catálogo de serviços e regras.

---

## 3. Gestão de Assets e Imagens
Todas as imagens do projeto foram categorizadas por finalidade na pasta `images/`:
- `images/hero/`: Foto principal de abertura (`01-hero-barbearia-principal.webp`) e banner de compartilhamento social (`premium_barbershop_hero.png`).
- `images/services/`: Fotos dos procedimentos e rituais de corte e barba (`02` a `05`).
- `images/team/`: Fotos individuais dos profissionais (`06` a `08`) e foto institucional da equipe (`16`).
- `images/interior/`: Fotos do espaço físico, ferramentas e recepção (`09` e `10`).
- `images/gallery/`: Fotos de detalhes de acabamentos e ambiente (`11` a `15`).

Todas as fotografias utilizam o formato otimizado **WebP** com atributo `loading="lazy"` para economia de banda e alto desempenho móvel.

---

## 4. Suíte de Testes Automatizados (`tests/`)
O projeto conta com ferramentas automatizadas para validação contínua da integridade do código:
- `tests/check-css-imports.js`: Script Node.js que percorre recursivamente todas as diretivas `@import` a partir de `css/main.css`, garantindo que não existam arquivos ausentes ou caminhos quebrados.
- `tests/check-js-modules.js`: Script Node.js que valida sintaticamente todos os scripts via `node --check` e resolve estaticamente todas as declarações de importação/exportação entre módulos.
- **`tests/check-html-assets.js`**: Script Node.js que analisa todos os arquivos HTML e verifica a existência física em disco de cada imagem, script e folha de estilo referenciada.
- **`tests/check-gh-pages.js`**: Script Node.js que audita a compatibilidade com GitHub Pages (verificação de caminhos absolutos com barra inicial e sensibilidade a maiúsculas/minúsculas).
- **`tests/test-booking.html`**: Ambiente de testes automatizados in-browser que valida o fluxo de submissão do agendamento, mensagens de erro, persistência em `localStorage` e formatação do protocolo.
