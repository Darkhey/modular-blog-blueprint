
-- NEUER ARTIKEL: FÖRDERUNG RATGEBER
INSERT INTO blog_posts (
  title, slug, excerpt, content, category_id, author_id, status, cover_url, hero_image_url, topic, topic_color, published_at, read_time,
  seo_title, seo_description, keywords, table_of_contents, difficulty,
  savings_potential, payback_time, funding_available, effort_level, key_benefits, important_notice, costs, is_featured
) VALUES (
  'Staatliche Förderung für Ihre Sanierung: So sichern Sie sich die Zuschüsse',
  'staatliche-foerderung-sanierung',
  'Die energetische Sanierung wird vom Staat kräftig bezuschusst. Erfahren Sie, welche Förderprogramme (BAFA & KfW) es gibt und wie Sie die maximale Förderung für Ihr Projekt erhalten.',
  '<h2>Warum Sie Förderungen nicht verpassen sollten</h2><p>Staatliche Zuschüsse und günstige Kredite machen die energetische Sanierung so attraktiv wie nie. Sie reduzieren Ihre Investitionskosten erheblich und beschleunigen die Amortisation. Zudem leisten Sie einen wichtigen Beitrag zum Klimaschutz und steigern den Wert Ihrer Immobilie.</p><img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Eine Person arbeitet an einem Laptop und plant die Beantragung von Fördermitteln." style="width:100%;border-radius:8px;margin:16px 0;"><h3>BAFA: Direkte Zuschüsse für Einzelmaßnahmen</h3><p>Das Bundesamt für Wirtschaft und Ausfuhrkontrolle (BAFA) fördert Einzelmaßnahmen wie den Austausch einer alten Heizung, die Dämmung von Wänden oder den Einbau neuer Fenster. Die Zuschüsse müssen vor Auftragsvergabe beantragt werden.</p><ul><li><strong>Was wird gefördert:</strong> Heizungstausch, Dämmung, Fenster, Lüftungsanlagen.</li><li><strong>Förderhöhe:</strong> Bis zu 70% der förderfähigen Kosten.</li></ul><h3>KfW: Kredite und Zuschüsse für Komplettsanierungen</h3><p>Die Kreditanstalt für Wiederaufbau (KfW) unterstützt größere Sanierungsvorhaben, die zu einem Effizienzhaus-Standard führen. Sie bietet zinsgünstige Kredite mit hohen Tilgungszuschüssen.</p><ul><li><strong>Was wird gefördert:</strong> Komplettsanierung zum Effizienzhaus, Baubegleitung.</li><li><strong>Förderhöhe:</strong> Hohe Kreditsummen und Tilgungszuschüsse.</li></ul><h3>Der Energieberater ist Ihr Schlüssel zur Förderung</h3><p>Für die meisten Förderprogramme ist die Einbindung eines zertifizierten Energieeffizienz-Experten (EEE) Pflicht. Er hilft nicht nur bei der Antragsstellung, sondern stellt auch sicher, dass die Maßnahmen fachgerecht geplant und umgesetzt werden.</p>',
  (SELECT id FROM blog_categories WHERE slug='foerdermittel'),
  (SELECT id FROM blog_authors WHERE name='Julia Musterfrau'),
  'published',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  'Fördermittel',
  '#059669',
  '2025-06-17T00:00:00Z',
  8,
  'Förderung Sanierung 2024: Alle Zuschüsse von BAFA & KfW',
  'Maximieren Sie Ihre staatliche Förderung für die Sanierung. Ein kompletter Überblick über BAFA-Zuschüsse und KfW-Kredite für Heizung, Dämmung und mehr.',
  ARRAY['Förderung', 'BAFA', 'KfW', 'Zuschuss', 'Sanierung', 'Energieberater'],
  '[{"id": "warum-foerderung", "title": "Warum Förderung wichtig ist"}, {"id": "bafa", "title": "BAFA-Zuschüsse"}, {"id": "kfw", "title": "KfW-Kredite"}, {"id": "energieberater", "title": "Rolle des Energieberaters"}]',
  3,
  'Bis zu 70%',
  'Abhängig von Maßnahme',
  'Ja, unbedingt!',
  'Mittel',
  ARRAY['Reduzierung der Investitionskosten', 'Schnellere Amortisation', 'Professionelle Planung durch Experten', 'Wertsteigerung der Immobilie'],
  'Stellen Sie Anträge immer VOR Beauftragung von Handwerkern. Ein Energieeffizienz-Experte ist meist Voraussetzung.',
  '[{"item": "Heizungstausch (Wärmepumpe)", "fundingRate": "Bis zu 70%"}, {"item": "Fassadendämmung", "fundingRate": "15-20%"}]',
  TRUE
);

-- Zuordnung von Tags zum neuen Förder-Post
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT
  (SELECT id FROM blog_posts WHERE slug = 'staatliche-foerderung-sanierung'),
  t.id
FROM blog_tags t
WHERE t.slug IN ('bafa', 'kfw', 'foerdermittel-2024');
