import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Heart, Star, Users, TrendingUp, Award } from 'lucide-react';

const CommunitySection = () => {
  const successStories = [
    {
      name: "Familie Schneider",
      location: "München",
      project: "Komplette Dachsanierung",
      savings: "€1.200/Jahr",
      rating: 5,
      story: "Durch die professionelle Beratung haben wir 30% mehr Förderung erhalten als ursprünglich geplant.",
      avatar: "/placeholder.svg",
      likes: 24,
      responses: 8
    },
    {
      name: "Thomas Bauer",
      location: "Hamburg", 
      project: "Wärmepumpe Installation",
      savings: "€800/Jahr",
      rating: 5,
      story: "Die Schritt-für-Schritt Anleitung war perfekt. Installation verlief problemlos.",
      avatar: "/placeholder.svg",
      likes: 18,
      responses: 12
    }
  ];

  const forumTopics = [
    {
      title: "Beste Zeit für Dachsanierung?",
      author: "SanierungsProfi23",
      replies: 15,
      views: 234,
      lastActivity: "vor 2 Stunden",
      isHot: true
    },
    {
      title: "Erfahrungen mit KfW-Förderung",
      author: "HausbesitzerHH",
      replies: 23,
      views: 456,
      lastActivity: "vor 4 Stunden",
      isHot: false
    },
    {
      title: "Wärmepumpe vs. Gasheizung 2025",
      author: "EnergieExperte",
      replies: 31,
      views: 789,
      lastActivity: "vor 1 Tag",
      isHot: true
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Community & Erfahrungen</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Lernen Sie von anderen Hausbesitzern und tauschen Sie sich mit Experten aus
        </p>
      </div>

      {/* Success Stories */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Award className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-semibold text-foreground">Erfolgsgeschichten</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {successStories.map((story, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={story.avatar} />
                      <AvatarFallback>{story.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{story.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{story.location}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: story.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{story.project}</Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {story.savings}
                  </Badge>
                </div>
                
                <CardDescription className="text-base italic">
                  "{story.story}"
                </CardDescription>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{story.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{story.responses}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Vollständige Geschichte
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Forum Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold text-foreground">Community Forum</h3>
          </div>
          <Button variant="outline">
            Alle Diskussionen
          </Button>
        </div>
        
        <div className="space-y-4">
          {forumTopics.map((topic, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                        {topic.title}
                      </h4>
                      {topic.isHot && (
                        <Badge variant="destructive" className="text-xs">
                          Hot
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>von {topic.author}</span>
                      <span>•</span>
                      <span>{topic.replies} Antworten</span>
                      <span>•</span>
                      <span>{topic.views} Aufrufe</span>
                      <span>•</span>
                      <span>{topic.lastActivity}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Antworten
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button size="lg">
          <Users className="h-5 w-5 mr-2" />
          Community beitreten
        </Button>
      </div>
    </div>
  );
};

export default CommunitySection;