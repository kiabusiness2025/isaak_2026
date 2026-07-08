# Isaak Retro — Auditoría Fase 0: estado actual del repo (`current-state.md`)

> Parte de la Fase 0 (Auditoría) del roadmap de `isaak_retro`.
>
> Relacionado:
>
> - `docs/product/ISAAK_RETRO_ROADMAP_2026.md`
> - `docs/product/ISAAK_RETRO_CLEAN_COPY_MASTER_PROMPT_2026.md`
> - `docs/migration/vercel-inventory.md`
> - `docs/migration/env-inventory.md`
> - `docs/migration/reusable-modules.md`
> - `docs/migration/deprecated-modules.md`
>
> Fecha: 2026-07-07.

---

## 1. Hallazgo importante: ya existe un prototipo de Isaak Retro

Antes de auditar el resto, un hallazgo que cambia el orden recomendado de la Fase 2 (Marca):

**`apps/isaak_retro_vibe/isaak-retro-home/`** — un prototipo autocontenido de landing "Isaak Retro", creado el 2026-07-05 (assets fechados ese día), pensado originalmente para integrarse dentro de `apps/isaak` (ver su `INTEGRATION.md`), no como repo nuevo. Incluye:

- `components/IsaakRetroHome.tsx` — home completa ya maquetada.
- `components/IsaakRetroLogo.tsx` — wordmark experimental (la `i` como símbolo orbital), en CSS/HTML, pendiente de sustituir por SVG definitivo.
- `components/IsaakRetroAvatar.tsx` — avatar en contenedor orbital (usa `/Personalidad/isaak-avatar-2.png`).
- `lib/isaak-retro-content.ts` — navegación, textos, cards, planes, FAQ y footer ya redactados.
- `assets/` — ~30 imágenes generadas (ChatGPT Image, fechadas 5 jul 2026) que parecen ser exploraciones visuales de marca/avatar.

Paleta usada en el prototipo (ligeramente distinta a la del roadmap — **hay que reconciliar antes de `packages/brand`**):

| Token | Prototipo (`isaak_retro_vibe`) | Roadmap (`ISAAK_RETRO_ROADMAP_2026.md`) |
| --- | --- | --- |
| Crema | `#fbf6ec` | — |
| Marfil | `#fffaf2` | `#F7F1E7` |
| Beige | `#e8d8bf` | `#E8D8BF` (coincide) |
| Camel | `#c89b61` | `#C89B61` (coincide) |
| Chocolate | `#3d2a1f` | `#3D2A1F` (coincide) |
| Azul IA | `#4d789f` | `#2F5E9E` (Azul Isaak) |

**Recomendación:** tratar `apps/isaak_retro_vibe` como **input directo de la Fase 2** (marca) en vez de partir de cero — es contenido y componentes ya pensados para esta identidad, solo falta decidir la paleta definitiva y portarlo a `packages/brand` + `apps/web` en lugar de a `apps/isaak/app/components/marketing/` (su `INTEGRATION.md` asumía integrarlo en el monorepo actual, plan que ya no aplica tras la decisión de repo nuevo).

---

## 2. Apps existentes (inventario completo)

El `CLAUDE.md` documenta 6 apps de producto. La auditoría encontró **11 workspaces reales** bajo `apps/`:

| App | En `CLAUDE.md` | Descripción | Archivos (`git ls-files`) |
| --- | :---: | --- | ---: |
| `apps/isaak` | ✅ | Producto conversacional público (`isaak.app`) | 1.060 |
| `apps/app` | ✅ | Core canónico: tenants, billing, MCP, OAuth | 715 |
| `apps/holded` | ✅ | Conector Holded (dominio público) | 375 |
| `apps/landing` | ✅ | Web corporativa Verifactu | 274 |
| `apps/admin` | ✅ | Backoffice interno | 291 |
| `apps/client` | ✅ | Legacy congelado | 98 |
| `apps/api` | ❌ | API Verifactu (registro AEAT, certs mTLS, SOAP) | 22 |
| `apps/holded-mcp` | ❌ (mencionado suelto) | Conector MCP Claude.ai (`claude.verifactu.business`) | 145 |
| `apps/isaak-video-generator` | ❌ | Pipeline de vídeo Remotion + Sora + Metricool | 96 |
| `apps/isaak_retro_vibe` | ❌ | **Prototipo de Isaak Retro** (ver sección 1) | 40 |
| `apps/mobile` | ❌ | App Flutter (no gestionada por pnpm) | 83 |

Total repo: 4.116 archivos versionados (apps: 3.199, packages: 294).

### Detalle por app (rutas principales y dependencias clave)

**`apps/isaak`** — Next.js 15, puerto dev 3012. Rutas: `developers`, `empresas`, `conectores`, `auth`, `recursos`, `asesorias`, `api`, `telegram`, `inversores`, `modos`, `pilotos`, `signup`, `terms`, `support`, `personal`, `partners`, `tour`, `demo`, `status`, `onboarding`, `privacy`, `comparacion`, `pricing`, `(workspace)`. Deps notables: `@sentry/nextjs`, `@react-pdf/renderer`, `docx`, `exceljs`, `jszip`, `pdf-parse`, `qrcode`, `recharts`, `react-markdown`, `@verifactu/{auth,db,integrations,utils}`.

