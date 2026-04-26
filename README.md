# O Eterno MHRP — Landing Page

Landing page premium para o curso **O Eterno MHRP — Manual para ser o homem que ela respeita e precisa**.

## Estrutura de arquivos

```
.
├── index.html                                    # Marcação semântica, SEO e componentes
├── styles.css                                    # Design tokens, componentes e responsivo
├── script.js                                     # Interações (acordeões, reveals, navbar, FAQ)
│
├── logogrande.PNG                                # Logo completa usada no hero
├── logopequena.PNG                               # Logo reduzida usada na navbar, rodapé e divisores
│
├── cavaleiro-olhando-para-a-rosa-e-para-a-espada.png  # Figura flutuante — Hero (direita)
├── mao-do-cavaleiro-segurando-a-rosa.png               # Figura flutuante — Manifesto (direita)
├── cavaleiro-de-lado-cortado-esquerda.png              # Figura flutuante — A quem serve (esquerda)
├── cavaleiro-caindo-entre-rosas-vermelhas.png          # Figura flutuante — O que se deixa para trás (centro)
├── cavaleiro-apontando-a-espada-para-a-camera.png      # Figura flutuante — A transformação (centro)
├── rosa-vermelha-no-chao.png                           # Figura flutuante — CTA final (direita)
│
└── casal.jpg                                     # Foto de Thiago e Giovana — seção Sobre nós
```

Tudo na raiz. Sem build, sem dependências — é só subir.

## Seções da página (ordem)

| # | Seção | ID | Descrição |
|---|---|---|---|
| 1 | Hero | `#top` | Título, lede, CTA principal e selos de credibilidade |
| 2 | Oferta | `#oferta` | Card de investimento com preço, métodos de pagamento e lista de inclusos |
| 3 | Manifesto | `#manifesto` | Os três pilares filosóficos do método (Homem → Escolha → Legado) |
| — | Divisor | — | Logo pequena com linhas decorativas douradas |
| 4 | Pilares | `#pilares` | Seis estágios em acordeão expansível |
| 5 | A quem serve | — | Grid de perfis que o manual atende e não atende |
| 6 | Sobre nós | `#sobre` | Apresentação de Thiago e Giovana |
| 7 | A transformação | `#transformacao` | Cards "antes e depois" lado a lado |
| 8 | Comportamentos desenvolvidos | — | Grid de hábitos com animação de hover |
| 9 | O que se deixa para trás | — | Lista de padrões abandonados |
| 10 | O que está incluído | — | Números e entregas do método |
| — | Divisor | — | Logo pequena com linhas decorativas douradas |
| 11 | FAQ | `#faq` | Perguntas frequentes em acordeão |
| 12 | CTA Final | — | Chamada final com rosa vermelha no canto |
| — | Rodapé | — | Links de Instagram de Thiago e Giovana + copyright |

## Navegação (navbar)

Ordem dos links no menu: **Oferta → Manifesto → Pilares → Sobre nós → Transformação → FAQ**

O botão "Adquirir o manual" leva diretamente para `#oferta`.

## Figuras flutuantes

Cada seção com figura usa `position: absolute` dentro de um container `position: relative; overflow: hidden`. As imagens ficam no `z-index: 0` e o conteúdo de texto no `z-index: 1`.

Todas as figuras usam `mask-image` e/ou `opacity` para se integrar ao fundo escuro sem bordas visíveis. No mobile (≤ 640px), as figuras das seções intermediárias são ocultadas (`display: none`) para não prejudicar a leitura — apenas o cavaleiro do hero e o da seção "O que se deixa para trás" permanecem, com opacidade reduzida.

## O que editar com frequência

| Alvo | Local |
|---|---|
| Preço parcelado | `index.html` → `data-price-installment` + `.price-cents` na seção `#oferta` |
| Preço à vista | `index.html` → `data-price-total` na seção `#oferta` |
| Link de compra (Hotmart) | Buscar `https://www.hotmart.com` em `index.html` — aparece em dois botões |
| Instagram de Thiago | Buscar `thiagonoh` em `index.html` |
| Instagram de Giovana | Buscar `giovanayung` em `index.html` |
| Conteúdo dos inclusos | `index.html` → lista `.offer-includes` na seção `#oferta` |
| Perguntas do FAQ | `index.html` → lista `.faq-list` na seção `#faq` |

## Customização visual

Todas as cores, fontes e espaçamentos estão em CSS custom properties no topo de `styles.css` (`:root`):

```css
/* Cores principais */
--c-bg: #150608;        /* fundo base */
--c-wine: #3a0e16;      /* vinho */
--c-red: #8b0a1a;       /* vermelho vivo */
--c-gold: #c9a961;      /* dourado principal */
--c-gold-soft: #d4b574; /* dourado suave */
--c-ink: #f4e8d4;       /* texto principal */
--c-ink-mute: #a89475;  /* texto secundário */
```

## Responsivo

| Breakpoint | Comportamento |
|---|---|
| > 960px | Layout completo de desktop — duas colunas, figuras flutuantes visíveis, navbar com links |
| ≤ 960px | Navbar recolhe para hambúrguer, figuras reduzidas, grids simplificados |
| ≤ 640px | Layout mobile completo: hero centralizado, figuras intermediárias ocultas, oferta em coluna única com botão reposicionado (preço → botão → métodos → inclusos) |

## Acessibilidade e SEO

- HTML semântico com `header`, `main`, `section`, `nav`, `footer`.
- Meta `title`, `description` e Open Graph preenchidos.
- `aria-expanded`, `aria-controls`, `aria-hidden` nos componentes interativos.
- `prefers-reduced-motion` respeitado em todas as animações.
- Contraste alto em todos os textos.

## Deploy

Funciona em qualquer hospedagem estática:

- **GitHub Pages**: commit na branch `main` e ative Pages nas configurações do repositório.
- **Netlify / Vercel**: arraste a pasta ou conecte o repositório.
- **Hostinger / cPanel**: envie os arquivos para `public_html/`.

## Navegadores suportados

Chrome, Edge, Firefox, Safari e navegadores mobile modernos. Sem dependências externas além das fontes do Google Fonts (Cinzel, Cormorant Garamond, Inter).
