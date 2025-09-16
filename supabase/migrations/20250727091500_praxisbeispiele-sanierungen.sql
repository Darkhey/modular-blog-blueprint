-- Blogartikel: Praxisbeispiele erfolgreicher Sanierungen
-- Idempotent insert to avoid duplicates

-- Stelle sicher, dass die Kategorie "Sanierung planen" existiert
INSERT INTO public.blog_categories (name, slug, color, description)
VALUES ('Sanierung planen', 'sanierung-planen', '#2563eb', 'Praxisbeispiele, Projektabläufe und strategische Sanierungsplanung')
ON CONFLICT (slug) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.blog_posts WHERE slug = 'praxisbeispiele-sanierungen-vorher-nachher') THEN
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
      'Praxisbeispiele erfolgreicher Sanierungen: Vorher-Nachher und echte Kosten',
      'praxisbeispiele-sanierungen-vorher-nachher',
      'Drei echte Sanierung Beispiele zeigen Vorher-Nachher-Effekte, Sanierung Kosten, Einsparungen und wie Fördermittel die Rechnung verändern.',
      $$
        <h2 id="einleitung">Einleitung: Warum echte Sanierungsgeschichten überzeugen</h2>
        <p>Viele Eigentümerinnen und Eigentümer haben genug von grauer Theorie – sie wollen wissen, wie andere es geschafft haben. Genau deshalb sammeln wir auf <strong>www.sanierenundsparen.de</strong> reale Praxisberichte, die zeigen, welche Sanierung Kosten entstehen, welche Förderungen greifen und wie sich der Energieverbrauch messbar senken lässt. Die folgenden drei Fallstudien liefern dir echte Kennzahlen, Stolpersteine und Learnings.</p>

        <h2 id="inhaltsverzeichnis">Inhaltsverzeichnis</h2>
        <nav aria-label="Inhaltsverzeichnis" class="toc">
          <ol>
            <li><a href="#fallstudie-altbau-1965">Fallstudie 1: Altbau 1965 – Dämmung, Fenster &amp; Heizung</a></li>
            <li><a href="#fallstudie-reihenhaus-1990">Fallstudie 2: Reihenhaus 1990 – Einzelmaßnahmen mit Fokus</a></li>
            <li><a href="#fallstudie-komplettsanierung-foerdermittel">Fallstudie 3: Komplettsanierung mit Fördermitteln</a></li>
            <li><a href="#kosten-einsparungen">Kosten &amp; Einsparungen im Vergleich</a></li>
            <li><a href="#lerneffekte">Lerneffekte aus den Projekten</a></li>
            <li><a href="#ressourcen">Weiterführende Ressourcen</a></li>
            <li><a href="#fazit">Fazit</a></li>
          </ol>
        </nav>

        <h2 id="fallstudie-altbau-1965">Fallstudie 1: Altbau 1965 – Dämmung, Fenster &amp; Heizung</h2>
        <p>Dieses Sanierung Beispiel stammt aus einem freistehenden Altbau von 1965 (180&nbsp;m² Wohnfläche) im Rhein-Main-Gebiet. Die Gebäudehülle war ungedämmt, die Öl-Heizung 30&nbsp;Jahre alt, Fenster zweifach verglast. Ziel war ein Effizienzhaus-85-Standard, ohne dass die Familie während der Arbeiten ausziehen musste.</p>
        <figure>
          <div style="display:flex;gap:1rem;flex-wrap:wrap">
            <div style="flex:1;min-width:180px;background:#f3f4f6;border:2px dashed #94a3b8;padding:1.5rem;text-align:center;font-weight:600;">Vorher</div>
            <div style="flex:1;min-width:180px;background:#ecfdf5;border:2px dashed #34d399;padding:1.5rem;text-align:center;font-weight:600;">Nachher</div>
          </div>
          <figcaption>Platzhalter für Vorher-Nachher-Fotos: neue Putzfassade, luftdichte Fensteranschlüsse und Wärmepumpe im Technikraum.</figcaption>
        </figure>
        <h3 id="altbau-steckbrief">Projekt-Steckbrief</h3>
        <ul>
          <li>Gebäudetyp: Massiver Altbau, zweigeschossig, voll unterkellert</li>
          <li>Ausgangslage: Jahresheizenergiebedarf 38.500&nbsp;kWh, Heizkosten ~6.650&nbsp;€</li>
          <li>Ziel: KfW-Effizienzhaus&nbsp;85 und spürbarer Wohnkomfortgewinn</li>
        </ul>
        <h3 id="altbau-kosten">Sanierung Kosten &amp; Einsparungen</h3>
        <table>
          <thead>
            <tr>
              <th>Maßnahme</th>
              <th>Budget (brutto)</th>
              <th>Förderung</th>
              <th>Energieeffekt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Außen- &amp; Dachdämmung (24&nbsp;cm WLG 032)</td>
              <td>58.400&nbsp;€</td>
              <td>20&nbsp;% BEG-Zuschuss = 11.680&nbsp;€</td>
              <td>-22&nbsp;% Heizwärmebedarf</td>
            </tr>
            <tr>
              <td>Fensterwechsel (18 Elemente, Uw 0,85)</td>
              <td>27.500&nbsp;€</td>
              <td>Steuerbonus §35c EStG = 5.500&nbsp;€</td>
              <td>-8&nbsp;% Heizverluste, höherer Schallschutz</td>
            </tr>
            <tr>
              <td>Hybrid-Wärmepumpe inkl. Pufferspeicher</td>
              <td>32.200&nbsp;€</td>
              <td>35&nbsp;% BAFA-Förderung = 11.270&nbsp;€</td>
              <td>-8.700&nbsp;kWh Gas pro Jahr</td>
            </tr>
          </tbody>
        </table>
        <p>Die Sanierung Kosten lagen bei 118.100&nbsp;€ brutto. Nach Abzug von 28.450&nbsp;€ an Zuschüssen und Steuerbonus reduzierte sich die Eigenleistung auf 89.650&nbsp;€. Die <strong>Sanierung Vorher Nachher</strong>-Bilanz zeigt 38&nbsp;% geringere Energiekosten: Der jährliche Aufwand sank von rund 6.650&nbsp;€ auf 4.120&nbsp;€.</p>
        <p><strong>Was lief gut?</strong> Präzise Wärmebrückenplanung, Luftdichtheitsmessung und eng getaktete Koordination von Gewerken.</p>
        <p><strong>Stolpersteine:</strong> Lieferengpässe bei Fenstern (+4 Wochen) und zusätzliche Statikprüfung für das Dach.</p>
        <p><strong>Sinnvolle Reihenfolge:</strong> Erst Gebäudehülle, dann Fenster, zuletzt Heiztechnik – so arbeitet die Wärmepumpe vom ersten Tag an effizient.</p>

        <h2 id="fallstudie-reihenhaus-1990">Fallstudie 2: Reihenhaus 1990 – Einzelmaßnahmen mit Fokus</h2>
        <p>Bei diesem Sanierung Beispiel wollte eine junge Familie im Ruhrgebiet ihre Energiekosten mit überschaubarem Budget drücken. Das Reihenmittelhaus (130&nbsp;m²) war bereits teilweise modernisiert, doch Dach und Kellerdecke blieben Schwachstellen.</p>
        <figure>
          <div style="display:flex;gap:1rem;flex-wrap:wrap">
            <div style="flex:1;min-width:180px;background:#f8fafc;border:2px dashed #cbd5f5;padding:1.5rem;text-align:center;font-weight:600;">Vorher</div>
            <div style="flex:1;min-width:180px;background:#f0fdf4;border:2px dashed #4ade80;padding:1.5rem;text-align:center;font-weight:600;">Nachher</div>
          </div>
          <figcaption>Platzhalter: ungedämmtes Dach mit sichtbaren Sparren versus gedämmte Dachfläche und verkleidete Kellerdecke.</figcaption>
        </figure>
        <h3 id="reihenhaus-steckbrief">Projekt-Steckbrief</h3>
        <ul>
          <li>Gebäudetyp: Reihenmittelhaus, 2 Vollgeschosse</li>
          <li>Ausgangslage: Gas-Brennwertheizung bereits erneuert, Heizkosten ~2.950&nbsp;€</li>
          <li>Ziel: Einzelmaßnahmen mit 15.000&nbsp;€ Budgetrahmen, kurze Bauzeit</li>
        </ul>
        <h3 id="reihenhaus-kosten">Sanierung Kosten &amp; Wirkung</h3>
        <table>
          <thead>
            <tr>
              <th>Maßnahme</th>
              <th>Budget (brutto)</th>
              <th>Förderung</th>
              <th>Energieeffekt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dachdämmung (Aufsparren, 16&nbsp;cm Holzfaser)</td>
              <td>9.200&nbsp;€</td>
              <td>Ohne Förderung umgesetzt</td>
              <td>-12&nbsp;% Heizwärmebedarf, besserer Sommerhitzeschutz</td>
            </tr>
            <tr>
              <td>Kellerdeckendämmung (Mineralwolle, 12&nbsp;cm)</td>
              <td>3.800&nbsp;€</td>
              <td>Eigenleistung → keine BEG-Förderung</td>
              <td>-6&nbsp;% Wärmeverluste, spürbar wärmere Böden</td>
            </tr>
            <tr>
              <td>Rollladenkastensanierung &amp; Luftdichtung</td>
              <td>1.450&nbsp;€</td>
              <td>Keine Förderung</td>
              <td>-2&nbsp;% Zugluft, höherer Wohnkomfort</td>
            </tr>
          </tbody>
        </table>
        <p>Gesamtbudget: 14.450&nbsp;€. Die Familie verzichtete bewusst auf Zuschüsse, um keine zusätzlichen Wartezeiten zu riskieren. Trotzdem sank der Energieverbrauch um 20&nbsp;% auf 19.600&nbsp;kWh und die Heizkosten fielen auf etwa 2.360&nbsp;€. Mit diesem pragmatischen <strong>Sanierung Kosten</strong>-Ansatz amortisieren sich die Investitionen in rund 6&nbsp;Jahren.</p>
        <p><strong>Was lief gut?</strong> Viel Eigenleistung bei der Kellerdecke, reibungslose Abstimmung mit lokalem Dachdecker.</p>
        <p><strong>Stolpersteine:</strong> Überraschend hohe Entsorgungskosten für alten Zwischensparren-Dämmstoff.</p>
        <p><strong>Sinnvolle Reihenfolge:</strong> Start mit der staubintensiven Dacharbeit, danach Keller und Luftdichtung – so blieb das Wohnumfeld sauber.</p>

        <h2 id="fallstudie-komplettsanierung-foerdermittel">Fallstudie 3: Komplettsanierung mit Fördermitteln</h2>
        <p>Eine vierköpfige Familie aus München übernahm ein Einfamilienhaus Baujahr 1982 (160&nbsp;m²). Ziel war ein Effizienzhaus&nbsp;55 inklusive Photovoltaik und smarter Steuerung. Der Schwerpunkt lag auf der intelligenten Kombination aus KfW-Kredit und Zuschüssen.</p>
        <figure>
          <div style="display:flex;gap:1rem;flex-wrap:wrap">
            <div style="flex:1;min-width:180px;background:#f8fafc;border:2px dashed #cbd5f5;padding:1.5rem;text-align:center;font-weight:600;">Vorher</div>
            <div style="flex:1;min-width:180px;background:#eef2ff;border:2px dashed #6366f1;padding:1.5rem;text-align:center;font-weight:600;">Nachher</div>
          </div>
          <figcaption>Platzhalter: alte Klinkerfassade, Ölheizung und einfache Gauben im Vergleich zur neuen Holzfassade, PV-Modulen und Wärmepumpentechnik.</figcaption>
        </figure>
        <h3 id="komplett-steckbrief">Projekt-Steckbrief</h3>
        <ul>
          <li>Gebäudetyp: Einfamilienhaus mit Satteldach, 540&nbsp;m² Grundstück</li>
          <li>Ausgangslage: Ölverbrauch 4.200&nbsp;l/Jahr, Stromkosten 1.250&nbsp;€</li>
          <li>Ziel: Effizienzhaus&nbsp;55, Wertsteigerung &amp; niedrige Nebenkosten</li>
        </ul>
        <h3 id="komplett-kosten">Investition, Förderung &amp; Einsparung</h3>
        <table>
          <thead>
            <tr>
              <th>Pakete</th>
              <th>Budget (brutto)</th>
              <th>Förderung</th>
              <th>Ergebnis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hülle komplett (Fassade, Dach, Fenster, Haustür)</td>
              <td>142.000&nbsp;€</td>
              <td>KfW-Programm 261: Tilgungszuschuss 52.000&nbsp;€</td>
              <td>Transmissionswärmeverlust halbiert</td>
            </tr>
            <tr>
              <td>Haustechnik (Wärmepumpe, Lüftung mit WRG, PV 12&nbsp;kWp, Speicher)</td>
              <td>96.500&nbsp;€</td>
              <td>BAFA-Zuschuss 28.950&nbsp;€ + Einspeisevergütung</td>
              <td>Stromautarkiegrad 62&nbsp;%</td>
            </tr>
            <tr>
              <td>Innenausbau &amp; Smart Home</td>
              <td>41.800&nbsp;€</td>
              <td>Keine Förderung</td>
              <td>Betriebsdatenmonitoring für Energiesparen Praxis</td>
            </tr>
          </tbody>
        </table>
        <p>Das Gesamtbudget betrug 280.300&nbsp;€. Dank 80.950&nbsp;€ Zuschüssen und Tilgungszuschuss plus zinsgünstigem Kredit (0,78&nbsp;% effektiv) reduzierte sich die reale Belastung auf etwa 199.350&nbsp;€. Die jährlichen Energieausgaben fielen von 8.400&nbsp;€ auf 2.900&nbsp;€ – eine Einsparung von 65&nbsp;%. Zusätzlich stieg der Marktwert laut Gutachterausschuss um rund 18&nbsp;%.</p>
        <p><strong>Was lief gut?</strong> Frühzeitige Einbindung eines Energieeffizienz-Experten und digitales Bautagebuch.</p>
        <p><strong>Stolpersteine:</strong> Enges Genehmigungsfenster für den Batteriespeicher und Lieferzeiten für Wärmepumpenmodule.</p>
        <p><strong>Sinnvolle Reihenfolge:</strong> Förderzusage vor Vertragsunterzeichnung, dann Hülle, Technik, abschließend Innenausbau und Monitoring.</p>

        <h2 id="kosten-einsparungen">Kosten &amp; Einsparungen im Vergleich</h2>
        <p>Die drei Praxisfälle verdeutlichen, wie unterschiedlich Sanierung Kosten und Einsparpotenziale ausfallen können. Wichtig ist immer, ob Fördermittel eingerechnet sind. Nachfolgend ein grober Vergleich (alle Werte gerundet):</p>
        <table>
          <thead>
            <tr>
              <th>Projekt</th>
              <th>Investition gesamt</th>
              <th>Förderungen</th>
              <th>Netto-Budget</th>
              <th>Einsparung p.a.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Altbau 1965</td>
              <td>118.100&nbsp;€</td>
              <td>28.450&nbsp;€ (BEG + Steuerbonus)</td>
              <td>89.650&nbsp;€</td>
              <td>2.530&nbsp;€</td>
            </tr>
            <tr>
              <td>Reihenhaus 1990</td>
              <td>14.450&nbsp;€</td>
              <td>0&nbsp;€</td>
              <td>14.450&nbsp;€</td>
              <td>590&nbsp;€</td>
            </tr>
            <tr>
              <td>Komplettsanierung 1982</td>
              <td>280.300&nbsp;€</td>
              <td>80.950&nbsp;€ (KfW + BAFA)</td>
              <td>199.350&nbsp;€</td>
              <td>5.500&nbsp;€</td>
            </tr>
          </tbody>
        </table>
        <p>Alle Zahlen spiegeln Marktpreise aus Q2/2025 wider und dienen als Orientierung – individuelle Angebote können deutlich variieren. Ein Energieberater hilft, die <strong>Sanierung Kosten</strong> sauber zu kalkulieren und passende Fördermittel zu prüfen.</p>

        <h2 id="lerneffekte">Lerneffekte aus den Projekten</h2>
        <ul>
          <li><strong>Priorisierung:</strong> Gebäudehülle vor Technik zahlt sich aus – sonst arbeitet eine neue Heizung im alten Wärmeverlust.</li>
          <li><strong>Förderlogik:</strong> Wer Zuschüsse will, muss den Antrag vor Auftragserteilung stellen. Das gilt besonders für BAFA und KfW.</li>
          <li><strong>Timing:</strong> Puffern Sie 10&nbsp;% Zeitreserve für Lieferketten ein, vor allem bei Fenstern und Wärmepumpen.</li>
          <li><strong>Energiesparen Praxis:</strong> Monitoring (Smart Meter, App) zeigt, ob die Sanierung Vorher Nachher wirklich liefert.</li>
        </ul>

        <h2 id="ressourcen">Weiterführende Ressourcen</h2>
        <p>Wer tiefer in Sanierung Beispiel und Förderstrategie einsteigen möchte, findet hier weitere Inspiration:</p>
        <p><!-- AFFILIATE_DISCLOSURE -->
