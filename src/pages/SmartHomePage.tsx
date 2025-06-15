
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Link as LinkIcon, PlugZap, Thermometer, Lightbulb } from 'lucide-react';

const affiliateProducts = [
  {
    name: 'AVM FRITZ!DECT 200',
    description: 'Intelligente Steckdose zur Messung des Energieverbrauchs und automatischen Schaltung von Geräten. Ideal, um Stromfresser zu identifizieren und den Verbrauch zu senken.',
    link: 'https://amzn.to/4l6nyQK',
    icon: PlugZap,
  },
  {
    name: 'tado° Smartes Heizkörper-Thermostat',
    description: 'Passt die Heizung an Ihren Tagesablauf und die Wettervorhersage an. Spart bis zu 20% Heizkosten durch intelligente, standortbasierte Steuerung.',
    link: 'https://www.amazon.de/dp/B0B9X124H6',
    icon: Thermometer,
  },
  {
    name: 'Philips Hue White Ambiance Starter-Set',
    description: 'Energieeffiziente LED-Lampen mit Dimmfunktion und Zeitplänen. Schalten Sie das Licht automatisch aus, wenn niemand im Raum ist, und sparen Sie Strom.',
    link: 'https://www.amazon.de/dp/B0B9X124H6',
    icon: Lightbulb,
  },
];

const SmartHomePage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'smart-home');
  const { trackOutboundLink } = useAnalytics();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{topic?.name || 'Smart Home'}</h1>
          <p className="text-lg text-gray-600 mb-8">{topic?.description || 'Intelligente Haustechnik für automatisches Energiesparen'}</p>

          <Card>
            <CardHeader>
              <CardTitle>Intelligent Energie sparen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Smarte Heizungssteuerung</h3>
                <p>Thermostate, die sich per App steuern lassen und sich an Ihren Tagesablauf anpassen, können bis zu 15% Heizkosten sparen.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Intelligente Beleuchtung</h3>
                <p>LED-Lampen, die sich automatisch abschalten oder dimmen, wenn niemand im Raum ist, senken den Stromverbrauch.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Energiemanagement</h3>
                <p>Systeme, die den Stromverbrauch von Geräten messen und optimieren, z.B. indem sie die Waschmaschine starten, wenn die PV-Anlage Strom produziert.</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-4 text-center">Empfohlene Produkte zum Energiesparen</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Die richtigen Smart-Home-Geräte können Ihnen helfen, gezielt Energie zu sparen und Ihren Komfort zu erhöhen. Hier sind einige von uns empfohlene Produkte, die sich in der Praxis bewährt haben.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {affiliateProducts.map((product) => (
                <Card key={product.name} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                     <div className="bg-gray-100 rounded-lg flex items-center justify-center h-40 mb-4">
                      <product.icon className="w-16 h-16 text-gray-400" />
                    </div>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </CardContent>
                  <CardFooter>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="w-full"
                      onClick={() => trackOutboundLink(product.link, product.name)}
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Bei Amazon ansehen*
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-6 text-center">
              *Wenn Sie über diese Links einkaufen, erhalten wir eine kleine Provision. Für Sie entstehen keine zusätzlichen Kosten. Dies hilft uns, die Seite zu betreiben. Sie können die Links für die Produkte oben im Code anpassen.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartHomePage;
