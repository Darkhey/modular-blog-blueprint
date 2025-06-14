-- BLOG AUTOREN (optional für Multi-Author-Blog)
CREATE TABLE IF NOT EXISTS blog_authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  short_bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BLOG CATEGORIES (Themenbereiche für Artikel, optional)
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  color TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BLOG TAGS (Mehrfach-Zuweisung pro Artikel möglich, optional)
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BLOGARTIKEL
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  -- Verknüpfung mit Kategorie (z.B. "Heizung", "Dämmung")
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  -- Autoreninfo
  author_id UUID REFERENCES blog_authors(id) ON DELETE SET NULL,
  -- Status: Entwurf, veröffentlicht, archiviert
  status TEXT NOT NULL DEFAULT 'published', -- oder ENUM in Zukunft
  -- Bild-Felder: Titel- & Vorschaubild
  cover_url TEXT,
  hero_image_url TEXT,
  -- Mediale Inhalte (z.B. Video, Galerie)
  video_url TEXT,
  gallery_urls TEXT[],
  -- Thema für Label/Badge
  topic TEXT NOT NULL,
  topic_color TEXT NOT NULL,
  -- SEO Felder
  seo_title TEXT,
  seo_description TEXT,
  keywords TEXT[],
  -- Inhaltsverzeichnis (JSON für dynamische Generierung)
  table_of_contents JSONB,
  -- Meta: Publikationsdatum, Lesedauer etc.
  published_at TIMESTAMPTZ DEFAULT NOW(),
  read_time INTEGER NOT NULL,
  -- Komplexitätsgrad etc.
  difficulty INTEGER DEFAULT 2 CHECK (difficulty >= 1 AND difficulty <= 3),
  savings_potential TEXT,
  payback_time TEXT,
  funding_available TEXT,
  effort_level TEXT,
  -- Vorteile als Array/Text
  key_benefits TEXT[],
  important_notice TEXT,
  -- Kostenaufstellung JSON
  costs JSONB,
  -- Zusätzliche Felder für Features/Skalierbarkeit
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  -- Zeitstempel
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags Zuordnung (N:N Beziehung, viele Tags pro Post)
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Sichtbarkeit & Zugriff (Optional, z.B. für Premium-Artikel)
-- ALTER TABLE blog_posts ADD COLUMN visibility TEXT DEFAULT 'public';

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON blog_posts
  FOR SELECT USING (true);

-- Indexe für Performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_topic ON blog_posts(topic);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);

-- EXAMPLE DATA für Autoren, Kategorien, Tags (nur falls DB frisch aufgesetzt)
INSERT INTO blog_authors (name, short_bio, avatar_url) VALUES
  ('Max Mustermann', 'Experte für energetische Sanierung.', NULL),
  ('Julia Musterfrau', 'BAFA-Fördermittelberaterin', NULL);

INSERT INTO blog_categories (name, slug, color, description) VALUES
  ('Heizung modernisieren', 'heizung-modernisieren', '#dc2626', 'Alle Beiträge zum Thema Heizungsmodernisierung'),
  ('Dämmung & Isolierung', 'daemmung-isolierung', '#7c3aed', 'Dämmmaßnahmen im Detail'),
  ('Fördermittel', 'foerdermittel', '#059669', 'Fördermittel und Zuschüsse 2024'),
  ('Solarenergie', 'solarenergie', '#f59e0b', 'Photovoltaik, Solarthermie und mehr');

INSERT INTO blog_tags (name, slug) VALUES
  ('Wärmepumpe', 'waermepumpe'),
  ('BAFA', 'bafa'),
  ('Sanierung', 'sanierung'),
  ('Energie sparen', 'energie-sparen'),
  ('Fördermittel 2024', 'foerdermittel-2024'),
  ('KfW', 'kfw');

-- EXISTING POST INSERTS müssen an neue Struktur angepasst werden; ggf. Demo nur für 1 Post:
INSERT INTO blog_posts (
  title, slug, excerpt, content, category_id, author_id, status, cover_url, hero_image_url, video_url, gallery_urls, topic, topic_color, published_at, read_time,
  seo_title, seo_description, keywords, table_of_contents, difficulty,
  savings_potential, payback_time, funding_available, effort_level, key_benefits, important_notice, costs, is_featured
) VALUES (
  'Heizung modernisieren: Bis zu 40% Energiekosten sparen',
  'heizung-modernisieren-energiekosten-sparen',
  'Erfahren Sie, welche modernen Heizsysteme sich lohnen und wie Sie staatliche Förderungen optimal nutzen können.',
  '# Markdowncontent hier (gekürzt für Demo)',
  (SELECT id FROM blog_categories WHERE slug='heizung-modernisieren'),
  (SELECT id FROM blog_authors LIMIT 1),
  'published',
  NULL, NULL, NULL, NULL,
  'Heizung modernisieren',
  '#dc2626',
  '2024-01-15T00:00:00Z',
  8,
  'Heizung modernisieren 2024: Bis zu 40% sparen + 70% Förderung',
  'Heizung modernisieren und bis zu 40% Energiekosten sparen. Alle Fördermittel, beste Heizsysteme und Schritt-für-Schritt Anleitung.',
  ARRAY['Heizung modernisieren', 'Energiekosten sparen', 'Wärmepumpe', 'BAFA Förderung'],
  '[{"id": "wann-modernisieren", "title": "Wann modernisieren?"}]',
  2,
  'Bis zu 40%',
  '8-12 Jahre',
  'Ja, bis zu 70%',
  'Mittel bis hoch',
  ARRAY['Bis zu 40% weniger Heizkosten', 'Staatliche Förderung bis 70%'],
  'Förderanträge müssen vor Vertragsabschluss gestellt werden.',
  '[{"item": "Luftwärmepumpe", "costPerSqm": "100€", "totalCost": "15.000€", "funding": "70%"}]',
  TRUE
);

