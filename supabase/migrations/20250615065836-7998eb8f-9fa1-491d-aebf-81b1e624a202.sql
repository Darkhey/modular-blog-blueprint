
-- Create new KfW post and link it from the BAFA post
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, topic, topic_color, published_at, read_time, difficulty, seo_title, seo_description, keywords, savings_potential, payback_time, funding_available, effort_level, key_benefits, important_notice, table_of_contents
) VALUES (
  'KfW-Förderung 2025: Kredite und Zuschüsse für Ihre Sanierung',
  'kfw-foerderung-2025-kredite-zuschuesse',
  'Entdecken Sie die vielfältigen Fördermöglichkeiten der Kreditanstalt für Wiederaufbau (KfW). Ob günstige Kredite für eine Komplettsanierung oder Zuschüsse für einzelne Maßnahmen – wir zeigen Ihnen, wie Sie profitieren.',
  $$
  <h2 id="was-ist-kfw">Was ist die KfW-Förderung?</h2>
  <p>Die Kreditanstalt für Wiederaufbau (KfW) ist die zentrale Förderbank des Bundes. Im Rahmen der "Bundesförderung für effiziente Gebäude" (BEG) vergibt die KfW zinsgünstige Kredite mit Tilgungszuschüssen für umfassende Sanierungen zum Effizienzhaus sowie für energieeffiziente Neubauten. Seit 2024 ist die KfW auch der primäre Ansprechpartner für den Zuschuss zum Heizungstausch.</p>
  <br>
  <h2 id="kfw-vs-bafa">KfW vs. BAFA: Was ist der Unterschied?</h2>
  <p>Die Abgrenzung kann verwirrend sein, ist aber logisch:
    <ul>
      <li><strong>BAFA:</strong> Zuständig für Zuschüsse zu <strong>Einzelmaßnahmen</strong> an der Gebäudehülle (Dämmung, Fenster) und Anlagentechnik (Lüftung).</li>
      <li><strong>KfW:</strong> Zuständig für Kredite (mit Tilgungszuschuss) für <strong>Komplettsanierungen</strong> zum Effizienzhaus-Standard und für den <strong>Heizungstausch</strong> (Zuschuss).</li>
    </ul>
    Oft werden beide Förderungen kombiniert. Mehr zur BAFA erfahren Sie in unserem <a href="/blog/bafa-foerderung-2025-leitfaden" class="text-green-600 hover:underline">BAFA-Leitfaden</a>.
  </p>
  <br>
  <h2 id="welche-programme-gibt-es">Welche KfW-Programme sind relevant?</h2>
  <p>Die wichtigsten Programme für Sanierer sind:</p>
  <ul>
    <li><strong>Wohngebäude – Kredit (261):</strong> Für die Komplettsanierung zum Effizienzhaus oder den Kauf eines solchen. Bis zu 150.000 € Kredit je Wohneinheit mit hohem Tilgungszuschuss.</li>
    <li><strong>Heizungsförderung für Privatpersonen – Wohngebäude (458):</strong> Der Zuschuss für den Tausch alter fossiler Heizungen gegen eine neue, auf erneuerbaren Energien basierende Heizung.</li>
    <li><strong>Altersgerecht Umbauen – Kredit (159):</strong> Günstiger Kredit für Maßnahmen zur Barrierereduzierung, oft kombinierbar mit energetischen Sanierungen.</li>
  </ul>
  <br>
  <h2 id="antragsprozess">Der Antragsprozess bei der KfW</h2>
  <p>Der Weg zur KfW-Förderung unterscheidet sich je nach Programm:</p>
  <ol>
    <li><strong>Energie-Effizienz-Experte (EEE) einbinden:</strong> Wie bei der BAFA ist ein Energieberater fast immer Pflicht. Er bestätigt die Förderfähigkeit der Maßnahmen.</li>
    <li><strong>Finanzierungspartner finden (für Kredite):</strong> KfW-Kredite werden nicht direkt, sondern über eine durchleitende Bank (Ihre Hausbank) beantragt.</li>
    <li><strong>Antrag stellen:</strong> Der Zuschuss für den Heizungstausch wird direkt im KfW-Portal beantragt, Kredite über die Hausbank. Wichtig: Der Antrag muss <strong>vor</strong> Vorhabensbeginn gestellt werden!</li>
    <li><strong>Bestätigung erhalten:</strong> Warten Sie die Zusage der KfW bzw. Ihrer Bank ab.</li>
    <li><strong>Maßnahme umsetzen.</strong></li>
    <li><strong>Nachweise einreichen:</strong> Nach Abschluss reichen Sie die "Bestätigung nach Durchführung" (BnD) des Energieberaters und die Rechnungen ein, um den (Tilgungs-)Zuschuss zu erhalten.</li>
  </ol>
  $$,
  'Fördermittel',
  '#2563eb',
  NOW(),
  9,
  3,
  'KfW-Förderung 2025: Kredite & Zuschüsse | energie-effizienz.info',
  'Ihr Leitfaden zur KfW-Förderung 2025. Sichern Sie sich günstige Kredite und hohe Tilgungszuschüsse für Ihre energetische Sanierung oder den Heizungstausch.',
  ARRAY['KfW', 'Förderung', 'Kredit', 'Zuschuss', 'Effizienzhaus', 'Heizungstausch', 'BEG WG'],
  'Bis zu 45%',
  '10-20 Jahre',
  'Ja',
  'Sehr Hoch',
  ARRAY['Günstige Finanzierung', 'Hohe Tilgungszuschüsse', 'Planungssicherheit', 'Umfassende Sanierung möglich'],
  'Die KfW-Konditionen sind an den Kapitalmarkt gekoppelt und können sich ändern. Informieren Sie sich vor der Antragstellung über die aktuellen Zinssätze und Zuschüsse.',
  '[{"id": "was-ist-kfw", "title": "Was ist die KfW-Förderung?"}, {"id": "kfw-vs-bafa", "title": "KfW vs. BAFA"}, {"id": "welche-programme-gibt-es", "title": "Welche Programme gibt es?"}, {"id": "antragsprozess", "title": "Der Antragsprozess"}]'::jsonb
);

UPDATE public.blog_posts
SET content = replace(
  content,
  '<p>Der Heizungstausch selbst wird seit 2024 primär über die KfW mit einem Zuschuss gefördert, der Antrag läuft aber weiterhin oft in Kombination mit BAFA-Maßnahmen.</p>',
  '<p>Der Heizungstausch selbst wird seit 2024 primär über die KfW mit einem Zuschuss gefördert. Alle Details dazu finden Sie in unserem umfassenden <a href="/blog/kfw-foerderung-2025-kredite-zuschuesse" class="text-green-600 hover:underline">Leitfaden zur KfW-Förderung</a>. Oft werden BAFA- und KfW-Förderung auch clever kombiniert.</p>'
)
WHERE slug = 'bafa-foerderung-2025-leitfaden';
