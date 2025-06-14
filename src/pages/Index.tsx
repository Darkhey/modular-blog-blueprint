
import { ArrowRight, Calculator, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SavingsCalculator from '@/components/calculators/SavingsCalculator';
import InsulationManufacturers from '@/components/manufacturers/InsulationManufacturers';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import AdSlot from '@/components/ui/AdSlot';
import { siteConfig } from '@/config/site.config';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sanieren & Sparen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Ihr vertrauensvoller Ratgeber für energieeffiziente Sanierung, Modernisierung 
            und nachhaltige Kosteneinsparung im Eigenheim.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to="/blog">
                Ratgeber entdecken
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/foerdermittel">
                Fördermittel finden
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardHeader className="pb-3">
                  <Calculator className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Kosteneinsparung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 mb-1">bis 40%</div>
                  <CardDescription>weniger Heizkosten durch Modernisierung</CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader className="pb-3">
                  <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Förderung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600 mb-1">bis 70%</div>
                  <CardDescription>staatliche Zuschüsse für Ihre Sanierung</CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader className="pb-3">
                  <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Amortisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600 mb-1">8-15 Jahre</div>
                  <CardDescription>bis sich Ihre Investition amortisiert</CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Categories Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Unsere Schwerpunkte</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteConfig.contentTopics.map((topic) => (
                  <Card key={topic.id} className="group hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: topic.color }}
                      >
                        <span className="text-white font-bold text-lg">
                          {topic.name.charAt(0)}
                        </span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                        <Link to={topic.seoUrl}>{topic.name}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {topic.description}
                      </CardDescription>
                      <Link 
                        to={topic.seoUrl}
                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        Mehr erfahren →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Savings Calculator */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kostenrechner</h2>
              <SavingsCalculator /> 
            </div>

            {/* Insulation Manufacturers */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Führende Dämmstoffhersteller</h2>
              <InsulationManufacturers />
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border mb-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Bereit für Ihre Sanierung?
                </h3>
                <p className="text-gray-600 mb-4">
                  Entdecken Sie alle Möglichkeiten zur Kosteneinsparung und Förderung.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link to="/blog">
                    Zum Ratgeber
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar - genau wie im Blog */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Sidebar Ad */}
              {siteConfig.adsEnabled && siteConfig.adsSettings.positions.sidebarTop && (
                <AdSlot position="sidebar" />
              )}

              {/* Newsletter Signup */}
              {siteConfig.newsletter.enabled && (
                <NewsletterSignup />
              )}

              {/* Quick Links */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold text-gray-900 mb-4">Schnellzugriff</h3>
                <div className="space-y-2">
                  <Link
                    to="/foerdermittel"
                    className="block w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
                  >
                    Fördermittel finden
                  </Link>
                  <Link
                    to="/heizung-modernisieren"
                    className="block w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
                  >
                    Heizung modernisieren
                  </Link>
                  <Link
                    to="/daemmung-isolierung"
                    className="block w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
                  >
                    Dämmung planen
                  </Link>
                  <Link
                    to="/blog"
                    className="block w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
                  >
                    Alle Artikel
                  </Link>
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

export default Index;
