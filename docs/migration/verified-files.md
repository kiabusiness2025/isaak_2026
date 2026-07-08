# Ficha de verificación de archivos migrados

> Regla de oro: **nada entra a este repo sin pasar por esta ficha primero.** Cada archivo
> (o módulo pequeño y cohesionado) migrado desde `isaak` debe tener una entrada aquí antes
> de mergearse, no después.
>
> Se **copia, nunca se mueve** — `isaak` (legacy) sigue siendo la fuente productiva mientras
> dure el traspaso; nada se borra de allí como parte de este proceso.

---

## Plantilla

```text
### <n>. <nombre corto del módulo>

- Origen: <ruta exacta en el repo isaak>
- Destino: <ruta exacta en isaak_2026>
- Qué hace: <1-2 frases>
- Por qué se conserva: <motivo — buen patrón, dato de negocio validado, etc.>
- Dependencias: <qué arrastra — Prisma, Holded, tipos de otro módulo...>
- Test ejecutado: <comandos reales, no genéricos>
- Resultado de build: <pnpm build/lint/typecheck — pegar resultado real, no "OK" a secas>
- Riesgo: <bajo / medio / alto — y por qué>
- Decisión: <migrar tal cual / migrar con adaptación / reescribir / descartar>
- PR: <link cuando exista>
```

Estado válido de una entrada mientras no se haya ejecutado la migración real: `pendiente`
en vez de un resultado de build inventado. No rellenar "Test ejecutado"/"Resultado de
build" con datos que no se han corrido de verdad.

---

## Entradas

### 1. `isaak-entitlements.ts` → `packages/billing/src/entitlements.ts`

- Origen: `apps/isaak/app/lib/isaak-entitlements.ts` (345 líneas)
- Destino: `packages/billing/src/entitlements.ts`
- Qué hace: define planes, cuotas, features y gating — módulo puro, documentado
  explícitamente sin Prisma.
- Por qué se conserva: es la fuente más clara de planes/límites que existe hoy; buen
  patrón (separar catálogo de tiers/features de la lógica de negocio).
- Dependencias: ninguna de Prisma directamente, pero el catálogo de planes está atado a
  specifics de Holded/AEAT/VeriFactu que hay que reconciliar contra
  `packages/content/src/pricing.ts` (que ya define un modelo de precios propio y más
  reciente para Isaak Retro — ver Fase 2 del plan).
- Test ejecutado: auditoría manual línea a línea contra `packages/content/src/pricing.ts`
  (no es ejecución de tests — no hay build que correr todavía, es lectura comparada de
  ambos archivos completos).
- Resultado de build: no aplica (no se ha portado código todavía, solo se comparó).
- Riesgo: **alto**, no medio — la auditoría encontró dos conflictos de producto reales,
  no solo de nombres:
  1. Legacy cuenta cuota en **mensajes/mes** 1:1 (300/400/600/1000). El pricing ya escrito
     en `isaak_2026` cuenta **créditos IA/mes** de consumo variable (100/500/1.000/2.500).
     Son modelos de negocio distintos.
  2. La etiqueta "Profesional Total" cambió de posición: en legacy es el tier de
     sedes/DEHú/certificado a 49€/490€; en el pricing nuevo ese precio y esas features de
     empresa las tiene "Profesional Avanzado" (ya activo), y "Profesional Total" pasó a
     ser un tier superior nuevo con precio sin definir. "Personal Total" no existe en
     legacy en absoluto.
  Detalle completo en `docs/migration/module-inventory.md` §Fase 2, hallazgo crítico.
- Decisión: migrar con adaptación, pero **solo la forma** por ahora (tipos `PlanTier` /
  `Feature` / `QuotaPolicy`, funciones `tierHasFeature` / `resolveQuotaPolicy`). El
  catálogo de valores **no se porta** hasta que el usuario confirme explícitamente: (a) si
  el modelo de negocio pasa a créditos ponderados en vez de mensajes 1:1, y (b) el precio
  final de "Profesional Total"/"Personal Total". Sin esa confirmación, portar los valores
  fijaría en código un catálogo que ya sabemos que no coincide con lo publicado.
- PR: —

### 2. `isaak-pricing-content.ts` → `packages/content/src/pricing.ts`

