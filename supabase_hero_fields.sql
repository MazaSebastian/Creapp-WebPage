-- =========================================================
-- Add hero_badge and hero_title to proposals table
-- =========================================================

ALTER TABLE proposals ADD COLUMN IF NOT EXISTS hero_badge TEXT DEFAULT NULL;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS hero_title TEXT DEFAULT NULL;

-- Optional: Set values for existing Astilleros Vision proposal
-- UPDATE proposals
--   SET hero_badge = '⚙️ TECNOLOGÍA PARA ASTILLEROS',
--       hero_title = 'La plataforma que tu operación necesita para escalar con confianza.'
--   WHERE slug = 'astilleros-vision';
