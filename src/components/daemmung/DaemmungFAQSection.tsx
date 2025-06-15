
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DaemmungFAQSection = () => {
  const faqs = [
    {
      question: "Welche Dämmung ist die beste für mein Haus?",
      answer: "Das hängt von Haustyp, Baujahr und Budget ab. Für den Dachboden ist Mineralwolle meist optimal, für die Fassade EPS oder Mineralwolle. Bei ökologischen Ansprüchen sind Holzfaser oder Zellulose empfehlenswert. Eine Energieberatung hilft bei der optimalen Materialwahl."
    },
    {
      question: "Wie dick muss die Dämmung sein?",
      answer: "Für Förderungen sind Mindest-U-Werte einzuhalten: Dach 0,14 W/(m²K), Außenwand 0,20 W/(m²K), Kellerdecke 0,25 W/(m²K). Das entspricht etwa 20-30cm Dämmstärke. Mehr ist oft wirtschaftlich, da Material günstig ist, aber Arbeitskosten gleich bleiben."
    },
    {
      question: "Wann amortisiert sich eine Dämmung?",
      answer: "Die Amortisationszeit liegt meist zwischen 8-15 Jahren. Dachbodendämmung amortisiert sich oft schon nach 5-8 Jahren, Fassadendämmung nach 12-18 Jahren. Mit Förderung reduziert sich die Zeit erheblich. Zusätzlich steigt der Immobilienwert."
    },
    {
      question: "Kann ich die Dämmung selbst machen?",
      answer: "Einfache Maßnahmen wie Dachbodendämmung oder Kellerdeckendämmung sind für Heimwerker machbar. Fassadendämmung und Dachdämmung sollten Profis übernehmen. Für Förderungen ist oft ein Fachbetrieb Pflicht. Fehler bei der Dämmung können teuer werden."
    },
    {
      question: "Wie finde ich den richtigen Handwerker?",
      answer: "Achten Sie auf Referenzen, Zertifizierungen und Erfahrung mit Ihrem Dämmstoff. Holen Sie 3 Angebote ein und prüfen Sie, ob der Betrieb für Förderungen zugelassen ist. Wichtig: Nicht nur auf den Preis schauen, sondern auf Qualität und Garantien."
    },
    {
      question: "Muss ich nach der Dämmung anders lüften?",
      answer: "Ja, nach einer Dämmung wird das Haus dichter und Sie müssen bewusster lüften. 3-4x täglich 5-10 Minuten Stoßlüften verhindert Schimmel. Bei größeren Sanierungen ist eine kontrollierte Wohnraumlüftung (KWL) empfehlenswert."
    },
    {
      question: "Was passiert mit Feuchtigkeit in der Dämmung?",
      answer: "Moderne Dämmstoffe sind dampfdiffusionsoffen oder haben eine fachgerecht angebrachte Dampfsperre. Bei korrekter Ausführung gibt es keine Feuchtigkeitsprobleme. Wichtig ist die richtige Materialwahl und professionelle Verarbeitung."
    },
    {
      question: "Sind ökologische Dämmstoffe empfehlenswert?",
      answer: "Ja, Holzfaser, Zellulose oder Hanf haben oft bessere sommerliche Wärmeschutz-Eigenschaften und sind nachhaltiger. Sie kosten mehr, bieten aber meist besseren Wohnkomfort. Für Allergiker können sie die bessere Wahl sein."
    },
    {
      question: "Wie lange hält eine Dämmung?",
      answer: "Qualitätsdämmstoffe halten 40-50 Jahre oder länger. Mineralwolle und EPS sind praktisch unvergänglich, natürliche Materialien wie Holzfaser mindestens 30-40 Jahre. Die Investition in Qualität zahlt sich über die Lebensdauer aus."
    },
    {
      question: "Was kostet eine komplette Dämmung?",
      answer: "Für ein Einfamilienhaus (140m²) rechnen Sie mit 25.000-50.000€ für Vollsanierung (Dach, Fassade, Keller). Mit 40% Förderung reduziert sich das auf 15.000-30.000€. Einzelmaßnahmen sind deutlich günstiger: Dachboden ab 2.500€, Keller ab 2.000€."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Häufige Fragen zur Dämmung
          </h2>
          <p className="text-xl text-gray-600">
            Alle wichtigen Antworten rund um Dämmung, Kosten und Förderung auf einen Blick.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gray-50 rounded-lg px-6 border-none animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-green-600 py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Weitere Fragen? Wir helfen gerne!
            </h3>
            <p className="text-gray-600 mb-6">
              Unsere Experten beraten Sie kostenlos zu allen Aspekten der Dämmung - 
              von der Materialwahl bis zur Förderung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                Kostenlose Beratung anfragen
              </button>
              <button className="px-8 py-3 border border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors">
                Rückruf vereinbaren
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaemmungFAQSection;
