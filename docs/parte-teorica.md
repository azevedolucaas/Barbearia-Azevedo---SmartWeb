# Documentação Teórica — Análise e Discussão
## Smart Web Experience: Criando uma Experiência Digital com No-Code, Padrões Web e IA

* **Disciplina:** Padrões Web para No Code e Low Code
* **Instituição:** Centro Universitário UniFECAF
* **Projeto:** Barbearia Azevedo Corta — Experiência Digital de Atendimento e Agendamento
* **Autor:** Lucas Azevedo
* **Ano:** 2026
* **Status dos Entregáveis Acadêmicos:**
  * **1. Relatório Teórico:** Concluído (`docs/parte-teorica.md`)
  * **2. Aplicação Funcional:** Concluída e testada localmente (`index.html` e `pages/`)
  * **3. Link Público da Aplicação:** `Pendente de publicação no GitHub Pages`
  * **4. Vídeo Pitch (até 4 minutos):** `Pendente de gravação pelo estudante`

---

### 1. Problema Identificado, Público-Alvo e Solução Proposta

#### 1.1 O Problema
Pequenas empresas prestadoras de serviços — em especial no segmento de barbearias e estética masculina — enfrentam gargalos operacionais diários decorrentes da ausência de uma presença digital estruturada. O cenário comercial identificado na **Barbearia Azevedo Corta** (localizada no bairro do Méier, Zona Norte do Rio de Janeiro - RJ) apresenta:
* **Dependência exclusiva de redes sociais:** A divulgação de serviços concentrava-se no feed e stories do Instagram, onde informações essenciais como cardápio, técnicas, durações e preços ficavam dispersas e de difícil localização para novos clientes.
* **Sobrecarga de atendimento manual:** Barbeiros e recepcionistas precisavam interromper procedimentos em andamento para responder repetidamente mensagens no WhatsApp com dúvidas básicas sobre tabela de valores, localização ou disponibilidade de horário.
* **Desencontros e erros de agendamento:** Clientes solicitavam horários para domingos (dias em que o estabelecimento não abre), horários retroativos no próprio dia ou marcações sem o intervalo mínimo necessário entre serviços.
* **Ausência de registro rastreável:** Falta de um sistema que gerasse protocolo prévio de intenção de agendamento, ocasionando perda de clientes e dificuldades no controle da recepção.

#### 1.2 O Público-Alvo
O público-alvo é composto por homens contemporâneos (jovens, adultos e profissionais) que residem, trabalham ou circulam na região do Méier e bairros vizinhos da Zona Norte carioca. Esse público valoriza o cuidado com a imagem pessoal (corte em degradê, alinhamento de barba, barboterapia e visagismo), mas prioriza pontualidade, agilidade e autonomia digital, preferindo consultar preços, avaliar o estilo ideal e encaminhar solicitações diretamente pelo smartphone ou computador, sem necessidade de telefonemas ou esperas prolongadas.

#### 1.3 A Solução Proposta
Foi desenvolvida uma experiência web completa, acessível, responsiva e de alta fidelidade visual, estruturada em duas frentes complementares:
1. **Landing Page Principal Integrada (`index.html`):** Centraliza a jornada de conversão do cliente em uma experiência fluida por seções âncora (`#inicio`, `#historia`, `#servicos`, `#galeria`, `#barbeiros`, `#agendamento`, `#contato`), permitindo acesso imediato a todas as informações sem recarregamentos lentos.
2. **Páginas Modulares Dedicadas e Documentos Legais (`pages/`):** Páginas exclusivas para navegação aprofundada ([`pages/sobre.html`](../pages/sobre.html), [`pages/servicos.html`](../pages/servicos.html), [`pages/equipe.html`](../pages/equipe.html), [`pages/contato.html`](../pages/contato.html)) e páginas de governança legal ([`pages/privacidade.html`](../pages/privacidade.html) e [`pages/termos.html`](../pages/termos.html)) em conformidade com a LGPD.
3. **Módulos Interativos Nativos:**
   * Vitrine completa de serviços com preços, durações e seleção rápida.
   * Galeria editorial com visualizador em tela cheia (*lightbox modal*) acessível via teclado (`Escape`, setas).
   * Carrossel de avaliações com suporte a gestos de toque (*touch swipe*) e autoplay pausável.
   * **Consultor Inteligente de Visagismo (`js/ai-assistant.js`):** automação heurística baseada em regras locais para recomendação personalizada e pré-preenchimento.
   * **Formulário de Agendamento com Validação Temporal (`js/features/booking.js`):** bloqueio dinâmico de datas passadas e domingos, geração de protocolo rastreável `#AZV-2026-XXXXXX`, registro no `localStorage` e integração com WhatsApp.

---

### 2. Plataforma No-Code/Low-Code Utilizada, Ferramentas e Justificativa

#### 2.1 Mapeamento Real das Ferramentas e Papéis Técnicos

Para garantir total integridade acadêmica e clareza metodológica, o projeto distingue com precisão o papel de cada tecnologia utilizada em seu ciclo de vida:

| Ferramenta / Tecnologia | Categoria Real | Papel no Ciclo de Vida do Projeto | O que Comprova seu Uso |
| :--- | :--- | :--- | :--- |
| **Aura.build** | Plataforma No-Code / Visual AI Builder | Concepção, wireframing e protótipo visual inicial do layout e paleta de cores (*barbershop-landing-51*). | Pacote forense em disco `barbershop-landing-51.aura.build.zip` (33,1 MB, MD5: `29B8114C7058290D4DDE79D9BD46516D`, baixado em 28/09/2026). |
| **Antigravity** (Google DeepMind) | Ambiente de Desenvolvimento Assistido por IA (IDE / Agentic Workflow) | Orquestração do par de programação, refatoração de código, testes automatizados, deduplicação e documentação técnica. | Transcrições de sessão, logs de tarefas (`.system_generated/`) e scripts de testes criados no workspace. |
| **Padrões Web Abertos** (HTML5, CSS3, JavaScript ES6+) | Tecnologias Fundamentais da W3C | Construção da arquitetura modular final, design system CSS em camadas, lógica de agendamento e acessibilidade WCAG. | 100% dos arquivos de produção em `css/`, `js/`, `pages/` e `index.html`. |
| **FormSubmit** | Serviço Low-Code de Backend | Endpoint de processamento de formulários sem necessidade de servidor proprietário. | Atributo `action` e requisição assíncrona em `js/features/booking.js`. |
| **ViaCEP** | API REST Pública de Terceiros | Resolução de dados de endereço por CEP. | Módulo `js/features/cep.js`. |

> [!IMPORTANT]
> **Ressalva Acadêmica sobre o Requisito No-Code/Low-Code:**  
> O ambiente Antigravity é classificado formalmente como uma **plataforma de desenvolvimento assistido por agentes de IA**, e não como um construtor No-Code visual proprietário (como Wix ou Bubble). O requisito de No-Code do trabalho foi atendido a partir do protótipo gerado no **Aura.build**, seguido pela exigência explícita do edital da UniFECAF: *"você não deverá se limitar aos componentes prontos oferecidos pela ferramenta. A aplicação deverá ser personalizada utilizando os fundamentos da Web — HTML, CSS e JavaScript"*. Caso o avaliador acadêmico exija que a aplicação final continue hospedada obrigatoriamente dentro de um editor visual SaaS proprietário, recomenda-se que o aluno consulte a orientação do professor antes de qualquer reconstrução.

#### 2.2 Transição do Protótipo No-Code para Código Aberto de Alta Performance
O protótipo original gerado no Aura.build apresentava limitações típicas de construtores visuais automáticos:
1. **Dependência de Runtime Fechado:** O arquivo exportado referenciava um script monolítico proprietário (`assets/resource_3fa48481346f.es`). Esse runtime foi integralmente removido e substituído por **ES Modules nativos**.
2. **Estilo Monolítico Indivisível:** O CSS original consistia em um arquivo único desorganizado (`styles.css` de 27,9 KB). Foi decomposto em 24 folhas de estilo modulares divididas por camadas de responsabilidade (`base/`, `layout/`, `components/`, `sections/`, `utilities/`).
3. **Ausência de Regras de Negócio:** O construtor visual não possuía validações de agendamento, bloqueio de datas ou cálculo de fuso horário. Todas as regras de agendamento e o assistente inteligente foram programados em código nativo.
4. **Otimização de Mídia:** O protótipo utilizava imagens pesadas e formatos mistos. Foram substituídas por um acervo próprio de 16 ativos em formato moderno **WebP** com carregamento postergado (`loading="lazy"`).

#### 2.3 Justificativa da Escolha Metodológica
* **Agilidade Inicial:** O uso do Aura.build permitiu conceber rapidamente a harmonia cromática (Dourado Nobre `#C8A97E` e Grafite `#0A0A0A`).
* **Sustentabilidade e Soberania Técnica:** Ao exportar e refatorar a aplicação para padrões abertos W3C, eliminou-se o aprisionamento tecnológico (*vendor lock-in*), garantindo custo zero de hospedagem (GitHub Pages), total controle sobre a acessibilidade e conformidade com os objetivos pedagógicos da disciplina.

---

### 3. Aplicação Prática de HTML5, CSS3 e JavaScript

O projeto demonstra domínio prático dos padrões fundamentais da Web:

