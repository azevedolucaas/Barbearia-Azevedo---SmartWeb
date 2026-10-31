# 💈 Barbearia Azevedo Corta — Smart Web Experience
> **Projeto de Conclusão de Disciplina — UniFECAF**  
> **Tema:** *Smart Web Experience: Criando uma Experiência Digital com No-Code, Padrões Web e IA*  
> **Autor:** Lucas Azevedo  
> **Ano:** 2026  
> **Links dos Entregáveis Acadêmicos:**
> * **1. Relatório Teórico (Análise e Discussão):** Concluído ([`docs/parte-teorica.md`](docs/parte-teorica.md) | Versão em PDF: [`docs/parte-teorica.pdf`](docs/parte-teorica.pdf))
> * **2. Repositório GitHub:** `Pendente de criação pelo estudante`
> * **3. Link Público da Aplicação:** `Pendente de publicação no GitHub Pages`
> * **4. Vídeo Pitch (até 4 minutos):** `Pendente de gravação (conforme diretrizes do PDF oficial)`

---

## 📌 Guia Rápido para a Banca Avaliadora

> [!IMPORTANT]
> **Pacote de Arquivos Completo e Otimizado:**  
> A aplicação foi estruturada seguindo arquitetura modular estrita, limpa e padronizada: `css/`, `js/`, `images/`, `pages/`, `data/`, `docs/` e `tests/`. Todos os arquivos redundantes foram eliminados após auditoria e testes automatizados. Todos os caminhos relativos funcionam imediatamente tanto em servidor local quanto em serviços de hospedagem estática (GitHub Pages / Vercel).

---

## 1. Problema Identificado e Público-Alvo

### 1.1 O Problema
Pequenas empresas tradicionais de serviços — com foco na **Barbearia Azevedo Corta** localizada no bairro do **Méier, Rio de Janeiro - RJ** — enfrentam desafios críticos em sua operação comercial digital:
* **Dependência exclusiva de redes sociais:** Informações dispersas no feed do Instagram, gerando atrito para o cliente encontrar cardápio, técnicas e valores.
* **Sobrecarga no atendimento manual:** Barbeiros interrompendo procedimentos em andamento para responder dúvidas recorrentes no WhatsApp sobre preços e localização.
* **Agendamentos conflitantes ou inviáveis:** Solicitações para domingos (dias em que o estabelecimento está fechado) ou marcações para horários já decorridos.
* **Perda de clientes:** Ausência de um canal centralizado que combine credibilidade visual, transparência de valores e recomendação de estilo.

### 1.2 O Público-Alvo
Homens contemporâneos (jovens e adultos profissionais) da Zona Norte do Rio de Janeiro que valorizam os cuidados com a autoimagem (corte, barba, visagismo), mas priorizam pontualidade, agilidade e autonomia para avaliar preços e solicitar agendamentos via smartphone ou desktop, sem espera telefônica.

---

## 2. A Solução Desenvolvida e Decisões Arquiteturais

A solução desenvolvida é uma **plataforma web moderna, acessível e responsiva** estruturada em duas camadas complementares:

1. **`index.html` (Landing Page Principal Integrada):**  
   Centraliza toda a jornada de conversão do cliente em uma navegação fluida por seções âncora (`#inicio`, `#historia`, `#servicos`, `#galeria`, `#barbeiros`, `#agendamento`, `#instagram`, `#contato`). Essa abordagem foi escolhida para proporcionar a melhor taxa de conversão em dispositivos móveis, sem recarregamentos lentos de página.
2. **Diretório `pages/` (Páginas Modulares e Documentos Legais):**  
   Contém as versões dedicadas para navegação independente ([`pages/sobre.html`](pages/sobre.html), [`pages/servicos.html`](pages/servicos.html), [`pages/equipe.html`](pages/equipe.html), [`pages/contato.html`](pages/contato.html)) e as páginas essenciais de conformidade com a LGPD e termos contratuais ([`pages/privacidade.html`](pages/privacidade.html) e [`pages/termos.html`](pages/termos.html)).

