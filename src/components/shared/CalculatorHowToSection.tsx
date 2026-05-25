import { Helmet } from 'react-helmet-async';
import { ListChecks, Clock } from 'lucide-react';
import { calculatorHowTos } from '@/data/calculatorHowTos';

interface Props {
  /** Key in calculatorHowTos */
  howToKey: keyof typeof calculatorHowTos;
  /** Optional URL of the calculator (used in HowTo JSON-LD) */
  url?: string;
  /** Visual heading override */
  heading?: string;
  className?: string;
}

/**
 * "Kurz erklärt" – sichtbarer HowTo-Block + HowTo JSON-LD.
 * Google verlangt, dass HowTo-Schritte auch on-page sichtbar sind.
 */
const CalculatorHowToSection = ({
  howToKey,
  url,
  heading = 'Kurz erklärt',
  className = '',
}: Props) => {
  const howTo = calculatorHowTos[howToKey];
  if (!howTo) return null;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    ...(url ? { url } : {}),
    ...(howTo.totalTimeMinutes
      ? { totalTime: `PT${howTo.totalTimeMinutes}M` }
      : {}),
    step: howTo.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(url ? { url: `${url}#step-${i + 1}` } : {}),
    })),
  };

  return (
    <section
      className={`mt-10 rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 ${className}`}
      aria-labelledby={`howto-${howToKey}`}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-primary" />
          <h2
            id={`howto-${howToKey}`}
            className="text-xl md:text-2xl font-bold text-foreground"
          >
            {heading}
          </h2>
        </div>
        {howTo.totalTimeMinutes && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            ca. {howTo.totalTimeMinutes} Min.
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-4">{howTo.description}</p>

      <ol className="grid gap-3 sm:grid-cols-2">
        {howTo.steps.map((s, i) => (
          <li
            key={i}
            id={`step-${i + 1}`}
            className="flex gap-3 rounded-xl border border-border/60 bg-background/60 p-4 scroll-mt-24"
          >
            <span
              aria-hidden
              className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold text-foreground text-sm md:text-base">
                {s.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default CalculatorHowToSection;
