# Checklist SEO

Validação técnica de SEO do portfólio.

## Metadata

- [x] `metadataBase` configurado com URL de produção
- [x] Title template por idioma
- [x] Description única por página principal
- [x] `alternates.canonical` em todas as páginas
- [x] `alternates.languages` (pt-BR, en-US) em páginas localizadas

## Open Graph e Twitter

- [x] `openGraph.type`, `locale`, `url`, `title`, `description`
- [x] Imagem OG (`/og-image.svg`) 1200×630
- [x] `twitter:card` = `summary_large_image`
- [x] `twitter:creator` configurado

## Sitemap e robots

- [x] `/sitemap.xml` com home, blog, recruiter, changelog, now, media-kit, press-kit
- [x] URLs de projetos e artigos por locale
- [x] `alternates.languages` no sitemap
- [x] `/robots.txt` com `allow: /` e link do sitemap

## Structured Data (JSON-LD)

- [x] `Person` — layout global
- [x] `WebSite` — layout global
- [x] `BlogPosting` — artigos do blog
- [x] `SoftwareApplication` — case studies
- [x] `Person` enriquecido — Recruiter Mode
- [x] `inLanguage` conforme locale da página

## Internacionalização SEO

- [x] Rotas `/pt-BR` e `/en-US`
- [x] Redirect `/` → `/pt-BR`
- [x] Hreflang via `alternates.languages`
- [x] Open Graph locale: `pt_BR` / `en_US`

## Páginas indexáveis

| Página    | Rota                                               |
| --------- | -------------------------------------------------- |
| Home      | `/pt-BR`, `/en-US`                                 |
| Blog      | `/pt-BR/blog`, `/en-US/blog`                       |
| Projetos  | `/pt-BR/projetos/[slug]`, `/en-US/projects/[slug]` |
| Recruiter | `/pt-BR/recruiter`, `/en-US/recruiter`             |
| Changelog | `/pt-BR/changelog`, `/en-US/changelog`             |
| Now       | `/pt-BR/now`, `/en-US/now`                         |
| Media Kit | `/pt-BR/media-kit`, `/en-US/media-kit`             |
| Press Kit | `/pt-BR/press-kit`, `/en-US/press-kit`             |

## Ações recomendadas pós-deploy

1. Enviar sitemap no Google Search Console
2. Validar rich results com [Rich Results Test](https://search.google.com/test/rich-results)
3. Validar OG com [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
4. Monitorar indexação após 7–14 dias
