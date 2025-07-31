
import { Calculator, Smartphone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeizungHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-yellow-500 text-black font-bold px-4 py-2">
              🔥 Bis zu 55% Förderung + Smart Home Integration!
            </Badge>
            <h1 className="text-5xl font-bold leading-tight">
              Heizung modernisieren mit 
              <span className="text-yellow-300"> Smart Home</span>
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Senken Sie Ihre Heizkosten um bis zu 25% durch moderne Heiztechnik und intelligente 
              Smart Home Systeme. Profitieren Sie von staatlichen Förderungen bis zu 55% und 
              revolutionieren Sie Ihr Zuhause.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold" asChild>
                <a href="#rechner">
                  <Calculator className="mr-2 w-5 h-5" />
                  Sparpotenzial berechnen
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black bg-white hover:bg-gray-100" asChild>
                <a href="#smart-systeme">
                  <Smartphone className="mr-2 w-5 h-5" />
                  Smart Home Systeme
                </a>
              </Button>
            </div>
          </div>
          <div className="lg:flex justify-center hidden">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-300">bis 25%</div>
                  <div className="text-sm">weniger Heizkosten</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300">bis 55%</div>
                  <div className="text-sm">BAFA Förderung</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300">Smart</div>
                  <div className="text-sm">Home Ready</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300">bis 65%</div>
                  <div className="text-sm">weniger CO₂</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeizungHeroSection;
