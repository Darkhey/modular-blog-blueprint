
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ClipboardCheck } from 'lucide-react';

export interface ChecklistItem {
  id: string;
  label: string;
}

interface ChecklistSectionProps {
  title: string;
  items: ChecklistItem[];
}

const ChecklistSection = ({ title, items }: ChecklistSectionProps) => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const progress = items.length > 0 ? Math.round((checked.size / items.length) * 100) : 0;

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <span className="ml-auto text-sm font-medium text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 mb-6" />
        <div className="space-y-3">
          {items.map((item) => (
            <label
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <Checkbox
                checked={checked.has(item.id)}
                onCheckedChange={() => toggle(item.id)}
                className="mt-0.5"
              />
              <span className={`text-sm leading-relaxed ${checked.has(item.id) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChecklistSection;
