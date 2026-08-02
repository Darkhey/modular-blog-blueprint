import { useState } from 'react';
import { FileDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { siteConfig } from '@/config/site.config';

interface ResultsPDFExportProps {
  calculatorType: string;
  results: any;
  className?: string;
}

const TITLES: Record<string, string> = {
  heating: 'Heizungsmodernisierung – Berechnungsergebnis',
  insulation: 'Dämmungsberechnung – Berechnungsergebnis',
  solar: 'Solar-Potenzial – Berechnungsergebnis',
  kostenrechner: 'Kosten-Vergleichsrechner – Ergebnis',
  kombi: 'Kombi-Rechner (Heizung + Hülle) – Ergebnis',
  roi: 'Amortisations-Rechner – Wirtschaftlichkeitsbericht',
  foerder: 'Förderrechner 2026 – Zuschuss-Übersicht',
  'energie-check': 'Energie-Check – Effizienz-Auswertung',
};


const num = (v: any, digits = 0) =>
  typeof v === 'number' && isFinite(v)
    ? v.toLocaleString('de-DE', { maximumFractionDigits: digits })
    : 'k. A.';

const ResultsPDFExport = ({ calculatorType, results, className = '' }: ResultsPDFExportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  /** Baut die Zeilenstruktur des Berichts: Abschnitte mit Label/Wert-Paaren */
  const buildSections = (): { heading: string; rows: [string, string][] }[] => {
    switch (calculatorType) {
      case 'heating':
        return [
          {
            heading: 'Ihre Eingaben',
            rows: [
              ['Wohnfläche', `${results.inputs?.livingSpace ?? 'k. A.'} m²`],
              ['Gebäudealter', `${results.inputs?.buildingAge ?? 'k. A.'}`],
              ['Heizungsart', `${results.inputs?.heatingType ?? 'k. A.'}`],
            ],
          },
          {
            heading: 'Ergebnisse',
            rows: [
              ['Jährliche Ersparnis', `${num(results.annualSavings ?? results.totalSavingsPerYear)} EUR`],
              ['Ersparnis in %', results.savingsPercentage ? `${results.savingsPercentage.toFixed(0)} %` : 'k. A.'],
              ['Amortisationszeit', `${num(results.amortizationPeriod ?? results.amortizationYears)} Jahre`],
              ['CO2-Einsparung', `${num(results.co2Savings)} kg/Jahr`],
              ['Kosten vorher', `${num(results.current?.total)} EUR/Jahr`],
              ['Kosten nachher', `${num(results.future?.total)} EUR/Jahr`],
            ],
          },
        ];
      case 'insulation':
        return [
          {
            heading: 'Ergebnisse',
            rows: [
              ['Investition', `${num(results.investment)} EUR`],
              ['Jährliche Ersparnis', `${num(results.savingsPerYear)} EUR`],
              ['Amortisationszeit', `${num(results.amortization)} Jahre`],
              ['CO2-Einsparung', `${num(results.co2Savings)} kg/Jahr`],
            ],
          },
        ];
      case 'solar':
        return [
          {
            heading: 'Ergebnisse',
            rows: [
              ['Anlagengröße', `${results.anlageGroesse ?? 'k. A.'} kWp`],
              ['Jährlicher Stromertrag', `${num(results.jahresertrag)} kWh`],
              ['Jährliche Ersparnis', `${num(results.gesamtersparnis)} EUR`],
              [
                'Amortisationszeit',
                `${results.amortisationMitSpeicher ?? results.amortisationOhneSpeicher ?? results.amortisation ?? 'k. A.'} Jahre`,
              ],
            ],
          },
        ];
      case 'kostenrechner':
        return [
          {
            heading: 'Ausgewählte Gewerke',
            rows: (results?.gewerke || []).map((g: any): [string, string] => [
              `${g.label} (${g.menge} ${g.unit})`,
              `Ø ${num(g.bruttoAvg)} EUR · Förderung -${num(g.foerderung)} EUR · Eigenanteil ${num(g.nettoAvg)} EUR`,
            ]),
          },
          {
            heading: 'Gesamt',
            rows: [
              ['Bruttokosten (Ø)', `${num(results?.totalBruttoAvg)} EUR`],
              ['Förderabzug', `-${num(results?.totalFoerderung)} EUR`],
              ['Eigenanteil (Ø)', `${num(results?.totalNettoAvg)} EUR`],
            ],
          },
        ];
      case 'kombi':
        return [
          {
            heading: 'Ihre Eingaben',
            rows: [
              ['Wohnfläche', `${num(results?.inputs?.wohnflaeche)} m²`],
              ['Baujahr-Klasse', `${results?.inputs?.baujahr ?? 'k. A.'}`],
              ['Aktueller Brennstoff', `${results?.inputs?.brennstoff ?? 'k. A.'}`],
              ['Hüllen-Maßnahmen', `${results?.inputs?.massnahmen || 'keine'}`],
              ['Wärmeerzeuger neu', `${results?.inputs?.heizung ?? 'k. A.'}`],
              ['Szenario / CO2-Pfad', `${results?.inputs?.szenario ?? 'k. A.'} / ${results?.inputs?.co2Pfad ?? 'k. A.'}`],
            ],
          },
          {
            heading: 'Kombi-Ergebnis',
            rows: [
              ['Investition brutto', `${num(results?.investBrutto)} EUR`],
              ['Konsolidierte Förderung', `${num(results?.foerderungGesamt)} EUR`],
              ['Eigenanteil', `${num(results?.netto)} EUR`],
              ['Amortisation', results?.amortisationJahre != null ? `${results.amortisationJahre.toFixed(1)} Jahre` : '> 20 Jahre'],
              ['Ersparnis Jahr 1', `${num(results?.ersparnisJahr1)} EUR`],
              ['CO2-Vermeidung (20 J.)', `${num(results?.co2VermeidungTonnen, 1)} t`],
              ['Endenergie vorher', `${num(results?.energieVorher)} kWh/a`],
              ['Endenergie nachher', `${num(results?.energieNachher)} kWh/a`],
              ['Hüllen-Einsparung', `-${num((results?.huelleEinsparAnteil ?? 0) * 100)} %`],
            ],
          },
          {
            heading: 'Förder-Aufschlüsselung 2026',
            rows: [
              ['Hülle-Zuschuss', `${num(results?.huelleZuschuss)} EUR`],
              ['Heizungs-Zuschuss (KfW 458)', `${num(results?.heizungZuschuss)} EUR`],
              ['Regionaler Top-up', `${num(results?.regionalTopup)} EUR`],
              ['Summe Förderung', `${num(results?.foerderungGesamt)} EUR`],
            ],
          },
        ];
      default:
        return [{ heading: 'Ergebnis', rows: [] }];
    }
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 48;
      const maxWidth = pageWidth - margin * 2;
      let y = 0;

      // Kopfbereich (Markenfarbe Emerald)
      doc.setFillColor(5, 150, 105);
      doc.rect(0, 0, pageWidth, 92, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(TITLES[calculatorType] || 'Berechnungsergebnis', margin, 46, { maxWidth });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(
        `${siteConfig.projectName} · ${siteConfig.domain} · Erstellt am ${new Date().toLocaleDateString('de-DE')}`,
        margin,
        68,
      );

      y = 130;
      doc.setTextColor(30, 41, 59);

      const ensureSpace = (needed: number) => {
        if (y + needed > pageHeight - 70) {
          doc.addPage();
          y = margin + 10;
        }
      };

      buildSections().forEach((section) => {
        if (!section.rows.length) return;
        ensureSpace(48);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(5, 150, 105);
        doc.text(section.heading, margin, y);
        y += 8;
        doc.setDrawColor(209, 213, 219);
        doc.line(margin, y, pageWidth - margin, y);
        y += 18;

        doc.setFontSize(10.5);
        doc.setTextColor(30, 41, 59);
        section.rows.forEach(([label, value]) => {
          const valueLines = doc.splitTextToSize(String(value), maxWidth * 0.5);
          const labelLines = doc.splitTextToSize(String(label), maxWidth * 0.45);
          const blockHeight = Math.max(valueLines.length, labelLines.length) * 14;
          ensureSpace(blockHeight + 6);
          doc.setFont('helvetica', 'normal');
          doc.text(labelLines, margin, y);
          doc.setFont('helvetica', 'bold');
          doc.text(valueLines, pageWidth - margin, y, { align: 'right' });
          y += blockHeight + 6;
        });
        y += 14;
      });

      // Fußnote auf allen Seiten
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(120, 128, 140);
        doc.text(
          'Diese Berechnung ist eine unverbindliche Schätzung auf Basis typischer Durchschnittswerte (Stand 2026).',
          margin,
          pageHeight - 44,
          { maxWidth },
        );
        doc.text(`${siteConfig.siteUrl}  ·  Seite ${i} von ${pageCount}`, margin, pageHeight - 30);
      }

      doc.save(`${calculatorType}-bericht-${new Date().toISOString().split('T')[0]}.pdf`);

      toast({
        title: 'PDF erstellt',
        description: 'Ihr Bericht wurde heruntergeladen.',
      });
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Beim Erstellen des PDF ist ein Fehler aufgetreten.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className={`border-primary/30 bg-primary/5 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileDown className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Ergebnis als PDF-Bericht</span>
          </div>
          <Button onClick={handleDownloadPDF} disabled={isGenerating} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            {isGenerating ? 'Erstelle…' : 'PDF herunterladen'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsPDFExport;
