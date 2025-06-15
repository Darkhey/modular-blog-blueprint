
import { FileText, Users, Calculator, Zap, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const modernizationSteps = [
  {
    step: 1,
    title: 'Bestandsaufnahme',
    description: 'Analyse der aktuellen Heizung und des Gebäudezustands',
    duration: '1-2 Wochen',
    icon: <FileText className="w-5 h-5" />,
    details: ['Heizlastberechnung', 'Gebäudeanalyse', 'Effizienz-Check', 'Smart Home Vorbereitung']
  },
  {
    step: 2,
    title: 'Energieberatung',
    description: 'Professionelle Beratung und Förderantrag',
    duration: '2-3 Wochen',
    icon: <Users className="w-5 h-5" />,
    details: ['BAFA-Beratung', 'Förderantrag', 'Sanierungsfahrplan', 'Smart System Planung']
  },
  {
    step: 3,
    title: 'Planung & Angebot',
    description: 'Detailplanung und Kostenvoranschlag',
    duration: '1-2 Wochen',
    icon: <Calculator className="w-5 h-5" />,
    details: ['Anlagenauslegung', 'Smart Home Konzept', 'Zeitplanung', 'Kostenaufstellung']
  },
  {
    step: 4,
    title: 'Installation',
    description: 'Einbau der neuen Heizungsanlage',
    duration: '3-5 Tage',
    icon: <Zap className="w-5 h-5" />,
    details: ['Heizungsinstallation', 'Smart System Integration', 'Rohrleitungsarbeiten', 'Elektroinstallation']
  },
  {
    step: 5,
    title: 'Inbetriebnahme',
    description: 'Test, Einstellung und Übergabe',
    duration: '1 Tag',
    icon: <CheckCircle className="w-5 h-5" />,
    details: ['Funktionstest', 'App-Einrichtung', 'Einweisung', 'Garantie-Übergabe']
  }
];

const ProcessTimelineSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            So läuft Ihre Smart-Heizungsmodernisierung ab
          </h2>
          <p className="text-xl text-gray-600">
            Von der ersten Beratung bis zum vollautomatischen Smart Home System
          </p>
        </div>
        
        <div className="space-y-8">
          {modernizationSteps.map((step, index) => (
            <Card key={step.step} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-green-700 transition-colors">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        {step.icon}
                        {step.title}
                      </h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                      {step.details.map((detail, detailIndex) => (
                        <Badge key={detailIndex} variant="secondary" className="text-xs">
                          {detail}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimelineSection;
