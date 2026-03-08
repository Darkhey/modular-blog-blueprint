
import { Link } from 'react-router-dom';
import { Flame, Home, Sun } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const calculators = [
  {
    icon: Flame,
    title: 'Heizkostenrechner',
    description: 'Berechnen Sie Ihr Einsparpotenzial bei einer Heizungsmodernisierung.',
    to: '/heizung-modernisieren',
    badge: 'bis 40% sparen',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    icon: Home,
    title: 'Dämmungsrechner',
    description: 'Finden Sie die optimale Dämmstärke für Ihr Haus.',
    to: '/daemmung-isolierung',
    badge: 'bis 50% sparen',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Sun,
    title: 'Solarrechner',
    description: 'Planen Sie Ihre PV-Anlage und berechnen Sie die Amortisation.',
    to: '/solarenergie',
    badge: 'bis 70% sparen',
    gradient: 'from-amber-500 to-yellow-500',
  },
];

const CalculatorsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          Sanierungsrechner
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {calculators.map((calc, i) => (
            <div
              key={calc.title}
              className={`group relative glass rounded-2xl p-8 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Badge */}
              <span className={`absolute top-4 right-4 text-xs font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r ${calc.gradient}`}>
                {calc.badge}
              </span>

              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${calc.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <calc.icon className="text-white w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{calc.title}</h3>
              <p className="text-muted-foreground mb-6">{calc.description}</p>
              <Link
                to={calc.to}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r ${calc.gradient} hover:opacity-90 transition-opacity shadow-lg`}
              >
                Zum Rechner →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalculatorsSection;
