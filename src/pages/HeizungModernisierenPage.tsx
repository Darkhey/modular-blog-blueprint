
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, Zap, Euro, TreePine, Thermometer, Award, CheckCircle, Clock, Users, FileText, ArrowRight, Lightbulb, Shield, TrendingUp, Smartphone, Wifi, Home, Monitor, Settings, Gauge, Battery, Sun, Snowflake, MapPin, Bell, Graph, Calendar, Wrench, AlertTriangle, Star, Target, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import ModernizationSavingsCalculator from '@/components/calculators/ModernizationSavingsCalculator';
import { Link } from 'react-router-dom';

const HeizungModernisierenPage = () => {
  const [selectedHeatingType, setSelectedHeatingType] = useState<string>('waermepumpe');
  const [selectedSmartSystem, setSelectedSmartSystem] = useState<string>('thermostat');

  const heatingTypes = [
    {
      id: 'waermepumpe',
      name: 'Wärmepumpe',
      icon: <Zap className="w-6 h-6" />,
      efficiency: 95,
      co2Savings: 80,
      costs: '15.000 - 25.000€',
      funding: 'bis 70%',
      description: 'Die umweltfreundlichste Lösung für die Zukunft',
      pros: ['Sehr umweltfreundlich', 'Niedrige Betriebskosten', 'Hohe Förderung', 'Kühlfunktion möglich', 'Smart Home kompatibel'],
      cons: ['Höhere Anschaffung', 'Stromabhängig', 'Dämmung wichtig'],
      smartFeatures: ['App-Steuerung', 'Wetterprognose-Integration', 'Energiemanagement', 'Ferndiagnose']
    },
    {
      id: 'gasbrennwert',
      name: 'Gas-Brennwert',
      icon: <Thermometer className="w-6 h-6" />,
      efficiency: 90,
      co2Savings: 20,
      costs: '8.000 - 15.000€',
      funding: 'bis 30%',
      description: 'Bewährte Technologie mit hoher Effizienz',
      pros: ['Erprobte Technik', 'Günstige Anschaffung', 'Schnelle Installation', 'Smart-Ready verfügbar'],
      cons: ['Fossiler Brennstoff', 'CO2-Abgabe steigt', 'Abhängig von Gaspreisen'],
      smartFeatures: ['Modulationssteuerung', 'Zeitprogramme', 'Raumtemperatur-Regelung', 'Wartungsalarm']
    },
    {
      id: 'pellets',
      name: 'Pelletheizung',
      icon: <TreePine className="w-6 h-6" />,
      efficiency: 88,
      co2Savings: 90,
      costs: '20.000 - 30.000€',
      funding: 'bis 45%',
      description: 'Heizen mit nachwachsenden Rohstoffen',
      pros: ['CO2-neutral', 'Unabhängig von Gas/Öl', 'Regionale Brennstoffe', 'Automatische Beschickung'],
      cons: ['Platzbedarf für Lager', 'Regelmäßige Wartung', 'Ascheentsorgung'],
      smartFeatures: ['Pelletzufuhr-Überwachung', 'Füllstand-Anzeige', 'Asche-Alarm', 'Effizienz-Monitoring']
    },
    {
      id: 'hybrid',
      name: 'Hybridheizung',
      icon: <Award className="w-6 h-6" />,
      efficiency: 92,
      co2Savings: 60,
      costs: '18.000 - 28.000€',
      funding: 'bis 60%',
      description: 'Das Beste aus beiden Welten',
      pros: ['Sehr flexibel', 'Hohe Versorgungssicherheit', 'Optimale Effizienz', 'Intelligente Umschaltung'],
      cons: ['Komplexere Technik', 'Höhere Anschaffung', 'Mehr Wartung'],
      smartFeatures: ['Intelligente Umschaltung', 'Prognose-Steuerung', 'Energieoptimierung', 'Multi-System-Monitoring']
    }
  ];

  const smartHomeSystems = [
    {
      id: 'thermostat',
      name: 'Smart Thermostate',
      icon: <Thermometer className="w-6 h-6" />,
      description: 'Intelligente Raumtemperaturregelung mit App-Steuerung',
      features: ['Raumweise Steuerung', 'Zeitprogramme', 'Geofencing', 'Energiesparmodus'],
      compatibility: ['Wärmepumpe', 'Gas-Brennwert', 'Pellets', 'Hybrid'],
      savings: 'bis 15%',
      price: '150-400€ pro Raum'
    },
    {
      id: 'heizungssteuerung',
      name: 'Heizungssteuerung',
      icon: <Settings className="w-6 h-6" />,
      description: 'Zentrale Steuerung der gesamten Heizungsanlage',
      features: ['Modulationssteuerung', 'Außentemperatur-Führung', 'Ferndiagnose', 'Wartungsplaner'],
      compatibility: ['Alle Heizungstypen'],
      savings: 'bis 20%',
      price: '500-1.500€'
    },
    {
      id: 'sensoren',
      name: 'Smart Sensoren',
      icon: <Gauge className="w-6 h-6" />,
      description: 'Umfassendes Monitoring von Temperatur, Feuchtigkeit und Luftqualität',
      features: ['Raumklima-Überwachung', 'Fensterkontakte', 'Präsenzerkennung', 'Luftqualitätsmessung'],
      compatibility: ['Alle Heizungstypen'],
      savings: 'bis 10%',
      price: '50-150€ pro Sensor'
    },
    {
      id: 'energiemanagement',
      name: 'Energie-Management',
      icon: <Battery className="w-6 h-6" />,
      description: 'Optimierung des Energieverbrauchs durch intelligente Lastverteilung',
      features: ['PV-Integration', 'Speicher-Management', 'Lastspitzen-Vermeidung', 'Stromtarif-Optimierung'],
      compatibility: ['Wärmepumpe', 'Hybrid'],
      savings: 'bis 30%',
      price: '800-2.500€'
    },
    {
      id: 'wetterstation',
      name: 'Wetterstation',
      icon: <Sun className="w-6 h-6" />,
      description: 'Wetterbasierte Heizungsoptimierung durch lokale Wetterdaten',
      features: ['Wetterprognose', 'Vorlauftemperatur-Anpassung', 'Frost-Schutz', 'Solar-Optimierung'],
      compatibility: ['Alle Heizungstypen'],
      savings: 'bis 12%',
      price: '200-600€'
    },
    {
      id: 'sprachsteuerung',
      name: 'Sprachsteuerung',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Steuerung per Alexa, Google Home oder Apple HomeKit',
      features: ['Sprachbefehle', 'Smart Home Integration', 'Routinen', 'Multi-Room-Audio'],
      compatibility: ['Smart Thermostate', 'Heizungssteuerung'],
      savings: 'Komfort-Gewinn',
      price: '50-200€'
    }
  ];

  const modernizationSteps = [
    {
      step: 1,
      title: 'Bestandsaufnahme',
      description: 'Analyse der aktuellen Heizung und des Gebäudezustands',
      duration: '1-2 Wochen',
      icon: <FileText className="w-5 h-5" />,
      details: ['Heizlastberechnung', 'Gebäudeanalyse', 'Effizienz-Check', 'Smart Home Vorbereitung']
    },
    {
      step: 2,
      title: 'Energieberatung',
      description: 'Professionelle Beratung und Förderantrag',
      duration: '2-3 Wochen',
      icon: <Users className="w-5 h-5" />,
      details: ['BAFA-Beratung', 'Förderantrag', 'Sanierungsfahrplan', 'Smart System Planung']
    },
    {
      step: 3,
      title: 'Planung & Angebot',
      description: 'Detailplanung und Kostenvoranschlag',
      duration: '1-2 Wochen',
      icon: <Calculator className="w-5 h-5" />,
      details: ['Anlagenauslegung', 'Smart Home Konzept', 'Zeitplanung', 'Kostenaufstellung']
    },
    {
      step: 4,
      title: 'Installation',
      description: 'Einbau der neuen Heizungsanlage',
      duration: '3-5 Tage',
      icon: <Zap className="w-5 h-5" />,
      details: ['Heizungsinstallation', 'Smart System Integration', 'Rohrleitungsarbeiten', 'Elektroinstallation']
    },
    {
      step: 5,
      title: 'Inbetriebnahme',
      description: 'Test, Einstellung und Übergabe',
      duration: '1 Tag',
      icon: <CheckCircle className="w-5 h-5" />,
      details: ['Funktionstest', 'App-Einrichtung', 'Einweisung', 'Garantie-Übergabe']
    }
  ];

  const benefits = [
    {
      icon: <Euro className="w-8 h-8 text-green-600" />,
      title: 'Kosten sparen',
      description: 'Bis zu 40% weniger Heizkosten durch moderne, effiziente Technik und Smart Home'
    },
    {
      icon: <TreePine className="w-8 h-8 text-green-600" />,
      title: 'Umwelt schützen',
      description: 'Deutlich weniger CO₂-Emissionen für eine bessere Zukunft'
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Sicherheit gewinnen',
      description: 'Unabhängiger von fossilen Brennstoffen und Preisschwankungen'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: 'Wert steigern',
      description: 'Höherer Immobilienwert durch moderne Heiztechnik'
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      title: 'Komfort erhöhen',
      description: 'Smart Home Integration für maximalen Wohnkomfort'
    },
    {
      icon: <Monitor className="w-8 h-8 text-green-600" />,
      title: 'Transparent heizen',
      description: 'Vollständige Kontrolle und Übersicht über Ihren Energieverbrauch'
    }
  ];

  const smartHomeAdvantages = [
    {
      icon: <Smartphone className="w-6 h-6 text-blue-600" />,
      title: 'App-Steuerung',
      description: 'Heizung von überall steuern und überwachen'
    },
    {
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      title: 'Automatisierung',
      description: 'Intelligente Zeitprogramme und Anwesenheitserkennung'
    },
    {
      icon: <Graph className="w-6 h-6 text-blue-600" />,
      title: 'Verbrauchsanalyse',
      description: 'Detaillierte Auswertungen des Energieverbrauchs'
    },
    {
      icon: <Bell className="w-6 h-6 text-blue-600" />,
      title: 'Wartungsalarm',
      description: 'Rechtzeitige Benachrichtigungen für Service und Wartung'
    }
  ];

  const productRecommendations = [
    {
      category: 'Smart Thermostate',
      products: [
        { name: 'tado° Smartes Thermostat', description: 'Marktführer mit umfassender App', link: '#' },
        { name: 'Netatmo Smart Thermostat', description: 'Elegantes Design mit Apple HomeKit', link: '#' },
        { name: 'Honeywell Evohome', description: 'Profi-System für große Häuser', link: '#' }
      ]
    },
    {
      category: 'Heizungssteuerung',
      products: [
        { name: 'Viessmann ViCare', description: 'Direkte Herstellerintegration', link: '#' },
        { name: 'Bosch EasyControl', description: 'Einfache Bedienung und Installation', link: '#' },
        { name: 'Buderus Logamatic', description: 'Professionelle Regelungstechnik', link: '#' }
      ]
    },
    {
      category: 'Smart Sensoren',
      products: [
        { name: 'Eve Room Sensoren', description: 'Apple HomeKit kompatibel', link: '#' },
        { name: 'Fibaro Sensoren', description: 'Z-Wave System mit vielen Optionen', link: '#' },
        { name: 'Homematic IP Sensoren', description: 'Deutsche Qualität und Datenschutz', link: '#' }
      ]
    }
  ];

  const tippsOptimierung = [
    {
      icon: <Thermometer className="w-6 h-6 text-orange-600" />,
      title: 'Vorlauftemperatur optimieren',
      description: 'Jedes Grad weniger spart 6% Energie. Smart Thermostate helfen dabei automatisch.',
      tipp: 'Zieltemperatur: 35-45°C je nach Heizsystem'
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: 'Heizzeiten anpassen',
      description: 'Nur heizen wenn nötig. Präsenzerkennung macht es automatisch.',
      tipp: 'Nachtabsenkung um 3-5°C, tagsüber bei Abwesenheit reduzieren'
    },
    {
      icon: <Wifi className="w-6 h-6 text-orange-600" />,
      title: 'Smart Home nutzen',
      description: 'Vernetzte Systeme optimieren automatisch und sparen bis zu 30% Energie.',
      tipp: 'Wetterprognose, Anwesenheit und Energiepreise berücksichtigen'
    },
    {
      icon: <Wrench className="w-6 h-6 text-orange-600" />,
      title: 'Regelmäßige Wartung',
      description: 'Smart Systeme überwachen kontinuierlich und melden Optimierungsbedarf.',
      tipp: 'Jährliche Wartung erhält Effizienz und verlängert Lebensdauer'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Heizung modernisieren 2025 | Smart Home Integration | Bis zu 70% Förderung</title>
        <meta name="description" content="Heizung modernisieren mit Smart Home Integration. Bis zu 40% Energiekosten sparen, 70% BAFA Förderung. Alle Heizsysteme, Smart Thermostate und digitale Steuerung für 2025." />
        <meta name="keywords" content="Heizung modernisieren, Smart Home, Wärmepumpe, Smart Thermostat, BAFA Förderung, Energiekosten sparen, Heizungsmodernisierung, digitale Heizungssteuerung" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-yellow-500 text-black font-bold px-4 py-2">
                  🔥 Bis zu 70% Förderung + Smart Home Integration!
                </Badge>
                <h1 className="text-5xl font-bold leading-tight">
                  Heizung modernisieren mit 
                  <span className="text-yellow-300"> Smart Home</span>
                </h1>
                <p className="text-xl text-green-100 leading-relaxed">
                  Senken Sie Ihre Heizkosten um bis zu 40% durch moderne Heiztechnik und intelligente 
                  Smart Home Systeme. Profitieren Sie von staatlichen Förderungen bis zu 70% und 
                  revolutionieren Sie Ihr Zuhause.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="#rechner">
                    <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                      <Calculator className="mr-2 w-5 h-5" />
                      Sparpotenzial berechnen
                    </Button>
                  </Link>
                  <Link to="#smart-systeme">
                    <Button size="lg" variant="outline" className="border-white text-black bg-white hover:bg-gray-100">
                      <Smartphone className="mr-2 w-5 h-5" />
                      Smart Home Systeme
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:flex justify-center hidden">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-yellow-300">bis 40%</div>
                      <div className="text-sm">weniger Heizkosten</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-yellow-300">bis 70%</div>
                      <div className="text-sm">BAFA Förderung</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-yellow-300">Smart</div>
                      <div className="text-sm">Home Ready</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-yellow-300">bis 80%</div>
                      <div className="text-sm">weniger CO₂</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Warum jetzt modernisieren?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Die Heizungsmodernisierung mit Smart Home Integration war noch nie so attraktiv. 
                Profitieren Sie von maximaler Effizienz, Komfort und Förderungen.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Home Systems Section */}
        <section id="smart-systeme" className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Smart Home Systeme für Ihre Heizung
              </h2>
              <p className="text-xl text-gray-600">
                Moderne Heizungen werden erst durch Smart Home Systeme richtig effizient und komfortabel
              </p>
            </div>

            <Tabs value={selectedSmartSystem} onValueChange={setSelectedSmartSystem} className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 gap-2 bg-gray-100 p-2 rounded-xl">
                {smartHomeSystems.slice(0, 6).map((system) => (
                  <TabsTrigger 
                    key={system.id} 
                    value={system.id}
                    className="flex items-center gap-2 px-3 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                  >
                    {system.icon}
                    <span className="hidden sm:inline">{system.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {smartHomeSystems.map((system) => (
                <TabsContent key={system.id} value={system.id} className="space-y-6">
                  <Card className="border-2 border-blue-200">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        {system.icon}
                        {system.name}
                        <Badge className="bg-blue-100 text-blue-800">{system.savings} Ersparnis</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <p className="text-lg text-gray-700">{system.description}</p>
                          
                          <div>
                            <h4 className="font-bold text-blue-700 mb-3">✨ Hauptfunktionen</h4>
                            <ul className="space-y-2">
                              {system.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-blue-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">{system.savings}</div>
                              <div className="text-sm text-gray-600">Energieersparnis</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <div className="text-lg font-bold text-gray-900">{system.price}</div>
                              <div className="text-sm text-gray-600">Investition</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-bold text-green-700 mb-3">🔗 Kompatibilität</h4>
                            <div className="flex flex-wrap gap-2">
                              {system.compatibility.map((comp, index) => (
                                <Badge key={index} variant="outline" className="border-green-200 text-green-700">
                                  {comp}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                              <Lightbulb className="w-5 h-5" />
                              Warum lohnt es sich?
                            </h4>
                            <p className="text-blue-800 text-sm">
                              {system.id === 'thermostat' && 'Smart Thermostate sind der einfachste Einstieg in die Heizungsoptimierung. Sie lernen Ihre Gewohnheiten und optimieren automatisch.'}
                              {system.id === 'heizungssteuerung' && 'Die zentrale Steuerung ermöglicht präzise Anpassungen und kann mit Wetterprognosen die Heizung vorausschauend steuern.'}
                              {system.id === 'sensoren' && 'Sensoren liefern die Datengrundlage für alle Optimierungen. Sie erkennen offene Fenster und passen automatisch an.'}
                              {system.id === 'energiemanagement' && 'Besonders bei Wärmepumpen mit PV-Anlage entstehen hier die größten Synergien und Einsparungen.'}
                              {system.id === 'wetterstation' && 'Lokale Wetterdaten sind präziser als Online-Prognosen und ermöglichen optimal abgestimmte Heizzyklen.'}
                              {system.id === 'sprachsteuerung' && 'Die Sprachsteuerung erhöht den Komfort erheblich und macht Smart Home für alle Familienmitglieder zugänglich.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* Smart Home Advantages */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Vorteile von Smart Home Heizungen
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {smartHomeAdvantages.map((advantage, index) => (
                  <Card key={index} className="text-center hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-3">
                        {advantage.icon}
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{advantage.title}</h4>
                      <p className="text-sm text-gray-600">{advantage.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Heating Systems Comparison */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welche Heizung passt zu Ihnen?
              </h2>
              <p className="text-xl text-gray-600">
                Alle modernen Heizsysteme sind Smart Home fähig - vergleichen Sie die Optionen
              </p>
            </div>
            
            <Tabs value={selectedHeatingType} onValueChange={setSelectedHeatingType} className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 bg-gray-100 p-2 rounded-xl">
                {heatingTypes.map((type) => (
                  <TabsTrigger 
                    key={type.id} 
                    value={type.id}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    {type.icon}
                    <span className="hidden sm:inline">{type.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {heatingTypes.map((type) => (
                <TabsContent key={type.id} value={type.id} className="space-y-6">
                  <Card className="border-2 border-green-200">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        {type.icon}
                        {type.name}
                        <Badge className="bg-green-100 text-green-800">{type.description}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{type.efficiency}%</div>
                              <div className="text-sm text-gray-600">Effizienz</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{type.co2Savings}%</div>
                              <div className="text-sm text-gray-600">CO₂-Einsparung</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <div className="text-lg font-bold text-gray-900">{type.costs}</div>
                              <div className="text-sm text-gray-600">Investition</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                              <div className="text-lg font-bold text-blue-600">{type.funding}</div>
                              <div className="text-sm text-gray-600">Förderung</div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-green-700 mb-2">✓ Vorteile</h4>
                            <ul className="space-y-1">
                              {type.pros.map((pro, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-bold text-orange-700 mb-2">⚠ Nachteile</h4>
                            <ul className="space-y-1">
                              {type.cons.map((con, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-700">
                                  <Clock className="w-4 h-4 text-orange-500" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-bold text-blue-700 mb-2">🏠 Smart Features</h4>
                            <ul className="space-y-1">
                              {type.smartFeatures.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-700">
                                  <Wifi className="w-4 h-4 text-blue-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                              <Lightbulb className="w-5 h-5" />
                              Smart Home Tipp
                            </h4>
                            <p className="text-blue-800 text-sm">
                              {type.id === 'waermepumpe' && 'Wärmepumpen profitieren am meisten von Smart Home: PV-Integration, Wetterprognose und intelligente Vorlauftemperatur-Anpassung maximieren die Effizienz.'}
                              {type.id === 'gasbrennwert' && 'Smart Thermostate und modulierende Steuerung können auch bei Gas-Brennwert 15-20% Energie sparen. Ideal als Übergangslösung.'}
                              {type.id === 'pellets' && 'Automatische Pelletzufuhr-Überwachung und Asche-Alarm machen Pelletheizungen besonders komfortabel im Smart Home.'}
                              {type.id === 'hybrid' && 'Hybridheizungen sind Smart Home Champions: Intelligente Umschaltung zwischen den Systemen je nach Energiepreisen und Wetter.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Produktempfehlungen */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Empfohlene Smart Home Produkte
              </h2>
              <p className="text-xl text-gray-600">
                Diese Systeme haben sich in der Praxis bewährt und bieten das beste Preis-Leistungs-Verhältnis
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {productRecommendations.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-700 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.products.map((product, productIndex) => (
                      <div key={productIndex} className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                        <h4 className="font-bold text-gray-900 mb-2">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-green-700 border-green-300 hover:bg-green-50"
                        >
                          <Target className="w-4 h-4 mr-2" />
                          Produkt ansehen
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Optimierung Tipps */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Profi-Tipps für maximale Effizienz
              </h2>
              <p className="text-xl text-gray-600">
                So holen Sie das Maximum aus Ihrer modernen Heizung heraus
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {tippsOptimierung.map((tipp, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-orange-100 rounded-lg">
                        {tipp.icon}
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900">{tipp.title}</h3>
                        <p className="text-gray-600">{tipp.description}</p>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                          <p className="text-sm font-medium text-orange-800">
                            💡 <strong>Profi-Tipp:</strong> {tipp.tipp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section id="rechner" className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Berechnen Sie Ihr Sparpotenzial
              </h2>
              <p className="text-xl text-gray-600">
                Inklusive Smart Home Einsparungen - finden Sie heraus, wie viel Sie sparen können
              </p>
            </div>
            <ModernizationSavingsCalculator />
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                So läuft Ihre Smart-Heizungsmodernisierung ab
              </h2>
              <p className="text-xl text-gray-600">
                Von der ersten Beratung bis zum vollautomatischen Smart Home System
              </p>
            </div>
            
            <div className="space-y-8">
              {modernizationSteps.map((step, index) => (
                <Card key={step.step} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-green-700 transition-colors">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            {step.icon}
                            {step.title}
                          </h3>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                          {step.details.map((detail, detailIndex) => (
                            <Badge key={detailIndex} variant="secondary" className="text-xs">
                              {detail}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white/50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Häufig gestellte Fragen
              </h2>
              <p className="text-xl text-gray-600">
                Antworten auf die wichtigsten Fragen zur Smart-Heizungsmodernisierung
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Welche Förderungen gibt es 2025 für Smart Home Heizungen?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Die BAFA fördert nicht nur die Heizung selbst (bis zu 70%), sondern auch digitale Systemtechnik 
                  wird mitgefördert. Smart Home Komponenten, die direkt zur Effizienzsteigerung beitragen, 
                  sind förderfähig. Zusätzlich gibt es KfW-Programme für Smart Home Systeme und einen 
                  Klimageschwindigkeits-Bonus von 20% beim Austausch alter Heizungen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Wie viel kann ich durch Smart Home Systeme zusätzlich sparen?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Smart Home Systeme können zusätzlich 15-30% Energie sparen, je nach System und Nutzung. 
                  Smart Thermostate allein sparen etwa 15%, eine vollständige Automation mit Wetterprognose, 
                  Anwesenheitserkennung und PV-Integration kann bis zu 30% erreichen. Bei einer Wärmepumpe 
                  mit optimaler Smart Home Integration sind Gesamteinsparungen von über 50% möglich.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Sind Smart Home Heizungen sicher und datenschutzkonform?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Moderne Smart Home Heizungssysteme verwenden verschlüsselte Verbindungen und arbeiten 
                  oft lokal ohne Cloud-Zwang. Deutsche Hersteller wie Bosch, Viessmann oder Homematic IP 
                  bieten DSGVO-konforme Lösungen. Viele Systeme funktionieren auch komplett offline und 
                  kommunizieren nur innerhalb Ihres Heimnetzwerks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Kann ich Smart Home Systeme nachträglich zu meiner Heizung hinzufügen?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Ja, fast alle modernen Heizungen sind Smart Home nachrüstbar. Smart Thermostate 
                  funktionieren mit allen Heizkörpern, Heizungssteuerungen können meist nachgerüstet werden. 
                  Selbst ältere Heizungen können durch Smart Systeme optimiert werden. Am besten 
                  funktioniert es natürlich, wenn Smart Home von Anfang an mitgeplant wird.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Welches Smart Home System passt am besten zu welcher Heizung?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Wärmepumpen profitieren am meisten von umfassenden Smart Home Systemen mit PV-Integration 
                  und Wetterprognose. Gas-Brennwertheizungen sind ideal mit Smart Thermostaten und 
                  modulierender Steuerung. Pelletheizungen benötigen vor allem Füllstand-Monitoring und 
                  Asche-Management. Hybridheizungen sind Smart Home Champions mit intelligenter Umschaltung 
                  zwischen den Systemen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Was kostet ein komplettes Smart Home Heizsystem?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Die Smart Home Integration kostet etwa 1.000-3.000€ zusätzlich zur Heizung, je nach 
                  Umfang. Basis-Smart Thermostate gibt es ab 150€ pro Raum, professionelle Systeme mit 
                  Zentrale kosten 1.500-2.500€. Da die Systeme oft mitgefördert werden und sich durch 
                  Energieeinsparungen amortisieren, ist die Investition meist nach 3-5 Jahren wieder drin.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section id="beratung" className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Bereit für Ihre Smart-Heizung der Zukunft?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Lassen Sie sich kostenlos beraten und planen Sie Ihre intelligente Heizungsmodernisierung. 
              Unsere Smart Home Experten finden die optimale Lösung für maximale Effizienz und Komfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                  <Phone className="mr-2 w-5 h-5" />
                  Kostenlose Smart Home Beratung
                </Button>
              </Link>
              <Link to="/foerdermittel">
                <Button size="lg" variant="outline" className="border-white text-black bg-white hover:bg-gray-100">
                  <Euro className="mr-2 w-5 h-5" />
                  Fördercheck starten
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-300">100%</div>
                <div className="text-sm text-green-100">kostenlose Beratung</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">Smart</div>
                <div className="text-sm text-green-100">Home Integration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">5.000+</div>
                <div className="text-sm text-green-100">zufriedene Kunden</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">15+</div>
                <div className="text-sm text-green-100">Jahre Erfahrung</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HeizungModernisierenPage;
