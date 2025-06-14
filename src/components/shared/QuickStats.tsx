
import React, { useState, useEffect, useRef } from 'react';

const quickStatsData = [
  { label: "Heizkosten-Ersparnis:", value: "bis 40%", color: "text-green-600" },
  { label: "BAFA-Förderung:", value: "bis 70%", color: "text-blue-600" },
  { label: "Amortisation:", value: "8-15 Jahre", color: "text-orange-600" },
  { label: "CO2-Einsparung:", value: "bis 80%", color: "text-purple-600" },
];

const QuickStats = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsFading(true);
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quickStatsData.length);
        setIsFading(false);
      }, 300); // Should match animation duration
    }, 4000); // Time each stat is visible

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const currentStat = quickStatsData[currentIndex];

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border">
      <h3 className="font-semibold text-gray-900 mb-4">Wussten Sie schon?</h3>
      <div className="text-sm h-6 relative overflow-hidden">
        <div
          className={`absolute inset-0 flex items-center justify-between transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
        >
          <span className="text-gray-600">{currentStat.label}</span>
          <span className={`font-semibold ${currentStat.color}`}>{currentStat.value}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