---

## 3. Estrutura Completa de Pastas e Arquivos

A árvore de diretórios do projeto reflete fielmente a organização limpa e modular da aplicação:

```text
barbearia-azevedo/
├── index.html                  # Landing Page principal integrada (HTML5 Semântico)
├── .nojekyll                   # Instrução para GitHub Pages ignorar compilação Jekyll
├── README.md                   # Documentação técnica e guia de avaliação
├── css/                        # Arquitetura CSS Modular (separação em camadas de responsabilidade)
│   ├── base/                   # Reset global, Design Tokens e Tipografia
│   │   ├── reset.css
│   │   ├── typography.css
│   │   └── variables.css
│   ├── components/             # Componentes de interface reutilizáveis
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── forms.css
│   │   ├── modal.css
│   │   └── navigation.css      # Barra de navegação e gaveta móvel unificadas
│   ├── layout/                 # Estruturas de grid, container e rodapé
│   │   ├── container.css
│   │   ├── grid.css
│   │   └── footer.css
│   ├── sections/               # Estilos dedicados a cada seção da landing page
│   │   ├── about.css
│   │   ├── contact.css
│   │   ├── gallery.css
│   │   ├── hero.css
│   │   ├── services.css
│   │   ├── team.css
│   │   └── testimonials.css
│   ├── utilities/              # Classes utilitárias e animações com ScrollReveal
│   │   ├── animations.css
│   │   └── utilities.css
│   ├── base.css                # Orquestrador da camada base
│   ├── components.css          # Orquestrador da camada de componentes
│   ├── layout.css              # Orquestrador da camada de layout
│   ├── main.css                # Ponto de entrada modular unificado
│   └── responsive.css          # Breakpoints e adaptações mobile/tablet
├── data/                       # Configurações e catálogo de dados
│   ├── config.js               # Central de dados da empresa (horários, endereço Méier, contatos)
│   └── services.js             # Catálogo de serviços e regras
├── docs/                       # Documentação técnica de apoio e evidências
│   ├── evidencias/             # Capturas de tela responsivas, testes e índices
│   │   ├── 01-desktop-1920x1080.png
│   │   ├── 02-notebook-1366x768.png
│   │   ├── 03-tablet-768x1024.png
│   │   ├── 04-celular-390x844.png
│   │   ├── 05-celular-menu-aberto-390x844.png
│   │   ├── 06-galeria-modal-lightbox.png
│   │   ├── 07-assistente-visagismo.png
│   │   ├── 08-agendamento-validacao-protocolo.png
│   │   ├── auditoria-final.md
│   │   ├── README.md
│   │   └── relatorio-acessibilidade-responsividade.md
│   ├── architecture.md         # Documento de arquitetura de software
│   ├── components.md           # Guia de componentes
│   ├── guia-apresentacao.md    # 💡 Guia didático para compreensão e apresentação (Estudante Iniciante)
│   ├── images.md               # Catálogo de imagens e dimensões
│   ├── maintenance.md          # Guia de manutenção
│   ├── parte-teorica.md        # Documentação teórica acadêmica dos 6 pontos oficiais
│   ├── parte-teorica.html      # Versão formatada em HTML para impressão acadêmica
│   ├── parte-teorica.pdf       # 📄 Documento oficial em PDF pronto para entrega na UniFECAF
│   ├── relatorio-etapa-14.md   # Relatório de homologação e organização final
│   ├── roteiro-video-pitch.md  # 🎬 Roteiro cronometrado para o vídeo pitch de 4 minutos
│   └── TRABALHO - Padroes Web para No Code e Low Code.pdf # Diretrizes oficiais UniFECAF
├── images/                     # Ativos visuais únicos categorizados por contexto (WebP otimizado)
│   ├── gallery/                # Fotos da galeria e acabamentos (11 a 15)
│   ├── hero/                   # Imagem principal (01-hero) e banner de compartilhamento OG
│   ├── interior/               # Fotos do lounge e ferramentas (09 e 10)
│   ├── services/               # Fotos dos serviços (02 a 05)
│   └── team/                   # Fotos dos barbeiros especialistas (06 a 08, 16)
├── js/                         # Scripts ES6+ organizados por domínio e responsabilidade
│   ├── ai-assistant.js         # Consultor de Visagismo & Automação Inteligente (Regras Heurísticas)
│   ├── iconify.js              # Biblioteca local Solar Icons (MIT)
│   ├── core/                   # Orquestração e hidratação do DOM
│   │   ├── dom.js
│   │   └── main.js             # Ponto de entrada modular oficial da aplicação
│   ├── components/             # Controladores de componentes interativos
│   │   ├── animations.js       # Revelação progressiva via IntersectionObserver
│   │   ├── carousel.js         # Carrossel de depoimentos (autoplay, swipe, teclado)
│   │   ├── modal.js            # Modal Lightbox da galeria (acessibilidade, teclado)
│   │   └── navigation.js       # Menu mobile com drawer acessível e scroll suave
│   ├── features/               # Lógicas de negócio e fluxos de usuário
│   │   ├── booking.js          # Agendamento, validação temporal de datas, protocolo e WhatsApp
│   │   ├── cep.js              # Módulo auxiliar de integração com API ViaCEP
│   │   └── contact.js          # Validação e processamento do formulário de contato
│   └── utils/                  # Utilitários de apoio
│       ├── helpers.js          # Máscaras de formulário e cálculos de horário
│       ├── validators.js       # Validação estrita de e-mails, telefones e campos
│       └── whatsapp.js         # Montador de URLs de WhatsApp (wa.me) e payloads formatados
├── pages/                      # Páginas modulares dedicadas e documentos legais
│   ├── contato.html
│   ├── equipe.html
│   ├── servicos.html
│   ├── sobre.html
│   ├── privacidade.html        # Política de Privacidade (Conformidade com a LGPD)
│   └── termos.html             # Termos de Serviço e Política de Agendamento/Tolerância
└── tests/                      # Suíte de testes automatizados e verificação de integridade
    ├── audit-security.js       # Varredura estática de credenciais, segredos, caminhos locais e links
    ├── check-css-imports.js    # Verificador recursivo da árvore de imports CSS
    ├── check-gh-pages.js       # Verificador de compatibilidade com GitHub Pages (caminhos e case)
    ├── check-html-assets.js    # Verificador físico de resolução de ativos locais
    ├── check-js-modules.js     # Verificador sintático e resolutor de módulos ES6
    ├── server.js               # Servidor estático seguro Node.js (Anti-Path Traversal / Loopback)
    ├── test-booking.html       # Suíte de testes automatizados in-browser para o agendamento
    └── test-server-security.js # Teste de estresse contra Path Traversal via sockets TCP
```

