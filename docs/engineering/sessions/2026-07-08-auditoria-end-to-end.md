# Auditoría end-to-end — 2026-07-08

> Repaso completo de todo lo implementado en `isaak_2026` durante la jornada del
> 2026-07-08 (desde el rediseño de personalidad del personaje hasta el arranque del
> traspaso de módulos desde `isaak` legacy), estado real verificado (no solo lo que dicen
> los PRs), gaps encontrados y próximos pasos propuestos. Ver `docs/migration/
> TRANSFER_PLAN_2026.md` y `docs/migration/module-inventory.md` para el detalle del plan
> de traspaso; este documento es el resumen ejecutivo del día y el punto de partida para
> la siguiente sesión.

## 1. Cronología del día (7 PRs mergeados + 1 abierto)

| PR | Hora | Título | Contenido |
| --- | --- | --- | --- |
| #3 | 12:43 | Retrato real del personaje Isaak + iconos de conectores | Fin de los placeholders de avatar; iconos genéricos `lucide-react` por categoría de conector |
| #4 | 14:43 | Organizar repo: CLAUDE.md + pack completo de assets de marca | Memoria del proyecto + migración organizada de `packages/brand/assets/` (logos, iconos, poses del personaje, fondos, referencia) |
| #5 | 16:01 | Parpadeo sutil + nuevo gesto "relajado" | 6 poses + parpadeo + pulso azul "vivo" en `IsaakCharacter.tsx` |
| #6 | 16:05 | Pase de rediseño WOW | Hover magnético en tarjetas flotantes, animación caos-a-claridad en `ProblemSection`, `MotionConfig reducedMotion="user"` global, ajustes de mobile |
| #7 | 19:31 | Esqueleto de estructura completa para el traspaso (Fase 5+) | `apps/{app,admin}` y `packages/{ui,config,auth,db,integrations,billing,analytics,testing}` como esqueleto vacío; +CIRCE en `official-sites.ts` |
| #8 | 19:52 | Inventario maestro de módulos + auditoría Fase 2 (billing) | `module-inventory.md`; auditoría línea a línea `isaak-entitlements.ts` vs `pricing.ts` → hallazgo crítico (ver §3) |
| #9 | abierto | Fase 3 — primer lote de componentes demo | `IsaakHeroTour.tsx` + `contact-links.ts` migrados y verificados; resto de candidatos auditados (3 descartados, 2 bloqueados) |

Todos los PRs pasaron por `validate` (lint + typecheck + build) en CI antes de mergear;
ninguno se mergeó sin autorización explícita del usuario.

## 2. Estado real verificado hoy (no solo "el PR dice que...")

Re-sincronicé `main` desde `origin` y corrí `pnpm install && pnpm validate` desde cero
sobre el estado post-PR#8 (el más reciente mergeado a esta hora):

```text
Tasks:    13 successful, 13 total   (lint + typecheck)
Tasks:     3 successful, 3 total   (build)
```

`apps/web` genera 26/26 páginas estáticas sin error. `apps/{app,admin}` y los 8 paquetes
de infraestructura (`ui/config/auth/db/integrations/billing/analytics/testing`) siguen
siendo esqueleto no-op intencional (Fase 5+, sin código real) — sus scripts imprimen
`pendiente de Fase 5+` y no fallan `pnpm validate`, tal como se diseñó.

PR #9 (no mergeado todavía): `validate` en verde, preview de Vercel desplegado,
0 comentarios de review sin resolver, sin conflictos con `main`.

## 3. Hallazgo crítico del día: conflicto real de modelo de precios

