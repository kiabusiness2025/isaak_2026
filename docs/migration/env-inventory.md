# Isaak Retro — Auditoría Fase 0: inventario de variables de entorno (`env-inventory.md`)

> Parte de la Fase 0 (Auditoría) del roadmap de `isaak_retro`. Ver `docs/migration/current-state.md` para contexto general.
>
> **Solo nombres de variables — nunca valores.** Las marcadas **[SECRET]** son claves/tokens/strings de conexión con credenciales y deben excluirse de cualquier documento de migración que no sea este (y nunca deben copiarse a `isaak_retro` como valores reales — el nuevo repo empieza con `.env.example` vacío).
>
> Fecha: 2026-07-07.

---

## Resumen

Se han recopilado los `.env.example` de cada app más las variables usadas en código (`process.env.*`) que no estaban documentadas en su `.env.example`. El repo acumula un número muy alto de variables porque cada app (`isaak`, `app`, `holded`, `admin`, `landing`, `client`, `api`, `holded-mcp`, `isaak-video-generator`) mantiene su propio `.env.example` con solapamientos parciales — `isaak_retro` debería centralizar esto en `packages/config` y minimizar la superficie por app.

## Root `.env.example` (defaults globales/compartidos)

`ISAAK_AI_PROVIDER_DEFAULT`, `ISAAK_AI_MODEL_DEFAULT`, `ISAAK_AI_MODEL_CLAUDE_DEFAULT`, `ISAAK_NEW_OPENAI_API_KEY` **[SECRET]**, `ANTHROPIC_API_KEY` **[SECRET]**, `ANTHROPIC_MODEL`, `CLAVE_API_AI_VERCEL` **[SECRET]**, `VERCEL_OIDC_TOKEN` **[SECRET]**, `CRON_SECRET` **[SECRET]**, `ADMIN_ALERT_EMAIL`, `ADMIN_WHATSAPP_PHONE`, `NEXT_PUBLIC_WHATSAPP_URL`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_BUSINESS_ACCOUNT_ID`, `WHATSAPP_APP_ID`, `WHATSAPP_ACCESS_TOKEN` **[SECRET]**, `WHATSAPP_WEBHOOK_VERIFY_TOKEN` **[SECRET]**, `WHATSAPP_APP_SECRET` **[SECRET]**, `SESSION_SECRET` **[SECRET]**, `SESSION_COOKIE_DOMAIN`, `SESSION_COOKIE_SECURE`, `SESSION_COOKIE_SAMESITE`, `SUPPORT_HANDOFF_SECRET` **[SECRET]**, `NEXT_PUBLIC_APP_URL`, `VERIFACTU_API_URL`, `DATABASE_URL` **[SECRET]**, `PRISMA_DATABASE_URL` **[SECRET]**, `POSTGRES_URL` **[SECRET]**, `NEXT_PUBLIC_FIREBASE_*` (6 vars), `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `NEXT_PUBLIC_FIREBASE_APP_CHECK_DEBUG_TOKEN`, `NEXT_PUBLIC_USE_AUTH_EMULATOR`, `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, `FIREBASE_ADMIN_PRIVATE_KEY` **[SECRET]**, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` **[SECRET]**, `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` **[SECRET]**, `MICROSOFT_TENANT_ID`, `MICROSOFT_REDIRECT_URI`, `GOOGLE_AI_API_KEY` **[SECRET]**, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` **[SECRET]**, `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_SUBJECT`, `ANTHROPIC_AUTH_TOKEN` **[SECRET]**, `AEAT_SUBMISSION_WORKER_ENABLED`, `AEAT_ENVIRONMENT`, `AEAT_WORKER_BATCH_SIZE`, `AEAT_NOTIF_WS_URL`, `AEAT_CENSUS_WS_URL`.

## Por app (solo variables adicionales/específicas no cubiertas arriba)

### `apps/api`

`SESSION_SECRET` **[SECRET]**, `SESSION_SECRET_PREVIOUS` **[SECRET]**, `ADMIN_UIDS`, `ADMIN_EMAILS`, `AEAT_CERT_PATH`, `AEAT_CERT_PASS_PATH`, `AEAT_WSDL_FILE`, `AEAT_SOAP_ENDPOINT`, `PORT`, `NODE_ENV`, `INTERNAL_API_SECRET` **[SECRET]**, `SENTRY_DSN` **[SECRET]**, `VERCEL`, `VERCEL_ENV`.

### `apps/admin`

`NEXTAUTH_URL`, `NEXTAUTH_SECRET` **[SECRET]**, `NEXTAUTH_DEBUG`, `ADMIN_SESSION_SHORT_MAX_AGE_SECONDS`, `ADMIN_SESSION_REMEMBER_MAX_AGE_SECONDS`, `ADMIN_ALLOWED_EMAIL`, `ADMIN_ALLOWED_DOMAIN`, `ADMIN_INBOX_SECRET` **[SECRET]**, `ADMIN_LOCAL_BYPASS`, `ADMIN_RELAXED_AUTH`, `DIRECT_DATABASE_URL` **[SECRET]**, `STRIPE_SECRET_KEY` **[SECRET]**, `STRIPE_WEBHOOK_SECRET` **[SECRET]**, `RESEND_API_KEY` **[SECRET]**, `RESEND_FROM(_HOLDED/_ISAAK)`, `TELEGRAM_ALERT_BOT_TOKEN` **[SECRET]**, `TELEGRAM_ALERT_CHAT_ID`, `CLAIM_REVIEW_MODEL`, `TELEGRAM_APPROVAL_BOT_TOKEN` **[SECRET]**, `TELEGRAM_APPROVAL_CHAT_ID`, `TELEGRAM_WEBHOOK_SECRET` **[SECRET]**, `OAUTH_DATA_ENCRYPTION_SECRET` **[SECRET]**, `DID_API_KEY` **[SECRET]**, `DID_AVATAR_URL`, `DID_AUDIO_URL`, `DID_VOICE_ID`, `DID_API_URL`, `TOKEN_TELEGRAM_BOT_ISAAK_APRUVE` **[SECRET]**, `CONNECTOR_AUTOFIX_ENABLED`, `CONNECTOR_AUTOFIX_GITHUB_TOKEN` **[SECRET]**, `CONNECTOR_AUTOFIX_REPO`, `GITHUB_TOKEN` **[SECRET]**, `HEALTH_ISAAK_URL`, `HEALTH_LANDING_URL`, `HEYGEN_API_KEY` **[SECRET]**, `HEYGEN_AVATAR_ID`, `HEYGEN_VOICE_ID`, `HOLDED_TEST_API_KEY` **[SECRET]**, `INTEGRATIONS_SECRET_KEY` **[SECRET]**, `USE_ISAAK_FOR_ADMIN`, `VERCEL_BUDGET_WEBHOOK_SECRET` **[SECRET]**, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID`, `VERCEL_TOKEN` **[SECRET]**, `VERCEL_WEBHOOK_SECRET` **[SECRET]**.

