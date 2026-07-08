# docs/migration

Fichas y auditorías del traspaso de módulos/producto desde el repo `isaak` (legacy) a
este repo. Carpeta creada como parte del esqueleto de estructura — todavía sin contenido
migrado.

Fuente actual (repo `isaak`, Fase 0 del roadmap, hasta que se porte aquí):

- `docs/migration/current-state.md` — inventario completo de apps/packages del repo legacy
- `docs/migration/reusable-modules.md` — qué se puede portar tal cual, qué con revisión, qué
  hay que reescribir (grado de acoplamiento por módulo)
- `docs/migration/deprecated-modules.md` — qué NO migrar y por qué (`apps/client`, discriminador
  `gcbd`, dashboards duplicados, acoplamiento Holded-first en nombres de tipos, etc.)
- `docs/migration/vercel-inventory.md` — mapeo de proyectos/dominios/crons de Vercel
- `docs/migration/env-inventory.md` — variables de entorno por app (solo nombres, sin valores)

Regla heredada del roadmap: nada entra a este repo sin una ficha de migración explícita
(origen, destino, riesgo, estado) — no copiar carpetas completas.
