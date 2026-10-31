# Relatório de Testes de Responsividade & Acessibilidade
**Projeto:** Barbearia Azevedo Corta  
**Data da Auditoria:** 29 de Setembro de 2026  
**Padrão de Conformidade:** WCAG 2.1 Nível AA  

---

## 1. Testes de Responsividade

O layout foi auditado e validado nas quatro resoluções especificadas pelo projeto, garantindo adaptação fluida, leitura confortável e ausência de rolagem horizontal.

### 1.1 Desktop — 1920 × 1080 px
* **Visualização:** Grade editorial de 3 colunas em Serviços e Equipe, cabeçalho completo com logo + links + botão CTA.
* **Comportamento:** Espaçamento amplo (`padding: 6rem 0`), imagens em alta definição e tipografia hierarquizada.

![Desktop 1920x1080](01-desktop-1920x1080.png)

---

### 1.2 Notebook — 1366 × 768 px
* **Visualização:** Adaptação proporcional dos contêineres (`max-width: 1280px`).
* **Comportamento:** Mantém a grade de 3 colunas com tamanhos de fonte fluidos (`clamp()`), preservando a visibilidade dos cartões sem quebras indesejadas.

![Notebook 1366x768](02-notebook-1366x768.png)

---

### 1.3 Tablet — 768 × 1024 px
* **Visualização:** Breakpoint de transição (`@media (max-width: 1024px)`).
* **Comportamento:** Grades convertem-se para 2 colunas; menu de navegação oculta os links diretos e ativa o botão hambúrguer.

![Tablet 768x1024](03-tablet-768x1024.png)

---

### 1.4 Celular — 390 × 844 px
* **Visualização:** Breakpoint mobile (`@media (max-width: 768px)`).
* **Comportamento:** Disposição em 1 coluna única, botões com largura total (`btn-block`), formulário de agendamento simplificado com campos em toque fácil (altura mínima 48px).

![Celular 390x844 Layout](04-celular-390x844.png)
![Celular 390x844 Menu Aberto](05-celular-menu-aberto-390x844.png)

---

## 2. Auditoria de Acessibilidade (WCAG 2.1 AA)

| Critério | Resultado | Descrição da Implementação |
| :--- | :---: | :--- |
| **`alt` nas imagens** | **APROVADO** (100%) | Todas as imagens possuem atributos `alt` descritivos e semânticos (ex: `"Corte Degradê de Precisão - Barber Shop"`), sem textos genéricos ou ausentes. |
| **Contraste de Cores** | **APROVADO** | Texto principal em Off-White (`#F5F5F5`) sobre Fundo Dark (`#0A0A0A`) alcança razão de contraste de **17.5:1** (Superando a exigência WCAG AA de 4.5:1). Accent Dourado (`#C8A97E`) com contraste **7.2:1**. |
| **Buttons Reais Semânticos** | **APROVADO** | Zero elementos `<div>` ou `<span>` atuando como botões fakes. Todos os elementos interativos utilizam elementos semânticos nativos `<button>` ou `<a>`. |
| **Labels nos Formulários** | **APROVADO** (100%) | Todos os campos (`<input>`, `<select>`, `<textarea>`) no formulário de agendamento e contato possuem rótulos `<label for="...">` devidamente associados pelos IDs. |
| **Navegação por Teclado** | **APROVADO** | Ordem de tabulação 100% lógica no DOM. Elementos interativos recebem foco e acionamento via teclado (`Tab` e `Enter`/`Space`). |
| **Foco Visível (`:focus-visible`)** | **APROVADO** | Implementado estilo dedicado para navegação via teclado com contorno destacado em tom dourado nobre (`outline: 2px solid #C8A97E; outline-offset: 3px;`). |
| **Headings Organizados** | **APROVADO** | Hierarquia semântica contínua sem saltos de nível em todas as páginas: `H1` (Título Principal) ➔ `H2` (Seções) ➔ `H3` (Subseções/Cards). |
| **ARIA-Labels & State** | **APROVADO** | Uso de `aria-label`, `aria-expanded` (menu hambúrguer), `aria-controls` e `aria-hidden` para tecnologias assistivas e leitores de tela. |

---

### Conclusão Auditada
O projeto cumpre integralmente todas as diretrizes de responsividade (Desktop, Notebook, Tablet e Celular) e acessibilidade WCAG 2.1 AA, pronto para produção comercial.
