-- Blogartikel: Photovoltaik & Wärmepumpe kombinieren
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
  'Photovoltaik & Wärmepumpe: Heizen mit Sonnenstrom im Doppelpack',
  'photovoltaik-waermepumpe-kombinieren',
  'Die Kombination aus Photovoltaikanlage und Wärmepumpe senkt Energiekosten massiv. Wir zeigen Ihnen die optimale Auslegung und welche Förderungen 2025 warten.',
  $$
    <h2 id="warum-kombinieren">Warum PV und Wärmepumpe so gut zusammenpassen</h2>
    <p>Eine Wärmepumpe benötigt viel Strom. Mit einer eigenen <a class="text-emerald-700 underline" href="/blog/photovoltaik-anlagen-kompletter-ratgeber-2024">Photovoltaikanlage</a> produzieren Sie diesen Strom selbst und reduzieren Ihre laufenden Kosten erheblich. Lesen Sie auch unseren <a class="text-emerald-700 underline" href="/blog/moderne-heizsysteme-vergleich">Vergleich moderner Heizsysteme</a> für weitere Hintergründe.</p>
    <h2 id="pv-dimension">Die PV-Anlage richtig dimensionieren</h2>
    <p>Um den Strombedarf der Wärmepumpe größtenteils abzudecken, sollte die Photovoltaikanlage mindestens 30&nbsp;% größer ausgelegt werden als für den Haushalt allein. Faustregel: 1&nbsp;kWp pro 1.000&nbsp;kWh jährlichen Stromverbrauchs.</p>
    <ul>
      <li>Hohe Eigenverbrauchsquote dank Wärmepumpe</li>
      <li>Stromüberschüsse im Sommer sinnvoll speichern</li>
    </ul>
    <h2 id="speicher">Stromspeicher und smarte Steuerung</h2>
    <p>Ein Batteriespeicher ermöglicht es, tagsüber erzeugten Solarstrom auch abends und nachts für die Wärmepumpe zu nutzen. Smarte Energiemanagement-Systeme verschieben den Betrieb in sonnenreiche Stunden.</p>
    <h2 id="kosten">Kosten und Fördermöglichkeiten 2025</h2>
    <p>Rechnen Sie für die Kombination aus PV-Anlage und Wärmepumpe mit Investitionskosten von 25.000&nbsp;bis 40.000&nbsp;Euro. Über die Bundesförderung für effiziente Gebäude (BEG) und KfW-Programme sind attraktive Zuschüsse und Kredite erhältlich.</p>
    <h2 id="tipps">Praktische Tipps für die Umsetzung</h2>
    <ol>
      <li>Planung mit einem Energieberater durchführen</li>
      <li>PV-Anlage und Wärmepumpe technisch aufeinander abstimmen</li>
      <li>Stromspeicher für maximalen Eigenverbrauch integrieren</li>
      <li>Fördermittel vor Auftragserteilung beantragen</li>
    </ol>
    <h2 id="fazit">Fazit</h2>
    <p>Mit der Kombination aus Photovoltaik und Wärmepumpe machen Sie sich weitgehend unabhängig von steigenden Energiepreisen und heizen klimafreundlich mit selbst erzeugtem Solarstrom.</p>
  $$,
  (SELECT id FROM blog_categories WHERE slug='heizung-modernisieren'),
  (SELECT id FROM blog_authors WHERE name='Max Mustermann'),
  'published',
  '/photo-1486588063474-c10a9b972d7a.jpg',
  '/photo-1486588063474-c10a9b972d7a.jpg',
  'Heizung modernisieren',
  '#dc2626',
  '2025-06-15T14:00:00Z',
  8,
  'Photovoltaik & Wärmepumpe kombinieren: Anleitung & Förderung 2025',
  'So nutzen Sie Ihre Photovoltaik-Anlage optimal für die Wärmepumpe. Tipps zu Dimensionierung, Speicher und Förderung.',
  ARRAY['Photovoltaik Wärmepumpe', 'Heizen mit Sonnenstrom', 'PV und Wärmepumpe kombinieren', 'Eigenverbrauch erhöhen', 'Förderung 2025'],
  '[{"id":"warum-kombinieren","title":"Warum kombinieren?"},{"id":"pv-dimension","title":"PV richtig dimensionieren"},{"id":"speicher","title":"Stromspeicher"},{"id":"kosten","title":"Kosten & Förderung"},{"id":"tipps","title":"Tipps"},{"id":"fazit","title":"Fazit"}]',
  3,
  'Bis zu 60% Heizkosten',
  '10-15 Jahre',
  'Ja, BAFA & KfW',
  'Mittel',
  ARRAY['Stark reduzierte Energiekosten','Mehr Unabhängigkeit','Klimafreundliche Wärme'],
  'Planen Sie großzügig und stimmen Sie alle Komponenten aufeinander ab. Ohne Förderung steigt die Amortisationszeit deutlich.',
  '[{"item":"PV-Anlage (10 kWp)","costPerSqm":"-","totalCost":"15.000-18.000 €","funding":"10%-20%"},{"item":"Wärmepumpe","costPerSqm":"-","totalCost":"12.000-20.000 €","funding":"bis 70%"}]',
  TRUE
);
