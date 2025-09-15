import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Question {
  id: number;
  text: string;
}

const questions: Question[] = [
  { id: 1, text: 'Ist Ihr Gebäude gut gedämmt?' },
  { id: 2, text: 'Nutzen Sie erneuerbare Energien?' },
  { id: 3, text: 'Sind Ihre Fenster modern und isolierend?' }
];

type Answer = 'yes' | 'no';
type AnswerMap = Record<number, Answer>;

const EnergieCheckPage = () => {
  const [answers, setAnswers] = useState<AnswerMap>({});

  const handleChange = (id: number, value: Answer) => {
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
              <RadioGroup
                value={answers[q.id] ?? ''}
                onValueChange={(val) => handleChange(q.id, val as Answer)}
              >
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
    </div>
  );
};

export default EnergieCheckPage;
