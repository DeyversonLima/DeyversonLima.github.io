# DeyversonLima.github.io

Portfólio profissional de **Deyverson Guedes Lima**, estudante de Engenharia de Software no CEUB, com projetos em desenvolvimento web, dados e cibersegurança.

**Site:** [deyversonlima.github.io](https://deyversonlima.github.io)

## Stack

- **React 18** + **Vite** (build estático, compatível com GitHub Pages)
- Conteúdo autoral separado da interface em `src/data/content.js`
- Catálogo híbrido que combina curadoria manual com os repositórios públicos do GitHub
- Preferências visuais persistentes para movimento, velocidade do carrossel e indicador de disponibilidade
- Deploy automatizado via **GitHub Actions** (`.github/workflows/deploy.yml`)

## Estrutura

```text
.
├─ .github/workflows/             # integração contínua e deploy no GitHub Pages
├─ public/                        # arquivos copiados para dist/
│  ├─ docs/                       # currículos (PDF padrão + Lattes)
│  ├─ favicon.svg, robots.txt, site.webmanifest, sitemap.xml
├─ scripts/
│  └─ sync-github.mjs             # sincroniza o catálogo público do GitHub
├─ src/
│  ├─ assets/images/              # imagens importadas pelo bundle
│  ├─ data/
│  │  ├─ content.js               # perfil, curadoria, skills, trajetória e certs
│  │  └─ catalog.js               # combina conteúdo autoral e dados sincronizados
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

O site fica disponível, por padrão, em `http://localhost:5173`.

## Catálogo de projetos

Edite `src/data/content.js` para manter títulos, descrições, categorias e estudos de caso autorais.
Ao iniciar o ambiente local ou gerar o build, `scripts/sync-github.mjs` consulta os repositórios
públicos do perfil e acrescenta aqueles que ainda não possuem curadoria manual. As descrições
autorais sempre têm prioridade.

Se a consulta falhar, a última lista sincronizada continua disponível. Em um checkout limpo e sem
rede, o site usa apenas o catálogo autoral. Para atualizar os dados com o Vite já aberto:

```bash
npm run sync:github
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

- Dados autorais centralizados e preservados durante a sincronização com o GitHub.
- Projetos paginados em grupos de cinco, com filtros por área e estudos de caso em destaque.
- Acessibilidade: skip link, HTML semântico, `aria-*`, foco visível e suporte a teclado.
- SEO/meta: canonical, description, Open Graph/Twitter, JSON-LD, `robots.txt`, `sitemap.xml` (`lastmod`), manifest.
- UX: temas claro e escuro com transição suave, barra de rolagem personalizada e faixa contínua de habilidades.
- Preferências visuais: movimento e velocidade da faixa, pulso de disponibilidade e persistência local das escolhas.
- O painel de preferências fecha por clique externo, tecla `Escape` ou ao sair da área visível do rodapé.
- Deploy reprodutível via Actions com `npm ci`; CI de build em push/PR (`.github/workflows/ci.yml`).

## Privacidade

O portfólio publica apenas informações profissionais selecionadas. Certificados completos não são
expostos, e os currículos disponíveis devem ser revisados antes de cada publicação para evitar dados
pessoais desnecessários.

