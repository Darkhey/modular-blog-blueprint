
import { BlogPost } from '@/hooks/useBlogPosts';

interface ArticleBodyProps {
    post: Pick<BlogPost, 'content' | 'slug'>;
}

const daemmstoffeVergleichHTML = `
  <h2>Warum ist Dämmung so wichtig?</h2>
  <p>Ein gut gedämmtes Haus spart nicht nur Energie und Kosten, sondern steigert auch den Wohnkomfort und sorgt für mehr Klimaschutz. Die Wahl des richtigen Dämmstoffs ist daher entscheidend für Ihren Sanierungserfolg.</p>

  <h2>Dämmstoffe im Überblick: Materialien & Einsatzbereiche</h2>
  <ul>
    <li><strong>Mineralwolle (Glas-/Steinwolle):</strong> Sehr gut für Fassaden, Dach und Keller. Hohe Dämmwirkung, nicht brennbar, günstig, aber weniger ökologisch.</li>
    <li><strong>EPS (expandiertes Polystyrol, Styropor):</strong> Beliebt für WDVS-Fassade & Perimeterdämmung. Günstig, feuchteunempfindlich, aber auf Erdöl-Basis und brennbar.</li>
    <li><strong>Holzfaser:</strong> Sehr gute Ökobilanz, feuchtigkeitsregulierend, sommerlicher Hitzeschutz, vielseitig (Dach, Fassade, Innen).</li>
    <li><strong>Zellulose:</strong> Recyclingmaterial (Papier), super für Dach und Gefache (Einblasdämmung), schwer entflammbar.</li>
    <li><strong>Hanf:</strong> Nachwachsende Faser, feuchtigkeitsregulierend, schimmelresistent, sehr nachhaltig.</li>
    <li><strong>Schafwolle:</strong> Guter Schallschutz, nimmt Schadstoffe auf, für Allergiker geeignet, teuer.</li>
    <li><strong>Perlite:</strong> Mineralischer Schüttdämmstoff, ideal für Hohlwände und Dachböden.</li>
    <li><strong>PUR/PIR (Polyurethan):</strong> Sehr niedrige Wärmeleitfähigkeit, dünne Konstruktionen möglich, relativ teuer, nicht ökologisch.</li>
  </ul>

  <h3>Vergleichstabelle: Eigenschaften wichtiger Dämmstoffe</h3>
  <div class="overflow-x-auto mb-4">
    <table class="min-w-full border text-xs md:text-sm">
      <thead>
        <tr>
          <th class="border px-2">Material</th>
          <th class="border px-2">λ-Wert* (W/(mK))</th>
          <th class="border px-2">Brandschutz</th>
          <th class="border px-2">Öko?</th>
          <th class="border px-2">Preis</th>
          <th class="border px-2">Hitzeschutz</th>
          <th class="border px-2">Einsatz</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border px-2">Mineralwolle</td>
          <td class="border px-2">0,032–0,040</td>
          <td class="border px-2">nicht brennbar (A1)</td>
          <td class="border px-2">teils</td>
          <td class="border px-2">günstig</td>
          <td class="border px-2">mittel</td>
          <td class="border px-2">Fassade, Dach, Keller</td>
        </tr>
        <tr>
          <td class="border px-2">EPS (Styropor)</td>
          <td class="border px-2">0,031–0,040</td>
          <td class="border px-2">brennbar (B1)</td>
          <td class="border px-2">nein</td>
          <td class="border px-2">sehr günstig</td>
          <td class="border px-2">gering</td>
          <td class="border px-2">Fassade, Boden</td>
        </tr>
        <tr>
          <td class="border px-2">Holzfaser</td>
          <td class="border px-2">0,036–0,050</td>
          <td class="border px-2">normal entflammbar (B2)</td>
          <td class="border px-2">ja</td>
          <td class="border px-2">hoch</td>
          <td class="border px-2">sehr gut</td>
          <td class="border px-2">Dach, Fassade</td>
        </tr>
        <tr>
          <td class="border px-2">Hanf/Schafwolle</td>
          <td class="border px-2">0,038–0,045</td>
          <td class="border px-2">B2/B1</td>
          <td class="border px-2">ja</td>
          <td class="border px-2">hoch</td>
          <td class="border px-2">gut</td>
          <td class="border px-2">Innen, Dach</td>
        </tr>
        <tr>
          <td class="border px-2">Zellulose</td>
          <td class="border px-2">0,039–0,045</td>
          <td class="border px-2">B2</td>
          <td class="border px-2">ja</td>
          <td class="border px-2">mittel</td>
          <td class="border px-2">sehr gut</td>
          <td class="border px-2">Dach, Gefache</td>
        </tr>
        <tr>
          <td class="border px-2">PUR/PIR</td>
          <td class="border px-2">0,022–0,028</td>
          <td class="border px-2">B2</td>
          <td class="border px-2">nein</td>
          <td class="border px-2">hoch</td>
          <td class="border px-2">mittel</td>
          <td class="border px-2">Dach, Boden, Fassade</td>
        </tr>
        <tr>
          <td class="border px-2">Perlite</td>
          <td class="border px-2">0,055</td>
          <td class="border px-2">A1</td>
          <td class="border px-2">ja</td>
          <td class="border px-2">mittel</td>
          <td class="border px-2">mittel</td>
          <td class="border px-2">Hohlraum, Dachboden</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="text-xs text-gray-500 mb-4">*Je niedriger der λ-Wert, desto besser die Dämmwirkung.</div>

  <h3>Vorteile, Nachteile & Auswahlhilfe</h3>
  <ul>
    <li><strong>Mineralwolle:</strong> Robust, brandsicher, günstig, aber energieintensive Herstellung. Kann Haut reizen.</li>
    <li><strong>EPS:</strong> Kostengünstig, schwer entflammbar, aber keine optimale Ökobilanz, Entsorgung problematisch.</li>
    <li><strong>Holzfaser:</strong> Nachhaltig, sehr guter Hitzeschutz, teuer. Empfindlicher gegen Feuchte.</li>
    <li><strong>Zellulose:</strong> Aus Altpapier, Einblas-Technik, guter Hitzeschutz, ökologisch top.</li>
    <li><strong>Hanf/Schafwolle:</strong> Hervorragend für Allergiker, 100% natürlich, dämmt solide, aber vergleichsweise teuer.</li>
    <li><strong>PUR/PIR:</strong> Beste Dämmwerte bei geringster Dicke, ideal bei Platznot, aber wenig nachhaltig.</li>
    <li><strong>Perlite:</strong> Unverrottbar, nicht brennbar, gut rieselfähig – ideal für schwer zugängliche Hohlräume.</li>
  </ul>

  <h3>Checkliste & praktische Tipps</h3>
  <ul>
    <li>Entscheiden Sie nach <b>Einsatzbereich</b>! (Dach, Fassade, Keller, Innendämmung?)</li>
    <li>Prüfen Sie <strong>Brandschutzanforderungen</strong> – Im Dachbereich besser nicht brennbare Stoffe verwenden.</li>
    <li><b>Sommerlicher Hitzeschutz:</b> Holzfaser und Zellulose dämmen auch gegen Hitze sehr gut.</li>
    <li><b>Förderung:</b> Fast alle genannten Dämmstoffe sind förderfähig (GEG/BEG). Energieberater hilft bei der Antragstellung!</li>
    <li>Keine Dämmung ohne <b>Feuchteschutz!</b> (Sperrschichten, Belüftung beachten!)</li>
    <li>Nachhaltigkeit und Recyclingfähigkeit gewinnen immer mehr an Bedeutung.</li>
  </ul>

  <h3>Häufige Fehler vermeiden</h3>
  <ul>
    <li>Falscher Einbau: Dämmstoff darf keine Lücken oder Feuchtebrücken haben.</li>
    <li>Nicht jeder Dämmstoff eignet sich für jeden Bereich: Immer Produkthinweise beachten.</li>
    <li>Brandschutz unterschätzen – Vorschriften einhalten!</li>
    <li>Förderantrag zu spät stellen (immer vor Beginn beantragen!)</li>
  </ul>

  <h3>Förderung & Beratung</h3>
  <p>
    Staatliche Förderungen (BEG, KfW, BAFA) können bis zu 70% der Kosten abdecken. Voraussetzung: Maßnahmen müssen vor Beginn beantragt werden, oft ist ein zertifizierter Energieberater Pflicht. Details dazu finden Sie in unserem <a class="text-emerald-700 underline" href="/blog/foerdermittel">Fördermittel-Ratgeber &rarr;</a>
  </p>

  <hr>
  <h3>Fazit</h3>
  <p>Jeder Dämmstoff hat Vor- und Nachteile. Eine individuelle Beratung hilft, die beste Wahl für Ihr Haus und Ihr Budget zu treffen. Nachhaltige Dämmstoffe werden immer praxistauglicher und sind perfekt für klimabewusste Sanierer!</p>
`;

const ArticleBody = ({ post }: ArticleBodyProps) => {
    // Nur für den "Dämmstoffe im Vergleich"-Artikel überschreiben wir den Content für die Demo
    const isDaemmstoffe = post.slug === "daemmstoffe-vergleich-2025";
    const content = isDaemmstoffe ? daemmstoffeVergleichHTML : post.content.replace(/\n/g, '<br />');
    return (
        <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default ArticleBody;

