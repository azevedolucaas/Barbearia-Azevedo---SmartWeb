# Organização de Imagens e Assets — Barbearia Azevedo Corta

Todas as imagens do projeto foram rigorosamente otimizadas e categorizadas na pasta `images/` de acordo com a sua finalidade visual na aplicação:

---

## Mapeamento de Arquivos

### 1. Imagens da Seção Hero (`images/hero/`)
- `01-hero-barbearia-principal.webp`: Foto principal de capa em formato WebP (Atendimento exclusivo e poltrona vintage de alto padrão).
- `premium_barbershop_hero.png`: Imagem em alta resolução utilizada como fallback e para metadados de compartilhamento em redes sociais (OpenGraph e Twitter Card).

### 2. Seção de Serviços (`images/services/`)
- `02-corte-degrade-precisao.webp`: Imagem ilustrativa de degradê masculino (*Skin Fade*).
- `03-barba-navalha-tradicional.webp`: Ritual de barba com navalha e espuma clássica.
- `04-barba-modelagem-alinhamento.webp`: Alinhamento geométrico e contorno de barba.
- `05-barboterapia-toalha-quente.webp`: Ritual de barboterapia com toalha quente aromatizada.

### 3. Equipe de Barbeiros (`images/team/`)
- `06-barbeiro-lucas-azevedo.webp`: Foto individual do profissional Lucas Azevedo.
- `07-barbeiro-mateus-silva.webp`: Foto individual do profissional Mateus Silva.
- `08-barbeiro-rafael-costa.webp`: Foto individual do profissional Rafael Costa.
- `16-barbeiro-equipe-estilo.webp`: Foto institucional da equipe em estilo editorial contemporâneo.

### 4. Galeria de Trabalhos e Atmosfera (`images/gallery/`)
- `11-corte-tesoura-acabamento.webp`: Detalhe de acabamento de corte tradicional na tesoura.
- `12-navalhado-contorno-perfeito.webp`: Contorno do maxilar com navalhete de precisão.
- `13-experiencia-cliente-satisfacao.webp`: Cliente no lounge vivenciando a experiência de atendimento.
- `14-penteado-finalizacao-estilo.webp`: Finalização de penteado e styling masculino.
- `15-cadeira-vintage-panorama.webp`: Cadeira de barbeiro vintage clássica em plano aberto.

### 5. Espaço e Ferramentas (`images/interior/`)
- `09-ambiente-barbearia-lounge.webp`: Vista panorâmica do lounge de recepção e barbearia.
- `10-ferramentas-barbeiro-oficio.webp`: Tesouras, navalhetes, pentes e ferramentas do ofício.

---

## Boas Práticas para Novos Ativos

1. **Formato Preferencial**: Utilize sempre **WebP** para fotografias para máxima taxa de compressão e qualidade visual.
2. **Nomenclatura Padronizada**: Adote padrão numérico e descritivo em `kebab-case` (ex: `17-corte-social-classico.webp`).
3. **Localização**: Insira novas imagens na subpasta temática correspondente dentro de `images/`.
4. **Desempenho**: Mantenha o atributo `loading="lazy"` nas tags `<img>` que se encontram abaixo da primeira dobra de visualização.
