# Production Readiness

Documentação de observabilidade, segurança e qualidade operacional do portfólio.

## Health Check

```bash
curl https://portfolio-viviane.vercel.app/api/health
```

Resposta:

```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2026-06-18T12:00:00.000Z"
}
```

## Status Page

Rota `/status` exibe:

| Serviço   | Verificação                           |
| --------- | ------------------------------------- |
| GitHub    | GitHub API via `getGitHubDashboard()` |
| Blog      | Posts publicados em `src/data/blog/`  |
| Database  | `DATABASE_URL` configurada            |
| Analytics | Vercel Analytics + Speed Insights     |

## Security Headers

Aplicados em `src/middleware.ts` via `src/lib/security-headers.ts`:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`

## Logging

`src/lib/logger.ts` — JSON estruturado com níveis `info`, `warn`, `error`.

Integração futura: Sentry, Datadog, Logtail.

## Audit Log

Modelo Prisma em `prisma/schema.prisma`:

```prisma
model AuditLog {
  id        String   @id @default(uuid())
  action    String   // login | create | update | delete
  entity    String
  entityId  String?
  actorId   String?
  metadata  Json?
  createdAt DateTime @default(now())
}
```

Registro via `recordAuditLog()` em `src/lib/audit-log.ts` (logger até `DATABASE_URL` estar ativo).

## Error Boundaries

- `src/app/[locale]/error.tsx` — fallback global com retry
- `src/app/[locale]/not-found.tsx` — página 404

## Lighthouse

Meta: Performance, Accessibility, Best Practices e SEO > 95.

Auditar após deploy:

```bash
npx lighthouse https://portfolio-viviane.vercel.app/pt-BR --only-categories=performance,accessibility,best-practices,seo
```

Resultados locais variam; em produção na Vercel os scores tendem a ser superiores.

Ver também: [`performance-audit.md`](performance-audit.md)

## Páginas técnicas

| Rota            | Propósito                         |
| --------------- | --------------------------------- |
| `/status`       | Saúde operacional                 |
| `/architecture` | Stack e decisões                  |
| `/security`     | Práticas de segurança             |
| `/engineering`  | Princípios aplicados nos projetos |
