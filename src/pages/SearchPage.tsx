
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, Mail, MessageCircle } from "lucide-react";
import FullTextSearch from "@/components/search/FullTextSearch";
import PersonalizedRecommendations from "@/components/recommendations/PersonalizedRecommendations";
import NewsletterIntegration from "@/components/newsletter/NewsletterIntegration";

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Entdecken & Suchen
          </h1>
          <p className="text-gray-600">
            Finden Sie die besten Artikel zu Energieeffizienz und Modernisierung
          </p>
        </div>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Volltext-Suche
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Empfehlungen
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Newsletter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="mt-6">
            <FullTextSearch />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <PersonalizedRecommendations />
          </TabsContent>

          <TabsContent value="newsletter" className="mt-6">
            <NewsletterIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchPage;