### `apps/app`

`NEXTAUTH_URL`, `GOOGLE_HOSTED_DOMAIN`, `INTEGRATIONS_SECRET_KEY` **[SECRET]**, `HOLDED_API_BASE_URL`, `HOLDED_TIMEOUT_MS`, `HOLDED_TEST_API_KEY` **[SECRET]**, `MCP_SHARED_SECRET` **[SECRET]**, `MCP_RESOURCE_URL`, `STRIPE_SECRET_KEY` **[SECRET]**, `STRIPE_WEBHOOK_SECRET` **[SECRET]**, `RESEND_API_KEY(_HOLDED)` **[SECRET]**, `OPENAI_APPS_CHALLENGE`, `BANK_RECONCILIATION_*` (4 vars de config, no secretas), `ENABLE_ISAAK_AUTO_FIX`, `HEALTH_CHATGPT_*` / `HEALTH_CLAUDE_*` / `HEALTH_HOLDED_*` (URLs de healthcheck), `HOLDED_CONNECTION_LEGAL_VERSION`, `HOLDED_CONNECTOR_URL`, `HOLDED_HISTORY_*` / `HOLDED_LEDGER_*` (límites de paginación), `INTEGRATION_SECRET_KEY` **[SECRET]**, `ISAAK_MCP_SHARED_SECRET` **[SECRET]**, `ISAAK_OPENAI_MODEL`, `ISAAK_SUPPORT_ENABLED`, `MCP_DEFAULT_TENANT_*`, `MCP_OAUTH_*` (incl. `MCP_OAUTH_SECRET` **[SECRET]**), `MCP_PUBLIC_*`, `MONITOR_API_TOKEN` **[SECRET]**, `OPENAI_APPS_DOMAIN_CHALLENGE`, `RESEND_FROM_*` (6 variantes), `RESEND_WEBHOOK_SECRET` **[SECRET]**, `STANDALONE_BUILD`, `SUPPORT_NOTIFICATION_EMAIL`, `VERCEL_AI_API_KEY` **[SECRET]**, `VERIFACTU_APP_SHARED_SECRET` **[SECRET]**.

