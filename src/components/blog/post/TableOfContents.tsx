import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsProps {
  tableOfContents: any[];
}

const TableOfContents = ({ tableOfContents }: TableOfContentsProps) => {
  const items: TocItem[] = Array.isArray(tableOfContents)
    ? tableOfContents.filter((i) => i && i.id && i.title)
    : [];
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items.map((i) => i.id).join('|')]);

  if (items.length === 0) return null;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    setActiveId(id);
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <List className="w-4 h-4 text-primary" />
            Inhaltsverzeichnis
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Inhaltsverzeichnis ein-/ausklappen"
            className="lg:hidden p-1 text-muted-foreground"
          >
            <ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(!open && 'hidden lg:block')}>
        <nav aria-label="Inhaltsverzeichnis" className="space-y-1 max-h-[60vh] overflow-y-auto">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              aria-current={activeId === item.id ? 'true' : undefined}
              className={cn(
                'block text-sm py-1.5 border-l-2 pl-3 transition-colors hover:text-primary hover:border-primary',
                item.level === 3 && 'pl-6 text-xs',
                activeId === item.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground',
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default TableOfContents;
