
import React from 'react';

const quickStatsData = [
  { label: "Heizkosten-Ersparnis:", value: "bis 40%", color: "text-green-600" },
  { label: "BAFA-Förderung:", value: "bis 70%", color: "text-blue-600" },
  { label: "Amortisation:", value: "8-15 Jahre", color: "text-orange-600" },
  { label: "CO2-Einsparung:", value: "bis 80%", color: "text-purple-600" },
];

const QuickStats = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border">
      <h3 className="font-semibold text-gray-900 mb-4">Wussten Sie schon?</h3>
      <div className="space-y-3 text-sm">
        {quickStatsData.map(stat => (
          <div className="flex items-center justify-between" key={stat.label}>
            <span className="text-gray-600">{stat.label}</span>
            <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;
