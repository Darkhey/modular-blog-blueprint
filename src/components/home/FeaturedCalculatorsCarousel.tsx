import { Link } from 'react-router-dom';
import { Calculator, Flame, Home, Sun, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const calculators = [
  {
    id: 'heating',
    title: 'Heizkostenrechner',
    description: 'Berechnen Sie Ihr Einsparpotenzial bei einer Heizungsmodernisierung. Inklusive Smart Home Integration.',
    icon: Flame,
    route: '/heizung-modernisieren',
    color: 'red',
    features: ['Smart Home Einsparungen', 'Förderungen berücksichtigt', 'Amortisationsrechnung'],
    savingsExample: 'Bis zu 30% Ersparnis'
  },
  {
    id: 'insulation',
    title: 'Dämmungsrechner',
    description: 'Finden Sie die optimale Dämmstärke und das beste Material für Ihr Haus.',
    icon: Home,
    route: '/daemmungsrechner',
    color: 'blue',
    features: ['Alle Dämmarten', 'Materialvergleich', 'Kostenberechnung'],
    savingsExample: 'Bis zu 40% weniger Heizkosten'
  },
  {
    id: 'solar',
    title: 'Solar-Potenzial Rechner',
    description: 'Ermitteln Sie das Potenzial Ihrer Dachfläche für eine Solaranlage.',
    icon: Sun,
    route: '/solarenergie',
    color: 'yellow',
    features: ['Dachflächenanalyse', 'Ertragsberechnung', 'Wirtschaftlichkeit'],
    savingsExample: 'Bis zu 70% weniger Stromkosten'
  }
];

const FeaturedCalculatorsCarousel = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          accent: 'text-red-600',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'blue':
        return {
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          accent: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'yellow':
        return {
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          accent: 'text-yellow-600',
          button: 'bg-yellow-600 hover:bg-yellow-700'
        };
      default:
        return {
          iconBg: 'bg-primary/10',
          iconColor: 'text-primary',
          accent: 'text-primary',
          button: 'bg-primary hover:bg-primary/90'
        };
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Kostenlose Sanierungsrechner
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Planen Sie Ihre energetische Sanierung mit unseren präzisen Rechnern. 
            Ermitteln Sie Kosten, Einsparungen und Förderungen – komplett kostenlos.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-secondary/20 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Sofortige Berechnung • Keine Anmeldung erforderlich
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {calculators.map((calculator) => {
              const colors = getColorClasses(calculator.color);
              const Icon = calculator.icon;
              
              return (
                <CarouselItem key={calculator.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`${colors.iconBg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-6 w-6 ${colors.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {calculator.title}
                          </h3>
                          <div className={`text-sm font-semibold ${colors.accent} mb-3`}>
                            {calculator.savingsExample}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 flex-1">
                        {calculator.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {calculator.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Link 
                        to={calculator.route}
                        className={`inline-flex items-center justify-center gap-2 px-6 py-3 ${colors.button} text-white rounded-lg font-medium transition-all duration-300 group-hover:gap-3 hover:shadow-md`}
                      >
                        Jetzt berechnen
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Alle Rechner sind kostenlos und unverbindlich. Die Ergebnisse dienen zur ersten Orientierung.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCalculatorsCarousel;