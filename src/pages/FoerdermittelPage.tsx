
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const FoerdermittelPage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'foerderung');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{topic?.name || 'Fördermittel'}</h1>
          <p className="text-lg text-gray-600 mb-8">{topic?.description || 'Staatliche Zuschüsse und Finanzierungshilfen optimal nutzen'}</p>
          
          {/* Neue Links zu den Ratgeber-Artikeln */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Unsere Ratgeber für Fördermittel</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <Link to="/blog/bafa-foerderung-2025-leitfaden" className="block hover:no-underline group">
                <div className="p-4 border rounded-lg bg-white shadow-sm h-full flex flex-col">
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">BAFA 2025</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">BAFA-Förderung 2025: Ihr kompletter Leitfaden</h3>
                  <p className="text-gray-600 text-sm mb-2">Alles zu Zuschüssen für Einzelmaßnahmen an Heizung, Dämmung & Co. So beantragen Sie den BAFA-Zuschuss erfolgreich.</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zum BAFA-Leitfaden</span>
                </div>
              </Link>
              <Link to="/blog/kfw-foerderung-2025-kredite-zuschuesse" className="block hover:no-underline group">
                <div className="p-4 border rounded-lg bg-white shadow-sm h-full flex flex-col">
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">KfW 2025</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">KfW-Förderung 2025: Kredite & Zuschüsse</h3>
                  <p className="text-gray-600 text-sm mb-2">Günstige Kredite und Tilgungszuschüsse für Komplettsanierungen, Heizungstausch und mehr – so nutzen Sie die KfW optimal.</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zum KfW-Leitfaden</span>
                </div>
              </Link>
              <Link to="/blog/regionale-foerderprogramme-2025-zuschuesse" className="block hover:no-underline group">
                <div className="p-4 border rounded-lg bg-white shadow-sm h-full flex flex-col">
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">REGIONAL 2025</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">Regionale Förderprogramme 2025: Zuschüsse & Boni</h3>
                  <p className="text-gray-600 text-sm mb-2">Wie Sie Landes- und Kommunalförderungen mit BAFA und KfW kombinieren, um das Beste für Ihre Sanierung herauszuholen.</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zu den Regional-Förderungen</span>
                </div>
              </Link>
            </CardContent>
          </Card>

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
