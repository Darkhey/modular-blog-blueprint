import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, BookOpen } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
      {/* Soft light accent */}
      <div
        className="absolute -top-1/3 left-1/2 h-[70%] w-[85%] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 md:pb-20 md:pt-16 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" />
            Ihr unabhängiger Sanierungsratgeber
          </div>

          <h1 className="mb-4 text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in">
            Sanierung{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-200 bg-clip-text text-transparent">
              smart
            </span>{' '}
            planen
          </h1>

          <p
            className="mb-7 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg animate-fade-in"
            style={{ animationDelay: '120ms' }}
          >
            Unabhängige Ratgeber, aktuelle Fördermittel und Rechner für Heizung, Dämmung und Solar.
          </p>

          <div
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-in"
            style={{ animationDelay: '220ms' }}
          >
            <Link
              to="/blog"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-emerald-900 transition-colors hover:bg-emerald-50"
            >
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              Ratgeber entdecken
            </Link>
            <Link
              to="/rechner"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <Calculator className="h-5 w-5" aria-hidden="true" />
              Zu den Rechnern
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Topic chips */}
        <nav aria-label="Themen" className="-mx-4 px-4 sm:mx-0 sm:px-0">
          <ul
            className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible animate-fade-in"
            style={{ animationDelay: '320ms', scrollbarWidth: 'none' }}
          >
            {siteConfig.contentTopics.map((topic) => (
              <li key={topic.id} className="shrink-0">
                <Link
                  to={topic.seoUrl}
                  className="inline-flex min-h-[40px] items-center rounded-full border border-white/30 bg-emerald-950/30 px-4 text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-emerald-950/50"
                >
                  {topic.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Soft transition into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroSection;
