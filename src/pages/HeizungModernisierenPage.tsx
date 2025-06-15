
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, Zap, Euro, TreePine, Thermometer, Award, CheckCircle, Clock, Users, FileText, ArrowRight, Lightbulb, Shield, TrendingUp } from 'lucide-react';
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
      pros: ['Sehr umweltfreundlich', 'Niedrige Betriebskosten', 'Hohe Förderung', 'Kühlfunktion möglich'],
      cons: ['Höhere Anschaffung', 'Stromabhängig', 'Dämmung wichtig']
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
      pros: ['Erprobte Technik', 'Günstige Anschaffung', 'Schnelle Installation'],
      cons: ['Fossiler Brennstoff', 'CO2-Abgabe steigt', 'Abhängig von Gaspreisen']
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
      pros: ['CO2-neutral', 'Unabhängig von Gas/Öl', 'Regionale Brennstoffe'],
      cons: ['Platzbedarf für Lager', 'Regelmäßige Wartung', 'Ascheentsorgung']
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
      pros: ['Sehr flexibel', 'Hohe Versorgungssicherheit', 'Optimale Effizienz'],
      cons: ['Komplexere Technik', 'Höhere Anschaffung', 'Mehr Wartung']
    }
  ];

  const modernizationSteps = [
    {
      step: 1,
      title: 'Bestandsaufnahme',
      description: 'Analyse der aktuellen Heizung und des Gebäudezustands',
      duration: '1-2 Wochen',
      icon: <FileText className="w-5 h-5" />
    },
    {
      step: 2,
      title: 'Energieberatung',
      description: 'Professionelle Beratung und Förderantrag',
      duration: '2-3 Wochen',
      icon: <Users className="w-5 h-5" />
    },
    {
      step: 3,
      title: 'Planung & Angebot',
      description: 'Detailplanung und Kostenvoranschlag',
      duration: '1-2 Wochen',
      icon: <Calculator className="w-5 h-5" />
    },
    {
      step: 4,
      title: 'Installation',
      description: 'Einbau der neuen Heizungsanlage',
      duration: '3-5 Tage',
      icon: <Zap className="w-5 h-5" />
    },
    {
      step: 5,
      title: 'Inbetriebnahme',
      description: 'Test, Einstellung und Übergabe',
      duration: '1 Tag',
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  const benefits = [
    {
      icon: <Euro className="w-8 h-8 text-green-600" />,
      title: 'Kosten sparen',
      description: 'Bis zu 40% weniger Heizkosten durch moderne, effiziente Technik'
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
    }
  ];

  return (
    <>
      <Helmet>
        <title>Heizung modernisieren 2025 | Bis zu 70% Förderung sichern</title>
        <meta name="description" content="Heizung modernisieren und bis zu 40% Energiekosten sparen. Alle Fördermittel, beste Heizsysteme und Schritt-für-Schritt Anleitung für 2025." />
        <meta name="keywords" content="Heizung modernisieren, Wärmepumpe, BAFA Förderung, Energiekosten sparen, Heizungsmodernisierung" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-yellow-500 text-black font-bold px-4 py-2">
                  🔥 Bis zu 70% Förderung sichern!
                </Badge>
                <h1 className="text-5xl font-bold leading-tight">
                  Heizung modernisieren & 
                  <span className="text-yellow-300"> richtig sparen</span>
                </h1>
                <p className="text-xl text-green-100 leading-relaxed">
                  Senken Sie Ihre Heizkosten um bis zu 40% und profitieren Sie von staatlichen Förderungen 
                  bis zu 70%. Wir zeigen Ihnen den Weg zur optimalen Heizlösung für Ihr Zuhause.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="#rechner">
                    <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                      <Calculator className="mr-2 w-5 h-5" />
                      Sparpotenzial berechnen
                    </Button>
                  </Link>
                  <Link to="#beratung">
                    <Button size="lg" variant="outline" className="border-white text-black bg-white hover:bg-gray-100">
                      Kostenlose Beratung
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
                      <div className="text-3xl font-bold text-yellow-300">8-15</div>
                      <div className="text-sm">Jahre Amortisation</div>
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
                Die Heizungsmodernisierung war noch nie so attraktiv wie heute. 
                Profitieren Sie von hohen Förderungen und steigenden Energiepreisen.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* Heating Systems Comparison */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welche Heizung passt zu Ihnen?
              </h2>
              <p className="text-xl text-gray-600">
                Vergleichen Sie die verschiedenen Heizsysteme und finden Sie die optimale Lösung
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
                          
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                              <Lightbulb className="w-5 h-5" />
                              Unser Tipp
                            </h4>
                            <p className="text-blue-800 text-sm">
                              {type.id === 'waermepumpe' && 'Perfekt für gut gedämmte Häuser. Lassen Sie vorab die Eignung prüfen.'}
                              {type.id === 'gasbrennwert' && 'Gute Übergangslösung, aber bedenken Sie die steigenden CO₂-Preise.'}
                              {type.id === 'pellets' && 'Ideal für größere Häuser mit Platz für ein Pelletlager.'}
                              {type.id === 'hybrid' && 'Optimale Lösung für Altbauten ohne komplette Sanierung.'}
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

        {/* Calculator Section */}
        <section id="rechner" className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Berechnen Sie Ihr Sparpotenzial
              </h2>
              <p className="text-xl text-gray-600">
                Finden Sie heraus, wie viel Sie mit einer neuen Heizung sparen können
              </p>
            </div>
            <ModernizationSavingsCalculator />
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                So läuft Ihre Heizungsmodernisierung ab
              </h2>
              <p className="text-xl text-gray-600">
                Von der ersten Beratung bis zur fertigen Anlage - wir begleiten Sie bei jedem Schritt
              </p>
            </div>
            
            <div className="space-y-8">
              {modernizationSteps.map((step, index) => (
                <div key={step.step} className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-green-700 transition-colors">
                    {step.step}
                  </div>
                  <Card className="flex-1 group-hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          {step.icon}
                          {step.title}
                        </h3>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.duration}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < modernizationSteps.length - 1 && (
                    <div className="flex-shrink-0 w-12 flex justify-center">
                      <ArrowRight className="w-6 h-6 text-gray-400 mt-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Häufig gestellte Fragen
              </h2>
              <p className="text-xl text-gray-600">
                Antworten auf die wichtigsten Fragen zur Heizungsmodernisierung
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Welche Förderungen gibt es 2025 für neue Heizungen?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Die BAFA fördert den Austausch alter Heizungen mit bis zu 70% der förderfähigen Kosten. 
                  Wärmepumpen erhalten bis zu 70%, Hybridheizungen bis zu 60% und Biomasseheizungen bis zu 45% Förderung. 
                  Zusätzlich gibt es einen Klimageschwindigkeits-Bonus von 20% beim Austausch von Öl-, Gas-, Kohle- oder Nachtspeicherheizungen.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Ist mein Haus für eine Wärmepumpe geeignet?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Die meisten Häuser sind grundsätzlich für Wärmepumpen geeignet. Entscheidend sind die Dämmung, 
                  die Größe der Heizkörper und die Vorlauftemperatur. Bei gut gedämmten Häusern oder einer 
                  Fußbodenheizung ist eine Wärmepumpe ideal. Auch in Altbauten können moderne Hochtemperatur-Wärmepumpen 
                  eine gute Lösung sein. Eine individuelle Beratung klärt die optimale Lösung für Ihr Zuhause.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Wie lange dauert der Austausch einer Heizung?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Der reine Austausch dauert meist 3-5 Tage. Bei Wärmepumpen kann es etwas länger dauern, 
                  da eventuell Außengeräte aufgestellt und zusätzliche Leitungen verlegt werden müssen. 
                  Die gesamte Projektdauer von der Planung bis zur Inbetriebnahme beträgt meist 6-12 Wochen, 
                  abhängig von der Komplexität und Verfügbarkeit der Komponenten.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Was kostet eine neue Heizung?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Die Kosten variieren je nach Heizsystem und Gebäudegröße. Eine Gas-Brennwertheizung kostet etwa 
                  8.000-15.000€, eine Wärmepumpe 15.000-25.000€, eine Pelletheizung 20.000-30.000€ und 
                  eine Hybridheizung 18.000-28.000€. Nach Abzug der Förderungen reduzieren sich die Kosten erheblich. 
                  Zusätzlich sparen Sie langfristig durch niedrigere Betriebskosten.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Brauche ich einen Energieberater?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-4">
                  Für viele Förderungen ist ein Energieberater verpflichtend, besonders bei umfassenderen Sanierungen. 
                  Aber auch sonst ist eine Energieberatung sehr empfehlenswert, da sie die optimale Heizlösung für 
                  Ihr Haus ermittelt und oft versteckte Einsparpotenziale aufdeckt. Die Kosten für den Energieberater 
                  werden ebenfalls zu 80% gefördert.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section id="beratung" className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Bereit für Ihre neue Heizung?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Lassen Sie sich kostenlos beraten und sichern Sie sich die maximale Förderung. 
              Unsere Experten finden die optimale Lösung für Ihr Zuhause.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                  <Users className="mr-2 w-5 h-5" />
                  Kostenlose Beratung anfragen
                </Button>
              </Link>
              <Link to="/foerdermittel">
                <Button size="lg" variant="outline" className="border-white text-black bg-white hover:bg-gray-100">
                  <Euro className="mr-2 w-5 h-5" />
                  Fördercheck starten
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-300">100%</div>
                <div className="text-sm text-green-100">kostenlose Beratung</div>
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