Hinweis: Einige Links sind Affiliate-Links. Wenn du darüber kaufst, erhalte ich eine kleine Provision, ohne Mehrkosten für dich.
</p>
        <ul>
          <li><a href="https://www.amazon.de/s?k=haus+sanierung+praxisbeispiele&amp;tag=klexgetier0d-21" target="_blank" rel="nofollow sponsored noopener">Praxisratgeber Haus sanieren</a> – Fallstudien, Checklisten und Kalkulationen.</li>
          <li><a href="/wissenswertes">Wissenswertes-Hub</a> mit Rechnern, Downloads und aktuellen Fördermeldungen.</li>
        </ul>

        <h2 id="fazit">Fazit: Sanierungen planbar machen</h2>
        <p>Die Praxisbeispiele zeigen: Mit klarer Reihenfolge, realistischer Kalkulation und passender Förderung werden energetische Sanierungen planbar. Noch mehr Inspiration, Tools und individuelle Rechner findest du auf <strong>www.sanierenundsparen.de</strong> – deinem Begleiter für alle Sanierung Vorher Nachher Fragen.</p>
      $$,
      (SELECT id FROM blog_categories WHERE slug='sanierung-planen'),
      (SELECT id FROM blog_authors WHERE name='Julia Musterfrau'),
      'published',
      'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
      'Sanierung planen',
      '#2563eb',
      '2025-07-27T09:15:00Z',
      12,
      'Praxisbeispiele erfolgreicher Sanierungen 2025: Vorher-Nachher &amp; Kosten',
      'Drei reale Sanierung Beispiele zeigen Kosten, Förderungen und wie viel Energie du mit cleverer Planung sparen kannst.',
      ARRAY['Sanierung Beispiel', 'Sanierung Vorher Nachher', 'Sanierung Kosten', 'Energiesparen Praxis', 'Sanierung planen', 'Fördermittel 2025'],
      '[{"id":"einleitung","title":"Einleitung"},{"id":"fallstudie-altbau-1965","title":"Fallstudie 1: Altbau 1965"},{"id":"fallstudie-reihenhaus-1990","title":"Fallstudie 2: Reihenhaus 1990"},{"id":"fallstudie-komplettsanierung-foerdermittel","title":"Fallstudie 3: Komplettsanierung"},{"id":"kosten-einsparungen","title":"Kosten & Einsparungen"},{"id":"lerneffekte","title":"Lerneffekte"},{"id":"ressourcen","title":"Weiterführende Ressourcen"},{"id":"fazit","title":"Fazit"}]',
      2,
      'Bis zu 65% weniger Energie- &amp; Stromkosten',
      '6-18 Jahre (maßnahmenabhängig)',
      'Ja, BAFA &amp; KfW kombinierbar',
      'Mittel bis hoch',
      ARRAY['Reale Sanierung Vorher Nachher Insights', 'Verlässliche Kostenrahmen mit und ohne Förderung', 'Konkrete Reihenfolgen für Sanierung Planung'],
      'Alle Beträge sind Richtwerte für 2025 und ersetzen keine individuelle Energieberatung. Förderquoten können sich kurzfristig ändern.',
      '[{"item":"Altbau 1965","costPerSqm":"~490 € pro m² Wohnfläche","totalCost":"118.100 € (89.650 € nach Förderung)","funding":"BEG EM + Steuerbonus"},{"item":"Reihenhaus 1990","costPerSqm":"~111 € je m² Wohnfläche","totalCost":"14.450 €","funding":"Keine (Eigenleistung)"},{"item":"Effizienzhaus 55","costPerSqm":"~1.752 € je m² Wohnfläche","totalCost":"280.300 € (199.350 € nach Förderung)","funding":"KfW 261 + BAFA"}]',
      TRUE
    );
  END IF;
END
$$;