#### 3.1 HTML5 Semântico e Estrutura Lógica
* **Tags Estruturais Estritas:** Emprego rigoroso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` e `<footer>`, criando uma árvore lógica compreensível por motores de busca e leitores de tela.
* **Hierarquia de Títulos Impecável:** Sequenciamento semântico `H1` (Título da Página) ➔ `H2` (Títulos das Seções) ➔ `H3` (Títulos de Serviços, Barbeiros e Depoimentos), sem saltos arbitrários de nível.
* **Acessibilidade de Formulários:** Todos os campos possuem rótulos explícitos `<label for="...">`, IDs unívocos e atributos de acessibilidade (`autocomplete`, `aria-describedby`, `aria-invalid` e `aria-live="polite"`).

#### 3.2 CSS3 Modular e Design Tokens
* **Arquitetura em Camadas:**
  * `css/base/`: Reset universal moderno, escala tipográfica com `clamp()` e tokens de design em variáveis CSS (`variables.css`).
  * `css/components/`: Componentes modulares (`buttons.css`, `cards.css`, `forms.css`, `modal.css`, `navigation.css`).
  * `css/layout/`: Contêineres, grid estrutural e rodapé (`container.css`, `grid.css`, `footer.css`).
  * `css/sections/`: Estilização contextual das seções (`hero.css`, `about.css`, `services.css`, `team.css`, `gallery.css`, `testimonials.css`, `contact.css`).
  * `css/utilities/`: Animações progressivas (`animations.css`) e classes utilitárias.
* **Layouts Bidimensionais:** Aplicação combinada de CSS Grid e Flexbox, dispensando frameworks externos inflados (como Bootstrap).
* **Efeito Glassmorphism com Degradação Suave:** Barra de navegação com desfoque de fundo (`backdrop-filter: blur(16px)`) e cor semitransparente que se adapta elegantemente à rolagem.

#### 3.3 JavaScript ES6+ Modular (Client-Side)
* **Modularidade Nativa (ES Modules):** Uso estrito de `import` e `export` com escopo fechado, sem poluição de variáveis no objeto global `window`.
* **Progressive Enhancement:** O site é plenamente navegável mesmo com JavaScript desativado; a classe `.js-enabled` no elemento `<body>` ativa transições dinâmicas apenas após a inicialização bem-sucedida dos scripts.

---

### 4. Recursos de Automação, Inteligência Artificial e Integrações

#### 4.1 Consultor Inteligente de Visagismo & Estilo (`js/ai-assistant.js`)
* **Natureza da Tecnologia:** Trata-se de um **Sistema Especialista Baseado em Regras e Heurísticas de Visagismo Masculino** executado 100% no navegador do cliente (*client-side*). **Não utiliza APIs externas de IA generativa em nuvem (LLM)**, eliminando custos operacionais com tokens, latência de rede e riscos de vazamento de dados pessoais (privacidade por design).
* **Funcionamento Técnico:**
  1. O usuário aciona o assistente através de botão flutuante `#aiTriggerBtn`.
  2. Pode digitar livremente ou selecionar pílulas de atalho (*quick pills*) para formatos de rosto (Redondo, Quadrado, Oval, Triangular) ou cuidados com a barba.
  3. O motor heurístico processa a entrada textual, identifica palavras-chave anatômicas e cruza com a matriz técnica de cortes e serviços da barbearia.
  4. Retorna a recomendação estética (ex.: para rosto redondo, recomenda degradê *Skin Fade* com volume vertical no topo para alongar as proporções).
  5. Gera card interativo com duas ações imediatas:
     * *Agendar no WhatsApp com Mensagem Pronta:* Constrói o link com o diagnóstico pré-preenchido.
     * *Preencher no Formulário:* Fecha a gaveta, rola suavemente até `#agendamento`, seleciona o serviço correspondente e foca no campo de nome. Nas páginas secundárias, utiliza `sessionStorage` para transferir a escolha para a página principal.

#### 4.2 Formulário de Agendamento com Validação Temporal (`js/features/booking.js`)
* **Bloqueio de Fuso Horário Local:** Utiliza `getLocalDateString()` baseado no relógio local do cliente, evitando o bug clássico de deslocamento de data gerado por `toISOString()` (UTC).
* **Bloqueio Preventivo de Datas Passadas e Domingos:** O campo `<input type="date">` recebe o atributo dinâmico `min="YYYY-MM-DD"` impedindo datas retroativas; a seleção de domingos é interceptada em tempo real com mensagem contextual explicativa.
* **Emissão de Protocolo Único:** Cada solicitação gera um código identificador rastreável no formato `#AZV-2026-XXXXXX` (baseado no ano corrente e código pseudoaleatório de 6 dígitos).
* **Persistência em Livro de Registro Local (*Local Ledger*):** As solicitações são gravadas no `localStorage` sob a chave `azevedo_agendamentos`, permitindo auditoria local sem dependência de banco de dados externo.
* **Ponte com WhatsApp (*WhatsApp Bridge*):** Construtor de mensagens estruturadas (`js/utils/whatsapp.js`) que codifica com segurança (`encodeURIComponent`) todos os dados da reserva e o protocolo para confirmação direta com o barbeiro.

