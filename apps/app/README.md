# apps/app

Producto autenticado: tenants, billing, MCP, OAuth. Equivalente en el repo isaak: apps/app (715 archivos, la mayor superficie de lógica de negocio). Mezcla de módulos reutilizables, reutilizables-con-revisión y a reescribir — ver docs/migration/reusable-modules.md en el repo isaak antes de portar nada.

Estado: esqueleto vacío (solo package.json de marcador), sin scaffolding de Next.js ni
código migrado todavía. No forma parte de `pnpm dev`/`build` real — sus scripts son
no-ops para que `pnpm validate` en la raíz siga en verde mientras se decide el diseño
real de esta app.
