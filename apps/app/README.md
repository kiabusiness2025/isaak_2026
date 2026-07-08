# apps/app

**Función:** producto autenticado — chat, historial, onboarding, settings ligeros.

Billing/entitlements viven en `packages/billing`, no aquí. Equivalente en el repo `isaak`:
`apps/app` (715 archivos, la mayor superficie de lógica de negocio) — mezcla de módulos
reutilizables, reutilizables-con-revisión y a reescribir; ver `docs/migration/reusable-modules.md`
en ese repo antes de portar nada.

Estado: esqueleto vacío (solo package.json de marcador), sin scaffolding de Next.js ni
código migrado todavía. No forma parte de `pnpm dev`/`build` real — sus scripts son
no-ops para que `pnpm validate` en la raíz siga en verde mientras se decide el diseño
real de esta app.
