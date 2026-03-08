import { useState } from 'react';
import { cn } from '@/lib/utils';

interface GermanyMapProps {
  selectedState: string | null;
  onSelectState: (stateId: string) => void;
}

// Simplified SVG paths for German federal states
const states: { id: string; name: string; d: string; labelX: number; labelY: number }[] = [
  { id: 'schleswig-holstein', name: 'SH', d: 'M280,20 L310,15 L340,25 L350,50 L345,80 L330,95 L310,90 L295,100 L275,95 L260,70 L265,45 Z', labelX: 305, labelY: 55 },
  { id: 'hamburg', name: 'HH', d: 'M295,100 L310,95 L320,105 L310,115 L295,110 Z', labelX: 308, labelY: 108 },
  { id: 'bremen', name: 'HB', d: 'M250,110 L265,105 L272,115 L265,125 L250,120 Z', labelX: 261, labelY: 116 },
  { id: 'niedersachsen', name: 'NI', d: 'M180,80 L250,70 L275,95 L295,100 L295,110 L265,125 L280,145 L300,155 L310,180 L290,200 L250,210 L220,195 L190,180 L175,150 L160,120 L170,95 Z', labelX: 235, labelY: 145 },
  { id: 'mecklenburg-vorpommern', name: 'MV', d: 'M330,30 L380,20 L430,25 L460,40 L450,65 L430,80 L400,90 L370,95 L345,80 L330,65 Z', labelX: 395, labelY: 58 },
  { id: 'berlin', name: 'BE', d: 'M430,140 L445,135 L450,148 L440,155 L428,150 Z', labelX: 439, labelY: 146 },
  { id: 'brandenburg', name: 'BB', d: 'M370,95 L400,90 L430,100 L460,120 L465,155 L455,185 L430,200 L400,195 L380,175 L370,150 L365,120 Z', labelX: 415, labelY: 165 },
  { id: 'sachsen-anhalt', name: 'ST', d: 'M310,155 L340,140 L370,150 L380,175 L370,210 L345,225 L315,220 L300,200 L290,180 Z', labelX: 338, labelY: 185 },
  { id: 'nordrhein-westfalen', name: 'NW', d: 'M140,170 L175,150 L190,180 L220,195 L250,210 L250,245 L230,270 L200,280 L170,270 L145,250 L130,220 L125,190 Z', labelX: 190, labelY: 225 },
  { id: 'hessen', name: 'HE', d: 'M200,280 L230,270 L250,245 L280,250 L290,280 L280,310 L260,330 L230,335 L210,320 L195,300 Z', labelX: 245, labelY: 295 },
  { id: 'thueringen', name: 'TH', d: 'M280,250 L315,240 L345,245 L365,260 L360,290 L335,305 L305,300 L285,285 Z', labelX: 325, labelY: 272 },
  { id: 'sachsen', name: 'SN', d: 'M345,245 L380,230 L420,240 L445,260 L440,290 L415,310 L385,305 L360,290 Z', labelX: 400, labelY: 272 },
  { id: 'rheinland-pfalz', name: 'RP', d: 'M130,280 L170,270 L200,280 L210,320 L200,350 L175,370 L150,365 L125,340 L115,310 Z', labelX: 163, labelY: 325 },
  { id: 'saarland', name: 'SL', d: 'M115,340 L130,335 L140,350 L132,365 L118,360 Z', labelX: 128, labelY: 352 },
  { id: 'baden-wuerttemberg', name: 'BW', d: 'M150,365 L175,370 L200,350 L230,355 L260,370 L270,400 L260,440 L235,460 L200,465 L170,450 L145,420 L140,390 Z', labelX: 210, labelY: 415 },
  { id: 'bayern', name: 'BY', d: 'M260,330 L290,310 L335,305 L365,310 L400,320 L430,340 L445,380 L440,420 L420,450 L390,470 L350,475 L310,460 L280,440 L265,410 L260,370 Z', labelX: 355, labelY: 395 },
];

const GermanyMap = ({ selectedState, onSelectState }: GermanyMapProps) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg
        viewBox="100 0 400 500"
        className="w-full h-auto"
        aria-label="Interaktive Karte von Deutschland mit Bundesländern"
        role="img"
      >
        {states.map((state) => {
          const isSelected = selectedState === state.id;
          const isHovered = hoveredState === state.id;

          return (
            <g key={state.id}>
              <path
                d={state.d}
                className={cn(
                  'cursor-pointer transition-all duration-200 stroke-2',
                  isSelected
                    ? 'fill-primary stroke-primary-foreground'
                    : isHovered
                      ? 'fill-primary/60 stroke-primary'
                      : 'fill-muted stroke-border hover:fill-accent'
                )}
                onClick={() => onSelectState(state.id)}
                onMouseEnter={() => setHoveredState(state.id)}
                onMouseLeave={() => setHoveredState(null)}
                role="button"
                aria-label={`Bundesland ${state.name} auswählen`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectState(state.id);
                  }
                }}
              />
              <text
                x={state.labelX}
                y={state.labelY}
                textAnchor="middle"
                dominantBaseline="central"
                className={cn(
                  'pointer-events-none text-xs font-bold select-none',
                  isSelected ? 'fill-primary-foreground' : 'fill-foreground'
                )}
                fontSize="12"
              >
                {state.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GermanyMap;