---

## 4. Tecnologias e Ferramentas Utilizadas (Papéis Técnicos Distintos)

| Tecnologia / Ferramenta | Papel Real no Ciclo de Vida do Projeto | Justificativa e Evidência Comprobatória |
| :--- | :--- | :--- |
| **Aura.build** | Prototipação e Wireframing Visual Inicial (No-Code/AI) | Plataforma de geração visual assistida por IA utilizada na concepção inicial (*barbershop-landing-51.aura.build.zip*, 33,1 MB, MD5: `29B8114C7058290D4DDE79D9BD46516D`). |
| **Antigravity** (Google DeepMind) | Ambiente de Desenvolvimento Assistido por IA (IDE / Agentic) | Utilizado no fluxo de programação em par com IA para refatoração de código, modularização, bateria de testes automatizados e documentação técnica. |
| **HTML5 Semântico** | Estrutura de conteúdo em Padrões Abertos | Acessibilidade nativa, hierarquia clara (`<header>`, `<main>`, `<section>`, `<article>`), atributos ARIA e tags OpenGraph/SEO. |
| **CSS3 Modular & Tokens** | Design System e Estilo em Camadas | Variáveis CSS personalizadas (`--color-accent`, `--font-display`), Flexbox, CSS Grid bidimensional e respeito a `prefers-reduced-motion`. |
| **JavaScript (ES6+ Modules)** | Lógica de negócio e automações nativas | Código nativo sem frameworks pesados, manipulação limpa do DOM, validações temporais e persistência em `localStorage`. |
| **Solar Icons / Iconify** | Iconografia vetorial leve | Biblioteca local incluída (`js/iconify.js`) com contingência automática para CDN oficial. |
| **FormSubmit (Low-Code)** | Endpoint de formulário | Serviço de webhook de processamento de formulários sem custo de servidor backend dedicado. |
| **ViaCEP (API REST)** | Integração de CEP | API pública aberta para resolução de dados de endereço por CEP. |

