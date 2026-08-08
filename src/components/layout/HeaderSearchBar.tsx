import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, Loader2, FileText, Calculator, Tag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { siteConfig } from '@/config/site.config';
import { calculatorsCatalog } from '@/data/calculatorsCatalog';
import { cn } from '@/lib/utils';

interface Suggestion {
  type: 'post' | 'topic' | 'calculator';
  title: string;
  to: string;
}

const HeaderSearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Suggestion[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const staticMatches = useMemo<Suggestion[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const topics: Suggestion[] = siteConfig.contentTopics
      .filter((t: any) => t.name.toLowerCase().includes(q))
      .map((t: any) => ({ type: 'topic' as const, title: t.name, to: t.seoUrl }));
    const calcs: Suggestion[] = calculatorsCatalog
      .filter((c) => c.title.toLowerCase().includes(q))
      .map((c) => ({ type: 'calculator' as const, title: c.title, to: c.route }));
    return [...topics.slice(0, 3), ...calcs.slice(0, 3)];
  }, [query]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setPosts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('title, slug')
        .eq('status', 'published')
        .ilike('title', `%${q}%`)
        .limit(5);
      setPosts(
        (data || []).map((p: { title: string; slug: string }) => ({
          type: 'post' as const,
          title: p.title,
          to: `/blog/${p.slug}`,
        }))
      );
      setLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const suggestions = [...posts, ...staticMatches];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    (document.activeElement as HTMLElement | null)?.blur();
    navigate(`/suche?q=${encodeURIComponent(q)}`);
  };

  const iconFor = (type: Suggestion['type']) =>
    type === 'post' ? FileText : type === 'calculator' ? Calculator : Tag;

  return (
    <div ref={containerRef} className="relative lg:hidden pb-2">
      <form onSubmit={submit} role="search">
        <label htmlFor="header-search" className="sr-only">
          Artikel und Themen suchen
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="header-search"
            type="text"
            inputMode="search"
            enterKeyHint="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Artikel & Themen suchen…"
            className="h-11 w-full rounded-xl border border-border bg-muted/50 pl-10 pr-10 text-[16px] text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setPosts([]);
              }}
              aria-label="Suche leeren"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            </button>
          )}
        </div>
      </form>

      {open && query.trim().length >= 2 && (
        <div
          className={cn(
            'absolute left-0 right-0 top-full z-50 mt-1 max-h-[60vh] overflow-y-auto rounded-xl border border-border bg-popover shadow-lg'
          )}
        >
          {suggestions.length === 0 && !loading ? (
            <p className="px-4 py-3 text-sm text-muted-foreground">Keine Treffer – Enter für Volltextsuche.</p>
          ) : (
            <ul className="py-1">
              {suggestions.map((s) => {
                const Icon = iconFor(s.type);
                return (
                  <li key={`${s.type}-${s.to}`}>
                    <Link
                      to={s.to}
                      onClick={() => {
                        setOpen(false);
                        setQuery('');
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      <span className="line-clamp-2">{s.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    navigate(`/suche?q=${encodeURIComponent(query.trim())}`);
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-semibold text-primary hover:bg-accent"
                >
                  Alle Ergebnisse für „{query.trim()}“ →
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSearchBar;
