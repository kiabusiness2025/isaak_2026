# apps/admin

**Función:** backoffice interno, soporte, auditoría.

Equivalente en el repo `isaak`: `apps/admin` (291 archivos). Aviso de la auditoría:
`apps/admin` tiene dos árboles de dashboard en paralelo — usar `(admin)/*` como fuente de
verdad, no `dashboard/admin/*` (obsoleto tras un rename), ver
`docs/migration/deprecated-modules.md` §4 en ese repo.

Estado: esqueleto vacío (solo package.json de marcador), sin scaffolding de Next.js ni
código migrado todavía. No forma parte de `pnpm dev`/`build` real — sus scripts son
no-ops para que `pnpm validate` en la raíz siga en verde mientras se decide el diseño
real de esta app.
