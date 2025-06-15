
import { Info, DoorClosed, DoorOpen, Wind } from "lucide-react";
import { Link } from 'react-router-dom';
import ThemenBox from './ThemenBox';

// Image gallery for doors and windows
const fensterImages = [
  {
    src: "/photo-1487958449943-2429e8be8625.jpg",
    alt: "Modernes Fenster in heller Fassade"
  },
  {
    src: "/photo-1496307653780-42ee777d4833.jpg",
    alt: "Großflächige Glasfassade von unten"
  },
  {
    src: "/photo-1459767129954-1b1c1f9b9ace.jpg",
    alt: "Stilvolle Fensterfront moderner Architektur"
  }
];

const tuerenImages = [
  {
    src: "/photo-1518005020951-eccb494ad742.jpg",
    alt: "Moderne Haustür in heller Betonwand"
  },
  {
    src: "/photo-1449157291145-7efd050a4d0e.jpg",
    alt: "Design-Haustür in Neubau"
  }
];

const FensterTuerenContent = () => {
  return (
    <>
      {/* Themenübersicht mit Bildern */}
      <ThemenBox
        icon={<Info className="text-blue-500 w-8 h-8" />}
        title="Warum sind Fenster und Türen so wichtig?"
        image={fensterImages[2]}
      >
        Fenster &amp; Türen sind die Grenze zwischen drinnen und draußen: Sie beeinflussen, wie viel Wärme entweicht, wie sicher Sie sich fühlen, wie hell es im Haus ist – und wie viel Sie fürs Heizen zahlen! Bis zu 25% der gesamten Wärmeverluste entfallen in alten Häusern allein auf undichte Fenster und Außentüren. Moderne Lösungen kombinieren ausgezeichnete Dämmung, Einbruchschutz, Komfort und Gestaltungsspielraum – und sind zentral für jede energetische Sanierung.
      </ThemenBox>

      <ThemenBox
        icon={<Wind className="text-emerald-600 w-8 h-8" />}
        title="Fenster-Arten & Eigenschaften"
        image={fensterImages[1]}
      >
        <ul className="list-disc pl-5 mb-1 space-y-1">
          <li><strong>Dreh-Kipp-Fenster:</strong> Am weitesten verbreitet, lassen sich zum Lüften kippen und öffnen.</li>
          <li><strong>Balkon-/Terrassentüren:</strong> Große Glasflächen, bieten Verbindung zum Außenbereich.</li>
          <li><strong>Schiebefenster:</strong> Ideal für große, bodentiefe Fensterfronten; platzsparend.</li>
          <li><strong>Festverglasung:</strong> Nicht zu öffnen, besonders wärmedämmend und günstig bei großen Glasflächen.</li>
        </ul>
        <div className="text-sm text-gray-700">
          Wichtig: U-Wert (Wärmedurchgang) beachten &rarr; Je niedriger, desto besser die Dämmung. <br />
          Dreifachverglasung ist heute Standard bei Neubau – sie spart Energie und schützt vor Lärm.
        </div>
      </ThemenBox>

      <ThemenBox
        icon={<DoorClosed className="text-yellow-700 w-8 h-8" />}
        title="Türen-Arten & Funktionen"
        image={tuerenImages[0]}
      >
        <ul className="list-disc pl-5 mb-1 space-y-1">
          <li><strong>Haustüren:</strong> Schutz vor Einbrechern &amp; Visitenkarte des Hauses. Viel Wert auf Sicherheit, Dämmwerte (Ud-Wert) und Winddichtigkeit legen!</li>
          <li><strong>Zimmertüren:</strong> Strukturieren Räume, sorgen für Ruhe und Privatsphäre. Schall- &amp; Klimaschutz spielen eine Rolle.</li>
          <li><strong>Schiebe- &amp; Falttüren:</strong> Perfekt für flexible Raumgestaltung, barrierefreie Zugänge oder als platzsparende Lösung.</li>
          <li><strong>Besondere Türen:</strong> Brandschutztüren, Nebeneingangstüren, Sicherheitstüren mit RC-Wert: optimal für Keller, Garage etc.</li>
        </ul>
        <div className="text-sm text-gray-700">
          Tipp: Prüfen Sie, ob eine neue Haustür förderfähig ist (z.B. wegen Energieeffizienz oder Einbruchschutz).
        </div>
      </ThemenBox>

      <ThemenBox
        icon={<Info className="text-green-600 w-7 h-7" />}
        title="Energieeinsparung & Wärmeschutz"
        image={fensterImages[0]}
      >
        <ul className="list-disc pl-5 mb-1 space-y-1">
          <li>Bis zu 25% der Heizenergie geht über Fenster/Türen verloren – besonders bei Altbauten mit Einfachverglasung.</li>
          <li>Effiziente Fenster haben <b>3-Fach-Verglasung</b>, warme Kanten (thermisch getrennte Abstandhalter), dichte Rahmenprofile.</li>
          <li>Neue Türen besitzen meist Mehrkammerprofile/Dämmkerne, dicke Dichtungen sowie thermische Trennung.</li>
          <li><b>Fördermittel</b> gibt es für Maßnahmen mit spürbarer Energieeinsparung – oft in Verbindung mit einem Energieberater!</li>
        </ul>
        <div className="text-xs text-gray-700">Je niedriger der U-Wert/Ud-Wert, desto besser die Dämmung. Zielwert für Fenster: unter 0,9 W/(m²K), für Haustüren: unter 1,3 W/(m²K).</div>
      </ThemenBox>

      <ThemenBox
        icon={<DoorOpen className="text-red-700 w-8 h-8" />}
        title="Sicherheit & Einbruchschutz"
        image={tuerenImages[1]}
      >
        <ul className="list-disc pl-5 mb-1 space-y-1">
          <li><b>Haustüren</b> stets mit Mehrfachverriegelung, massiven Schließblechen und geprüften Sicherheitszylindern ausstatten.</li>
          <li><b>Fenster:</b> Pilzkopfzapfen, stabile Beschläge und abschließbare Griffe erschweren Einbrechern das Leben enorm.</li>
          <li><b>Smart-Home-Sensoren</b>: erkennen Einbruchsversuche sofort (Push-Benachrichtigung aufs Smartphone).</li>
          <li>Im EG und bei Kellerfenstern besonders auf hohe Widerstandsklasse (RC2/RC3) und Nachrüstsicherheit achten.</li>
        </ul>
        <div className="text-xs text-gray-700">
          Tipp: Für die meisten Nachrüstungen/Kauf einbruchsicherer Elemente gibt es KfW-Zuschüsse!
        </div>
      </ThemenBox>

      <ThemenBox
        icon={<Info className="text-gray-500 w-7 h-7" />}
        title="Die richtige Materialwahl"
      >
        <ul className="list-disc pl-5 mb-1 space-y-1">
          <li><b>Kunststoff:</b> pflegeleicht &amp; günstig – ideal für Fenster, gute Dämmung möglich.</li>
          <li><b>Holz:</b> sehr gute Wärmedämmung, natürliche Optik, aber mehr Pflegeaufwand.</li>
          <li><b>Aluminium:</b> extrem langlebig, eher für moderne Architektur/Firmengebäude.</li>
          <li><b>Kombis:</b> Holz-Alu oder Kunststoff-Alu vereinen Vorteile und sind immer beliebter.</li>
        </ul>
        <div className="text-xs text-gray-700">Rahmenmaterial, Dichtungen &amp; Verglasung bestimmen gemeinsam die Qualität und Lebensdauer Ihres Fensters oder Ihrer Tür.</div>
      </ThemenBox>

      <ThemenBox
        icon={<Info className="text-emerald-900 w-7 h-7" />}
        title="Wartung &amp; Pflege"
      >
        <ul className="list-disc pl-5 mb-1 space-y-1">
          <li>Regelmäßig alle Dichtungen und Beschläge auf Risse/Verschleiß prüfen &rarr; bessere Lebensdauer und Dichtigkeit!</li>
          <li>Fenster und Türrahmen 1–2 x jährlich säubern, z.B. mit milden Reinigern – kein scharfes Scheuern auf Kunststoff/Alu.</li>
          <li>Schlösser und Scharniere ab und zu ölen, Schließmechanismen kontrollieren.</li>
          <li>Holzrahmen regelmäßig lasieren/streichen, um Witterungsschutz zu erhalten.</li>
        </ul>
      </ThemenBox>

      <ThemenBox
        icon={<Info className="text-blue-900 w-7 h-7" />}
        title="Fördermöglichkeiten & Beratung"
      >
        <ul className="list-disc pl-5 mb-1 space-y-1">
          <li>Für den Austausch alter Fenster und Haustüren können Sie <b>staatliche Zuschüsse (z.B. KfW, BAFA)</b> bekommen.</li>
          <li>Förderung gibt es oft für <b>Energieeffizienz</b> (besserer U-/Ud-Wert), aber auch für <b>Einbruchschutz</b>.</li>
          <li>Wichtig: <b>Erst Antrag stellen, dann Aufträge vergeben!</b> Beratung durch zertifizierten Energieberater oft Pflicht.</li>
          <li>Regionale Programme (Land/Bund) beachten! Mehr dazu im <Link to="/blog/foerdermittel" className="underline text-blue-900 hover:text-blue-700">Fördermittel-Ratgeber</Link>.</li>
        </ul>
      </ThemenBox>
    </>
  );
};

export default FensterTuerenContent;
