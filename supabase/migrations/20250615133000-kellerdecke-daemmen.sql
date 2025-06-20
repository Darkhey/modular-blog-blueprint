-- Neuer Blogartikel: Kellerdecke dämmen
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
  'Kellerdecke dämmen: Schritt-für-Schritt-Anleitung 2025',
  'kellerdecke-daemmen-anleitung-2025',
  'Eine gedämmte Kellerdecke spart Heizkosten und sorgt für warme Füße. Unser Ratgeber zeigt Materialien, Kosten und die richtige Umsetzung.',
  $$
    <h2 id="warum-daemmen">Warum die Kellerdeckendämmung so effektiv ist</h2>
    <p>Durch eine ungedämmte Kellerdecke kann bis zu 10% der Wohnwärme verloren gehen. Wer nachträglich dämmt, reduziert dieses Risiko erheblich und steigert den Wohnkomfort. Weitere Materialinfos finden Sie in unserem <a href="/blog/daemmstoffe-vergleich-2025" class="text-green-600 underline">großen Dämmstoff-Vergleich</a>.</p>
    <img src="https://images.unsplash.com/photo-1581091012184-6208e8cb3f3b" alt="Kellerdecke wird gedämmt" style="width:100%;border-radius:8px;margin:16px 0;">
    <h2 id="materialauswahl">Die richtige Materialauswahl</h2>
    <p>Bei der Kellerdeckendämmung kommen meist Hartschaumplatten (EPS, XPS) oder Mineralwolle zum Einsatz. Diffusionsoffene Keller sollten bevorzugt mit Mineralwolle gedämmt werden, während EPS-Platten günstig und leicht zu montieren sind.</p>
    <ul>
      <li><strong>EPS/XPS:</strong> Gute Dämmwerte, günstig, für trockene Keller.</li>
      <li><strong>Mineralwolle:</strong> Besserer Schallschutz, feuchtigkeitsregulierend.</li>
    </ul>
    <h2 id="schritte">Schritt-für-Schritt-Anleitung</h2>
    <ol>
      <li>Untergrund reinigen und Unebenheiten ausgleichen.</li>
      <li>Dämmplatten zuschneiden und mit geeigneten Dübeln oder Kleber befestigen.</li>
      <li>Stoßfugen mit Dichtband oder Schaum schließen.</li>
      <li>Optional: Oberfläche mit Putz oder Holz verkleiden.</li>
    </ol>
    <p>Eine detaillierte Anleitung inklusive Werkzeugtipps finden Sie in unserem <a href="/daemmung-isolierung" class="text-green-600 underline">Dämmungsrechner</a>.</p>
    <h2 id="kosten-foerderung">Kosten &amp; Förderung</h2>
    <p>Die Kellerdeckendämmung kostet je nach Material zwischen 20 und 45 Euro pro Quadratmeter. Nutzen Sie die <a href="/blog/bafa-foerderung-sanierung-zuschuss-2025" class="text-green-600 underline">BAFA-Förderung</a>, um bis zu 20% Zuschuss zu erhalten.</p>
    <h2 id="fazit">Fazit</h2>
    <p>Die Dämmung der Kellerdecke ist eine vergleichsweise einfache Maßnahme mit großer Wirkung. Sie spart Energie, steigert den Komfort und ist dank staatlicher Förderungen schnell amortisiert.</p>
  $$,
  (SELECT id FROM blog_categories WHERE slug='daemmung-isolierung'),
  (SELECT id FROM blog_authors WHERE name='Max Mustermann'),
  'published',
  '/photo-1581091012184-6208e8cb3f3b.jpg',
  '/photo-1581091012184-6208e8cb3f3b.jpg',
  'Kellerdecke dämmen',
  '#7c3aed',
  '2025-06-16T00:00:00Z',
  8,
  'Kellerdecke dämmen 2025: Anleitung, Kosten &amp; Förderung',
  'Warum die Kellerdeckendämmung lohnt, welche Materialien geeignet sind und wie Sie Fördermittel sichern. Schritt-für-Schritt erklärt.',
  ARRAY['Kellerdecke dämmen','Kellerdämmung','Heizkosten sparen','Dämmstoffe Keller','BEG Förderung'],
  '[{"id":"warum-daemmen","title":"Warum dämmen?"},{"id":"materialauswahl","title":"Materialwahl"},{"id":"schritte","title":"Anleitung"},{"id":"kosten-foerderung","title":"Kosten & Förderung"},{"id":"fazit","title":"Fazit"}]',
  2,
  'Bis zu 10% Heizkosten',
  '5-10 Jahre',
  'Ja, 15-20% über BEG EM',
  'Niedrig bis Mittel',
  ARRAY['Wärmere Wohnräume','Schnelle Umsetzung','Günstige Maßnahme','Förderfähig'],
  'Bei feuchten Kellern sollte vorab eine Abdichtung prüft werden. Arbeiten Sie immer mit Schutzkleidung und beachten Sie Brandschutzauflagen.',
  '[{"item":"EPS-Platten","costPerSqm":"20 - 35 €","totalCost":"1.600 - 2.800 € (80m²)","funding":"15-20%"},{"item":"Mineralwolle-Platten","costPerSqm":"25 - 45 €","totalCost":"2.000 - 3.600 € (80m²)","funding":"15-20%"}]',
  TRUE
);
