-- RLS Policy to allow ANYONE to upload files to the contracts bucket
-- This is necessary because the client signing the contract is not an authenticated Supabase user.

-- 1. Ensure the bucket is public (if you haven't done it via the UI)
UPDATE storage.buckets
SET public = true
WHERE id = 'contracts';

-- 2. Create the policy to allow anonymous inserts (uploads)
CREATE POLICY "Allow anonymous uploads to contracts"
ON storage.objects FOR INSERT
TO public
WITH CHECK ( bucket_id = 'contracts' );

-- 3. Create the policy to allow viewing (so they can download the PDF after)
CREATE POLICY "Allow public viewing of contracts"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'contracts' );
