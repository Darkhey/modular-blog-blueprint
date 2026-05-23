/**
 * Zentrale FAQ-Daten für alle Rechner-Seiten.
 * Genutzt für sichtbares Accordion + JSON-LD (FAQPage Rich Result).
 * Wichtig: Antworten kurz halten (1–3 Sätze), keine Marketingphrasen.
 */
export interface CalculatorFaq {
  question: string;
  answer: string;
}

export const calculatorFaqs: Record<string, CalculatorFaq[]> = {
  heizkostenrechner: [
    {
      question: 'Wie genau ist der Heizkostenrechner?',
      answer:
        'Die Berechnung basiert auf typischen Verbrauchswerten je Baujahr und Energieträger sowie aktuellen Energiepreisen. Abweichungen von ±15 % sind je nach Nutzungsverhalten und Gebäudezustand normal. Für eine verbindliche Aussage ist ein iSFP-Energieberater empfehlenswert.',
    },
    {
      question: 'Wie viel Heizkosten kann ich durch Modernisierung sparen?',
      answer:
        'Je nach Ausgangszustand sind 20 bis 40 % Einsparung realistisch. Wärmepumpe plus gut gedämmte Gebäudehülle erreichen oft den oberen Bereich, eine reine Heizungssanierung im Altbau eher 20 bis 30 %.',
    },
    {
      question: 'Sind Förderungen bereits eingerechnet?',
      answer:
        'Ja. Der Rechner berücksichtigt aktuelle BAFA-/BEG-Sätze 2026 inkl. Klimageschwindigkeitsbonus. Den genauen Förderbetrag ermittelt unser Förderrechner.',
    },
    {
      question: 'Ist der Rechner kostenlos und anonym?',
      answer:
        'Ja, die Nutzung ist komplett kostenlos und ohne Anmeldung. Es werden keine personenbezogenen Daten gespeichert.',
    },
  ],

  daemmungsrechner: [
    {
      question: 'Welche Dämmstärke ist optimal?',
      answer:
        'Für Fassaden liegt die wirtschaftlich optimale Dicke bei 14–20 cm WDVS, fürs Dach bei 18–24 cm. Mehr ist möglich, der zusätzliche Nutzen sinkt aber überproportional.',
    },
    {
      question: 'Was bedeutet der U-Wert?',
      answer:
        'Der U-Wert (W/m²K) gibt an, wie viel Wärme ein Bauteil pro Quadratmeter und Kelvin Temperaturunterschied verliert. Je niedriger, desto besser. Förderfähig sind in der Regel U-Werte ≤ 0,20 für Wände und ≤ 0,14 für Dächer.',
    },
    {
      question: 'Welche Förderung gibt es für Dämmung?',
      answer:
        '15 % BAFA-Zuschuss auf förderfähige Kosten plus 5 % iSFP-Bonus bei vorhandenem Sanierungsfahrplan – also bis 20 %, gedeckelt bei 30.000 € pro Wohneinheit.',
    },
    {
      question: 'Lohnt sich Dämmung bei steigenden Energiepreisen?',
      answer:
        'Ja, die Amortisationszeiten verkürzen sich mit steigenden Energiekosten deutlich. Eine Fassadendämmung amortisiert sich heute typischerweise in 12–18 Jahren, mit Förderung oft in unter 10 Jahren.',
    },
  ],

  solarrechner: [
    {
      question: 'Wie viel kWp brauche ich für mein Haus?',
      answer:
        'Faustregel: 1 kWp pro 1.000 kWh Jahresverbrauch plus Reserve für Wärmepumpe und E-Auto. Ein durchschnittlicher 4-Personen-Haushalt fährt mit 8–10 kWp gut.',
    },
    {
      question: 'Lohnt sich ein Batteriespeicher?',
      answer:
        'Ein Speicher hebt den Eigenverbrauch von 30 % auf 60–80 %. Bei aktuellen Strompreisen amortisiert er sich in 10–14 Jahren. Besonders sinnvoll in Kombination mit Wärmepumpe oder Wallbox.',
    },
    {
      question: 'Welche Förderung gibt es 2026 für Photovoltaik?',
      answer:
        'PV-Anlagen sind seit 2023 mehrwertsteuerbefreit (0 %). Zusätzlich gibt es zinsgünstige KfW-270-Kredite und regionale Programme einzelner Bundesländer und Kommunen.',
    },
    {
      question: 'Ist der Solar-Rechner regional genau?',
      answer:
        'Ja, der Rechner nutzt PLZ-basierte Sonneneinstrahlungswerte des Deutschen Wetterdienstes. Süddeutschland liefert je nach Standort 10–15 % mehr Ertrag als Norddeutschland.',
    },
  ],

  kostenrechner: [
    {
      question: 'Wie realistisch sind die Kostenschätzungen?',
      answer:
        'Die Spannen entsprechen marktüblichen Handwerkerpreisen 2025/26 (Material plus Lohn). Die Untergrenze gilt für einfache Standardausführung, die Obergrenze für aufwendige Bestandsanpassungen.',
    },
    {
      question: 'Sind Gerüst und Nebenkosten enthalten?',
      answer:
        'Ein Gerüstaufschlag ist in den Fassaden- und Dachpositionen anteilig enthalten. Sonderbauten (Erker, Balkone) und behördliche Genehmigungen sind nicht abgedeckt – planen Sie 5–10 % Reserve ein.',
    },
    {
      question: 'Kann ich das Ergebnis exportieren?',
      answer:
        'Ja, das Ergebnis lässt sich als PDF herunterladen oder per Share-Link/QR-Code teilen – ideal für die Vorlage beim Energieberater oder Handwerker.',
    },
    {
      question: 'Wie werden Förderungen berechnet?',
      answer:
        'Pro Gewerk wird der BAFA-/KfW-Standardsatz auf die förderfähigen Kosten angewendet und am gesetzlichen Höchstbetrag gedeckelt. Den iSFP-Bonus berücksichtigt unser separater Förderrechner.',
    },
  ],

  'rechner-vergleich': [
    {
      question: 'Welche Maßnahme lohnt sich am meisten?',
      answer:
        'Im Altbau liefert meist die Heizungsmodernisierung die schnellste Amortisation. Solar lohnt sich überall, Dämmung erst bei mittlerem Gebäudezustand und längerer Verweildauer.',
    },
    {
      question: 'Kann ich mehrere Maßnahmen kombinieren?',
      answer:
        'Ja – und genau das empfehlen wir. Dämmung plus Wärmepumpe plus PV bringen einen Synergieeffekt: die Heizlast sinkt, der Eigenstrom deckt den Wärmepumpenbetrieb.',
    },
    {
      question: 'Wie verlässlich ist der Vergleich?',
      answer:
        'Der Vergleich nutzt gleiche Annahmen über alle Maßnahmen (Energiepreis, Steigerung, Lebensdauer) und macht so die Wirtschaftlichkeit direkt vergleichbar. Detailrechner pro Gewerk liefern exaktere Zahlen.',
    },
  ],

  foerderrechner: [
    {
      question: 'Welche Förderprogramme deckt der Rechner ab?',
      answer:
        'BAFA-Einzelmaßnahmen (BEG-EM), KfW-Kredite 261/270, iSFP-Bonus sowie geschätzte Top-ups einzelner Bundesländer und Kommunen.',
    },
    {
      question: 'Was ist der iSFP-Bonus?',
      answer:
        'Wer einen geförderten individuellen Sanierungsfahrplan vom Energieberater erstellen lässt, erhält 5 Prozentpunkte zusätzlich auf BAFA-Maßnahmen an der Gebäudehülle.',
    },
    {
      question: 'Bis wann muss ich den Antrag stellen?',
      answer:
        'BAFA-Anträge müssen vor Auftragsvergabe gestellt werden. Die Bewilligung kommt in 2–6 Wochen. Wer vorher beauftragt, verliert den Anspruch.',
    },
    {
      question: 'Wie hoch ist der maximale Zuschuss?',
      answer:
        'Für Heizungstausch (Wärmepumpe) sind bis zu 70 % möglich (30 % Grundförderung + 20 % Klimageschwindigkeitsbonus + 30 % Einkommensbonus, gedeckelt). Für Hüllenmaßnahmen maximal 20 %.',
    },
  ],

  'roi-rechner': [
    {
      question: 'Was bedeutet Amortisationszeit?',
      answer:
        'Die Zeit, bis die kumulierten jährlichen Einsparungen die Eigeninvestition (nach Förderabzug) übersteigen. Danach erwirtschaftet die Maßnahme einen echten Überschuss.',
    },
    {
      question: 'Berücksichtigt der Rechner steigende Energiepreise?',
      answer:
        'Ja. Sie können eine jährliche Preissteigerung einstellen (Standard: 4 %). Höhere Werte verkürzen die Amortisation deutlich.',
    },
    {
      question: 'Was ist eine realistische Lebensdauer?',
      answer:
        'Wärmepumpe und Gasheizung: 15–20 Jahre. PV-Anlage: 25–30 Jahre. Dämmung: 40+ Jahre. Wir empfehlen, den Betrachtungszeitraum nicht über die kürzeste Lebensdauer hinaus zu wählen.',
    },
  ],

  'energie-check': [
    {
      question: 'Wie funktioniert der Energie-Check?',
      answer:
        '12 Fragen zu Baujahr, Hülle, Heizung und Verhalten ergeben einen gewichteten Score von 0 bis 100 sowie eine priorisierte Empfehlungsliste mit Verlinkung in die passenden Detailrechner.',
    },
    {
      question: 'Ersetzt der Check einen Energieberater?',
      answer:
        'Nein – aber er liefert eine fundierte Vor-Einschätzung in 2 Minuten. Für Förderanträge und iSFP ist immer ein zertifizierter Energieberater nötig.',
    },
    {
      question: 'Was bedeutet der Score?',
      answer:
        '≥ 70 = sehr gute Ausgangslage, 40–69 = Optimierungspotenzial, < 40 = hoher Sanierungsbedarf. Der Score zeigt zusätzlich, in welchem Bereich (Hülle, Heizung, Erneuerbare …) am meisten Wirkung steckt.',
    },
  ],

  sanierungscheck: [
    {
      question: 'Was unterscheidet den Sanierungscheck vom Energie-Check?',
      answer:
        'Der Sanierungscheck führt durch einen 6-Schritte-Entscheidungsbaum und liefert eine personalisierte, priorisierte Maßnahmenfolge inkl. Kosten, Förderung und Amortisation – ideal vor dem Beratungstermin.',
    },
    {
      question: 'Wie lange dauert der Check?',
      answer:
        'Knapp 3 Minuten. Sie können jederzeit zurückspringen oder die Eingaben zurücksetzen.',
    },
    {
      question: 'Werden meine Eingaben gespeichert?',
      answer:
        'Nein. Alle Berechnungen laufen im Browser. Wir speichern keine personenbezogenen Daten.',
    },
  ],
};