---

## 5. Funcionalidades Efetivamente Implementadas

1. **Catálogo Completo de Serviços:** Apresentação em cards com preço, duração e botão de seleção rápida que preenche o agendamento.
2. **Formulário de Agendamento com Validação Temporal:**
   * Bloqueio preventivo de datas anteriores ao dia atual (calculado pelo fuso local do cliente via `getLocalDateString()`).
   * Bloqueio estrito de domingos com aviso contextual.
   * Desativação seletiva de horários já decorridos quando a data selecionada for o dia corrente.
   * Geração de protocolo único de solicitação `#AZV-2026-XXXXXX`.
   * Persistência em `localStorage` sob a chave `azevedo_agendamentos`.
   * Geração de link formatado para abertura e confirmação no WhatsApp com todos os dados preenchidos.
3. **Galeria Editorial com Lightbox Acessível:** Visualização em tela cheia com atalhos de teclado (`Escape`, `ArrowLeft`, `ArrowRight`).
4. **Carrossel de Depoimentos:** Transição suave com suporte a gestos de toque (*touch swipe*), autoplay e pausa ao passar o mouse.
5. **Navegação Responsiva e Menu Mobile:** Header fixo com efeito *glassmorphism* e gaveta móvel com controle ARIA.
6. **Páginas Legais:** Política de Privacidade (LGPD) e Termos de Uso com navegação consistente.

---

## 6. Consultor Inteligente de Visagismo & Estilo (Regras Heurísticas)

* **Arquivo:** [`js/ai-assistant.js`](js/ai-assistant.js)
* **Arquitetura Técnica:** Trata-se de uma **automação baseada em regras heurísticas de negócio e visagismo masculino** executada integralmente no navegador do cliente (*client-side*). **Não utiliza chamadas a modelos de IA generativa em nuvem (LLM)**, eliminando custos com tokens, reduzindo a latência a zero e garantindo privacidade total.
* **Como Funciona:**
  1. O usuário abre o assistente pelo botão flutuante no canto inferior direito (`#aiTriggerBtn`).
  2. Escolhe um atalho rápido (*Rosto Redondo*, *Rosto Quadrado*, *Ritual de Barba*, *Combo Completo*) ou digita sua dúvida.
  3. O algoritmo cruza o formato anatômico do rosto e a necessidade informada com a base técnica de cortes da barbearia.
  4. Exibe a recomendação técnica detalhada (ex.: degradê *Skin Fade* para suavizar bochechas em rosto redondo).
  5. Oferece ação direta:
     * **"Preencher no Formulário":** Rola até o agendamento e seleciona o serviço sugerido. Em páginas secundárias, redireciona para `index.html#agendamento` persistindo a seleção via `sessionStorage`.
     * **"Agendar no WhatsApp com Mensagem Pronta":** Gera o link direto para o WhatsApp oficial com a mensagem pré-formatada.

---

## 7. Limitações Conhecidas

1. **Envio de E-mail via FormSubmit em Ambiente Local:**
   * Requisições assíncronas do tipo `fetch` disparadas de ambientes locais (`http://localhost` ou `file://`) para o endpoint FormSubmit encontram bloqueio de política de CORS do navegador.
   * Por esse motivo, a aplicação registra a solicitação no `localStorage`, emite o protocolo `#AZV-2026-XXXXXX` e instrui o cliente a abrir o WhatsApp oficial para a confirmação definitiva, tratando o envio de e-mail como não confirmado em ambiente local.
