import { BlogPost } from '@/hooks/useBlogPosts';
import { ArticleSectionBox } from "./ArticleSectionBox";
import InsulationComparisonTable from "./InsulationComparisonTable";
import ChecklistBox from "./ChecklistBox";
import MistakesWarningBox from "./MistakesWarningBox";

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
    const isDaemmstoffe = post.slug === "daemmstoffe-vergleich-2025";

    if (!isDaemmstoffe) {
      return (
        <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      );
    }

    return (
      <div className="prose max-w-none prose-lg mb-12">
        <h2 className="text-3xl font-bold text-emerald-800 mb-4">Dämmstoffe im Vergleich: Mineralwolle, EPS, Holzfaser &amp; mehr</h2>
        <p className="text-lg mb-6 text-gray-700">
          Für eine energieeffiziente Sanierung ist die Wahl des richtigen Dämmstoffs entscheidend. Hier finden Sie einen ausführlichen Überblick zu Eigenschaften, Einsatzbereichen, Vorteilen, Nachteilen und Fördermöglichkeiten der wichtigsten Materialien.
        </p>

        <ArticleSectionBox variant="info" title="Warum ist Dämmung so wichtig?">
          <p>
            Ein gut gedämmtes Haus spart nicht nur Energie und Kosten, sondern steigert auch den Wohnkomfort und schützt das Klima. Jedes Gebäude ist anders – daher lohnt sich ein Blick auf die verschiedenen Dämmstoffe und deren Eigenschaften.
          </p>
        </ArticleSectionBox>

        <h3 className="mt-5">Wichtige Dämmstoffe &amp; Materialien im Überblick</h3>
        <div className="space-y-3">
          <ArticleSectionBox variant="success" title="Mineralwolle (Glaswolle, Steinwolle)">
            <ul className="list-disc pl-4 text-gray-700">
              <li>Sehr häufiger Allrounder für Fassaden, Dach und Keller</li>
              <li>Hervorragende Dämmwirkung (λ ab 0,032 W/(mK)), nicht brennbar nach DIN 4102 (A1)</li>
              <li>Kostengünstig, aber energieintensive Produktion, mäßige Ökobilanz</li>
              <li>Vorsicht bei Verarbeitung: Fasern können Haut reizen</li>
            </ul>
          </ArticleSectionBox>
          <ArticleSectionBox variant="info" title="EPS (Styropor)">
            <ul className="list-disc pl-4 text-gray-700">
              <li>Sehr beliebt für Fassaden (WDVS) und Perimeterdämmung</li>
              <li>Günstig, feuchteunempfindlich, flexibel einsetzbar</li>
              <li>Basiert auf Erdöl, brennbar (B1), problematische Entsorgung</li>
            </ul>
          </ArticleSectionBox>
          <ArticleSectionBox variant="success" title="Holzfaser">
            <ul className="list-disc pl-4 text-gray-700">
              <li>Besonders nachhaltig, sehr gute Ökobilanz</li>
              <li>Guter sommerlicher Hitzeschutz und Feuchteregulierung</li>
              <li>Vielseitig (Dach, Fassade, Innen), relativ teuer</li>
              <li>Empfindlich gegen dauerhafte Durchfeuchtung</li>
            </ul>
          </ArticleSectionBox>
          <ArticleSectionBox variant="success" title="Hanf &amp; Schafwolle">
            <ul className="list-disc pl-4 text-gray-700">
              <li>100% natürlich, für Allergiker geeignet</li>
              <li>Feuchteregulierend, schimmelresistent, schallabsorbierend</li>
              <li>Teurer, aber sehr nachhaltig</li>
            </ul>
          </ArticleSectionBox>
          <ArticleSectionBox variant="success" title="Zellulose">
            <ul className="list-disc pl-4 text-gray-700">
              <li>Recyclingmaterial (Altpapier), ökologisch top</li>
              <li>Einblasdämmung ideal für Dach und Gefache</li>
              <li>Schwer entflammbar, sehr guter Hitzeschutz</li>
            </ul>
          </ArticleSectionBox>
          <ArticleSectionBox variant="info" title="PUR/PIR">
            <ul className="list-disc pl-4 text-gray-700">
              <li>Synthetischer Dämmstoff mit sehr niedriger Wärmeleitfähigkeit (ab 0,022)</li>
              <li>Erlaubt schlanke Aufbauten, ideal bei Platznot</li>
              <li>Relativ teuer, nicht ökologisch</li>
            </ul>
          </ArticleSectionBox>
          <ArticleSectionBox variant="info" title="Perlite">
            <ul className="list-disc pl-4 text-gray-700">
              <li>Mineralischer Schüttdämmstoff, ideal für schwer zugängliche Hohlwände</li>
              <li>Unverrottbar, nicht brennbar, mittlere Dämmwirkung</li>
              <li>Gut recycelbar</li>
            </ul>
          </ArticleSectionBox>
        </div>

        <h3 className="mt-8 mb-2 font-bold text-xl text-emerald-800">Vergleichstabelle: Eigenschaften wichtiger Dämmstoffe</h3>
        <InsulationComparisonTable />

        <ArticleSectionBox variant="success" title="Vorteile &amp; Nachteile auf einen Blick">
          <ul className="list-none space-y-1 pl-0">
            <li>
              <span className="text-emerald-700 font-semibold">Mineralwolle: </span>
              Robust, brandsicher, günstig, aber energieintensive Herstellung. Kann bei Verarbeitung Haut reizen.
            </li>
            <li>
              <span className="text-blue-700 font-semibold">EPS: </span>
              Kostengünstig, schwer entflammbar, aber Erdöl-basiert, problematische Entsorgung.
            </li>
            <li>
              <span className="text-emerald-700 font-semibold">Holzfaser: </span>
              Nachhaltig, sehr guter Hitzeschutz, relativ teuer, empfindlich gegen Feuchte.
            </li>
            <li>
              <span className="text-emerald-700 font-semibold">Zellulose: </span>
              Recyclingmaterial, Einblas-Technik, sehr guter Hitzeschutz, ökologisch top.
            </li>
            <li>
              <span className="text-emerald-700 font-semibold">Hanf/Schafwolle: </span>
              Für Allergiker, natürlich, solide Dämmung, vergleichsweise teuer.
            </li>
            <li>
              <span className="text-blue-700 font-semibold">PUR/PIR: </span>
              Beste Dämmwerte bei geringster Dicke, wenig nachhaltig.
            </li>
            <li>
              <span className="text-emerald-700 font-semibold">Perlite: </span>
              Nicht brennbar, ideal für Hohlräume, gut recycelbar.
            </li>
          </ul>
        </ArticleSectionBox>

        <ChecklistBox>
          <li>Nach Einsatzbereich entscheiden (Dach, Fassade, Keller, Innen)?</li>
          <li>Brandschutzanforderungen prüfen – Dach: besser nicht brennbar!</li>
          <li>Sommerlicher Hitzeschutz: Holzfaser und Zellulose sind top!</li>
          <li>Förderung möglich? (GEG/BEG). Antrag immer <b>vorher</b> stellen!</li>
          <li>Feuchteschutz beachten (Sperrschichten, Belüftung!)</li>
          <li>Nachhaltigkeit + Recyclingfähigkeit gewinnen immer mehr Bedeutung!</li>
        </ChecklistBox>

        <MistakesWarningBox>
          <li>Dämmstoff darf keine Lücken oder Feuchtebrücken haben.</li>
          <li>Produkthinweise beachten – nicht jedes Material passt überall.</li>
          <li>Brandschutz-Vorschriften einhalten, vor allem im Dach!</li>
          <li>Förderantrag <b>vor</b> dem Beginn einreichen!</li>
        </MistakesWarningBox>

        <ArticleSectionBox variant="info" title="Förderung &amp; Beratung">
          <p>
            Staatliche Förderungen (BEG, KfW, BAFA) decken bis zu 70% der Kosten ab.
            <br />
            Voraussetzung: Maßnahmen <b>vor</b> Beginn beantragen!
            <br />
            Für viele Programme ist ein zertifizierter Energieberater Pflicht.
            <br />
            <a href="/blog/foerdermittel" className="text-emerald-700 underline hover:text-emerald-900">
              Mehr dazu in unserem Fördermittel-Ratgeber &rarr;
            </a>
          </p>
        </ArticleSectionBox>

        <hr className="my-8" />

        <p className="font-semibold text-lg">
          <strong>Fazit:</strong>  
          Jeder Dämmstoff hat Vor- und Nachteile. Für die optimale Dämmung und Fördermöglichkeiten empfiehlt sich immer eine individuelle Beratung!
          <br />
          Nachhaltige, wohngesunde Dämmstoffe sind heute praxistauglich und gewinnen für klimabewusste Sanierer zunehmend an Bedeutung.
        </p>
      </div>
    );
};

export default ArticleBody;