- Origen: `apps/isaak/app/lib/isaak-pricing-content.ts` (227 líneas)
- Destino: no aplica como copia directa — `packages/content/src/pricing.ts` ya existe en
  `isaak_2026` y fue reescrito desde cero siguiendo `ISAAK_RETRO_PRICING_POLICY_2026.md`
  (9 planes en 3 pestañas: Personal, Profesional, Asesorías).
- Qué hace (origen): deriva copy de precios desde `isaak-entitlements.ts` — buen patrón
  (separar números de copy), pero el catálogo fuente es el antiguo.
- Por qué NO se migra tal cual: el pricing de `isaak_2026` ya es una decisión de producto
  posterior y más elaborada; migrar este archivo lo pisaría.
- Dependencias: `isaak-entitlements.ts`.
- Test ejecutado: no aplica.
- Resultado de build: no aplica.
- Riesgo: bajo (decisión ya tomada, no queda ambigüedad).
- Decisión: **descartar** — usar como referencia histórica si hace falta, no migrar.
- PR: —

### 3. `IsaakHeroTour.tsx` → `apps/web/components/demo/IsaakHeroTour.tsx`

- Origen: `apps/isaak/app/components/IsaakHeroTour.tsx` (841 líneas)
- Destino: `apps/web/components/demo/IsaakHeroTour.tsx`
- Qué hace: tour animado de 8 escenarios (4 profesional + 4 personal) con datos de
  ejemplo hardcodeados — mockup de navegador con chat + panel de "artifact" (gráficos
  SVG, tarjetas de cálculo, descargas simuladas). Sin `fetch`, sin dependencias externas
  más allá de React.
- Por qué se conserva: único candidato de Fase 3 100% autocontenido y sin bloqueo de
  producto (a diferencia de `IsaakOmniChatWidget`/`TalkChannels`, no depende de una ruta
  de alta que todavía no existe).
- Dependencias: ninguna — ni Prisma, ni fetch, ni rutas de otras apps.
- Test ejecutado: `pnpm --filter @isaak/web typecheck`, `pnpm --filter @isaak/web lint`,
  `pnpm --filter @isaak/web build` (los tres, tras portar).
- Resultado de build: los tres comandos en verde; `/demo` y el resto de rutas estáticas
  siguen generándose igual (26/26 páginas) — el componente no está aún importado en
  ninguna página, así que no cambia ningún bundle todavía.
- Riesgo: bajo — cambio es aditivo (archivo nuevo, nadie lo importa todavía).
- Decisión: **migrar con adaptación** — repaletizado de los hex de marca legacy
  (`#2361d8`→`isaak-blue`, `#011c67`→`chocolate`) a los tokens de `packages/brand`; el
  dominio de ejemplo del mockup de navegador pasa de `isaak.app`/`app.isaak.app` a
  `isaak.es`/`app.isaak.es`. Pendiente como paso siguiente (no parte de esta ficha):
  decidir en qué página se usa y con qué copy alrededor.
- PR: —

### 4. `isaak-contact-links.ts` → `packages/content/src/contact-links.ts`

- Origen: `apps/isaak/app/lib/isaak-contact-links.ts` (13 líneas)
- Destino: `packages/content/src/contact-links.ts`
- Qué hace: constantes de destino de WhatsApp/Telegram con override por variable de
  entorno (`NEXT_PUBLIC_WHATSAPP_URL`/`NEXT_PUBLIC_TELEGRAM_URL`).
- Por qué se conserva: es la dependencia compartida que necesitan `IsaakOmniChatWidget`
  y `TalkChannels` (3.3/3.4b) cuando se desbloqueen; migrarla ahora evita que ambos
  vuelvan a implementar el mismo dato por separado.
- Dependencias: ninguna — módulo puro, sin Prisma ni fetch. Requirió añadir
  `@types/node` como devDependency de `packages/content` (no estaba, y `process.env`
  no tipaba sin él).
- Test ejecutado: `pnpm --filter @isaak/content typecheck`.
- Resultado de build: en verde tras añadir `@types/node`.
- Riesgo: bajo — sin cambios de lógica respecto al origen.
- Decisión: **migrar tal cual** (solo cambia la ruta del archivo, no el contenido).
- PR: —

---

_Añadir una entrada nueva por cada archivo/módulo antes de abrir el PR que lo introduce,
no después. Las entradas "pendiente" no autorizan a mergear código — solo documentan la
intención hasta que la migración real se ejecute y se rellenen test/build/riesgo con
datos reales._
