# Propuesta de política de precios — cierre de la decisión Fase 2

> **Estado: PROPUESTA, pendiente de confirmación explícita.** Este documento no cambia
> `packages/content/src/pricing.ts` ni crea ningún Price ID de Stripe — es la resolución
> propuesta al hallazgo crítico documentado en `docs/migration/module-inventory.md`
> §Fase 2 y ficha #1 de `verified-files.md`. En cuanto se confirme (o se ajuste y luego
> se confirme), se implementa en un PR aparte que sí toca código.
>
> Fecha: 2026-07-08.

## 1. Unidad de cuota: créditos ponderados (confirmar mantener el modelo ya publicado)

**Propuesta: mantener créditos IA/mes con consumo variable por acción**, el modelo que ya
está en `/precios` desde ayer. No volver a mensajes 1:1 de legacy.

Motivos (ya documentados, resumidos aquí para que la decisión quede en un solo sitio):

1. Ya es una promesa pública desde ayer — revertirlo es corregir precio ya publicado, no
   un cambio interno.
2. `docs/product/VIABILITY_STUDY_COSTES_2026.md` §8 confirma con precios reales de
   Anthropic que los créditos ponderados reflejan mucho mejor el coste real por acción
   (una revisión de documento cuesta ~30× más tokens que una pregunta simple; el modelo de
   créditos ya cobra 5-30× más por esa acción, el de mensajes 1:1 cobra lo mismo).
3. Habilita una línea de ingresos ya diseñada (`creditsSection`: packs de 100/500/2.000
   créditos) que no tiene sentido bajo mensajes 1:1.

**Si no confirmas esto explícitamente, no se toca `packages/billing` — se queda bloqueado
tal como está hoy.**

## 2. Precio de "Personal Total" y "Profesional Total" (hoy "Por definir")

Propuesta concreta, siguiendo el mismo patrón "anual = 10× mensual (2 meses gratis)" que
ya usan todos los demás planes:

| Plan | Precio/mes propuesto | Precio/año propuesto | Créditos IA/mes propuestos |
| --- | --- | --- | --- |
| Personal Total | **24 €** | **240 €** | 1.000 |
| Profesional Total | **79 €** | **790 €** | 4.000 |

### Razonamiento

- **No es pricing por coste de IA** — bajo cualquiera de estos dos precios el margen
  bruto de IA seguiría por encima del 90% (ver §2 del estudio de viabilidad: incluso 4.000
  créditos/mes cuestan ~8-10 € en tokens de Anthropic). El coste de IA no es lo que
  justifica el precio de estos dos tiers.
- **Es pricing por valor/riesgo regulatorio.** Sedes electrónicas + DEHú + certificado
  digital + presentación guiada ante AEAT es una categoría de feature distinta a todo lo
  demás del catálogo: implica actuar (aunque con confirmación humana) sobre trámites
  oficiales reales. `packages/content/src/copy-guardrails.ts` ya marca "presentación
  automática de impuestos" y "responsabilidad legal ante notificaciones oficiales" como
  `requiresLegalReview` — es decir, este tier trae consigo una carga de soporte y revisión
  legal que los demás planes no tienen, y el precio debe reflejarlo, no solo el coste de
  tokens.
- **Jerarquía de precios coherente**: Profesional Total (79€) queda claramente por encima
  de Profesional Avanzado (49€, ya activo) — la brecha de 30€ marca que es un salto de
  categoría (de "más cuota y más funciones de empresa" a "acceso a sedes oficiales"), no
  un simple escalón más. Personal Total (24€) queda entre Personal (15€) y Profesional
  (29€) — coherente con ser la versión "particular" de la misma categoría de riesgo/valor.
- **Por qué NO son precios idénticos entre Personal Total y Profesional Total**: el
  volumen y complejidad esperados en el caso profesional (más documentos, más
  interacciones con sedes, soporte a empresa) son mayores — de ahí créditos y precio más
  altos en la versión profesional.

## 3. Estado de lanzamiento: NO activar todavía — mantener "Próximamente"

**Propuesta: fijar el precio (arriba) pero mantener el badge "Próximamente" / lista de
espera, NO crear Price ID de Stripe todavía.**

Motivo: sedes electrónicas + DEHú + certificado digital + presentación directa requieren
integración real con AEAT/DEHú (Fase 4 del plan de traspaso, ni empezada) y con el
proveedor de certificado digital — nada de eso existe hoy en `isaak_2026`. Vender una
suscripción de pago para una feature que no existe es el escenario que el propio plan de
traspaso ya advertía evitar (Fase 2, paso 5: "no crear Price IDs para un estado que
todavía no está decidido"). Fijar el precio ahora sí tiene valor — deja de mostrar "Por
definir" en una página pública, que transmite indecisión — pero venderlo activamente no.

**Cuándo pasar a "activo"**: cuando la integración de sedes/DEHú/certificado (Fase 4-5 del
plan de traspaso) esté funcionalmente lista y verificada, no antes.

## 4. Qué se desbloquea al confirmar esto

Con (1), (2) y (3) confirmados (o ajustados y luego confirmados):

- `packages/billing/src/entitlements.ts` puede escribirse con el catálogo de valores real
  (no solo los tipos, que ya eran seguros de portar) — ficha #1 de `verified-files.md` se
  cierra.
- `packages/content/src/pricing.ts` se actualiza: quitar "Por definir" de Personal
  Total/Profesional Total, poner los precios y créditos de arriba.
- Se puede avanzar con `packages/billing/src/stripe-plans.ts` (Fase 2.3 del inventario)
  para los 4 planes ya activos (Chat/Personal/Profesional/Profesional Avanzado) — Personal
  Total/Profesional Total quedan fuera de Stripe hasta que se activen (punto 3).

## 5. Confirmación requerida

Para desbloquear Fase 2 necesito una respuesta a cada punto:

1. ¿Confirmas créditos ponderados como modelo definitivo (no mensajes 1:1)? — **Sí/No**
2. ¿Los precios propuestos en §2 (24€/240€ Personal Total, 79€/790€ Profesional Total) se
   quedan así, o los ajustas? — **Confirmar / Ajustar (indicar cifra)**
3. ¿Confirmas que ambos quedan en "Próximamente" (sin Stripe) hasta que sedes/DEHú/
   certificado estén realmente integrados? — **Sí/No**
