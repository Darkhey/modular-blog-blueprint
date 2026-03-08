
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { ClipboardList, FileDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';

interface ChecklistCategory {
  id: string;
  title: string;
  downloadHref?: string;
  items: { id: string; label: string }[];
}

const checklists: ChecklistCategory[] = [
  {
    id: 'vor',
    title: 'Vor der Sanierung – Planung & Vorbereitung',
    downloadHref: '/downloads/pre-renovation-checklist.pdf',
    items: [
      { id: 'v1', label: 'Sanierungsziele definieren (Energieeffizienz, Komfort, Werterhalt)' },
      { id: 'v2', label: 'Energieberater hinzuziehen und iSFP erstellen lassen' },
      { id: 'v3', label: 'Kostenrahmen und Finanzierung klären' },
      { id: 'v4', label: 'Fördermittel recherchieren und rechtzeitig beantragen' },
      { id: 'v5', label: 'Baugenehmigungen prüfen (je nach Maßnahme und Bundesland)' },
      { id: 'v6', label: 'Mindestens 3 Angebote von Fachbetrieben einholen' },
      { id: 'v7', label: 'Zeitplan erstellen und Reihenfolge der Maßnahmen festlegen' },
      { id: 'v8', label: 'Wohnalternative während der Bauphase organisieren (falls nötig)' },
      { id: 'v9', label: 'Nachbarn über Baumaßnahmen informieren' },
      { id: 'v10', label: 'Versicherungsschutz während der Bauphase klären' },
    ],
  },
  {
    id: 'waehrend',
    title: 'Während der Sanierung – Bauüberwachung',
    downloadHref: '/downloads/during-renovation-checklist.pdf',
    items: [
      { id: 'w1', label: 'Regelmäßige Baustellenbegehungen dokumentieren (Fotos/Protokoll)' },
      { id: 'w2', label: 'Materiallieferungen und -qualität kontrollieren' },
      { id: 'w3', label: 'Abweichungen vom Plan sofort mit Handwerkern besprechen' },
      { id: 'w4', label: 'Zusatzkosten schriftlich vereinbaren (Nachträge)' },
      { id: 'w5', label: 'Zwischenabnahmen bei verdeckten Arbeiten durchführen' },
      { id: 'w6', label: 'Lüftungskonzept und Luftdichtheit kontrollieren lassen' },
      { id: 'w7', label: 'Elektro- und Sanitärinstallationen vor Verschließen prüfen' },
      { id: 'w8', label: 'Bautagebuch führen (Wetter, Arbeitsfortschritt, Probleme)' },
    ],
  },
  {
    id: 'nach',
    title: 'Nach der Sanierung – Abnahme & Nachsorge',
    downloadHref: '/downloads/post-renovation-checklist.pdf',
    items: [
      { id: 'n1', label: 'Formelle Abnahme mit Mängelliste durchführen' },
      { id: 'n2', label: 'Mängelbeseitigung mit Frist schriftlich vereinbaren' },
      { id: 'n3', label: 'Schlussrechnung erst nach Mängelbeseitigung vollständig bezahlen' },
      { id: 'n4', label: 'Förderanträge abschließen und Verwendungsnachweis einreichen' },
      { id: 'n5', label: 'Neuen Energieausweis ausstellen lassen' },
      { id: 'n6', label: 'Alle Unterlagen, Garantien und Bedienungsanleitungen archivieren' },
      { id: 'n7', label: 'Heizungsanlage optimieren und hydraulischen Abgleich durchführen' },
      { id: 'n8', label: 'Lüftungsverhalten an neue Gebäudehülle anpassen' },
      { id: 'n9', label: 'Energieverbrauch in den ersten Monaten überwachen und dokumentieren' },
    ],
  },
];

const SanierungsChecklistenPage = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, Set<string>>>({});

  const toggle = (categoryId: string, itemId: string) => {
    setCheckedItems((prev) => {
      const catSet = new Set(prev[categoryId] || []);
      catSet.has(itemId) ? catSet.delete(itemId) : catSet.add(itemId);
      return { ...prev, [categoryId]: catSet };
    });
  };

  const getProgress = (cat: ChecklistCategory) => {
    const checked = checkedItems[cat.id]?.size || 0;
    return cat.items.length > 0 ? Math.round((checked / cat.items.length) * 100) : 0;
  };

  const totalItems = checklists.reduce((s, c) => s + c.items.length, 0);
  const totalChecked = checklists.reduce((s, c) => s + (checkedItems[c.id]?.size || 0), 0);
  const totalProgress = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Sanierung planen – Die komplette Checkliste',
    description: 'Schritt-für-Schritt-Checklisten für Ihre Sanierung: Planung, Bauüberwachung und Abnahme.',
    step: checklists.map((cat) => ({
      '@type': 'HowToSection',
      name: cat.title,
      itemListElement: cat.items.map((item, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        text: item.label,
      })),
    })),
  };

  return (
    <>
      <Helmet>
        <title>Sanierungschecklisten: Planung, Bauüberwachung & Abnahme</title>
        <meta name="description" content="Kostenlose interaktive Sanierungschecklisten – Vor, während und nach der Sanierung. Mit Fortschrittsanzeige und PDF-Download." />
        <link rel="canonical" href="https://sanieren-sparen.de/sanierungschecklisten" />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <RatgeberHero icon={ClipboardList} title="Sanierungschecklisten" subtitle="Nichts vergessen – interaktive Checklisten für jede Phase Ihrer Sanierung" />

      {/* Total Progress */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-foreground">Gesamtfortschritt</h2>
              <Badge variant="secondary">{totalChecked} / {totalItems} erledigt</Badge>
            </div>
            <Progress value={totalProgress} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">{totalProgress}% abgeschlossen</p>
          </div>
        </div>
      </section>

      {/* Checklists */}
      <section className="py-4 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <Accordion type="multiple" defaultValue={['vor']} className="space-y-4">
            {checklists.map((cat) => {
              const progress = getProgress(cat);
              return (
                <AccordionItem key={cat.id} value={cat.id} className="border rounded-xl bg-card px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="font-semibold text-foreground text-left">{cat.title}</span>
                      <Badge variant="outline" className="ml-auto mr-2">{progress}%</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Progress value={progress} className="h-2 mb-4" />
                    <div className="space-y-2 mb-4">
                      {cat.items.map((item) => {
                        const isChecked = checkedItems[cat.id]?.has(item.id) || false;
                        return (
                          <label key={item.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                            <Checkbox checked={isChecked} onCheckedChange={() => toggle(cat.id, item.id)} className="mt-0.5" />
                            <span className={`text-sm leading-relaxed ${isChecked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{item.label}</span>
                          </label>
                        );
                      })}
                    </div>
                    {cat.downloadHref && (
                      <a href={cat.downloadHref} download className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium">
                        <FileDown className="w-4 h-4" /> Als PDF herunterladen
                      </a>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Bereit für die Sanierung?</h2>
          <p className="text-muted-foreground mb-6">Ermitteln Sie in 6 Schritten Ihren persönlichen Sanierungsbedarf.</p>
          <Button asChild size="lg">
            <Link to="/sanierungscheck">Zum Sanierungscheck <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default SanierungsChecklistenPage;
