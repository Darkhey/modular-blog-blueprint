
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { toast } from "sonner";

interface NewsletterCampaign {
  id: string;
  title: string;
  content: string;
  scheduled_for: string;
  status: 'draft' | 'scheduled' | 'sent';
  subscriber_count: number;
  open_rate?: number;
}

const NewsletterIntegration = () => {
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([]);
  const [subscribers, setSubscribers] = useState<number>(0);
  const [newArticles, setNewArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
    fetchNewArticles();
    fetchCampaigns();
  }, []);

  const fetchSubscribers = async () => {
    const { count } = await supabase
      .from("newsletter_subscriptions")
      .select("*", { count: 'exact', head: true });
    
    setSubscribers(count || 0);
  };

  const fetchNewArticles = async () => {
    // Get articles from last week that could be included in newsletter
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq('status', 'published')
      .gte('published_at', lastWeek.toISOString())
      .order('published_at', { ascending: false })
      .limit(5);
    
    if (data) setNewArticles(data);
  };

  const fetchCampaigns = async () => {
    // Mock data - in reality this would come from your newsletter service
    const mockCampaigns: NewsletterCampaign[] = [
      {
        id: '1',
        title: 'Wöchentlicher Energie-Newsletter',
        content: 'Die neuesten Artikel zu Energieeffizienz und Modernisierung',
        scheduled_for: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: 'scheduled',
        subscriber_count: subscribers,
        open_rate: 0.24
      },
      {
        id: '2',
        title: 'Dämmungs-Special',
        content: 'Alles über neue Dämmtechnologien und Fördermöglichkeiten',
        scheduled_for: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'sent',
        subscriber_count: subscribers,
        open_rate: 0.31
      }
    ];
    
    setCampaigns(mockCampaigns);
    setLoading(false);
  };

  const generateNewsletterFromArticles = async () => {
    if (newArticles.length === 0) {
      toast.error("Keine neuen Artikel für Newsletter verfügbar");
      return;
    }

    // Auto-generate newsletter content
    const content = `
      <h2>Neue Artikel diese Woche</h2>
      ${newArticles.map(article => `
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h3>${article.title}</h3>
          <p>${article.excerpt}</p>
          <a href="/blog/${article.slug}" style="color: #3B82F6;">Artikel lesen →</a>
        </div>
      `).join('')}
    `;

    const newCampaign: NewsletterCampaign = {
      id: Math.random().toString(),
      title: `Newsletter ${format(new Date(), 'dd.MM.yyyy', { locale: de })}`,
      content,
      scheduled_for: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
      status: 'draft',
      subscriber_count: subscribers
    };

    setCampaigns([newCampaign, ...campaigns]);
    toast.success("Newsletter-Entwurf erstellt");
  };

  const sendTestNewsletter = async (campaignId: string) => {
    // In reality, this would integrate with your email service
    toast.success("Test-Newsletter versendet");
  };

  const scheduleCampaign = async (campaignId: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === campaignId 
        ? { ...c, status: 'scheduled' as const }
        : c
    ));
    toast.success("Newsletter geplant");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div>Lade Newsletter-Daten...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Newsletter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Abonnenten</p>
                <p className="text-2xl font-bold">{subscribers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Neue Artikel</p>
                <p className="text-2xl font-bold">{newArticles.length}</p>
              </div>
              <Mail className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Öffnungsrate</p>
                <p className="text-2xl font-bold">28%</p>
              </div>
              <Send className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auto-generate Newsletter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Newsletter automatisch generieren
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Erstellen Sie automatisch einen Newsletter aus den neuesten Artikeln.
          </p>
          
          {newArticles.length > 0 && (
            <div className="space-y-2">
              <p className="font-medium">Neue Artikel diese Woche:</p>
              {newArticles.map(article => (
                <div key={article.id} className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {article.title}
                </div>
              ))}
            </div>
          )}
          
          <Button 
            onClick={generateNewsletterFromArticles}
            disabled={newArticles.length === 0}
          >
            <Mail className="h-4 w-4 mr-2" />
            Newsletter generieren
          </Button>
        </CardContent>
      </Card>

      {/* Newsletter Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Newsletter-Kampagnen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{campaign.title}</h4>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {campaign.content.substring(0, 100)}...
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(campaign.scheduled_for), 'dd.MM.yyyy HH:mm', { locale: de })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {campaign.subscriber_count} Abonnenten
                      </span>
                      {campaign.open_rate && (
                        <span>Öffnungsrate: {(campaign.open_rate * 100).toFixed(1)}%</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {campaign.status === 'draft' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendTestNewsletter(campaign.id)}
                        >
                          Test senden
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => scheduleCampaign(campaign.id)}
                        >
                          Planen
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterIntegration;
