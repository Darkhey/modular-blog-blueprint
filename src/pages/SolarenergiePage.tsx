
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SolarenergiePage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'solar');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{topic?.name || 'Solarenergie'}</h1>
          <p className="text-lg text-gray-600 mb-8">{topic?.description || 'Photovoltaik und Solarthermie für kostenlose Energie'}</p>

          <Card>
            <CardHeader>
              <CardTitle>Zwei Wege, die Sonne zu nutzen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Photovoltaik (PV)</h3>
                <p>Wandelt Sonnenlicht direkt in elektrischen Strom um. Ideal zur Deckung des eigenen Strombedarfs und zur Einspeisung ins Netz.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Solarthermie</h3>
                <p>Nutzt die Wärme der Sonne, um Wasser für den Haushalt oder zur Heizungsunterstützung zu erwärmen.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Wirtschaftlichkeit</h3>
                <p>Durch gesunkene Preise für Module und staatliche Förderungen amortisieren sich Solaranlagen oft schon nach 10-15 Jahren.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SolarenergiePage;
