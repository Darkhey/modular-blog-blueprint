import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Sparkles, Lock } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface CalculatorHeroProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  gradient?: string;
  breadcrumbs?: { label: string; to?: string }[];
  children?: ReactNode;
}

const CalculatorHero = ({
  icon: Icon,
  title,
  subtitle,
  gradient = 'from-emerald-500 to-teal-500',
  breadcrumbs,
  children,
}: CalculatorHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/60 via-background to-teal-50/40 dark:from-emerald-950/30 dark:via-background dark:to-teal-950/20 border-b border-border">
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${gradient} blur-3xl opacity-20`} />
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
              {breadcrumbs.map((b, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
                  {b.to ? (
                    <Link to={b.to} className="hover:text-primary transition-colors">{b.label}</Link>
                  ) : (
                    <span className="text-foreground">{b.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="flex items-start gap-4 md:gap-5">
          <div className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-glow`}>
            <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">{title}</h1>
            <p className="mt-2 text-base md:text-lg text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-emerald-500" /> Kostenlos</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Ohne Anmeldung</span>
          <span className="inline-flex items-center gap-1.5"><Lock className="w-4 h-4 text-emerald-500" /> DSGVO-konform</span>
        </div>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
};

export default CalculatorHero;
