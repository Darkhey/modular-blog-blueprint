
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SmartHomePage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'smart-home');

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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartHomePage;
