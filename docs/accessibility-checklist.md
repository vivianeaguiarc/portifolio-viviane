# Checklist de Acessibilidade

Validação de a11y do portfólio.

## Navegação

- [x] Skip lógico via landmarks (`header`, `main`, `footer`, `nav`)
- [x] Menu mobile com `aria-expanded` e `aria-controls`
- [x] Language switcher com `aria-label` e `aria-pressed`
- [x] Theme toggle com labels descritivos
- [x] Navegação por teclado nos links e botões
- [x] Hash navigation com offset para header fixo

## Contraste e visual

- [x] Tokens de cor com contraste adequado (light/dark)
- [x] Texto `muted-foreground` legível em ambos os temas
- [x] Estados de foco visíveis (`focus-visible:ring`)
- [x] Ícones decorativos com `aria-hidden`

## Imagens e mídia

- [x] `alt` descritivo em fotos de perfil
- [x] `alt` em screenshots de projetos
- [x] Imagens OG com `alt` na metadata

## Formulários

- [x] Labels associados aos inputs de contato
- [x] Mensagens de erro de validação legíveis
- [x] `aria-label` em botões de envio

## Semântica HTML

- [x] Um `h1` por página
- [x] Hierarquia de headings (`h2`, `h3`) nas seções
- [x] Listas com `role="list"` onde aplicável
- [x] `article` em blog posts e case studies
- [x] `time` com `dateTime` em datas de artigos

## Componentes interativos

- [x] Botões vs links usados corretamente
- [x] Links externos com `rel="noopener noreferrer"`
- [x] Cards de projeto com `aria-label` nos CTAs

## Ferramentas de validação recomendadas

- Lighthouse Accessibility audit
- axe DevTools (browser extension)
- Navegação completa apenas com teclado (Tab, Enter, Escape)

## Melhorias futuras (opcional)

- [ ] Skip link “Ir para o conteúdo”
- [ ] `prefers-reduced-motion` para animações Framer Motion
- [ ] Testes automatizados com `@axe-core/playwright`