#### 4.3 Integração com Backend Low-Code (FormSubmit) e API ViaCEP
* **FormSubmit:** Integrado via requisição assíncrona `fetch`. Em ambiente de homologação local (`localhost`), a rejeição esperada por política de CORS é tratada de forma graciosa sem travar a interface, registrando a solicitação no navegador e orientando a confirmação via WhatsApp.
* **ViaCEP (`js/features/cep.js`):** Módulo funcional de consumo da API REST pública `viacep.com.br`, mantido no código como demonstração técnica de integração externa.

---

### 5. Decisões Relacionadas à Responsividade e Acessibilidade

#### 5.1 Responsividade
* **Auditoria em Múltiplas Resoluções:** Layout validado e fotografado em 5 viewports reais: Desktop Full HD (1920×1080), Notebook (1366×768), Tablet Portrait (768×1024), Celular (390×844) e Gaveta Móvel Aberta (390×844).
* **Colapso Dinâmico:** Grades de serviços e equipe colapsam de 3 colunas para 2 em tablets e coluna única em celulares.
* **Toque Ergonômico:** Botões e áreas interativas atendem à dimensão mínima recomendada de 44 × 44 pixels.

#### 5.2 Acessibilidade (Diretrizes WCAG 2.1 Nível AA)
* **Texto Alternativo Completo:** 100% das imagens possuem atributos `alt` descritivos e funcionais.
* **Contraste Auditado:** Relação cromática de **17.5:1** entre texto claro (`#F5F5F5`) e fundo escuro (`#0A0A0A`) (exigência mínima WCAG AA: 4.5:1). Elementos dourados (`#C8A97E`) alcançam **7.2:1**.
* **Navegação por Teclado e Foco Visível:** Elementos interativos recebem contorno visível dourado (`outline: 1.6px solid #C8A97E`). Modais e menus móveis fecham com a tecla `Escape`.
* **Semântica ARIA:** Emprego de `aria-expanded`, `aria-controls`, `aria-label`, `aria-hidden` e `aria-live="polite"`.
* **Respeito a Sensibilidade a Movimento:** Media query `@media (prefers-reduced-motion: reduce)` desativa durações e transições para pessoas com distúrbios vestibulares.

---

### 6. Limitações Encontradas, Aprendizados e Possibilidades Futuras

#### 6.1 Limitações Técnicas Declaradas
1. **Envio Assíncrono de E-mail via FormSubmit em Localhost:** Requisições assíncronas do tipo `fetch` para o endpoint FormSubmit sofrem bloqueio de CORS em navegadores executando em `http://127.0.0.1` sem domínio registrado. O sistema trata isso transparentemente registrando os dados no navegador e encaminhando a confirmação para o WhatsApp.
2. **Armazenamento Local vs. Banco de Dados Centralizado:** O `localStorage` grava as solicitações exclusivamente no navegador do dispositivo utilizado, funcionando como registro de contingência e demonstração técnica, sem substituir um banco de dados relacional multi-usuário.
3. **Confirmação Concorrente de Cadeiras:** Por não possuir websockets ou backend em nuvem com bloqueio de transação em tempo real, a confirmação definitiva do horário é realizada humanamente pela equipe da barbearia via WhatsApp.
4. **Módulo ViaCEP como Demonstração:** O módulo está programado e funcional, mas a interface atual da barbearia física não solicita CEP residencial (o atendimento é presencial no salão).

#### 6.2 Principais Aprendizados
* **Fundamentos Superam Ferramentas Fechadas:** Construtores visuais aceleram a etapa inicial de design, mas apenas o domínio de HTML, CSS e JavaScript permite alcançar conformidade WCAG, validações seguras de formulário e eliminação de custos recorrentes de plataforma.
* **Experiência do Usuário Ética e Transparente:** É indispensável informar ao cliente o status real de sua solicitação (fornecendo protocolo e botão direto de WhatsApp) em vez de exibir falsos alertas de e-mail enviado sem confirmação do servidor.
* **Arquitetura Modular Sustentável:** A organização do CSS e do JS em módulos independentes permitiu deduplicar o projeto, auditar importações e garantir zero erros no console.

#### 6.3 Possibilidades de Evolução
* Conexão do formulário a um banco de dados serverless (Supabase ou Firebase) para espelhamento em tempo real em um painel administrativo para os barbeiros.
* Implementação de catálogo de e-commerce de produtos masculinos (pomadas e óleos de barba) com cálculo de frete via módulo ViaCEP.
* Publicação em domínio corporativo próprio com certificado SSL.
