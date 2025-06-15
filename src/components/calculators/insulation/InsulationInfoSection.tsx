
import { Info, CheckCircle } from "lucide-react";

const insulationTips = [
  {
    title: "Rechtliche Vorgaben beachten",
    content:
      "Nach dem Gebäudeenergiegesetz (GEG) besteht für viele Häuser bei Sanierung eine Dämm-Pflicht für die oberste Geschossdecke und teilweise für Fassaden. Bei Eigentümerwechsel müssen bestimmte Dämmmaßnahmen oft zeitnah ausgeführt werden.",
  },
  {
    title: "Dämmstoffwahl: Wirkung & Nachhaltigkeit",
    content:
      "Mineralwolle, Holzfaser, EPS & Co haben unterschiedliche Wärmedämmeigenschaften, Preise und Umweltwirkungen. Nachhaltige Dämmstoffe wie Holzfaser bieten einen guten Mix aus Ökobilanz, Brandschutz und Schutz vor Sommerhitze.",
  },
  {
    title: "Staatliche Förderung bis zu 70%",
    content:
      "Energetische Sanierungen werden 2024/25 im Rahmen der BEG massiv staatlich gefördert. Profitieren Sie von Zuschüssen für Fassade, Dach und Kellerdecke! Ein Energieberater kann Pflicht sein.",
  },
  {
    title: "Typische Beispiel-Ersparnisse",
    content:
      "Eine Fassadendämmung senkt Heizkosten oft um 20–35%. Kellerdecken- und Dachbodendämmung amortisieren sich meist schon nach 5–10 Jahren.",
  },
];

const InsulationInfoSection = () => (
  <section className="mt-10 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-md animate-fade-in">
    <div className="flex items-start gap-4 mb-3">
      <Info className="text-yellow-600 w-7 h-7 mt-1" />
      <div>
        <h3 className="text-lg font-bold text-yellow-900">Wichtige Infos zur Dämmung</h3>
        <p className="text-gray-700 mb-2">
          Damit Ihre Dämmmaßnahme effektiv und rechtskonform ist, sollten Sie folgende Aspekte kennen:
        </p>
      </div>
    </div>
    <ul className="space-y-4 mt-2 text-[1rem]">
      {insulationTips.map((tip, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <CheckCircle className="text-emerald-500 min-w-5 mt-1" />
          <div>
            <span className="font-semibold">{tip.title}: </span>
            <span>{tip.content}</span>
          </div>
        </li>
      ))}
    </ul>
    <div className="text-xs text-gray-500 mt-5">
      <span className="font-bold">Tipp:</span> Mehr über die optimale Dämmung, typische Fehler sowie Förderung und Nachweispflichten finden Sie im{" "}
      <a
        href="/blog/daemmstoffe-vergleich-2025"
        className="text-emerald-700 underline hover:text-emerald-900"
      >
        Dämmstoff-Überblick
      </a>
      .
    </div>
  </section>
);

export default InsulationInfoSection;

