# O Eterno MHRP — Landing Page

Landing page premium para o curso **O Eterno MHRP — Manual para ser o homem que ela respeita e precisa**.

## Estrutura

```
.
├── index.html          # Marcação semântica, SEO básico e componentes
├── styles.css          # Design tokens, componentes e responsivo
├── script.js           # Interações (acordeões, reveals, navbar, contador)
├── logopequena.PNG     # Logo usada na navbar e rodapé
├── logogrande.PNG      # Logo usada no hero
└── casal.heic          # Foto de Thiago e Giovana (ver nota técnica abaixo)
```

Tudo na raiz. Sem build, sem dependências — é só subir.

## Deploy

Funciona em qualquer hospedagem estática:

- **Netlify / Vercel**: arraste a pasta.
- **GitHub Pages**: commit na branch `main` e ative Pages.
- **Hostinger / cPanel**: envie os arquivos para `public_html/`.

## Observação técnica importante — arquivo `casal.heic`

O formato HEIC **não é renderizado nativamente** pela maioria dos navegadores (Chrome, Firefox, Edge não suportam; apenas Safari em dispositivos Apple). Para garantir que a foto do casal apareça para todos os visitantes, recomenda-se converter o arquivo.

### Opção A — Conversão online (mais rápida)

1. Acesse `https://cloudconvert.com/heic-to-jpg` (ou similar).
2. Suba `casal.heic`.
3. Baixe em **JPG** (qualidade máxima, ~1200px de largura) e em **WebP** (opcional).
4. Coloque na raiz como `casal.jpg` (e/ou `casal.webp`).

A estrutura `<picture>` em `index.html` já está pronta:

```html
<picture>
  <source srcset="./casal.jpg" type="image/jpeg" />
  <source srcset="./casal.webp" type="image/webp" />
  <img src="./casal.heic" alt="Thiago e Giovana..." />
</picture>
```

O navegador escolhe o melhor formato disponível. Se só o HEIC estiver presente, **apenas Safari exibirá**.

### Opção B — Conversão local (macOS)

```bash
sips -s format jpeg casal.heic --out casal.jpg
```

### Opção C — Node / ImageMagick

```bash
# com ImageMagick (precisa de libheif)
magick casal.heic casal.jpg
```

## O que editar com frequência

| Alvo | Local | Linha (aprox.) |
|---|---|---|
| Preço à vista | `index.html` → `data-price-total` | seção `#oferta` |
| Preço parcelado | `index.html` → `data-price-installment` + `.price-cents` | seção `#oferta` |
| Link de compra (Hotmart) | Buscar `https://www.hotmart.com` e substituir em todos os botões | — |
| Tempo de acesso / comunidade | `index.html` → seção `.delivers-list` e FAQ | — |

## Customização visual

As cores, fontes e espaçamentos estão todos em CSS custom properties no topo de `styles.css` (`:root`). Ajustar o tom de vinho ou de dourado é trocar uma variável.

```css
--c-wine: #3a0e16;
--c-gold: #c9a961;
--c-red: #8b0a1a;
```

## Acessibilidade e SEO

- HTML semântico com `header`, `main`, `section`, `article`, `nav`, `footer`.
- Meta title, description e Open Graph preenchidos.
- `aria-expanded`, `aria-controls`, `aria-hidden` nos componentes interativos.
- `prefers-reduced-motion` respeitado.
- Contraste alto em todos os textos.

## Navegadores suportados

Chrome, Edge, Firefox, Safari e navegadores mobile modernos. Sem dependências externas além das fontes do Google Fonts.
