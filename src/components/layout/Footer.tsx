
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Footer Banner Ad */}
      {/* Auto Ads are handled via AdSense dashboard - no manual banner code needed */}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">S&S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{siteConfig.projectName}</h3>
                <p className="text-gray-400 text-sm">{siteConfig.tagline}</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              Ihr vertrauensvoller Ratgeber für energieeffiziente Sanierung, Modernisierung 
              und nachhaltige Kosteneinsparung im Eigenheim.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to={siteConfig.socialLinks.impressum} className="text-gray-400 hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to={siteConfig.socialLinks.datenschutz} className="text-gray-400 hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link to={siteConfig.socialLinks.kontakt} className="text-gray-400 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4" role="list" aria-label="Social Media Links">
              {siteConfig.socialLinks.newsletter && (
                <Link 
                  to={siteConfig.socialLinks.newsletter} 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Newsletter abonnieren"
                >
                  <Mail size={20} aria-hidden="true" />
                </Link>
              )}
              {siteConfig.socialLinks.instagram && (
                <a 
                  href={siteConfig.socialLinks.instagram} 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Besuchen Sie uns auf Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={20} aria-hidden="true" />
                </a>
              )}
              {siteConfig.socialLinks.facebook && (
                <a 
                  href={siteConfig.socialLinks.facebook} 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Besuchen Sie uns auf Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook size={20} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {siteConfig.projectName}. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
