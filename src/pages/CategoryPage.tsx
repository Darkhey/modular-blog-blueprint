import { useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import AdSlot from '@/components/ui/AdSlot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/config/site.config';
import { mockBlogPosts } from '@/data/mockBlogPosts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CategoryPage = ({ category }: { category?: string }) => {
  const { topic } = useParams();
  const categoryId = category || topic;
  
  const currentTopic = siteConfig.contentTopics.find(t => t.id === categoryId);
  
  if (!currentTopic) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Kategorie nicht gefunden</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = mockBlogPosts.filter(post => 
    post.topic === currentTopic.name
  ).slice(0, 6);

  const benefits = getBenefitsForCategory(categoryId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>{currentTopic.name}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: currentTopic.color }}
            >
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {currentTopic.name}
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                {currentTopic.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Benefits Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: currentTopic.color }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-green-600 w-5 h-5" />
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {benefit.description}
                    </CardDescription>
                    {benefit.savings && (
                      <div className="mt-3 flex items-center space-x-2">
                        <Award className="text-orange-500 w-4 h-4" />
                        <span className="text-sm font-medium text-orange-600">
                          Einsparung: {benefit.savings}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Kostenlose Beratung gewünscht?
                  </h3>
                  <p className="text-gray-600">
                    Lassen Sie sich von unseren Experten beraten und finden Sie die beste Lösung für Ihr Zuhause.
                  </p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Jetzt beraten lassen
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Aktuelle Artikel zu {currentTopic.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((post, index) => (
                    <div key={post.id}>
                      <BlogCard post={post} />
                      {/* Ad after every 4th post */}
                      {(index + 1) % 4 === 0 && siteConfig.adsEnabled && (
                        <div className="mt-6 mb-6">
                          <AdSlot position="banner" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - genau wie im Blog */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Sidebar Ad */}
              {siteConfig.adsEnabled && siteConfig.adsSettings.positions.sidebarTop && (
                <AdSlot position="sidebar" />
              )}

              {/* Popular Topics */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4">Weitere Themen</h3>
                <div className="space-y-2">
                  {siteConfig.contentTopics.filter(t => t.id !== categoryId).slice(0, 4).map((topic) => (
                    <a
                      key={topic.id}
                      href={topic.seoUrl}
                      className="block w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
                    >
                      {topic.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Stats - genau wie im Blog */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4">Wussten Sie schon?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Heizkosten-Ersparnis:</span>
                    <span className="font-semibold text-green-600">bis 40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">BAFA-Förderung:</span>
                    <span className="font-semibold text-blue-600">bis 70%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Amortisation:</span>
                    <span className="font-semibold text-orange-600">8-15 Jahre</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Benefits data for each category
const getBenefitsForCategory = (categoryId: string) => {
  const benefitsMap = {
    heizung: [
      {
        title: "Bis zu 40% Heizkosten sparen",
        description: "Moderne Heizsysteme arbeiten deutlich effizienter als alte Anlagen.",
        savings: "800-1.500€ jährlich"
      },
      {
        title: "BAFA-Förderung bis 70%",
        description: "Staatliche Zuschüsse für Wärmepumpen und erneuerbare Energien.",
        savings: "bis 21.000€ Zuschuss"
      },
      {
        title: "Wertsteigerung der Immobilie",
        description: "Moderne Heiztechnik erhöht den Wert Ihres Hauses nachhaltig.",
        savings: "10-15% Wertsteigerung"
      },
      {
        title: "Umweltschutz & CO2-Einsparung",
        description: "Reduzieren Sie Ihren CO2-Fußabdruck um bis zu 80%.",
        savings: "3-5 Tonnen CO2/Jahr"
      }
    ],
    daemmung: [
      {
        title: "Heizkosten halbieren",
        description: "Professionelle Dämmung kann die Heizkosten um bis zu 50% reduzieren.",
        savings: "1.000-2.000€ jährlich"
      },
      {
        title: "KfW-Förderung nutzen",
        description: "Bis zu 150.000€ günstiger Kredit plus Tilgungszuschuss.",
        savings: "bis 37.500€ Zuschuss"
      },
      {
        title: "Besseres Wohnklima",
        description: "Gleichmäßige Temperaturen und keine kalten Wände mehr.",
        savings: "Komfort-Gewinn"
      },
      {
        title: "Schutz vor Feuchtigkeit",
        description: "Moderne Dämmung verhindert Schimmelbildung und Bauschäden.",
        savings: "Keine Sanierungskosten"
      }
    ],
    foerderung: [
      {
        title: "Bis zu 70% Zuschuss sichern",
        description: "Profitieren Sie von hohen Förderungen für Ihre Sanierungsprojekte.",
        savings: "bis 25.000€ Zuschuss"
      },
      {
        title: "BAFA & KfW optimal kombinieren",
        description: "Maximieren Sie Ihre Einsparungen durch die Kombination verschiedener Programme.",
        savings: "Doppelte Förderung"
      },
      {
        title: "Schnelle Amortisation",
        description: "Durch die Förderung amortisiert sich Ihre Investition deutlich schneller.",
        savings: "Verkürzte Laufzeit"
      },
      {
        title: "Unabhängige Beratung",
        description: "Wir helfen Ihnen, die passenden Förderprogramme zu finden.",
        savings: "Zeitersparnis"
      }
    ],
    fenster: [
      {
        title: "Bis zu 20% Heizkosten sparen",
        description: "Moderne Fenster mit 3-fach Verglasung reduzieren Wärmeverluste deutlich.",
        savings: "400-800€ jährlich"
      },
      {
        title: "KfW-Förderung für Fenstertausch",
        description: "Profitieren Sie von zinsgünstigen Krediten und Zuschüssen.",
        savings: "bis 15% der Kosten"
      },
      {
        title: "Erhöhter Wohnkomfort",
        description: "Neue Fenster sorgen für mehr Ruhe und eine angenehme Raumtemperatur.",
        savings: "Komfort-Gewinn"
      },
      {
        title: "Einbruchschutz",
        description: "Moderne Fenster bieten einen besseren Schutz vor Einbrüchen.",
        savings: "Sicherheits-Plus"
      }
    ],
    solar: [
      {
        title: "Bis zu 70% weniger Stromkosten",
        description: "Mit einer eigenen Solaranlage produzieren Sie Ihren eigenen Strom.",
        savings: "500-1.000€ jährlich"
      },
      {
        title: "Staatliche Förderung nutzen",
        description: "Profitieren Sie von attraktiven Förderprogrammen für Photovoltaik.",
        savings: "bis 30% der Kosten"
      },
      {
        title: "Unabhängigkeit von Strompreisen",
        description: "Machen Sie sich unabhängig von steigenden Strompreisen.",
        savings: "Planungssicherheit"
      },
      {
        title: "Umweltfreundliche Energie",
        description: "Reduzieren Sie Ihren CO2-Fußabdruck und schonen Sie die Umwelt.",
        savings: "CO2-Einsparung"
      }
    ],
    "smart-home": [
      {
        title: "Bis zu 15% Energie sparen",
        description: "Intelligente Heizungssteuerung optimiert Ihren Energieverbrauch.",
        savings: "200-500€ jährlich"
      },
      {
        title: "Komfortable Steuerung",
        description: "Steuern Sie Ihre Heizung bequem per App oder Sprachbefehl.",
        savings: "Zeitersparnis"
      },
      {
        title: "Automatische Anpassung",
        description: "Smarte Thermostate passen die Temperatur automatisch an Ihre Bedürfnisse an.",
        savings: "Kein manuelles Regeln"
      },
      {
        title: "Einfache Installation",
        description: "Die Installation ist einfach und schnell erledigt.",
        savings: "Geringer Aufwand"
      }
    ]
  };

  return benefitsMap[categoryId as keyof typeof benefitsMap] || [];
};

export default CategoryPage;
