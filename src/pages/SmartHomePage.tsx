import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Link as LinkIcon, PlugZap, Thermometer, Lightbulb, Shield, MonitorSmartphone } from 'lucide-react';
import SmartHomeCategoryCard from "@/components/smart-home/SmartHomeCategoryCard";
import SmartHomeCategoryGuide from "@/components/smart-home/SmartHomeCategoryGuide";

const affiliateProducts = [
  {
    id: 'fritz-dect-200',
    name: 'AVM FRITZ!DECT 200',
    description: 'Intelligente Steckdose zur Messung des Energieverbrauchs und automatischen Schaltung von Geräten. Ideal, um Stromfresser zu identifizieren und den Verbrauch zu senken.',
    link: 'https://www.amazon.de/s?k=avm+fritz+dect+200+steckdose&crid=17F5H1R20SQ07&sprefix=AVM+FRITZ%21DECT+200%2Caps%2C168&linkCode=ll2&tag=klexgetier0d-21&linkId=f0079ba805ce86d6023dbe3d6d82f142&language=de_DE&ref_=as_li_ss_tl',
    icon: PlugZap,
  },
  {
    id: 'tado-thermostat',
    name: 'tado° Smartes Heizkörper-Thermostat',
    description: 'Passt die Heizung an Ihren Tagesablauf und die Wettervorhersage an. Spart bis zu 20% Heizkosten durch intelligente, standortbasierte Steuerung.',
    link: 'https://www.amazon.de/s?k=tado%C2%B0+Smartes+Heizk%C3%B6rper-Thermostat&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1ETRR2MXTNK3G&sprefix=tado+smartes+heizk%C3%B6rper-thermostat%2Caps%2C117&linkCode=ll2&tag=klexgetier0d-21&linkId=cfb57e789fdd9c49c4a0db963ca80d7a&language=de_DE&ref_=as_li_ss_tl',
    icon: Thermometer,
  },
  {
    id: 'philips-hue',
    name: 'Philips Hue White Ambiance Starter-Set',
    description: 'Energieeffiziente LED-Lampen mit Dimmfunktion und Zeitplänen. Schalten Sie das Licht automatisch aus, wenn niemand im Raum ist, und sparen Sie Strom.',
    link: 'https://www.amazon.de/s?k=Philips+Hue+White+Ambiance+Starter-Set&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1F0SOB674F7O5&sprefix=philips+hue+white+ambiance+starter-set%2Caps%2C123&linkCode=ll2&tag=klexgetier0d-21&linkId=a3bde6ceabe622a3c7a849c3d88a4691&language=de_DE&ref_=as_li_ss_tl',
    icon: Lightbulb,
  },
];

