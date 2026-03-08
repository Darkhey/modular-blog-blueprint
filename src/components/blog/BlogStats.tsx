
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, TrendingUp, Award, Users } from 'lucide-react';
import { useBlogStats } from '@/hooks/useBlogStats';
import { useInView } from '@/hooks/useInView';
import { useEffect, useState } from 'react';

const useCountUp = (end: number, duration = 1500, start = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start || end === 0) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, start, duration]);
  return value;
};

const BlogStats = () => {
  const { data: stats } = useBlogStats();
  const { ref, isInView } = useInView();

  const postCount = useCountUp(stats?.totalPosts ?? 0, 1200, isInView);
  const viewCount = useCountUp(stats?.totalViews ?? 0, 1800, isInView);

  const blogStatsData = [
    {
      icon: BookOpen,
      title: "Ratgeber-Artikel",
      value: stats ? `${postCount}+` : '40+',
      description: "Fundierte Artikel zu allen Sanierungsthemen",
    },
    {
      icon: TrendingUp,
      title: "Mögliche Ersparnis",
      value: "bis zu 30%",
      description: "Reduktion der Energiekosten nach Sanierung",
    },
    {
      icon: Award,
      title: "Begleitete Projekte",
      value: "500+",
      description: "Sanierungen mit unseren Tipps umgesetzt",
    },
    {
      icon: Users,
      title: "Aufrufe gesamt",
      value: stats ? viewCount.toLocaleString('de-DE') : '3.000+',
      description: "Leser vertrauen unserem Ratgeber",
    },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {blogStatsData.map((stat, index) => (
        <Card
          key={index}
          className={`text-center border-border/60 hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <CardHeader className="pb-3">
            <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
            <CardDescription>{stat.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogStats;
