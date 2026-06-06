import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface BlogFaqItem {
  question: string;
  answer: string;
}

interface BlogPostFaqSectionProps {
  faq?: unknown;
  className?: string;
}

/** Normalize the post.faq field into a clean array. */
function normalize(faq: unknown): BlogFaqItem[] {
  if (!Array.isArray(faq)) return [];
  return faq
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const q = (item as Record<string, unknown>).question;
      const a = (item as Record<string, unknown>).answer;
      if (typeof q !== 'string' || typeof a !== 'string') return null;
      const question = q.trim();
      const answer = a.trim();
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((x): x is BlogFaqItem => x !== null);
}

const BlogPostFaqSection = ({ faq, className }: BlogPostFaqSectionProps) => {
  const items = normalize(faq);
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="blog-faq-heading"
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8 ${className ?? ''}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h2 id="blog-faq-heading" className="text-2xl font-bold text-gray-900">
          Häufige Fragen
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-base font-semibold text-gray-900">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default BlogPostFaqSection;
