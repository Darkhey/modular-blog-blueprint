
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FoerdermittelPage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'foerderung');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{topic?.name || 'Fördermittel'}</h1>
          <p className="text-lg text-gray-600 mb-8">{topic?.description || 'Staatliche Zuschüsse und Finanzierungshilfen optimal nutzen'}</p>
          
          <Card>
            <CardHeader>
              <CardTitle>Wichtige Förderprogramme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">BAFA - Bundesförderung für effiziente Gebäude (BEG)</h3>
                <p>Zuschüsse für Einzelmaßnahmen wie Heizungstausch oder Dämmung. Bis zu 70% der Kosten können übernommen werden.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">KfW - Kreditanstalt für Wiederaufbau</h3>
                <p>Günstige Kredite und Tilgungszuschüsse für Komplettsanierungen zum Effizienzhaus oder den Kauf von energieeffizienten Neubauten.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Regionale Programme</h3>
                <p>Zusätzlich gibt es oft Förderungen von Bundesländern und Kommunen. Eine Recherche lohnt sich!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FoerdermittelPage;