2. **Confirmação Concorrente de Horários:**
   * A aplicação não utiliza banco de dados centralizado com bloqueio de concorrência em tempo real. O protocolo gerado comprova a solicitação do cliente, sendo a confirmação final da vaga realizada humanamente pela equipe da barbearia via WhatsApp.
3. **Módulo de CEP como Demonstração:**
   * O módulo `js/features/cep.js` está programado e funcional para a API ViaCEP, mas a interface HTML atual não solicita CEP residencial (os atendimentos ocorrem na loja física).

---

## 8. Relação das Evidências Disponíveis

Todas as capturas de tela e relatórios de auditoria técnica encontram-se na pasta [`docs/evidencias/`](docs/evidencias/):

| Arquivo de Evidência | Resolução / Tipo | Descrição do Teste |
| :--- | :---: | :--- |
| [`01-desktop-1920x1080.png`](docs/evidencias/01-desktop-1920x1080.png) | 1920 × 1080 px | Layout amplo em 3 colunas, cabeçalho completo e hero visual. |
| [`02-notebook-1366x768.png`](docs/evidencias/02-notebook-1366x768.png) | 1366 × 768 px | Adaptação em tela de notebook padrão com tipografia fluida. |
| [`03-tablet-768x1024.png`](docs/evidencias/03-tablet-768x1024.png) | 768 × 1024 px | Adaptação em grade de 2 colunas e transição para menu hambúrguer. |
| [`04-celular-390x844.png`](docs/evidencias/04-celular-390x844.png) | 390 × 844 px | Layout vertical em coluna única com botões de toque confortável. |
| [`05-celular-menu-aberto-390x844.png`](docs/evidencias/05-celular-menu-aberto-390x844.png) | 390 × 844 px | Gaveta móvel de navegação aberta com controle de acessibilidade ARIA. |
| [`06-galeria-modal-lightbox.png`](docs/evidencias/06-galeria-modal-lightbox.png) | 1920 × 1080 px | Modal Lightbox da galeria aberto em tela cheia com legenda descritiva. |
| [`07-assistente-visagismo.png`](docs/evidencias/07-assistente-visagismo.png) | 1920 × 1080 px | Chat lateral do Consultor de Visagismo com histórico e card de recomendação. |
| [`08-agendamento-validacao-protocolo.png`](docs/evidencias/08-agendamento-validacao-protocolo.png) | 1920 × 1080 px | Card de sucesso com protocolo `#AZV-2026-XXXXXX` e botão de confirmação via WhatsApp. |
| [`auditoria-final.md`](docs/evidencias/auditoria-final.md) | Relatório Técnico | Inventário de imagens, correção de headings e status de funcionalidades. |
| [`relatorio-acessibilidade-responsividade.md`](docs/evidencias/relatorio-acessibilidade-responsividade.md) | Relatório WCAG | Auditoria de contraste (17.5:1), rótulos, foco visível e teclado. |
| [`README.md`](docs/evidencias/README.md) | Índice de Evidências | Mapeamento oficial dos requisitos, provas e limitações. |

---

## 9. Como Abrir o Projeto Localmente e Executar os Testes

### 9.1 Como Abrir a Aplicação no seu Computador

Você tem duas opções simples para visualizar e testar o projeto localmente:

* **Opção 1 (A mais simples — Direto no Navegador):**  
  Basta dar dois cliques no arquivo `index.html` ou abri-lo pelo seu navegador favorito (Google Chrome, Edge, Firefox ou Safari). Todas as seções, imagens e estilos carregarão perfeitamente. Se você usa o VS Code, também pode clicar com o botão direito em `index.html` e selecionar *"Open with Live Server"*.
