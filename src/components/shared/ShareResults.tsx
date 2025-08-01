import { useState } from 'react';
import { Share2, Link, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface ShareResultsProps {
  calculatorType: string;
  results: any;
  className?: string;
}

const ShareResults = ({ calculatorType, results, className = "" }: ShareResultsProps) => {
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    switch (calculatorType) {
      case 'heating':
        return `Meine Heizungsmodernisierung: ${results.totalSavingsPerYear ? Math.round(results.totalSavingsPerYear) : 'N/A'}€/Jahr Ersparnis, Amortisation in ${results.amortizationYears ? Math.round(results.amortizationYears) : 'N/A'} Jahren. Berechnet auf energieberater-direkt.de`;
      case 'insulation':
        return `Meine Dämmung: ${results.investment ? Math.round(results.investment) : 'N/A'}€ Investment, ${results.savingsPerYear ? Math.round(results.savingsPerYear) : 'N/A'}€/Jahr Ersparnis, Amortisation in ${results.amortization ? Math.round(results.amortization) : 'N/A'} Jahren. Berechnet auf energieberater-direkt.de`;
      case 'solar':
        return `Meine Solar-Anlage: ${results.estimatedOutput ? Math.round(results.estimatedOutput) : 'N/A'} kWh/Jahr, ${results.savings ? Math.round(results.savings) : 'N/A'}€/Jahr Ersparnis, Amortisation in ${results.amortisation ? results.amortisation : 'N/A'} Jahren. Berechnet auf energieberater-direkt.de`;
      default:
        return 'Meine Energieberatung - berechnet auf energieberater-direkt.de';
    }
  };

  const handleCopyLink = async () => {
    const shareText = generateShareText();
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast({
        title: "Link kopiert!",
        description: "Der Ergebnislink wurde in die Zwischenablage kopiert.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Fehler",
        description: "Link konnte nicht kopiert werden.",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    const shareText = generateShareText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meine Energieberatung',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled sharing or error occurred
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Card className={`bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Ergebnis teilen</span>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleNativeShare}
              size="sm"
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Teilen
            </Button>
            <Button
              onClick={handleCopyLink}
              size="sm"
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 mr-1" />
              ) : (
                <Copy className="h-4 w-4 mr-1" />
              )}
              {copied ? "Kopiert" : "Kopieren"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareResults;