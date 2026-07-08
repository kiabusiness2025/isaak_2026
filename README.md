# Isaak 2026 (Isaak Retro)

Monorepo limpio para la nueva identidad de Isaak: **el primer personaje inteligente de gestión fiscal, administrativa y empresarial que habla con tus programas y entiende las sedes electrónicas.**

Este repo nace deliberadamente vacío de deuda histórica. Es el destino de la migración progresiva descrita en `kiabusiness2025/isaak` → `docs/product/ISAAK_RETRO_ROADMAP_2026.md` y `docs/product/ISAAK_RETRO_CLEAN_COPY_MASTER_PROMPT_2026.md`.

## Dominios propuestos

- `isaak.es` — web pública (`apps/web`)
- `app.isaak.es` — producto autenticado (`apps/app`, futuro)
- `admin.isaak.es` — backoffice (`apps/admin`, futuro)

## Estructura

```text
apps/
  web/           Web pública Next.js App Router — V1 estática
packages/
  brand/         Tokens visuales (colores, tipografía, motion) + assets del personaje Isaak
  content/       Copy versionado (home, pricing, FAQ, conectores, sedes, modelos AEAT)
```

Ver `CLAUDE.md` para el desglose completo de `apps/web/components/`, el sistema de
poses del personaje Isaak, y las convenciones del proyecto.

## Reglas de migración

1. No se copian carpetas completas del repo `isaak` anterior.
2. Se migra por whitelist, módulo a módulo, con ficha de origen/destino/riesgo.
3. Ningún conector domina la narrativa — todos son "uno más".
4. Ninguna acción sensible se ejecuta sin confirmación humana explícita ("Isaak prepara. Tú confirmas.").
5. Cero secretos en este repo. `.env.example` no debe tener valores reales.

## Comandos

```bash
pnpm install
pnpm dev        # todas las apps en paralelo
pnpm build
pnpm lint
pnpm typecheck
pnpm validate   # lint + typecheck + build
```

## Estado

- [x] Fase 1 — Repo limpio + tooling
- [x] Fase 2 — Marca Retro (`packages/brand`)
- [x] Fase 3 — Web pública V1 (`apps/web`)
- [x] Fase 3.5 — Personaje real (6 poses) + iconos de conectores
- [ ] Fase 4 — Base de conocimiento oficial
- [ ] Fase 5+ — App autenticada, billing, conectores, admin
