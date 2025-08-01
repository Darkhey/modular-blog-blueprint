import { useState } from 'react';
import { FileDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface ResultsPDFExportProps {
  calculatorType: string;
  results: any;
  className?: string;
}

const ResultsPDFExport = ({ calculatorType, results, className = "" }: ResultsPDFExportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDFContent = () => {
    const currentDate = new Date().toLocaleDateString('de-DE');
    
    switch (calculatorType) {
      case 'heating':
        return `
HEIZUNGSMODERNISIERUNG - BERECHNUNGSERGEBNIS
Erstellt am: ${currentDate}

IHRE EINGABEN:
- Wohnfläche: ${results.inputs?.livingSpace || 'N/A'} m²
- Gebäudealter: ${results.inputs?.buildingAge || 'N/A'}
- Heizungsart: ${results.inputs?.heatingType || 'N/A'}

ERGEBNISSE:
- Jährliche Ersparnis: ${results.totalSavingsPerYear ? Math.round(results.totalSavingsPerYear).toLocaleString('de-DE') : 'N/A'} €
- Ersparnis in %: ${results.savingsPercentage ? results.savingsPercentage.toFixed(0) : 'N/A'}%
- Amortisationszeit: ${results.amortizationYears ? Math.round(results.amortizationYears) : 'N/A'} Jahre
- CO₂-Einsparung: ${results.co2Savings ? Math.round(results.co2Savings).toLocaleString('de-DE') : 'N/A'} kg/Jahr

KOSTEN VORHER/NACHHER:
- Kosten vorher: ${results.current?.total ? Math.round(results.current.total).toLocaleString('de-DE') : 'N/A'} €/Jahr
- Kosten nachher: ${results.future?.total ? Math.round(results.future.total).toLocaleString('de-DE') : 'N/A'} €/Jahr

Erstellt mit energieberater-direkt.de
Diese Berechnung ist eine Schätzung basierend auf typischen Durchschnittswerten.
        `;
      case 'insulation':
        return `
DÄMMUNGSBERECHNUNG - BERECHNUNGSERGEBNIS
Erstellt am: ${currentDate}

ERGEBNISSE:
- Investition: ${results.investment ? Math.round(results.investment).toLocaleString('de-DE') : 'N/A'} €
- Jährliche Ersparnis: ${results.savingsPerYear ? Math.round(results.savingsPerYear).toLocaleString('de-DE') : 'N/A'} €
- Amortisationszeit: ${results.amortization ? Math.round(results.amortization) : 'N/A'} Jahre
- CO₂-Einsparung: ${results.co2Savings ? Math.round(results.co2Savings).toLocaleString('de-DE') : 'N/A'} kg/Jahr

Erstellt mit energieberater-direkt.de
Diese Berechnung ist eine Schätzung basierend auf typischen Durchschnittswerten.
        `;
      case 'solar':
        return `
SOLAR-POTENZIAL - BERECHNUNGSERGEBNIS
Erstellt am: ${currentDate}

ERGEBNISSE:
- Anlagengröße: ${results.anlageGroesse || 'N/A'} kWp
- Jährlicher Stromertrag: ${results.stromertrag ? results.stromertrag.toLocaleString('de-DE') : 'N/A'} kWh
- Jährliche Ersparnis: ${results.gesamtersparnis ? results.gesamtersparnis.toLocaleString('de-DE') : 'N/A'} €
- Amortisationszeit: ${results.amortisation || 'N/A'} Jahre

Erstellt mit energieberater-direkt.de
Diese Berechnung ist eine Schätzung basierend auf typischen Durchschnittswerten.
        `;
      default:
        return 'Berechnungsergebnis - energieberater-direkt.de';
    }
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    
    try {
      const content = generatePDFContent();
      const element = document.createElement('a');
      const file = new Blob([content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${calculatorType}-berechnung-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: "Download gestartet",
        description: "Ihr Berechnungsergebnis wurde heruntergeladen.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Beim Download ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className={`bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileDown className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Ergebnis exportieren</span>
          </div>
          <Button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            size="sm"
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-100"
          >
            <Download className="h-4 w-4 mr-1" />
            {isGenerating ? "Erstelle..." : "Als Datei"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsPDFExport;