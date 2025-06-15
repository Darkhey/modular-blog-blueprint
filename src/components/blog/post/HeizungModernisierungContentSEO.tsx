
import { BlogPost } from '@/hooks/useBlogPosts';

interface HeizungModernisierungContentSEOProps {
  post: BlogPost;
}

const HeizungModernisierungContentSEO = ({ post }: HeizungModernisierungContentSEOProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      <section id="einfuehrung" className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Heizungsmodernisierung 2025: Der Weg zur effizienten Zukunft
        </h2>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 mb-6 border border-orange-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Eine moderne Heizungsanlage ist das Herzstück eines effizienten Hauses. Mit einer 
            <strong className="text-orange-700"> modernen Wärmepumpe oder Brennwertheizung</strong> können Sie 
            bis zu 40% der Heizkosten einsparen und gleichzeitig Ihren CO₂-Ausstoß um bis zu 70% reduzieren.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Dank staatlicher Förderung von bis zu 70% ist jetzt der perfekte Zeitpunkt für den Umstieg 
            auf eine zukunftssichere Heizungstechnologie.
          </p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
            🔥 Wichtiger Hinweis für 2025
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Das neue Gebäudeenergiegesetz (GEG) verpflichtet ab 2024 schrittweise zum Einbau von Heizungen mit 
            <strong className="text-blue-600"> mindestens 65% erneuerbaren Energien</strong>. Planen Sie rechtzeitig 
            und profitieren Sie von den aktuell hohen Förderungen.
          </p>
        </div>
      </section>

      <section id="heizungsarten" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Moderne Heizungsarten: Ihre Optionen im Vergleich
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🌱 Luft-Wasser-Wärmepumpe</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Bis 70% Förderung möglich</li>
              <li>✅ Umweltfreundlich und zukunftssicher</li>
              <li>✅ Auch für Altbau geeignet</li>
              <li>✅ Kombinierbar mit Photovoltaik</li>
              <li className="text-green-600 font-medium">💰 Kosten: 15.000-25.000 €</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🌍 Erdwärmepumpe</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Höchste Effizienz (COP bis 5,0)</li>
              <li>✅ Konstante Erdtemperatur</li>
              <li>✅ Sehr niedrige Betriebskosten</li>
              <li>❌ Höhere Investitionskosten</li>
              <li className="text-green-600 font-medium">💰 Kosten: 25.000-35.000 €</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🌿 Biomasse-Heizung</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✅ CO₂-neutral heizen</li>
              <li>✅ Günstige Brennstoffkosten</li>
              <li>✅ Hohe Förderung</li>
              <li>⚠️ Platz für Brennstofflager nötig</li>
              <li className="text-green-600 font-medium">💰 Kosten: 12.000-20.000 €</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🔥 Gas-Brennwert + Solar</h4>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Bewährte Technologie</li>
              <li>✅ Moderate Investition</li>
              <li>⚠️ Begrenzte Zukunftssicherheit</li>
              <li>❌ Abhängigkeit von Gaspreisen</li>
              <li className="text-green-600 font-medium">💰 Kosten: 8.000-15.000 €</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-6">
          <h4 className="font-semibold mb-3 text-blue-900">📊 Effizienzvergleich (COP/JAZ)</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <span className="font-medium text-blue-800">Luft-WP</span>
              <p className="text-sm text-blue-700">COP: 3,0-4,5</p>
              <p className="text-xs text-blue-600">Außentemperatur abhängig</p>
            </div>
            <div className="text-center">
              <span className="font-medium text-blue-800">Erdwärme-WP</span>
              <p className="text-sm text-blue-700">COP: 4,0-5,0</p>
              <p className="text-xs text-blue-600">Konstant hoch</p>
            </div>
            <div className="text-center">
              <span className="font-medium text-blue-800">Biomasse</span>
              <p className="text-sm text-blue-700">Wirkungsgrad: 85-95%</p>
              <p className="text-xs text-blue-600">CO₂-neutral</p>
            </div>
            <div className="text-center">
              <span className="font-medium text-blue-800">Gas-Brennwert</span>
              <p className="text-sm text-blue-700">Wirkungsgrad: 90-98%</p>
              <p className="text-xs text-blue-600">Fossil</p>
            </div>
          </div>
        </div>
      </section>

      <section id="planung" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Heizlastberechnung: Die richtige Dimensionierung
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-4">
              <h4 className="font-semibold mb-3 text-lg text-gray-900">📏 Heizlastberechnung nach DIN EN 12831</h4>
              <p className="text-gray-700 mb-3">
                Eine exakte Heizlastberechnung ist die Grundlage für eine effiziente und 
                wirtschaftliche Heizungsanlage.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✅ Transmissionswärmeverluste</li>
                <li>✅ Lüftungswärmeverluste</li>
                <li>✅ Aufheizleistung</li>
                <li>✅ Warmwasserbedarf</li>
              </ul>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-4">
              <h4 className="font-semibold mb-3 text-lg text-gray-900">🎯 Richtwerte für die Heizlast</h4>
              <div className="space-y-3">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Altbau unsaniert:</span>
                  <span className="text-sm font-medium">150-200 W/m²</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Altbau saniert:</span>
                  <span className="text-sm font-medium">80-120 W/m²</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Neubau EnEV:</span>
                  <span className="text-sm font-medium">40-80 W/m²</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Passivhaus:</span>
                  <span className="text-sm font-medium">{'≤'} 10 W/m²</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mb-6">
          <h4 className="font-semibold mb-3 text-yellow-900">⚠️ Häufige Planungsfehler vermeiden</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-yellow-800 mb-2">Überdimensionierung:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Höhere Anschaffungskosten</li>
                <li>• Schlechterer Wirkungsgrad</li>
                <li>• Häufiges Takten</li>
                <li>• Reduzierte Lebensdauer</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-yellow-800 mb-2">Unterdimensionierung:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Unzureichende Heizleistung</li>
                <li>• Erhöhter Stromverbrauch</li>
                <li>• Notwendigkeit elektrischer Zuheizung</li>
                <li>• Unkomfortable Raumtemperaturen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="installation" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Installation und Inbetriebnahme: Professionell umsetzen
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">🔧 Vorbereitung</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Heizungsraum prüfen</li>
              <li>• Stromversorgung sicherstellen</li>
              <li>• Genehmigungen einholen</li>
              <li>• Altanlage fachgerecht entsorgen</li>
              <li>• Heizkörper/Flächenheizung anpassen</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">⚙️ Installation</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Aufstellung der Wärmepumpe</li>
              <li>• Hydraulischer Abgleich</li>
              <li>• Elektroanschluss durch Fachkraft</li>
              <li>• Regelungstechnik konfigurieren</li>
              <li>• Spülung und Druckprüfung</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">✅ Inbetriebnahme</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Funktionsprüfung aller Komponenten</li>
              <li>• Optimierung der Parameter</li>
              <li>• Schulung der Nutzer</li>
              <li>• Übergabeprotokoll erstellen</li>
              <li>• Wartungsvertrag abschließen</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200 mb-6">
          <h4 className="font-semibold mb-3 text-green-900">🔍 Qualitätskriterien für Fachbetriebe</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-green-800 mb-2">Zertifizierungen:</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• BAFA-Fachunternehmen</li>
                <li>• VDI 4645 Zertifizierung</li>
                <li>• Herstellerqualifikation</li>
                <li>• SHK-Innungsbetrieb</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-800 mb-2">Leistungen:</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Heizlastberechnung</li>
                <li>• Hydraulischer Abgleich</li>
                <li>• Inbetriebnahme-Protokoll</li>
                <li>• Wartungsservice</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="kosten" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Kosten und Förderung: Investition die sich lohnt
        </h2>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 border border-green-200">
          <h4 className="font-semibold mb-4 text-green-900">💰 Kostenbeispiel Einfamilienhaus (150m²)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h5 className="font-medium text-green-800 mb-2">Luft-Wasser-Wärmepumpe</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Anschaffung: 18.000 €</li>
                <li>• Installation: 5.000 €</li>
                <li>• Nebenkosten: 2.000 €</li>
                <li>• <strong>Gesamt: 25.000 €</strong></li>
                <li className="text-purple-600 font-medium">🎯 Förderung: bis 17.500 €</li>
                <li className="text-green-600 font-medium">💡 Eigenanteil: ab 7.500 €</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h5 className="font-medium text-green-800 mb-2">Betriebskosten pro Jahr</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Stromkosten: 800-1.200 €</li>
                <li>• Wartung: 150-250 €</li>
                <li>• Versicherung: 50-100 €</li>
                <li>• <strong>Gesamt: 1.000-1.550 €</strong></li>
                <li className="text-red-600 font-medium">🔥 Alt (Gas): 2.400-3.200 €</li>
                <li className="text-green-600 font-medium">💰 Ersparnis: 850-2.200 €/Jahr</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 mb-6">
          <h4 className="font-semibold mb-4 text-purple-900">🎯 Förderübersicht 2025</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h5 className="font-medium text-purple-800 mb-2">Basis-Förderung</h5>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Wärmepumpe: 25%</li>
                <li>• Biomasse: 10%</li>
                <li>• Solar: 25%</li>
                <li>• Gas-Hybrid: 20%</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h5 className="font-medium text-purple-800 mb-2">Bonus-Förderung</h5>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Klimabonus: +5%</li>
                <li>• Effizienzbonus: +5%</li>
                <li>• Einkommensbonus: +30%</li>
                <li>• Heizungstausch: +10%</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h5 className="font-medium text-purple-800 mb-2">Maximum</h5>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Gesamt: max. 70%</li>
                <li>• Höchstbetrag: 30.000 €</li>
                <li>• Zusätzlich: KfW-Kredit</li>
                <li>• Steuerbonus: alternativ 20%</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="betrieb" className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Optimaler Betrieb: Effizienz maximieren
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">⚙️ Einstellungen optimieren</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>Vorlauftemperatur</strong> möglichst niedrig (35-45°C)</li>
              <li>• <strong>Heizkurve</strong> an Gebäude anpassen</li>
              <li>• <strong>Nachtabsenkung</strong> moderat nutzen (2-3°C)</li>
              <li>• <strong>Warmwasser</strong> bedarfsgerecht regeln</li>
              <li>• <strong>Pufferspeicher</strong> richtig dimensionieren</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold mb-3 text-lg text-gray-900">📊 Monitoring und Wartung</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>Jahresarbeitszahl</strong> überwachen (Ziel: {'>'} 3,5)</li>
              <li>• <strong>Stromverbrauch</strong> monatlich kontrollieren</li>
              <li>• <strong>Filter</strong> regelmäßig reinigen</li>
              <li>• <strong>Abtauung</strong> beobachten</li>
              <li>• <strong>Wartung</strong> jährlich durch Fachbetrieb</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-6">
          <h4 className="font-semibold mb-3 text-gray-900">💡 Tipps für maximale Effizienz</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-800 mb-2">Hydraulischer Abgleich:</h5>
              <p className="text-sm text-gray-700 mb-2">
                Sorgt für optimale Wärmeverteilung und reduziert den Stromverbrauch um bis zu 15%.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ventile an jedem Heizkörper</li>
                <li>• Pumpendrehzahl anpassen</li>
                <li>• Durchflussmengen optimieren</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-800 mb-2">Smart Home Integration:</h5>
              <p className="text-sm text-gray-700 mb-2">
                Intelligente Steuerung passt Heizleistung automatisch an Bedarf und Strompreise an.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Wetterprognose-basierte Regelung</li>
                <li>• Anwesenheitserkennung</li>
                <li>• Variable Stromtarife nutzen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="fazit" className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">
          Fazit: Jetzt in die Zukunft investieren
        </h2>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 border border-green-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Eine <strong className="text-green-700">moderne Heizungsanlage</strong> ist nicht nur gesetzlich 
            vorgeschrieben, sondern auch die beste Investition in Komfort, Umweltschutz und langfristige 
            Kostenersparnis. Mit den aktuellen Förderungen war der Umstieg nie attraktiver.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-900">🎯 Handlungsempfehlung:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Heizlastberechnung durchführen lassen</li>
                <li>Angebote von zertifizierten Betrieben einholen</li>
                <li>Förderanträge rechtzeitig stellen</li>
                <li>Installation professionell durchführen</li>
                <li>Betrieb optimieren und überwachen</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-blue-900">💰 Wirtschaftlichkeit:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Bis 70% staatliche Förderung</li>
                <li>• 30-60% Energiekosteneinsparung</li>
                <li>• Amortisation in 8-15 Jahren</li>
                <li>• Immobilienwertsteigerung</li>
                <li>• Unabhängigkeit von fossilen Brennstoffen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeizungModernisierungContentSEO;
