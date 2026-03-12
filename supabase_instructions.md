- **Supabase Storage Bucket:** Necesitamos crear un bucket público en Supabase llamado `contracts`.
- Ir a Supabase -> Storage -> New Bucket.
- Nombrarlo `contracts` y hacer click en "Public bucket".
- (Opcional) Configurar las políticas de RLS para el Bucket `contracts` dando permisos de lectura y escritura.

- **Supabase DB:** Se ha generado un script SQL de migración en la dirección `supabase/migrations/20260312191500_add_signed_contract_url.sql`. Tenés que correrlo en tu DB de Producción (o a través del panel SQL Editor) para añadir las columnas `signed_contract_url` y `signed_at` a la tabla `proposals`.