const smartHomeCategories = [
  {
    id: "heizung",
    title: "Smarte Heizungssteuerung",
    description:
      "Intelligente Thermostate passen die Raumtemperatur automatisch an Ihren Tagesablauf und die Wettervorhersage an. So heizen Sie nur, wenn es wirklich nötig ist, und können Ihre Heizkosten um bis zu 20% senken.",
    image: "/placeholder.svg?id=photo-1581091226825-a6a2a5aee158",
    alt: "Frau steuert Heizung per Smartphone-App",
    product: {
      name: "tado° Smartes Heizkörper-Thermostat",
      description: "Passt die Heizung flexibel per App & Wetterdaten an – spart bis zu 20% Energie.",
      link:
        "https://www.amazon.de/s?k=tado%C2%B0+Smartes+Heizk%C3%B6rper-Thermostat&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1ETRR2MXTNK3G&sprefix=tado+smartes+heizk%C3%B6rper-thermostat%2Caps%2C117&linkCode=ll2&tag=klexgetier0d-21&linkId=cfb57e789fdd9c49c4a0db963ca80d7a&language=de_DE&ref_=as_li_ss_tl"
    },
  },
  {
    id: "beleuchtung",
    title: "Intelligente Beleuchtung",
    description:
      "Dimmbares Licht, Zeitpläne und Anwesenheitserkennung helfen, Strom zu sparen und Komfort zu erhöhen. Smarte LEDs schalten sich automatisch aus, wenn niemand da ist.",
    image: "/placeholder.svg?id=photo-1581090464777-f3220bbe1b8b",
    alt: "Hand mit leuchtender Glühbirne, Symbol für smarte Beleuchtung",
    product: {
      name: "Philips Hue White Ambiance Starter-Set",
      description: "Smarte, energieeffiziente LEDs mit App-Steuerung, Dimmfunktion & Zeitplänen.",
      link:
        "https://www.amazon.de/s?k=Philips+Hue+White+Ambiance+Starter-Set&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1F0SOB674F7O5&sprefix=philips+hue+white+ambiance+starter-set%2Caps%2C123&linkCode=ll2&tag=klexgetier0d-21&linkId=a3bde6ceabe622a3c7a849c3d88a4691&language=de_DE&ref_=as_li_ss_tl"
    },
  },
  {
    id: "energiemanagement",
    title: "Energiemanagement & Steckdosen",
    description:
      "Finden Sie mit smarten Steckdosen die größten Stromverbraucher und schalten Sie Geräte per Zeitplan ganz aus. Perfekt zum Standby-Sparen.",
    image: "/placeholder.svg?id=photo-1488590528505-98d2b5aba04b",
    alt: "Moderne smarte Steckdose in einer Wand",
    product: {
      name: "AVM FRITZ!DECT 200",
      description: "Steckdose zur Messung und Steuerung von Strom via App – ideal für Stromfresser.",
      link:
        "https://www.amazon.de/s?k=avm+fritz+dect+200+steckdose&crid=17F5H1R20SQ07&sprefix=AVM+FRITZ%21DECT+200%2Caps%2C168&linkCode=ll2&tag=klexgetier0d-21&linkId=f0079ba805ce86d6023dbe3d6d82f142&language=de_DE&ref_=as_li_ss_tl"
    }
  },
  {
    id: "sicherheit",
    title: "Smarte Sicherheit & Überwachung",
    description:
      "Mit intelligenten Kameras, Bewegungsmeldern und Tür-/Fenstersensoren behalten Sie Ihr Zuhause immer im Blick – auch unterwegs.",
    image: "/placeholder.svg?id=photo-1618160702438-9b02ab6515c9",
    alt: "Cam mit Sicht auf einen Eingangsbereich",
    product: {
      name: "eufy Security SoloCam S220",
      description: "Kabellose, smarte Kamera mit App-Benachrichtigungen – Schutz rund um die Uhr.",
      link: "https://www.amazon.de/dp/B09T5GKFN8/?tag=klexgetier0d-21"
    }
  },
  {
    id: "haushalt",
    title: "Smarte Haushaltsgeräte",
    description:
      "Automatisieren Sie Haushaltsaufgaben! Intelligente Saugroboter, Waschmaschinen & Co. sparen Zeit und oft auch Strom.",
    image: "/placeholder.svg?id=photo-1582562124811-c09040d0a901",
    alt: "Haushalt: smarter Saugroboter im Wohnzimmer",
    product: {
      name: "Roborock S8 Saugroboter",
      description: "App-gesteuerter Saug-/Wischroboter – sauber ohne Aufwand, effizient im Stromverbrauch.",
      link: "https://www.amazon.de/dp/B0BXW72MBP/?tag=klexgetier0d-21"
    }
  },
  {
    id: "entertainment",
    title: "Smart Entertainment & Multiroom",
    description:
      "Steuern Sie Musik, TV und Lautsprecher zentral. Smarte Lösungen sorgen für perfekten Sound & Komfort – auf Sprachbefehl oder per App.",
    image: "/placeholder.svg?id=photo-1721322800607-8c38375eef04",
    alt: "Modernes Wohnzimmer mit vernetztem Soundsystem",
    product: {
      name: "Sonos One (Gen 2)",
      description: "Multiroom-Speaker: Musik in jedem Raum, Sprachsteuerung & App-Anbindung.",
      link: "https://www.amazon.de/dp/B07C2YP7T9/?tag=klexgetier0d-21"
    }
  }
];

const seoTopics = smartHomeCategories.map(rubrik => ({
  id: rubrik.id,
  title: rubrik.title,
}));

