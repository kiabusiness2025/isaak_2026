# Isaak 2026 — Plan de traspaso desde `isaak` (legacy)

> Regla base, sin excepciones: **se copia, nunca se mueve.** `isaak` (legacy,
> `kiabusiness2025/isaak`) sigue siendo la fuente productiva — `isaak.app` sigue
> funcionando sin cambios durante todo el traspaso. Nada se borra ni se modifica allí
> como parte de este proceso.
>
> Última actualización: 2026-07-08.

---

## 1. Prioridad de migración

| Origen actual | Destino nuevo | Criterio |
| --- | --- | --- |
| `apps/isaak` | `apps/web` y `apps/app` | Solo componentes limpios, copy validado, pricing y demo |
| `apps/isaak/app/lib/isaak-entitlements.ts` | `packages/billing` | Es fuente clara de planes y límites |
| `apps/isaak/app/lib/isaak-pricing-content.ts` | `packages/content/pricing` | Buen modelo comercial, pero revisar inconsistencias |
| Assets de marca nuevos | `packages/brand` y `apps/web/public` | Robot, fondos, logos, cards |
| Componentes demo útiles | `apps/web/components/demo` | Solo si compilan y no arrastran lógica vieja |
| Integraciones Holded verificadas | `packages/integrations/holded` | Solo APIs probadas |
| Auth/sesión compartida | `packages/auth` | Reescritura cuidadosa, no copia masiva |
| DB/schema canónico | `packages/db` | Solo después de auditar `apps/app/prisma/schema.prisma` |

## 2. No migrar de inicio

| No migrar todavía | Motivo |
| --- | --- |
| `apps/client` | Ya está marcado como legacy/congelado en la documentación actual |
| Dashboards duplicados | Mantienen el problema de triple mantenimiento |
| Código de Holded como producto final | Holded debe ser entrada/conector, no dashboard principal |
| Admin completo | Migrarlo después, cuando web + app estén estables |
| Scripts antiguos de vídeo/Sora | Separarlos como marketing tooling, no mezclarlos con producto |
| Variables `.env` antiguas | Crear envs limpios desde cero |

El plan actual del repo `isaak` ya identifica riesgos como triple mantenimiento,
fragmentación de auth, acoplamiento cruzado y lenguaje de producto incoherente — ver
`deprecated-modules.md` en esta misma carpeta para el detalle módulo a módulo.

## 3. Regla de oro: nada sin ficha de verificación

Todo archivo/módulo migrado necesita una entrada en `docs/migration/verified-files.md`
**antes** de mergear el PR que lo introduce, con: origen, destino, qué hace, por qué se
conserva, dependencias, test ejecutado, resultado de build, riesgo y decisión
(migrar / migrar con adaptación / reescribir / descartar). Ver ese archivo para la
plantilla y los dos primeros casos ya trabajados (`isaak-entitlements.ts`,
`isaak-pricing-content.ts`).

## 4. Fases

### Fase 0 — Auditoría y congelación controlada ✅ completada

Objetivo: entender qué existe antes de tocar nada. `isaak.app` sigue funcionando sin
cambios durante toda esta fase (y todas las siguientes).

Entregables (ya generados en el repo `isaak`, copiados aquí en este mismo commit):

- `current-state.md` — inventario completo de apps/packages
- `vercel-inventory.md` — dominios/proyectos/crons de Vercel
- `env-inventory.md` — variables de entorno por app (solo nombres)
- `reusable-modules.md` — módulos candidatos, con grado de acoplamiento
- `deprecated-modules.md` — qué no migrar y por qué

### Fase 1 — Marca y estructura ✅ completada

- `packages/brand` con tokens de color/tipografía/motion y el pack completo de assets
  (logos, iconos, poses del personaje, fondos, referencia) — ver
  `packages/brand/assets/INVENTORY.md`.
- Esqueleto de monorepo listo para recibir el resto: `apps/{web,app,admin}`,
  `packages/{ui,brand,config,content,auth,db,integrations,billing,analytics,testing}`,
  `docs/`, `scripts/`.

### Fase 2 — Billing y pricing (siguiente fase activa)

