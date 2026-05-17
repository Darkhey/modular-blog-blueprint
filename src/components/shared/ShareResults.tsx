import { useMemo, useState } from 'react';
import { Share2, Copy, CheckCircle, QrCode, Mail } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface ShareResultsProps {
  calculatorType: string;
  results: any;
  /** Optional input state for full reproducibility via the share link */
  inputs?: Record<string, unknown>;
  className?: string;
}

/** Base64-URL safe encoder for share payloads (Unicode-aware). */
function encodePayload(data: unknown): string {
  try {
    const json = JSON.stringify(data);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    return '';
  }
}

const SUMMARIES: Record<string, (r: any) => string> = {
  heating: (r) =>
    `Meine Heizungsmodernisierung: ${Math.round(r?.annualSavings ?? r?.totalSavingsPerYear ?? 0)}€/Jahr Ersparnis, Amortisation in ${Math.round(r?.amortizationPeriod ?? r?.amortizationYears ?? 0)} Jahren.`,
  insulation: (r) =>
    `Meine Dämmung: ${Math.round(r?.investment ?? 0)}€ Investment, ${Math.round(r?.savingsPerYear ?? 0)}€/Jahr Ersparnis, Amortisation in ${Math.round(r?.amortization ?? 0)} Jahren.`,
  solar: (r) =>
    `Meine Solar-Anlage: ${Math.round(r?.jahresertrag ?? r?.estimatedOutput ?? 0)} kWh/Jahr, ${Math.round(r?.gesamtersparnis ?? r?.savings ?? 0)}€/Jahr Ersparnis.`,
  kosten: (r) =>
    `Meine Sanierung: ${Math.round(r?.eigenanteil ?? r?.brutto ?? 0)}€ Eigenanteil nach Förderung.`,
  foerder: (r) =>
    `Mein Förder-Mix: ${Math.round(r?.gesamt ?? 0)}€ Zuschuss (${Math.round(r?.prozent ?? 0)} %).`,
  roi: (r) =>
    `Mein ROI: Amortisation in ${r?.breakEven ?? '—'} Jahren, Netto ${Math.round(r?.netto ?? 0)}€.`,
  'energie-check': (r) =>
    `Mein Energie-Check: Score ${r?.score ?? 0}/100 (${r?.ampel ?? '—'}).`,
};

const ShareResults = ({ calculatorType, results, inputs, className = '' }: ShareResultsProps) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const summary = useMemo(() => {
    const fn = SUMMARIES[calculatorType];
    return (fn ? fn(results) : 'Meine Energieberatung – berechnet auf sanieren-sparen.de').trim();
  }, [calculatorType, results]);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const base = `${window.location.origin}${window.location.pathname}`;
    const payload = encodePayload({ t: calculatorType, r: results, i: inputs, v: 1 });
    return payload ? `${base}#share=${payload}` : window.location.href;
  }, [calculatorType, results, inputs]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({ title: 'Link kopiert', description: 'Share-Link wurde in die Zwischenablage kopiert.' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Fehler', description: 'Kopieren nicht möglich.', variant: 'destructive' });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mein Sanierungs-Ergebnis',
          text: summary,
          url: shareUrl,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopyLink();
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('Mein Sanierungs-Ergebnis');
    const body = encodeURIComponent(`${summary}\n\nHier anschauen:\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const downloadQr = () => {
    const svg = document.getElementById('share-qr-svg') as SVGSVGElement | null;
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, size, size);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `sanierung-${calculatorType}-qr.png`;
      a.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <Card className={`bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border-emerald-200/60 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-foreground">Ergebnis teilen</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <QrCode className="h-4 w-4 mr-1" /> Link & QR
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Ergebnis teilen</DialogTitle>
                  <DialogDescription>{summary}</DialogDescription>
                </DialogHeader>

                <div className="flex justify-center py-2">
                  <div className="bg-white p-3 rounded-lg border">
                    <QRCodeSVG
                      id="share-qr-svg"
                      value={shareUrl}
                      size={192}
                      level="M"
                      marginSize={2}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Share-Link</label>
                  <div className="flex gap-2">
                    <Input value={shareUrl} readOnly className="text-xs" onFocus={(e) => e.currentTarget.select()} />
                    <Button size="sm" variant="secondary" onClick={handleCopyLink}>
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={downloadQr}>
                    <QrCode className="h-4 w-4 mr-1" /> QR als PNG
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleEmail}>
                    <Mail className="h-4 w-4 mr-1" /> E-Mail
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleNativeShare}>
                    <Share2 className="h-4 w-4 mr-1" /> Teilen
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={handleNativeShare} size="sm" variant="outline">
              <Share2 className="h-4 w-4 mr-1" /> Teilen
            </Button>
            <Button onClick={handleCopyLink} size="sm" variant="outline">
              {copied ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? 'Kopiert' : 'Kopieren'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareResults;
