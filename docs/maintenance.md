# Guia de Manutenção e Atualização — Barbearia Azevedo Corta

Este documento orienta desenvolvedores e mantenedores em tarefas comuns de atualização e preservação da aplicação.

---

## 1. Como Alterar Informações do Negócio (Telefone, Horários, Endereço)
Todas as informações cadastrais e comerciais da barbearia estão centralizadas no arquivo:  
**`data/config.js`**

Para atualizar o número do WhatsApp, endereço ou horários:
1. Abra `data/config.js`.
2. Altere os valores no objeto `businessConfig`.
3. Todos os elementos da interface com as classes `.js-biz-address`, `.js-biz-whatsapp`, `.js-biz-hours` e links `.js-whatsapp-btn` serão automaticamente atualizados no navegador via script de hidratação (`js/core/dom.js`).

---

## 2. Como Adicionar ou Modificar Serviços
No arquivo `data/config.js`, edite o array `services`:

```javascript
{
  id: "novo-servico",
  number: "09",
  name: "Nome do Serviço",
  category: "Categoria",
  description: "Descrição detalhada do serviço prestado.",
  duration: "30 min",
  price: "R$ 60",
  icon: "solar:scissors-linear",
  badge: "Novo"
}
```

O seletor dinâmico do formulário de agendamento incorporará automaticamente os novos serviços adicionados ao arquivo.

---

## 3. Como Alterar Variáveis Visuais (Cores, Fontes e Espaçamentos)
Todas as definições de tokens visuais encontram-se em:  
**`css/base/variables.css`**

Exemplo de modificação de cores principais:
```css
:root {
  --color-accent: #C8A97E; /* Dourado / Bege Accent */
  --color-bg-dark: #0A0A0A; /* Fundo Preto Principal */
  --color-surface: #141414; /* Fundo de Cards */
}
```

---

## 4. Estrutura de Novas Páginas
Caso seja necessário criar novas subpáginas (ex: `promocoes.html` ou `blog.html`):
1. Crie o arquivo dentro da pasta `pages/`.
2. Importe o estilo central via `<link rel="stylesheet" href="../css/main.css">`.
3. Importe o script central via `<script type="module" src="../js/core/main.js"></script>`.
4. Inclua a estrutura padrão de cabeçalho com o botão `#navHamburger` e o contêiner `#mobileDrawer` para assegurar o funcionamento da navegação mobile.

---

## 5. Execução da Suíte de Testes Automatizados
Antes de publicar qualquer alteração no repositório, execute os verificadores automatizados para garantir que nenhum import ou módulo foi corrompido:

```bash
# Validação da árvore de estilos CSS:
node tests/check-css-imports.js

# Validação sintática e resolução de módulos JavaScript:
node tests/check-js-modules.js
```
Ambos devem retornar resultado positivo (`ALL CSS IMPORTS VALID ✅` e `ALL JS CHECKS PASSED ✅`).
