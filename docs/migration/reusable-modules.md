# Isaak Retro — Auditoría Fase 0: módulos reutilizables (`reusable-modules.md`)

> Parte de la Fase 0 (Auditoría) del roadmap de `isaak_retro`. Ver `docs/migration/current-state.md` para contexto general.
>
> Regla: nada entra en `isaak_retro` sin ficha de migración (ver Fase 11 del roadmap). Esta lista es el input para esas fichas, no una autorización a copiar.
>
> Fecha: 2026-07-07.

---

## 0. Prioridad 0 — el prototipo ya existente

Antes que cualquier módulo de `apps/isaak`: **`apps/isaak_retro_vibe/isaak-retro-home/`** (ver `docs/migration/current-state.md` §1) ya es contenido pensado específicamente para esta identidad — home completa, logo experimental, avatar, copy de navegación/planes/FAQ. Es el candidato de menor esfuerzo para arrancar `packages/brand` + `apps/web` en Fase 1-3, por delante de extraer nada de `apps/isaak`.

## 1. Candidatos a reutilizar (bajo acoplamiento)

Componentes visuales/demo sin `fetch` ni dependencias de backend — se pueden portar prácticamente tal cual a `apps/web` o `packages/ui`:

- `apps/isaak/app/components/IsaakHeroMock.tsx` — mock de chat autocontenido (datos hardcodeados en `SCENES`).
- `apps/isaak/app/components/IsaakHeroTour.tsx` — tour visual del producto.
- `apps/isaak/app/components/IsaakOmniChatWidget.tsx` — widget flotante de chat público.
- `apps/isaak/app/components/WhatsAppButton.tsx`, `TalkChannels.tsx` — contacto, sin estado ni red.
- `apps/isaak/app/components/FaqAccordion.tsx` — accordion de FAQ genérico.
- `apps/isaak/app/components/ComparisonTable.tsx` — tabla comparativa estática.
- `apps/isaak/app/components/GridBackdrop.tsx` — fondo decorativo puro.
- `apps/isaak/app/components/HowItWorksHero.tsx`, `HowItWorksSteps.tsx`, `PersonalHowItWorks.tsx`, `CompaniesHowItWorks.tsx` — secciones de marketing estáticas.
- `apps/isaak/app/components/IntegrationsMarquee.tsx`, `IntegrationsShowcase.tsx` — showcases visuales (solo props/datos estáticos).
- `apps/isaak/app/components/ResourceCard.tsx`, `RealExampleCard.tsx`, `ArticleLayout.tsx` — tarjetas/layout de contenido.
- `apps/isaak/app/(workspace)/components/IsaakMarkdown.tsx` — renderer de markdown puro, reutilizable como burbuja de chat.
- `packages/integrations/fuzzy-search.ts` — algoritmo Levenshtein puro.
- `packages/integrations/stripe.ts`, `resend.ts`, `vercel.ts`, `github.ts` — clientes ligeros basados en `process.env` + SDK, sin Prisma ni lógica Isaak-específica.
- `packages/integrations/saltedge.ts`, `enable-banking.ts`, `gocardless-payments.ts`, `gocardless-bank-data.ts` — clientes de Open Banking autocontenidos (⚠️ el de GoCardless BD está en sunset, ver `deprecated-modules.md`).
- `packages/integrations/registradores-client.ts` — cliente HTTP genérico, sin auth ni estado.

## 2. Candidatos a reutilizar con revisión (acoplamiento medio)

Buen diseño/patrón, pero atados a Prisma, a Holded, o a un catálogo de planes que hay que redefinir:

