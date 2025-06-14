
-- Tabelle für Artikel-Bewertungen (1-5 Sterne, optional mit Fingerprint/UID für Userlimitierung)
create table public.blog_post_ratings (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references blog_posts(id) not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  created_at timestamp with time zone default now(),
  user_fingerprint text -- für LocalStorage oder Browser-Fingerprint, optional/nullable
);

-- Index zum schnellen Summieren der Bewertungen pro Artikel
create index idx_blog_post_ratings_post_id on public.blog_post_ratings (post_id);