La auditoría Fase 2 (PR #8) encontró que `isaak-entitlements.ts` (legacy) y
`packages/content/src/pricing.ts` (ya escrito en `isaak_2026`) **no son reconciliables
por simple renombrado**:

1. Legacy cuenta cuota en **mensajes/mes 1:1** (300/400/600/1000). El pricing nuevo
   cuenta **créditos IA/mes de consumo variable** (100/500/1.000/2.500) — modelos de
   negocio distintos, no la misma cifra con otro nombre.
2. La etiqueta **"Profesional Total"** cambió de posición en la jerarquía de precios
   entre ambos documentos, y **"Personal Total"** no tiene equivalente en legacy.

Esto **bloquea** portar el catálogo de valores de `packages/billing` (aunque portar los
**tipos** ya es seguro) hasta que el usuario decida el modelo de cuota y confirme el
precio final de los tiers "Total". Detalle completo en `docs/migration/module-
inventory.md` §Fase 2 y ficha #1 de `verified-files.md`.

## 4. Gaps de documentación encontrados en esta auditoría (corregidos aquí)

- **`CLAUDE.md` desactualizado**: su sección "Estado" no mencionaba el esqueleto Fase 5+
  (PR #7), `module-inventory.md` (PR #8) ni el traspaso de componentes demo (PR #9) —
  corregido en este mismo commit.
- **Doble numeración de "Fase"**: `CLAUDE.md` usa "Fase 1-5+" para las etapas de
  construcción de `isaak_2026` desde cero (repo limpio → marca → web pública → Fase 5+
  app autenticada), mientras que `docs/migration/TRANSFER_PLAN_2026.md` usa "Fase 0-10"
  para las etapas del **traspaso de módulos** desde `isaak` legacy. Son dos escalas
  distintas que comparten nombre — riesgo real de confusión al leer ambos documentos por
  separado. Aclarado explícitamente en `CLAUDE.md` (ver cambio de esta sesión): cuando se
  hable de fases de traspaso, remitir siempre a "Fase N del plan de traspaso"
  (`TRANSFER_PLAN_2026.md`), nunca solo "Fase N" a secas.
- Este documento (`docs/engineering/sessions/`) es una carpeta nueva — no existía
  bitácora de sesiones en `isaak_2026` hasta ahora (sí existía en el repo `isaak` legacy).

## 5. Decisiones pendientes que solo puede tomar el usuario

| # | Decisión | Bloquea | Estado |
| - | --- | --- | --- |
| 1 | Modelo de cuota: mensajes 1:1 vs créditos ponderados; precio final de "Profesional Total"/"Personal Total" | `packages/billing` (Fase 2 del plan de traspaso, pasos 2.1/2.3/2.5) | Sin resolver |
| 2 | Logos reales de organismos oficiales (AEAT, Seguridad Social, SEPE, DEHú, CIRCE...) y apps de integración (Holded, Sage...) vs. iconografía genérica | Cualquier trabajo visual sobre `OfficialSitesConstellation`/`ConnectorIcon` más allá de lo ya construido | Sin resolver — recomendación dada (iconografía genérica, cero logos reales) pero no confirmada explícitamente |
| 3 | Merge de PR #9 | Cierre de Fase 3 (parcial) | En verde, esperando autorización |

## 6. Próximos pasos propuestos (en orden)

1. **Decidir el punto 1 de §5** — es el bloqueo real más caro de dejar sin resolver:
   cuantos más componentes de pricing/billing se construyan encima del modelo actual,
   más caro será cambiar de mensajes a créditos si se decide después.
2. **Mergear PR #9** si se aprueba, y completar el resto de Fase 3 pendiente:
   `IsaakHeroMock.tsx` (solo falta apuntar el avatar a `robot/isaak-bust-idle.png`) y,
   cuando exista una ruta de alta real, `IsaakOmniChatWidget.tsx`/`TalkChannels.tsx`.
3. **Fase 4 (Integraciones)** — empezar por los clientes ligeros sin acoplamiento
   (`stripe.ts`, `resend.ts`, `vercel.ts`, `github.ts`) antes que Holded, que es el más
   grande y necesita el rediseño `Connector*` genérico desde el primer commit.
4. **Resolver el punto 2 de §5** (logos) — bloquea menos que el punto 1, pero sigue
   abierto; conviene cerrarlo antes de construir cualquier página que muestre organismos
   oficiales con más detalle visual que la lista de texto actual.
5. **Fase 5 (Auth)** y **Fase 6 (DB/schema)** — no empiezan hasta que Fase 4 esté en
   marcha, tal como fija el orden de `TRANSFER_PLAN_2026.md`.

## 7. Verificación de esta auditoría

- `git fetch origin main && git reset --hard FETCH_HEAD` — confirmado el estado real de
  `main` post-PR#8 antes de auditar (no memoria de la conversación).
- `pnpm install && pnpm validate` desde cero — 13/13 lint+typecheck, 3/3 build, verde.
- `mcp__github__pull_request_read` (`get_check_runs`) sobre PR #9 — `validate` success,
  Vercel preview success, sin comentarios de review pendientes.
- `grep` de patrones de secretos sobre este documento y los archivos tocados — limpio.
