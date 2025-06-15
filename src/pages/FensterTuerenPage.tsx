
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site.config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FensterTuerenPage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'fenster');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{topic?.name || 'Fenster & Türen'}</h1>
          <p className="text-lg text-gray-600 mb-8">{topic?.description || 'Energieeffiziente Fenster und Türen für optimale Dämmung'}</p>
          {/* NEU: Lesetipp zum Türen-Artikel */}
          <div className="mb-8 bg-blue-50 p-4 rounded-lg border">
            <p className="mb-1 font-semibold text-blue-800">Lesetipp: Neue Übersicht</p>
            <Link 
              to="/blog/moderne-tueren-vergleich" 
              className="inline-flex items-center text-blue-700 hover:underline" 
            >
              Moderne Türen: Sicherheit, Energieeffizienz & Design →
            </Link>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Worauf Sie achten sollten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">U-Wert (Wärmedurchgangskoeffizient)</h3>
                <p>Je niedriger der U-Wert, desto besser die Dämmung. Moderne Fenster haben oft einen U-Wert von unter 0,9 W/(m²K).</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Verglasung</h3>
                <p>Eine 3-fach-Verglasung ist heute Standard und deutlich effizienter als eine 2-fach-Verglasung.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Materialien</h3>
                <p>Kunststofffenster sind preiswert und pflegeleicht. Holzfenster bieten eine tolle Optik und gute Dämmeigenschaften. Aluminium ist sehr langlebig.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default FensterTuerenPage;
