
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<{ role: string } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (!error && data) {
          setProfile(data);
        }
      };
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [session]);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      {siteConfig.adsEnabled && siteConfig.adsSettings.positions.headerBanner && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b px-4 py-2">
          <div className="max-w-7xl mx-auto">
            <div dangerouslySetInnerHTML={{ __html: siteConfig.adsSettings.adCodes.banner }} />
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand mit coolem Design */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 via-blue-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="text-white w-5 h-5" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {siteConfig.projectName}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block font-medium">{siteConfig.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation mit SEO-URLs */}
          <nav className="hidden md:flex items-center space-x-8">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative text-gray-700 hover:text-green-600 font-medium transition-all duration-300 group"
              >
                {item.name}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
            {profile?.role === 'admin' && (
              <Link
                to="/admin"
                className="relative text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 group ml-4"
              >
                Admin
              </Link>
            )}
            {!session && (
              <Link
                to="/auth"
                className="px-3 py-1 bg-green-100 text-green-700 rounded-md font-medium ml-2 hover:bg-green-200 transition"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button mit Animation */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <Menu 
                className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} 
                size={24} 
              />
              <X 
                className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} 
                size={24} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation mit SEO-URLs */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t bg-white/50 backdrop-blur-sm">
            <nav className="py-4 space-y-1">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors rounded-lg mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {profile?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block px-4 py-3 text-blue-700 hover:bg-blue-50 transition-colors rounded-lg mx-2 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {!session && (
                <Link
                  to="/auth"
                  className="block px-4 py-3 text-green-700 hover:bg-green-50 transition-colors rounded-lg mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
