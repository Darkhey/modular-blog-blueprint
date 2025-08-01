import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbNavigation = ({ items, className = "" }: BreadcrumbNavigationProps) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`} aria-label="Breadcrumb">
      <Link to="/" className="flex items-center hover:text-primary transition-colors">
        <Home className="h-4 w-4" />
        <span className="sr-only">Startseite</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          {item.href && index < items.length - 1 ? (
            <Link to={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;