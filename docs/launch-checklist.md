# Checklist de Lançamento

Use este checklist antes de divulgar o portfólio publicamente.

## Deploy e ambiente

- [x] Deploy funcionando (Vercel)
- [x] `NEXT_PUBLIC_SITE_URL` configurada em produção
- [x] Build de produção passando (`npm run build`)
- [x] CI no GitHub Actions passando

## Experiência

- [x] Mobile validado (layout responsivo)
- [x] Desktop validado
- [x] Dark/Light mode funcionando
- [x] Language switcher (pt-BR / en-US) funcionando
- [x] Links internos revisados
- [x] Links externos (GitHub, LinkedIn, deploys) revisados

## Conteúdo profissional

- [ ] Currículo PDF atualizado em `/public/curriculo-viviane.pdf`
- [ ] GitHub atualizado com README e projetos em destaque
- [ ] LinkedIn atualizado com link do portfólio
- [ ] Bio alinhada com Media Kit e Press Kit

## SEO e observabilidade

- [x] Metadata por página (title, description, canonical)
- [x] Open Graph e Twitter Cards
- [x] Sitemap multilíngue (`/sitemap.xml`)
- [x] Robots.txt apontando para sitemap
- [x] JSON-LD (Person, WebSite, BlogPosting, SoftwareApplication)
- [x] Vercel Analytics configurado
- [x] Vercel Speed Insights configurado
- [ ] Sitemap enviado ao Google Search Console
- [ ] Páginas indexadas verificadas

## Páginas de lançamento

- [x] `/changelog` — Release Notes
- [x] `/now` — Página Now
- [x] `/media-kit` — Media Kit
- [x] `/press-kit` — Press Kit para recrutadores
- [x] `/recruiter` — Modo Recrutador refinado

## Qualidade de código

- [x] `npm run lint` sem erros
- [x] `npm run type-check` sem erros
- [x] Husky + lint-staged ativos
- [x] Conventional Commits

## Pós-lançamento

- [ ] Compartilhar no LinkedIn
- [ ] Adicionar link no GitHub profile
- [ ] Monitorar Analytics nas primeiras 2 semanas
- [ ] Coletar feedback de recrutadores/contatos
