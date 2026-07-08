# docs/migration

Fichas y auditorías del traspaso de módulos/producto desde el repo `isaak` (legacy) a
este repo.

- `TRANSFER_PLAN_2026.md` — plan de traspaso completo: prioridades, qué NO migrar de
  inicio, y las fases de ejecución.
- `module-inventory.md` — checklist maestra por módulo (origen, destino, fase, estado:
  pendiente/auditado/migrado/descartado), consolidando `reusable-modules.md` +
  `deprecated-modules.md` en orden de ejecución. Punto de partida para cada PR de
  traspaso — actualizar el estado de la fila al abrir/cerrar cada uno.
- `verified-files.md` — ficha de verificación obligatoria por archivo migrado (origen,
  destino, qué hace, por qué se conserva, dependencias, test ejecutado, resultado de
  build, riesgo, decisión). Nada entra a este repo sin pasar por aquí primero.
- `current-state.md` — inventario completo de apps/packages del repo `isaak` (Fase 0,
  copiado desde ese repo — fuente de verdad allí).
- `reusable-modules.md` — qué se puede portar tal cual, qué con revisión, qué hay que
  reescribir (grado de acoplamiento por módulo).
- `deprecated-modules.md` — qué NO migrar y por qué (`apps/client`, discriminador `gcbd`,
  dashboards duplicados, acoplamiento Holded-first en nombres de tipos, etc.).
- `vercel-inventory.md` — mapeo de proyectos/dominios/crons de Vercel.
- `env-inventory.md` — variables de entorno por app (solo nombres, sin valores).

Regla: nada entra a este repo sin una ficha en `verified-files.md` — no copiar carpetas
completas, y **copiar, nunca mover** (el repo `isaak` sigue siendo la fuente productiva
mientras dure el traspaso).

Bitácora de progreso día a día (qué se auditó/migró, hallazgos, gaps encontrados): ver
`docs/engineering/sessions/`.
