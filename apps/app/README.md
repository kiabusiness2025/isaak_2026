# apps/app

**Función:** producto autenticado — chat, historial, onboarding, settings ligeros.

Billing/entitlements viven en `packages/billing`, no aquí. Isaak aquí es chat + memoria +
contexto + acciones preparadas — **no** un dashboard lleno de menús (eso, si hace falta
en el futuro, es responsabilidad de `apps/admin`).

Rutas iniciales previstas (sin construir todavía):

```text
/app
/app/chat
/app/onboarding
/app/settings
/app/billing
/app/connections          (incluye /app/connections/holded — operativo, no marketing)
/app/support
```

Equivalente en el repo `isaak`:
`apps/app` (715 archivos, la mayor superficie de lógica de negocio) — mezcla de módulos
reutilizables, reutilizables-con-revisión y a reescribir; ver `docs/migration/reusable-modules.md`
en ese repo antes de portar nada.

Estado: esqueleto vacío (solo package.json de marcador), sin scaffolding de Next.js ni
código migrado todavía. No forma parte de `pnpm dev`/`build` real — sus scripts son
no-ops para que `pnpm validate` en la raíz siga en verde mientras se decide el diseño
real de esta app.
