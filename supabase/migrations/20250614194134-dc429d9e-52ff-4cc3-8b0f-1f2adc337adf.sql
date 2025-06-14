
-- NEUER ARTIKEL: HEIZUNG IM ALTBAU
INSERT INTO blog_posts (
  title, slug, excerpt, content, category_id, author_id, status, cover_url, hero_image_url, topic, topic_color, published_at, read_time,
  seo_title, seo_description, keywords, table_of_contents, difficulty,
  savings_potential, payback_time, funding_available, effort_level, key_benefits, important_notice, costs, is_featured
) VALUES (
  'Die richtige Heizung für den Altbau: Optionen und Förderungen 2025',
  'heizung-altbau-optionen-foerderung-2025',
  'Die Heizungsmodernisierung im Altbau ist eine Herausforderung, aber auch eine große Chance. Erfahren Sie, welche Heizsysteme sich eignen, wie Sie Kosten sparen und welche Förderungen Sie 2025 beantragen können.',
  '<h2>Die Herausforderung: Effizient Heizen im Altbau</h2><p>Ältere Gebäude haben oft einen höheren Wärmebedarf und schlechter gedämmte Hüllen. Das macht die Wahl des richtigen Heizsystems entscheidend. Eine moderne Heizung muss nicht nur effizient sein, sondern auch mit den Gegebenheiten wie alten Rohrleitungen und Heizkörpern harmonieren.</p><img src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="Moderne Heizungstechnik" style="width:100%;border-radius:8px;margin:16px 0;"><h3>Option 1: Die Wärmepumpe im Altbau</h3><p>Lange galt die Wärmepumpe als ungeeignet für den Altbau. Dank moderner Hochtemperatur-Wärmepumpen und der Möglichkeit, sie mit größeren Heizkörpern oder einer Fußbodenheizung zu kombinieren, ist sie heute oft eine sehr gute Wahl. Voraussetzung ist eine genaue Prüfung durch einen Fachmann.</p><h3>Option 2: Die Hybridheizung</h3><p>Eine Hybridheizung kombiniert eine umweltfreundliche Wärmepumpe mit einem konventionellen Heizkessel (z.B. Gas). Das System schaltet intelligent zwischen den Wärmeerzeugern um und sorgt so für maximale Effizienz und Versorgungssicherheit, auch an sehr kalten Tagen.</p><h3>Option 3: Pelletheizung</h3><p>Heizen mit Holzpellets ist CO2-neutral und eine bewährte Alternative. Der Nachteil ist der Platzbedarf für das Pelletlager und der höhere Wartungsaufwand im Vergleich zu einer Wärmepumpe.',
  (SELECT id FROM blog_categories WHERE slug='heizung-modernisieren'),
  (SELECT id FROM blog_authors WHERE name='Max Mustermann'),
  'published',
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'Heizung modernisieren',
  '#dc2626',
  '2025-06-14T00:00:00Z',
  10,
  'Heizung im Altbau 2025: Beste Optionen & Förderungen',
  'Ratgeber zur Heizungsmodernisierung im Altbau. Vergleich von Wärmepumpe, Hybridheizung & Co. Alle BAFA- und KfW-Förderungen für 2025 im Überblick.',
  ARRAY['Heizung Altbau', 'Wärmepumpe Altbau', 'Heizung sanieren', 'Förderung Heizung 2025', 'BAFA', 'Hybridheizung'],
  '[{"id": "problem-altbau", "title": "Das Problem mit dem Altbau"}, {"id": "waermepumpe", "title": "Wärmepumpe im Altbau?"}, {"id": "hybrid", "title": "Hybridlösungen als Kompromiss"}, {"id": "foerderung", "title": "Förderungen 2025"}]',
  3,
  'Bis zu 60%',
  '9-16 Jahre',
  'Ja, bis zu 70% über BAFA',
  'Hoch',
  ARRAY['Heizkosten drastisch senken', 'Wohnkomfort erhöhen', 'Immobilienwert steigern', 'Unabhängig von fossilen Brennstoffen werden'],
  'Prüfen Sie vor der Sanierung den Dämmstandard Ihres Hauses. Ein Energieberater ist oft Pflicht für die Förderung.',
  '[{"item": "Hochtemperatur-Wärmepumpe", "totalCost": "25.000€"}, {"item": "Hybrid-System (Gas + WP)", "totalCost": "20.000€"}]',
  FALSE
);

-- Zuordnung von Tags zum neuen Post
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT
  (SELECT id FROM blog_posts WHERE slug = 'heizung-altbau-optionen-foerderung-2025'),
  t.id
FROM blog_tags t
WHERE t.slug IN ('waermepumpe', 'sanierung');

