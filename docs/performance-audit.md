# Auditoria de Performance

## Resultados da auditoria (build local)

Auditoria executada em `http://localhost:3000/pt-BR` após `npm run build && npm run start`:

| Categoria      | Score |
| -------------- | ----- |
| Performance    | 65\*  |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 92\*  |

\* **Performance (65):** LCP elevado no ambiente local (8.5s) — comum em `localhost` sem CDN. Em produção na Vercel, espere score significativamente maior graças a edge caching, HTTP/2 e otimização de imagens.

\* **SEO (92):** canonical aponta para URL de produção (`metadataBase`), o que falha no audit local. Em produção com `NEXT_PUBLIC_SITE_URL` correto, o score deve atingir 95+.

> Após o deploy desta fase, reexecute o Lighthouse na URL de produção e atualize este documento.

## Objetivos Lighthouse

| Categoria      | Meta |
| -------------- | ---- |
| Performance    | > 95 |
| Accessibility  | > 95 |
| Best Practices | > 95 |
| SEO            | > 95 |

## Otimizações já aplicadas

### Rendering

- Server Components por padrão (App Router)
- Client Components apenas onde necessário (tema, formulário, animações, header)
- SSG com `generateStaticParams` para blog e projetos
- Middleware leve (next-intl locale detection)

### Imagens

- `next/image` com formatos AVIF/WebP (`next.config.ts`)
- `priority` na foto do hero e recruiter
- `sizes` responsivos nos cards e perfil
- Lazy loading implícito em imagens abaixo da dobra

### JavaScript

- Code splitting automático por rota
- Analytics e Speed Insights carregados via componente client isolado
- Dados estáticos em `src/data/` sem fetch em runtime

### CSS

- TailwindCSS 4 com purge automático
- Fontes Geist com `next/font` (sem layout shift)

### SEO / Performance cruzada

- Metadata estática por página
- Sitemap e robots gerados em build
- JSON-LD inline mínimo

## Como auditar localmente

```bash
npm run build
npm run start
```

Em outro terminal (com Lighthouse CLI instalado):

```bash
npx lighthouse http://localhost:3000/pt-BR --only-categories=performance,accessibility,best-practices,seo --view
```

Repita para `/en-US`, `/recruiter` e uma página de projeto.

## Produção

Audite a URL de produção após deploy:

```bash
npx lighthouse https://portfolio-viviane.vercel.app/pt-BR --preset=desktop
```

## Monitoramento contínuo

- **Vercel Speed Insights** — métricas reais (Core Web Vitals)
- **Vercel Analytics** — tráfego por página

## Melhorias futuras (se score < 95)

- `prefers-reduced-motion` nas animações Framer Motion
- Preload da fonte crítica
- Reduzir bundle do client no header (split LanguageSwitcher)
- OG image em PNG/WebP otimizado (substituir SVG se necessário para redes sociais)
