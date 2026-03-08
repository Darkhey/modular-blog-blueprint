
import InsulationCalculator from '@/components/calculators/InsulationCalculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import InsulationManufacturers from '@/components/manufacturers/InsulationManufacturers';
import { Home, ArrowRight } from 'lucide-react';

const DaemmungsrechnerPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djJoLTJ2LTJoMnptMCAwdjJoLTJ2LTJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-16 relative z-10">
          <BreadcrumbNavigation 
            items={[
              { label: 'Ratgeber', href: '/wissenswertes' },
              { label: 'Rechner & Tools', href: '/wissenswertes/tools' },
              { label: 'Dämmungsrechner' }
            ]} 
            className="mb-6 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/50 [&_li]:text-white/90"
          />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Home className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Dämmungsrechner
            </h1>
          </div>
          <p className="text-blue-100 text-lg max-w-xl">
            Berechnen Sie hier die optimale Dämmstoffstärke und das Einsparpotenzial für Ihr Gebäude – kostenlos und sofort.
          </p>
        </div>
      </div>

      <main>
        <div className="container max-w-3xl mx-auto px-4 py-8">
          {/* Article Hint */}
          <Card className="mb-6 glass border-blue-200/50 animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Dämmstoffe 2025 – Der große Vergleich</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Welcher Dämmstoff passt am besten?{' '}
                <Link to="/blog/daemmstoffe-vergleich-2025" className="text-primary hover:underline font-semibold inline-flex items-center gap-1">
                  Zum Überblicksartikel <ArrowRight className="w-3 h-3" />
                </Link>
              </p>
            </CardContent>
          </Card>
          <InsulationCalculator />
        </div>
        <div className="mt-12">
          <InsulationManufacturers />
        </div>
      </main>
    </div>
  );
};

export default DaemmungsrechnerPage;