* **Opção 2 (Recomendada — Servidor Local Seguro incluído no projeto):**  
  O projeto vem com um servidor HTTP leve e seguro em Node.js (`tests/server.js`). Ele foi blindado nas Etapas 11 e 12 com proteções contra *Path Traversal* e escuta exclusivamente no seu próprio computador (`127.0.0.1`).
  1. Abra o terminal na pasta do projeto.
  2. Digite:
     ```bash
     node tests/server.js
     ```
  3. Abra seu navegador e acesse: `http://127.0.0.1:5176`

---

### 9.2 Suíte Completa de Testes Automatizados

Para garantir que o código está 100% correto, você pode rodar os seguintes comandos no terminal:

| Comando | O que ele testa? | Resultado Esperado |
| :--- | :--- | :---: |
| `node tests/check-css-imports.js` | Varre a árvore dos 24 arquivos CSS e confirma se nenhum import está quebrado. | `ALL CSS IMPORTS VALID ✅` |
| `node tests/check-js-modules.js` | Analisa a sintaxe de todos os 16 scripts JS e a resolução dos ES Modules. | `ALL JS CHECKS PASSED ✅` |
| `node tests/check-html-assets.js` | Confere se todas as 146 imagens e links do HTML existem fisicamente no disco. | `ALL ASSETS RESOLVED ON DISK ✅` |
| `node tests/check-gh-pages.js` | Verifica se há caminhos incompatíveis com o Linux ou com o GitHub Pages. | `100% GITHUB PAGES COMPATIBLE ✅` |
| `node tests/audit-security.js` | Varre o projeto em busca de senhas, chaves, dados pessoais e caminhos do Windows. | `APROVADO COM EVIDÊNCIAS ✅` |
| `node tests/test-server-security.js` | Dispara 13 ataques de teste contra o servidor local para provar que está protegido. | `13/13 test cases passed ✅` |

### 9.3 Teste Visual Automatizado do Formulário de Agendamento
Com o servidor rodando (`node tests/server.js`), abra no navegador:
`http://127.0.0.1:5176/tests/test-booking.html`  
A página executará automaticamente 3 testes em tempo real na tela:
1. Bloqueio de envio com campos vazios.
2. Preenchimento de dados válidos e geração do protocolo `#AZV-2026-XXXXXX`.
3. Gravação com sucesso no `localStorage`.

---

## 10. Informações Comerciais do Negócio (Cenário Acadêmico Demonstrativo — Méier, RJ)

> [!NOTE]
> **Natureza dos Dados Comerciais:**  
> O estabelecimento e os dados apresentados abaixo (endereço no Méier, telefone com DDD 21 e e-mail) compõem o **cenário de simulação comercial de alta fidelidade** desenvolvido para a aplicação prática do trabalho acadêmico da UniFECAF, permitindo testar a experiência do usuário de ponta a ponta sem expor dados privados sensíveis.

