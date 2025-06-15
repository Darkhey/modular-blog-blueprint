
import { useState } from 'react';
import { Zap, Thermometer, TreePine, Award, CheckCircle, Clock, Wifi, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const HeatingComparisonSection = () => {
  const [selectedHeatingType, setSelectedHeatingType] = useState<string>('waermepumpe');

  return (
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
  );
};

export default HeatingComparisonSection;
