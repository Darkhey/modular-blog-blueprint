
import { TrendingDown, Shield, Home, Leaf, Euro, Thermometer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DaemmungBenefitsSection = () => {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Drastische Kostensenkung",
      description: "Bis zu 50% weniger Heizkosten durch professionelle Dämmung. Bei einem Einfamilienhaus sind das oft 1.000-2.000€ pro Jahr.",
      highlight: "bis 50%"
    },
    {
      icon: Home,
      title: "Wertsteigerung",
      description: "Eine gute Dämmung steigert den Immobilienwert um 10-15% und verbessert die Energieeffizienzklasse erheblich.",
      highlight: "+15%"
    },
    {
      icon: Thermometer,
      title: "Perfektes Raumklima",
      description: "Gleichmäßige Temperaturen, keine kalten Wände, weniger Zugluft und optimale Luftfeuchtigkeit das ganze Jahr.",
      highlight: "ganzjährig"
    },
    {
      icon: Shield,
      title: "Schutz vor Schäden",
      description: "Vermeidung von Schimmel, Feuchteschäden und Wärmebrücken. Langfristiger Schutz der Bausubstanz.",
      highlight: "dauerhaft"
    },
    {
      icon: Leaf,
      title: "Klimaschutz",
      description: "Reduzierung des CO₂-Ausstoßes um bis zu 70%. Aktiver Beitrag zum Umweltschutz durch weniger Energieverbrauch.",
      highlight: "-70% CO₂"
    },
    {
      icon: Euro,
      title: "Attraktive Förderung",
      description: "Staatliche Zuschüsse bis 40% der Kosten. Mit Energieberater oft noch höhere Förderungen möglich.",
      highlight: "bis 40%"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Warum eine gute Dämmung die beste Investition ist
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Eine professionelle Dämmung zahlt sich mehrfach aus: durch niedrigere Energiekosten, 
            höheren Wohnkomfort und gesteigerten Immobilienwert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in border-0 shadow-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <benefit.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    {benefit.highlight}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              💡 Wussten Sie schon?
            </h3>
            <p className="text-lg text-gray-700">
              Ein ungedämmtes Haus verliert bis zu <strong>70% der Heizwärme</strong> über Dach, Wände und Keller. 
              Mit der richtigen Dämmung können Sie diese Verluste auf unter <strong>20%</strong> reduzieren.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaemmungBenefitsSection;
