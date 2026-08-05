CREATE TABLE IF NOT EXISTS public.blog_generation_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mode text NOT NULL DEFAULT 'create',
  category text,
  focus_keyword text,
  status text NOT NULL,
  error_message text,
  post_slug text,
  post_title text,
  model text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_generation_runs TO authenticated;
GRANT ALL ON public.blog_generation_runs TO service_role;
ALTER TABLE public.blog_generation_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read generation runs"
ON public.blog_generation_runs FOR SELECT TO authenticated
USING (public.get_current_user_role() = 'admin');

CREATE TABLE IF NOT EXISTS public.search_console_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dimension text NOT NULL,
  query text,
  page text,
  clicks numeric NOT NULL DEFAULT 0,
  impressions numeric NOT NULL DEFAULT 0,
  ctr numeric NOT NULL DEFAULT 0,
  position numeric NOT NULL DEFAULT 0,
  period_start date,
  period_end date,
  synced_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS search_console_stats_unique
ON public.search_console_stats (dimension, coalesce(query, ''), coalesce(page, ''));

CREATE INDEX IF NOT EXISTS search_console_stats_impressions_idx
ON public.search_console_stats (impressions DESC);

GRANT SELECT ON public.search_console_stats TO anon;
GRANT SELECT ON public.search_console_stats TO authenticated;
GRANT ALL ON public.search_console_stats TO service_role;
ALTER TABLE public.search_console_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read search console stats"
ON public.search_console_stats FOR SELECT
USING (true);

ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS image_alt text,
  ADD COLUMN IF NOT EXISTS image_credit text,
  ADD COLUMN IF NOT EXISTS focus_keyword text,
  ADD COLUMN IF NOT EXISTS last_refreshed_at timestamptz;

CREATE OR REPLACE FUNCTION public.increment_post_view(post_slug text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.blog_posts
  SET view_count = coalesce(view_count, 0) + 1
  WHERE slug = post_slug AND status = 'published';
$$;

GRANT EXECUTE ON FUNCTION public.increment_post_view(text) TO anon, authenticated;