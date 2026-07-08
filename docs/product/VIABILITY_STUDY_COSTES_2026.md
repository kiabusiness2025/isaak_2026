# Estudio de viabilidad — costes de "licencias" (IA + proveedores) vs. pricing publicado

> Encargo: "hacer un estudio de viabilidad completo basado en costes de licencias para
> nosotros". Este documento estima cuánto cuesta a Isaak entregar cada plan publicado en
> `packages/content/src/pricing.ts`, con precios reales de cada proveedor (Anthropic,
> Stripe, Vercel, Resend, WhatsApp/Meta, Salt Edge, Enable Banking) verificados en julio
> de 2026, y lo cruza contra el precio de venta para dar un margen estimado por plan.
>
> **Nivel de confianza de este documento: mixto, explícito por sección.** Los costes de
> Anthropic/Stripe/Vercel/Resend son precios públicos reales, verificados hoy. Los costes
> de Salt Edge, Enable Banking y WhatsApp/Meta son **estimaciones con incertidumbre real**
> (proveedores sin tarifa pública, o con tarifa pendiente de confirmar) — marcados como
> tal en cada sección, no se han inventado cifras donde no las hay.
>
> Fecha: 2026-07-08.

---

## 1. Resumen ejecutivo

- El coste dominante y más predecible es **inferencia de IA (Anthropic)** — y aquí sí
  tenemos precios oficiales exactos.
- Bajo el modelo de precios ya publicado en `/precios` (créditos IA ponderados), **todos
  los planes activos tienen margen bruto amplio sobre el coste de IA en solitario** —
  incluso en el escenario de uso "pesado" que modelamos abajo.
- El **coste real que no podemos calcular con precisión hoy** es el de open banking
  (Salt Edge / Enable Banking) — ninguno de los dos publica tarifa, y Enable Banking ya
  es un contrato de producción real (ver `CLAUDE.md`, app `73fbe5d2-b322-4d71-ba5d-223be78df437`)
  cuyo coste contratado real **debería sustituir esta estimación** en cuanto se consulte.
- WhatsApp (Meta) tiene un cambio de tarificación relevante que vence **el 1 de octubre de
  2026** (ver §4) — hoy en día enviar notificaciones fiscales por WhatsApp es casi gratis
  (ventana de servicio de 24h sin coste desde nov-2024); eso puede dejar de ser así este
  mismo año.
- **La conclusión más importante para la decisión pendiente de Fase 2** (mensajes 1:1 vs.
  créditos ponderados, ver `docs/migration/module-inventory.md` §Fase 2): el modelo de
  créditos ponderados **se alinea mucho mejor con el coste real de Anthropic** que el
  modelo de mensajes 1:1 de legacy. Ver §6.

---

## 2. Coste de inferencia de IA (Anthropic) — datos oficiales, no estimados

Precios oficiales verificados hoy (por millón de tokens, entrada/salida):

| Modelo | Input | Output | Uso en Isaak |
| --- | --- | --- | --- |
| Claude Haiku 4.5 | $1.00 | $5.00 | Tier gratuito (`ISAAK_MODEL_FREE` en legacy `isaak-entitlements.ts`) |
| Claude Sonnet 4.6 | $3.00 | $15.00 | Tiers de pago (`ISAAK_MODEL_PRO` en legacy) |
| Claude Sonnet 5 | $3.00 ($2.00 intro hasta 2026-08-31) | $15.00 ($10.00 intro) | No usado todavía — ver nota de optimización en §6 |

### Supuestos de consumo por interacción (estimación de ingeniería, NO telemetría real)

No tenemos telemetría de producción de `isaak_2026` (no existe backend todavía). Legacy
(`isaak`) sí la tiene en `packages/integrations/usage-events.ts` — **esa es la fuente que
debería sustituir estos supuestos** en cuanto se consulte. Mientras tanto, tres escenarios:

