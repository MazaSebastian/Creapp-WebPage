-- =========================================================
-- CreAPP Proposal Generator — Supabase Schema
-- =========================================================

-- PROPOSALS: Main table holding each client proposal
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  date TEXT NOT NULL DEFAULT 'Marzo 2026',
  location TEXT NOT NULL DEFAULT 'Buenos Aires, Argentina',
  description TEXT NOT NULL DEFAULT '',
  total_value TEXT NOT NULL DEFAULT 'USD 0',

  -- Branding
  brand_color_primary TEXT NOT NULL DEFAULT '#ff007f',
  brand_color_secondary TEXT NOT NULL DEFAULT '#9d00ff',
  client_logo_url TEXT,
  developer_signature_url TEXT,

  -- Status
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','signed')),

  -- Contract
  contract_text TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- PROPOSAL INCLUSIONS (scope inclusions)
CREATE TABLE proposal_inclusions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  tooltip TEXT NOT NULL DEFAULT '',
  icon_name TEXT NOT NULL DEFAULT 'CheckCircle2',
  sort_order INT NOT NULL DEFAULT 0
);

-- PROPOSAL EXCLUSIONS (scope exclusions)
CREATE TABLE proposal_exclusions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  tooltip TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0
);

-- PROPOSAL MILESTONES (timeline/cronograma)
CREATE TABLE proposal_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  week_range TEXT NOT NULL DEFAULT '1-2',
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Rocket',
  sort_order INT NOT NULL DEFAULT 0
);

-- PROPOSAL PAYMENTS (payment structure)
CREATE TABLE proposal_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  percentage TEXT NOT NULL DEFAULT '0%',
  label TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  tooltip TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0
);

-- PROPOSAL PROJECT OPTIONS (the prototype cards, e.g., Premium 3D vs Standard)
CREATE TABLE proposal_project_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  demo_url TEXT,
  github_url TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  style_variant TEXT NOT NULL DEFAULT 'premium' CHECK (style_variant IN ('premium','standard')),
  sort_order INT NOT NULL DEFAULT 0
);

-- PROPOSAL INFRASTRUCTURE COSTS (recurring monthly costs the client assumes)
CREATE TABLE proposal_infrastructure_costs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT '',
  monthly_cost TEXT NOT NULL DEFAULT 'USD 0',
  description TEXT NOT NULL DEFAULT '',
  is_optional BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0
);

-- =========================================================
-- Row Level Security (RLS)
-- =========================================================

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_exclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_project_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_infrastructure_costs ENABLE ROW LEVEL SECURITY;

-- Public read access for published proposals (for the client-facing view)
CREATE POLICY "Public can read published proposals"
  ON proposals FOR SELECT
  USING (status IN ('published', 'signed'));

CREATE POLICY "Public can read inclusions of published proposals"
  ON proposal_inclusions FOR SELECT
  USING (proposal_id IN (SELECT id FROM proposals WHERE status IN ('published','signed')));

CREATE POLICY "Public can read exclusions of published proposals"
  ON proposal_exclusions FOR SELECT
  USING (proposal_id IN (SELECT id FROM proposals WHERE status IN ('published','signed')));

CREATE POLICY "Public can read milestones of published proposals"
  ON proposal_milestones FOR SELECT
  USING (proposal_id IN (SELECT id FROM proposals WHERE status IN ('published','signed')));

CREATE POLICY "Public can read payments of published proposals"
  ON proposal_payments FOR SELECT
  USING (proposal_id IN (SELECT id FROM proposals WHERE status IN ('published','signed')));

CREATE POLICY "Public can read project options of published proposals"
  ON proposal_project_options FOR SELECT
  USING (proposal_id IN (SELECT id FROM proposals WHERE status IN ('published','signed')));

CREATE POLICY "Public can read infrastructure costs of published proposals"
  ON proposal_infrastructure_costs FOR SELECT
  USING (proposal_id IN (SELECT id FROM proposals WHERE status IN ('published','signed')));

-- Authenticated (admin) full access
CREATE POLICY "Admin full access to proposals"
  ON proposals FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to inclusions"
  ON proposal_inclusions FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to exclusions"
  ON proposal_exclusions FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to milestones"
  ON proposal_milestones FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to payments"
  ON proposal_payments FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to project options"
  ON proposal_project_options FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to infrastructure costs"
  ON proposal_infrastructure_costs FOR ALL
  USING (auth.role() = 'authenticated');

-- =========================================================
-- Indexes for performance
-- =========================================================
CREATE INDEX idx_proposals_slug ON proposals(slug);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_inclusions_proposal ON proposal_inclusions(proposal_id);
CREATE INDEX idx_exclusions_proposal ON proposal_exclusions(proposal_id);
CREATE INDEX idx_milestones_proposal ON proposal_milestones(proposal_id);
CREATE INDEX idx_payments_proposal ON proposal_payments(proposal_id);
CREATE INDEX idx_project_options_proposal ON proposal_project_options(proposal_id);
CREATE INDEX idx_infrastructure_costs_proposal ON proposal_infrastructure_costs(proposal_id);
