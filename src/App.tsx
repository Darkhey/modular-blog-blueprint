
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CategoryPage from "./pages/CategoryPage";
import Wissenswertes from "./pages/Wissenswertes";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/ui/CookieConsent";
import HeizkostenrechnerPage from "./pages/HeizkostenrechnerPage";
import DaemmungsrechnerPage from "./pages/DaemmungsrechnerPage";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";

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
          
          <Route path="/heizung-modernisieren" element={<HeizkostenrechnerPage />} />
          <Route path="/daemmung-isolierung" element={<DaemmungsrechnerPage />} />
          
          {/* Dynamische Kategorieseite */}
          <Route path="/themen/:slug" element={<CategoryPage />} />

          {/* Legacy/Alias Routen */}
          <Route path="/themen" element={<Blog />} />
          <Route path="/ratgeber" element={<Blog />} />
          
          <Route path="/wissenswertes" element={<Wissenswertes />} />
          <Route path="/newsletter" element={<Index />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
