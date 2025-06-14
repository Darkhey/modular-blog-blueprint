
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
              
              <div className="space-y-8 text-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Datenschutz auf einen Blick</h2>
                  <h3 className="font-semibold mb-2">Allgemeine Hinweise</h3>
                  <p className="mb-4">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                  </p>
                  <h3 className="font-semibold mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                  <p className="mb-4">
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung sowie dem Impressum dieser Website entnehmen.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Allgemeine Hinweise und Pflichtinformationen</h2>
                  <h3 className="font-semibold mb-2">Datenschutz</h3>
                  <p className="mb-4">Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
                  <h3 className="font-semibold mb-2">Hinweis zur verantwortlichen Stelle</h3>
                  <p className="mb-4">
                    Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
                    Sanieren & Sparen GmbH<br />
                    Glogauer Str. 2<br />
                    10999 Berlin<br />
                    E-Mail: kontakt@sanieren-sparen.de
                  </p>
                  <p className="mb-4">Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
                  <h3 className="font-semibold mb-2">Ihre Rechte als Betroffener</h3>
                  <p className="mb-4">Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Datenerfassung auf dieser Website</h2>
                  <h3 className="font-semibold mb-2">Cookies</h3>
                  <p className="mb-4">Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.</p>
                  <h3 className="font-semibold mb-2">Server-Log-Dateien</h3>
                  <p className="mb-4">Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
                </div>
                
                <AdSlot position="article" className="w-full my-8" />
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Analyse-Tools und Werbung</h2>
                  <h3 className="font-semibold mb-2">Google Analytics</h3>
                  <p className="mb-4">Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher zu analysieren.</p>
                  <h3 className="font-semibold mb-2">Google AdSense</h3>
                  <p className="mb-4">Diese Website benutzt Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Newsletter</h2>
                  <p className="mb-4">Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse. Weitere Daten werden nicht bzw. nur auf freiwilliger Basis erhoben. Diese Daten verwenden wir ausschließlich für den Versand der angeforderten Informationen und geben diese nicht an Dritte weiter. Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen.</p>
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
