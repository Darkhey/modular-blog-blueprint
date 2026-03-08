
import ModernizationSavingsCalculator from '@/components/calculators/ModernizationSavingsCalculator';
import { Flame } from 'lucide-react';

const HeizkostenrechnerPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-orange-500 to-amber-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djJoLTJ2LTJoMnptMCAwdjJoLTJ2LTJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container max-w-5xl mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Heizkostenrechner
            </h1>
          </div>
          <p className="text-orange-100 text-lg max-w-xl">
            Berechnen Sie Ihr Sparpotenzial durch Heizungsmodernisierung mit Smart Home Integration – kostenlos und sofort.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <ModernizationSavingsCalculator />
      </main>
    </div>
  );
};

export default HeizkostenrechnerPage;
