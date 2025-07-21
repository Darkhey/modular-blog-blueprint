
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CookieConsent from "./components/ui/CookieConsent";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CategoryPage from "./pages/CategoryPage";
import FoerdermittelPage from "./pages/FoerdermittelPage";
import DaemmungsrechnerPage from "./pages/DaemmungsrechnerPage";
import DaemmungIsolierungPage from "./pages/DaemmungIsolierungPage";
import HeizkostenrechnerPage from "./pages/HeizkostenrechnerPage";
import HeizungModernisierenPage from "./pages/HeizungModernisierenPage";
import SolarenergiePage from "./pages/SolarenergiePage";
import FensterTuerenPage from "./pages/FensterTuerenPage";
import SmartHomePage from "./pages/SmartHomePage";
import WissenswertesIndex from "./pages/wissenswertes/WissenswertesIndex";
import WissenswertesLinks from "./pages/wissenswertes/WissenswertesLinks";
import WissenswertesTools from "./pages/wissenswertes/WissenswertesTools";
import WissenswertesDownloads from "./pages/wissenswertes/WissenswertesDownloads";
import WissenswertesVideos from "./pages/wissenswertes/WissenswertesVideos";
import WissenswertesCommunity from "./pages/wissenswertes/WissenswertesCommunity";
import WissenswertesExperten from "./pages/wissenswertes/WissenswertesExperten";
import ProjektplanerPage from "./pages/ProjektplanerPage";
import BudgetplanPage from "./pages/BudgetplanPage";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogPosts from "./pages/AdminBlogPosts";
import AdminBlogGenerator from "./pages/AdminBlogGenerator";
import UserDashboard from "./pages/UserDashboard";
import AdminLayout from "./components/layout/AdminLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/themen/:categorySlug" element={<CategoryPage />} />
                  <Route path="/foerdermittel" element={<FoerdermittelPage />} />
                  <Route path="/daemmungsrechner" element={<DaemmungsrechnerPage />} />
                  <Route path="/daemmung-isolierung" element={<DaemmungIsolierungPage />} />
                  <Route path="/heizkostenrechner" element={<HeizkostenrechnerPage />} />
                  <Route path="/heizung-modernisieren" element={<HeizungModernisierenPage />} />
                  <Route path="/solarenergie" element={<SolarenergiePage />} />
                  <Route path="/fenster-tueren" element={<FensterTuerenPage />} />
                  <Route path="/smart-home" element={<SmartHomePage />} />
                  
                  {/* Wissenswertes nested routes */}
                  <Route path="/wissenswertes" element={<WissenswertesIndex />} />
                  <Route path="/wissenswertes/links" element={<WissenswertesLinks />} />
                  <Route path="/wissenswertes/tools" element={<WissenswertesTools />} />
                  <Route path="/wissenswertes/downloads" element={<WissenswertesDownloads />} />
                  <Route path="/wissenswertes/videos" element={<WissenswertesVideos />} />
                  <Route path="/wissenswertes/community" element={<WissenswertesCommunity />} />
                  <Route path="/wissenswertes/experten" element={<WissenswertesExperten />} />
                  
                  <Route path="/projektplaner" element={<ProjektplanerPage />} />
                  <Route path="/budgetplan" element={<BudgetplanPage />} />
                  <Route path="/kontakt" element={<Kontakt />} />
                  <Route path="/impressum" element={<Impressum />} />
                  <Route path="/datenschutz" element={<Datenschutz />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="blog" element={<AdminBlogPosts />} />
                    <Route path="blog/generator" element={<AdminBlogGenerator />} />
                  </Route>
                  <Route path="/suche" element={<SearchPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <CookieConsent />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
