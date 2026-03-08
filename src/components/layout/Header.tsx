
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const toolsItems = [
    { title: "Smart Home Produkte", to: "/smart-home-produkte", description: "Produktvergleich: Thermostate, Sensoren & Steuerungen" },
  ];

  const wissenswertesItems = [
    { title: "Externe Links & Portale", to: "/wissenswertes/links", description: "Kuratierte Sammlung wichtiger Websites und Portale" },
    { title: "Rechner & Tools", to: "/wissenswertes/tools", description: "Interaktive Berechnungstools und Planungshilfen" },
    { title: "Downloads & Checklisten", to: "/wissenswertes/downloads", description: "Kostenlose PDFs und Excel-Vorlagen" },
    { title: "Videos & Tutorials", to: "/wissenswertes/videos", description: "Lehrreiche Videos und Schritt-für-Schritt Anleitungen" },
    { title: "Community & Erfahrungen", to: "/wissenswertes/community", description: "Erfolgsgeschichten und Erfahrungsaustausch" },
    { title: "Hersteller & Experten", to: "/wissenswertes/experten", description: "Energieberater-Suche und Hersteller-Verzeichnis" }
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-background focus:text-primary focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:ring-2 focus:ring-primary"
      >
        Zum Hauptinhalt springen
      </a>

      <header
        role="banner"
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-border"
            : "bg-background/80 backdrop-blur-sm border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                  <Zap className="text-primary-foreground w-5 h-5" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
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
                              <Link to={topic.seoUrl} className="text-sm">{topic.name}</Link>
                            </SheetClose>
                          ))}
                          <SheetClose asChild>
                            <Link to="/smart-home-produkte" className="text-sm">Smart Home Produkte</Link>
                          </SheetClose>
                        </div>
                      </div>
                    ) : item.name === 'Wissenswertes' ? (
                      <div key={item.name} className="space-y-2">
                        <span className="font-semibold text-lg">{item.name}</span>
                        <div className="ml-2 flex flex-col space-y-1">
                          {wissenswertesItems.map((wissenswertesItem) => (
                            <SheetClose asChild key={wissenswertesItem.to}>
                              <Link to={wissenswertesItem.to} className="text-sm">{wissenswertesItem.title}</Link>
                            </SheetClose>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <SheetClose asChild key={item.name}>
                        <Link to={item.href} className="font-semibold text-lg">{item.name}</Link>
                      </SheetClose>
                    )
                  ))}
                  {profile?.role === 'admin' && (
                    <div className="space-y-2">
                      <SheetClose asChild><Link to="/admin" className="font-semibold text-lg">Admin Dashboard</Link></SheetClose>
                      <SheetClose asChild><Link to="/admin/blog" className="font-semibold text-lg">Blog-Verwaltung</Link></SheetClose>
                      <SheetClose asChild><Link to="/admin/blog/generator" className="font-semibold text-lg">Blog Generator</Link></SheetClose>
                    </div>
                  )}
                  {session && profile?.role !== 'admin' && (
                    <SheetClose asChild><Link to="/dashboard" className="font-semibold text-lg">Dashboard</Link></SheetClose>
                  )}
                  {!session && (
                    <SheetClose asChild><Link to="/auth" className="font-semibold text-lg">Login</Link></SheetClose>
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
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {siteConfig.contentTopics.map((topic) => (
                                <ListItem key={topic.id} to={topic.seoUrl} title={topic.name}>{topic.description}</ListItem>
                              ))}
                              <ListItem to="/smart-home-produkte" title="Smart Home Produkte">Produktvergleich: Thermostate, Sensoren & Steuerungen</ListItem>
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : item.name === 'Wissenswertes' ? (
                        <>
                          <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                              {wissenswertesItems.map((w) => (
                                <ListItem key={w.to} to={w.to} title={w.title}>{w.description}</ListItem>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link to={item.href} className={navigationMenuTriggerStyle()}>{item.name}</Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex items-center space-x-2 ml-4">
                {profile?.role === 'admin' && (
                  <>
                    <Link to="/admin" className={cn(navigationMenuTriggerStyle(), 'bg-transparent hover:text-primary font-semibold')}>Admin Dashboard</Link>
                    <Link to="/admin/blog" className={cn(navigationMenuTriggerStyle(), 'bg-transparent hover:text-primary font-semibold')}>Blog-Verwaltung</Link>
                    <Link to="/admin/blog/generator" className={cn(navigationMenuTriggerStyle(), 'bg-transparent hover:text-primary font-semibold')}>Blog Generator</Link>
                  </>
                )}
                {session && profile?.role !== 'admin' && (
                  <Link to="/dashboard" className={cn(navigationMenuTriggerStyle(), 'bg-transparent hover:text-primary font-semibold')}>Dashboard</Link>
                )}
                {!session && (
                  <Link to="/auth" className="px-3 py-1 bg-primary/10 text-primary rounded-md font-medium ml-2 hover:bg-primary/20 transition text-sm">
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
