import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { fetchHouseholdEnergyConsumption, HouseholdEnergyConsumption } from '@/integrations/energyConsumption';

interface Question {
  id: number;
  text: string;
}

const questions: Question[] = [
  { id: 1, text: 'Ist Ihr Gebäude gut gedämmt?' },
  { id: 2, text: 'Nutzen Sie erneuerbare Energien?' },
  { id: 3, text: 'Sind Ihre Fenster modern und isolierend?' }
];

type AnswerMap = Record<number, string>;

const EnergieCheckPage = () => {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [consumption, setConsumption] = useState<HouseholdEnergyConsumption | null>(null);

  useEffect(() => {
    fetchHouseholdEnergyConsumption().then(setConsumption).catch(() => {
      /* ignore errors for now */
    });
  }, []);

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const positive = Object.values(answers).filter((v) => v === 'yes').length;
  const message = positive >= 2 ? 'Gute Ausgangslage für Ihr Zuhause' : 'Es besteht Verbesserungsbedarf';

  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Energie-Check</h1>
      <p className="text-muted-foreground mb-6">
        Beantworten Sie die folgenden Fragen für eine erste Einschätzung.
      </p>
      <div className="space-y-4">
        {questions.map((q) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle className="text-lg">{q.text}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup onValueChange={(val) => handleChange(q.id, val)}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="yes" id={`yes-${q.id}`} />
                  <Label htmlFor={`yes-${q.id}`}>Ja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`no-${q.id}`} />
                  <Label htmlFor={`no-${q.id}`}>Nein</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>
      {Object.keys(answers).length === questions.length && (
        <Card>
          <CardHeader>
            <CardTitle>Ergebnis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{message}</p>
          </CardContent>
        </Card>
      )}
      {consumption && (
        <Card>
          <CardHeader>
            <CardTitle>Bundesweite Referenz</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Energieverbrauch privater Haushalte in Deutschland ({consumption.year}):{' '}
              {consumption.valueTJ.toLocaleString()} TJ
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnergieCheckPage;
