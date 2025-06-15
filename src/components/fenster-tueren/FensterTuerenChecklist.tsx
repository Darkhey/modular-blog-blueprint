
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FensterTuerenChecklist = () => {
  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle>Checkliste &amp; Tipps: Fenster &amp; Türen richtig auswählen</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 text-gray-800 space-y-1 text-[1rem]">
          <li>Anforderungen notieren: Welcher Bereich? (Haustür, Fenster, Innenraum?)</li>
          <li>U-Wert/Ud-Wert prüfen &rarr; möglichst niedrige Werte wählen.</li>
          <li>Sicherheitsklasse für Türen/Fenster abfragen, RC2 bei Erdgeschoss/Nebenräumen empfehlenswert.</li>
          <li>Dämmung, Schallschutz, Einbruchschutz und Design abwägen.</li>
          <li>Material &amp; Pflegeaufwand berücksichtigen: Kunststoff, Holz, Alu oder Kombi?</li>
          <li>Fachgerechter Einbau ist Pflicht! Nur Fachbetriebe wählen &ndash; sonst Verlust von Förderansprüchen.</li>
          <li>Nach Fördermöglichkeiten recherchieren – Antrag rechtzeitig stellen!</li>
          <li>Auch an regelmäßige Wartung denken: Nur gepflegte Dichtungen, Schlösser und Oberflächen halten lange dicht und sicher!</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default FensterTuerenChecklist;
