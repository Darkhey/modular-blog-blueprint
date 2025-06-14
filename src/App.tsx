
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CategoryPage from "./pages/CategoryPage";
import Links from "./pages/Links";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* SEO-optimierte Kategorie-Routen */}
          <Route path="/heizung-modernisieren" element={<CategoryPage category="heizung" />} />
          <Route path="/daemmung-isolierung" element={<CategoryPage category="daemmung" />} />
          <Route path="/foerdermittel" element={<CategoryPage category="foerderung" />} />
          <Route path="/fenster-tueren" element={<CategoryPage category="fenster" />} />
          <Route path="/solarenergie" element={<CategoryPage category="solar" />} />
          <Route path="/smart-home" element={<CategoryPage category="smart-home" />} />
          
          {/* Legacy/Alias Routen */}
          <Route path="/themen" element={<Blog />} />
          <Route path="/themen/:topic" element={<CategoryPage />} />
          <Route path="/ratgeber" element={<Blog />} />
          
          <Route path="/links" element={<Links />} />
          <Route path="/newsletter" element={<Index />} />
          <Route path="/kontakt" element={<Links />} />
          <Route path="/impressum" element={<Links />} />
          <Route path="/datenschutz" element={<Links />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