**`apps/app`** — Next.js 15, mayor superficie de lógica de negocio. Rutas: `oauth`, `logout`, `select-tenant`, `invoices`, `api`, `workflows`, `expenses`, `support`, `login`, `demo`, `client`, `help`, `onboarding`, `dashboard`, `offline`, `documents` + grupos `(full-width-pages)`, `(root)`, `(dashboard)`, `(admin)`. Deps: `next-auth`, `@prisma/client`, `firebase-admin`, `stripe`, `ai` + `@ai-sdk/openai`, `resend`, `pdfkit`, FullCalendar, ApexCharts, `zod`.

**`apps/holded`** — Next.js 15, puerto dev 3011. Rutas: `oauth`, `admin`, `conectores`, `capacidades`, `auth`, `contacto`, `legal`, `api`, `gracias`, `dpa`, `acceso`, `registro`, `claude`, `demo-recording`, `holded`, `terms`, `support`, `cookies`, `demo`, `onboarding`, `privacy`, `dashboard`, `docs`, `verificar`. Deps: `@anthropic-ai/sdk`, `@prisma/client` + `accelerate`, `firebase-admin`, `stripe`, `resend`, `framer-motion`.

**`apps/landing`** — Next.js 15, puerto dev 3001. Rutas: `developers`, `conectores`, `proximamente`, `auth`, `recursos`, `asesorias`, `contacto`, `legal`, `servicios`, `api`, `politica-de-precios`, `modo-excel`, `acceder`, `inversores`, `que-es-isaak`, `pilotos`, `integraciones`, `health`, `presupuesto`, `holded`, `partners`, `suscripciones`, `demo`, `precios`, `verifactu`, `planes`. Deps: `next-auth`, `firebase-admin`, `stripe`, `bcrypt`, `pg`, `@google/generative-ai`, `@scalar/api-reference-react`.

**`apps/admin`** — Next.js 15, puerto dev 3003. Rutas: `overview`, `companies`, `logout`, `auth`, `api`, `dashboard` + grupos `(auth)`, `(admin)`. Deps: `next-auth` + `@next-auth/prisma-adapter`, `stripe`, `googleapis`, `exceljs`, `pdf-parse`, `pg`.

**`apps/client`** — Next.js 15, puerto dev 8081. Legacy/congelado (ver `docs/migration/deprecated-modules.md`). Solo 98 archivos, stack casi idéntico a `apps/app`.

---

## 3. Packages compartidos (`packages/*`)

| Package | Responsabilidad | Archivos |
| --- | --- | ---: |
| `@verifactu/auth` | Helpers NextAuth de sesión compartida | 10 |
| `@verifactu/db` | Cliente Prisma + schema + scripts de migración | 129 |
| `@verifactu/eslint-config` | Config ESLint compartida | 2 |
| `@verifactu/integrations` | Clientes de terceros (Stripe, Resend, GitHub, Vercel, GoCardless, SaltEdge, Enable Banking, Registradores, company-prefill, fuzzy-search, usage-events) | 30 |
| `@verifactu/isaak-health-check` | CLI interno de auto-fix / health checks de código | 11 |
| `@verifactu/sdk` | SDK público TS de la Isaak Platform API (`publishConfig: public`) | 20 |
| `@verifactu/typescript-config` | `tsconfig` base compartido | 2 |
| `@verifactu/ui` | Design system compartido (shadcn, badges, botones, modales, app-shell, tema, componentes `isaak/`) | 53 |
| `@verifactu/utils` | Utilidades (sesión, URLs, legal, redirects, admin-access, consent-proof, adapter OpenAI) | 37 |

---

## 4. Tooling raíz

- **Nombre del root `package.json`:** todavía `verifactu-monorepo` (no renombrado pese al rename del repo GitHub a `isaak` el 2026-06-02).
- **Package manager:** pnpm `10.27.0` (pinned).
- **Node:** `24.x` (engines).
- **Workspaces:** `apps/*`, `packages/*` (`pnpm-workspace.yaml`).
- **Turbo:** tareas `build`, `dev`, `lint`, `test`, `type-check`; `globalEnv` con ~120 variables declaradas (ver `docs/migration/env-inventory.md`).
- **Scripts raíz notables:** orquestación de workspace, Docker (`docker:up/down/logs`), scripts de demo/QA de Holded (`holded:demo:seed`, `holded:full-smoke`, `holded:qa:landings`, `holded:ci:contract`), generación de vídeo Sora (`video:intro`, `video:reels`, `video:build-demo`, `video:youtube`), `deps:check-versions`, `check:encoding`, `auto-fix`, `pre-deploy`, `deploy:vercel`, `test:golden`.
- **Root vercel.json:** existe (`outputDirectory: "public"`) pero no hay carpeta `public/` en la raíz — parece un artefacto sin usar (ver `docs/migration/vercel-inventory.md`).

**Conclusión para `isaak_retro`:** confirma lo que ya decía el master prompt — la raíz actual acumula ~10 años-scripts de deuda operativa (Docker, Sora, QA de Holded, health-check CLI) que no debe copiarse. El root de `isaak_retro` debe limitarse a `dev/build/lint/typecheck/test/format/validate`.
