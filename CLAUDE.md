# Isaak 2026 (Isaak Retro) — Memoria del proyecto

Monorepo limpio, destino final de la migración de `kiabusiness2025/isaak` (repo legacy,
ver `docs/product/ISAAK_RETRO_ROADMAP_2026.md` allí). Este repo nace deliberadamente
vacío de deuda histórica — no se copian carpetas completas del repo anterior, solo
contenido migrado por whitelist y verificado.

## Stack

- Next.js 15 (App Router) · pnpm workspaces + Turborepo · Tailwind · TypeScript
- Framer Motion para microanimaciones
- Sin backend en V1 (`apps/web` es estático); `.env.local` no tiene variables obligatorias todavía

## Estructura

```text
apps/
  web/                 Web pública Next.js — V1 estática
    app/(marketing)/   Páginas: home, personal, profesional, conectores, demo, precios, etc.
    components/
      hero/            Escena del hero (personaje, tarjetas flotantes, líneas orbitales)
      orbit/           Mapa orbital de conectores + constelación de sedes oficiales
      demo/            Chat de demo interactivo
      pricing/         Tablas y componentes de precios
      connectors/      Iconos de categoría (lucide-react)
      sections/        Secciones de landing (problema, solución, FAQ, CTA final...)
      layout/          Header/footer
      ui/              Primitivas (botones, cards, badges...)
packages/
  brand/               Tokens visuales + assets del personaje Isaak
    src/{colors,typography,tokens,motion,assets}.ts
    assets/robot/      PNGs fuente de las poses (ver sección Personaje Isaak)
  content/             Copy versionado, tipado, importado por las páginas
    src/{home,pricing,connectors,faq,personal,profesional,aeat-models,official-sites,seo,copy-guardrails}.ts
```

## Personaje Isaak — sistema de poses

`IsaakCharacter` (`apps/web/components/hero/IsaakCharacter.tsx`) NO es un dibujo único:
usa 6 poses reales recortadas de los assets fuente (repo `isaak`,
`apps/isaak_retro_vibe/isaak-retro-home/assets/`, documentadas en
`docs/brand/ISAAK_RETRO_ASSET_INVENTORY.md` de ese repo), servidas desde
`packages/brand/src/assets.ts` (`brandAssets.robot.{full,bust}.{idle,thinking,confirmed}`):

- **`full.*`** — cuerpo entero (de pie, pensativo, saludando). Solo se usa en el hero
  (`variant="full"`), sin marco circular, para no taparse con las tarjetas flotantes.
- **`bust.*`** — retrato/busto recortado en cuadrado consistente. Se usa en todos los
  contextos circulares (`variant="circle"`, por defecto): demo, mapa de conectores, CTA final.

El componente hace **crossfade entre la pose real** correspondiente al `state` prop
(`idle`/`listening` → idle, `preparing`/`connecting` → thinking, `confirmed` → confirmed)
en vez de rotar o balancear el marco — lo que se anima es el gesto de Isaak, no el
círculo que lo contiene. Regla: **nunca reutilizar la misma imagen en dos bloques
distintos del sitio** sin revisar si hay una pose más adecuada disponible.

## Conectores — iconos, no logos

Las categorías de conectores (`packages/content/src/connectors.ts`) son deliberadamente
**neutras** (programas, bancos, documentos, correo, calendario, sedes, notificaciones,
certificado, mensajería) — ningún conector de terceros domina la narrativa. Por eso usan
iconos genéricos de `lucide-react` (`apps/web/components/connectors/ConnectorIcon.tsx`),
no logotipos reales de terceros. Los nombres de terceros (Holded, Sage, AEAT...) solo
aparecen como texto de ejemplo dentro de cada categoría.

`FloatingCards` (hero) solo muestra un subconjunto de tarjetas en escritorio
(`DESKTOP_CARD_IDS` en `apps/web/components/hero/FloatingCards.tsx`) — las que no caben
sin invadir al personaje ni al panel de chat inferior se quedan fuera de esa constelación
concreta (siguen existiendo en `packages/content/src/home.ts` para otros usos).

## Convenciones

- **Assets de marca**: origen verificado en `packages/brand/assets/`, servido en
  `apps/web/public/` — nunca editar directamente en `public/` si el archivo viene de
  `packages/brand`. Rutas centralizadas en `packages/brand/src/assets.ts`, nunca hardcodear
  `/brand/...` o `/robot/...` en un componente.
- **Copy**: todo el copy de producto vive en `packages/content`, tipado — no strings sueltos
  en componentes de página.
- **Reglas de marca duras** (de `docs/brand/ISAAK_RETRO_CHARACTER_BIBLE_2026.md` en el repo
  `isaak`): Isaak nunca actúa sobre datos sensibles sin confirmación humana explícita
  ("Isaak prepara. Tú confirmas."); tono "profesional cercano", pocos emoticonos en web
  pública; nada de animaciones agresivas (saltos, glitch, loops rápidos).
- **CI**: `.github/workflows/ci.yml` corre `lint` + `typecheck` + `build` en PR y push a
  `main`. No incluye `test` (no hay suite de tests todavía).
- **Secretos**: `.env.local` nunca se commitea (gitignored); `.env.example` solo con
  placeholders. V1 de `apps/web` es estático y no requiere variables obligatorias.

## Documentación fuente (repo `isaak`, legacy)

La estrategia de marca, personaje y migración vive en el repo anterior hasta que se
decida portarla aquí. Consultar ahí antes de rediseñar el personaje, el pricing o el
copy:

- `docs/brand/ISAAK_RETRO_CHARACTER_BIBLE_2026.md` — personalidad, voz, comportamiento visual
- `docs/brand/ISAAK_RETRO_ASSET_INVENTORY.md` — inventario y estado de cada asset fuente
- `docs/brand/ISAAK_RETRO_MASTER_BRAND_PROMPT_2026.md` — prompt maestro de marca
- `docs/product/ISAAK_RETRO_PRICING_POLICY_2026.md` — política de precios V1
- `docs/product/ISAAK_RETRO_ROADMAP_2026.md` — roadmap y fases de migración

## Comandos

```bash
pnpm install
pnpm dev        # todas las apps en paralelo
pnpm build
pnpm lint
pnpm typecheck
pnpm validate   # lint + typecheck + build
```

## Estado

- [x] Fase 1 — Repo limpio + tooling
- [x] Fase 2 — Marca Retro (`packages/brand`)
- [x] Fase 3 — Web pública V1 (`apps/web`)
- [x] Fase 3.5 — Personaje real (6 poses) + iconos de conectores
- [ ] Fase 4 — Base de conocimiento oficial
- [ ] Fase 5+ — App autenticada, billing, conectores reales, admin
