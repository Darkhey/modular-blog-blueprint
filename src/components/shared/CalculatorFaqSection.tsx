import { ArrowRight, HelpCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import CalculatorStructuredData, {
  type BreadcrumbItem,
} from '@/components/seo/CalculatorStructuredData';
import { calculatorFaqs, type CalculatorFaqAnchor } from '@/data/calculatorFaqs';

interface Props {
  /** Key in calculatorFaqs (e.g. 'heizkostenrechner') */
  faqKey: keyof typeof calculatorFaqs;
  /** Calculator type for the JSON-LD WebApplication entry */
  calculatorType:
    | 'heating'
    | 'insulation'
    | 'solar'
    | 'foerder'
    | 'roi'
    | 'energie-check'
    | 'kosten'
    | 'vergleich'
    | 'sanierungscheck';
  /** Page title (used in WebApplication & BreadcrumbList) */
  title: string;
  /** Short description (≤ 160 chars) for WebApplication */
  description: string;
  /** Optional path override (slug without leading /) */
  path?: string;
  /** Optional crumbs for BreadcrumbList JSON-LD */
  breadcrumbs?: BreadcrumbItem[];
  /** Visual heading shown above the accordion */
  heading?: string;
  className?: string;
}

/**
 * Sichtbares FAQ-Accordion + JSON-LD Rich Result.
 * Google verlangt, dass FAQ-JSON-LD-Inhalt auch on-page sichtbar ist.
 */
const CalculatorFaqSection = ({
  faqKey,
  calculatorType,
  title,
  description,
  path,
  breadcrumbs,
  heading = 'Häufige Fragen',
  className = '',
}: Props) => {
  const faqs = calculatorFaqs[faqKey] ?? [];
  if (faqs.length === 0) return null;

  return (
    <section className={`mt-12 ${className}`} aria-labelledby={`faq-${faqKey}`}>
      <CalculatorStructuredData
        calculatorType={calculatorType}
        title={title}
        description={description}
        path={path}
        faq={faqs}
        breadcrumbs={breadcrumbs}
      />

      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h2 id={`faq-${faqKey}`} className="text-2xl font-bold text-foreground">
          {heading}
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default CalculatorFaqSection;
