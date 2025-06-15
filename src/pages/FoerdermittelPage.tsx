import { siteConfig } from '@/config/site.config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import TimelineSection from '@/components/foerdermittel/TimelineSection';
import HighlightedTip from '@/components/foerdermittel/HighlightedTip';
import NetBenefitExample from '@/components/foerdermittel/NetBenefitExample';

const FoerdermittelPage = () => {
  const topic = siteConfig.contentTopics.find(t => t.id === 'foerderung');

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <main className="pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Einleitung */}
          <section className="mt-10 mb-8">
            <span className="inline-block bg-green-200 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-2 tracking-wide">Fördermittel 2025</span>
            <h1 className="text-4xl font-black mb-3 text-green-950 dark:text-green-300">{topic?.name || "Fördermittel"}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{topic?.description || "Staatliche Zuschüsse und Finanzierungshilfen optimal nutzen"}</p>
            <ul className="list-disc ml-7 text-base text-green-900 dark:text-green-200 mt-2 space-y-1">
              <li>Bis zu 70% Zuschuss für Sanierung, Heizung oder Dämmung</li>
              <li>Zuschläge vom Bund (BAFA, KfW) & Regionen kombinieren</li>
              <li>Doppeltes Sparen durch Senkung von Kosten + Förderung</li>
            </ul>
          </section>

          {/* Zeitstrahl */}
          <TimelineSection />

          {/* Wichtiger Hinweis */}
          <HighlightedTip />

          {/* Beispiel zur Förderung */}
          <NetBenefitExample />

          {/* Neuer: Hinweis, warum Förderung manchmal nicht sinnvoll ist */}
          <div className="bg-orange-100 dark:bg-orange-900/40 border-l-4 border-orange-500 rounded-md px-5 py-4 my-8 shadow-sm">
            <div className="flex gap-3 items-start">
              <span className="mt-1">
                <svg width="28" height="28" className="text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1.5"/></svg>
              </span>
              <div>
                <strong className="block text-orange-800 dark:text-orange-200 mb-1">Nicht immer lohnt sich eine Förderung!</strong>
                <p className="text-orange-900 dark:text-orange-100 text-base">
                  In manchen Fällen ist der Aufwand für die Beantragung der Förderung größer als der tatsächliche Vorteil:
                </p>
                <ul className="list-disc ml-6 text-orange-900 dark:text-orange-100 mt-2 space-y-1">
                  <li>
                    <span className="font-medium">Energieberater:</span> Die verpflichtende Einbindung eines zertifizierten Energieberaters kann mehrere Tausend Euro kosten und lohnt sich bei kleineren Maßnahmen oft nicht.
                  </li>
                  <li>
                    <span className="font-medium">Bürokratie für Handwerker:</span> Viele Handwerksbetriebe müssen aufwändige Nachweise und Formulare für die Förderung ausfüllen, was zusätzlichen Aufwand und Wartezeit bedeutet.
                  </li>
                </ul>
                <span className="block mt-2 text-sm text-orange-700 dark:text-orange-200">Lassen Sie sich vorab beraten, ob sich die Antragstellung in Ihrem individuellen Fall lohnt.</span>
              </div>
            </div>
          </div>

          {/* Ratgeber-Karten */}
          <Card className="mb-8 mt-12 animate-fade-in">
            <CardHeader>
              <CardTitle>Unsere Ratgeber für Fördermittel</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Schon bestehende Karten */}
              <Link to="/blog/bafa-foerderung-2025-leitfaden" className="block hover:no-underline group hover-scale">
                <div className="p-4 border rounded-lg bg-white shadow-md h-full flex flex-col">
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">BAFA 2025</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">BAFA-Förderung 2025: Ihr kompletter Leitfaden</h3>
                  <p className="text-gray-600 text-sm mb-2">Alles zu Zuschüssen für Einzelmaßnahmen an Heizung, Dämmung & Co. So beantragen Sie den BAFA-Zuschuss erfolgreich.</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zum BAFA-Leitfaden</span>
                </div>
              </Link>
              <Link to="/blog/kfw-foerderung-2025-kredite-zuschuesse" className="block hover:no-underline group hover-scale">
                <div className="p-4 border rounded-lg bg-white shadow-md h-full flex flex-col">
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">KfW 2025</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">KfW-Förderung 2025: Kredite & Zuschüsse</h3>
                  <p className="text-gray-600 text-sm mb-2">Günstige Kredite und Tilgungszuschüsse für Komplettsanierungen, Heizungstausch und mehr – so nutzen Sie die KfW optimal.</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zum KfW-Leitfaden</span>
                </div>
              </Link>
              <Link to="/blog/regionale-foerderprogramme-2025-zuschuesse" className="block hover:no-underline group hover-scale">
                <div className="p-4 border rounded-lg bg-white shadow-md h-full flex flex-col">
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">REGIONAL 2025</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">Regionale Förderprogramme 2025: Zuschüsse & Boni</h3>
                  <p className="text-gray-600 text-sm mb-2">Wie Sie Landes- und Kommunalförderungen mit BAFA und KfW kombinieren, um das Beste für Ihre Sanierung herauszuholen.</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zu den Regional-Förderungen</span>
                </div>
              </Link>
              {/* NEU: Dämmstoffe */}
              <Link to="/blog/daemmstoffe-vergleich-2025" className="block hover:no-underline group hover-scale">
                <div className="p-4 border rounded-lg bg-white shadow-md h-full flex flex-col">
                  <span className="text-xs font-semibold text-blue-700 uppercase mb-2">DÄMMSTOFFE 2025</span>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition-colors">Dämmstoffe im Vergleich: Alle Vor- & Nachteile</h3>
                  <p className="text-gray-600 text-sm mb-2">Mineralwolle, EPS, Holzfaser, Zellulose & Co. – dieser große Ratgeber zeigt Unterschiede, Kauftipps & Fördermöglichkeiten.</p>
                  <span className="text-green-700 font-semibold mt-auto group-hover:underline">➡ Zum Dämmstoff-Ratgeber</span>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Kurzübersicht wichtige Programme */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Die wichtigsten Förderprogramme im Überblick</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg">BAFA - Bundesförderung für effiziente Gebäude (BEG)</h3>
                <p className="text-gray-800 dark:text-gray-200">Zuschüsse für Einzelmaßnahmen wie Heizungstausch oder Dämmung. Bis zu 70% der Kosten können übernommen werden.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">KfW - Kreditanstalt für Wiederaufbau</h3>
                <p className="text-gray-800 dark:text-gray-200">Günstige Kredite und Tilgungszuschüsse für Komplettsanierungen zum Effizienzhaus oder den Kauf von energieeffizienten Neubauten.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Regionale Programme</h3>
                <p className="text-gray-800 dark:text-gray-200">Zusätzlich gibt es oft Förderungen von Bundesländern und Kommunen. Eine Recherche lohnt sich!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FoerdermittelPage;
