
import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

interface AnimatedGaugeProps {
  value: number;
  max: number;
  label: string;
  unit?: string;
  color?: 'green' | 'blue' | 'amber' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

const colorMap = {
  green: { stroke: 'stroke-emerald-500', text: 'text-emerald-600', bg: 'text-emerald-100' },
  blue: { stroke: 'stroke-blue-500', text: 'text-blue-600', bg: 'text-blue-100' },
  amber: { stroke: 'stroke-amber-500', text: 'text-amber-600', bg: 'text-amber-100' },
  red: { stroke: 'stroke-red-500', text: 'text-red-600', bg: 'text-red-100' },
};

const sizeMap = {
  sm: { dim: 100, strokeWidth: 8, fontSize: 'text-lg', labelSize: 'text-[10px]' },
  md: { dim: 140, strokeWidth: 10, fontSize: 'text-2xl', labelSize: 'text-xs' },
  lg: { dim: 180, strokeWidth: 12, fontSize: 'text-3xl', labelSize: 'text-sm' },
};

const AnimatedGauge = ({ value, max, label, unit = '%', color = 'green', size = 'md' }: AnimatedGaugeProps) => {
  const { ref, isInView } = useInView();
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);

  const { dim, strokeWidth, fontSize, labelSize } = sizeMap[size];
  const { stroke, text, bg } = colorMap[color];

  const radius = (dim - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(eased * value);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  const animatedPercentage = max > 0 ? Math.min((animatedValue / max) * 100, 100) : 0;
  const dashOffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} className="-rotate-90">
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className={bg}
          />
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={`${stroke} transition-all duration-100`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${fontSize} font-bold ${text}`}>
            {unit === '€' ? `${Math.round(animatedValue).toLocaleString('de-DE')}` : Math.round(animatedValue)}
          </span>
          <span className={`${labelSize} text-muted-foreground font-medium`}>{unit}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground text-center">{label}</span>
    </div>
  );
};

export default AnimatedGauge;
