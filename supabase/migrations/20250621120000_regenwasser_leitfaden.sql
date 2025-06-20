-- Neuer Blogartikel: Regenwassernutzung
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  category_id,
  author_id,
  status,
  cover_url,
  hero_image_url,
  topic,
  topic_color,
  published_at,
  read_time,
  seo_title,
  seo_description,
  keywords,
  table_of_contents,
  difficulty,
  savings_potential,
  payback_time,
  funding_available,
  effort_level,
  key_benefits,
  important_notice,
  costs,
  is_featured
) VALUES (
  'Regenwasser nutzen: Leitfaden für Hausbesitzer 2025',
  'regenwasser-nutzen-leitfaden-2025',
  'Regenwassernutzung senkt den Trinkwasserverbrauch erheblich. Dieser ausführliche Leitfaden erklärt Technik, Installation, Kosten und Förderung.',
  $$
    <p><a href="#installation">Direkt zur Installation springen</a> oder mehr über <a href="#kosten">Kosten & Förderung</a> erfahren.</p>
    <h2 id="warum-regenwasser">Warum Regenwasser nutzen?</h2>
    <p>Trinkwasser ist wertvoll und wird immer teurer. Mit einer Regenwasseranlage können Sie Toiletten, Waschmaschine und Gartenbewässerung umweltfreundlich versorgen. Lesen Sie auch unseren <a href="/blog/bafa-foerderung-sanierung-zuschuss-2025">BAFA-Förderratgeber</a>, um mögliche Zuschüsse optimal zu nutzen.</p>
    <h2 id="technik">Technik im Überblick</h2>
    <p>Herzstück jeder Anlage ist die <strong>Zisterne</strong>, meist ein unterirdischer Tank. Filter halten Laub und Schmutz zurück, eine Pumpe fördert das Wasser ins Haus. Weitere Details zu Dämmung finden Sie in unserem <a href="/blog/dachdaemmung-kosten-materialien-foerderung-2025">Dachdämmungs-Ratgeber</a>.</p>
    <h2 id="installation">Installation Schritt für Schritt</h2>
    <p>Zuerst wird die Zisterne gesetzt. Danach folgen Rohrleitungen und die Einbindung ins Hausnetz. Für eine komfortable Nutzung empfiehlt sich ein automatisches Nachspeisesystem mit Trinkwasser als Reserve.</p>
    <h2 id="kosten">Kosten und Förderung</h2>
    <p>Je nach Größe und Ausstattung liegen die Investitionskosten zwischen 3.000 und 6.000&nbsp;Euro. Einige Kommunen fördern Regenwassernutzungsanlagen mit bis zu 20&nbsp;%. Weitere Tipps zur Antragstellung liefert unser <a href="/blog/bafa-foerderung-sanierung-zuschuss-2025">BAFA-Guide</a>.</p>
    <h2 id="fazit">Fazit</h2>
    <p>Mit einer Regenwasseranlage sparen Sie bis zu 50&nbsp;% Trinkwasser und leisten einen aktiven Beitrag zum Umweltschutz. Schauen Sie sich auch den Artikel über <a href="/blog/moderne-fenster-ratgeber-2025">moderne Fenster</a> an, um Ihr Zuhause ganzheitlich zu optimieren.</p>
  $$,
  (SELECT id FROM blog_categories WHERE slug='foerdermittel'),
  (SELECT id FROM blog_authors WHERE name='Julia Musterfrau'),
  'published',
  '/cover-rainwater.jpg',
  '/hero-rainwater.jpg',
  'Fördermittel',
  '#059669',
  NOW(),
  8,
  'Regenwassernutzung 2025: Technik, Installation & Förderung',
  'Großer Leitfaden zur Regenwassernutzung: Alles über Zisternen, Kosten und staatliche Förderung im Jahr 2025.',
  ARRAY['Regenwassernutzung','Zisterne','Wasser sparen','Förderung Regenwasser'],
  '[{"id":"warum-regenwasser","title":"Warum Regenwasser nutzen?"},{"id":"technik","title":"Technik im Überblick"},{"id":"installation","title":"Installation"},{"id":"kosten","title":"Kosten & Förderung"},{"id":"fazit","title":"Fazit"}]',
  2,
  'Bis zu 50% Trinkwassereinsparung',
  '8-12 Jahre',
  'Regional teils bis 20%',
  'Mittel',
  ARRAY['Reduziert Trinkwasserverbrauch','Unabhängig bei Gartenbewässerung','Schont Ressourcen'],
  'Für die Nutzung im Haus ist ein zweites Leitungssystem notwendig. Beachten Sie lokale Auflagen zur Trinkwassertrennung.',
  '[{"item":"Komplettanlage mit 5.000 L Zisterne","totalCost":"3.000 - 6.000 €","funding":"bis 20% je nach Kommune"}]',
  FALSE
);
