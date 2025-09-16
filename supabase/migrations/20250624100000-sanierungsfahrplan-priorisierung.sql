DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.blog_posts WHERE slug = 'sanierungsfahrplan-priorisierung-reihenfolge-sanieren'
  ) THEN
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
      'Sanierungsfahrplan & Priorisierung: Die richtige Reihenfolge beim Sanieren',
      'sanierungsfahrplan-priorisierung-reihenfolge-sanieren',
      'Ohne Sanierungsfahrplan wird die Reihenfolge der Sanierung schnell chaotisch: Fördergelder gehen verloren und Kosten explodieren. Dieser Leitfaden zeigt, wie Sie die Sanierung planen, priorisieren und smart finanzieren.',
      $$
        <p>Viele Eigentümer starten voller Tatendrang in die Modernisierung und merken erst später, dass sie sich Förderchancen verbaut oder teure Doppelarbeiten ausgelöst haben. Damit es bei dir anders läuft, findest du auf <a href="https://www.sanierenundsparen.de" target="_blank" rel="noopener">www.sanierenundsparen.de</a> den kompletten Überblick zum Thema Sanierungsfahrplan und eine klare Reihenfolge für deine Sanierung.</p>
        <h2 id="warum-reihenfolge">Warum die Reihenfolge zählt</h2>
        <p>Ohne Struktur entsteht schnell ein Flickenteppich: Die neue Heizung arbeitet gegen eine undichte Gebäudehülle, frisch verputzte Fassaden müssen für Dämmung erneut geöffnet werden und Fördermittel wie der iSFP-Bonus bleiben ungenutzt. Ein sauberer Sanierungsfahrplan verhindert diese Fehler, macht Kosten transparent und liefert belastbare Haus sanieren Tipps.</p>
        <ul>
          <li><strong>Verpasste Förderung:</strong> Förderanträge müssen vor Vertragsabschluss gestellt werden. Ohne Plan passiert das selten rechtzeitig.</li>
          <li><strong>Kostenfalle:</strong> Unkoordinierte Gewerke sorgen für Baustellenstress und Nacharbeiten.</li>
          <li><strong>Fehlende Zielwerte:</strong> Wer nicht weiß, wohin die Reise geht, kann Effizienzsteigerungen nicht messen.</li>
        </ul>
        <h2 id="sanierungsfahrplan">Sanierungsfahrplan strukturiert erstellen</h2>
        <h3 id="bestandsaufnahme">Bestandsaufnahme: Gebäude und Technik erfassen</h3>
        <p>Eine detaillierte Analyse ist der erste Schritt, wenn du deine Sanierung planen willst. Prüfe Dach, Fassade, Fenster, Heizung, Warmwasser, Elektrik und Lüftung. Dokumentiere Schwachstellen mit Fotos, Energieverbräuchen der letzten drei Jahre und Wartungsprotokollen. So erkennt der Energieberater schnell, welche Bauteile Priorität haben.</p>
        <h3 id="energieberatung">Energieberatung &amp; Förderantrag kombinieren</h3>
        <p>Ein zertifizierter Energieeffizienz-Experte erstellt den individuellen Sanierungsfahrplan (iSFP) und bereitet gleich die Förderanträge vor. Der Staat übernimmt bis zu 80&nbsp;% der Beratungskosten über die BAFA. Wer tiefer einsteigen möchte, findet im Praxisband <a href="https://www.amazon.de/s?k=sanierungsfahrplan+ratgeber&amp;tag=klexgetier0d-21" target="_blank" rel="nofollow noopener">„Sanierungsfahrplan erstellen“</a> zahlreiche Checklisten und Beispielrechnungen.</p>
        <p><!-- AFFILIATE_DISCLOSURE -->
