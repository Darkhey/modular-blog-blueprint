
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, TrendingUp, Award, Users } from 'lucide-react';
import React from 'react';

const blogStatsData = [
    {
      icon: BookOpen,
      title: "Ratgeber-Artikel",
      value: "40+",
      description: "Fundierte Artikel zu allen Sanierungsthemen",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Mögliche Ersparnis",
      value: "bis zu 30%",
      description: "Reduktion der Energiekosten nach Sanierung",
      color: "text-green-600"
    },
    {
      icon: Award,
      title: "Begleitete Projekte",
      value: "500+",
      description: "Sanierungen mit unseren Tipps umgesetzt",
      color: "text-orange-600"
    },
    {
      icon: Users,
      title: "Zufriedene Leser",
      value: "3.000+",
      description: "Hausbesitzer vertrauen unserem Ratgeber",
      color: "text-purple-600"
    }
  ];

const BlogStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {blogStatsData.map((stat, index) => (
        <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="pb-3">
            <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
            <CardTitle className="text-lg">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <CardDescription>{stat.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogStats;
