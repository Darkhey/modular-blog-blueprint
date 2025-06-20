
-- Migration 1: Kellerdeckendämmung Artikel
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

-- Migration 2: Photovoltaik & Wärmepumpe kombinieren
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

-- Migration 3: Wärmepumpen Leitfaden
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
  'Wärmepumpe planen und betreiben: Der große Leitfaden 2025',
  'waermepumpe-planung-installation-2025',
  'Alles, was Sie zur Planung, Installation und Förderung einer Wärmepumpe wissen müssen. Mit vielen Tipps zu Kosten, Technik und Wartung.',
  $$
    <p>In diesem Artikel finden Sie alle wichtigen Informationen rund um die Wärmepumpe. Springen Sie direkt zu den Abschnitten:</p>
    <ul>
      <li><a href="#warum-waermepumpe">Warum eine Wärmepumpe?</a></li>
      <li><a href="#funktionsweise">Funktionsweise &amp; Typen</a></li>
      <li><a href="#planung-voraussetzungen">Planung &amp; Voraussetzungen</a></li>
      <li><a href="#kosten-foerderung">Kosten &amp; Förderung</a></li>
      <li><a href="#betrieb-wartung">Betrieb &amp; Wartung</a></li>
      <li><a href="#fazit">Fazit</a></li>
    </ul>

    <h2 id="warum-waermepumpe">Warum die Wärmepumpe die Zukunft ist</h2>
    <p>Wärmepumpen nutzen kostenlose Umweltenergie aus Luft, Erde oder Grundwasser und wandeln sie in Heizwärme um. Gerade in Verbindung mit Strom aus <a href="/blog/solarenergie-zukunft-eigenheim" class="text-emerald-700 underline">Photovoltaik</a> sind sie unschlagbar effizient. Auch für Altbauten gibt es mittlerweile passende Lösungen, siehe unseren Beitrag <a href="/blog/heizung-altbau-optionen-foerderung-2025" class="text-emerald-700 underline">Heizung im Altbau</a>.</p>
    <ul>
      <li>CO2-frei im Betrieb bei Nutzung von Ökostrom</li>
      <li>Unabhängiger von steigenden Gas- und Ölpreisen</li>
      <li>Bis zu 50 % Heizkostenersparnis möglich</li>
    </ul>

    <h2 id="funktionsweise">Funktionsweise und Typen</h2>
    <p>Eine Wärmepumpe arbeitet im Prinzip wie ein Kühlschrank, nur umgekehrt. Sie entzieht der Umgebung Wärme und hebt das Temperaturniveau mittels Kompressor an. Übliche Systeme sind Luft/Wasser-, Sole/Wasser- (Erdwärme) und Wasser/Wasser-Wärmepumpen. Mehr Details zu Alternativen finden Sie im Abschnitt <a href="#planung-voraussetzungen">Planung</a>.</p>

    <h2 id="planung-voraussetzungen">Planung und Voraussetzungen</h2>
    <p>Vor der Installation sollten Sie eine fachgerechte Heizlastberechnung durchführen lassen. Ein <a href="/blog/bafa-foerderung-sanierung-zuschuss-2025" class="text-emerald-700 underline">BAFA-geförderter Energieberater</a> hilft bei Planung und Förderantrag. Prüfen Sie auch die Möglichkeit der Kombination mit Fußbodenheizung oder großen Heizkörpern.</p>
    <p>Typische Schritte:</p>
    <ol>
      <li>Wärmequelle und Aufstellort wählen</li>
      <li>Dimensionierung und Wirtschaftlichkeitsberechnung</li>
      <li>Antragstellung der Fördermittel vor Auftragsvergabe</li>
      <li>Installation durch einen Fachbetrieb</li>
    </ol>

    <h2 id="kosten-foerderung">Kosten und Förderung 2025</h2>
    <p>Die Investitionskosten hängen stark von der Art der Wärmepumpe ab. Eine Luft/Wasser-Wärmepumpe ist meist am günstigsten, während eine Erdwärmepumpe höhere Bohrkosten verursacht. Über die <a href="/blog/bafa-foerderung-sanierung-zuschuss-2025" class="text-emerald-700 underline">BAFA-Förderung</a> sowie eventuell zinsgünstige <a href="/blog/kfw-foerderung-2025-kredite-zuschuesse" class="text-emerald-700 underline">KfW-Kredite</a> lassen sich bis zu 70&nbsp;% der Kosten decken.</p>

    <h2 id="betrieb-wartung">Betrieb und Wartung</h2>
    <p>Eine richtig eingestellte Wärmepumpe arbeitet sehr wartungsarm. Achten Sie auf jährliche Inspektionen und eine optimale Einstellung der Heizkurve. Mit einem Energiemonitoring lassen sich Effizienz und Laufkosten permanent überwachen.</p>

    <h2 id="fazit">Fazit</h2>
    <p>Die Wärmepumpe ist 2025 eine der nachhaltigsten Heiztechnologien. Mit der richtigen Planung, ausreichender Förderung und professioneller Installation profitieren Sie von niedrigen Heizkosten und einem hohen Wohnkomfort.</p>
  $$,
  (SELECT id FROM blog_categories WHERE slug='heizung-modernisieren'),
  (SELECT id FROM blog_authors WHERE name='Max Mustermann'),
  'published',
  '/photo-1509395176047-4a66953fd231.jpg',
  '/photo-1509395176047-4a66953fd231.jpg',
  'Heizung modernisieren',
  '#dc2626',
  NOW(),
  14,
  'Wärmepumpe 2025: Planung, Kosten & Betrieb',
  'Der vollständige Leitfaden für die Installation einer Wärmepumpe im Jahr 2025. Mit Tipps zu Planung, Förderung, Kosten und Wartung.',
  ARRAY['Wärmepumpe planen', 'Wärmepumpe Kosten 2025', 'Förderung Wärmepumpe', 'Wärmepumpe Installation', 'Heizung modernisieren'],
  '[{"id":"warum-waermepumpe","title":"Warum die Wärmepumpe?"},{"id":"funktionsweise","title":"Funktionsweise & Typen"},{"id":"planung-voraussetzungen","title":"Planung & Voraussetzungen"},{"id":"kosten-foerderung","title":"Kosten & Förderung"},{"id":"betrieb-wartung","title":"Betrieb & Wartung"},{"id":"fazit","title":"Fazit"}]',
  3,
  'Bis zu 50% Heizkosten',
  '8-15 Jahre',
  'Ja, bis zu 70%',
  'Hoch',
  ARRAY['Unabhängig von fossilen Brennstoffen','Niedrige Betriebskosten','Klimafreundlich'],
  'Förderanträge müssen vor Vertragsabschluss gestellt werden. Lassen Sie die Auslegung von einem Energieberater prüfen.',
  '[{"item":"Luft/Wasser-Wärmepumpe","costPerSqm":"120 €","totalCost":"18.000 €","funding":"Bis zu 70%"},{"item":"Erdwärmepumpe","costPerSqm":"150 €","totalCost":"25.000 €","funding":"Bis zu 70%"}]',
  FALSE
);

-- Migration 4: Regenwassernutzung Leitfaden
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
