import { Link } from 'react-router-dom';
import { Calculator, Flame, Home, Sun, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const calculators = [
  {
    id: 'heating',
    title: 'Heizkostenrechner',
    icon: Flame,
    route: '/heizung-modernisieren#rechner',
    color: 'red'
  },
  {
    id: 'insulation',
    title: 'Dämmungsrechner', 
    icon: Home,
    route: '/daemmungsrechner',
    color: 'blue'
  },
  {
    id: 'solar',
    title: 'Solar-Rechner',
    icon: Sun,
    route: '/solarenergie#rechner',
    color: 'yellow'
  }
];

interface QuickAccessButtonsProps {
  currentCalculator?: string;
  className?: string;
}

const QuickAccessButtons = ({ currentCalculator, className = "" }: QuickAccessButtonsProps) => {
  const otherCalculators = calculators.filter(calc => calc.id !== currentCalculator);

  if (otherCalculators.length === 0) return null;

  return (
    <Card className={`bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Weitere Rechner</h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {otherCalculators.map((calculator) => {
            const Icon = calculator.icon;
            const colorClasses = {
              red: 'bg-red-600 hover:bg-red-700',
              blue: 'bg-blue-600 hover:bg-blue-700', 
              yellow: 'bg-yellow-600 hover:bg-yellow-700'
            }[calculator.color] || 'bg-primary hover:bg-primary/90';

            return (
              <Button
                key={calculator.id}
                asChild
                className={`${colorClasses} text-white flex-1 group`}
                size="sm"
              >
                <Link to={calculator.route}>
                  <Icon className="h-4 w-4 mr-2" />
                  {calculator.title}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessButtons;