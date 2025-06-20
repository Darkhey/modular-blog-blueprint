-- Neuer Blogartikel: Heizungsrohre dämmen
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
  'Heizungsrohre dämmen: Schritt für Schritt erklärt 2025',
  'heizungsrohre-daemmen-anleitung-2025',
  'Ungedämmte Heizungsrohre verursachen enorme Wärmeverluste. Dieser Guide zeigt Materialien, Kosten und die Montage in Eigenregie.',
  $$
    <h2 id="warum-daemmen">Warum Heizungsrohre dämmen?</h2>
    <p>In unbeheizten Kellern und Nebenräumen gehen über ungedämmte Rohrleitungen bis zu 15&nbsp;% der erzeugten Wärme verloren. Das <a href="https://www.gesetze-im-internet.de/geg/" class="text-green-600 underline">Gebäudeenergiegesetz (GEG)</a> schreibt daher eine Dämmung aller zugänglichen Heizungs- und Warmwasserrohre vor. Mehr Tipps zur effizienten Heizung finden Sie im <a href="/blog/heizung-modernisieren-ratgeber-2025" class="text-green-600 underline">Heizungsratgeber</a>.</p>
    <img src="https://images.unsplash.com/photo-1581092337421-738d9f7ad777" alt="Rohrdämmung im Heizungskeller" style="width:100%;border-radius:8px;margin:16px 0;">
    <h2 id="materialien">Die passenden Dämmmaterialien</h2>
    <p>Gängige Materialien sind Kautschuk, Polyethylen und Mineralwolle. Achten Sie auf die richtige Rohrdimension und eine ausreichende Dämmstärke (mindestens die Rohrleitungshalbe).</p>
    <ul>
      <li><strong>Kautschuk:</strong> Sehr flexibel, ideal für enge Bögen.</li>
      <li><strong>Polyethylen:</strong> Preiswert und leicht zu verarbeiten.</li>
      <li><strong>Mineralwolle:</strong> Höchster Brandschutz, etwas aufwendiger.</li>
    </ul>
    <h2 id="montage">Montage Schritt für Schritt</h2>
    <ol>
      <li>Rohrleitungen reinigen und Roststellen entfernen.</li>
      <li>Das Dämmmaterial auf passende Länge zuschneiden.</li>
      <li>Dämmung um das Rohr legen und Klebestreifen fest andrücken.</li>
      <li>Fugen mit Spezialkleber oder Klebeband schließen.</li>
      <li>Bei Formteilen (Bögen, Ventile) passgenaue Zuschnitte fertigen.</li>
    </ol>
    <p>Eine genaue Anleitung mit Werkzeugempfehlungen finden Sie im Artikel <a href="/blog/werkzeugliste-daemmung" class="text-green-600 underline">"Werkzeugliste Dämmung"</a>.</p>
    <h2 id="haeufige-fehler">Häufige Fehler vermeiden</h2>
    <p>Die häufigsten Probleme sind zu dünne Dämmstärken und offene Fugen. Auch ein fehlender Feuchteschutz kann zu Korrosion führen. Kontrollieren Sie daher alle Übergänge sorgfältig und verwenden Sie gegebenenfalls eine Dampfbremse.</p>
    <h2 id="kosten-foerderung">Kosten &amp; Förderung</h2>
    <p>Die Materialkosten liegen zwischen 3 und 8&nbsp;Euro pro Meter Rohr. Wer selbst montiert, spart die Handwerkerkosten. Über die <a href="/blog/bafa-foerderung-sanierung-zuschuss-2025" class="text-green-600 underline">BAFA-Förderung</a> lassen sich bis zu 20&nbsp;% der Ausgaben zurückholen.</p>
    <h2 id="fazit">Fazit</h2>
    <p>Mit gedämmten Heizungsrohren reduzieren Sie nicht nur Ihren Energieverbrauch, sondern erfüllen auch die gesetzlichen Vorgaben. Die Maßnahme rechnet sich in kurzer Zeit und lässt sich mit etwas Geschick problemlos selbst durchführen.</p>
  $$,
  (SELECT id FROM blog_categories WHERE slug='heizung-modernisieren'),
  (SELECT id FROM blog_authors WHERE name='Max Mustermann'),
  'published',
  '/photo-1581092337421-738d9f7ad777.jpg',
  '/photo-1581092337421-738d9f7ad777.jpg',
  'Heizungsrohre dämmen',
  '#dc2626',
  '2025-06-17T00:00:00Z',
  9,
  'Heizungsrohre dämmen 2025: Anleitung, Kosten &amp; Fördertipps',
  'Warum die Rohrdämmung Pflicht ist, welche Materialien sich eignen und wie Sie Förderung erhalten. Komplettes Tutorial mit Kostenübersicht.',
  ARRAY['Heizungsrohre dämmen','Rohrisolierung','GEG Pflicht','Wärmeverlust reduzieren','BAFA Förderung'],
  '[{"id":"warum-daemmen","title":"Warum dämmen?"},{"id":"materialien","title":"Materialien"},{"id":"montage","title":"Montage"},{"id":"haeufige-fehler","title":"Fehler vermeiden"},{"id":"kosten-foerderung","title":"Kosten & Förderung"},{"id":"fazit","title":"Fazit"}]',
  1,
  'Bis zu 6% Heizkosten',
  '1-3 Jahre',
  'Ja, 20% über BEG EM',
  'Niedrig',
  ARRAY['Weniger Wärmeverlust','Pflicht gemäß GEG erfüllt','Schnelle Amortisation','Einfach selbst machbar'],
  'Bei Arbeiten an Warmwasserleitungen kann Verbrennungsgefahr bestehen. Tragen Sie Schutzkleidung und prüfen Sie alle Leitungen auf Dichtheit.',
  '[{"item":"Kautschuk Dämmung","costPerSqm":"3 - 5 €","totalCost":"150 - 250 € (40m)","funding":"20%"},{"item":"PE-Schaum","costPerSqm":"2 - 4 €","totalCost":"100 - 200 € (40m)","funding":"20%"}]',
  TRUE
);
