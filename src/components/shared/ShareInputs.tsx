import { useState } from 'react';
import { Link2, Copy, CheckCircle, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useShareableInputs } from '@/hooks/useShareableInputs';
import type { InputValues } from '@/lib/shareableInputs';

interface ShareInputsProps {
  /** Aktuelle Eingaben des Rechners */
  values: InputValues;
  /** Wiederherstellung beim Öffnen eines geteilten Links */
  onRestore?: (restored: InputValues) => void;
  label?: string;
  className?: string;
}

/**
 * Button + Dialog: aktuelle Rechner-Eingaben als lesbare URL-Parameter teilen.
 */
const ShareInputs = ({ values, onRestore, label = 'Eingaben teilen', className = '' }: ShareInputsProps) => {
  const { shareUrl } = useShareableInputs({ values, onRestore });
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({ title: 'Link kopiert', description: 'Der Link enthält alle aktuellen Eingaben.' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Fehler', description: 'Kopieren nicht möglich.', variant: 'destructive' });
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Meine Rechner-Eingaben', url: shareUrl });
        return;
      } catch {
        /* abgebrochen */
      }
    }
    copy();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" size="sm" variant="outline" className={className}>
          <Link2 className="h-4 w-4 mr-1" /> {label}
        </Button>

      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Eingaben teilen</DialogTitle>
          <DialogDescription>
            Dieser Link speichert alle aktuellen Eingaben als URL-Parameter. Wer ihn öffnet, sieht exakt Ihre Konfiguration.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center py-2">
          <div className="bg-white p-3 rounded-lg border">
            <QRCodeSVG id="share-inputs-qr" value={shareUrl || 'https://sanierenundsparen.de'} size={176} level="M" marginSize={2} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Link mit Eingaben</label>
          <div className="flex gap-2">
            <Input value={shareUrl} readOnly className="text-xs" onFocus={(e) => e.currentTarget.select()} />
            <Button size="sm" variant="secondary" onClick={copy} aria-label="Link kopieren">
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <Button size="sm" variant="outline" onClick={share}>
            <QrCode className="h-4 w-4 mr-1" /> Teilen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareInputs;
