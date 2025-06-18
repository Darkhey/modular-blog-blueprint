
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import AdSlot from '@/components/ui/AdSlot';
import { siteConfig } from '@/config/site.config';

const Kontakt = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header Banner Ad */}
        <div className="mb-8">
          <AdSlot position="banner" className="w-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Kontakt
              </h1>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="text-green-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900">E-Mail</h3>
                    <p className="text-gray-600">kontakt@sanieren-sparen.de</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Wir antworten innerhalb von 24 Stunden
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-green-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Telefon</h3>
                    <p className="text-gray-600">+49 (0) 123 456 789</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Mo-Fr: 9:00-17:00 Uhr
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="text-green-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-600">
                      Sanieren & Sparen GmbH<br />
                      Musterstraße 123<br />
                      12345 Musterstadt
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="text-green-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900">Öffnungszeiten</h3>
                    <div className="text-gray-600">
                      <p>Montag - Freitag: 9:00 - 17:00 Uhr</p>
                      <p>Samstag: 10:00 - 14:00 Uhr</p>
                      <p>Sonntag: Geschlossen</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Ad */}
              <div className="mt-8">
                <AdSlot position="article" className="w-full" />
              </div>

              <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">
                  Kostenlose Erstberatung
                </h3>
                <p className="text-green-700 text-sm">
                  Gerne beraten wir Sie kostenlos zu Ihrem Sanierungsvorhaben und 
                  den passenden Fördermitteln. Vereinbaren Sie einen Termin!
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar with Ads */}
          <div className="space-y-6">
            <AdSlot position="sidebar" className="w-full" />
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4">Schnellkontakt</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-Mail
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nachricht
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Nachricht senden
                </button>
              </form>
            </div>

            <AdSlot position="sidebar" className="w-full" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Kontakt;
