
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HeizungFAQSection = () => {
  return (
    <section className="py-16 bg-white/50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="text-xl text-gray-600">
            Antworten auf die wichtigsten Fragen zur Smart-Heizungsmodernisierung
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
            <AccordionTrigger className="text-left text-lg font-semibold">
              Welche Förderungen gibt es 2025 für Smart Home Heizungen?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-4">
              Die BAFA fördert nicht nur die Heizung selbst (bis zu 70%), sondern auch digitale Systemtechnik 
              wird mitgefördert. Smart Home Komponenten, die direkt zur Effizienzsteigerung beitragen, 
              sind förderfähig. Zusätzlich gibt es KfW-Programme für Smart Home Systeme und einen 
              Klimageschwindigkeits-Bonus von 20% beim Austausch alter Heizungen.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
            <AccordionTrigger className="text-left text-lg font-semibold">
              Wie viel kann ich durch Smart Home Systeme zusätzlich sparen?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-4">
              Smart Home Systeme können zusätzlich 15-30% Energie sparen, je nach System und Nutzung. 
              Smart Thermostate allein sparen etwa 15%, eine vollständige Automation mit Wetterprognose, 
              Anwesenheitserkennung und PV-Integration kann bis zu 30% erreichen. Bei einer Wärmepumpe 
              mit optimaler Smart Home Integration sind Gesamteinsparungen von über 50% möglich.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
            <AccordionTrigger className="text-left text-lg font-semibold">
              Sind Smart Home Heizungen sicher und datenschutzkonform?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-4">
              Moderne Smart Home Heizungssysteme verwenden verschlüsselte Verbindungen und arbeiten 
              oft lokal ohne Cloud-Zwang. Deutsche Hersteller wie Bosch, Viessmann oder Homematic IP 
              bieten DSGVO-konforme Lösungen. Viele Systeme funktionieren auch komplett offline und 
              kommunizieren nur innerhalb Ihres Heimnetzwerks.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
            <AccordionTrigger className="text-left text-lg font-semibold">
              Kann ich Smart Home Systeme nachträglich zu meiner Heizung hinzufügen?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-4">
              Ja, fast alle modernen Heizungen sind Smart Home nachrüstbar. Smart Thermostate 
              funktionieren mit allen Heizkörpern, Heizungssteuerungen können meist nachgerüstet werden. 
              Selbst ältere Heizungen können durch Smart Systeme optimiert werden. Am besten 
              funktioniert es natürlich, wenn Smart Home von Anfang an mitgeplant wird.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
            <AccordionTrigger className="text-left text-lg font-semibold">
              Welches Smart Home System passt am besten zu welcher Heizung?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-4">
              Wärmepumpen profitieren am meisten von umfassenden Smart Home Systemen mit PV-Integration 
              und Wetterprognose. Gas-Brennwertheizungen sind ideal mit Smart Thermostaten und 
              modulierender Steuerung. Pelletheizungen benötigen vor allem Füllstand-Monitoring und 
              Asche-Management. Hybridheizungen sind Smart Home Champions mit intelligenter Umschaltung 
              zwischen den Systemen.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border border-gray-200 rounded-lg px-6">
            <AccordionTrigger className="text-left text-lg font-semibold">
              Was kostet ein komplettes Smart Home Heizsystem?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-4">
              Die Smart Home Integration kostet etwa 1.000-3.000€ zusätzlich zur Heizung, je nach 
              Umfang. Basis-Smart Thermostate gibt es ab 150€ pro Raum, professionelle Systeme mit 
              Zentrale kosten 1.500-2.500€. Da die Systeme oft mitgefördert werden und sich durch 
              Energieeinsparungen amortisieren, ist die Investition meist nach 3-5 Jahren wieder drin.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default HeizungFAQSection;
