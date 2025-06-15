
import { Calendar, CalendarArrowDown, CalendarArrowUp, Clock, Euro, Map } from "lucide-react";

const steps = [
  {
    icon: CalendarArrowDown,
    title: "1. Beratung & Planung",
    desc: "Kontaktieren Sie rechtzeitig einen <span class='underline decoration-green-500'>zertifizierten Energieberater</span>. Gemeinsam prüfen Sie, welche Fördermittel infrage kommen. Förderprogramme und Sanierungsfahrplan werden individuell abgestimmt.",
    color: "from-green-300 to-green-500"
  },
  {
    icon: Calendar,
    title: "2. Antrag vor Baubeginn",
    desc: "<span class='font-bold text-yellow-700'>Der Förderantrag (BAFA/KfW) MUSS vor Baubeginn/Vertragsabschluss gestellt werden!</span><br/>Unterstützung gibt Ihr Energieberater.",
    color: "from-yellow-200 to-yellow-400"
  },
  {
    icon: Map,
    title: "3. Durchführung der Maßnahme",
    desc: "Nach Bewilligung (bzw. Erhalt der KfW-Zusagen) werden die geplanten Maßnahmen umgesetzt. Nur so bleibt Ihr Anspruch auf Förderung erhalten!",
    color: "from-blue-200 to-blue-400"
  },
  {
    icon: Clock,
    title: "4. Nachweise einreichen",
    desc: "Nach der Sanierung: Nachweise und Rechnungen zur Auszahlung übermitteln. Ihr Berater hilft beim Dokumentieren.",
    color: "from-gray-200 to-gray-400"
  },
  {
    icon: Euro,
    title: "5. Zuschuss erhalten",
    desc: "Nach Prüfung der Unterlagen und Freigabe bekommen Sie den Förderzuschuss oder die Tilgung erfolgt direkt.",
    color: "from-green-400 to-green-700"
  }
];

const TimelineSection = () => (
  <section className="mb-14 animate-fade-in">
    <h2 className="text-2xl font-bold mb-7 text-center text-green-900 dark:text-green-200">Ablauf: Schritt-für-Schritt zum Fördergeld</h2>
    {/* Timeline horizontal on Desktop, vertical on Mobile */}
    <div className="flex flex-col md:flex-row md:items-start gap-8">
      {steps.map((s, i) => (
        <div
          key={s.title}
          className="flex-1 flex flex-col items-center relative group"
        >
          {/* Icon in farbigem Kreis */}
          <div className={`bg-gradient-to-br ${s.color} w-14 h-14 rounded-full flex items-center justify-center shadow-lg mb-2 transition-transform group-hover:scale-110`}>
            <s.icon className="text-white w-7 h-7" />
          </div>
          {/* Verbindungslinie */}
          {i < steps.length - 1 && (
            <span
              className="hidden md:block absolute top-7 right-[-15%] w-[30%] h-1 bg-gradient-to-r from-green-300 to-green-600/20 z-0"
              style={{ left: 'calc(100% + 1rem)' }}
            ></span>
          )}
          {/* Step Titel */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-1">{s.title}</h3>
          {/* Step Beschreibung */}
          <div className="text-gray-600 dark:text-gray-300 text-sm text-center" dangerouslySetInnerHTML={{ __html: s.desc }} />
          {/* Nur auf Mobile Trennlinie*/}
          {i < steps.length - 1 && (
            <div className="block md:hidden w-2 h-10 my-1 bg-gradient-to-b from-green-300 to-green-600/20 rounded-full" />
          )}
        </div>
      ))}
    </div>
    <p className="text-xs text-gray-400 text-center mt-6">Tipp: Lassen Sie sich schon in der Planungsphase beraten & starten Sie NIE ohne Zusage!</p>
  </section>
);

export default TimelineSection;