1. Auditar `apps/isaak/app/lib/isaak-entitlements.ts` contra el modelo de pricing ya
   vigente en `packages/content/src/pricing.ts` (9 planes / 3 pestañas, decisión de
   producto posterior a `isaak-pricing-content.ts` — ver ficha #2 en
   `verified-files.md`, decisión: descartar el archivo de origen, no el concepto).
2. Portar la **forma** de `isaak-entitlements.ts` (tipos de tiers/features/gating) a
   `packages/billing/src/entitlements.ts`, con el catálogo de valores reescrito para
   coincidir con `packages/content/src/pricing.ts`, no con el catálogo antiguo.
3. Ficha de verificación obligatoria antes de abrir el PR (ver ficha #1).
4. Validar: `pnpm lint && pnpm typecheck && pnpm build` en verde + revisión manual de que
   los precios coinciden con los ya publicados en `/precios`.

### Fase 3 — Componentes demo

1. Revisar en `apps/isaak/app/components/` los candidatos de bajo acoplamiento ya
   identificados en `reusable-modules.md` §1 (`IsaakHeroMock.tsx`, `IsaakHeroTour.tsx`,
   `IsaakOmniChatWidget.tsx`, `FaqAccordion.tsx`, `ComparisonTable.tsx`, etc.).
2. Migrar solo lo que **compile de forma autocontenida** (datos hardcodeados en el propio
   componente, sin `fetch` a `/api/*`) a `apps/web/components/demo/`.
3. `IsaakDemoChat.tsx`, `ActionPreparedPanel.tsx`, `ConfirmationMoment.tsx` ya existen en
   `isaak_2026` como construcciones nuevas (no migradas) — este paso es sobre añadir,
   no reemplazar lo que ya funciona.
4. Ficha de verificación por componente migrado.

### Fase 4 — Integraciones (Holded primero, connector-neutral desde el diseño)

1. Auditar `packages/integrations/holded/*` en `isaak` — son 8 archivos, la integración
   más madura, pero **por diseño acoplada a Holded** (tipos `Holded*`).
2. Migrar solo las llamadas de API ya probadas en producción a
   `packages/integrations/holded`, pero definiendo los tipos compartidos como
   `Connector*` genéricos desde el primer commit (no `Holded*`) — Holded es una
   implementación entre varias, nunca el nombre del contrato. Ver
   `deprecated-modules.md` §2 para el detalle de por qué esto importa.
3. El resto de conectores (Google, Microsoft, AEAT, WhatsApp) se diseñan sobre ese mismo
   contrato genérico, no se migran desde `isaak` (allí viven sueltos en
   `apps/isaak/app/lib/`, sin paquete compartido — ver `reusable-modules.md` §4).

### Fase 5 — Auth (reescritura cuidadosa)

1. Leer `packages/auth` en `isaak` completo (10 archivos, el más pequeño de los
   paquetes de infraestructura) como referencia de diseño.
2. **No copiar en bloque.** Reescribir sobre las necesidades reales de `apps/app`/
   `apps/admin` en `isaak_2026`, portando solo los fragmentos que se verifiquen
   explícitamente vía ficha.

### Fase 6 — DB / schema canónico

1. Auditar `apps/app/prisma/schema.prisma` (424 líneas) completo antes de mover una sola
   línea — entender qué modelos son núcleo de producto vs. deuda acumulada.
2. Solo entonces decidir qué migra a `packages/db`, con ficha de verificación por modelo
   o grupo de modelos relacionados (no todo el schema de una vez).
3. Excluir explícitamente el discriminador legacy `gcbd` de `SeConnection.provider` (ver
   `deprecated-modules.md` §5) — el nuevo discriminador nace con `saltedge` /
   `enablebanking` únicamente.

### Fase 7 — Admin (deferida)

- No se toca hasta que `apps/web` + `apps/app` estén estables en producción.
- Al reconstruir, usar `apps/admin/app/(admin)/*` del repo `isaak` como fuente de verdad
  — **no** `apps/admin/app/dashboard/admin/*` (árbol obsoleto tras un rename, ver
  `deprecated-modules.md` §4).

---

## 5. Próximo paso concreto

Fase 2, paso 1: auditar `isaak-entitlements.ts` línea a línea contra
`packages/content/src/pricing.ts` y decidir qué tipos/estructuras se portan. Es el primer
elemento de la tabla de prioridades después de brand/estructura (ya completos).
