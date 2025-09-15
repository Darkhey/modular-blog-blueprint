import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';

const ROIRechnerPage = () => {
  const [investment, setInvestment] = useState('');
  const [savings, setSavings] = useState('');
  const [price, setPrice] = useState('');

  const investmentNum = parseFloat(investment);
  const savingsNum = parseFloat(savings);
  const priceNum = parseFloat(price);
  const canCalc = investmentNum > 0 && savingsNum > 0 && priceNum > 0;
  const payback = canCalc ? investmentNum / (savingsNum * priceNum) : null;
  const roiPercent = canCalc ? (savingsNum * priceNum) / investmentNum * 100 : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <BreadcrumbNavigation
            items={[
              { label: 'Ratgeber', href: '/wissenswertes' },
              { label: 'Rechner & Tools', href: '/wissenswertes/tools' },
              { label: 'ROI-Rechner' }
            ]}
            className="mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ROI-Rechner</h1>
          <p className="text-gray-600 text-lg mb-8">
            Berechnen Sie die Amortisationszeit Ihrer Investition.
          </p>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Eingaben</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Investitionskosten (EUR)</label>
                  <Input
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Jährliche Energieeinsparung (kWh)</label>
                  <Input
                    type="number"
                    value={savings}
                    onChange={(e) => setSavings(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Energiepreis (EUR/kWh)</label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="0.0001"
                  />
                </div>
              </CardContent>
            </Card>
            {canCalc && (
              <Card>
                <CardHeader>
                  <CardTitle>Ergebnis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Amortisationszeit: {payback?.toFixed(1)} Jahre</p>
                  <p>Jährliche Rendite: {roiPercent?.toFixed(1)}%</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ROIRechnerPage;
