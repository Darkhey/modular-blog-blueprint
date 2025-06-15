
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Link as LinkIcon, PlugZap, Thermometer, Lightbulb } from 'lucide-react';

const affiliateProducts = [
  {
    id: 'fritz-dect-200',
    name: 'AVM FRITZ!DECT 200',
    description: 'Intelligente Steckdose zur Messung des Energieverbrauchs und automatischen Schaltung von Geräten. Ideal, um Stromfresser zu identifizieren und den Verbrauch zu senken.',
    link: 'https://www.amazon.de/s?k=avm+fritz+dect+200+steckdose&crid=17F5H1R20SQ07&sprefix=AVM+FRITZ%21DECT+200%2Caps%2C168&linkCode=ll2&tag=klexgetier0d-21&linkId=f0079ba805ce86d6023dbe3d6d82f142&language=de_DE&ref_=as_li_ss_tl',
    icon: PlugZap,
  },
  {
    id: 'tado-thermostat',
    name: 'tado° Smartes Heizkörper-Thermostat',
    description: 'Passt die Heizung an Ihren Tagesablauf und die Wettervorhersage an. Spart bis zu 20% Heizkosten durch intelligente, standortbasierte Steuerung.',
    link: 'https://www.amazon.de/s?k=tado%C2%B0+Smartes+Heizk%C3%B6rper-Thermostat&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1ETRR2MXTNK3G&sprefix=tado+smartes+heizk%C3%B6rper-thermostat%2Caps%2C117&linkCode=ll2&tag=klexgetier0d-21&linkId=cfb57e789fdd9c49c4a0db963ca80d7a&language=de_DE&ref_=as_li_ss_tl',
    icon: Thermometer,
  },
  {
    id: 'philips-hue',
    name: 'Philips Hue White Ambiance Starter-Set',
    description: 'Energieeffiziente LED-Lampen mit Dimmfunktion und Zeitplänen. Schalten Sie das Licht automatisch aus, wenn niemand im Raum ist, und sparen Sie Strom.',
    link: 'https://www.amazon.de/s?k=Philips+Hue+White+Ambiance+Starter-Set&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1F0SOB674F7O5&sprefix=philips+hue+white+ambiance+starter-set%2Caps%2C123&linkCode=ll2&tag=klexgetier0d-21&linkId=a3bde6ceabe622a3c7a849c3d88a4691&language=de_DE&ref_=as_li_ss_tl',
    icon: Lightbulb,
  },
];

const smartHomeCategories = [
  {
    id: 'heizung',
    title: 'Smarte Heizungssteuerung',
    description: 'Intelligente Thermostate passen die Raumtemperatur automatisch an Ihren Tagesablauf und die Wettervorhersage an. So heizen Sie nur, wenn es wirklich nötig ist, und können Ihre Heizkosten um bis zu 20% senken. Die Steuerung erfolgt bequem per App – auch von unterwegs.',
    productId: 'tado-thermostat',
    icon: Thermometer,
  },
  {
    id: 'beleuchtung',
    title: 'Intelligente Beleuchtung',
    description: 'Ersetzen Sie herkömmliche Glühbirnen durch smarte LED-Lampen. Mit Zeitplänen und Anwesenheitserkennung schaltet sich das Licht automatisch aus, wenn niemand zu Hause ist. Dimmfunktionen und anpassbare Lichtfarben schaffen Atmosphäre und sparen zusätzlich Strom.',
    productId: 'philips-hue',
    icon: Lightbulb,
  },
  {
    id: 'energiemanagement',
    title: 'Energiemanagement & Steckdosen',
    description: 'Identifizieren Sie "Stromfresser" im Haushalt. Smarte Steckdosen messen den Energieverbrauch angeschlossener Geräte und ermöglichen es Ihnen, diese per App oder Zeitplan komplett vom Netz zu trennen. Ideal, um den Standby-Verbrauch zu eliminieren.',
    productId: 'fritz-dect-200',
    icon: PlugZap,
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

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Direkt zu den Smart Home Bereichen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {smartHomeCategories.map((category) => (
                  <a key={category.id} href={`#${category.id}`} className="block p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group">
                    <category.icon className="w-8 h-8 mb-2 text-green-600 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-16">
            {smartHomeCategories.map((category) => {
              const product = affiliateProducts.find(p => p.id === category.productId);
              return (
                <section key={category.id} id={category.id} className="scroll-mt-20 border-t pt-8">
                  <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                  <p className="text-gray-600 mb-8">{category.description}</p>
                  
                  {product && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Produktempfehlung:</h3>
                      <Card className="flex flex-col hover:shadow-lg transition-shadow">
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
                    </div>
                  )}
                </section>
              )
            })}
          </div>

          <p className="text-xs text-gray-500 mt-12 text-center">
            *Wenn Sie über diese Links einkaufen, erhalten wir eine kleine Provision. Für Sie entstehen keine zusätzlichen Kosten. Dies hilft uns, die Seite zu betreiben.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartHomePage;
