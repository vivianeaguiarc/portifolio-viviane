# Portfolio Viviane

Portfólio profissional bilíngue (pt-BR / en-US) para apresentação técnica, processos seletivos, networking e comunidades.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![next-intl](https://img.shields.io/badge/i18n-next--intl-purple?style=flat-square)

## Visão geral

Plataforma completa de personal branding para desenvolvedora Fullstack/Backend, com foco em recrutadores e empresas de tecnologia — nacional e internacional.

### Funcionalidades

| Área                      | Descrição                                                                    |
| ------------------------- | ---------------------------------------------------------------------------- |
| **Landing**               | Hero, sobre, projetos, social proof, formação, certificações, stack, contato |
| **Case Studies**          | Páginas individuais por projeto com arquitetura e desafios                   |
| **Blog técnico**          | Artigos com SEO, JSON-LD e rotas localizadas                                 |
| **Recruiter Mode**        | Página otimizada para triagem rápida (< 2 min)                               |
| **Internacionalização**   | pt-BR (padrão) e en-US com next-intl                                         |
| **Páginas de lançamento** | Changelog, Now, Media Kit, Press Kit                                         |
| **Tema**                  | Dark / Light mode com next-themes                                            |
| **SEO**                   | Metadata, OG, Twitter Cards, sitemap, robots, JSON-LD                        |
| **Analytics**             | Vercel Analytics + Speed Insights                                            |

## Tecnologias

| Categoria       | Tecnologias                                      |
| --------------- | ------------------------------------------------ |
| Framework       | Next.js 16 (App Router)                          |
| Linguagem       | TypeScript (strict)                              |
| Estilização     | TailwindCSS 4                                    |
| UI              | shadcn/ui                                        |
| i18n            | next-intl                                        |
| Animações       | Framer Motion                                    |
| Formulários     | React Hook Form + Zod                            |
| Observabilidade | Vercel Analytics, Speed Insights                 |
| Qualidade       | ESLint, Prettier, Husky, lint-staged, Commitlint |

## Arquitetura

```
src/
├── app/
│   ├── [locale]/           # Rotas localizadas (pt-BR, en-US)
│   │   ├── page.tsx        # Home
│   │   ├── blog/
│   │   ├── projetos|projects/[slug]/
│   │   ├── recruiter/
│   │   ├── changelog/
│   │   ├── now/
│   │   ├── media-kit/
│   │   └── press-kit/
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                 # shadcn/ui
│   ├── sections/           # Seções e páginas de conteúdo
│   └── shared/             # Header, Footer, SEO helpers
├── data/                   # Dados estáticos localizados
├── i18n/                   # routing, request, navigation
├── messages/               # pt-BR.json, en-US.json
├── lib/                    # SEO, localized, utils
└── constants/              # Site, links sociais
```

### Princípios

- **Server Components** por padrão; Client Components só onde necessário
- **Dados em `src/data/`** com getters localizados (`pickLocalized`)
- **Textos de UI** em `src/messages/{locale}.json`
- **SEO centralizado** em `src/lib/seo.ts` (`createPageMetadata`)

## Internacionalização

- Locales: `pt-BR` (default), `en-US`
- `/` redireciona para `/pt-BR`
- Pathnames localizados: `/pt-BR/projetos` vs `/en-US/projects`
- Hreflang via `alternates.languages` em metadata e sitemap
- Language switcher no header

## SEO

- `metadataBase`, title template e description por página
- Open Graph + Twitter Cards com imagem `/og-image.svg`
- Sitemap multilíngue com projetos, blog e páginas estáticas
- JSON-LD: Person, WebSite, BlogPosting, SoftwareApplication
- Checklist: [`docs/seo-checklist.md`](docs/seo-checklist.md)

## Analytics

- **Vercel Analytics** — page views e eventos
- **Speed Insights** — Core Web Vitals em produção
- Componente client isolado para não impactar bundle da home

## Recruiter Mode

Rota `/recruiter` com:

- Métricas do portfólio (projetos, certificações)
- Resumo rápido (formação, stack, links)
- Timeline profissional
- Download de currículo
- JSON-LD Person enriquecido

## Blog

- Listagem e artigos em `/blog` e `/blog/[slug]`
- Metadata e structured data por post
- Conteúdo em MDX/markdown em `src/data/blog/`

## Scripts

| Comando              | Descrição                   |
| -------------------- | --------------------------- |
| `npm run dev`        | Servidor de desenvolvimento |
| `npm run build`      | Build de produção           |
| `npm run start`      | Servidor de produção        |
| `npm run lint`       | ESLint                      |
| `npm run type-check` | Verificação TypeScript      |

## Como executar

```bash
git clone https://github.com/vivianeaguiarc/portifolio-viviane.git
cd portifolio-viviane
npm install
cp .env.example .env.local
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) (redireciona para `/pt-BR`).

### Variáveis de ambiente

| Variável               | Descrição                  | Padrão                                 |
| ---------------------- | -------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL pública (SEO, sitemap) | `https://portfolio-viviane.vercel.app` |

## Deploy

### Vercel (recomendado)

1. Conecte o repositório na [Vercel](https://vercel.com)
2. Configure `NEXT_PUBLIC_SITE_URL`
3. Deploy automático a cada push em `main`

## Rotas principais

| Página    | pt-BR              | en-US              |
| --------- | ------------------ | ------------------ |
| Home      | `/pt-BR`           | `/en-US`           |
| Blog      | `/pt-BR/blog`      | `/en-US/blog`      |
| Recruiter | `/pt-BR/recruiter` | `/en-US/recruiter` |
| Changelog | `/pt-BR/changelog` | `/en-US/changelog` |
| Now       | `/pt-BR/now`       | `/en-US/now`       |
| Media Kit | `/pt-BR/media-kit` | `/en-US/media-kit` |
| Press Kit | `/pt-BR/press-kit` | `/en-US/press-kit` |

## Documentação

| Arquivo                                                              | Conteúdo                 |
| -------------------------------------------------------------------- | ------------------------ |
| [`docs/launch-checklist.md`](docs/launch-checklist.md)               | Checklist de lançamento  |
| [`docs/seo-checklist.md`](docs/seo-checklist.md)                     | Validação SEO            |
| [`docs/accessibility-checklist.md`](docs/accessibility-checklist.md) | Acessibilidade           |
| [`docs/performance-audit.md`](docs/performance-audit.md)             | Performance e Lighthouse |

## Screenshots

| Seção           | Descrição                                                   |
| --------------- | ----------------------------------------------------------- |
| Hero            | Apresentação com CTAs e language switcher                   |
| Projetos        | Cards + seção Principais Projetos (StockFlow, Ticket Sales) |
| Recruiter       | Modo recrutador com resumo rápido                           |
| Blog            | Listagem e artigos técnicos                                 |
| Changelog / Now | Páginas de evolução e foco atual                            |

> Substitua placeholders em `public/projects/` por screenshots reais quando disponíveis.

## CI/CD

Workflow `.github/workflows/ci.yml`:

1. `npm ci` (com `HUSKY=0`)
2. `npm run lint`
3. `npm run type-check`
4. `npm run build`

## Commits

[Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona página Now
fix: corrige link do press kit
docs: atualiza checklist de lançamento
```

## Licença

Uso pessoal. Todos os direitos reservados.
