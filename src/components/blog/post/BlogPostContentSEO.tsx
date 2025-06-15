
import { BlogPost } from '@/hooks/useBlogPosts';

interface BlogPostContentSEOProps {
  post: BlogPost;
}

const BlogPostContentSEO = ({ post }: BlogPostContentSEOProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      {/* H1 is already handled in BlogPostHeader */}
      
      <section id="einfuehrung" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Was macht moderne Türen aus?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Moderne Türen vereinen <strong>Sicherheit, Energieeffizienz und Design</strong> in einem Element. 
          Sie sind nicht nur funktional, sondern tragen maßgeblich zur Energiebilanz und zum Wohnkomfort bei.
        </p>
        <p className="text-gray-700 leading-relaxed">
          In diesem umfassenden Ratgeber vergleichen wir verschiedene Türarten, Materialien und 
          zeigen Ihnen, worauf Sie beim Kauf achten sollten.
        </p>
      </section>

      <section id="tueren-arten" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Türen-Arten im Überblick</h2>
        
        <h3 className="text-xl font-semibold mb-3">Haustüren</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Sicherheitstüren:</strong> RC2-RC3 Widerstandsklasse für optimalen Einbruchschutz</li>
          <li><strong>Energieeffiziente Türen:</strong> Ud-Wert unter 1,3 W/(m²K) für beste Dämmung</li>
          <li><strong>Design-Türen:</strong> Individuelle Gestaltung mit Glas, Edelstahl oder Holz</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Innentüren</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Zimmertüren:</strong> Schallschutz und Raumtrennung</li>
          <li><strong>Schiebetüren:</strong> Platzsparend und modern</li>
          <li><strong>Falttüren:</strong> Flexible Raumaufteilung</li>
        </ul>
      </section>

      <section id="materialien" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Materialien im Vergleich</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">Kunststoff-Türen</h4>
            <ul className="text-sm space-y-1">
              <li>✅ Pflegeleicht und günstig</li>
              <li>✅ Gute Wärmedämmung möglich</li>
              <li>❌ Begrenzte Designvielfalt</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">Holz-Türen</h4>
            <ul className="text-sm space-y-1">
              <li>✅ Natürliche, warme Optik</li>
              <li>✅ Sehr gute Dämmwerte</li>
              <li>❌ Höherer Pflegeaufwand</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="kosten" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Kosten & Preisvergleich</h2>
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold mb-3">Durchschnittliche Preise (inkl. Einbau):</h4>
          <ul className="space-y-2">
            <li><strong>Kunststoff-Haustür:</strong> 800 - 2.500 €</li>
            <li><strong>Holz-Haustür:</strong> 1.500 - 4.000 €</li>
            <li><strong>Aluminium-Haustür:</strong> 2.000 - 5.000 €</li>
            <li><strong>Sicherheitstür RC2:</strong> +300 - 800 € Aufpreis</li>
          </ul>
        </div>
      </section>

      <section id="energieeffizienz" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Energieeffizienz & Förderung</h2>
        <p className="mb-4">
          <strong>Energieeffiziente Türen</strong> können bis zu 25% der Heizkosten einsparen. 
          Achten Sie auf diese Kennwerte:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Ud-Wert:</strong> Unter 1,3 W/(m²K) für Förderfähigkeit</li>
          <li><strong>Luftdichtheit:</strong> Klasse 4 nach DIN EN 12207</li>
          <li><strong>Wärmeschutz:</strong> Mehrfachverriegelung und Dämmkern</li>
        </ul>
      </section>

      <section id="sicherheit" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Sicherheit & Einbruchschutz</h2>
        <p className="mb-4">
          Die <strong>Widerstandsklassen (RC)</strong> definieren den Einbruchschutz:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2">
            <li><strong>RC1:</strong> Basis-Schutz gegen Gelegenheitstäter</li>
            <li><strong>RC2:</strong> Empfohlen für Einfamilienhäuser (3 Min. Widerstand)</li>
            <li><strong>RC3:</strong> Höchster Schutz für gefährdete Bereiche (5 Min. Widerstand)</li>
          </ul>
        </div>
      </section>

      <section id="kaufberatung" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Kaufberatung & Checkliste</h2>
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold mb-3">Vor dem Kauf prüfen:</h4>
          <ul className="space-y-2">
            <li>☐ Ud-Wert unter 1,3 W/(m²K) für Förderung</li>
            <li>☐ Sicherheitsklasse RC2 oder höher</li>
            <li>☐ CE-Kennzeichnung und Qualitätszertifikat</li>
            <li>☐ Fachgerechter Einbau durch zertifizierten Betrieb</li>
            <li>☐ Garantieleistungen und Service</li>
          </ul>
        </div>
      </section>

      <section id="fazit" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Fazit: Die richtige Tür finden</h2>
        <p className="text-gray-700 leading-relaxed">
          Moderne Türen sind eine <strong>lohnende Investition</strong> in Komfort, Sicherheit und Energieeffizienz. 
          Wählen Sie je nach Anforderung zwischen verschiedenen Materialien und achten Sie auf Qualitätszertifikate. 
          Mit den richtigen Türen sparen Sie langfristig Energiekosten und erhöhen die Sicherheit Ihres Zuhauses.
        </p>
      </section>
    </div>
  );
};

export default BlogPostContentSEO;
