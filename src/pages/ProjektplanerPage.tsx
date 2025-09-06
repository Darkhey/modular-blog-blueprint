
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ProjektplanerPage = () => {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Sanierungsplaner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base leading-relaxed">
          <p>
            Der Sanierungsplaner begleitet Sie von der ersten Idee bis zur fertigen Umsetzung.
            Er strukturiert alle Arbeitsschritte, ermöglicht eine realistische Zeitplanung
            und hilft, den Überblick über Gewerke und Verantwortlichkeiten zu behalten.
          </p>
          <h2 className="text-xl font-semibold mt-6">Planungsphasen im Überblick</h2>
          <ol className="list-decimal ml-6 space-y-2">
            <li>
              <strong>Bedarf analysieren:</strong> Prüfen Sie den Zustand Ihres Gebäudes und
              legen Sie Prioritäten für Maßnahmen fest.
            </li>
            <li>
              <strong>Budget und Finanzierung klären:</strong> Ermitteln Sie die verfügbaren
              Mittel und berücksichtigen Sie Förderprogramme.
            </li>
            <li>
              <strong>Fachbetriebe auswählen:</strong> Holen Sie Angebote ein und stimmen Sie
              Zeitfenster mit den Handwerkern ab.
            </li>
            <li>
              <strong>Ausführung überwachen:</strong> Kontrollieren Sie regelmäßig den Baufortschritt
              und dokumentieren Sie wichtige Meilensteine.
            </li>
            <li>
              <strong>Abnahme & Nachbereitung:</strong> Prüfen Sie alle Arbeiten, sichern Sie
              Garantien und planen Sie langfristige Wartung.
            </li>
          </ol>
          <h2 className="text-xl font-semibold mt-6">Tipps für eine reibungslose Umsetzung</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Realistische Zeitpuffer einplanen, um Verzögerungen abzufedern.</li>
            <li>Kommunikationswege mit allen Beteiligten klar definieren.</li>
            <li>Änderungen schriftlich festhalten, damit Kosten und Termine nachvollziehbar bleiben.</li>
            <li>Regelmäßig Fotos und Notizen anfertigen – das erleichtert spätere Nachweise.</li>
          </ul>
          <p>
            Parallel zum Projektverlauf sollte der
            <Link to="/budgetplan" className="text-primary hover:underline">
              {" "}Budgetplan
            </Link>
            aktualisiert werden, um finanzielle Überraschungen zu vermeiden. Weitere Anleitungen
            und Checklisten finden Sie im Bereich
            <Link to="/wissenswertes" className="text-primary hover:underline">
              {" "}Wissenswertes
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjektplanerPage;