- `apps/isaak/app/lib/isaak-entitlements.ts` — módulo puro (documentado explícitamente sin Prisma) de tiers/features/precios; **buen patrón a portar**, pero el catálogo está atado a specifics de Holded/AEAT/VeriFactu.
- `apps/isaak/app/lib/isaak-pricing-content.ts` — deriva copy de precios desde `isaak-entitlements.ts`; el patrón (separar números de copy) es bueno, el catálogo fuente hay que reescribirlo.
- `apps/isaak/app/lib/isaak-stripe-plans.ts` — puente Stripe↔entitlements; funciones de mapeo puras y portables, pero `resolvePlanIdForTier` toca Prisma directamente.
- `apps/isaak/app/components/PricingSectionV1.tsx`, `PlanDecisionTree.tsx` — UI de pricing sin `fetch`, pero importan tipos de `isaak-entitlements`.
- `apps/isaak/app/(workspace)/components/OnboardingWizard.tsx`, `apps/isaak/app/(workspace)/bienvenida/page.tsx` — UI de onboarding reutilizable, pero llama directo a `/api/isaak/onboarding/*`; habría que abstraer el cliente API.
- `packages/integrations/isaak/onboarding.ts` — buena factorización (fact-keys, tipos), pero acoplado a Prisma y a snapshots de contexto Holded.
- `packages/integrations/isaak/chat.ts` — scoping de conversación/memoria por tenant bien diseñado, pero requiere `IsaakChatPrismaClient` y tiene default `context = 'holded_free_dashboard'` hardcodeado — reutilizable como patrón de servicio, no tal cual.
- `apps/isaak/app/lib/isaak-long-term-memory.ts` — memoria vectorial (pgvector) con buen aislamiento por tenant, pero acoplada a SQL crudo del esquema actual.
- `apps/isaak/app/lib/isaak-memory-extractor.ts`, `isaak-conversation-summarizer.ts`, `isaak-memory-types.ts` — lógica de extracción/resumen en principio LLM-agnóstica, pero entrelazada con los tipos de `isaak-long-term-memory`.
- `apps/isaak/app/(workspace)/settings/NotificationPreferencesMatrix.tsx`, `CustomSlashCommandsEditor.tsx`, `PrivacyDataSection.tsx` — piezas de settings modulares (~130-235 líneas), extraíbles si se desacopla el fetch en un cliente inyectable.
- `apps/isaak/app/(workspace)/components/IsaakSidebar.tsx` — shell de navegación reutilizable visualmente, con 4 llamadas a endpoints propios.
- `apps/isaak/app/(workspace)/components/IsaakArtifactPanel.tsx`, `IsaakArtifactChart.tsx`, `IsaakChart.tsx`, `IsaakTaxCard.tsx` — componentes visuales de artifacts, tipados sobre datos fiscales Isaak-específicos.
- `packages/integrations/company-prefill.ts`, `company-prefill-enhanced.ts` — buen patrón de dependency injection (reciben `PrismaClient`), pero combinan fuentes España-específicas (BORME, VIES, Registradores) — portar la forma, no el contenido.
- `packages/integrations/usage-events.ts` — taxonomía de eventos útil como referencia, pero acoplada a Prisma y a nombres Isaak-específicos.

## 3. No reutilizables tal cual (alto acoplamiento — reescribir)

- `apps/isaak/app/(workspace)/components/IsaakChatSection.tsx` (1.666 líneas) y `IsaakChatSectionHydrated.tsx` — shell principal de chat con llamadas embebidas a `/api/chat/stream`, `/api/holded/*`; UI y transporte mezclados.
- `apps/isaak/app/(workspace)/settings/IsaakSettingsClient.tsx` (2.969 líneas, 17 `fetch`) — cliente monolítico de settings; candidato claro a reescritura modular, no a extracción.
- `apps/isaak/app/(workspace)/components/IsaakDashboard.tsx`, `IsaakCopilotPanel.tsx` — paneles fuertemente ligados al estado de negocio/Holded actual.
- `apps/isaak/app/(workspace)/components/QuotaBanner.tsx`, `TrialBanner.tsx`, `AdvisorModeBanner.tsx`, `ConnectDataBanner.tsx`, `OnboardingBanner.tsx` — atados al modelo de planes/quota actual.
- `apps/isaak/app/lib/isaak-quota.ts`, `isaak-turn-tier.ts`, `isaak-credits.ts`, `isaak-billing-helpers.ts`, `isaak-feature-gate.ts` — motor de cuota/gating entrelazado con Prisma y el catálogo de planes actual; mejor rediseñar desde cero.
- `apps/isaak/app/api/demo/chat/stream/route.ts` — la ruta de demo (a diferencia de sus componentes visuales) usa `HOLDED_DEMO_API_KEY` y comparte pipeline con `/api/chat/stream`.
- `packages/integrations/holded/*` (connection, dtoMappers, contracts, uiState, governanceEmailTemplates, diagnostics, observability, secure-logging) — es, por diseño, la capa base específica de Holded; no debería generalizarse sin reescritura de proveedor.
- `apps/isaak/app/lib/holded-chat.ts`, `isaak-chat-context.ts`, `isaak-demo-context.ts` — contexto de chat armado explícitamente alrededor de datos Holded.

## 4. Mapa de dominios en `packages/integrations`

- **Holded** (`holded/*`, 8 archivos) — el más grande y maduro; rol de integración primaria de facto (alto acoplamiento).
- **Pagos/Banking**: `stripe.ts`, `gocardless-payments.ts` + `gocardless-bank-data.ts` (sunset), `saltedge.ts`, `enable-banking.ts` — 5 clientes independientes, genéricos.
- **Comunicación**: `resend.ts` — genérico.
- **Infra/DevOps**: `vercel.ts`, `github.ts` — genéricos.
- **Isaak-specific** (`isaak/*`): `onboarding.ts`, `chat.ts` — acoplados a Prisma y a defaults Holded.
- **Company data / KYC**: `company-prefill*.ts`, `registradores-client.ts`, `fuzzy-search.ts` — España-específicos, en general independientes de Holded.
- **Telemetría**: `usage-events.ts` — taxonomía acoplada a Prisma/nombres Isaak-specific.

No se encontraron subcarpetas para Microsoft/Google/Slack/Telegram/WhatsApp dentro de `packages/integrations` — esas integraciones viven directamente en `apps/isaak/app/api/{telegram,whatsapp,slack}` y `apps/isaak/app/lib/`, fuera del paquete compartido (a tener en cuenta al diseñar `packages/integrations` en `isaak_retro`, que sí las separa por dominio).