| Escenario | Input tokens/turno | Output tokens/turno | Ejemplo |
| --- | --- | --- | --- |
| Ligero (chat simple) | 800 | 150 | "¿Cuándo vence el modelo 303?" |
| Medio (con contexto) | 3.000 | 500 | Pregunta sobre una factura ya cargada, cálculo simple |
| Pesado (documento/informe) | 12.000 | 1.200 | Revisar un PDF de varias páginas, generar un informe |

### Coste por turno resultante

| Escenario | Modelo | Coste/turno |
| --- | --- | --- |
| Ligero | Haiku 4.5 | ~$0.0016 (0,0015 €) |
| Medio | Sonnet 4.6 | ~$0.0165 (0,015 €) |
| Pesado | Sonnet 4.6 | ~$0.054 (0,05 €) |

### Coste mensual de IA por plan (bajo el modelo de créditos ya publicado en `pricing.ts`)

Asumiendo una mezcla realista 70% ligero / 25% medio / 5% pesado dentro de la bolsa de
créditos de cada plan (ponderación de créditos ya coherente con esa mezcla — ver
`creditsSection` en `pricing.ts`: 1 crédito/pregunta simple, 5-30/documento):

| Plan | Precio/mes | Créditos IA/mes | Coste IA estimado/mes | Margen bruto (solo IA) |
| --- | --- | --- | --- | --- |
| Chat (gratis) | 0 € | 100 | ~0,20 € | −0,20 € (coste de adquisición, no de plan) |
| Personal | 15 € | 500 | ~1,00 € | ~14,00 € |
| Profesional | 29 € | 1.000 | ~2,00 € | ~27,00 € |
| Profesional Avanzado | 49 € | 2.500 | ~5,00 € | ~44,00 € |

El plan gratuito **cuesta dinero real** (aunque poco, ~0,20 €/usuario/mes) — es coste de
adquisición, aceptable si la conversión a plan de pago es razonable, pero no es "gratis"
para Isaak. Todos los planes de pago tienen margen bruto de IA por encima del 90% del
precio — la IA en sí **no es el riesgo de viabilidad** de este pricing.

---

## 3. Stripe (procesamiento de pago + facturación recurrente)

Verificado en `stripe.com/es/pricing` hoy:

| Concepto | Tarifa |
| --- | --- |
| Tarjetas UE (estándar) | 1,5% + 0,25 € |
| Tarjetas UE premium | 1,9% + 0,25 € |
| Tarjetas Reino Unido | 2,5% + 0,25 € |
| Tarjetas internacionales (no UE) | 3,25% + 0,25 € |
| Conversión de divisa (si aplica) | +2% adicional |
| **Stripe Billing** (suscripciones) | 0,7% del volumen facturado (pay-as-you-go) **o** 500 €/mes plano con compromiso anual |

**Nota de cambio real detectada en la investigación**: Stripe Billing ya no es el modelo
antiguo de "+0,5% plano" que podría recordarse de configuraciones anteriores — hoy es
0,7% PAYG o 500 €/mes fijo. Para el volumen inicial de Isaak (pocos cientos de
suscriptores), el modelo PAYG (0,7%) es casi con toda seguridad más barato que el plano
de 500 €/mes — **no comprometerse al plano de 500 €/mes hasta tener volumen que lo
justifique** (breakeven ≈ 71.400 €/mes de facturación).

Sobre un plan Profesional (29 €/mes, tarjeta UE estándar): 29 × 1,5% + 0,25 + 29 × 0,7% =
0,435 + 0,25 + 0,203 ≈ **0,89 €/mes de coste Stripe**, ~3% del precio del plan. Bajo, no
es un riesgo de viabilidad.

---

## 4. WhatsApp Business (Meta Cloud API) — coste con ventana de incertidumbre real

Confirmado: Meta sustituyó la tarificación por conversación por **tarificación por
mensaje** desde el 1 de julio de 2025. Categorías vigentes: Marketing, Utilidad,
Autenticación, Servicio.

- **Ventana de servicio (respuesta libre dentro de 24h)**: gratis e ilimitada desde
  noviembre de 2024 — hoy, responder a un usuario que escribe primero no cuesta nada.
