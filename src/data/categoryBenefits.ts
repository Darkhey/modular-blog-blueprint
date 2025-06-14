
// Benefits data for each category
export const getBenefitsForCategory = (categoryId: string) => {
  const benefitsMap = {
    heizung: [
      {
        title: "Bis zu 40% Heizkosten sparen",
        description: "Moderne Heizsysteme arbeiten deutlich effizienter als alte Anlagen.",
        savings: "800-1.500€ jährlich"
      },
      {
        title: "BAFA-Förderung bis 70%",
        description: "Staatliche Zuschüsse für Wärmepumpen und erneuerbare Energien.",
        savings: "bis 21.000€ Zuschuss"
      },
      {
        title: "Wertsteigerung der Immobilie",
        description: "Moderne Heiztechnik erhöht den Wert Ihres Hauses nachhaltig.",
        savings: "10-15% Wertsteigerung"
      },
      {
        title: "Umweltschutz & CO2-Einsparung",
        description: "Reduzieren Sie Ihren CO2-Fußabdruck um bis zu 80%.",
        savings: "3-5 Tonnen CO2/Jahr"
      }
    ],
    daemmung: [
      {
        title: "Heizkosten halbieren",
        description: "Professionelle Dämmung kann die Heizkosten um bis zu 50% reduzieren.",
        savings: "1.000-2.000€ jährlich"
      },
      {
        title: "KfW-Förderung nutzen",
        description: "Bis zu 150.000€ günstiger Kredit plus Tilgungszuschuss.",
        savings: "bis 37.500€ Zuschuss"
      },
      {
        title: "Besseres Wohnklima",
        description: "Gleichmäßige Temperaturen und keine kalten Wände mehr.",
        savings: "Komfort-Gewinn"
      },
      {
        title: "Schutz vor Feuchtigkeit",
        description: "Moderne Dämmung verhindert Schimmelbildung und Bauschäden.",
        savings: "Keine Sanierungskosten"
      }
    ],
    foerderung: [
      {
        title: "Bis zu 70% Zuschuss sichern",
        description: "Profitieren Sie von hohen Förderungen für Ihre Sanierungsprojekte.",
        savings: "bis 25.000€ Zuschuss"
      },
      {
        title: "BAFA & KfW optimal kombinieren",
        description: "Maximieren Sie Ihre Einsparungen durch die Kombination verschiedener Programme.",
        savings: "Doppelte Förderung"
      },
      {
        title: "Schnelle Amortisation",
        description: "Durch die Förderung amortisiert sich Ihre Investition deutlich schneller.",
        savings: "Verkürzte Laufzeit"
      },
      {
        title: "Unabhängige Beratung",
        description: "Wir helfen Ihnen, die passenden Förderprogramme zu finden.",
        savings: "Zeitersparnis"
      }
    ],
    fenster: [
      {
        title: "Bis zu 20% Heizkosten sparen",
        description: "Moderne Fenster mit 3-fach Verglasung reduzieren Wärmeverluste deutlich.",
        savings: "400-800€ jährlich"
      },
      {
        title: "KfW-Förderung für Fenstertausch",
        description: "Profitieren Sie von zinsgünstigen Krediten und Zuschüssen.",
        savings: "bis 15% der Kosten"
      },
      {
        title: "Erhöhter Wohnkomfort",
        description: "Neue Fenster sorgen für mehr Ruhe und eine angenehme Raumtemperatur.",
        savings: "Komfort-Gewinn"
      },
      {
        title: "Einbruchschutz",
        description: "Moderne Fenster bieten einen besseren Schutz vor Einbrüchen.",
        savings: "Sicherheits-Plus"
      }
    ],
    solar: [
      {
        title: "Bis zu 70% weniger Stromkosten",
        description: "Mit einer eigenen Solaranlage produzieren Sie Ihren eigenen Strom.",
        savings: "500-1.000€ jährlich"
      },
      {
        title: "Staatliche Förderung nutzen",
        description: "Profitieren Sie von attraktiven Förderprogrammen für Photovoltaik.",
        savings: "bis 30% der Kosten"
      },
      {
        title: "Unabhängigkeit von Strompreisen",
        description: "Machen Sie sich unabhängig von steigenden Strompreisen.",
        savings: "Planungssicherheit"
      },
      {
        title: "Umweltfreundliche Energie",
        description: "Reduzieren Sie Ihren CO2-Fußabdruck und schonen Sie die Umwelt.",
        savings: "CO2-Einsparung"
      }
    ],
    "smart-home": [
      {
        title: "Bis zu 15% Energie sparen",
        description: "Intelligente Heizungssteuerung optimiert Ihren Energieverbrauch.",
        savings: "200-500€ jährlich"
      },
      {
        title: "Komfortable Steuerung",
        description: "Steuern Sie Ihre Heizung bequem per App oder Sprachbefehl.",
        savings: "Zeitersparnis"
      },
      {
        title: "Automatische Anpassung",
        description: "Smarte Thermostate passen die Temperatur automatisch an Ihre Bedürfnisse an.",
        savings: "Kein manuelles Regeln"
      },
      {
        title: "Einfache Installation",
        description: "Die Installation ist einfach und schnell erledigt.",
        savings: "Geringer Aufwand"
      }
    ]
  };

  return benefitsMap[categoryId as keyof typeof benefitsMap] || [];
};
