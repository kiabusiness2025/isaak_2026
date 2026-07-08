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
- Test ejecutado: pendiente (no migrado todavía).
- Resultado de build: pendiente.
- Riesgo: medio — el patrón es bueno, pero el catálogo de planes tiene que reescribirse
  para no chocar con el pricing ya definido en `isaak_2026`.
- Decisión: migrar con adaptación (portar la forma del módulo — tipos, estructura de
  tiers/features —, no el catálogo de valores tal cual).
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

---

_Añadir una entrada nueva por cada archivo/módulo antes de abrir el PR que lo introduce,
no después. Las entradas "pendiente" no autorizan a mergear código — solo documentan la
intención hasta que la migración real se ejecute y se rellenen test/build/riesgo con
datos reales._
