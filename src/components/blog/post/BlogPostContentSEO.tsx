
import { BlogPost } from '@/hooks/useBlogPosts';

interface BlogPostContentSEOProps {
  post: BlogPost;
}

const BlogPostContentSEO = ({ post }: BlogPostContentSEOProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      <section id="einfuehrung" className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Warum Dämmung die beste Investition in Ihr Haus ist
        </h2>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 border border-green-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Heizkosten machen einen Großteil der laufenden Kosten eines Hauses aus. Eine professionelle 
            <strong className="text-green-700"> Dämmung reduziert den Wärmeverlust um bis zu 70%</strong> und 
            steigert nicht nur den Wert Ihrer Immobilie, sondern auch den Wohnkomfort erheblich.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Im Sommer schützt sie zudem vor Überhitzung und sorgt für ein angenehmes Raumklima das ganze Jahr über.
          </p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
            💡 Wussten Sie schon?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Ein ungedämmtes Haus verliert bis zu <strong className="text-red-600">70% der Heizwärme</strong> über 
            Dach, Wände und Keller. Mit der richtigen Dämmung können Sie diese Verluste auf unter 
            <strong className="text-green-600"> 20%</strong> reduzieren.
          </p>
        </div>
      </section>

      <section id="dachbodendaemmung" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Dachbodendämmung: Wärme bleibt im Haus
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🏠 Oberste Geschossdecke</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Einfachste und rentabelste Maßnahme</li>
              <li>✅ Schnelle Umsetzung möglich</li>
              <li>✅ Geringste Kosten pro m²</li>
              <li className="text-green-600 font-medium">💰 Kosten: 25-40 €/m²</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🔧 Zwischensparrendämmung</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Für ausgebaute Dachböden</li>
              <li>✅ Gute Dämmwirkung</li>
              <li>⚠️ Aufwendigere Montage</li>
              <li className="text-green-600 font-medium">💰 Kosten: 40-80 €/m²</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
          <h4 className="font-semibold mb-3 text-blue-900">📋 Empfohlene Materialien</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <span className="font-medium text-blue-800">Mineralwolle</span>
              <p className="text-sm text-blue-700">Günstig, bewährt</p>
            </div>
            <div className="text-center">
              <span className="font-medium text-blue-800">Holzfaser</span>
              <p className="text-sm text-blue-700">Ökologisch, atmungsaktiv</p>
            </div>
            <div className="text-center">
              <span className="font-medium text-blue-800">Zellulose</span>
              <p className="text-sm text-blue-700">Recycelt, einblasfähig</p>
            </div>
          </div>
        </div>
      </section>

      <section id="fassadendaemmung" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Fassadendämmung: Die schützende Hülle
        </h2>
        
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 mb-6 border border-orange-200">
          <p className="text-lg text-gray-700 leading-relaxed">
            Eine <strong>Außendämmung (WDVS)</strong> ist die effektivste, aber auch teuerste Methode. 
            Sie eliminiert Wärmebrücken komplett und bietet den besten Schutz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🏢 WDVS (Außendämmung)</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✅ Beste Dämmwirkung</li>
              <li>✅ Keine Wärmebrücken</li>
              <li>✅ Schutz der Bausubstanz</li>
              <li>❌ Hohe Investition</li>
              <li className="text-green-600 font-medium">💰 100-250 €/m²</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🔄 Einblasdämmung</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✅ Für zweischaliges Mauerwerk</li>
              <li>✅ Kostengünstig</li>
              <li>✅ Schnelle Umsetzung</li>
              <li>⚠️ Nicht überall möglich</li>
              <li className="text-green-600 font-medium">💰 25-50 €/m²</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🏠 Innendämmung</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✅ Bei Denkmalschutz</li>
              <li>✅ Geringere Kosten</li>
              <li>❌ Wohnraumverlust</li>
              <li>❌ Wärmebrücken möglich</li>
              <li className="text-green-600 font-medium">💰 60-120 €/m²</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="kellerdaemmung" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Kellerdämmung: Kalte Füße ade
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-4">
              <h4 className="font-semibold mb-3 text-lg text-gray-900">⬇️ Kellerdeckendämmung</h4>
              <p className="text-gray-700 mb-3">
                Die Dämmung der Kellerdecke verhindert kalte Böden im Erdgeschoss und ist 
                relativ einfach umzusetzen.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✅ Einfache Montage von unten</li>
                <li>✅ Schnelle Wirkung spürbar</li>
                <li>✅ Gutes Preis-Leistungs-Verhältnis</li>
                <li className="text-green-600 font-medium">💰 Kosten: 20-40 €/m²</li>
              </ul>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-4">
              <h4 className="font-semibold mb-3 text-lg text-gray-900">🧱 Kellerwände</h4>
              <p className="text-gray-700 mb-3">
                Bei bewohnten Kellern oder als Perimeterdämmung von außen für 
                optimalen Schutz vor Feuchtigkeit.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✅ Schutz vor Feuchtigkeit</li>
                <li>✅ Nutzbare Kellerräume</li>
                <li>❌ Aufwendiger bei Sanierung</li>
                <li className="text-green-600 font-medium">💰 Kosten: 80-150 €/m²</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h4 className="font-semibold mb-3 text-gray-900">🔧 Empfohlene Materialien für Kellerdämmung</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <span className="font-medium text-gray-800">EPS-Platten</span>
              <p className="text-sm text-gray-600">Günstig, feuchtigkeitsresistent</p>
            </div>
            <div className="text-center">
              <span className="font-medium text-gray-800">XPS-Platten</span>
              <p className="text-sm text-gray-600">Druckfest, für Perimeter</p>
            </div>
            <div className="text-center">
              <span className="font-medium text-gray-800">Mineralwolle</span>
              <p className="text-sm text-gray-600">Nicht brennbar, dampfdiffusionsoffen</p>
            </div>
          </div>
        </div>
      </section>

      <section id="fazit" className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Fazit: Ihr Weg zur optimalen Dämmung
        </h2>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 border border-green-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Eine <strong className="text-green-700">professionelle Dämmung</strong> ist eine der besten 
            Investitionen in Ihr Zuhause. Sie senkt nicht nur die Heizkosten erheblich, sondern steigert 
            auch den Wohnkomfort und den Wert Ihrer Immobilie.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-900">🎯 Prioritäten setzen:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Dachboden/oberste Geschossdecke</li>
                <li>Kellerdecke</li>
                <li>Fassade</li>
                <li>Fenster und Türen</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-blue-900">💡 Wichtige Tipps:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Energieberatung vor Beginn</li>
                <li>• Förderungen beantragen</li>
                <li>• Qualifizierte Handwerker wählen</li>
                <li>• Materialqualität beachten</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostContentSEO;
