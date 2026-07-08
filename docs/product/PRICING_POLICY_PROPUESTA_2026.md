# Política de precios — decisión confirmada (cierra Fase 2)

> **Estado: CONFIRMADO por el usuario el 2026-07-08.** Los 3 puntos de la propuesta
> original (§5) fueron aceptados: créditos ponderados como modelo definitivo, precios de
> "Isaak Plus"/"Isaak Pro Plus" tal como se proponían, y ambos en "Próximamente" (sin
> Stripe) hasta que sedes/DEHú/certificado estén realmente integrados. Ya implementado en
> `packages/content/src/pricing.ts` en este mismo PR.
>
> **Además se renombraron los planes** (pedido explícito del usuario, con una pequeña
> corrección de nomenclatura — ver §6):
>
> | Antes | Después |
> | --- | --- |
> | Chat | **Isaak Chat** |
> | Personal | **Isaak Basic** |
> | Personal Total | **Isaak Plus** |
> | Profesional | **Isaak Pro** |
> | Profesional Avanzado | **Isaak Pro Plus** |
> | Profesional Total | **Isaak Pro Max** |
>
> (Ajuste del 2026-07-08, tras confirmar: la línea Profesional pasó de Pro/Pro Basic/Pro
> Plus a **Pro/Pro Plus/Pro Max** — ver §6, ya no es solo una nota, es la nomenclatura
> final aplicada.)
>
> Los `id` internos (`chat`, `personal`, `personal-total`, `profesional`,
> `profesional-avanzado`, `profesional-total`) **no cambian** — son los identificadores
> estables para Stripe/entitlements; solo cambia el `name` visible al usuario.
>
> Fecha: 2026-07-08.

## 6. Nomenclatura final de la línea Profesional (resuelto 2026-07-08)

Se detectó que "Isaak Pro Basic" (49€) sonaba más barato que "Isaak Pro" (29€) siendo en
realidad más caro — "Basic" se lee como "menos", no como "más". Confirmado con el usuario,
la jerarquía final es:

| Precio | Nombre |
| --- | --- |
| 29 € | Isaak Pro |
| 49 € | Isaak Pro Plus |
| 79 € | Isaak Pro Max |

"Plus" ahora sí significa "más que el base" y "Max" marca sin ambigüedad el tier superior
(sedes electrónicas, DEHú, certificado digital). El plan recomendado (`recommended: true`)
sigue siendo "Isaak Pro" (29€) — el renombrado no cambia qué plan se destaca.

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

## 7. Price ID de Stripe creados (2026-07-08, cuenta "Verifactu Business", modo live)

Creados tras autorizar el conector de Stripe. **Solo para los 3 planes ya activos**
(Isaak Basic/Pro/Pro Plus) — Isaak Plus e Isaak Pro Max quedan sin Stripe hasta que se
activen, tal como fija el punto 3 de arriba.

**Aviso de contexto importante encontrado al crear esto**: la cuenta "Verifactu Business"
ya tenía productos/precios reales y en producción (`Isaak Personal` 15€/150€, `Isaak Pro`
29€/290€, `Isaak Profesional Total` 49€/490€ con sedes/DEHú/certificado) que parecen ser
el catálogo de facturación actual del `isaak` legacy. Por decisión explícita del usuario,
los productos de abajo son **objetos nuevos e independientes** — no se reutilizó ni se
tocó ningún objeto existente de legacy. Todos llevan `metadata.source = "isaak_2026"` para
distinguirlos en el dashboard de Stripe.

| Plan | Product ID | Price mensual | Price anual |
| --- | --- | --- | --- |
| Isaak Basic (15€/150€) | `prod_UqlOjaXnQpOvxE` | `price_1Tr3stBGArwrQhIWuX5THzUb` (`isaak2026_basic_monthly`) | `price_1Tr3tLBGArwrQhIWM2LBZHjf` (`isaak2026_basic_annual`) |
| Isaak Pro (29€/290€) | `prod_UqlOYHermm0Bk6` | `price_1Tr3tiBGArwrQhIWG5WzSywk` (`isaak2026_pro_monthly`) | `price_1Tr3uABGArwrQhIW9E6ufHEZ` (`isaak2026_pro_annual`) |
| Isaak Pro Plus (49€/490€) | `prod_UqlP6eXqzCsHWk` | `price_1Tr3uZBGArwrQhIWL2wcmMTe` (`isaak2026_proplus_monthly`) | `price_1Tr3uxBGArwrQhIWV2Y8xmc4` (`isaak2026_proplus_annual`) |

Todos: EUR, recurrente, `tax_behavior: exclusive` (precios "+ IVA", consistente con
`pricingConditions` en `pricing.ts`). `default_price` de cada producto apunta al precio
mensual.

**Convención de env var propuesta** para cuando se escriba
`packages/billing/src/stripe-plans.ts` (Fase 2.3), siguiendo el patrón de legacy
(`STRIPE_PRICE_ISAAK_PERSONAL_MONTHLY`):

```text
STRIPE_PRICE_ISAAK2026_BASIC_MONTHLY=price_1Tr3stBGArwrQhIWuX5THzUb
STRIPE_PRICE_ISAAK2026_BASIC_ANNUAL=price_1Tr3tLBGArwrQhIWM2LBZHjf
STRIPE_PRICE_ISAAK2026_PRO_MONTHLY=price_1Tr3tiBGArwrQhIWG5WzSywk
STRIPE_PRICE_ISAAK2026_PRO_ANNUAL=price_1Tr3uABGArwrQhIW9E6ufHEZ
STRIPE_PRICE_ISAAK2026_PROPLUS_MONTHLY=price_1Tr3uZBGArwrQhIWL2wcmMTe
STRIPE_PRICE_ISAAK2026_PROPLUS_ANNUAL=price_1Tr3uxBGArwrQhIWV2Y8xmc4
```

Price ID no son secretos (solo funcionan junto a la clave privada de la cuenta), así que
es seguro tenerlos en texto en este documento — la clave privada de Stripe nunca se pasa
por aquí ni se commitea en ningún sitio del repo.
