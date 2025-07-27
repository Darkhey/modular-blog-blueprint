-- Add rate limiting for blog post ratings
CREATE OR REPLACE FUNCTION public.check_rating_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Check if authenticated user has submitted more than 10 ratings in the last hour
  IF auth.uid() IS NOT NULL THEN
    SELECT COUNT(*)
    INTO recent_count
    FROM public.blog_post_ratings
    WHERE created_at > NOW() - INTERVAL '1 hour'
    AND user_fingerprint = NEW.user_fingerprint;
    
    IF recent_count >= 10 THEN
      RAISE EXCEPTION 'Rate limit exceeded. Please wait before submitting more ratings.';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for rate limiting
CREATE TRIGGER rating_rate_limit_trigger
  BEFORE INSERT ON public.blog_post_ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.check_rating_rate_limit();

-- Add constraint to ensure rating is between 1 and 5
ALTER TABLE public.blog_post_ratings 
ADD CONSTRAINT rating_range_check 
CHECK (rating >= 1 AND rating <= 5);

-- Add index for better performance on rate limiting queries
CREATE INDEX IF NOT EXISTS idx_blog_post_ratings_created_at_fingerprint 
ON public.blog_post_ratings(created_at, user_fingerprint);

-- Update RLS policy for better security
DROP POLICY IF EXISTS "Authenticated users can insert ratings" ON public.blog_post_ratings;

CREATE POLICY "Authenticated users can insert ratings with validation"
ON public.blog_post_ratings
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND post_id IS NOT NULL 
  AND rating IS NOT NULL 
  AND rating >= 1 
  AND rating <= 5
);