
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';

interface WissenswertesLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const WissenswertesLayout = ({ title, description, children }: WissenswertesLayoutProps) => {
  const location = useLocation();
  
  const navigationItems = [
    { href: '/wissenswertes/links', label: 'Links & Portale' },
    { href: '/wissenswertes/tools', label: 'Rechner & Tools' },
    { href: '/wissenswertes/downloads', label: 'Downloads' },
    { href: '/wissenswertes/videos', label: 'Videos' },
    { href: '/wissenswertes/community', label: 'Community' },
    { href: '/wissenswertes/experten', label: 'Experten' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <Home className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/wissenswertes">Wissenswertes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Sub-navigation */}
        <div className="mb-8">
          <nav className="flex flex-wrap justify-center gap-2 p-4 bg-white dark:bg-gray-900/50 rounded-lg shadow-sm border dark:border-gray-800">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WissenswertesLayout;