const smartHomeGuides = [
  {
    id: "heizung",
    title: "Smarte Heizungssteuerung",
    sections: [
      {
        heading: "Warum lohnt sich smarte Heizungssteuerung?",
        icon: <Thermometer className="text-green-600" />,
        text:
          "Mit smarten Thermostaten steuern Sie Ihre Heizung ganz nach Bedarf und vermeiden unnötigen Energieverbrauch. Das spart Geld und erhöht den Komfort: Nie wieder frieren oder bei Wärme unnötig heizen.",
        advantages: [
          "Bis zu 20 % weniger Heizkosten",
          "Automatische Anpassung an Gewohnheiten und Wetter",
          "Einfache Bedienung per App oder Sprache"
        ],
        tips: [
          "Programme speichern: Lege Zeitpläne für Werktage und Wochenenden an.",
          "Fenster-Offen-Erkennung aktivieren.",
          "Urlaubsmodus nutzen, um Abwesenheiten effizient abzudecken."
        ],
        faq: [
          {
            question: "Brauche ich spezielle Heizkörper?",
            answer: "Nein, die meisten smarten Thermostate lassen sich ohne Werkzeug auf gängige Heizkörperventile schrauben."
          },
          {
            question: "Wie schnell macht sich die Investition bezahlt?",
            answer: "Durch die eingesparten Heizkosten kann sich ein Thermostat meist schon nach 1-2 Jahren amortisieren."
          }
        ]
      }
    ]
  },
  {
    id: "beleuchtung",
    title: "Intelligente Beleuchtung",
    sections: [
      {
        heading: "Was bringt smarte Beleuchtung?",
        icon: <Lightbulb className="text-yellow-500" />,
        text: "Mit smarten LEDs und Lichtsystemen schalten Sie das Licht automatisch an oder aus, dimmen nach Stimmung oder Uhrzeit und sparen Strom durch Zeitpläne oder Bewegungssensoren.",
        advantages: [
          "Bis zu 80 % Energieersparnis gegenüber Halogen",
          "Komfortabel per App, Sprache oder automatisch steuerbar",
          "Lichtfarben und Helligkeit je nach Situation"
        ],
        tips: [
          "Szenen einrichten (z.B. Kinoabend, Arbeiten, Entspannen).",
          "Bewegungsmelder im Flur für automatisches Ausschalten.",
          "Mit Sonnenuntergang koppeln für automatische Beleuchtung am Abend."
        ],
        faq: [
          {
            question: "Brauche ich neue Lampen oder reichen smarte Glühbirnen?",
            answer: "Meistens reichen smarte Birnen, es gibt sie mit Standard-Sockeln für viele Leuchten."
          }
        ]
      }
    ]
  },
  {
    id: "energiemanagement",
    title: "Energiemanagement & Steckdosen",
    sections: [
      {
        heading: "Wie hilft Energiemanagement beim Sparen?",
        icon: <PlugZap className="text-blue-500" />,
        text: "Mit smarten Steckdosen und Verbrauchsmessern finden Sie Stromfresser im Haus. Geräte können automatisch abgeschaltet werden, etwa nachts oder wenn keiner da ist.",
        advantages: [
          "Sichtbarkeit des Stromverbrauchs einzelner Geräte",
          "Automatische Abschaltung spart Strom im Standby",
          "Zeitpläne vermeiden Energieverschwendung"
        ],
        tips: [
          "Verbraucher gezielt messen und große Stromfresser ersetzen.",
          "Geräte nachts komplett ausschalten lassen.",
          "Mit Smartphone immer im Blick, auch von unterwegs."
        ],
        faq: [
          {
            question: "Brauche ich für jede Steckdose ein Modul?",
            answer: "Nein, fangen Sie bei den größten Verbrauchern wie TV, PC oder Küchengeräten an."
          }
        ]
      }
    ]
  },
  {
    id: "sicherheit",
    title: "Smarte Sicherheit & Überwachung",
    sections: [
      {
        heading: "Wie schützt Smart-Home vor Einbrechern?",
        icon: <Shield className="text-red-500" />,
        text: "Smarte Kameras, Bewegungsmelder & Tür-/Fenstersensoren warnen bei Verdacht sofort auf Ihr Handy. Mit Licht- und Ton-Steuerung signalisieren Sie Anwesenheit.",
        advantages: [
          "Sofortige Benachrichtigung bei Verdacht",
          "Bilder und Videos jederzeit einsehbar",
          "Integration von Licht, Alarm und Außenkameras"
        ],
        tips: [
          "Sensoren an Fenstern und Türen anbringen.",
          "Benachrichtigungsfunktion aktivieren.",
          "Automatische Lichtsteuerung bei Bewegungsmeldung einrichten."
        ],
        faq: [
          {
            question: "Funktionieren Sicherheitsfunktionen auch ohne Internet?",
            answer: "Die meisten Alarmfunktionen laufen lokal, Push-Benachrichtigungen erfordern aber Internetzugang."
          }
        ]
      }
    ]
  },
  {
    id: "haushalt",
    title: "Smarte Haushaltsgeräte",
    sections: [
      {
        heading: "Wie helfen smarte Geräte im Haushalt?",
        icon: <PlugZap className="text-gray-700" />,
        text: "Saugroboter reinigen automatisch und können per App gesteuert werden, smarte Waschmaschinen oder Kühlschränke helfen beim Energiesparen und Wartung.",
        advantages: [
          "Zeitersparnis durch Automatisierung",
          "Optimierte Energie- und Wassernutzung",
          "App-Benachrichtigungen für Wartung, z.B. Filter tauschen"
        ],
        tips: [
          "Reinigungszeiten auf Abwesenheiten legen.",
          "Saugroboter mit Raumerkennung spart noch effizienter.",
          "Geräte-Status regelmäßig im App-Dashboard prüfen."
        ],
        faq: [
          {
            question: "Sind smarte Geräte komplex in der Bedienung?",
            answer: "Die meisten lassen sich wie gewohnt nutzen, zusätzliche Funktionen gibt‘s bequem per App."
          }
        ]
      }
    ]
  },
  {
    id: "entertainment",
    title: "Smart Entertainment & Multiroom",
    sections: [
      {
        heading: "Wie bereichert smartes Entertainment den Alltag?",
        icon: <MonitorSmartphone className="text-indigo-600" />,
        text: "Mit Multiroom-Lautsprechern, Streaming und Sprachsteuerung wird Musik- und TV-Nutzung komfortabler und flexibler. Alles lässt sich per App synchronisieren.",
        advantages: [
          "Musik und TV zentral steuerbar",
          "Kombinierbar mit Licht und Szene-Settings",
          "Sprach- oder App-Bedienung für maximalen Komfort"
        ],
        tips: [
          "Multiroom-System für fließenden Musikgenuss im ganzen Haus.",
          "Routinen für Morgen und Abend einrichten (Musik, Licht etc.).",
          "Entertainment mit smarten Steckdosen automatisieren."
        ],
        faq: [
          {
            question: "Brauche ich teure Spezialgeräte?",
            answer: "Viele Systeme arbeiten mit bestehenden Lautsprechern oder Fernsehern. Adapter können ältere Geräte smart nachrüsten."
          }
        ]
      }
    ]
  }
];

