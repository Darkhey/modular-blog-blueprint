
import { Link } from 'react-router-dom';
import { Lightbulb, AlertTriangle, CheckCircle, TrendingUp, Home, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MistakesWarningBox from '@/components/blog/post/MistakesWarningBox';
import ChecklistBox from '@/components/blog/post/ChecklistBox';

const DaemmungTipsSection = () => {
  const proTips = [
    {
      icon: TrendingUp,
      title: "Wärmebrücken vermeiden",
      tip: "Achten Sie auf lückenlose Dämmung ohne Unterbrechungen. Bereits 5% Wärmebrücken reduzieren die Wirkung um 25%.",
      category: "Planung"
    },
    {
      icon: Shield,
      title: "Dampfsperre richtig anbringen",
      tip: "Bei Innendämmung ist eine fachgerechte Dampfsperre essentiell. Falsch angebracht führt sie zu Schimmelbildung.",
      category: "Ausführung"
    },
    {
      icon: Home,
      title: "Fenster mit einplanen",
      tip: "Nach der Dämmung sind oft neue Fenster nötig. Planen Sie beides zusammen für optimale Effizienz.",
      category: "Planung"
    },
    {
      icon: CheckCircle,
      title: "Qualität vor Preis",
      tip: "Gute Dämmstoffe halten 40+ Jahre. Die Mehrkosten für Qualität amortisieren sich über die Lebensdauer.",
      category: "Material"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Profi-Tipps für perfekte Dämmung
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mit diesen Expertentipps vermeiden Sie teure Fehler und maximieren die Effizienz Ihrer Dämmung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <ChecklistBox title="Checkliste vor Dämmungsbeginn">
              <li>Energieberatung durchführen lassen</li>
              <li>Förderanträge VOR Auftragsvergabe stellen</li>
              <li>Fachbetrieb mit Referenzen auswählen</li>
              <li>U-Werte für Förderung prüfen</li>
              <li>Dampfsperre/Dampfbremse planen</li>
              <li>Lüftungskonzept berücksichtigen</li>
              <li>Fenster auf Austauschbedürftigkeit prüfen</li>
              <li>Gerüst mit anderen Arbeiten koordinieren</li>
            </ChecklistBox>

            <MistakesWarningBox title="Diese Fehler kosten Sie Geld">
              <li><strong>Förderantrag vergessen:</strong> Bis zu 40% Verlust</li>
              <li><strong>Falsche Materialwahl:</strong> Schimmel und Bauschäden</li>
              <li><strong>Wärmebrücken ignorieren:</strong> 25% weniger Effizienz</li>
              <li><strong>Billigster Anbieter:</strong> Pfusch kostet später mehr</li>
              <li><strong>Dämmstärke unterschätzen:</strong> Verschenktes Potenzial</li>
              <li><strong>Lüftung vergessen:</strong> Schimmelgefahr steigt</li>
            </MistakesWarningBox>
          </div>

          <div className="space-y-6">
            {proTips.map((tip, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <tip.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div>{tip.title}</div>
                      <div className="text-xs text-gray-500 font-normal">{tip.category}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700">{tip.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Lightbulb className="mr-3 h-6 w-6 text-blue-600" />
                Smart Home Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Moderne Dämmung wird noch effizienter mit intelligenter Haustechnik. 
                Smarte Thermostate können zusätzlich 10-15% Energie sparen.
              </p>
              <Link 
                to="/smart-home" 
                className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
              >
                Smart Home Lösungen entdecken
                <span className="ml-1">→</span>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-yellow-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <AlertTriangle className="mr-3 h-6 w-6 text-green-600" />
                Rechtliche Hinweise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Bei Eigentumswohnungen ist die Zustimmung der Eigentümergemeinschaft erforderlich. 
                Informieren Sie sich über lokale Bauvorschriften.
              </p>
              <Link 
                to="/kontakt" 
                className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center"
              >
                Kostenlose Beratung anfragen
                <span className="ml-1">→</span>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            🎯 Der wichtigste Tipp: Ganzheitlich denken!
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Die beste Dämmung nutzt nichts, wenn andere Bereiche Energie verschwenden. 
            Betrachten Sie Ihr Haus als Gesamtsystem.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-semibold">1. Dämmung</div>
              <div className="opacity-80">Wärmeverluste stoppen</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-semibold">2. Heizung</div>
              <div className="opacity-80">Effizient erwärmen</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-semibold">3. Lüftung</div>
              <div className="opacity-80">Kontrollierter Austausch</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-semibold">4. Smart Home</div>
              <div className="opacity-80">Intelligente Steuerung</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaemmungTipsSection;
