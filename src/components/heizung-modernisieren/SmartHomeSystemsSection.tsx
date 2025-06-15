
import { useState } from 'react';
import { Thermometer, Settings, Gauge, Battery, Sun, Smartphone, Lightbulb, CheckCircle, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const smartHomeAdvantages = [
  {
    icon: <Smartphone className="w-6 h-6 text-blue-600" />,
    title: 'App-Steuerung',
    description: 'Heizung von überall steuern und überwachen'
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    title: 'Automatisierung',
    description: 'Intelligente Zeitprogramme und Anwesenheitserkennung'
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    title: 'Verbrauchsanalyse',
    description: 'Detaillierte Auswertungen des Energieverbrauchs'
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    title: 'Wartungsalarm',
    description: 'Rechtzeitige Benachrichtigungen für Service und Wartung'
  }
];

const SmartHomeSystemsSection = () => {
  const [selectedSmartSystem, setSelectedSmartSystem] = useState<string>('thermostat');

  return (
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
  );
};

export default SmartHomeSystemsSection;
