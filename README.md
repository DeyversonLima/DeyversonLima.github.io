# DeyversonLima.github.io

Site/portfólio profissional de **Deyverson Guedes Lima** (Engenharia de Software, CEUB).

## Stack

- **React 18** + **Vite** (build estático, compatível com GitHub Pages)
- Conteúdo separado da UI em `src/data/content.js`
- Deploy automatizado via **GitHub Actions** (`.github/workflows/deploy.yml`)

## Estrutura

```text
.
├─ .github/workflows/deploy.yml   # build + deploy no GitHub Pages
├─ public/                        # arquivos copiados para dist/
│  ├─ docs/                       # currículos (PDF padrão + Lattes)
│  ├─ favicon.svg, robots.txt, site.webmanifest, sitemap.xml
├─ src/
│  ├─ assets/images/              # imagens importadas pelo bundle
│  ├─ components/                 # (reservado para evolução)
│  ├─ data/content.js             # perfil, projetos, skills, trajetória, certs
│  ├─ hooks/useUi.js              # reveal/active section
│  ├─ styles/global.css
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html                     # entry Vite
├─ vite.config.js                 # base '/' para site de usuário
└─ package.json
```

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

> `dist/` é artefato de build (gerado localmente/pelo Actions) e não deve ser commitado.

## Publicação (GitHub Pages)

1. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Faça push na branch `main`; o workflow gera `dist/` e publica.
3. Para `deyversonlima.github.io` (user site), `base` permanece `/` no `vite.config.js`.

## Currículos

- `public/docs/Curriculo_Deyverson_Guedes_Lima.pdf`
- `public/docs/Curriculo_Lattes_Deyverson_Lima.pdf`

## Qualidade / boas práticas aplicadas

- Dados de conteúdo centralizados (`src/data/content.js`) para manutenção fácil.
- Acessibilidade: skip link, semântica, `aria-*`/`aria-current`, foco visível, `Escape` no menu, `prefers-reduced-motion` (reveal e marquee).
- SEO/meta: canonical, description, Open Graph/Twitter, JSON-LD, `robots.txt`, `sitemap.xml` (`lastmod`), manifest.
- UX: transição suave de tema, `theme-color` dinâmico, marquee em rolagem lateral contínua (pausa no hover), foto com interação/arrasto reduzidos (melhor esforço no front).
- Deploy reprodutível via Actions com `npm ci`; CI de build em push/PR (`.github/workflows/ci.yml`).

