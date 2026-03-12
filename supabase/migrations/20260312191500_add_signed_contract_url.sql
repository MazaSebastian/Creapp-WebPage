-- Add signed contract support to proposals
ALTER TABLE public.proposals
ADD COLUMN IF NOT EXISTS signed_contract_url text;

-- Add signed at timestamp
ALTER TABLE public.proposals
ADD COLUMN IF NOT EXISTS signed_at timestamp with time zone;
