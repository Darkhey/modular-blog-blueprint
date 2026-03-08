export interface ReferenzProjekt {
  id: string;
  title: string;
  description: string;
  location: string;
  typ: 'daemmung' | 'heizung' | 'fenster' | 'komplett';
  typLabel: string;
  beforeImage: string;
  afterImage: string;
  kosten: number;
  foerderung: number;
  energieeinsparung: number;
  zeitraum: string;
  massnahmen: string[];
  relatedLinks: { label: string; href: string }[];
}

export const referenzenData: ReferenzProjekt[] = [
  {
    id: 'einfamilienhaus-muenchen',
    title: 'Komplettsanierung Einfamilienhaus',
    description: 'Ein Einfamilienhaus aus den 1970er Jahren wurde energetisch komplett saniert – von der Fassadendämmung über neue Fenster bis zur Wärmepumpe.',
    location: 'München, Bayern',
    typ: 'komplett',
    typLabel: 'Komplettsanierung',
    beforeImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    kosten: 125000,
    foerderung: 37500,
    energieeinsparung: 72,
    zeitraum: '6 Monate',
    massnahmen: ['WDVS Fassadendämmung 16 cm', 'Dachdämmung Aufsparren', 'Dreifach-Verglasung', 'Luft-Wasser-Wärmepumpe', 'Photovoltaik 10 kWp'],
    relatedLinks: [
      { label: 'Kostenrechner', href: '/kostenrechner' },
      { label: 'Sanierungscheck', href: '/sanierungscheck' },
    ],
  },
  {
    id: 'altbau-hamburg',
    title: 'Fassadendämmung Altbau',
    description: 'Gründerzeit-Altbau erhielt eine Innendämmung mit Kalziumsilikatplatten, um den historischen Charme der Fassade zu bewahren.',
    location: 'Hamburg, Norddeutschland',
    typ: 'daemmung',
    typLabel: 'Dämmung',
    beforeImage: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    kosten: 38000,
    foerderung: 7600,
    energieeinsparung: 35,
    zeitraum: '8 Wochen',
    massnahmen: ['Innendämmung Kalziumsilikat 8 cm', 'Kellerdämmung 10 cm', 'Luftdichtheitsprüfung'],
    relatedLinks: [
      { label: 'Dämmungsrechner', href: '/daemmungsrechner' },
      { label: 'Dämmung & Isolierung', href: '/daemmung-isolierung' },
    ],
  },
  {
    id: 'heizungstausch-berlin',
    title: 'Heizungsmodernisierung mit Wärmepumpe',
    description: 'Alte Ölheizung durch eine moderne Erdwärmepumpe ersetzt – inklusive Fußbodenheizung im gesamten Erdgeschoss.',
    location: 'Berlin, Brandenburg',
    typ: 'heizung',
    typLabel: 'Heizung',
    beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    kosten: 45000,
    foerderung: 18000,
    energieeinsparung: 55,
    zeitraum: '4 Wochen',
    massnahmen: ['Erdwärmepumpe 12 kW', 'Fußbodenheizung EG', 'Hydraulischer Abgleich', 'Smart-Home Steuerung'],
    relatedLinks: [
      { label: 'Heizkostenrechner', href: '/heizkostenrechner' },
      { label: 'Heizung modernisieren', href: '/heizung-modernisieren' },
    ],
  },
  {
    id: 'fenster-koeln',
    title: 'Fenstertausch Reihenhaus',
    description: 'Alle 14 Fenster eines Reihenhauses wurden von Einfach- auf Dreifachverglasung getauscht, inklusive neuer Rollladenkästen.',
    location: 'Köln, NRW',
    typ: 'fenster',
    typLabel: 'Fenster',
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
    kosten: 28000,
    foerderung: 5600,
    energieeinsparung: 25,
    zeitraum: '2 Wochen',
    massnahmen: ['14x Dreifach-Verglasung Ug 0.5', 'Neue Rollladenkästen gedämmt', 'Fensterbank-Dämmung', 'Luftdichte Anschlüsse'],
    relatedLinks: [
      { label: 'Fenster & Türen', href: '/fenster-tueren' },
      { label: 'Kostenrechner', href: '/kostenrechner' },
    ],
  },
  {
    id: 'solar-stuttgart',
    title: 'Solaranlage mit Speicher',
    description: 'Süddach eines Einfamilienhauses mit 12 kWp Photovoltaik und 10 kWh Batteriespeicher ausgestattet.',
    location: 'Stuttgart, Baden-Württemberg',
    typ: 'komplett',
    typLabel: 'Solar & Speicher',
    beforeImage: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    kosten: 32000,
    foerderung: 6400,
    energieeinsparung: 60,
    zeitraum: '3 Wochen',
    massnahmen: ['PV-Anlage 12 kWp Süddach', 'Batteriespeicher 10 kWh', 'Smart-Meter Gateway', 'Wallbox 11 kW'],
    relatedLinks: [
      { label: 'Solarenergie', href: '/solarenergie' },
      { label: 'ROI-Rechner', href: '/roi-rechner' },
    ],
  },
  {
    id: 'kernsanierung-frankfurt',
    title: 'Kernsanierung Zweifamilienhaus',
    description: 'Komplette energetische Sanierung eines 1960er-Zweifamilienhauses auf KfW-55 Standard mit maximaler Förderung.',
    location: 'Frankfurt, Hessen',
    typ: 'komplett',
    typLabel: 'Komplettsanierung',
    beforeImage: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    kosten: 185000,
    foerderung: 55500,
    energieeinsparung: 82,
    zeitraum: '9 Monate',
    massnahmen: ['Fassadendämmung WDVS 20 cm', 'Dachdämmung 24 cm', 'Fenster Dreifachverglasung', 'Sole-Wasser-Wärmepumpe', 'Lüftungsanlage mit WRG', 'PV-Anlage 15 kWp'],
    relatedLinks: [
      { label: 'Kostenrechner', href: '/kostenrechner' },
      { label: 'Fördermittel', href: '/foerdermittel' },
    ],
  },
];

export const typFilter = [
  { value: 'alle', label: 'Alle Projekte' },
  { value: 'daemmung', label: 'Dämmung' },
  { value: 'heizung', label: 'Heizung' },
  { value: 'fenster', label: 'Fenster' },
  { value: 'komplett', label: 'Komplett' },
] as const;
