
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdSlot from '@/components/ui/AdSlot';

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <AdSlot position="banner" className="w-full mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
              
              <div className="space-y-6 text-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Datenschutz auf einen Blick</h2>
                  <h3 className="font-semibold mb-2">Allgemeine Hinweise</h3>
                  <p className="mb-4">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                    personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Google Analytics</h2>
                  <p className="mb-4">
                    Diese Website nutzt Google Analytics zur Analyse des Nutzerverhaltens. 
                    Google Analytics verwendet Cookies, die eine Analyse der Benutzung der 
                    Website durch Sie ermöglichen.
                  </p>
                </div>

                <AdSlot position="article" className="w-full my-8" />

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Google AdSense</h2>
                  <p className="mb-4">
                    Diese Website verwendet Google AdSense zur Anzeige von Werbung. 
                    AdSense verwendet Cookies, um für die Nutzer relevante Anzeigen zu schalten.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Ihre Rechte</h2>
                  <p className="mb-4">
                    Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, 
                    Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Kontakt</h2>
                  <p>
                    Bei Fragen zum Datenschutz wenden Sie sich bitte an:<br />
                    E-Mail: datenschutz@sanieren-sparen.de
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <AdSlot position="sidebar" className="w-full" />
            <AdSlot position="sidebar" className="w-full" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Datenschutz;
