
import { Rocket, PiggyBank, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '@/hooks/useInView';

const features = [
  {
    icon: Rocket,
    title: 'Starten Sie Ihr Projekt',
    description: 'Egal ob Neubau oder Sanierung – wir begleiten Sie von der ersten Idee bis zur finalen Umsetzung.',
    to: '/projektplaner',
    step: '01',
  },
  {
    icon: PiggyBank,
    title: 'Finanzen im Blick',
    description: 'Maximieren Sie Ihr Budget durch clevere Planung und die richtigen Fördermittel.',
    to: '/budgetplan',
    step: '02',
  },
  {
    icon: Lightbulb,
    title: 'Wissen, das sich auszahlt',
    description: 'Profitieren Sie von verständlichen Anleitungen und Experten-Tipps, um teure Fehler zu vermeiden.',
    to: '/wissenswertes',
    step: '03',
  },
];

const FeaturesSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-16 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          Ihre Vorteile als Hausbesitzer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <Link
              key={f.step}
              to={f.to}
              className={`group block transition-all duration-500 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="relative glass rounded-2xl p-8 h-full hover:shadow-glow hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Step number */}
                <span className="absolute top-4 right-4 text-5xl font-black text-primary/10 select-none">{f.step}</span>
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                  <f.icon className="text-primary-foreground w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
