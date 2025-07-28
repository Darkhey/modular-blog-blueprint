-- Neuer Blogartikel: Dämmung und Isolierung 2025
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  category_id,
  author_id,
  status,
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
  'Dämmung & Isolierung 2025: Komplett-Ratgeber',
  'daemmung-isolierung-2025-ratgeber',
  'Umfassender Leitfaden zur Wärmedämmung 2025. Alle Bereiche, Materialien und Fördermöglichkeiten auf einen Blick.',
  $$
    <h2 id="warum-daemmen">Warum jetzt dämmen?</h2>
    <p>Eine fachgerechte Dämmung senkt die Heizkosten sofort um bis zu 50&nbsp;% und schützt die Bausubstanz vor Feuchte. Außerdem verbessert sie das Wohnklima und steigert den Immobilienwert.</p>
    <h2 id="bereiche">Die wichtigsten Bereiche</h2>
    <h3>Dach und oberste Geschossdecke</h3>
    <p>Hier gehen ohne Dämmung bis zu 30&nbsp;% der Wärme verloren. Je nach Bauart kostet die Dachdämmung 20–80&nbsp;€/m².</p>
    <h3>Außenwände</h3>
    <p>Wärmedämmverbundsysteme oder vorgehängte Fassaden liegen bei 100–200&nbsp;€/m².</p>
    <h3>Keller und Bodenplatte</h3>
    <p>Einfache Kellerdeckendämmungen starten bei 25&nbsp;€/m². Eine Perimeterdämmung lohnt vor allem im Neubau.</p>
    <h2 id="daemmstoffe">Dämmstoffe im Vergleich</h2>
    <ul>
      <li><strong>Mineralwolle:</strong> preiswert und nicht brennbar</li>
      <li><strong>EPS/XPS:</strong> günstig, aber nur bedingt hitzebeständig</li>
      <li><strong>Holzfaser oder Zellulose:</strong> ökologisch und mit gutem sommerlichen Hitzeschutz</li>
    </ul>
    <h2 id="foerderung">Fördermöglichkeiten 2025</h2>
    <p>Das BAFA bezuschusst Einzelmaßnahmen mit bis zu 20&nbsp;%. Mit individuellem Sanierungsfahrplan gibt es 5&nbsp;% extra. Alternativ können 20&nbsp;% der Kosten von der Steuer abgesetzt werden.</p>
    <h2 id="schritte">Schritt-für-Schritt-Anleitung</h2>
    <ol>
      <li>Energieberatung beauftragen</li>
      <li>Maßnahmen planen und Angebote einholen</li>
      <li>Förderantrag vor Vertragsabschluss stellen</li>
      <li>Professionelle Ausführung durch Fachbetriebe</li>
      <li>Qualität per Blower-Door-Test prüfen</li>
    </ol>
    <h2 id="fehler">Häufige Fehler vermeiden</h2>
    <ul>
      <li>Keine Dampfsperre bei Innendämmung</li>
      <li>Zu geringe Dämmstärke wählen</li>
      <li>Förderfristen versäumen</li>
    </ul>
    <p>Mit der richtigen Planung wird Ihre Dämmung zum nachhaltigen Sparprogramm. Nutzen Sie aktuelle Förderangebote und starten Sie noch dieses Jahr.</p>
  $$,
  (SELECT id FROM blog_categories WHERE slug='daemmung-isolierung'),
  (SELECT id FROM blog_authors WHERE name='Max Mustermann'),
  'published',
  'Dämmung & Isolierung',
  '#7c3aed',
  '2025-01-05T00:00:00Z',
  9,
  'Dämmung & Isolierung 2025: Alle Maßnahmen und Förderungen',
  'Umfassender Leitfaden zur Wärmedämmung 2025 mit Tipps zu Dach, Wand und Keller sowie aktuellen Förderungen.',
  ARRAY['Dämmung 2025','Isolierung','Förderung','Wärmedämmung'],
  '[{"id":"warum-daemmen","title":"Warum jetzt dämmen?"},{"id":"bereiche","title":"Die wichtigsten Bereiche"},{"id":"daemmstoffe","title":"Dämmstoffe im Vergleich"},{"id":"foerderung","title":"Fördermöglichkeiten"},{"id":"schritte","title":"Schritt-für-Schritt"},{"id":"fehler","title":"Häufige Fehler"}]',
  2,
  'Bis zu 50%',
  '10-15 Jahre',
  'Bis zu 40%',
  'Mittel',
  ARRAY['Weniger Heizkosten','Werterhalt der Immobilie','Besseres Raumklima'],
  'Förderanträge müssen vor Beginn der Arbeiten gestellt werden.',
  '[{"item":"Dachbodendämmung","costPerSqm":"20-40€","totalCost":"3.000-5.000€","funding":"20%"},{"item":"Fassadendämmung","costPerSqm":"120-180€","totalCost":"18.000-25.000€","funding":"20%"},{"item":"Kellerdeckendämmung","costPerSqm":"25-45€","totalCost":"2.500-4.500€","funding":"15%"}]',
  FALSE
);
