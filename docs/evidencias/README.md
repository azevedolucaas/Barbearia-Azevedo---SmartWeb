# Índice Oficial de Evidências — Barbearia Azevedo Corta
**Disciplina:** Padrões Web para No Code e Low Code — UniFECAF  
**Projeto:** Barbearia Azevedo Corta (*Smart Web Experience*)  
**Atualização:** 29 de Outubro de 2026  

Este diretório reúne as evidências visuais e registros de validação técnica do projeto, correlacionando cada ativo aos requisitos do trabalho acadêmico oficial da UniFECAF.

---

## 1. Tabela Geral de Evidências Visuais (Telas e Resoluções)

| Arquivo | Caminho Relativo | Requisito Acadêmico Demonstrado | O que o Registro Efetivamente Comprova | Limitações da Evidência |
| :--- | :--- | :--- | :--- | :--- |
| **`01-desktop-1920x1080.png`** | `docs/evidencias/01-desktop-1920x1080.png` | Interface web funcional, responsividade desktop e apresentação de serviços. | Renderização correta em monitor Desktop Full HD (1920×1080), cabeçalho fixo, hero banner e vitrine de serviços em cards. | Captura estática; não demonstra animações de transição nem eventos de clique. |
| **`02-notebook-1366x768.png`** | `docs/evidencias/02-notebook-1366x768.png` | Responsividade em resolução intermediária comum (Notebook standard). | Adaptação fluida do layout para telas de 1366×768 sem scroll horizontal indesejado. | Captura estática focada na seção superior do site. |
| **`03-tablet-768x1024.png`** | `docs/evidencias/03-tablet-768x1024.png` | Responsividade em formato tablet portrait (iPad standard). | Ativação do breakpoint de 768px, transição para o botão de menu hambúrguer e colunas reorganizadas em duas vias. | Mostra o menu fechado na visão inicial do tablet. |
| **`04-celular-390x844.png`** | `docs/evidencias/04-celular-390x844.png` | Design mobile-first e responsividade para smartphones. | Adaptação para celular (iPhone 12/13/14 viewport 390×844), tipografia legível, botões dimensionados para toque. | Mostra o estado de repouso com menu recolhido. |
| **`05-celular-menu-aberto-390x844.png`** | `docs/evidencias/05-celular-menu-aberto-390x844.png` | Navegação móvel acessível e controle de estado de gaveta. | Abertura autêntica da gaveta móvel (`.mobile-nav-drawer.active`), exibindo links ampliados e atributo `aria-expanded="true"`. | Evidência de interface visual; a navegação por teclado e leitor de tela é auditada em código. |
| **`06-galeria-modal-lightbox.png`** | `docs/evidencias/06-galeria-modal-lightbox.png` | Interação avançada de UI com padrões web (Lightbox Modal nativo). | Exibição em tela cheia da fotografia da galeria com overlay escuro, título descritivo e categoria técnica. | Imagem estática; o fechamento pela tecla `Escape` e setas de teclado é auditado nos testes funcionais. |
| **`07-assistente-visagismo.png`** | `docs/evidencias/07-assistente-visagismo.png` | Recurso inteligente / automação (Consultor de Visagismo). | Chat lateral em execução exibindo mensagem de boas-vindas, pílulas de atalho, análise para "Rosto Redondo", indicação do corte e card de ação. | Comprova automação por regras heurísticas locais; não utiliza modelo generativo em nuvem (LLM). |
| **`08-agendamento-validacao-protocolo.png`** | `docs/evidencias/08-agendamento-validacao-protocolo.png` | Formulário funcional, validação temporal, protocolo e persistência. | Card de feedback verde com protocolo único `#AZV-2026-XXXXXX`, resumo da reserva, aviso de confirmação via WhatsApp e registro local. | Comprova a geração do protocolo no cliente; a confirmação final da cadeira depende de atendimento humano. |

---

## 2. Evidências do Protótipo Original e Engenharia Reversa (No-Code ➔ Código Aberto)

* **Arquivo Forense:** `barbershop-landing-51.aura.build.zip` (pacote original exportado do Aura.build)
* **Tamanho do Arquivo:** 33.163.856 bytes (33,1 MB)
* **Data do Download Original:** 28 de Setembro de 2026 às 22:53:22
* **Hash Criptográfico (MD5):** `29B8114C7058290D4DDE79D9BD46516D`
* **O que Comprova:**
  * A concepção e prototipação visual inicial foram originadas na ferramenta **Aura.build** (projeto `barbershop-landing-51`), comprovando o uso da plataforma visual No-Code/AI.
  * O manifesto original (`STACK.md`) atesta que a ferramenta dependia de um script fechado de runtime (`assets/resource_3fa48481346f.es`).
  * Não existiam regras de agendamento, validações de data, persistência em `localStorage`, assistente de visagismo nem páginas secundárias.
  * Todo esse ecossistema foi posteriormente desacoplado, modularizado e programado em HTML5, CSS3 modular e ES Modules com o auxílio do ambiente de desenvolvimento assistido por IA **Antigravity**.

---

## 3. Registros de Testes Técnicos Automatizados (`tests/`)

| Script / Teste | Finalidade | Resultado Comprovado | Status |
| :--- | :--- | :--- | :---: |
| **`tests/check-css-imports.js`** | Validação recursiva da árvore de 24 arquivos CSS em camadas | 24/24 imports válidos a partir de `css/main.css`, sem ciclos ou arquivos ausentes. | **Aprovado ✅** |
| **`tests/check-js-modules.js`** | Validação sintática AST (Node.js) e resolução de caminhos ES Modules | 16 arquivos JavaScript sintaticamente válidos; 22 caminhos de módulo resolvidos. | **Aprovado ✅** |
| **`tests/check-html-assets.js`** | Varredura de links e imagens em todos os 8 arquivos HTML | 146 referências locais verificadas fisicamente no disco; zero arquivos quebrados. | **Aprovado ✅** |
| **`tests/check-gh-pages.js`** | Auditoria de compatibilidade com servidor Linux do GitHub Pages | 191 referências auditadas; zero links com `/` inicial; zero divergências de caixa alta/baixa. | **Aprovado ✅** |
| **`tests/test-booking.html`** | Suíte de testes automatizados in-browser do agendamento | Validação de campos vazios, cálculo de data mínima em fuso local, bloqueio de domingos e emissão de protocolo. | **Aprovado ✅** |

---

## 4. Declaração de Limitações das Evidências

1. **Testes Locais vs. Ambiente de Produção:** Todas as capturas foram obtidas em servidor local de homologação (`http://127.0.0.1:5176`). O comportamento sob domínio público e HTTPS será validado após a publicação no GitHub Pages.
2. **Envio de E-mail via FormSubmit:** O envio assíncrono via `fetch` sofre bloqueio de CORS em navegadores executando em `localhost`. A aplicação trata graciosamente a falha, gravando localmente e gerando a mensagem formatada para o WhatsApp.
3. **Persistência em Navegador:** O `localStorage` armazena as solicitações no navegador do cliente para fins de demonstração acadêmica e histórico, não substituindo um banco de dados transacional multi-usuário.
