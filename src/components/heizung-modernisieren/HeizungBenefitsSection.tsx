
import { Euro, TreePine, Shield, TrendingUp, Smartphone, Monitor } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

const HeizungBenefitsSection = () => {
  return (
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
  );
};

export default HeizungBenefitsSection;
