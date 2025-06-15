
import AdSlot from '@/components/ui/AdSlot';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
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
                    Glogauer Str. 2<br />
                    10999 Berlin<br />
                    Deutschland
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Vertreten durch</h2>
                  <p>
                    Michael Benz
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Kontakt</h2>
                  <p>
                    E-Mail: kontakt@sanieren-sparen.de
                  </p>
                </div>

                <AdSlot position="article" className="w-full my-8" />

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Registereintrag</h2>
                  <p>
                    Eintragung im Handelsregister<br />
                    Registergericht: Amtsgericht Charlottenburg<br />
                    Registernummer: HRB 254238 B
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Umsatzsteuer-ID</h2>
                  <p>
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                    DE364339182
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Redaktionell verantwortlich</h2>
                  <p>
                    Michael Benz<br />
                    Glogauer Str. 2<br />
                    10999 Berlin
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">EU-Streitschlichtung</h2>
                  <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ec.europa.eu/consumers/odr/</a>.<br />
                    Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
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

    </div>
  );
};

export default Impressum;
