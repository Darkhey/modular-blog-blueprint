
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Calculator, Loader2 } from 'lucide-react';
import { SolarInputs } from '@/types/solarCalculator';
import { calculateSolarResults } from '@/utils/solarCalculations';
import SolarInputForm from './solar/SolarInputForm';
import SolarResults from './solar/SolarResults';
import QuickAccessButtons from './QuickAccessButtons';
import ShareResults from '../shared/ShareResults';
import ResultsPDFExport from '../shared/ResultsPDFExport';
import CalculatorStructuredData from '../seo/CalculatorStructuredData';
import { useToast } from '@/components/ui/use-toast';

const SolarCalculator = () => {
  const [inputs, setInputs] = useState<SolarInputs>({
    dachflaeche: 50,
    stromverbrauch: 4000,
    ausrichtung: 'sued',
    dachneigung: 35,
    verschattung: 'keine',
    modultyp: 'mono',
    plz: '12345',
    mitSpeicher: false,
    speicherkapazitaet: 8,
    mitEAuto: false,
    eAutoFahrleistung: 15000,
    mitWallbox: false,
    tagverbrauchAnteil: 40,
  });

  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof SolarInputs, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const validateInputs = (): string[] => {
    const errs: string[] = [];
    if (inputs.dachflaeche <= 0) errs.push('Dachfläche muss > 0 m² sein');
    if (inputs.stromverbrauch <= 0) errs.push('Stromverbrauch muss > 0 kWh sein');
    if (!/^\d{5}$/.test(inputs.plz)) errs.push('PLZ muss 5-stellig sein');
    if (inputs.dachneigung < 0 || inputs.dachneigung > 90) errs.push('Dachneigung zwischen 0° und 90°');
    if (inputs.tagverbrauchAnteil < 0 || inputs.tagverbrauchAnteil > 100) errs.push('Tagverbrauch zwischen 0% und 100%');
    if (inputs.mitSpeicher && inputs.speicherkapazitaet <= 0) errs.push('Speicherkapazität muss > 0 kWh sein');
    return errs;
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateInputs();
    if (errors.length) {
      toast({ title: 'Eingaben prüfen', description: errors.join(' • '), variant: 'destructive' });
      return;
    }
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const calculatedResults = calculateSolarResults(inputs);
      setResults(calculatedResults);
      setIsCalculating(false);
    }, 800);
  };

  const getRecommendations = () => {
    if (!results) return [];
    
    const recommendations = [];
    
    // Speicher-Empfehlung
    if (!inputs.mitSpeicher && results.eigenverbrauchOhneSpeicher < inputs.stromverbrauch * 0.4) {
      recommendations.push({
        type: 'speicher',
        title: 'Batteriespeicher empfohlen',
        description: `Mit einem ${Math.ceil(inputs.stromverbrauch / 1000)} kWh Speicher könnten Sie Ihren Eigenverbrauch auf bis zu 75% steigern.`,
        impact: `+${Math.round((results.jahresertrag * 0.45) * 0.32)} € jährliche Ersparnis`
      });
    }
    
    // E-Auto Integration
    if (!inputs.mitEAuto && results.netzeinspeisung > 3000) {
      recommendations.push({
        type: 'emobility',
        title: 'E-Mobilität Integration',
        description: 'Sie speisen viel Strom ein. Ein E-Auto könnte diesen Überschuss optimal nutzen.',
        impact: `Bis zu ${Math.round(results.netzeinspeisung * 0.6 * 0.32)} € zusätzliche Ersparnis möglich`
      });
    }
    
    // Modultyp-Optimierung
    if (inputs.modultyp !== 'mono' && inputs.dachflaeche < 80) {
      recommendations.push({
        type: 'module',
        title: 'Modultyp optimieren',
        description: 'Bei begrenzter Dachfläche bieten monokristalline Module den besten Ertrag.',
        impact: `+${Math.round(results.jahresertrag * 0.07)} kWh mehr Ertrag pro Jahr`
      });
    }
    
    return recommendations;
  };

  return (
    <>
      <CalculatorStructuredData 
        calculatorType="solar" 
        title="Professioneller Solar-Rechner - Solaranlage mit Speicher & E-Auto berechnen"
        description="Umfassendes Solar-Potenzial berechnen: PV-Anlage, Batteriespeicher, E-Mobilität, regionale Optimierung und 20-Jahres-Prognose."
      />
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-6 w-6 text-primary" />
              Professioneller Solar-Rechner
            </CardTitle>
            <CardDescription>
              Berechnen Sie Ihr komplettes Solar-Potenzial mit Batteriespeicher, E-Mobilität, regionaler Optimierung und detaillierter 20-Jahres-Prognose.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleCalculate}>
            <CardContent>
              <SolarInputForm inputs={inputs} onInputChange={handleInputChange} />
            </CardContent>
            
            <CardFooter className="flex gap-4">
              <Button 
                type="submit" 
                size="lg" 
                disabled={isCalculating}
                aria-busy={isCalculating}
                className="flex-1 md:flex-none"
              >
                {isCalculating ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Berechnung läuft...</>
                ) : (
                  <><Calculator className="mr-2 h-5 w-5" /> Detailliert berechnen</>
                )}
              </Button>
              
              {results && (
                <div className="flex gap-2">
                  <ShareResults 
                    calculatorType="solar"
                    results={results}
                  />
                  <ResultsPDFExport 
                    results={results}
                    calculatorType="solar"
                  />
                </div>
              )}
            </CardFooter>
          </form>
        </Card>

        {results && (
          <>
            <SolarResults 
              results={results} 
              mitSpeicher={inputs.mitSpeicher}
              mitEAuto={inputs.mitEAuto}
            />
            
            {/* Smart-Empfehlungen */}
            {getRecommendations().length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💡 Smart-Empfehlungen für Sie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getRecommendations().map((rec, index) => (
                      <div key={index} className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                        <h4 className="font-semibold text-primary">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                        <p className="text-sm font-medium text-green-600 mt-2">{rec.impact}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <QuickAccessButtons currentCalculator="solar" />
          </>
        )}
      </div>
    </>
  );
};

export default SolarCalculator;