-- Zuordnung von Tags zu Posts (Beispiel)
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT bp.id, t.id FROM blog_posts bp
  JOIN blog_tags t ON t.slug IN ('waermepumpe', 'bafa')
WHERE bp.slug = 'heizung-modernisieren-energiekosten-sparen';

-- NEUER ARTIKEL: MODERNE HEIZSYSTEME
INSERT INTO blog_posts (
  title, slug, excerpt, content, category_id, author_id, status, cover_url, hero_image_url, topic, topic_color, published_at, read_time,
  seo_title, seo_description, keywords, table_of_contents, difficulty,
  savings_potential, payback_time, funding_available, effort_level, key_benefits, important_notice, costs, is_featured
) VALUES (
  'Moderne Heizsysteme im Vergleich: Was lohnt sich für Sie?',
  'moderne-heizsysteme-vergleich',
  'Von Wärmepumpen bis zu Hybridlösungen – wir zeigen Ihnen, welche Heizung für Ihr Zuhause die richtige ist und wie Sie von Förderungen profitieren.',
  '<h2>Finden Sie die perfekte Heizung für Ihr Zuhause</h2><p>Die Wahl des richtigen Heizsystems ist eine der wichtigsten Entscheidungen bei einer Sanierung oder einem Neubau. Angesichts der Klimaziele und steigender Energiepreise rücken umweltfreundliche und effiziente Technologien in den Fokus. Doch welche Option ist die beste für Ihre individuelle Situation?</p><h3>Wärmepumpen: Die Zukunft des Heizens</h3><p>Wärmepumpen nutzen Umweltenergie aus der Luft, dem Erdreich oder dem Grundwasser und wandeln sie in Heizwärme um. Sie sind besonders umweltfreundlich, wenn sie mit Ökostrom betrieben werden, und werden hoch staatlich gefördert.</p><img src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="Nahaufnahme einer modernen elektronischen Schaltung" style="width:100%;border-radius:8px;margin:16px 0;"><h3>Hybridheizungen: Das Beste aus zwei Welten</h3><p>Eine Hybridheizung kombiniert eine Wärmepumpe mit einem konventionellen Heizsystem, oft einer Gas-Brennwerttherme. Das System wählt intelligent die jeweils günstigste und effizienteste Energiequelle. Dies bietet hohe Versorgungssicherheit, auch in weniger gut gedämmten Altbauten.</p><h3>Pelletheizungen: Heizen mit Holz</h3><p>Holzpellets sind ein nachwachsender Rohstoff und gelten als CO2-neutral. Pelletheizungen sind eine gute Alternative zu fossilen Brennstoffen, erfordern aber einen Lagerraum für die Pellets.</p>',
  (SELECT id FROM blog_categories WHERE slug='heizung-modernisieren'),
  (SELECT id FROM blog_authors WHERE name='Max Mustermann'),
  'published',
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'Heizung modernisieren',
  '#dc2626',
  '2024-05-20T00:00:00Z',
  9,
  'Moderne Heizsysteme 2024: Der große Vergleich für Ihr Haus',
  'Der ultimative Vergleich moderner Heizsysteme: Wärmepumpe, Hybridheizung, Pellets und mehr. Finden Sie die beste und sparsamste Lösung für Ihr Zuhause.',
  ARRAY['Heizsysteme Vergleich', 'Wärmepumpe', 'Hybridheizung', 'Pelletheizung', 'Heizung Förderung'],
  '[{"id": "einleitung", "title": "Warum jetzt wechseln?"}, {"id": "waermepumpe", "title": "Die Wärmepumpe"}, {"id": "hybrid", "title": "Die Hybridheizung"}, {"id": "fazit", "title": "Fazit"}]',
  3,
  'Bis zu 50%',
  '7-15 Jahre',
  'Ja, hohe Förderungen',
  'Hoch',
  ARRAY['Unabhängigkeit von Öl & Gas', 'Senkung der Heizkosten', 'Aktiver Beitrag zum Klimaschutz'],
  'Die Förderlandschaft ändert sich schnell. Lassen Sie sich vorab von einem Energieberater informieren.',
  '[{"item": "Wärmepumpe", "costPerSqm": "120€", "totalCost": "18.000€", "funding": "Bis zu 70%"}, {"item": "Hybridheizung", "costPerSqm": "100€", "totalCost": "15.000€", "funding": "Bis zu 60%"}]',
  FALSE
);
