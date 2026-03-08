import { Link } from 'react-router-dom';
import { MapPin, Euro, TrendingDown, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import BeforeAfterSlider from './BeforeAfterSlider';
import type { ReferenzProjekt } from '@/data/referenzenData';

interface ProjektCardProps {
  projekt: ReferenzProjekt;
}

const ProjektCard = ({ projekt }: ProjektCardProps) => {
  const nettoKosten = projekt.kosten - projekt.foerderung;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <BeforeAfterSlider
        beforeImage={projekt.beforeImage}
        afterImage={projekt.afterImage}
        alt={projekt.title}
      />
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-foreground">{projekt.title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" /> {projekt.location}
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0">{projekt.typLabel}</Badge>
        </div>

        <p className="text-sm text-muted-foreground">{projekt.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Euro className="h-4 w-4 text-primary" />
            <div>
              <div className="font-semibold text-foreground">{nettoKosten.toLocaleString('de-DE')} €</div>
              <div className="text-xs text-muted-foreground">nach Förderung</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-green-600" />
            <div>
              <div className="font-semibold text-foreground">{projekt.energieeinsparung}%</div>
              <div className="text-xs text-muted-foreground">Energieeinsparung</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Euro className="h-4 w-4 text-accent-foreground" />
            <div>
              <div className="font-semibold text-foreground">{projekt.foerderung.toLocaleString('de-DE')} €</div>
              <div className="text-xs text-muted-foreground">Förderung erhalten</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-semibold text-foreground">{projekt.zeitraum}</div>
              <div className="text-xs text-muted-foreground">Bauzeit</div>
            </div>
          </div>
        </div>

        {/* Maßnahmen */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">Durchgeführte Maßnahmen</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {projekt.massnahmen.map((m) => (
              <li key={m} className="flex items-start gap-1.5">
                <span className="text-primary mt-0.5">✓</span> {m}
              </li>
            ))}
          </ul>
        </div>

        {/* Related links */}
        <div className="flex flex-wrap gap-2 pt-1">
          {projekt.relatedLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-xs text-primary hover:underline flex items-center gap-0.5"
            >
              {link.label} <ArrowRight className="h-3 w-3" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjektCard;
