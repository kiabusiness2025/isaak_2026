# @isaak/integrations

**Función:** clientes de conectores externos — Holded, bancos, Google, Microsoft, AEAT,
WhatsApp. Equivalente en el repo `isaak`: `packages/integrations` (30 archivos) —
fuertemente acoplado a Holded por diseño (tipos nombrados `Holded*` en vez de genéricos);
rediseñar con tipos `Connector*` neutrales desde el día 1 (ninguna integración concreta
debe dominar el nombrado de tipos, ni siquiera Holded), ver
`docs/migration/deprecated-modules.md` §2 en ese repo.

Estado: esqueleto vacío, sin contenido migrado. Antes de portar código real, revisar la
ficha de migración correspondiente en `docs/migration/reusable-modules.md` (repo `isaak`).