### `apps/client`

Sin `.env.example` propio (ver `CLIENT_ENV_VERCEL.md`): `API_BASE`, `INTERNAL_API_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_LANDING_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPPORT_EMAIL`.

### `apps/holded`

`NEXT_PUBLIC_HOLDED_ENABLE_GOOGLE_LOGIN`, `HOLDED_DEMO_API_KEY` **[SECRET]**, `HOLDED_ADMIN_NOTIFICATION_EMAILS`, `HOLDED_ADMIN_EMAILS`, `HOLDED_LEAD_EMAIL`, `NEXT_PUBLIC_HOLDED_FIREBASE_*` (6 vars, proyecto Firebase propio distinto al de `isaak`), `NEXT_PUBLIC_HOLDED_RECAPTCHA_SITE_KEY`, `NEXT_PUBLIC_APP_SITE_URL`, `APP_MCP_INTERNAL_URL`, `APP_OAUTH_INTERNAL_URL`, `MCP_DEFAULT_SCOPES`, `HOLDED_COMPANY_EMAIL_VERIFY_SECRET` **[SECRET]**, `HOLDED_CONTACT_EMAIL`, `HOLDED_SUPPORT_EMAIL`, `NEXT_PUBLIC_CLAUDE_MCP_URL`, `NEXT_PUBLIC_HOLDED_*_CONNECTOR_STATUS` (ChatGPT/Claude), `NEXT_PUBLIC_HOLDED_CLAUDE_FULL_TOOLS`, `NEXT_PUBLIC_VERIFACTU_APP_URL`.

### `apps/holded-mcp`

