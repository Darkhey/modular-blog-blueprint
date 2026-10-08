import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Leaf, Recycle, ShieldCheck } from 'lucide-react';
import thermoflocImage from '@/assets/thermofloc-einblasdaemmung.jpg';
import { Button } from '@/components/ui/button';

const benefits = [
  { icon: Recycle, label: 'Aus recyceltem Zeitungspapier' },
  { icon: ShieldCheck, label: 'Für Dach, Wand und Hohlräume' },
];

const ThermoflocBanner = () => (
  <section className="bg-secondary/60 py-10 md:py-14" aria-labelledby="thermofloc-title">
    <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
      <div className="relative overflow-hidden rounded-md border border-border bg-muted shadow-glow">
        <img
          src={thermoflocImage}
          alt="Fachhandwerker bringt Zellulose-Einblasdämmung in eine Holzbalkendecke ein"
          className="aspect-[8/5] h-full w-full object-cover"
          loading="lazy"
          width={1600}
          height={1024}
        />
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-md bg-background/90 px-3 py-2 text-xs font-semibold text-foreground backdrop-blur-sm">
          <Leaf className="h-4 w-4 text-primary" aria-hidden="true" />
          Nachhaltig dämmen
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold uppercase text-primary">
          Empfehlung für Einblasdämmung
        </p>
        <h2 id="thermofloc-title" className="text-3xl font-bold text-foreground md:text-4xl">
          Thermofloc: Zellulosedämmung für schwer erreichbare Hohlräume
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          Lose Zelluloseflocken werden vom Fachbetrieb fugenarm eingeblasen. Das eignet sich besonders
          für Dachschrägen, Holzbalkendecken und Hohlräume im Bestand.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="Vorteile der Einblasdämmung">
          {benefits.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-start gap-2 text-sm font-medium text-foreground">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/blog/einblasdaemmung-thermoflock-ratgeber-2025">
              Zum Ratgeber <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://www.thermofloc.com/de/" target="_blank" rel="noopener noreferrer">
              Thermofloc entdecken <ExternalLink aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default ThermoflocBanner;