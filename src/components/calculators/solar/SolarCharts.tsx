import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { SolarResults } from '@/types/solarCalculator';

interface SolarChartsProps {
  results: SolarResults;
}

const SolarCharts = ({ results }: SolarChartsProps) => {
  // Monatliche Ertragsdaten
  const monthlyData = results.monatlicheErtraege.map((ertrag, index) => ({
    monat: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'][index],
    ertrag
  }));

  // Verteilung der Stromnutzung
  const stromVerteilung = [
    { name: 'Eigenverbrauch', value: results.eigenverbrauchMitSpeicher, color: '#22c55e' },
    { name: 'Netzeinspeisung', value: results.netzeinspeisung, color: '#3b82f6' },
  ];

  // 5-Jahres-Prognose für Linienchart
  const jahresPrognose = results.jahresprognose.slice(0, 5).map(jahr => ({
    jahr: `Jahr ${jahr.jahr}`,
    ersparnis: jahr.ersparnis,
    kumulativ: jahr.kumulativeErsparnis
  }));

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monatlicher Ertrag */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Monatlicher Stromertrag</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monat" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} kWh`, 'Ertrag']}
                labelStyle={{ color: '#000' }}
              />
              <Bar dataKey="ertrag" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Stromverteilung */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Stromverteilung pro Jahr</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={stromVerteilung}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {stromVerteilung.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()} kWh`, '']}
                labelStyle={{ color: '#000' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {stromVerteilung.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="font-semibold">{item.value.toLocaleString()} kWh</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5-Jahres-Entwicklung */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">Entwicklung der ersten 5 Jahre</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={jahresPrognose}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jahr" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `${value.toLocaleString()} €`, 
                  name === 'ersparnis' ? 'Jährliche Ersparnis' : 'Kumulative Ersparnis'
                ]}
                labelStyle={{ color: '#000' }}
              />
              <Line 
                type="monotone" 
                dataKey="ersparnis" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="ersparnis"
              />
              <Line 
                type="monotone" 
                dataKey="kumulativ" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="kumulativ"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolarCharts;