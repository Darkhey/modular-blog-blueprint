export interface FoerderBegriff {
  id: string;
  term: string;
  /** Ein bis zwei Sätze für Tooltips direkt am Feld */
  short: string;
  /** Ausführliche Erklärung für die Glossar-Sektion */
  long: string;
}

export const FOERDER_BEGRIFFE: FoerderBegriff[] = [
  {
    id: 'massnahme',
    term: 'Maßnahme (Heizung oder Gebäudehülle)',
    short:
      'Die Förderung teilt sich in zwei Töpfe: Heizungstausch (bis 70 % Zuschuss) und Gebäudehülle wie Dämmung, Fenster, Lüftung (bis 20 %).',
    long: 'Die BEG-Förderung unterscheidet zwei Bereiche. Zum Heizungstausch zählen Wärmepumpe, Biomasse und Solarthermie – hier sind inklusive Boni bis zu 70 % Zuschuss möglich. Zur Gebäudehülle zählen Dämmung, Fenster, Außentüren und Lüftungsanlagen mit Wärmerückgewinnung – hier liegt der Maximalsatz bei 20 %. Beide Töpfe haben eigene Kostendeckel und lassen sich im selben Jahr kombinieren.',
  },
  {
    id: 'investitionskosten',
    term: 'Förderfähige Investitionskosten',
    short:
      'Material, Einbau, Demontage, Fachplanung und Baubegleitung zählen – Eigenleistung und reine Instandhaltung dagegen nicht.',
    long: 'Förderfähig sind die Netto-Kosten der Maßnahme inklusive Einbau, Demontage der Altanlage, notwendiger Umfeldmaßnahmen sowie Fachplanung und Baubegleitung. Nicht förderfähig sind Eigenleistungen (nur das Material zählt), reine Reparaturen und Kosten, die vor der Antragstellung beauftragt wurden. Rechnen Sie mit Brutto-Angeboten, ziehen Sie die Mehrwertsteuer für die Förderbasis aber nicht ab – der Zuschuss wird auf die Bruttokosten gewährt, wenn Sie nicht vorsteuerabzugsberechtigt sind.',
  },
  {
    id: 'kostendeckel',
    term: 'Kostendeckel (förderfähige Höchstkosten)',
    short:
      'Heizung: 30.000 € je Wohneinheit. Gebäudehülle: 30.000 €, mit iSFP 60.000 €. Kosten darüber werden nicht bezuschusst.',
    long: 'Der Zuschuss wird nicht auf die volle Rechnung gezahlt, sondern nur bis zu einer Obergrenze. Beim Heizungstausch liegt diese bei 30.000 € je Wohneinheit, bei Maßnahmen an der Gebäudehülle bei 30.000 € pro Jahr und Wohneinheit – mit individuellem Sanierungsfahrplan (iSFP) steigt sie auf 60.000 €. Kostet Ihre Maßnahme mehr, bleibt der überschießende Teil komplett Eigenanteil.',
  },
  {
    id: 'bafa-kfw',
    term: 'BAFA und KfW',
    short:
      'Die KfW zahlt den Zuschuss für den Heizungstausch, das BAFA für Maßnahmen an der Gebäudehülle und Anlagentechnik.',
    long: 'Seit 2024 ist die Zuständigkeit aufgeteilt: Den Heizungstausch (Wärmepumpe, Biomasse, Solarthermie) fördert die KfW über das Programm 458 – Antrag nach Abschluss eines Liefervertrags mit aufschiebender Bedingung. Einzelmaßnahmen an der Gebäudehülle sowie Anlagentechnik und Fachplanung laufen weiter über das BAFA. Beide Anträge müssen vor Beginn der Arbeiten gestellt werden.',
  },
  {
    id: 'selbstnutzer',
    term: 'Selbstnutzer',
    short:
      'Sie wohnen selbst in der geförderten Wohnung oder im Haus. Nur dann gibt es Klimageschwindigkeits- und Einkommensbonus.',
    long: 'Als Selbstnutzer gelten Eigentümerinnen und Eigentümer, die die geförderte Wohneinheit selbst bewohnen – nachzuweisen etwa über die Meldebescheinigung. Vermieter und Eigentümergemeinschaften erhalten die Grundförderung und den iSFP-Bonus, aber weder den Klimageschwindigkeits- noch den Einkommensbonus.',
  },
  {
    id: 'klimabonus',
    term: 'Klimageschwindigkeitsbonus (+20 %)',
    short:
      'Für Selbstnutzer, die eine alte fossile Heizung frühzeitig austauschen. Befristet bis 31.12.2028, danach sinkt der Satz.',
    long: 'Der Klimageschwindigkeitsbonus belohnt den frühen Austausch funktionsfähiger fossiler Heizungen. Voraussetzung: Sie sind Selbstnutzer und ersetzen eine Öl-, Kohle-, Nachtspeicher- oder Gasheizung (Gas: mindestens 20 Jahre alt). Der Bonus beträgt bis Ende 2028 20 Prozentpunkte und reduziert sich danach schrittweise.',
  },
  {
    id: 'effizienzbonus',
    term: 'Effizienzbonus (+5 %)',
    short:
      'Für Wärmepumpen mit Erdreich, Wasser oder Abwasser als Wärmequelle oder mit natürlichem Kältemittel (z. B. Propan R290).',
    long: 'Der Effizienzbonus von 5 Prozentpunkten gilt für besonders effiziente Wärmepumpen: Sole/Wasser- und Wasser/Wasser-Anlagen sowie Abwasser-Wärmepumpen. Auch Luft-Wärmepumpen erhalten ihn, wenn sie ein natürliches Kältemittel wie Propan (R290) verwenden. Er ist mit allen anderen Boni kombinierbar.',
  },
  {
    id: 'einkommensbonus',
    term: 'Einkommensbonus (+30 %)',
    short:
      'Für selbstnutzende Haushalte mit einem zu versteuernden Jahreseinkommen (zvE) bis 40.000 €. Nachweis per Steuerbescheid.',
    long: 'Der Einkommensbonus von 30 Prozentpunkten richtet sich an selbstnutzende Eigentümer, deren zu versteuerndes Haushaltseinkommen 40.000 € pro Jahr nicht übersteigt. Maßgeblich ist der Durchschnitt der Steuerbescheide des zweiten und dritten Jahres vor Antragstellung. Zusammen mit Grundförderung und Klimageschwindigkeitsbonus wird der Gesamtsatz bei 70 % gekappt.',
  },
  {
    id: 'isfp',
    term: 'iSFP – individueller Sanierungsfahrplan',
    short:
      'Ein Sanierungsplan vom Energieberater: bringt +5 % Bonus auf Hüllenmaßnahmen und hebt den Kostendeckel auf 60.000 €.',
    long: 'Der individuelle Sanierungsfahrplan wird von einer zugelassenen Energie-Effizienz-Expertin erstellt und zeigt Schritt für Schritt, wie Ihr Haus energetisch saniert werden kann. Die Erstellung wird selbst mit 50 % gefördert. Für Maßnahmen an der Gebäudehülle bringt ein vorliegender iSFP einen Bonus von 5 Prozentpunkten und verdoppelt den förderfähigen Kostendeckel von 30.000 € auf 60.000 € je Wohneinheit. Beim Heizungstausch wirkt er nicht.',
  },
  {
    id: 'em-zuschlag',
    term: 'Emissionsminderungs-Zuschlag (2.500 €)',
    short:
      'Pauschaler Zuschlag für Biomasse-Heizungen, die den Feinstaub-Grenzwert von 2,5 mg/m³ einhalten.',
    long: 'Wer eine Pellet- oder Holzheizung einbaut, die den strengen Staubgrenzwert von 2,5 mg/m³ nachweislich einhält, erhält einmalig 2.500 € zusätzlich – unabhängig vom prozentualen Fördersatz. Den Nachweis liefert das Herstellerdatenblatt bzw. die Prüfbescheinigung der Anlage.',
  },
  {
    id: 'regional',
    term: 'Regionaler Top-up',
    short:
      'Zusätzliche Landes- oder Kommunalförderung. Der Wert hier ist ein Durchschnitt und ersetzt keine Programmprüfung.',
    long: 'Viele Bundesländer, Städte und Stadtwerke legen eigene Programme auf, die zusätzlich zu BAFA und KfW beantragt werden können – etwa Zuschüsse für Wärmepumpen, Dämmung oder Beratung. Der Rechner nutzt Durchschnittswerte je Bundesland, weil sich Programme und Budgets laufend ändern. Prüfen Sie Ihr konkretes Programm über unsere Förderkarte, bevor Sie kalkulieren.',
  },
  {
    id: 'eigenanteil',
    term: 'Eigenanteil',
    short:
      'Der Betrag, den Sie nach Abzug aller Zuschüsse selbst tragen – inklusive der Kosten über dem Kostendeckel.',
    long: 'Der Eigenanteil ergibt sich aus den gesamten Investitionskosten abzüglich aller Zuschüsse. Wichtig: Kosten oberhalb des Kostendeckels schlagen zu 100 % auf den Eigenanteil durch. Für den Restbetrag kommen zinsgünstige KfW-Ergänzungskredite (Programm 358/359) in Frage.',
  },
];

export const getFoerderBegriff = (id: string) =>
  FOERDER_BEGRIFFE.find((b) => b.id === id);
