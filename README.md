# Portfolio Viviane

Portfólio profissional moderno para apresentação de uma Desenvolvedora Fullstack, com foco em recrutadores e empresas de tecnologia.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)

## Descrição

Aplicação web de portfólio construída com as melhores práticas de engenharia de software corporativa. Inclui seções de apresentação, projetos, formação acadêmica, certificações, stack tecnológica e formulário de contato com validação.

### Funcionalidades

- Design moderno estilo SaaS com Dark Mode e Light Mode
- Totalmente responsivo (mobile-first)
- Micro animações com Framer Motion
- SEO otimizado (metadata, Open Graph, Twitter Cards, sitemap, robots.txt, JSON-LD)
- Formulário de contato com React Hook Form + Zod
- Lazy loading de imagens
- Server Components onde possível
- CI/CD com GitHub Actions

## Tecnologias

| Categoria   | Tecnologias                                      |
| ----------- | ------------------------------------------------ |
| Framework   | Next.js 16 (App Router)                          |
| Linguagem   | TypeScript (Strict Mode)                         |
| Estilização | TailwindCSS 4                                    |
| UI          | shadcn/ui                                        |
| Animações   | Framer Motion                                    |
| Formulários | React Hook Form + Zod                            |
| Ícones      | Lucide React (+ SVGs de marcas em `brand-icons`) |
| Tema        | next-themes                                      |
| Qualidade   | ESLint, Prettier, Husky, lint-staged, Commitlint |

## Arquitetura

O projeto segue uma arquitetura baseada em componentes reutilizáveis com separação clara entre UI, dados e lógica:

```
src/
├── app/                    # Rotas e layouts (App Router)
│   ├── layout.tsx          # Layout raiz com providers
│   ├── page.tsx            # Página principal
│   ├── sitemap.ts          # Sitemap dinâmico
│   └── robots.ts           # Robots.txt dinâmico
├── components/
│   ├── ui/                 # Componentes base (shadcn/ui)
│   ├── sections/           # Seções da página (Hero, Sobre, etc.)
│   └── shared/             # Componentes compartilhados (Header, Footer)
├── data/                   # Dados estáticos (projetos, formação, etc.)
├── hooks/                  # Custom hooks
├── lib/                    # Utilitários e configurações (SEO, cn)
├── types/                  # Tipos TypeScript
├── constants/              # Constantes globais (site, links sociais)
└── styles/                 # Estilos globais e tokens CSS
```

### Princípios

- **Componentes desacoplados**: cada seção é independente e reutilizável
- **Separação de responsabilidades**: dados em `data/`, tipos em `types/`, UI em `components/`
- **Server Components por padrão**: Client Components apenas quando necessário (animações, formulários, tema)
- **Path aliases**: imports com `@/` para melhor legibilidade

## Scripts

| Comando                | Descrição                            |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Inicia o servidor de desenvolvimento |
| `npm run build`        | Gera build de produção               |
| `npm run start`        | Inicia servidor de produção          |
| `npm run lint`         | Executa ESLint                       |
| `npm run lint:fix`     | Corrige problemas do ESLint          |
| `npm run format`       | Formata código com Prettier          |
| `npm run format:check` | Verifica formatação                  |
| `npm run type-check`   | Verifica tipos TypeScript            |

## Como Executar

### Pré-requisitos

- Node.js 20+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/viviane-dev/portfolio-viviane.git
cd portfolio-viviane

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Variáveis de Ambiente

| Variável               | Descrição                 | Padrão                                 |
| ---------------------- | ------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (SEO) | `https://portfolio-viviane.vercel.app` |

## Deploy

### Vercel (recomendado)

1. Conecte o repositório na [Vercel](https://vercel.com)
2. Configure `NEXT_PUBLIC_SITE_URL` com a URL de produção
3. Deploy automático a cada push na branch `main`

### Build manual

```bash
npm run build
npm run start
```

## Screenshots

> Substitua os placeholders SVG em `public/projects/` por screenshots reais dos projetos.

| Seção         | Descrição                                                          |
| ------------- | ------------------------------------------------------------------ |
| Hero          | Apresentação com CTAs para LinkedIn, GitHub, currículo e Instagram |
| Projetos      | Cards responsivos com tecnologias, conceitos e links               |
| Formação      | Timeline acadêmica interativa                                      |
| Certificações | Grid de certificados por categoria                                 |
| Stack         | Tecnologias organizadas por categoria                              |
| Contato       | Links sociais + formulário validado                                |

## CI/CD

O workflow `.github/workflows/ci.yml` executa automaticamente em push e pull requests:

1. **Install** — `npm ci`
2. **Lint** — `npm run lint`
3. **Type Check** — `npm run type-check`
4. **Build** — `npm run build`

Dependabot configurado para atualizações semanais de dependências.

## Commits

Este projeto utiliza [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona seção de projetos
fix: corrige validação do formulário
docs: atualiza README
chore: atualiza dependências
```

Hooks configurados:

- **pre-commit**: lint-staged (ESLint + Prettier)
- **commit-msg**: commitlint

## Personalização

1. Atualize `src/constants/site.ts` com links sociais e URL
2. Edite `src/data/profile.ts` com suas informações
3. Adicione projetos em `src/data/projects.ts`
4. Substitua screenshots em `public/projects/`
5. Adicione seu currículo em `public/curriculo-viviane.pdf`

## Licença

Este projeto é de uso pessoal. Todos os direitos reservados.
