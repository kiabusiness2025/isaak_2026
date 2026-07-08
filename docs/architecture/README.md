# docs/architecture

Decisiones de arquitectura propias de `isaak_2026`: estructura del monorepo, límites entre
paquetes, convenciones de datos/auth/integraciones para la Fase 5+ (app autenticada, billing,
conectores, admin).

Carpeta nueva — el repo `isaak` (legacy) no tenía una carpeta `docs/architecture` dedicada;
sus decisiones de arquitectura estaban dispersas en `CLAUDE.md` y en los propios módulos.

Decisiones ya tomadas (documentadas en `docs/migration/TRANSFER_PLAN_2026.md`, no
duplicadas aquí):

- **Un proyecto Vercel por app** (`isaak-retro-web`/`apps/web`/`isaak.es`,
  `isaak-retro-app`/`apps/app`/`app.isaak.es`, `isaak-retro-admin`/`apps/admin`/
  `admin.isaak.es`) — ver Fase 8 del plan de traspaso. La unificación es de marca/datos/
  core compartido (packages), no de runtime.
- **`packages/integrations` "connector-neutral"** desde los nombres de tipos (`Connector*`,
  nunca `Holded*`) — ver Fase 4 del plan de traspaso y
  `docs/migration/deprecated-modules.md` §2 en el repo `isaak`.
- **Migración de sesión `isaak.app` → `isaak.es`** tratada como migración real (dominios
  raíz distintos), no como cambio de subdominio — ver Fase 9 del plan de traspaso.

Pendiente de decidir (no añadir esqueleto hasta resolver): si el core común suma
`packages/{ai,events,audit}` más allá de los ya scaffoldeados — ver §6 del plan de
traspaso.