const SmartHomePage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'smart-home');
  const { trackOutboundLink } = useAnalytics();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <h1 className="text-4xl font-bold mb-4">Smart Home: Bereiche & Möglichkeiten</h1>
          <p className="text-lg text-gray-600 mb-8">
            Entdecke, wie smarte Technik im Zuhause Alltag erleichtert, Energie spart und für mehr Sicherheit sorgt. Hier findest du alle Smart Home Bereiche im Überblick – inkl. Empfehlungen!
          </p>
          {/* Responsive Linktree */}
          <nav className="mb-10">
            <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {seoTopics.map(seo => (
                <li key={seo.id}>
                  <a
                    href={`#${seo.id}`}
                    className="block bg-white border border-green-200 rounded-xl shadow-xs py-3 px-2 text-center
                      transition-all font-medium text-green-700 hover:bg-green-100 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    {seo.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* Responsive Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {smartHomeCategories.map(category => (
              <SmartHomeCategoryCard
                key={category.id}
                id={category.id}
                title={category.title}
                description={category.description}
                image={category.image}
                alt={category.alt}
                product={category.product}
                onAffiliateClick={() => trackOutboundLink(category.product?.link ?? '', category.product?.name)}
              />
            ))}
          </div>

          {/* GUIDES: Ratgeber-Bereiche */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Produktarten im Detail: Guides & FAQ</h2>
            {smartHomeGuides.map(guide => (
              <SmartHomeCategoryGuide
                key={guide.id}
                id={guide.id}
                title={guide.title}
                sections={guide.sections}
              />
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-10 text-center px-2">
            *Wenn du über unsere Links einkaufst, erhalten wir eine kleine Provision. Für dich bleibt der Preis gleich. Danke für deine Unterstützung!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartHomePage;
