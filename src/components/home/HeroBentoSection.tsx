import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Clock, PiggyBank, Star } from 'lucide-react';
import { useRankedPosts } from '@/hooks/useRankedPosts';
import { Skeleton } from '@/components/ui/skeleton';
import sanierungsfahrplanImg from '@/assets/sanierungsfahrplan-hero.jpg';

const HeroBentoSection = () => {
  const { data: posts, isLoading } = useRankedPosts(3);

  const lead = posts?.[0];
  const secondary = posts?.slice(1, 3) ?? [];

  return (
    <section aria-labelledby="hero-bento-heading" className="bg-background py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <Star className="h-5 w-5 fill-primary text-primary" aria-hidden="true" />
          <h2
            id="hero-bento-heading"
            className="text-sm font-bold uppercase tracking-wider text-primary"
          >
            Aktuell empfohlen
          </h2>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-72 rounded-2xl md:col-span-2" />
            <div className="grid gap-4">
              <Skeleton className="h-[8.5rem] rounded-2xl" />
              <Skeleton className="h-[8.5rem] rounded-2xl" />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {lead && (
              <Link
                to={`/blog/${lead.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border md:col-span-2 md:row-span-1"
              >
                <img
                  src={lead.hero_image_url || lead.cover_url || sanierungsfahrplanImg}
                  alt={lead.image_alt || lead.title}
                  width={1200}
                  height={675}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full md:min-h-[19rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  {lead.topic && (
                    <span className="mb-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {lead.topic}
                    </span>
                  )}
                  <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">
                    {lead.title}
                  </h3>
                  <p className="mt-2 hidden text-sm text-white/85 md:line-clamp-2">
                    {lead.excerpt}
                  </p>
                  {lead.read_time ? (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/80">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {lead.read_time} Min. Lesezeit
                    </span>
                  ) : null}
                </div>
              </Link>
            )}

            <div className="grid gap-4">
              {secondary.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group flex gap-3 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <img
                    src={post.hero_image_url || post.cover_url || sanierungsfahrplanImg}
                    alt={post.image_alt || post.title}
                    width={160}
                    height={160}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                      {post.title}
                    </h3>
                    {post.read_time ? (
                      <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.read_time} Min.
                      </span>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tool tiles */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Link
            to="/rechner"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary">
                <Calculator className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold text-foreground">Alle Rechner</span>
                <span className="block text-sm text-muted-foreground">
                  Kosten, Amortisation & Förderung berechnen
                </span>
              </span>
            </span>
            <ArrowRight
              className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <Link
            to="/foerderrechner"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary">
                <PiggyBank className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold text-foreground">Förder-Check</span>
                <span className="block text-sm text-muted-foreground">
                  Zuschüsse und Boni in 2 Minuten ermitteln
                </span>
              </span>
            </span>
            <ArrowRight
              className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBentoSection;
