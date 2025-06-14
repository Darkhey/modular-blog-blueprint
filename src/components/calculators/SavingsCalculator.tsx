
import { useState } from 'react';
import { Calculator, TrendingDown, Euro, Zap, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SavingsCalculator = () => {
  const [inputs, setInputs] = useState({
    houseSize: '',
    currentCosts: '',
    houseAge: '',
    heatingType: 'gas'
  });
  
  const [results, setResults] = useState<{
    yearlyBenefit: number;
    totalInvestment: number;
    paybackTime: number;
    co2Reduction: number;
  } | null>(null);

  const calculateSavings = () => {
    const size = parseFloat(inputs.houseSize);
    const costs = parseFloat(inputs.currentCosts);
    const buildYear = parseInt(inputs.houseAge);
    
    if (!size || !costs || !buildYear || buildYear > new Date().getFullYear()) return;

    const age = new Date().getFullYear() - buildYear;

    // Vereinfachte Berechnung basierend auf typischen Werten
    const ageFactor = age > 30 ? 1.5 : age > 20 ? 1.2 : 1.0;
    const sizeFactor = size / 150; // Normiert auf 150qm
    
    const yearlyBenefit = Math.round(costs * 0.6 * ageFactor);
    const totalInvestment = Math.round(size * 800 * sizeFactor);
    const paybackTime = yearlyBenefit > 0 ? Math.round(totalInvestment / yearlyBenefit) : 0;
    const co2Reduction = Math.round(size * 0.08 * ageFactor);

    setResults({
      yearlyBenefit,
      totalInvestment,
      paybackTime,
      co2Reduction
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white to-green-50 border-2 border-green-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center text-2xl">
          <Calculator className="mr-3 w-8 h-8" />
          Sanierungskostenrechner
        </CardTitle>
        <p className="text-green-100">Entdecken Sie Ihr Sparpotential in 30 Sekunden</p>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="houseSize" className="text-sm font-semibold text-gray-700">
              Wohnfläche (m²)
            </Label>
            <Input
              id="houseSize"
              type="number"
              placeholder="z.B. 150"
              value={inputs.houseSize}
              onChange={(e) => setInputs({...inputs, houseSize: e.target.value})}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="currentCosts" className="text-sm font-semibold text-gray-700">
              Aktuelle Heizkosten (€/Jahr)
            </Label>
            <Input
              id="currentCosts"
              type="number"
              placeholder="z.B. 2500"
              value={inputs.currentCosts}
              onChange={(e) => setInputs({...inputs, currentCosts: e.target.value})}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="houseAge" className="text-sm font-semibold text-gray-700">
              Baujahr des Hauses
            </Label>
            <Input
              id="houseAge"
              type="number"
              placeholder="z.B. 1985"
              value={inputs.houseAge}
              onChange={(e) => setInputs({...inputs, houseAge: e.target.value})}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="heatingType" className="text-sm font-semibold text-gray-700">
              Aktuelle Heizung
            </Label>
            <select
              id="heatingType"
              value={inputs.heatingType}
              onChange={(e) => setInputs({...inputs, heatingType: e.target.value})}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            >
              <option value="gas">Gasheizung</option>
              <option value="oil">Ölheizung</option>
              <option value="electric">Elektroheizung</option>
              <option value="old">Alte Heizung (&gt;20 Jahre)</option>
            </select>
          </div>
        </div>

        <Button 
          onClick={calculateSavings}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <Zap className="mr-2 w-5 h-5" />
          Sparpotential jetzt berechnen!
        </Button>

        {results && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingDown className="mr-2 text-green-600" />
              Ihr Sparpotential:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <Euro className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {results.yearlyBenefit.toLocaleString()}€
                </div>
                <p className="text-sm text-gray-600">Ersparnis/Jahr</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  {results.totalInvestment.toLocaleString()}€
                </div>
                <p className="text-sm text-gray-600">Investition</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <ArrowRight className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {results.paybackTime} Jahre
                </div>
                <p className="text-sm text-gray-600">Amortisation</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">
                  -{results.co2Reduction}t
                </div>
                <p className="text-sm text-gray-600">CO₂/Jahr</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">
                💡 Diese Berechnung ist eine Schätzung. Für eine genaue Analyse empfehlen wir eine professionelle Energieberatung.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavingsCalculator;
