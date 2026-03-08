export interface GlossaryEntry {
  term: string;
  slug: string;
  definition: string;
  category: 'daemmung' | 'heizung' | 'energie' | 'foerderung' | 'solar' | 'fenster' | 'allgemein' | 'smart-home';
  relatedArticles?: { title: string; slug: string }[];
  relatedCalculators?: { title: string; path: string }[];
}

export const categoryLabels: Record<string, string> = {
  daemmung: 'Dämmung',
  heizung: 'Heizung',
  energie: 'Energie',
  foerderung: 'Förderung',
  solar: 'Solar',
  fenster: 'Fenster & Türen',
  allgemein: 'Allgemein',
  'smart-home': 'Smart Home',
};

export const glossaryData: GlossaryEntry[] = [
  {
    term: 'Amortisationszeit',
    slug: 'amortisationszeit',
    definition: 'Die Amortisationszeit gibt an, nach wie vielen Jahren sich eine Investition durch die eingesparten Kosten (z. B. Heizkosten) bezahlt gemacht hat. Bei einer Dämmung liegt die Amortisationszeit typischerweise zwischen 8 und 15 Jahren.',
    category: 'allgemein',
    relatedCalculators: [{ title: 'ROI-Rechner', path: '/roi-rechner' }],
  },
  {
    term: 'Aufsparrendämmung',
    slug: 'aufsparrendaemmung',
    definition: 'Eine Dachdämmung, bei der das Dämmmaterial oberhalb der Sparren angebracht wird. Diese Methode ist besonders effektiv, da sie eine lückenlose Dämmschicht ohne Wärmebrücken ermöglicht, ist jedoch aufwändiger als eine Zwischensparrendämmung.',
    category: 'daemmung',
    relatedArticles: [{ title: 'Dämmung & Isolierung', slug: 'daemmung-isolierung' }],
    relatedCalculators: [{ title: 'Dämmungsrechner', path: '/daemmungsrechner' }],
  },
  {
    term: 'BAFA',
    slug: 'bafa',
    definition: 'Das Bundesamt für Wirtschaft und Ausfuhrkontrolle (BAFA) ist eine deutsche Bundesbehörde, die u. a. Förderprogramme für energieeffiziente Sanierungsmaßnahmen verwaltet. BAFA-Zuschüsse decken z. B. Heizungsmodernisierung, Dämmung und Energieberatung ab.',
    category: 'foerderung',
    relatedArticles: [{ title: 'Fördermittel-Ratgeber', slug: 'foerdermittel-sanierung-2025' }],
    relatedCalculators: [{ title: 'Förderrechner', path: '/foerderrechner' }],
  },
  {
    term: 'Blower-Door-Test',
    slug: 'blower-door-test',
    definition: 'Ein Differenzdruck-Messverfahren zur Bestimmung der Luftdichtheit eines Gebäudes. Dabei wird ein Ventilator in eine Außentür eingebaut und ein Unter- bzw. Überdruck erzeugt. Undichtigkeiten in der Gebäudehülle werden so sichtbar gemacht.',
    category: 'energie',
  },
  {
    term: 'Brennwertkessel',
    slug: 'brennwertkessel',
    definition: 'Ein moderner Heizkessel, der die im Abgas enthaltene Wärme zusätzlich nutzt (Kondensation des Wasserdampfs). Brennwertkessel erreichen so einen Wirkungsgrad von bis zu 98 % und sind deutlich effizienter als ältere Niedertemperaturkessel.',
    category: 'heizung',
    relatedArticles: [{ title: 'Heizung modernisieren', slug: 'heizung-modernisieren-kosten' }],
  },
  {
    term: 'BEG',
    slug: 'beg',
    definition: 'Die Bundesförderung für effiziente Gebäude (BEG) bündelt seit 2021 die Förderprogramme für energieeffizientes Bauen und Sanieren. Sie umfasst Zuschüsse und zinsgünstige Kredite von BAFA und KfW für Einzelmaßnahmen und Komplettsanierungen.',
    category: 'foerderung',
    relatedCalculators: [{ title: 'Förderrechner', path: '/foerderrechner' }],
  },
  {
    term: 'CO₂-Steuer',
    slug: 'co2-steuer',
    definition: 'Eine Abgabe auf fossile Brennstoffe (Öl, Gas), die seit 2021 in Deutschland erhoben wird. Der Preis steigt jährlich und verteuert damit das Heizen mit fossilen Energieträgern – ein zusätzlicher Anreiz zur energetischen Sanierung.',
    category: 'energie',
  },
  {
    term: 'Dachdämmung',
    slug: 'dachdaemmung',
    definition: 'Die thermische Isolierung des Daches zur Reduzierung von Wärmeverlusten. Über ein ungedämmtes Dach gehen bis zu 30 % der Heizenergie verloren. Varianten sind Aufsparren-, Zwischensparren- und Untersparrendämmung.',
    category: 'daemmung',
    relatedCalculators: [{ title: 'Dämmungsrechner', path: '/daemmungsrechner' }],
  },
  {
    term: 'Dreifachverglasung',
    slug: 'dreifachverglasung',
    definition: 'Fenster mit drei Glasscheiben und zwei isolierenden Zwischenräumen, die mit Edelgas gefüllt sind. Der U-Wert liegt bei ca. 0,5–0,7 W/(m²·K) und ist damit deutlich besser als bei Zweifachverglasung (ca. 1,1 W/(m²·K)).',
    category: 'fenster',
    relatedArticles: [{ title: 'Fenster & Türen', slug: 'fenster-tueren-austausch' }],
  },
  {
    term: 'Einblasdämmung',
    slug: 'einblasdaemmung',
    definition: 'Ein Dämmverfahren, bei dem loser Dämmstoff (z. B. Zellulose, Mineralwolle-Granulat) in Hohlräume wie zweischaliges Mauerwerk oder Dachschrägen eingeblasen wird. Kostengünstig und minimalinvasiv bei bestehenden Hohlräumen.',
    category: 'daemmung',
    relatedArticles: [{ title: 'Einblasdämmung Guide', slug: 'einblasdaemmung-kosten-vorteile' }],
  },
  {
    term: 'Endenergiebedarf',
    slug: 'endenergiebedarf',
    definition: 'Die Energiemenge, die ein Gebäude tatsächlich für Heizung, Warmwasser, Lüftung und Kühlung benötigt – abzüglich Verluste bei der Energieumwandlung. Wird im Energieausweis in kWh/(m²·a) angegeben.',
    category: 'energie',
  },
  {
    term: 'Energieausweis',
    slug: 'energieausweis',
    definition: 'Ein gesetzlich vorgeschriebenes Dokument, das die energetische Qualität eines Gebäudes bewertet. Es gibt den Bedarfsausweis (auf Basis bauphysikalischer Berechnungen) und den Verbrauchsausweis (auf Basis tatsächlicher Verbräuche).',
    category: 'energie',
    relatedCalculators: [{ title: 'Energie-Check', path: '/energie-check' }],
  },
  {
    term: 'Energieeffizienzklasse',
    slug: 'energieeffizienzklasse',
    definition: 'Eine Einstufung von Gebäuden nach ihrem Energieverbrauch, analog zur Kennzeichnung bei Haushaltsgeräten. Die Skala reicht von A+ (sehr effizient, < 30 kWh/m²a) bis H (sehr ineffizient, > 250 kWh/m²a).',
    category: 'energie',
  },
  {
    term: 'Erdwärmepumpe',
    slug: 'erdwaermepumpe',
    definition: 'Eine Wärmepumpe, die Erdwärme über Erdsonden oder Flächenkollektoren nutzt. Sie erreicht hohe Jahresarbeitszahlen (JAZ 4,0–5,0) und arbeitet besonders effizient, da die Erdtemperatur ganzjährig relativ konstant bei 8–12 °C liegt.',
    category: 'heizung',
    relatedArticles: [{ title: 'Wärmepumpe im Altbau', slug: 'waermepumpe-altbau-erfahrungen' }],
  },
  {
    term: 'EPS (Expandiertes Polystyrol)',
    slug: 'eps',
    definition: 'Umgangssprachlich „Styropor" – ein weit verbreiteter Dämmstoff für Fassaden (WDVS). EPS hat eine Wärmeleitfähigkeit von ca. 0,032–0,040 W/(m·K) und ist preisgünstig, jedoch brennbar (Brandschutzklasse B1/B2).',
    category: 'daemmung',
  },
  {
    term: 'Estrichdämmung',
    slug: 'estrichdaemmung',
    definition: 'Dämmschicht unterhalb des Estrichs zur Reduzierung von Wärmeverlusten über den Fußboden und zur Trittschalldämmung. Besonders wichtig bei Fußbodenheizungen, um die Wärme nach oben zu leiten.',
    category: 'daemmung',
  },
  {
    term: 'Fassadendämmung',
    slug: 'fassadendaemmung',
    definition: 'Die thermische Isolierung der Außenwände eines Gebäudes. Die häufigste Methode ist das Wärmedämmverbundsystem (WDVS). Eine gute Fassadendämmung kann den Heizenergiebedarf um 20–30 % senken.',
    category: 'daemmung',
    relatedCalculators: [{ title: 'Dämmungsrechner', path: '/daemmungsrechner' }],
  },
  {
    term: 'Fernwärme',
    slug: 'fernwaerme',
    definition: 'Zentral erzeugte Wärme, die über ein Leitungsnetz an Gebäude verteilt wird. Die Wärme stammt z. B. aus Kraft-Wärme-Kopplung, Abfallverbrennung oder Geothermie. Fernwärme kann eine Alternative zur eigenen Heizungsanlage sein.',
    category: 'heizung',
  },
  {
    term: 'Flächenheizung',
    slug: 'flaechenheizung',
    definition: 'Heizsystem, das Wärme über große Flächen abgibt – z. B. Fußbodenheizung, Wandheizung oder Deckenheizung. Flächenheizungen arbeiten mit niedrigen Vorlauftemperaturen (30–35 °C) und sind ideal für Wärmepumpen.',
    category: 'heizung',
  },
  {
    term: 'Förderquote',
    slug: 'foerderquote',
    definition: 'Der prozentuale Anteil der förderfähigen Kosten, der als Zuschuss oder zinsvergünstigter Kredit gewährt wird. Bei der BEG können Förderquoten für Einzelmaßnahmen bis zu 70 % betragen (inkl. aller Boni).',
    category: 'foerderung',
    relatedCalculators: [{ title: 'Förderrechner', path: '/foerderrechner' }],
  },
  {
    term: 'GEG (Gebäudeenergiegesetz)',
    slug: 'geg',
    definition: 'Das seit 2020 geltende Gebäudeenergiegesetz vereint die frühere EnEV, das EEWärmeG und das EnEG. Es legt Mindestanforderungen an die Energieeffizienz von Gebäuden fest und schreibt seit 2024 bei neuen Heizungen einen Anteil von 65 % erneuerbarer Energien vor.',
    category: 'allgemein',
  },
  {
    term: 'Heizlast',
    slug: 'heizlast',
    definition: 'Die Wärmeleistung in Kilowatt (kW), die benötigt wird, um ein Gebäude bei der tiefsten Außentemperatur auf Raumtemperatur zu halten. Die Heizlastberechnung nach DIN EN 12831 ist Grundlage für die Dimensionierung der Heizungsanlage.',
    category: 'heizung',
    relatedCalculators: [{ title: 'Heizkostenrechner', path: '/heizkostenrechner' }],
  },
  {
    term: 'Hydraulischer Abgleich',
    slug: 'hydraulischer-abgleich',
    definition: 'Die optimale Einstellung aller Heizkörper und Leitungen eines Heizsystems, sodass jeder Raum genau die benötigte Wärmemenge erhält. Spart 10–15 % Heizenergie und ist Voraussetzung für viele Förderungen.',
    category: 'heizung',
    relatedArticles: [{ title: 'Heizung modernisieren', slug: 'heizung-modernisieren-kosten' }],
  },
  {
    term: 'Hybridheizung',
    slug: 'hybridheizung',
    definition: 'Ein Heizsystem, das zwei Energiequellen kombiniert – z. B. eine Wärmepumpe mit einem Gas-Brennwertkessel als Spitzenlastabdeckung. Hybridheizungen können den Gasverbrauch um 60–80 % reduzieren.',
    category: 'heizung',
  },
  {
    term: 'Individueller Sanierungsfahrplan (iSFP)',
    slug: 'isfp',
    definition: 'Ein vom BAFA geförderter, individueller Sanierungsfahrplan, den ein zertifizierter Energieberater für ein Gebäude erstellt. Er zeigt Schritt für Schritt, welche Maßnahmen in welcher Reihenfolge sinnvoll sind. Der iSFP-Bonus erhöht die Förderquote um 5 %.',
    category: 'foerderung',
    relatedArticles: [{ title: 'Fördermittel-Ratgeber', slug: 'foerdermittel-sanierung-2025' }],
  },
  {
    term: 'Jahresarbeitszahl (JAZ)',
    slug: 'jaz',
    definition: 'Kennzahl für die Effizienz einer Wärmepumpe über ein ganzes Jahr. Sie gibt das Verhältnis von erzeugter Wärme zu eingesetztem Strom an. Eine JAZ von 4 bedeutet: Aus 1 kWh Strom werden 4 kWh Wärme erzeugt.',
    category: 'heizung',
    relatedArticles: [{ title: 'Wärmepumpe im Altbau', slug: 'waermepumpe-altbau-erfahrungen' }],
  },
  {
    term: 'Kellerdeckendämmung',
    slug: 'kellerdeckendaemmung',
    definition: 'Die Dämmung der Unterseite der Kellerdecke – eine der kostengünstigsten Sanierungsmaßnahmen (ab ca. 20–40 €/m²). Sie reduziert Wärmeverluste zum unbeheizten Keller und erhöht die Fußbodentemperatur im Erdgeschoss spürbar.',
    category: 'daemmung',
    relatedCalculators: [{ title: 'Dämmungsrechner', path: '/daemmungsrechner' }],
  },
  {
    term: 'Kernsanierung',
    slug: 'kernsanierung',
    definition: 'Die umfassende Sanierung eines Gebäudes bis auf die Grundsubstanz (Rohbau). Dabei werden Heizung, Elektrik, Sanitär, Fenster, Dämmung und oft auch Grundrisse komplett erneuert. Kosten liegen typischerweise bei 800–1.500 €/m².',
    category: 'allgemein',
    relatedArticles: [{ title: 'Kernsanierung Ratgeber', slug: 'kernsanierung-vs-teilsanierung' }],
  },
  {
    term: 'KfW',
    slug: 'kfw',
    definition: 'Die Kreditanstalt für Wiederaufbau (KfW) ist eine staatliche Förderbank, die zinsgünstige Kredite und Zuschüsse für energieeffizientes Bauen und Sanieren vergibt. Bekannte Programme: KfW 261/262 (Effizienzhaus-Sanierung).',
    category: 'foerderung',
    relatedCalculators: [{ title: 'Förderrechner', path: '/foerderrechner' }],
  },
  {
    term: 'Klimabonus',
    slug: 'klimabonus',
    definition: 'Ein zusätzlicher Förderbonus von 20 % bei der BEG, wenn eine alte Öl-, Kohle-, Gas-Etagen- oder Nachtspeicherheizung durch eine klimafreundliche Heizung (z. B. Wärmepumpe) ersetzt wird.',
    category: 'foerderung',
  },
  {
    term: 'Lambda-Wert (λ)',
    slug: 'lambda-wert',
    definition: 'Die Wärmeleitfähigkeit eines Materials in W/(m·K). Je niedriger der Lambda-Wert, desto besser isoliert das Material. Beispiele: Mineralwolle ≈ 0,035; Holzfaser ≈ 0,040; Vakuumdämmung ≈ 0,005.',
    category: 'daemmung',
  },
  {
    term: 'Luft-Wasser-Wärmepumpe',
    slug: 'luft-wasser-waermepumpe',
    definition: 'Die häufigste Wärmepumpen-Art, die der Außenluft Wärme entzieht und ans Heizsystem übergibt. Kostengünstiger als Erdwärmepumpen, aber bei sehr tiefen Temperaturen weniger effizient (JAZ ca. 3,0–4,0).',
    category: 'heizung',
    relatedArticles: [{ title: 'Wärmepumpe Ratgeber', slug: 'waermepumpe-foerderung-2025' }],
  },
  {
    term: 'Mineralwolle',
    slug: 'mineralwolle',
    definition: 'Sammelbegriff für Glas- und Steinwolle – einer der am häufigsten eingesetzten Dämmstoffe. Nicht brennbar (A1/A2), guter Schallschutz, λ-Wert ca. 0,032–0,040 W/(m·K). Einsatz in Dach, Fassade und Innenwänden.',
    category: 'daemmung',
  },
  {
    term: 'Niedertemperaturheizung',
    slug: 'niedertemperaturheizung',
    definition: 'Ein Heizsystem, das mit niedrigen Vorlauftemperaturen (35–55 °C) arbeitet, z. B. Fußbodenheizung oder großflächige Heizkörper. Ideal in Kombination mit Wärmepumpen, da diese bei niedrigen Temperaturen effizienter arbeiten.',
    category: 'heizung',
  },
  {
    term: 'Passivhaus',
    slug: 'passivhaus',
    definition: 'Ein Gebäudestandard mit extrem niedrigem Heizenergiebedarf (≤ 15 kWh/m²a). Erreicht durch hervorragende Dämmung, Dreifachverglasung, Luftdichtheit und kontrollierte Wohnraumlüftung mit Wärmerückgewinnung.',
    category: 'energie',
  },
  {
    term: 'Pelletheizung',
    slug: 'pelletheizung',
    definition: 'Eine Heizungsanlage, die gepresste Holzpellets als Brennstoff nutzt. Pellets bestehen aus Holzresten und gelten als CO₂-neutral. Moderne Pelletkessel erreichen einen Wirkungsgrad von über 90 %.',
    category: 'heizung',
  },
  {
    term: 'Photovoltaik (PV)',
    slug: 'photovoltaik',
    definition: 'Die Umwandlung von Sonnenlicht in elektrischen Strom mittels Solarzellen. Eine typische Dachanlage (10 kWp) erzeugt in Deutschland ca. 9.000–11.000 kWh/Jahr und amortisiert sich in 10–14 Jahren.',
    category: 'solar',
    relatedArticles: [{ title: 'Solarenergie Ratgeber', slug: 'solarenergie-photovoltaik-guide' }],
    relatedCalculators: [{ title: 'Solarrechner', path: '/solarenergie' }],
  },
  {
    term: 'Primärenergiebedarf',
    slug: 'primaerenergiebedarf',
    definition: 'Die gesamte Energiemenge, die benötigt wird, einschließlich Vorketten (Förderung, Transport, Umwandlung). Erneuerbare Energien haben einen niedrigen Primärenergiefaktor (z. B. Holz: 0,2; Strom-Mix: 1,8; PV-Strom: 0,0).',
    category: 'energie',
  },
  {
    term: 'Rollladendämmung',
    slug: 'rollladendaemmung',
    definition: 'Die nachträgliche Dämmung des Rollladenkastens, der häufig eine Schwachstelle in der Gebäudehülle darstellt. Selbst einfache Dämmprofile können den Wärmeverlust am Rollladenkasten um bis zu 60 % reduzieren.',
    category: 'fenster',
  },
  {
    term: 'Sanierungsfahrplan',
    slug: 'sanierungsfahrplan',
    definition: 'Ein strukturierter Plan, der die sinnvolle Reihenfolge und Priorisierung von Sanierungsmaßnahmen für ein Gebäude festlegt. Der geförderte individuelle Sanierungsfahrplan (iSFP) wird von Energieberatern erstellt.',
    category: 'allgemein',
    relatedCalculators: [{ title: 'Sanierungscheck', path: '/sanierungscheck' }],
  },
  {
    term: 'Smart Home',
    slug: 'smart-home',
    definition: 'Die intelligente Vernetzung und Automatisierung von Haustechnik – Heizung, Licht, Rollläden, Sicherheit. Im Sanierungskontext besonders relevant: smarte Thermostate können 15–25 % Heizenergie einsparen.',
    category: 'smart-home',
    relatedArticles: [{ title: 'Smart Home Ratgeber', slug: 'smart-home-energiesparen' }],
  },
  {
    term: 'Solarthermie',
    slug: 'solarthermie',
    definition: 'Die Nutzung von Sonnenwärme zur Warmwasserbereitung oder Heizungsunterstützung mittels Solarkollektoren. Flachkollektoren decken ca. 60 % des jährlichen Warmwasserbedarfs, Röhrenkollektoren können auch die Heizung unterstützen.',
    category: 'solar',
    relatedArticles: [{ title: 'Solarenergie Ratgeber', slug: 'solarenergie-photovoltaik-guide' }],
  },
  {
    term: 'Speicherbatterie',
    slug: 'speicherbatterie',
    definition: 'Ein Stromspeicher für Photovoltaikanlagen, der überschüssig erzeugten Solarstrom für den späteren Eigenverbrauch speichert. Erhöht den Eigenverbrauchsanteil von ca. 30 % auf bis zu 70 %. Kapazitäten: 5–15 kWh.',
    category: 'solar',
    relatedCalculators: [{ title: 'Solarrechner', path: '/solarenergie' }],
  },
  {
    term: 'Taupunkt',
    slug: 'taupunkt',
    definition: 'Die Temperatur, bei der die Luftfeuchtigkeit an einer Oberfläche kondensiert. Bei falscher Dämmung kann der Taupunkt in der Wand liegen und zu Feuchteschäden und Schimmel führen. Die korrekte Taupunktberechnung ist daher bei jeder Dämmmaßnahme essenziell.',
    category: 'daemmung',
  },
  {
    term: 'Thermografie',
    slug: 'thermografie',
    definition: 'Ein Verfahren zur Sichtbarmachung von Wärmeverlusten an Gebäuden mittels Infrarotkamera. Thermografie-Aufnahmen zeigen Wärmebrücken, undichte Stellen und Dämmungsmängel und sind ein wichtiges Diagnosetool vor der Sanierung.',
    category: 'energie',
  },
  {
    term: 'Transmissionswärmeverlust',
    slug: 'transmissionswaermeverlust',
    definition: 'Der Wärmeverlust durch die Gebäudehülle (Wände, Dach, Fenster, Boden) aufgrund von Temperaturunterschieden zwischen innen und außen. Wird durch den H\'T-Wert in W/(m²·K) beschrieben.',
    category: 'energie',
  },
  {
    term: 'U-Wert',
    slug: 'u-wert',
    definition: 'Der Wärmedurchgangskoeffizient in W/(m²·K) – die wichtigste Kennzahl für die Wärmedämmung. Er gibt an, wie viel Wärme pro Sekunde durch 1 m² eines Bauteils fließt. Je niedriger, desto besser. Beispiele: Altbau-Wand 1,5; gedämmte Wand 0,2; Passivhaus-Fenster 0,8.',
    category: 'daemmung',
    relatedCalculators: [{ title: 'Dämmungsrechner', path: '/daemmungsrechner' }],
  },
  {
    term: 'Vorlauftemperatur',
    slug: 'vorlauftemperatur',
    definition: 'Die Temperatur des Heizwassers, das vom Wärmeerzeuger zu den Heizkörpern strömt. Moderne Systeme arbeiten mit niedrigen Vorlauftemperaturen (30–50 °C), was den Einsatz von Wärmepumpen ermöglicht.',
    category: 'heizung',
  },
  {
    term: 'Wärmebrücke',
    slug: 'waermebruecke',
    definition: 'Ein Bereich in der Gebäudehülle, an dem Wärme schneller nach außen fließt als an benachbarten Stellen – z. B. Fensterlaibungen, Balkonanschlüsse oder Rollladenkästen. Wärmebrücken können zu Schimmelbildung und erhöhtem Energieverbrauch führen.',
    category: 'daemmung',
  },
  {
    term: 'Wärmedämmverbundsystem (WDVS)',
    slug: 'wdvs',
    definition: 'Das am häufigsten eingesetzte Fassadendämmsystem, bestehend aus Dämmplatten (meist EPS oder Mineralwolle), die auf die Außenwand geklebt/gedübelt und verputzt werden. Kosten: ca. 100–200 €/m² inkl. Montage.',
    category: 'daemmung',
    relatedArticles: [{ title: 'Dämmung & Isolierung', slug: 'daemmung-isolierung' }],
  },
  {
    term: 'Wärmepumpe',
    slug: 'waermepumpe',
    definition: 'Ein Heizsystem, das Umgebungswärme (Luft, Erdreich, Grundwasser) auf ein nutzbares Temperaturniveau „pumpt". Wärmepumpen nutzen ca. 75 % kostenlose Umweltenergie und 25 % Strom. Sie sind die bevorzugte Heizungstechnologie nach dem GEG 2024.',
    category: 'heizung',
    relatedArticles: [{ title: 'Wärmepumpe Ratgeber', slug: 'waermepumpe-foerderung-2025' }],
    relatedCalculators: [{ title: 'Heizkostenrechner', path: '/heizkostenrechner' }],
  },
  {
    term: 'Wärmerückgewinnung',
    slug: 'waermerueckgewinnung',
    definition: 'Die Rückgewinnung von Wärme aus der Abluft eines Gebäudes. In kontrollierten Wohnraumlüftungen (KWL) wird bis zu 90 % der Abluft-Wärme auf die Zuluft übertragen, ohne dass die Luft gemischt wird.',
    category: 'energie',
  },
  {
    term: 'Wohnraumlüftung (KWL)',
    slug: 'kwl',
    definition: 'Eine kontrollierte Wohnraumlüftung mit Wärmerückgewinnung sorgt für permanenten Luftaustausch ohne Wärmeverluste. Besonders sinnvoll in gut gedämmten Gebäuden, um Feuchte- und Schimmelprobleme zu vermeiden.',
    category: 'energie',
  },
  {
    term: 'Zellulosedämmung',
    slug: 'zellulosedaemmung',
    definition: 'Ein ökologischer Dämmstoff aus recyceltem Zeitungspapier, der als Einblasdämmung in Hohlräume eingebracht wird. λ-Wert ca. 0,039 W/(m·K). Vorteile: guter sommerlicher Wärmeschutz, Feuchteregulierung, günstig.',
    category: 'daemmung',
  },
  {
    term: 'Zwischensparrendämmung',
    slug: 'zwischensparrendaemmung',
    definition: 'Dachdämmung, bei der der Dämmstoff zwischen den Dachsparren eingebracht wird. Die gängigste und kostengünstigste Dachdämmmethode (ca. 50–80 €/m²), jedoch begrenzt durch die Sparrenhöhe.',
    category: 'daemmung',
  },
  {
    term: 'Eigenverbrauchsquote',
    slug: 'eigenverbrauchsquote',
    definition: 'Der Anteil des selbst erzeugten Solarstroms, der direkt im Haushalt verbraucht wird (statt ins Netz eingespeist). Je höher die Quote, desto wirtschaftlicher die PV-Anlage, da der Eigenverbrauch ca. 30 ct/kWh spart vs. 8 ct/kWh Einspeisevergütung.',
    category: 'solar',
    relatedCalculators: [{ title: 'Solarrechner', path: '/solarenergie' }],
  },
  {
    term: 'Effizienzhaus',
    slug: 'effizienzhaus',
    definition: 'Ein KfW-Standard für die Gesamtenergieeffizienz von Gebäuden. Die Zahl gibt den Primärenergiebedarf in Prozent des GEG-Referenzgebäudes an: Effizienzhaus 55 = 55 % des Referenzwerts. Je niedriger, desto besser und höher gefördert.',
    category: 'foerderung',
  },
  {
    term: 'Dämmstoffe',
    slug: 'daemmstoffe',
    definition: 'Materialien mit niedriger Wärmeleitfähigkeit zur thermischen Isolierung von Gebäuden. Man unterscheidet mineralische (Glas-/Steinwolle), synthetische (EPS, XPS, PUR), und ökologische Dämmstoffe (Holzfaser, Zellulose, Hanf).',
    category: 'daemmung',
    relatedArticles: [{ title: 'Dämmung & Isolierung', slug: 'daemmung-isolierung' }],
  },
  {
    term: 'Smart Thermostat',
    slug: 'smart-thermostat',
    definition: 'Ein intelligenter Heizkörperthermostat, der per App, Zeitpläne oder Anwesenheitserkennung die Raumtemperatur steuert. Spart 15–25 % Heizkosten durch bedarfsgerechtes Heizen. Bekannte Marken: tado°, Homematic IP, AVM FRITZ!DECT.',
    category: 'smart-home',
    relatedArticles: [{ title: 'Smart Home Ratgeber', slug: 'smart-home-energiesparen' }],
  },
  {
    term: 'Einspeisevergütung',
    slug: 'einspeiseverguetung',
    definition: 'Die gesetzlich festgelegte Vergütung für Solarstrom, der ins öffentliche Netz eingespeist wird. Stand 2025: ca. 8,0 ct/kWh für Anlagen bis 10 kWp. Die Vergütung sinkt regelmäßig (Degression).',
    category: 'solar',
    relatedCalculators: [{ title: 'Solarrechner', path: '/solarenergie' }],
  },
  {
    term: 'Wärmeschutzverordnung',
    slug: 'waermeschutzverordnung',
    definition: 'Historische Verordnung (1977–2002) zur Begrenzung des Energieverbrauchs von Gebäuden, Vorgängerin der EnEV und des heutigen GEG. Gebäude vor 1977 haben typischerweise keinen nennenswerten Wärmeschutz.',
    category: 'allgemein',
  },
  {
    term: 'Gebäudehülle',
    slug: 'gebaeudehulle',
    definition: 'Die thermische Hülle eines Gebäudes, bestehend aus Außenwänden, Dach, Kellerdecke, Fenstern und Türen. Die energetische Qualität der Gebäudehülle bestimmt maßgeblich den Heizenergiebedarf.',
    category: 'allgemein',
  },
];

export const getGlossaryByLetter = (letter: string): GlossaryEntry[] =>
  glossaryData.filter(e => e.term.charAt(0).toUpperCase() === letter.toUpperCase());

export const getAvailableLetters = (): string[] => {
  const letters = new Set(glossaryData.map(e => e.term.charAt(0).toUpperCase()));
  return Array.from(letters).sort();
};

export const searchGlossary = (query: string): GlossaryEntry[] => {
  const q = query.toLowerCase();
  return glossaryData.filter(e =>
    e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q)
  );
};
