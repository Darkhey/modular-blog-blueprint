
import { BlogPost } from '@/hooks/useBlogPosts';

interface FensterTuerenContentSEOProps {
  post: BlogPost;
}

const FensterTuerenContentSEO = ({ post }: FensterTuerenContentSEOProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      <section id="einfuehrung" className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Neue Fenster und Türen: Ihre Investition in Komfort und Effizienz
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6 border border-blue-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Alte Fenster und Türen sind oft die größten Schwachstellen der Gebäudehülle. Moderne Elemente können 
            <strong className="text-blue-700"> bis zu 40% der Wärmeverluste reduzieren</strong> und verbessern 
            gleichzeitig Sicherheit, Schallschutz und Wohnkomfort erheblich.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Mit der richtigen Auswahl amortisieren sich neue Fenster und Türen bereits nach 10-15 Jahren durch 
            eingesparte Heizkosten und steigern den Immobilienwert nachhaltig.
          </p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
            🏠 Wussten Sie schon?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Ein durchschnittliches Einfamilienhaus verliert über <strong className="text-red-600">25% der Heizwärme</strong> 
            über veraltete Fenster und Türen. Moderne 3-fach-Verglasung reduziert diese Verluste um bis zu 
            <strong className="text-green-600"> 80%</strong>.
          </p>
        </div>
      </section>

      <section id="fensterarten" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Fensterarten: Für jeden Bedarf die richtige Lösung
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🪟 Kunststofffenster</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Beste Preis-Leistung</li>
              <li>✅ Wartungsarm und langlebig</li>
              <li>✅ Sehr gute Dämmwerte</li>
              <li>✅ Vielfältige Designs</li>
              <li className="text-green-600 font-medium">💰 Kosten: 300-800 €/m²</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🌲 Holzfenster</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Natürliche Optik</li>
              <li>✅ Sehr gute Dämmung</li>
              <li>✅ Nachhaltig und ökologisch</li>
              <li>⚠️ Höherer Pflegeaufwand</li>
              <li className="text-green-600 font-medium">💰 Kosten: 400-1.200 €/m²</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🔩 Aluminiumfenster</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Extrem langlebig</li>
              <li>✅ Schlanke Profile</li>
              <li>✅ Wartungsfrei</li>
              <li>❌ Höhere Kosten</li>
              <li className="text-green-600 font-medium">💰 Kosten: 600-1.500 €/m²</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🔗 Holz-Aluminium</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Beste beider Welten</li>
              <li>✅ Innen Holz, außen Alu</li>
              <li>✅ Wetterbeständig</li>
              <li>❌ Höchste Investition</li>
              <li className="text-green-600 font-medium">💰 Kosten: 800-2.000 €/m²</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
          <h4 className="font-semibold mb-3 text-blue-900">🔍 Verglasungsarten im Vergleich</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <span className="font-medium text-blue-800">2-fach-Verglasung</span>
              <p className="text-sm text-blue-700">U-Wert: 1,1-1,3 W/(m²K)</p>
              <p className="text-xs text-blue-600">Standard für Sanierung</p>
            </div>
            <div className="text-center">
              <span className="font-medium text-blue-800">3-fach-Verglasung</span>
              <p className="text-sm text-blue-700">U-Wert: 0,5-0,8 W/(m²K)</p>
              <p className="text-xs text-blue-600">Empfohlen für Neubau</p>
            </div>
            <div className="text-center">
              <span className="font-medium text-blue-800">Passivhaus-Glas</span>
              <p className="text-sm text-blue-700">U-Wert: ≤ 0,8 W/(m²K)</p>
              <p className="text-xs text-blue-600">Höchste Effizienz</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tuerarten" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Türen: Sicherheit und Energieeffizienz vereint
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-4">
              <h4 className="font-semibold mb-3 text-lg text-gray-900">🚪 Haustüren</h4>
              <p className="text-gray-700 mb-3">
                Die Haustür ist das Aushängeschild Ihres Hauses und entscheidet über ersten Eindruck, 
                Sicherheit und Energieverluste.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✅ Einbruchschutz RC2/RC3</li>
                <li>✅ U-Wert bis 0,8 W/(m²K)</li>
                <li>✅ Individuelle Gestaltung</li>
                <li className="text-green-600 font-medium">💰 Kosten: 1.500-5.000 €</li>
              </ul>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-4">
              <h4 className="font-semibold mb-3 text-lg text-gray-900">🏠 Innentüren</h4>
              <p className="text-gray-700 mb-3">
                Moderne Innentüren verbessern Schallschutz, Raumklima und die 
                Wohnqualität erheblich.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✅ Schallschutz bis 42 dB</li>
                <li>✅ Brandschutz möglich</li>
                <li>✅ Barrierefrei erhältlich</li>
                <li className="text-green-600 font-medium">💰 Kosten: 200-800 € pro Tür</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 mb-6 border border-orange-200">
          <h4 className="font-semibold mb-3 text-orange-900">🔒 Sicherheitsklassen bei Haustüren</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <span className="font-medium text-orange-800">RC1 N</span>
              <p className="text-sm text-orange-700 mt-1">Grundschutz gegen Vandalismus</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <span className="font-medium text-orange-800">RC2</span>
              <p className="text-sm text-orange-700 mt-1">Standard-Einbruchschutz (empfohlen)</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <span className="font-medium text-orange-800">RC3</span>
              <p className="text-sm text-orange-700 mt-1">Erhöhter Schutz für Risikogebiete</p>
            </div>
          </div>
        </div>
      </section>

      <section id="installation" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Fachgerechte Installation: Der Schlüssel zum Erfolg
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">⚙️ RAL-Montage</h4>
            <p className="text-gray-700 mb-3">
              Die RAL-Montage garantiert optimale Dichtigkeit und Langlebigkeit.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Innen: Dampfsperre</li>
              <li>• Mitte: Dämmung</li>
              <li>• Außen: Windschutz</li>
              <li>• Fachgerechte Abdichtung</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🔧 Austauschmethoden</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✅ <strong>Komplettaustausch:</strong> Beste Lösung</li>
              <li>⚠️ <strong>Flügeltausch:</strong> Kostengünstiger</li>
              <li>❌ <strong>Scheibentausch:</strong> Nur Notlösung</li>
              <li>💡 <strong>Teilsanierung:</strong> Bei gutem Rahmen</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-900">⚠️ Häufige Montagefehler vermeiden</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-yellow-800 mb-2">Fehler bei der Abdichtung:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Unvollständige Dampfsperre</li>
                <li>• Fehlende Windschutzfolie</li>
                <li>• Undichte Anschlüsse</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-yellow-800 mb-2">Folgen unsachgemäßer Montage:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Zugluft und Kälteverluste</li>
                <li>• Kondensatbildung</li>
                <li>• Schimmelrisiko</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="kosten" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Kosten und Wirtschaftlichkeit im Überblick
        </h2>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 border border-green-200">
          <h4 className="font-semibold mb-4 text-green-900">💰 Beispielkalkulation Einfamilienhaus</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h5 className="font-medium text-green-800 mb-2">Fensteraustausch (120m²)</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Material: 15.000-25.000 €</li>
                <li>• Montage: 3.000-5.000 €</li>
                <li>• Entsorgung: 500-1.000 €</li>
                <li className="font-medium pt-2 border-t border-green-300">Gesamt: 18.500-31.000 €</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h5 className="font-medium text-green-800 mb-2">Türenaustausch</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Haustür: 2.000-5.000 €</li>
                <li>• 6 Innentüren: 1.800-4.800 €</li>
                <li>• Montage: 800-1.500 €</li>
                <li className="font-medium pt-2 border-t border-green-300">Gesamt: 4.600-11.300 €</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">📈 Jährliche Einsparungen</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Heizkosten: 300-800 € pro Jahr</li>
              <li>• Wartungskosten: 100-300 € pro Jahr</li>
              <li>• Versicherung: bis 10% Rabatt</li>
              <li className="text-green-600 font-medium">💡 Amortisation: 12-20 Jahre</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🏠 Wertsteigerung</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Immobilienwert: +3-8%</li>
              <li>• Energieeffizienzklasse verbessern</li>
              <li>• Attraktivität beim Verkauf</li>
              <li className="text-green-600 font-medium">📊 ROI: 110-150%</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="foerderung" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Förderungen: Bis zu 20% staatliche Unterstützung
        </h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6 border border-purple-200">
          <h4 className="font-semibold mb-4 text-purple-900">🎯 Aktuelle Förderprogramme 2025</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h5 className="font-medium text-purple-800 mb-2">KfW-Förderung</h5>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Bis 20% Zuschuss</li>
                <li>• Kredit bis 150.000 €</li>
                <li>• Tilgungszuschuss möglich</li>
                <li>• Energieberater erforderlich</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h5 className="font-medium text-purple-800 mb-2">Regionale Programme</h5>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Länder-Förderungen</li>
                <li>• Kommunale Zuschüsse</li>
                <li>• Stadtwerke-Programme</li>
                <li>• Kombinierbar mit KfW</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h4 className="font-semibold mb-3 text-gray-900">📋 Fördervoraussetzungen</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="font-medium text-gray-800 mb-2">Technische Anforderungen:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• U-Wert ≤ 0,95 W/(m²K)</li>
                <li>• Fachgerechte Montage</li>
                <li>• CE-Kennzeichnung</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-800 mb-2">Antragsverfahren:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Antrag vor Maßnahmenbeginn</li>
                <li>• Energieberater beauftragen</li>
                <li>• Verwendungsnachweis</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-800 mb-2">Steuervorteile:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 20% über 3 Jahre absetzbar</li>
                <li>• Max. 40.000 € pro Objekt</li>
                <li>• Alternative zur KfW-Förderung</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="fazit" className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Fazit: Ihre Investition in die Zukunft
        </h2>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 border border-green-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Neue <strong className="text-green-700">Fenster und Türen</strong> sind eine der effektivsten 
            Sanierungsmaßnahmen. Sie senken nicht nur die Energiekosten erheblich, sondern verbessern 
            auch Sicherheit, Komfort und den Wert Ihrer Immobilie nachhaltig.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-900">✅ Ihre Vorteile auf einen Blick:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Bis 40% weniger Heizkosten</li>
                <li>• Deutlich besserer Wohnkomfort</li>
                <li>• Erhöhte Sicherheit</li>
                <li>• Wertsteigerung der Immobilie</li>
                <li>• Bis zu 20% staatliche Förderung</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-blue-900">🎯 Nächste Schritte:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Energieberatung beauftragen</li>
                <li>Angebote von Fachbetrieben einholen</li>
                <li>Förderanträge stellen</li>
                <li>Termine für Austausch planen</li>
                <li>Fachgerechte RAL-Montage sicherstellen</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FensterTuerenContentSEO;
