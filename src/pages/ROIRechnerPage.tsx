import { useId, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';

const ROIRechnerPage = () => {
  const investmentId = useId();
  const savingsId = useId();
  const priceId = useId();
  const [investment, setInvestment] = useState('');
  const [savings, setSavings] = useState('');
  const [price, setPrice] = useState('');

  const parseNumber = (s: string) => {
    let str = s.replace(/\u00a0/g, ' ').trim();
    if (str === '') return NaN;
    str = str.replace(/\s+/g, '');
    const hasDot = str.includes('.');
    const hasComma = str.includes(',');
    if (hasDot && hasComma) {
      str = str.replace(/\./g, '').replace(',', '.');
    } else if (hasComma) {
      str = str.replace(',', '.');
    }
    const n = Number(str);
    return Number.isFinite(n) ? n : NaN;
  };
  const investmentNum = parseNumber(investment);
  const savingsNum = parseNumber(savings);
  const priceNum = parseNumber(price);
  const canCalc = investmentNum > 0 && savingsNum > 0 && priceNum > 0;
  const annualSavings = savingsNum * priceNum;
  const payback = canCalc ? investmentNum / annualSavings : null;
  const roiPercent = canCalc ? (annualSavings / investmentNum) * 100 : null;

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
                  <label htmlFor={investmentId} className="block mb-1 text-sm font-medium">
                    Investitionskosten (EUR)
                  </label>
                  <Input
                    id={investmentId}
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label htmlFor={savingsId} className="block mb-1 text-sm font-medium">
                    Jährliche Energieeinsparung (kWh)
                  </label>
                  <Input
                    id={savingsId}
                    type="number"
                    value={savings}
                    onChange={(e) => setSavings(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label htmlFor={priceId} className="block mb-1 text-sm font-medium">
                    Energiepreis (EUR/kWh)
                  </label>
                  <Input
                    id={priceId}
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
                  <p>
                    Amortisationszeit:{' '}
                    {payback?.toLocaleString('de-DE', {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}{' '}
                    Jahre
                  </p>
                  <p>
                    Jährliche Rendite:{' '}
                    {roiPercent?.toLocaleString('de-DE', {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}%
                  </p>
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
