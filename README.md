# Portfolio Viviane

Portfólio profissional bilíngue (pt-BR / en-US) para apresentação técnica, processos seletivos, networking e comunidades.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![next-intl](https://img.shields.io/badge/i18n-next--intl-purple?style=flat-square)

## Visão geral

Plataforma completa de personal branding para **Viviane Aguiar Silva Simões** — Desenvolvedora Fullstack Júnior, com foco em recrutadores e empresas de tecnologia — nacional e internacional.

### Formação acadêmica

| Curso                                                                                        | Instituição    | Período           | Status       |
| -------------------------------------------------------------------------------------------- | -------------- | ----------------- | ------------ |
| Análise e Desenvolvimento de Sistemas                                                        | UNIASSELVI     | 02/2019 — 12/2023 | Concluído    |
| Pós-graduação em Arquitetura e Desenvolvimento de Sistemas com Ênfase em Padrões de Projetos | GRAN Faculdade | 12/2023 — 04/2025 | Concluído    |
| Engenharia de Software                                                                       | UNIASSELVI     | 08/2025 — 12/2027 | Em andamento |

### Funcionalidades

| Área                      | Descrição                                                     |
| ------------------------- | ------------------------------------------------------------- |
| **Landing**               | Hero, sobre, projetos, social proof, formação, stack, contato |
| **Case Studies**          | Páginas individuais por projeto com arquitetura e desafios    |
| **Blog técnico**          | Artigos com SEO, JSON-LD e rotas localizadas                  |
| **Recruiter Mode**        | Página otimizada para triagem rápida (< 2 min)                |
| **Internacionalização**   | pt-BR (padrão) e en-US com next-intl                          |
| **Páginas de lançamento** | Changelog, Now, Media Kit, Press Kit                          |
| **Tema**                  | Dark / Light mode com next-themes                             |
| **SEO**                   | Metadata, OG, Twitter Cards, sitemap, robots, JSON-LD         |
| **Analytics**             | Vercel Analytics + Speed Insights                             |

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

- Métricas do portfólio (projetos, deploys, artigos, áreas de estudo)
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

| Página       | pt-BR                 | en-US                 |
| ------------ | --------------------- | --------------------- |
| Home         | `/pt-BR`              | `/en-US`              |
| Blog         | `/pt-BR/blog`         | `/en-US/blog`         |
| Recruiter    | `/pt-BR/recruiter`    | `/en-US/recruiter`    |
| Changelog    | `/pt-BR/changelog`    | `/en-US/changelog`    |
| Now          | `/pt-BR/now`          | `/en-US/now`          |
| Media Kit    | `/pt-BR/media-kit`    | `/en-US/media-kit`    |
| Press Kit    | `/pt-BR/press-kit`    | `/en-US/press-kit`    |
| Status       | `/pt-BR/status`       | `/en-US/status`       |
| Architecture | `/pt-BR/architecture` | `/en-US/architecture` |
| Security     | `/pt-BR/security`     | `/en-US/security`     |
| Engineering  | `/pt-BR/engineering`  | `/en-US/engineering`  |
| GitHub       | `/pt-BR/github`       | `/en-US/github`       |

## Production Readiness

### Arquitetura

- Next.js 16 App Router com Server Components e i18n
- Stack preparada: PostgreSQL, Prisma, Auth.js (schema em `prisma/schema.prisma`)
- Página dedicada: [`/architecture`](/pt-BR/architecture)

### Segurança

- Security headers no middleware (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)
- Validação Zod no formulário de contato
- Página dedicada: [`/security`](/pt-BR/security)

### Observabilidade

- **Health check:** `GET /api/health` → `{ status, version, timestamp }`
- **Status page:** [`/status`](/pt-BR/status) — GitHub, blog, DB, analytics
- **Logger:** `src/lib/logger.ts` (info, warn, error) — pronto para Sentry/Datadog/Logtail
- **Audit log:** `src/lib/audit-log.ts` + modelo `AuditLog` no Prisma
- Vercel Analytics + Speed Insights

Documentação: [`docs/production-readiness.md`](docs/production-readiness.md)

## Production Review

Revisão final de conteúdo, links e prontidão para divulgação (LinkedIn, currículo, GitHub e processos seletivos).

| Área                       | Status                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| **Conteúdo real validado** | Nome, cargo, formação, projetos e objetivo profissional alinhados aos dados reais        |
| **Links revisados**        | GitHub, LinkedIn, Instagram, e-mail, deploys, currículos PT/EN e páginas institucionais  |
| **SEO**                    | Títulos bilíngues, keywords e metadata coerentes com posicionamento júnior               |
| **Acessibilidade**         | Alt text, aria-labels, foco visível, HTML semântico e contraste de tema                  |
| **Performance**            | Imagens otimizadas via Next/Image, fallback de cover, Vercel Speed Insights              |
| **Pronto para publicação** | Checklist completo em [`docs/final-review-checklist.md`](docs/final-review-checklist.md) |

## Documentação

| Arquivo                                                              | Conteúdo                 |
| -------------------------------------------------------------------- | ------------------------ |
| [`docs/launch-checklist.md`](docs/launch-checklist.md)               | Checklist de lançamento  |
| [`docs/seo-checklist.md`](docs/seo-checklist.md)                     | Validação SEO            |
| [`docs/accessibility-checklist.md`](docs/accessibility-checklist.md) | Acessibilidade           |
| [`docs/performance-audit.md`](docs/performance-audit.md)             | Performance e Lighthouse |
| [`docs/production-readiness.md`](docs/production-readiness.md)       | Production readiness     |
| [`docs/final-review-checklist.md`](docs/final-review-checklist.md)   | Revisão final LinkedIn   |

## Screenshots

| Seção           | Descrição                                                   |
| --------------- | ----------------------------------------------------------- |
| Hero            | Apresentação com CTAs e language switcher                   |
| Projetos        | Cards + seção Principais Projetos (StockFlow, Ticket Sales) |
| Recruiter       | Modo recrutador com resumo rápido                           |
| Blog            | Listagem e artigos técnicos                                 |
| Changelog / Now | Páginas de evolução e foco atual                            |

> Screenshots em `public/projects/{slug}/cover.png`. Fallback em `public/projects/default-cover.svg`.

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
