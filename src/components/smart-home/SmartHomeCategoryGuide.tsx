
import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { CheckCircle, Info, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductRecommendation {
  name: string;
  description: string;
  link: string;
  image: string;
  alt: string;
  highlights?: string[];
  priceHint?: string;
}

interface GuideSection {
  heading: string;
  text: string;
  tips?: string[];
  advantages?: string[];
  faq?: FAQItem[];
  icon?: React.ReactNode;
  productCarouselTitle?: string;
  products?: ProductRecommendation[];
}

interface SmartHomeCategoryGuideProps {
  id: string;
  title: string;
  sections: GuideSection[];
}

const GuideProductCarousel: React.FC<{
  title?: string;
  products: ProductRecommendation[];
}> = ({ title, products }) => {
  const autoplay = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const hasMultipleProducts = products.length > 1;

  return (
    <div className="mt-4">
      {title && (
        <h4 className="font-medium text-green-700 mb-2">
          {title}
        </h4>
      )}
      <Carousel
        className="w-full"
        opts={{ align: "start", loop: hasMultipleProducts }}
        plugins={hasMultipleProducts ? [autoplay.current] : []}
        onMouseEnter={hasMultipleProducts ? autoplay.current.stop : undefined}
        onMouseLeave={hasMultipleProducts ? autoplay.current.reset : undefined}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product, index) => (
            <CarouselItem
              key={`${product.name}-${index}`}
              className="pl-2 md:pl-4 basis-[85%] sm:basis-[60%] lg:basis-1/3"
            >
              <div className="h-full rounded-lg border border-green-100 bg-white shadow-sm overflow-hidden flex flex-col">
                <div className="aspect-video bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 space-y-3">
                  <div>
                    <h5 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h5>
                    <p className="mt-1 text-sm text-gray-600">
                      {product.description}
                    </p>
                    {product.priceHint && (
                      <p className="mt-1 text-sm font-medium text-emerald-700">
                        {product.priceHint}
                      </p>
                    )}
                  </div>
                  {product.highlights && product.highlights.length > 0 && (
                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                      {product.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                  <Button asChild className="mt-auto bg-emerald-600 hover:bg-emerald-700">
                    <a href={product.link} target="_blank" rel="noopener noreferrer">
                      Jetzt auf Amazon ansehen
                    </a>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {hasMultipleProducts && (
          <>
            <CarouselPrevious className="hidden sm:flex -left-10" />
            <CarouselNext className="hidden sm:flex -right-10" />
          </>
        )}
      </Carousel>
    </div>
  );
};

const SmartHomeCategoryGuide: React.FC<SmartHomeCategoryGuideProps> = ({ id, title, sections }) => (
  <section id={`${id}-guide`} className="my-12 max-w-3xl mx-auto">
    <h2 className="text-2xl sm:text-3xl font-bold mb-5 flex items-center gap-3">
      <Info className="text-green-600" /> {title} Ratgeber
    </h2>
    <div className="space-y-7">
      {sections.map((section, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-sm border border-green-100 px-6 py-5">
          <div className="flex items-center gap-2 mb-2">
            {section.icon}
            <h3 className="text-xl font-semibold">{section.heading}</h3>
          </div>
          <div className="text-base text-gray-700 mb-3">{section.text}</div>
          {section.tips && (
            <div className="mb-3">
              <h4 className="font-medium text-green-700 mb-1">Tipps:</h4>
              <ul className="list-disc list-inside space-y-1">
                {section.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-[2px]" /> <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {section.advantages && (
            <div className="mb-3">
              <h4 className="font-medium text-green-700 mb-1">Vorteile:</h4>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                {section.advantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
          )}
          {section.products && section.products.length > 0 && (
            <GuideProductCarousel
              title={section.productCarouselTitle}
              products={section.products}
            />
          )}
          {section.faq && (
            <Accordion type="single" collapsible className="mt-4 border-t pt-4">
              {section.faq.map((item, qidx) => (
                <AccordionItem key={qidx} value={`faq-${idx}-${qidx}`}>
                  <AccordionTrigger className="text-left font-semibold flex gap-2">
                    <HelpCircle className="w-5 h-5 text-green-400" /> {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-gray-700">{item.answer}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      ))}
    </div>
  </section>
);

export default SmartHomeCategoryGuide;
