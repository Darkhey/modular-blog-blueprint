
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdSlot from '@/components/ui/AdSlot';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <AdSlot position="banner" className="w-full mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>
              
              <div className="space-y-6 text-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Angaben gemäß § 5 TMG</h2>
                  <p>
                    Sanieren & Sparen GmbH<br />
                    Musterstraße 123<br />
                    12345 Musterstadt<br />
                    Deutschland
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Kontakt</h2>
                  <p>
                    Telefon: +49 (0) 123 456 789<br />
                    E-Mail: kontakt@sanieren-sparen.de
                  </p>
                </div>

                <AdSlot position="article" className="w-full my-8" />

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Registereintrag</h2>
                  <p>
                    Eintragung im Handelsregister<br />
                    Registergericht: Amtsgericht Musterstadt<br />
                    Registernummer: HRB 12345
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Umsatzsteuer-ID</h2>
                  <p>
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                    DE123456789
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Verantwortlich für den Inhalt</h2>
                  <p>
                    Max Mustermann<br />
                    Musterstraße 123<br />
                    12345 Musterstadt
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

export default Impressum;