`BASE_URL`, `CORS_ALLOWED_ORIGINS`, `OAUTH_JWT_SECRET` **[SECRET]**, `OAUTH_DATA_ENCRYPTION_SECRET` **[SECRET]**, `OAUTH_*_TTL_SECONDS` (3 vars), `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET` **[SECRET]**, `HOLDED_API_BASE`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX_REQUESTS`, `LOG_LEVEL`, `ALLOW_STATELESS_OAUTH_IN_PRODUCTION`, `HOLDED_API_KEY` **[SECRET]**, `HOLDED_MCP_TOOL_PRESET`, `METRICOOL_USER_ID`, `METRICOOL_USER_TOKEN` **[SECRET]**.

### `apps/isaak`

El más extenso — incluye, además de lo ya cubierto en el root: `NEXTAUTH_SECRET` **[SECRET]**, `ISAAK_ANTHROPIC_API_KEY` **[SECRET]**, `OPENAI_API_KEY` **[SECRET]**, `STRIPE_SECRET_KEY`/`STRIPE_WEBHOOK_SECRET` **[SECRET]**, `STRIPE_PRICE_*` (Starter/Pro/Business × mensual/anual, Isaak mensual/anual — **planes legacy archivados** según `CLAUDE.md`), `SALTEDGE_CLIENT_ID` + `SALTEDGE_SERVICE_SECRET` **[SECRET]**, `ENABLE_BANKING_APP_ID` + `ENABLE_BANKING_PRIVATE_KEY` **[SECRET]**, `TELEGRAM_BOT_TOKEN` **[SECRET]** + relacionadas, `WHATSAPP_*` (set completo), `A3_CLIENT_ID`/`A3_CLIENT_SECRET` **[SECRET]** (conector A3), `SAGE_CLIENT_ID`/`SAGE_CLIENT_SECRET` **[SECRET]** (conector Sage), `GOCARDLESS_CLIENT_ID`/`GOCARDLESS_CLIENT_SECRET` **[SECRET]** (flujo AIS/OAuth, `apps/isaak/app/api/isaak/banking/gocardless-ais/*`) y, del flujo Bank Data más antiguo (`packages/integrations/gocardless-bank-data.ts`), `GCBD_SECRET_ID` **[SECRET]**, `GCBD_SECRET_KEY` **[SECRET]**, `GCBD_WEBHOOK_SECRET` **[SECRET]** — ambos son GoCardless pero con nombres de variable distintos; **todos ⚠️ sunset**, ver `deprecated-modules.md`, `CERT_MASTER_KEY` **[SECRET]** (cifrado de certificados AEAT), `HOLDED_KEY_SECRET` **[SECRET]** (cifrado API keys Holded), `SLACK_*` (bot/OAuth), `TRELLO_API_KEY` **[SECRET]**, `METRICOOL_*`, `SHOPIFY_*`, `GLOFOX_*` (integraciones de marketing/e-commerce), `AEAT_*` (censo, notificaciones, worker), `WRITE_TOKEN_SECRET` **[SECRET]**, `ZAPIER_WEBHOOK_SECRET` **[SECRET]**. Este es el `.env.example` que más refleja la acumulación histórica — confirma la necesidad de dividir por dominio en `packages/config` para `isaak_retro`.

### `apps/landing`

`NEXT_PUBLIC_HOLDED_FIREBASE_*` (proyecto Firebase de Holded, además del propio), `KV_REST_API_URL` + `KV_REST_API_TOKEN` **[SECRET]** (Vercel KV), `STRIPE_PRICE_*` (planes legacy `BASICO`/`PYME`/`EMPRESA`/`PRO`, distintos de los de `apps/isaak`), `ORGANIZATION_CIF`/`_NAME`/`_ADDRESS`, `ISAAK_WEBHOOK_SECRET` **[SECRET]**, `SLACK_WEBHOOK_URL` **[SECRET]**.

### `apps/isaak-video-generator`

`YT_CLIENT_ID`/`SECRET` **[SECRET]**/`REFRESH_TOKEN` **[SECRET]** (YouTube), `METRICOOL_*`, `OPENAI_API_KEY` **[SECRET]** + `OPENAI_TTS_MODEL`, `BLOB_READ_WRITE_TOKEN` **[SECRET]**, `HEYGEN_*`, `REMOTION_BROWSER_EXECUTABLE`. Confirma que es tooling de marketing, no producto (ver `deprecated-modules.md`).

### `packages/db`

`DATABASE_URL` **[SECRET]** (conexión Prisma), más `PRISMA_DATABASE_URL` **[SECRET]** como fallback en `scripts/migrate-deploy.mjs` (documentado en `CLAUDE.md`).

## Variables duplicadas/alias de base de datos (flag para el diseño nuevo)

`turbo.json` → `globalEnv` incluye variantes acumuladas de la misma conexión: `DATABASE_URL`, `DIRECT_DATABASE_URL`, `PRISMA_DATABASE_URL`, `POSTGRES_URL`, `isaak_bd_POSTGRES_URL`, `isaak_bd_DATABASE_URL`, `isaak_bd_PRISMA_DATABASE_URL`, `STORAGE_PRISMA_DATABASE_URL`, `STORAGE_DATABASE_URL`, `STORAGE_POSTGRES_URL` — restos de integraciones sucesivas de Vercel Postgres/Storage. **`isaak_retro` debe fijar una única variable canónica de conexión por entorno desde el inicio.**

## Conclusión para `isaak_retro`

- Ningún valor real se ha leído ni se copia aquí — solo nombres.
- El nuevo repo debe partir de un `.env.example` mínimo (auth, DB, IA, Stripe) y añadir variables por conector según se migre cada uno en Fase 8, no de golpe.
- Los conectores A3/Sage aparecen declarados en `.env.example` de `apps/isaak` pero no se ha confirmado en esta auditoría que tengan implementación activa — revisar antes de decidir si entran en la Fase 8 (Fase 8 solo lista Holded explícitamente en el roadmap actual).
