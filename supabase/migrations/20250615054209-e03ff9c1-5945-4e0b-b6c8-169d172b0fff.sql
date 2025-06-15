
-- Step 1: Create a helper function to safely get the current user's role.
-- This function uses SECURITY DEFINER to avoid recursive RLS checks.
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Step 2: Secure the 'profiles' table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
  
CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- Step 3: Secure the 'blog_posts' table
-- Drop the old, overly permissive policy first
DROP POLICY IF EXISTS "Allow public read access" ON public.blog_posts;

-- Enforce RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts FORCE ROW LEVEL SECURITY;

-- Add new, more secure policies
CREATE POLICY "Public can read published posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- Step 4: Secure other content-related tables
-- For blog_authors
ALTER TABLE public.blog_authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read blog authors" ON public.blog_authors FOR SELECT USING (true);
CREATE POLICY "Admins can manage blog authors" ON public.blog_authors FOR ALL USING (public.get_current_user_role() = 'admin');

-- For blog_categories
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read blog categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage blog categories" ON public.blog_categories FOR ALL USING (public.get_current_user_role() = 'admin');

-- For blog_tags
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read blog tags" ON public.blog_tags FOR SELECT USING (true);
CREATE POLICY "Admins can manage blog tags" ON public.blog_tags FOR ALL USING (public.get_current_user_role() = 'admin');

-- For blog_post_tags (junction table)
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read post-tag relations" ON public.blog_post_tags FOR SELECT USING (true);
CREATE POLICY "Admins can manage post-tag relations" ON public.blog_post_tags FOR ALL USING (public.get_current_user_role() = 'admin');

-- Step 5: Secure the 'blog_post_ratings' table
ALTER TABLE public.blog_post_ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read ratings" ON public.blog_post_ratings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert ratings" ON public.blog_post_ratings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete ratings" ON public.blog_post_ratings FOR DELETE USING (public.get_current_user_role() = 'admin');

