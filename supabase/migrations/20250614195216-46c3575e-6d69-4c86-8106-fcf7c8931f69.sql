
-- NEUES TAG "PHOTOVOLTAIK" HINZUFÜGEN
INSERT INTO blog_tags (name, slug)
SELECT 'Photovoltaik', 'photovoltaik'
WHERE NOT EXISTS (SELECT 1 FROM blog_tags WHERE slug = 'photovoltaik');

-- NEUER ARTIKEL: SOLARENERGIE
INSERT INTO blog_posts (
  title, slug, excerpt, content, category_id, author_id, status, cover_url, hero_image_url, topic, topic_color, published_at, read_time,
  seo_title, seo_description, keywords, table_of_contents, difficulty,
  savings_potential, payback_time, funding_available, effort_level, key_benefits, important_notice, costs, is_featured
) VALUES (
  'Solarenergie: Unabhängig und zukunftssicher mit Strom vom eigenen Dach',
  'solarenergie-zukunft-eigenheim',
  'Machen Sie sich unabhängig von steigenden Strompreisen. Erfahren Sie alles über Photovoltaik zur Stromerzeugung, die Vorteile und wie Sie die Sonnenenergie optimal für Ihr Zuhause nutzen.',
  '<h2>Die Kraft der Sonne für Ihr Zuhause nutzen</h2><p>Solarenergie ist eine der saubersten und nachhaltigsten Energiequellen. Mit einer eigenen Solaranlage auf dem Dach produzieren Sie Ihren eigenen Strom, senken Ihre Energiekosten drastisch und leisten einen wertvollen Beitrag zum Klimaschutz. Die Technologie ist ausgereift, langlebig und wird staatlich gefördert.</p><img src="https://images.unsplash.com/photo-1545239351-ef35f43d514b" alt="Eine Person reinigt ein Solarmodul auf einem Dach, die Sonne scheint." style="width:100%;border-radius:8px;margin:16px 0;"><h3>Photovoltaik (PV): Strom selbst erzeugen</h3><p>Eine Photovoltaikanlage wandelt Sonnenlicht direkt in elektrischen Strom um. Diesen können Sie im Haushalt selbst verbrauchen, in einem Batteriespeicher für später sichern oder gegen eine Vergütung ins öffentliche Netz einspeisen.</p><ul><li><strong>Vorteile:</strong> Deutlich niedrigere Stromrechnung, Unabhängigkeit vom Stromanbieter, Wertsteigerung der Immobilie.</li><li><strong>Tipp:</strong> Kombinieren Sie Ihre PV-Anlage mit einer Wärmepumpe, um auch Ihre Heizkosten zu minimieren.</li></ul><h3>Solarthermie: Warmwasser durch Sonnenkraft</h3><p>Solarthermieanlagen nutzen die Sonnenwärme, um Wasser zu erhitzen. Dies kann sowohl für das tägliche Dusch- und Badewasser als auch zur Unterstützung der Heizung genutzt werden.</p><h3>Ist mein Dach geeignet?</h3><p>Die meisten Dächer in Deutschland sind für Solaranlagen geeignet. Idealerweise ist das Dach nach Süden ausgerichtet und hat eine Neigung von etwa 30 Grad. Aber auch Ost-West-Ausrichtungen können sehr profitabel sein, da sie die Stromproduktion über den Tag verteilen. Ein Fachbetrieb kann eine genaue Analyse durchführen.</p>',
  (SELECT id FROM blog_categories WHERE slug='solarenergie'),
  (SELECT id FROM blog_authors WHERE name='Max Mustermann'),
  'published',
  'https://images.unsplash.com/photo-1545239351-ef35f43d514b',
  'https://images.unsplash.com/photo-1545239351-ef35f43d514b',
  'Solarenergie',
  '#f59e0b',
  '2025-06-20T00:00:00Z',
  7,
  'Photovoltaik & Solarenergie: Ihr Weg in die Unabhängigkeit',
  'Alles, was Sie über Solarenergie wissen müssen. Leitfaden für Photovoltaik-Anlagen, Stromspeicher und wie Sie mit der Sonne Geld sparen und die Umwelt schützen.',
  ARRAY['Solarenergie', 'Photovoltaik', 'PV-Anlage', 'Stromspeicher', 'Unabhängigkeit', 'Stromkosten sparen'],
  '[{"id": "intro", "title": "Die Kraft der Sonne"}, {"id": "photovoltaik", "title": "Photovoltaik für Strom"}, {"id": "solarthermie", "title": "Solarthermie für Wärme"}, {"id": "eignung", "title": "Ist mein Dach geeignet?"}]',
  2,
  'Bis zu 80% Stromkosten',
  '9-14 Jahre',
  'Ja, KfW & Einspeisevergütung',
  'Mittel',
  ARRAY['Massive Senkung der Stromkosten', 'Schutz vor steigenden Energiepreisen', 'Aktiver Beitrag zum Klimaschutz', 'Staatliche Förderungen und Vergütungen'],
  'Eine sorgfältige Planung durch einen Fachbetrieb ist entscheidend für die maximale Effizienz und Rentabilität Ihrer Anlage.',
  '[{"item": "PV-Anlage (10 kWp)", "costPerSqm": null, "totalCost": "15.000€ - 20.000€", "funding": "KfW, Einspeisevergütung"}, {"item": "Stromspeicher (10 kWh)", "costPerSqm": null, "totalCost": "8.000€ - 12.000€", "funding": "Teilweise Förderprogramme"}]',
  TRUE
);

-- Zuordnung von Tags zum neuen Solar-Post
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT
  (SELECT id FROM blog_posts WHERE slug = 'solarenergie-zukunft-eigenheim'),
  t.id
FROM blog_tags t
WHERE t.slug IN ('photovoltaik', 'energie-sparen', 'foerdermittel-2024');