- **Utilidad/Autenticación fuera de la ventana**: de pago (recordatorios proactivos de
  vencimientos fiscales entran aquí si el usuario no ha escrito en las últimas 24h).
- **⚠️ Cambio pendiente, sin confirmar al 100%**: varias fuentes de 2026 (no verificadas
  contra un documento oficial de Meta que se pudiera cargar en esta investigación)
  apuntan a que **desde el 1 de octubre de 2026 Meta empezaría a cobrar también dentro de
  la ventana de servicio** — es decir, el "gratis" actual podría terminar este mismo año.
  **Acción recomendada**: revisar esto explícitamente antes de octubre de 2026, no dar
  por hecho que el canal seguirá siendo gratis.
- **Tarifa exacta para España**: Meta no publica las tarifas por país en HTML — se
  distribuyen como CSV/PDF descargable desde el propio Business Manager (requiere sesión
  autenticada, no accesible desde esta investigación). Estimaciones de terceros, **no
  verificadas**, sitúan Marketing en ~0,06-0,08 €/mensaje para Europa Occidental,
  Utilidad/Autenticación bastante más bajo. **No usar estas cifras como definitivas** —
  descargar el rate card real desde el Business Manager de Isaak antes de modelar costes
  de WhatsApp con precisión.
- **Capa de BSP**: Meta no vende acceso directo a la mayoría de empresas — se paga a
  través de un proveedor (Twilio, 360dialog, Infobip...) que añade un margen por mensaje
  (~0,005-0,01 $/mensaje, ej. Twilio) o una cuota mensual plana con margen ~cero por
  mensaje (ej. 360dialog). El coste total real = tarifa Meta + margen BSP + IVA 21%.

**Conclusión de viabilidad**: el canal WhatsApp es barato hoy (recordatorios = mensajes de
utilidad de bajo coste, conversaciones normales = gratis), pero **no es un coste
garantizado a medio plazo** por el cambio de octubre de 2026. No construir el pricing
asumiendo que seguirá siendo gratis sin revisar esto antes de esa fecha.

---

## 5. Open Banking (Salt Edge, Enable Banking) — sin tarifa pública, el mayor riesgo real

Ninguno de los dos proveedores publica un precio. Ambos funcionan por cotización
("contact sales"), facturación por volumen (cuentas conectadas/pagos por mes), con un
mínimo de facturación mensual no público.

- **Enable Banking**: Isaak **ya es cliente de producción** (`CLAUDE.md`: app
  `73fbe5d2-b322-4d71-ba5d-223be78df437`, en producción desde 2026-05-23). El coste
  contratado real **existe internamente** — hay que consultarlo directamente (facturas ya
  emitidas, o al contacto comercial de Enable Banking) en vez de estimarlo. Cualquier
  cifra que no venga de ahí sería inventada.
- **Salt Edge**: fallback no-PSD2, uso esperado mucho menor. Mismo problema de opacidad de
  precio — cotización directa si el volumen empieza a justificarlo.

**Esto es lo único de este estudio que NO se puede resolver con investigación pública.**
Es el coste con más incertidumbre real del stack, y probablemente el segundo más grande
después de la IA para los planes con banking activado (Profesional en adelante). **Acción
concreta recomendada**: pedir a quien gestiona la cuenta de Enable Banking la factura
mensual real de los últimos 2-3 meses y sustituir esta sección por datos reales.

---

## 6. Vercel + Resend — coste de infraestructura, bajo y previsible

| Proveedor | Coste base | Notas |
| --- | --- | --- |
| Vercel Pro | 20 $/usuario/mes (incl. 20 $ de crédito de uso) | Bandwidth $0.15/GB tras 1TB; cómputo $0.128/hora-CPU-activa tras 4h; 5.000 transformaciones de imagen incluidas |
| Resend | Gratis hasta 3.000 emails/mes; 20 $/mes (50k) o 35 $/mes (100k) | Volumen de Isaak (avisos, confirmaciones) probablemente cabe en el tier gratis o el de 20 $/mes durante bastante tiempo |

