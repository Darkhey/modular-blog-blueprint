
import { useState, useEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Menu } from 'lucide-react';
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
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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

  const wissenswertesItems = [
    { title: "Externe Links & Portale", to: "/wissenswertes/links", description: "Kuratierte Sammlung wichtiger Websites und Portale" },
    { title: "Rechner & Tools", to: "/wissenswertes/tools", description: "Interaktive Berechnungstools und Planungshilfen" },
    { title: "Downloads & Checklisten", to: "/wissenswertes/downloads", description: "Kostenlose PDFs und Excel-Vorlagen" },
    { title: "Videos & Tutorials", to: "/wissenswertes/videos", description: "Lehrreiche Videos und Schritt-für-Schritt Anleitungen" },
    { title: "Community & Erfahrungen", to: "/wissenswertes/community", description: "Erfolgsgeschichten und Erfahrungsaustausch" },
    { title: "Hersteller & Experten", to: "/wissenswertes/experten", description: "Energieberater-Suche und Hersteller-Verzeichnis" }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      {/* Auto Ads are handled via AdSense dashboard - no manual banner code needed */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 via-blue-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="text-white w-5 h-5" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pt-10">
              <nav className="flex flex-col space-y-4">
                {siteConfig.navigation.map((item) => (
                  'isDropdown' in item && item.isDropdown ? (
                    <div key={item.name} className="space-y-2">
                      <span className="font-semibold text-lg">{item.name}</span>
                      <div className="ml-2 flex flex-col space-y-1">
                        {siteConfig.contentTopics.map((topic) => (
                          <SheetClose asChild key={topic.id}>
                            <Link to={topic.seoUrl} className="text-sm">
                              {topic.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                  ) : item.name === 'Wissenswertes' ? (
                    <div key={item.name} className="space-y-2">
                      <span className="font-semibold text-lg">{item.name}</span>
                      <div className="ml-2 flex flex-col space-y-1">
                        {wissenswertesItems.map((wissenswertesItem) => (
                          <SheetClose asChild key={wissenswertesItem.to}>
                            <Link to={wissenswertesItem.to} className="text-sm">
                              {wissenswertesItem.title}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <SheetClose asChild key={item.name}>
                      <Link to={item.href} className="font-semibold text-lg">
                        {item.name}
                      </Link>
                    </SheetClose>
                  )
                ))}
                {profile?.role === 'admin' && (
                  <div className="space-y-2">
                    <SheetClose asChild>
                      <Link to="/admin" className="font-semibold text-lg">
                        Admin Dashboard
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/admin/blog" className="font-semibold text-lg">
                        Blog-Verwaltung
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/admin/blog/generator" className="font-semibold text-lg">
                        Blog Generator
                      </Link>
                    </SheetClose>
                  </div>
                )}
                {session && profile?.role !== 'admin' && (
                  <SheetClose asChild>
                    <Link to="/dashboard" className="font-semibold text-lg">
                      Dashboard
                    </Link>
                  </SheetClose>
                )}
                {!session && (
                  <SheetClose asChild>
                    <Link to="/auth" className="font-semibold text-lg">
                      Login
                    </Link>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
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
                    ) : item.name === 'Wissenswertes' ? (
                      <>
                        <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {wissenswertesItems.map((wissenswertesItem) => (
                              <ListItem
                                key={wissenswertesItem.to}
                                to={wissenswertesItem.to}
                                title={wissenswertesItem.title}
                              >
                                {wissenswertesItem.description}
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
                <>
                  <Link
                    to="/admin"
                    className={cn(navigationMenuTriggerStyle(), 'bg-transparent hover:text-blue-600 font-semibold')}
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    to="/admin/blog"
                    className={cn(navigationMenuTriggerStyle(), 'bg-transparent hover:text-blue-600 font-semibold')}
                  >
                    Blog-Verwaltung
                  </Link>
                  <Link
                    to="/admin/blog/generator"
                    className={cn(navigationMenuTriggerStyle(), 'bg-transparent hover:text-blue-600 font-semibold')}
                  >
                    Blog Generator
                  </Link>
                </>
              )}
              {session && profile?.role !== 'admin' && (
                <Link
                  to="/dashboard"
                  className={cn(navigationMenuTriggerStyle(), 'bg-transparent hover:text-blue-600 font-semibold')}
                >
                  Dashboard
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
