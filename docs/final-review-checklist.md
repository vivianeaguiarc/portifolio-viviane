# Checklist — Revisão Final para Publicação

Revisão concluída em **18/06/2025** para divulgação no LinkedIn, currículo, GitHub e processos seletivos.

## Dados profissionais revisados

- [x] Nome: **Viviane Aguiar Silva Simões**
- [x] Cargo: **Desenvolvedora Fullstack Júnior** / **Junior Fullstack Developer**
- [x] Foco: Node.js, TypeScript, React, Next.js, APIs REST, Java, Spring Boot e Arquitetura de Software
- [x] Objetivo profissional: Backend Júnior, Fullstack Júnior, Estágio ou Analista de Sistemas Júnior
- [x] Sem termos de senioridade incompatível

## Formação revisada

- [x] ADS — UNIASSELVI — 02/2019 a 12/2023 — Concluído
- [x] Pós-graduação em Arquitetura e Desenvolvimento de Sistemas com Ênfase em Padrões de Projetos — GRAN Faculdade — 12/2023 a 04/2025 — Concluído
- [x] Engenharia de Software — UNIASSELVI — 08/2025 a 12/2027 — Em andamento

## Projetos revisados

- [x] Ativos: StockFlow, Ticket Sales, Finance App, Portfolio Viviane
- [x] Em destaque: StockFlow, Ticket Sales, Portfolio Viviane
- [x] Tirei de Letra oculto (`HIDDEN_PROJECT_SLUGS`)
- [x] Métricas realistas (sem números exagerados)
- [x] Certificações inexistentes removidas da exibição

## Links revisados

| Link                | URL                                               | Status |
| ------------------- | ------------------------------------------------- | ------ |
| GitHub              | https://github.com/vivianeaguiarc                 | OK     |
| LinkedIn            | https://www.linkedin.com/in/vivianeaguiarc/       | OK     |
| Instagram           | https://www.instagram.com/vivianezzt/             | OK     |
| E-mail              | vivianeaguiarc@outlook.com                        | OK     |
| StockFlow deploy    | https://stock-flow-web-six.vercel.app/pt-BR/login | OK     |
| Ticket Sales deploy | https://ticket-sales-3su2.onrender.com/docs/      | OK     |
| Finance App deploy  | https://finance-app-i600.onrender.com/docs/       | OK     |
| Portfolio deploy    | https://portfolio-viviane.vercel.app              | OK     |
| Blog                | `/blog`                                           | OK     |
| Recruiter Mode      | `/recruiter`                                      | OK     |
| Case Studies        | `/projetos/[slug]` / `/projects/[slug]`           | OK     |
| GitHub Page         | `/github`                                         | OK     |
| Status              | `/status`                                         | OK     |
| Security            | `/security`                                       | OK     |
| Architecture        | `/architecture`                                   | OK     |

## Currículos revisados

- [x] PT-BR: `/resume/viviane-aguiar-cv-ptbr.pdf` — botão **Baixar currículo**
- [x] EN-US: `/resume/viviane-aguiar-cv-en.pdf` — botão **Download resume**
- [x] Links abrem em nova aba (`target="_blank"`)

## Imagens revisadas

- [x] `public/profile/viviane-2.jpg`
- [x] `public/projects/stockflow/cover.png`
- [x] `public/projects/ticket-sales/cover.png`
- [x] `public/projects/finance-app/cover.png`
- [x] `public/projects/portfolio-viviane/cover.png`
- [x] Fallback visual: `public/projects/default-cover.svg` via `ProjectCoverImage`
- [x] Estrutura `public/blog/` reservada

## SEO revisado

- [x] PT-BR: `Viviane Aguiar Silva Simões | Desenvolvedora Fullstack Júnior`
- [x] EN-US: `Viviane Aguiar Silva Simões | Junior Fullstack Developer`
- [x] Keywords: Node.js, TypeScript, React, Next.js, Java, Spring Boot, APIs REST, Backend, Fullstack, Software Architecture

## Blog revisado

Artigos mantidos (sem menções a projetos inativos):

- [x] RBAC / StockFlow
- [x] JWT
- [x] Multi-Tenant
- [x] Concorrência / Ticket Sales
- [x] Qualidade de código / Fullstack

## Mobile revisado

- [x] Grid responsivo no hero (1 col mobile → 2 col desktop)
- [x] Cards de projeto com grid adaptativo nos botões
- [x] Recruiter quick summary em colunas responsivas (`sm:grid-cols-2 lg:grid-cols-4`)
- [x] Tipografia escalonada (`text-4xl` → `xl:text-7xl`)
- [x] Botões com área de toque adequada (`size="sm"` + padding nos CTAs)

## Acessibilidade revisada

- [x] Alt text em imagens de perfil e projetos
- [x] `aria-label` em links sociais e CTAs com ícones
- [x] HTML semântico (`section`, `article`, `nav`, headings hierárquicos)
- [x] Foco visível via componentes shadcn/ui (`focus:ring-2`)
- [x] Navegação por teclado nos links e botões
- [x] Contraste via tokens de tema light/dark

## Build revisado

```bash
npm run lint
npm run type-check
npm run build
```

- [x] ESLint sem erros
- [x] TypeScript sem erros
- [x] Build de produção concluído

---

**Status:** Pronto para publicação oficial.