| Dado | Informação Cadastrada | Observação |
| :--- | :--- | :--- |
| **Nome Fantasia** | Barbearia Azevedo Corta | Marca do projeto |
| **Endereço Completo** | Rua Dias da Cruz, 142 - Méier, Rio de Janeiro - RJ, CEP 20720-012 | Unidade Méier (DDD 21) |
| **WhatsApp Oficial** | (21) 97242-8922 | Canal oficial de atendimento e agendamento (https://wa.me/5521972428922) |
| **Telefone Fixo** | (21) 3333-3333 | Atendimento recepção |
| **E-mail de Contato** | contato@barbeariaazevedo.com.br | Destino do webhook |
| **Horários de Atendimento** | Seg a Sex: 09:00 - 20:00 \| Sáb: 09:00 - 18:00 \| Dom e Feriados: Fechado | Validados no formulário |

---

## 11. Roteiro Oficial para o Vídeo Pitch (Até 4 Minutos)

Para gravar o seu vídeo pitch com facilidade, consulte o documento dedicado e detalhado:
👉 **[`docs/roteiro-video-pitch.md`](docs/roteiro-video-pitch.md)**

### Divisão de Tempo Recomendada:
* **0:00 – 0:30 | Apresentação Pessoal e Tema:**  
  Apresente-se (Lucas Azevedo), informe o curso e a disciplina da UniFECAF e introduza o projeto da Barbearia Azevedo no Méier.
* **0:30 – 1:00 | Problema e Concepção Inicial no Aura.build:**  
  Explique a dor do cliente (WhatsApp sobrecarregado, horários em domingo) e mencione com honestidade que a prototipação inicial nasceu no **Aura.build**, sendo depois refatorada para padrões web abertos.
* **1:00 – 2:30 | Demonstração Prática do Site:**  
  Mostre a responsividade (F12 no celular), abra o Consultor Inteligente de Visagismo (*Rosto Redondo*) e faça um agendamento demonstrativo gerando o protocolo único `#AZV-2026-XXXXXX`.
* **2:30 – 3:20 | Tecnologias e Padrões Web:**  
  Abra rapidamente o editor de código e o terminal rodando os testes (`node tests/check-gh-pages.js`), destacando CSS modular, ES Modules e segurança contra DOM XSS.
* **3:20 – 4:00 | Conclusão e Aprendizados:**  
  Conclua com os aprendizados da disciplina e agradeça à banca avaliadora da UniFECAF.

---

## 12. Passo a Passo Didático para Publicação Manual no GitHub e GitHub Pages

Conforme solicitado, você mesmo realizará a publicação manual na sua conta pessoal do GitHub. Um guia completo e minucioso de 11 passos com explicações detalhadas, saídas de tela esperadas e solução de dúvidas está disponível em:  
👉 **[`docs/guia-publicacao-github.md`](docs/guia-publicacao-github.md)**

### Resumo Rápido dos Comandos:

```bash
# 1. Confere a saúde do projeto para o GitHub Pages:
node tests/check-gh-pages.js

# 2. Adiciona os arquivos legítimos ao Git (o .gitignore já protege backups e logs):
git add .

# 3. Cria o commit oficial:
git commit -m "feat: entrega oficial do trabalho Barbearia Azevedo Corta (UniFECAF)"

# 4. Garante a branch principal:
git branch -M main

# 5. Conecta ao seu repositório no GitHub (substitua SEU_USUARIO):
git remote add origin https://github.com/SEU_USUARIO/barbearia-azevedo.git

# 6. Envia os arquivos:
git push -u origin main
```
Em seguida, ative o GitHub Pages no GitHub em **Settings > Pages > Branch main / (root) > Save**. O site ficará no ar em: `https://SEU_USUARIO.github.io/barbearia-azevedo/`.

---

## 13. Guias de Apoio Criados Especialmente para Você

| Documento | Para que serve? |
| :--- | :--- |
| **[`docs/guia-publicacao-github.md`](docs/guia-publicacao-github.md)** | Guia prático minucioso de 11 passos para você publicar no GitHub e ativar o GitHub Pages com segurança. |
| **[`docs/roteiro-video-pitch.md`](docs/roteiro-video-pitch.md)** | Roteiro cronometrado (5 blocos, 4 minutos) para você gravar o vídeo pitch com total tranquilidade. |
| **[`docs/parte-teorica.md`](docs/parte-teorica.md)** | Relatório acadêmico completo cobrindo todos os 6 pontos exigidos pela UniFECAF. |
| **[`docs/parte-teorica.pdf`](docs/parte-teorica.pdf)** | O arquivo oficial em PDF já formatado e pronto para submeter na plataforma de entrega. |
| **[`docs/relatorio-etapa-15.md`](docs/relatorio-etapa-15.md)** | Relatório consolidado de homologação final com matriz de conformidade com o edital da UniFECAF. |
| **[`docs/guia-apresentacao.md`](docs/guia-apresentacao.md)** | Explicação didática de como o HTML, CSS, JavaScript, Visagismo e Agendamento funcionam, com glossário simples. |
| **[`docs/relatorio-etapa-14.md`](docs/relatorio-etapa-14.md)** | Relatório técnico de auditoria e organização de arquivos da Etapa 14. |

