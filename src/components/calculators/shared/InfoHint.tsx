import { Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface InfoHintProps {
  /** Kurzer Klartext, der im Popover erscheint */
  children: React.ReactNode;
  /** Barrierefreies Label, z. B. "Was ist der iSFP?" */
  label: string;
  className?: string;
}

/**
 * Kleines Info-Icon mit antippbarer Erklärung.
 * Popover statt Tooltip, damit die Erklärung auch auf Touch-Geräten erreichbar ist.
 */
const InfoHint = ({ children, label, className = '' }: InfoHintProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <button
        type="button"
        aria-label={label}
        className={`inline-flex h-11 w-11 -my-3 -mx-3 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
      >
        <Info className="h-4 w-4" aria-hidden="true" />
      </button>
    </PopoverTrigger>
    <PopoverContent side="top" align="start" className="max-w-xs text-xs leading-relaxed">
      {children}
    </PopoverContent>
  </Popover>
);

export default InfoHint;
