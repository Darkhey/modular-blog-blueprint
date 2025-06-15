
import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CheckCircle, Info, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface GuideSection {
  heading: string;
  text: string;
  tips?: string[];
  advantages?: string[];
  faq?: FAQItem[];
  icon?: React.ReactNode;
}

interface SmartHomeCategoryGuideProps {
  id: string;
  title: string;
  sections: GuideSection[];
}

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
