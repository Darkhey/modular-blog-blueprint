
-- NEUER ARTIKEL: DÄMMUNG RATGEBER
INSERT INTO blog_posts (
  title, slug, excerpt, content, category_id, author_id, status, cover_url, hero_image_url, topic, topic_color, published_at, read_time,
  seo_title, seo_description, keywords, table_of_contents, difficulty,
  savings_potential, payback_time, funding_available, effort_level, key_benefits, important_notice, costs, is_featured
) VALUES (
  'Effektive Dämmung: Der ultimative Ratgeber für Ihr Zuhause',
  'effektive-daemmung-ratgeber',
  'Eine gute Dämmung ist der Schlüssel zu niedrigeren Heizkosten und mehr Wohnkomfort. Erfahren Sie alles über Materialien, Methoden und Fördermöglichkeiten für Dach, Fassade und Keller.',
  '<h2>Warum Dämmung die beste Investition in Ihr Haus ist</h2><p>Heizkosten machen einen Großteil der laufenden Kosten eines Hauses aus. Eine professionelle Dämmung reduziert den Wärmeverlust um bis zu 70% und steigert nicht nur den Wert Ihrer Immobilie, sondern auch den Wohnkomfort erheblich. Im Sommer schützt sie zudem vor Überhitzung.</p><img src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843" alt="Ein Sonnenstrahl durchbricht das Blätterdach eines Waldes, was Wärme symbolisiert" style="width:100%;border-radius:8px;margin:16px 0;"><h3>Dachbodendämmung: Wärme bleibt im Haus</h3><p>Da Wärme nach oben steigt, ist das Dach die größte Schwachstelle. Eine Dämmung der obersten Geschossdecke ist oft die einfachste und rentabelste Maßnahme. Alternativ kann eine Zwischensparren- oder Aufsparrendämmung erfolgen.</p><ul><li><strong>Materialien:</strong> Mineralwolle, Holzfaser, Zellulose</li><li><strong>Kosten:</strong> ca. 25-60 €/m²</li></ul><h3>Fassadendämmung: Die schützende Hülle</h3><p>Eine Außendämmung (WDVS) ist die effektivste, aber auch teuerste Methode. Alternativ gibt es die Einblasdämmung für zweischaliges Mauerwerk oder eine Innendämmung, die jedoch bauphysikalisch anspruchsvoll ist.</p><ul><li><strong>Materialien:</strong> Polystyrol (EPS), Mineralwolle, Holzfaserplatten</li><li><strong>Kosten:</strong> ca. 100-250 €/m² für WDVS</li></ul><h3>Kellerdämmung: Kalte Füße ade</h3><p>Die Dämmung der Kellerdecke verhindert kalte Böden im Erdgeschoss und ist relativ einfach umzusetzen. Platten aus Hartschaum oder Mineralwolle werden einfach unter die Decke geklebt oder gedübelt.</p><ul><li><strong>Materialien:</strong> EPS, XPS, Mineralwolle</li><li><strong>Kosten:</strong> ca. 20-40 €/m²</li></ul>',
  (SELECT id FROM blog_categories WHERE slug='daemmung-isolierung'),
  (SELECT id FROM blog_authors WHERE name='Max Mustermann'),
  'published',
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
  'Dämmung & Isolierung',
  '#7c3aed',
  '2025-06-16T00:00:00Z',
  10,
  'Ratgeber Dämmung 2024: Kosten, Materialien & Förderung',
  'Der komplette Ratgeber zur Hausdämmung. Alles über Kosten, Materialien und staatliche Förderungen für Dach-, Fassaden- und Kellerdämmung.',
  ARRAY['Dämmung', 'Isolierung', 'Heizkosten sparen', 'WDVS', 'Energieberatung', 'Fassade dämmen'],
  '[{"id": "warum-daemmen", "title": "Warum Dämmung wichtig ist"}, {"id": "dach", "title": "Dachdämmung"}, {"id": "fassade", "title": "Fassadendämmung"}, {"id": "keller", "title": "Kellerdämmung"}]',
  2,
  'Bis zu 30%',
  '7-15 Jahre',
  'Ja, mit Energieberater',
  'Hoch',
  ARRAY['Deutliche Senkung der Heizkosten', 'Verbesserung des Wohnklimas', 'Wertsteigerung der Immobilie', 'Aktiver Klimaschutz'],
  'Lassen Sie vor Beginn der Maßnahmen eine professionelle Energieberatung durchführen. Dies ist oft Voraussetzung für Fördergelder.',
  '[{"item": "Dachdämmung (oberste Geschossdecke)", "costPerSqm": "30€", "totalCost": "3.000€"}, {"item": "Fassadendämmung (WDVS)", "costPerSqm": "150€", "totalCost": "22.500€"}]',
  FALSE
);

-- Zuordnung von Tags zum neuen Dämmungs-Post
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT
  (SELECT id FROM blog_posts WHERE slug = 'effektive-daemmung-ratgeber'),
  t.id
FROM blog_tags t
WHERE t.slug IN ('sanierung', 'energie-sparen');
