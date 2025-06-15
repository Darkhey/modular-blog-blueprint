
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CategoryPage from "./pages/CategoryPage";
import DaemmungsrechnerPage from "./pages/DaemmungsrechnerPage";
import HeizkostenrechnerPage from "./pages/HeizkostenrechnerPage";
import SolarenergiePage from "./pages/SolarenergiePage";
import FensterTuerenPage from "./pages/FensterTuerenPage";
import SmartHomePage from "./pages/SmartHomePage";
import FoerdermittelPage from "./pages/FoerdermittelPage";
import Wissenswertes from "./pages/Wissenswertes";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogPosts from "./pages/AdminBlogPosts";
import SearchPage from "./pages/SearchPage";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                  <Route path="/daemmungsrechner" element={<DaemmungsrechnerPage />} />
                  <Route path="/heizkostenrechner" element={<HeizkostenrechnerPage />} />
                  <Route path="/solarenergie" element={<SolarenergiePage />} />
                  <Route path="/fenster-tueren" element={<FensterTuerenPage />} />
                  <Route path="/smart-home" element={<SmartHomePage />} />
                  <Route path="/foerdermittel" element={<FoerdermittelPage />} />
                  <Route path="/wissenswertes" element={<Wissenswertes />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/kontakt" element={<Kontakt />} />
                  <Route path="/impressum" element={<Impressum />} />
                  <Route path="/datenschutz" element={<Datenschutz />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/blog-posts" element={<AdminBlogPosts />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
