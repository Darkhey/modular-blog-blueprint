// Shared product data for smart home products
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

export interface Product {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: string;
  priceValue: number; // numeric for sorting/filtering
  description: string;
  pros: string[];
  cons: string[];
  compatibility: string[];
  highlight?: string;
  category: 'thermostat' | 'steuerung' | 'sensor';
  ecosystems: string[];
  localOperation: boolean;
  subscriptionRequired: boolean;
}

export const allProducts: Product[] = [
  // Smart Thermostate
  {
    name: 'tado° Smartes Heizkörper-Thermostat V3+',
    image: tadoImg,
    rating: 4.5,
    reviewCount: 12400,
    price: '59–79 € / Thermostat',
    priceValue: 69,
    description: 'Europas meistverkauftes smartes Thermostat. Lernt Ihre Gewohnheiten, nutzt Geofencing und passt die Heizung automatisch an Wetterdaten und Ihre Anwesenheit an. Offene API und breite Smart-Home-Kompatibilität.',
    pros: ['Geofencing erkennt Abwesenheit', 'Wettervorhersage-Steuerung', 'Apple HomeKit, Alexa, Google kompatibel', 'Einfache Selbstmontage in 10 Min.'],
    cons: ['Auto-Assist benötigt Abo (2,99 €/Monat)', 'Kein lokaler Betrieb ohne Internet'],
    compatibility: ['Alle gängigen Heizkörperventile', 'Fußbodenheizung (Zusatzmodul)'],
    highlight: 'Testsieger Stiftung Warentest',
    category: 'thermostat',
    ecosystems: ['Apple HomeKit', 'Alexa', 'Google Home'],
    localOperation: false,
    subscriptionRequired: true,
  },
  {
    name: 'Netatmo Smartes Thermostat (Starck)',
    image: netatmoImg,
    rating: 4.3,
    reviewCount: 5600,
    price: '149 € (Raumthermostat)',
    priceValue: 149,
    description: 'Designthermostat von Philippe Starck mit E-Ink-Display. Kein Abo nötig, alle Funktionen kostenlos. Besonders beliebt bei Apple-Nutzern dank nativer HomeKit-Integration und Thread-Unterstützung.',
    pros: ['Kein Abo – alle Features inklusive', 'Elegantes Starck-Design', 'Apple HomeKit & Thread nativ', 'Auto-Adapt-Algorithmus'],
    cons: ['Keine Geofencing-Automatik', 'Weniger Drittanbieter-Integrationen'],
    compatibility: ['Gasheizung', 'Ölheizung', 'Wärmepumpe (OpenTherm)'],
    category: 'thermostat',
    ecosystems: ['Apple HomeKit', 'Alexa', 'Google Home'],
    localOperation: false,
    subscriptionRequired: false,
  },
  {
    name: 'Honeywell Home Evohome',
    image: honeyImg,
    rating: 4.4,
    reviewCount: 3200,
    price: '250–350 € (Starter-Kit)',
    priceValue: 300,
    description: 'Professionelles Mehrzonenregelungssystem für bis zu 12 Heizzonen. Touch-Display als Zentrale, ideal für große Häuser mit vielen Räumen. Bewährte Technik mit über 10 Jahren Marktpräsenz.',
    pros: ['Bis zu 12 unabhängige Heizzonen', 'Touchscreen-Zentrale', 'Bewährte Profi-Technik', 'OpenTherm-Unterstützung'],
    cons: ['Höherer Einstiegspreis', 'Älteres App-Design'],
    compatibility: ['Alle Heizkörpertypen', 'Fußbodenheizung', 'Mischventile'],
    category: 'thermostat',
    ecosystems: ['Alexa', 'Google Home'],
    localOperation: false,
    subscriptionRequired: false,
  },
  {
    name: 'AVM FRITZ!DECT 302',
    image: fritzImg,
    rating: 4.6,
    reviewCount: 8900,
    price: '54 € / Thermostat',
    priceValue: 54,
    description: 'Ideales Heizkörperthermostat für FRITZ!Box-Nutzer. Läuft komplett lokal über DECT-Funk – kein Cloud-Zwang, kein Abo. E-Paper-Display mit adaptiver Heizsteuerung und Fenster-offen-Erkennung.',
    pros: ['100 % lokal – keine Cloud nötig', 'Kein Abo, kein Gateway-Kauf', 'E-Paper spart Batterie', 'Fenster-offen-Erkennung'],
    cons: ['Nur mit FRITZ!Box nutzbar', 'Keine Apple HomeKit-Unterstützung'],
    compatibility: ['Alle gängigen Heizkörperventile (M30 × 1,5)'],
    highlight: 'Preis-Leistungs-Sieger',
    category: 'thermostat',
    ecosystems: ['FRITZ!Box', 'Alexa'],
    localOperation: true,
    subscriptionRequired: false,
  },
  // Heizungssteuerung
  {
    name: 'Viessmann ViCare',
    image: viessmannImg,
    rating: 4.2,
    reviewCount: 4100,
    price: '200–400 € (inkl. WLAN-Modul)',
    priceValue: 300,
    description: 'Digitale Schnittstelle für alle Viessmann-Heizungen. Ermöglicht Fernsteuerung, Fehlerdiagnose und Energiemonitoring per App. Der Heizungsfachmann kann aus der Ferne auf die Anlage zugreifen.',
    pros: ['Ferndiagnose spart Servicekosten', 'Energieverbrauchsanalyse', 'Heizungsfachmann-Fernzugriff', 'Alle Viessmann-Geräte kompatibel'],
    cons: ['Nur für Viessmann-Heizungen', 'Teils verzögerte App-Updates'],
    compatibility: ['Vitodens', 'Vitocal', 'Vitocrossal'],
    category: 'steuerung',
    ecosystems: ['Alexa', 'Google Home'],
    localOperation: false,
    subscriptionRequired: false,
  },
  {
    name: 'Bosch EasyControl CT 200',
    image: boschImg,
    rating: 4.3,
    reviewCount: 2800,
    price: '290–380 €',
    priceValue: 335,
    description: 'Eleganter Raumregler mit Farb-Touchdisplay. Steuert Heizung und Warmwasser, erkennt offene Fenster und lernt das Heizverhalten. Kompatibel mit Junkers/Bosch-Heizungen.',
    pros: ['Intuitives Farb-Touchdisplay', 'Automatische Fenster-Erkennung', 'Alexa & Google Assistant', 'Energieeffizienz-Anzeige'],
    cons: ['Nur EMS-plus-Geräte (Bosch/Junkers)', 'Kein Apple HomeKit'],
    compatibility: ['Bosch Condens', 'Junkers Cerapur', 'Bosch Compress'],
    highlight: 'Einfachste Bedienung',
    category: 'steuerung',
    ecosystems: ['Alexa', 'Google Home'],
    localOperation: false,
    subscriptionRequired: false,
  },
  {
    name: 'Buderus Logamatic TC100',
    image: buderusImg,
    rating: 4.1,
    reviewCount: 1900,
    price: '250–350 €',
    priceValue: 300,
    description: 'Internetfähiger Regler für Buderus-Heizsysteme. Verbindet sich über das Buderus-Webportal und bietet Zeitprogramme, Urlaubsmodus und Fernzugriff.',
    pros: ['Zuverlässige Buderus-Qualität', 'Webportal für Analyse', 'Push-Benachrichtigungen', 'Einfache Inbetriebnahme'],
    cons: ['Nur für Buderus-Systeme', 'Design weniger modern'],
    compatibility: ['Logamax plus', 'Logano plus', 'Logatherm'],
    category: 'steuerung',
    ecosystems: ['Alexa'],
    localOperation: false,
    subscriptionRequired: false,
  },
  {
    name: 'Wolf Link home',
    image: wolfImg,
    rating: 4.0,
    reviewCount: 1200,
    price: '200–300 € (ISM8i-Modul)',
    priceValue: 250,
    description: 'Smartes Schnittstellenmodul für Wolf-Heizungen. Bietet App-Steuerung, Energiemonitoring und erlaubt dem Heizungsbauer Fernwartung.',
    pros: ['Detailliertes Energiemonitoring', 'Fernwartung durch Fachbetrieb', 'COP-Anzeige für Wärmepumpen', 'Störungsmeldungen per Push'],
    cons: ['Nur Wolf-Heizungen', 'Einrichtung durch Fachbetrieb empfohlen'],
    compatibility: ['CGB-2', 'CHA Wärmepumpe', 'TOB Ölbrennwert'],
    category: 'steuerung',
    ecosystems: ['Alexa'],
    localOperation: false,
    subscriptionRequired: false,
  },
  // Smart Sensoren
  {
    name: 'Eve Room (3. Gen.)',
    image: eveImg,
    rating: 4.4,
    reviewCount: 3400,
    price: '99 €',
    priceValue: 99,
    description: 'Premium-Raumklimasensor für Apple HomeKit und Thread. Misst Temperatur, Luftfeuchtigkeit und VOC-Luftqualität. Großes E-Ink-Display zeigt Werte direkt am Gerät.',
    pros: ['Apple HomeKit & Thread nativ', 'E-Ink-Display am Gerät', 'VOC-Luftqualitätsmessung', 'Kein Cloud-Zwang – alles lokal'],
    cons: ['Nur Apple-Ökosystem', 'Kein Alexa/Google nativ'],
    compatibility: ['Apple HomeKit', 'Thread', 'Matter (ab Firmware-Update)'],
    highlight: 'Bester Apple-Sensor',
    category: 'sensor',
    ecosystems: ['Apple HomeKit'],
    localOperation: true,
    subscriptionRequired: false,
  },
  {
    name: 'Homematic IP Temperatur-/Feuchtesensor',
    image: homematicImg,
    rating: 4.5,
    reviewCount: 6200,
    price: '44 € / Sensor',
    priceValue: 44,
    description: 'Zuverlässiger Funksensor mit deutscher Cloud und hohem Datenschutzniveau. Teil des umfangreichen Homematic IP-Systems mit über 150 kompatiblen Geräten.',
    pros: ['Deutsche Cloud, DSGVO-konform', 'Riesiges Ökosystem (150+ Geräte)', 'Batterie hält 2 Jahre', 'Auch ohne Internet nutzbar (mit CCU)'],
    cons: ['Eigene Funkfrequenz (nicht ZigBee/Z-Wave)', 'Gateway erforderlich (Access Point ab 49 €)'],
    compatibility: ['Homematic IP', 'CCU3', 'mediola'],
    highlight: 'Datenschutz-Sieger',
    category: 'sensor',
    ecosystems: ['Homematic IP', 'Alexa', 'Google Home'],
    localOperation: true,
    subscriptionRequired: false,
  },
  {
    name: 'Shelly H&T Gen3',
    image: shellyImg,
    rating: 4.3,
    reviewCount: 4800,
    price: '24 € / Sensor',
    priceValue: 24,
    description: 'Extrem günstiger WLAN-Sensor mit E-Paper-Display. Läuft komplett lokal, lässt sich in Home Assistant, MQTT und viele weitere Systeme einbinden.',
    pros: ['Unschlagbar günstig', 'Komplett lokal nutzbar', 'MQTT & Home Assistant', 'E-Paper-Display'],
    cons: ['Kein Apple HomeKit', 'WLAN kann Reichweitenprobleme haben'],
    compatibility: ['Home Assistant', 'MQTT', 'Shelly Cloud', 'Alexa', 'Google'],
    highlight: 'Günstigster Sensor',
    category: 'sensor',
    ecosystems: ['Home Assistant', 'Alexa', 'Google Home'],
    localOperation: true,
    subscriptionRequired: false,
  },
  {
    name: 'Aqara Temperatur-/Feuchtigkeitssensor T1',
    image: aqaraImg,
    rating: 4.2,
    reviewCount: 7100,
    price: '16 € / Sensor',
    priceValue: 16,
    description: 'Ultra-kompakter ZigBee-Sensor (3,6 × 3,6 × 0,9 cm). Ideal zum Verteilen in vielen Räumen. Batterie hält bis zu 2 Jahre. Kompatibel mit Apple HomeKit über den Aqara Hub.',
    pros: ['Extrem klein und unauffällig', 'ZigBee – stromsparend', 'Apple HomeKit über Hub', 'Batterie 2 Jahre'],
    cons: ['Hub erforderlich (ab 29 €)', 'Kein Display am Gerät'],
    compatibility: ['Aqara Hub', 'Apple HomeKit', 'Alexa', 'Google', 'Home Assistant (ZigBee)'],
    category: 'sensor',
    ecosystems: ['Apple HomeKit', 'Alexa', 'Google Home', 'Home Assistant'],
    localOperation: false,
    subscriptionRequired: false,
  },
];

export const categoryLabels: Record<Product['category'], string> = {
  thermostat: 'Smart Thermostate',
  steuerung: 'Heizungssteuerung',
  sensor: 'Smart Sensoren',
};

export const categoryDescriptions: Record<Product['category'], string> = {
  thermostat: 'Intelligente Heizkörper- und Raumthermostate für raumweise Temperatursteuerung per App.',
  steuerung: 'Zentrale Steuerungseinheiten für die komplette Heizungsanlage mit Fernzugriff und Diagnose.',
  sensor: 'Raum- und Umgebungssensoren für präzises Monitoring von Temperatur, Feuchtigkeit und Luftqualität.',
};
