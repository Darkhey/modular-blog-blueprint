
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const BudgetplanPage = () => {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Budgetplaner für Ihre Sanierung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base leading-relaxed">
          <p>
            Ein durchdachter Budgetplan ist das finanzielle Rückgrat jeder Modernisierung.
            Er hilft, Ausgaben realistisch einzuschätzen, Reserven einzuplanen und
            die passende Förderung zu berücksichtigen. Mit unserem Budgetplaner behalten
            Sie alle Kosten im Blick und treffen fundierte Entscheidungen.
          </p>
          <p>
            Nutzen Sie die folgenden Hinweise als Leitfaden, um Schritt für Schritt eine
            vollständige Kostenübersicht zu erstellen und kostspielige Überraschungen zu vermeiden.
          </p>
          <h2 className="text-xl font-semibold mt-6">Kostenkategorien im Überblick</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Materialkosten:</strong> Preise für Dämmstoffe, Fenster, Heiztechnik und
              weiteres Bauzubehör bilden meist den größten Block.
            </li>
            <li>
              <strong>Lohnkosten:</strong> Handwerker, Planer und Energieberater sollten mit
              marktüblichen Stundensätzen kalkuliert werden.
            </li>
            <li>
              <strong>Genehmigungen & Gutachten:</strong> Baugenehmigungen, Statikprüfungen oder
              Energieausweise verursachen oft zusätzliche Gebühren.
            </li>
            <li>
              <strong>Unvorhergesehenes:</strong> Für Überraschungen empfiehlt sich ein Puffer
              von mindestens zehn Prozent der Gesamtsumme.
            </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">So nutzen Sie den Budgetplaner</h2>
          <ol className="list-decimal ml-6 space-y-2">
            <li>
              Projektumfang definieren und alle geplanten Maßnahmen notieren.
            </li>
            <li>
              Angebote von Fachbetrieben einholen und realistische Vergleichswerte sammeln.
            </li>
            <li>
              Förderprogramme recherchieren und potenzielle Zuschüsse eintragen.
            </li>
            <li>
              Laufende Kosten wie Energie oder Wartung berücksichtigen, um langfristige
              Einsparungen zu bewerten.
            </li>
          </ol>
          <p>
            Weitere hilfreiche Vorlagen wie Kostenübersichten und Finanzierungspläne finden
            Sie im
            <Link to="/wissenswertes/downloads" className="text-primary hover:underline">
              {" "}Download-Center
            </Link>
            . Für die detaillierte Projektplanung empfiehlt sich der
            <Link to="/projektplaner" className="text-primary hover:underline">
              {" "}Sanierungsplaner
            </Link>
            .
          </p>
          <p>
            Sobald Sie Ihre Daten erfasst haben, aktualisieren Sie den Plan regelmäßig.
            So behalten Sie auch bei längeren Bauphasen jederzeit die Kontrolle über Ihr
            Budget und können rechtzeitig gegensteuern.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetplanPage;
