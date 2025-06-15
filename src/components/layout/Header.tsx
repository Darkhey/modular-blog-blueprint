
import { useState, useEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const ListItem = forwardRef<
  ElementRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Header = () => {
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
          {/* Logo/Brand */}
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

          {/* Navigation */}
          <nav className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {siteConfig.navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {'isDropdown' in item && item.isDropdown ? (
                      <>
                        <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {siteConfig.contentTopics.map((topic) => (
                              <ListItem
                                key={topic.id}
                                to={topic.seoUrl}
                                title={topic.name}
                              >
                                {topic.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link to={item.href} className={navigationMenuTriggerStyle()}>
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center space-x-2 ml-4">
              {profile?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:text-blue-600 font-semibold")}
                >
                  Admin
                </Link>
              )}
              {!session && (
                <Link
                  to="/auth"
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-md font-medium ml-2 hover:bg-green-200 transition text-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
