
-- Add scheduled_for column to blog_posts table for content scheduling
ALTER TABLE public.blog_posts 
ADD COLUMN scheduled_for TIMESTAMP WITH TIME ZONE;

-- Create an index for better performance when querying scheduled posts
CREATE INDEX idx_blog_posts_scheduled_for ON public.blog_posts(scheduled_for);

-- Update existing posts to have NULL scheduled_for (which is fine)
-- No update needed as NULL is the default