Coste combinado estimado en fase actual (solo `apps/web` estático + emails
transaccionales bajos): **bajo, probablemente <50 €/mes en total**, no es un factor de
riesgo de viabilidad a la escala actual.

---

## 7. Tabla de viabilidad consolidada (aprox., por usuario/mes)

| Plan | Precio | IA (créditos) | Stripe | Banking (⚠️ sin confirmar) | WhatsApp (⚠️ sin confirmar) | Margen bruto aprox. |
| --- | --- | --- | --- | --- | --- | --- |
| Chat | 0 € | ~0,20 € | — | — | ~0 € | **−0,20 €** (coste de adquisición) |
| Personal | 15 € | ~1,00 € | ~0,47 € | n/a (sin banking) | ~0 € | **~13,50 €** (~90%) |
| Profesional | 29 € | ~2,00 € | ~0,89 € | **desconocido** | ~0 € | **~26 € menos banking** |
| Profesional Avanzado | 49 € | ~5,00 € | ~1,49 € | **desconocido** | ~0 € | **~42,5 € menos banking** |

El único término que puede cambiar sustancialmente esta tabla es el coste de banking
(Salt Edge/Enable Banking) — todo lo demás tiene margen amplio incluso en el escenario
"pesado" de consumo de IA.

---

## 8. Conclusión y relación con la decisión pendiente de Fase 2 (mensajes vs. créditos)

Esta investigación aporta un argumento **cuantitativo** nuevo a la decisión ya
identificada como bloqueante en `docs/migration/module-inventory.md` §Fase 2 y
`verified-files.md` ficha #1:

- El modelo de **créditos ponderados** (ya publicado en `/precios`) cobra más créditos por
  acciones que realmente cuestan más tokens de Anthropic (revisar un documento = 5-30
  créditos, sí, pero también consume 10-15× más tokens reales que una pregunta simple).
  **Esto alinea el coste real con el consumo de cuota** — un usuario que abusa de acciones
  caras (documentos, informes) agota su cuota proporcionalmente a lo que le cuesta a
  Isaak, no solo a "cuántas veces escribió".
- El modelo de **mensajes 1:1** de legacy (300/400/600/1.000 mensajes/mes) no distingue
  entre una pregunta de una línea y la revisión de un documento de 20 páginas — ambas
  cuentan como "1 mensaje", pero la segunda cuesta ~30× más en tokens reales. Bajo ese
  modelo, un usuario que solo hace revisión de documentos sale mucho más barato para él y
  mucho más caro para Isaak que uno que solo pregunta cosas simples, sin que el precio del
  plan lo refleje.

**Esto no decide por sí solo la pregunta de negocio** (qué unidad de cuota comunicar al
usuario es más comprensible, o qué precio final poner a "Profesional Total"/"Personal
Total") — pero si el criterio incluye *sostenibilidad de costes*, el modelo de créditos ya
publicado tiene una ventaja real y medible sobre el modelo de mensajes de legacy que no
estaba cuantificada hasta este estudio.

## 9. Próximos pasos concretos

1. **Sustituir la estimación de banking (§5) por el coste contratado real** de Enable
   Banking (ya es cliente de producción) — es la única pieza de este estudio con datos
   internos disponibles que no se han consultado todavía.
2. **Descargar el rate card real de WhatsApp** desde el Business Manager de Isaak antes de
   fijar ningún coste de notificaciones por ese canal, y revisar explícitamente el cambio
   de octubre de 2026.
3. Si existe telemetría real de uso de IA en el repo `isaak` (legacy,
   `packages/integrations/usage-events.ts`), sustituir los supuestos de consumo de §2 por
   datos reales — los aquí usados son estimaciones de ingeniería, no producción.
4. Con estos tres datos reales, esta tabla se puede cerrar con precisión y dejar de tener
   secciones marcadas ⚠️.
