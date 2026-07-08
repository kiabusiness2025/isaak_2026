# docs/architecture

Decisiones de arquitectura propias de `isaak_2026`: estructura del monorepo, límites entre
paquetes, convenciones de datos/auth/integraciones para la Fase 5+ (app autenticada, billing,
conectores, admin).

Carpeta nueva — el repo `isaak` (legacy) no tenía una carpeta `docs/architecture` dedicada;
sus decisiones de arquitectura estaban dispersas en `CLAUDE.md` y en los propios módulos.
Todavía sin contenido: se irá poblando a medida que se tomen decisiones concretas de
Fase 5+ (por ejemplo, el diseño de `packages/integrations` como "connector-neutral" desde
los nombres de tipos, no solo desde el copy — ver `docs/migration/deprecated-modules.md` §2
en el repo `isaak`).