Hinweis: Einige Links sind Affiliate-Links. Wenn du darüber kaufst, erhalte ich eine kleine Provision, ohne Mehrkosten für dich.
</p>
        <p>Wichtig: Fördermittel wie der iSFP-Bonus (5&nbsp;%-Zuschlag) greifen nur, wenn die im Fahrplan empfohlene Maßnahme fristgerecht umgesetzt wird. Deshalb sollte der Energieberater gleich die BAFA- und KfW-Unterlagen vorbereiten.</p>
        <h3 id="budgetplanung">Budget realistisch aufstellen</h3>
        <p>Lege ein belastbares Budget fest &ndash; inklusive 10 bis 15&nbsp;% Puffer für Unvorhergesehenes. Teile Kosten in Bauabschnitte ein, damit du jederzeit weißt, welche Mittel für Gebäudehülle, Haustechnik oder smarte Steuerung bereitstehen. Digitale Tools wie der Kosten- und Förderrechner auf <a href="https://www.sanierenundsparen.de/foerdermittel" target="_blank" rel="noopener">sanierenundsparen.de</a> helfen, Szenarien durchzuspielen.</p>
        <h2 id="priorisierung">Priorisierung der Maßnahmen</h2>
        <p>Die richtige Reihenfolge der Sanierung orientiert sich an Effizienz, Förderfähigkeit und der Vermeidung späterer Mehrkosten. Der Sanierungsfahrplan sortiert Maßnahmen deshalb in sinnvolle Bauphasen.</p>
        <h3 id="gebaeudehuelle">1. Gebäudehülle abdichten</h3>
        <p>Eine dichte Gebäudehülle ist die Basis. Dach und Außenwände verlieren den meisten Wärmestrom. Beginne mit Dach- und Fassadendämmung, prüfe zugleich Feuchteschutz, Statik und eventuelle Schadstoffe. Nur eine gute Hülle ermöglicht niedrige Heizlasten und macht spätere Technik kleiner und günstiger.</p>
        <h3 id="fenster-daemmung">2. Fenster &amp; Dämmung optimieren</h3>
        <p>Tausche alte Fenster gegen Modelle mit Uw-Werten &lt;1,0&nbsp;W/(m²K) und ergänze Rollladenkästen oder Laibungen. Kombiniere das direkt mit der Dämmung der obersten Geschossdecke sowie der Kellerdecke. Diese Schritte reduzieren Wärmeverluste um bis zu 25&nbsp;% und bilden die Grundlage für eine effiziente Heizung.</p>
        <h3 id="heizung-modernisieren">3. Heizung &amp; Wärmeverteilung anpassen</h3>
        <p>Jetzt lohnt sich der Austausch auf Wärmepumpe, Hybridheizung oder moderne Brennwerttechnik. Dank gedämmter Hülle reichen niedrigere Vorlauftemperaturen, wodurch Förderprogramme wie BEG EM mit bis zu 70&nbsp;% Zuschuss greifen. Denke an hydraulischen Abgleich und größere Heizflächen, falls erforderlich.</p>
        <h3 id="smarte-steuerung">4. Smarte Steuerung ergänzen</h3>
        <p>Zum Schluss optimierst du per Smart Home: Intelligente Thermostate, Heizungsregelungen und Energiemanagementsysteme holen die letzten Prozent Effizienz heraus und schaffen Komfort. Viele Systeme sind nachrüstbar und verursachen geringe Eingriffe in den Bauablauf.</p>
        <h3 id="quick-wins">Quick Wins für kleine Budgets</h3>
        <ul>
          <li>Thermostatwechsel auf smarte Modelle spart bis zu 10&nbsp;% Heizenergie.</li>
          <li>Dämmung der Kellerdecke oder der Heizungsrohre kostet wenig und rechnet sich in 2&ndash;4 Jahren.</li>
          <li>Türdichtungen, Fensterjustage und Rollladendämmung minimieren Zugluft schnell.</li>
          <li>Heizkurve optimieren und Nachtabsenkung prüfen &ndash; ein Klassiker der Haus sanieren Tipps.</li>
        </ul>
        <h2 id="praxisbeispiele">Praxisbeispiele aus der Sanierungspraxis</h2>
        <h3 id="altbau-60er">Altbau aus den 60ern</h3>
        <p>Der unsanierte 60er-Jahre-Bungalow hat ein flaches Dach, Einfachverglasung und eine alte Ölheizung. Reihenfolge: Erst Flachdach dämmen und abdichten, dann Fassade als Wärmedämmverbundsystem mit neuen Fenstern ausführen. Anschließend Heizungsverteilsystem prüfen und auf Wärmepumpe oder Pelletheizung umrüsten. Zum Abschluss folgt eine Lüftungsanlage mit Wärmerückgewinnung sowie smarte Einzelraumregelung.</p>
        <h3 id="reihenhaus-90er">Reihenhaus aus den 90ern</h3>
        <p>Das Reihenhaus besitzt bereits zweifach verglaste Fenster, aber schwache Kellerdeckendämmung und eine Gastherme. Hier startet der Sanierungsfahrplan mit der Dämmung von Kellerdecke und Dachbodentreppe, gefolgt vom Fenstertausch in windlastigen Fassadenbereichen. Danach wird eine hybride Wärmepumpe ergänzt, bestehende Heizkörper werden über Thermostatventile optimiert. Smarte Steuerung und PV-Anlage runden das Paket ab.</p>
        <h2 id="checkliste">Checkliste: So gehst du vor</h2>
        <ul>
          <li>Energieberater auf der BAFA-Liste auswählen und Sanierungsfahrplan beauftragen.</li>
          <li>Bestandsdaten (Verbrauch, Fotos, Baupläne) zusammentragen.</li>
          <li>Prioritätenliste nach Gebäudehülle, Fenster, Heizung, Steuerung erstellen.</li>
          <li>Budget mit Fördermitteln, Eigenmitteln und Finanzierungsmix festlegen.</li>
          <li>Anträge bei BAFA/KfW vor Vertragsunterzeichnung einreichen.</li>
          <li>Maßnahmen bauabschnittsweise umsetzen und nach jeder Phase Erfolge prüfen.</li>
          <li>Smarte Steuerung und Monitoring installieren, um Einsparungen zu kontrollieren.</li>
        </ul>
        <h2 id="foerderprogramme">Förderprogramme strategisch nutzen</h2>
        <p>Die Bundesförderung für effiziente Gebäude (BEG) belohnt die richtige Reihenfolge der Sanierung: Wer dem iSFP folgt, erhält 5&nbsp;% Bonus auf Einzelmaßnahmen. Dach- und Fassadendämmung sowie Fensterwechsel werden mit bis zu 20&nbsp;% bezuschusst, Heizungsmodernisierungen je nach Technologie mit bis zu 70&nbsp;%. Ergänzend bieten KfW-Kredite günstige Zinsen, während Länder und Kommunen oft zusätzliche Boni vergeben. Voraussetzung ist stets der Antrag <strong>vor</strong> Auftragsvergabe und die Umsetzung innerhalb der im Sanierungsfahrplan festgelegten Zeitfenster.</p>
        <h2 id="fazit">Fazit: Planung zahlt sich aus</h2>
        <p>Mit einem strukturierten Sanierungsfahrplan sparst du bares Geld, hältst die Reihenfolge der Sanierung ein und nutzt Förderprogramme optimal. Hol dir Unterstützung, plane sorgfältig und informiere dich weiter auf <a href="https://www.sanierenundsparen.de" target="_blank" rel="noopener">www.sanierenundsparen.de</a> &ndash; dort findest du weitere Haus sanieren Tipps, Tools und Ansprechpartner.</p>
      $$,
      (SELECT id FROM public.blog_categories WHERE slug = 'foerdermittel'),
      (SELECT id FROM public.blog_authors WHERE name = 'Max Mustermann'),
      'published',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      'Fördermittel',
      '#059669',
      '2025-06-24T08:00:00Z',
      12,
      'Sanierungsfahrplan & Priorisierung: Die richtige Reihenfolge beim Sanieren',
      'Sanierungsfahrplan Schritt für Schritt: Bestandsaufnahme, Priorisierung und Förderprogramme. So planen Hausbesitzer die Reihenfolge ihrer Sanierung richtig und sparen Geld.',
      ARRAY['Sanierungsfahrplan','Reihenfolge Sanierung','Sanierung planen','Haus sanieren Tipps','iSFP Bonus','Fördermittel 2025'],
      '[{"id":"warum-reihenfolge","title":"Warum die Reihenfolge zählt"},{"id":"sanierungsfahrplan","title":"Sanierungsfahrplan erstellen"},{"id":"priorisierung","title":"Priorisierung der Maßnahmen"},{"id":"praxisbeispiele","title":"Praxisbeispiele"},{"id":"checkliste","title":"Checkliste"},{"id":"foerderprogramme","title":"Förderprogramme"},{"id":"fazit","title":"Fazit"}]',
      2,
      'Bis zu 40% geringere Heiz- und Betriebskosten langfristig',
      'Maßnahmenabhängig, häufig 5-15 Jahre',
      'Ja, BEG-Zuschüsse + iSFP-Bonus',
      'Mittel bis hoch',
      ARRAY['Optimale Förderquote sichern','Sanierungskosten planbar machen','Weniger Baustellenstress'],
      'Förderanträge müssen vor Vertragsunterzeichnung gestellt werden und Energieberater benötigen BAFA-Zulassung.',
      '[{"item":"Energieberatung inkl. iSFP","totalCost":"1.300 - 1.800 €","funding":"bis 80% Zuschuss BAFA"},{"item":"Gebäudehülle (Dach & Fassade)","totalCost":"45.000 - 70.000 €","funding":"bis 20% Zuschuss +5% iSFP"},{"item":"Heizung mit Wärmepumpe","totalCost":"18.000 - 35.000 €","funding":"bis 70% bei BEG EM"}]',
      FALSE
    );
  END IF;
END $$;
