
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, TrendingUp, Award, Users } from 'lucide-react';
import React from 'react';

const blogStatsData = [
    {
      icon: BookOpen,
      title: "Ratgeber-Artikel",
      value: "120+",
      description: "Fundierte Artikel zu allen Themen der Sanierung",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Durchschnittliche Ersparnis",
      value: "25%",
      description: "Energiekosten-Reduktion unserer Leser",
      color: "text-green-600"
    },
    {
      icon: Award,
      title: "Erfolgreiche Projekte",
      value: "2.500+",
      description: "Sanierungen mit unseren Tipps realisiert",
      color: "text-orange-600"
    },
    {
      icon: Users,
      title: "Community",
      value: "15.000+",
      description: "Hausbesitzer vertrauen unserem Ratgeber",
      color: "text-purple-600"
    }
  ];

const BlogStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {blogStatsData.map((stat, index) => (
        <Card key={index} className="text-center hover:shadow-md transition-shadow duration-300">
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
