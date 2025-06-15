
import { Calendar, CalendarArrowDown, CalendarArrowUp, Clock, Timeline, Euro } from "lucide-react";

const steps = [
  {
    icon: CalendarArrowDown,
    title: "1. Beratung & Planung",
    desc: "Kontaktieren Sie rechtzeitig einen zertifizierten Energieberater. Gemeinsam wird geprüft, welche Förderungen infrage kommen."
  },
  {
    icon: Calendar,
    title: "2. Antrag vor Baubeginn",
    desc: "Alle Fördermittelanträge (BAFA/KfW) MÜSSEN vor Vertragsabschluss oder Baubeginn eingereicht werden."
  },
  {
    icon: Timeline,
    title: "3. Durchführung der Maßnahme",
    desc: "Nach Bewilligung der Förderung sanieren Sie Ihr Gebäude wie geplant."
  },
  {
    icon: Clock,
    title: "4. Nachweise einreichen",
    desc: "Reichen Sie die Abschlussdokumente bei der Förderstelle ein – Ihr Energieberater unterstützt Sie dabei."
  },
  {
    icon: Euro,
    title: "5. Fördermittel erhalten",
    desc: "Nach Prüfung erfolgt die Auszahlung des Zuschusses bzw. die Kreditabrechnung."
  }
];

const TimelineSection = () => (
  <section className="mb-12 animate-fade-in">
    <h2 className="text-2xl font-bold mb-6 text-center">Ablauf: So läuft ein Fördermittel-Antrag ab</h2>
    <ol className="relative border-l-2 border-green-400 pl-8 max-w-2xl mx-auto">
      {steps.map((s, i) => (
        <li key={s.title} className="mb-10 ml-4">
          <span className="absolute -left-7 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-400 shadow-md">
            <s.icon className="text-white w-6 h-6" />
          </span>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{s.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{s.desc}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default TimelineSection;
