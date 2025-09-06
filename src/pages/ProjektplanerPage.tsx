
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
            Dieser Leitfaden begleitet Sie von der ersten Idee bis zur fertigen Umsetzung.
            Er strukturiert alle Arbeitsschritte, ermöglicht eine realistische Zeitplanung
            und hilft, den Überblick über Gewerke und Verantwortlichkeiten zu behalten.
          </p>

          <h2 className="text-xl font-semibold mt-6">1. Bedarf analysieren</h2>
          <p>
            Prüfen Sie den Zustand Ihres Gebäudes und legen Sie Prioritäten fest. Nutzen Sie
            Werkzeuge wie den
            <Link to="/daemmungsrechner" className="text-primary hover:underline">
              {" "}Dämmungsrechner
            </Link>{" "}
            oder den
            <Link to="/heizkostenrechner" className="text-primary hover:underline">
              {" "}Heizkostenrechner
            </Link>, um Einsparpotenziale zu erkennen. Ausführliche Tipps bietet die
            <a
              href="https://www.verbraucherzentrale.de/wissen/bauen-wohnen/modernisieren-und-bauen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {" "}Verbraucherzentrale
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold mt-6">2. Budget und Finanzierung klären</h2>
          <p>
            Ermitteln Sie die verfügbaren Mittel und berücksichtigen Sie Förderprogramme. Unser
            <Link to="/budgetplan" className="text-primary hover:underline">
              {" "}Budgetplan
            </Link>{" "}
            unterstützt bei der Kostenkontrolle. Einen Überblick über passende Programme finden
            Sie in der
            <Link to="/foerdermittel" className="text-primary hover:underline">
              {" "}Fördermittel-Übersicht
            </Link>
            . Weitere Informationen bieten die
            <a
              href="https://www.kfw.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {" "}KfW
            </a>{" "}
            und das
            <a
              href="https://www.bafa.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {" "}BAFA
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold mt-6">3. Fachbetriebe auswählen</h2>
          <p>
            Holen Sie Angebote ein und stimmen Sie Zeitfenster mit den Handwerkern ab. Qualifizierte
            Betriebe finden Sie über unser
            <Link to="/wissenswertes/experten" className="text-primary hover:underline">
              {" "}Expertenverzeichnis
            </Link>{" "}
            oder die
            <a
              href="https://www.handwerkskammer.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {" "}Handwerkskammer
            </a>
            . Für individuelle Fragen steht Ihnen auch unser
            <Link to="/kontakt" className="text-primary hover:underline">
              {" "}Kontaktformular
            </Link>{" "}
            offen.
          </p>

          <h2 className="text-xl font-semibold mt-6">4. Ausführung überwachen</h2>
          <p>
            Kontrollieren Sie regelmäßig den Baufortschritt und dokumentieren Sie wichtige
            Meilensteine. Unsere
            <Link to="/wissenswertes/downloads" className="text-primary hover:underline">
              {" "}Checklisten
            </Link>{" "}
            helfen bei der Qualitätskontrolle. Weitere Hinweise zur Bauüberwachung bietet die
            <a
              href="https://www.verbraucherzentrale.de/wissen/bauen-wohnen/bauvertrag-bauabnahme/bauueberwachung-wann-sich-die-baubegleitung-lohnt-7252"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {" "}Verbraucherzentrale
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold mt-6">5. Abnahme &amp; Nachbereitung</h2>
          <p>
            Prüfen Sie alle Arbeiten, sichern Sie Garantien und planen Sie langfristige Wartung.
            Informationen zur Gewährleistung finden Sie beim
            <a
              href="https://www.bmwsb.bund.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {" "}Bundesbauministerium
            </a>
            . Weitere Anleitungen finden Sie im Bereich
            <Link to="/wissenswertes" className="text-primary hover:underline">
              {" "}Wissenswertes
            </Link>
            .
          </p>

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
            </Link>{" "}
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
