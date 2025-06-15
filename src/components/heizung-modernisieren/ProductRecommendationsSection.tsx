
import { Star, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

const ProductRecommendationsSection = () => {
  return (
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
  );
};

export default ProductRecommendationsSection;
