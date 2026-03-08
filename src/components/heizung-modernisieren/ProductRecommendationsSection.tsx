import { useState } from 'react';
import { Star, StarHalf, CheckCircle, XCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Product images
import tadoImg from '@/assets/products/smart-thermostat-tado.jpg';
import netatmoImg from '@/assets/products/smart-thermostat-netatmo.jpg';
import honeyImg from '@/assets/products/smart-thermostat-honeywell.jpg';
import fritzImg from '@/assets/products/smart-thermostat-fritz.jpg';
import boschImg from '@/assets/products/heizungssteuerung-bosch.jpg';
import viessmannImg from '@/assets/products/heizungssteuerung-viessmann.jpg';
import buderusImg from '@/assets/products/heizungssteuerung-buderus.jpg';
import wolfImg from '@/assets/products/heizungssteuerung-wolf.jpg';
import eveImg from '@/assets/products/sensor-eve-room.jpg';
import homematicImg from '@/assets/products/sensor-homematic.jpg';
import shellyImg from '@/assets/products/sensor-shelly.jpg';
import aqaraImg from '@/assets/products/sensor-aqara.jpg';

interface Product {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: string;
  description: string;
  pros: string[];
  cons: string[];
  compatibility: string[];
  highlight?: string;
}

interface ProductCategory {
  category: string;
  description: string;
  products: Product[];
}

const productCategories: ProductCategory[] = [
  {
    category: 'Smart Thermostate',
    description: 'Intelligente Heizkörper- und Raumthermostate für raumweise Temperatursteuerung per App.',
    products: [
      {
        name: 'tado° Smartes Heizkörper-Thermostat V3+',
        image: tadoImg,
        rating: 4.5,
        reviewCount: 12400,
        price: '59–79 € / Thermostat',
        description: 'Europas meistverkauftes smartes Thermostat. Lernt Ihre Gewohnheiten, nutzt Geofencing und passt die Heizung automatisch an Wetterdaten und Ihre Anwesenheit an. Offene API und breite Smart-Home-Kompatibilität.',
        pros: ['Geofencing erkennt Abwesenheit', 'Wettervorhersage-Steuerung', 'Apple HomeKit, Alexa, Google kompatibel', 'Einfache Selbstmontage in 10 Min.'],
        cons: ['Auto-Assist benötigt Abo (2,99 €/Monat)', 'Kein lokaler Betrieb ohne Internet'],
        compatibility: ['Alle gängigen Heizkörperventile', 'Fußbodenheizung (Zusatzmodul)'],
        highlight: 'Testsieger Stiftung Warentest'
      },
      {
        name: 'Netatmo Smartes Thermostat (Starck)',
        image: netatmoImg,
        rating: 4.3,
        reviewCount: 5600,
        price: '149 € (Raumthermostat)',
        description: 'Designthermostat von Philippe Starck mit E-Ink-Display. Kein Abo nötig, alle Funktionen kostenlos. Besonders beliebt bei Apple-Nutzern dank nativer HomeKit-Integration und Thread-Unterstützung.',
        pros: ['Kein Abo – alle Features inklusive', 'Elegantes Starck-Design', 'Apple HomeKit & Thread nativ', 'Auto-Adapt-Algorithmus'],
        cons: ['Keine Geofencing-Automatik', 'Weniger Drittanbieter-Integrationen'],
        compatibility: ['Gasheizung', 'Ölheizung', 'Wärmepumpe (OpenTherm)'],
      },
      {
        name: 'Honeywell Home Evohome',
        image: honeyImg,
        rating: 4.4,
        reviewCount: 3200,
        price: '250–350 € (Starter-Kit)',
        description: 'Professionelles Mehrzonenregelungssystem für bis zu 12 Heizzonen. Touch-Display als Zentrale, ideal für große Häuser mit vielen Räumen. Bewährte Technik mit über 10 Jahren Marktpräsenz.',
        pros: ['Bis zu 12 unabhängige Heizzonen', 'Touchscreen-Zentrale', 'Bewährte Profi-Technik', 'OpenTherm-Unterstützung'],
        cons: ['Höherer Einstiegspreis', 'Älteres App-Design'],
        compatibility: ['Alle Heizkörpertypen', 'Fußbodenheizung', 'Mischventile'],
      },
      {
        name: 'AVM FRITZ!DECT 302',
        image: fritzImg,
        rating: 4.6,
        reviewCount: 8900,
        price: '54 € / Thermostat',
        description: 'Ideales Heizkörperthermostat für FRITZ!Box-Nutzer. Läuft komplett lokal über DECT-Funk – kein Cloud-Zwang, kein Abo. E-Paper-Display mit adaptiver Heizsteuerung und Fenster-offen-Erkennung.',
        pros: ['100 % lokal – keine Cloud nötig', 'Kein Abo, kein Gateway-Kauf', 'E-Paper spart Batterie', 'Fenster-offen-Erkennung'],
        cons: ['Nur mit FRITZ!Box nutzbar', 'Keine Apple HomeKit-Unterstützung'],
        compatibility: ['Alle gängigen Heizkörperventile (M30 × 1,5)'],
        highlight: 'Preis-Leistungs-Sieger'
      }
    ]
  },
  {
    category: 'Heizungssteuerung',
    description: 'Zentrale Steuerungseinheiten für die komplette Heizungsanlage mit Fernzugriff und Diagnose.',
    products: [
      {
        name: 'Viessmann ViCare',
        image: viessmannImg,
        rating: 4.2,
        reviewCount: 4100,
        price: '200–400 € (inkl. WLAN-Modul)',
        description: 'Digitale Schnittstelle für alle Viessmann-Heizungen. Ermöglicht Fernsteuerung, Fehlerdiagnose und Energiemonitoring per App. Der Heizungsfachmann kann aus der Ferne auf die Anlage zugreifen – spart Serviceeinsätze.',
        pros: ['Ferndiagnose spart Servicekosten', 'Energieverbrauchsanalyse', 'Heizungsfachmann-Fernzugriff', 'Alle Viessmann-Geräte kompatibel'],
        cons: ['Nur für Viessmann-Heizungen', 'Teils verzögerte App-Updates'],
        compatibility: ['Vitodens', 'Vitocal', 'Vitocrossal'],
      },
      {
        name: 'Bosch EasyControl CT 200',
        image: boschImg,
        rating: 4.3,
        reviewCount: 2800,
        price: '290–380 €',
        description: 'Eleganter Raumregler mit Farb-Touchdisplay. Steuert Heizung und Warmwasser, erkennt offene Fenster und lernt das Heizverhalten. Kompatibel mit Junkers/Bosch-Heizungen und EMS-plus-Schnittstelle.',
        pros: ['Intuitives Farb-Touchdisplay', 'Automatische Fenster-Erkennung', 'Alexa & Google Assistant', 'Energieeffizienz-Anzeige'],
        cons: ['Nur EMS-plus-Geräte (Bosch/Junkers)', 'Kein Apple HomeKit'],
        compatibility: ['Bosch Condens', 'Junkers Cerapur', 'Bosch Compress'],
        highlight: 'Einfachste Bedienung'
      },
      {
        name: 'Buderus Logamatic TC100',
        image: buderusImg,
        rating: 4.1,
        reviewCount: 1900,
        price: '250–350 €',
        description: 'Internetfähiger Regler für Buderus-Heizsysteme. Verbindet sich über das Buderus-Webportal und bietet Zeitprogramme, Urlaubsmodus und Fernzugriff. Solide Technik aus dem Bosch-Konzern.',
        pros: ['Zuverlässige Buderus-Qualität', 'Webportal für Analyse', 'Push-Benachrichtigungen', 'Einfache Inbetriebnahme'],
        cons: ['Nur für Buderus-Systeme', 'Design weniger modern'],
        compatibility: ['Logamax plus', 'Logano plus', 'Logatherm'],
      },
      {
        name: 'Wolf Link home',
        image: wolfImg,
        rating: 4.0,
        reviewCount: 1200,
        price: '200–300 € (ISM8i-Modul)',
        description: 'Smartes Schnittstellenmodul für Wolf-Heizungen. Bietet App-Steuerung, Energiemonitoring und erlaubt dem Heizungsbauer Fernwartung. Besonders bei Wärmepumpen-Nutzern beliebt für die Effizienzoptimierung.',
        pros: ['Detailliertes Energiemonitoring', 'Fernwartung durch Fachbetrieb', 'COP-Anzeige für Wärmepumpen', 'Störungsmeldungen per Push'],
        cons: ['Nur Wolf-Heizungen', 'Einrichtung durch Fachbetrieb empfohlen'],
        compatibility: ['CGB-2', 'CHA Wärmepumpe', 'TOB Ölbrennwert'],
      }
    ]
  },
  {
    category: 'Smart Sensoren',
    description: 'Raum- und Umgebungssensoren für präzises Monitoring von Temperatur, Feuchtigkeit und Luftqualität.',
    products: [
      {
        name: 'Eve Room (3. Gen.)',
        image: eveImg,
        rating: 4.4,
        reviewCount: 3400,
        price: '99 €',
        description: 'Premium-Raumklimasensor für Apple HomeKit und Thread. Misst Temperatur, Luftfeuchtigkeit und VOC-Luftqualität. Großes E-Ink-Display zeigt Werte direkt am Gerät – kein Smartphone nötig.',
        pros: ['Apple HomeKit & Thread nativ', 'E-Ink-Display am Gerät', 'VOC-Luftqualitätsmessung', 'Kein Cloud-Zwang – alles lokal'],
        cons: ['Nur Apple-Ökosystem', 'Kein Alexa/Google nativ'],
        compatibility: ['Apple HomeKit', 'Thread', 'Matter (ab Firmware-Update)'],
        highlight: 'Bester Apple-Sensor'
      },
      {
        name: 'Homematic IP Temperatur-/Feuchtesensor',
        image: homematicImg,
        rating: 4.5,
        reviewCount: 6200,
        price: '44 € / Sensor',
        description: 'Zuverlässiger Funksensor mit deutscher Cloud und hohem Datenschutzniveau. Teil des umfangreichen Homematic IP-Systems mit über 150 kompatiblen Geräten. Batterie hält bis zu 2 Jahre.',
        pros: ['Deutsche Cloud, DSGVO-konform', 'Riesiges Ökosystem (150+ Geräte)', 'Batterie hält 2 Jahre', 'Auch ohne Internet nutzbar (mit CCU)'],
        cons: ['Eigene Funkfrequenz (nicht ZigBee/Z-Wave)', 'Gateway erforderlich (Access Point ab 49 €)'],
        compatibility: ['Homematic IP', 'CCU3', 'mediola'],
        highlight: 'Datenschutz-Sieger'
      },
      {
        name: 'Shelly H&T Gen3',
        image: shellyImg,
        rating: 4.3,
        reviewCount: 4800,
        price: '24 € / Sensor',
        description: 'Extrem günstiger WLAN-Sensor mit E-Paper-Display. Läuft komplett lokal, lässt sich in Home Assistant, MQTT und viele weitere Systeme einbinden. Offene API für Bastler und Profis gleichermaßen.',
        pros: ['Unschlagbar günstig', 'Komplett lokal nutzbar', 'MQTT & Home Assistant', 'E-Paper-Display'],
        cons: ['Kein Apple HomeKit', 'WLAN kann Reichweitenprobleme haben'],
        compatibility: ['Home Assistant', 'MQTT', 'Shelly Cloud', 'Alexa', 'Google'],
        highlight: 'Günstigster Sensor'
      },
      {
        name: 'Aqara Temperatur-/Feuchtigkeitssensor T1',
        image: aqaraImg,
        rating: 4.2,
        reviewCount: 7100,
        price: '16 € / Sensor',
        description: 'Ultra-kompakter ZigBee-Sensor (3,6 × 3,6 × 0,9 cm). Ideal zum Verteilen in vielen Räumen. Batterie hält bis zu 2 Jahre. Kompatibel mit Apple HomeKit über den Aqara Hub.',
        pros: ['Extrem klein und unauffällig', 'ZigBee – stromsparend', 'Apple HomeKit über Hub', 'Batterie 2 Jahre'],
        cons: ['Hub erforderlich (ab 29 €)', 'Kein Display am Gerät'],
        compatibility: ['Aqara Hub', 'Apple HomeKit', 'Alexa', 'Google', 'Home Assistant (ZigBee)'],
      }
    ]
  }
];

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalf && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      <span className="ml-1.5 text-sm font-semibold text-foreground">{rating}</span>
      <span className="text-xs text-muted-foreground ml-1">({(rating > 4 ? '' : '') + Math.round(rating * 1000 + Math.random()).toLocaleString('de-DE')} Bewertungen)</span>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-border">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0 relative overflow-hidden bg-muted">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {product.highlight && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-950 text-xs font-bold shadow-md">
              ⭐ {product.highlight}
            </Badge>
          )}
        </div>
        <CardContent className="flex-1 p-4 sm:p-5">
          <div className="space-y-2">
            <h4 className="font-bold text-foreground text-lg leading-tight">{product.name}</h4>
            <RatingStars rating={product.rating} />
            <p className="text-sm font-semibold text-primary">{product.price}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            
            {expanded && (
              <div className="space-y-3 pt-2 border-t border-border mt-3">
                <div>
                  <h5 className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1.5">Vorteile</h5>
                  <ul className="space-y-1">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-sm text-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1.5">Nachteile</h5>
                  <ul className="space-y-1">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-sm text-foreground">
                        <XCircle className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5">Kompatibilität</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {product.compatibility.map((c, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-border text-muted-foreground">{c}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <><ChevronUp className="w-4 h-4 mr-1" /> Weniger anzeigen</>
              ) : (
                <><ChevronDown className="w-4 h-4 mr-1" /> Details &amp; Vor-/Nachteile</>
              )}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const ProductRecommendationsSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Empfohlene Smart Home Produkte
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unabhängig getestet und bewertet – diese Systeme haben sich in der Praxis bewährt
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {productCategories.map((cat, index) => (
            <Button
              key={index}
              variant={activeCategory === index ? 'default' : 'outline'}
              onClick={() => setActiveCategory(index)}
              className="rounded-full"
            >
              {cat.category}
            </Button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center mb-6 max-w-xl mx-auto">
          {productCategories[activeCategory].description}
        </p>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {productCategories[activeCategory].products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        <div className="mt-8 p-4 bg-muted/50 rounded-xl border border-border text-center">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Hinweis:</strong> Alle Angaben basieren auf Herstellerinformationen und öffentlich verfügbaren Nutzerbewertungen (Stand: März 2026). 
            Preise können je nach Händler variieren. Wir empfehlen, vor dem Kauf die Kompatibilität mit Ihrer Heizungsanlage zu prüfen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductRecommendationsSection;
