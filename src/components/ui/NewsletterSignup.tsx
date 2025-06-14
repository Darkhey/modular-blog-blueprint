
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { toast } from 'sonner';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!siteConfig.newsletter.enabled) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate newsletter signup
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast.success('Erfolgreich angemeldet! Bestätigen Sie Ihre E-Mail-Adresse.');
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border">
      <div className="flex items-start space-x-3">
        <Mail className="text-green-600 mt-1" size={24} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {siteConfig.newsletter.title}
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            {siteConfig.newsletter.description}
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ihre E-Mail-Adresse"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-2">
            Kostenlos und jederzeit abbestellbar. Ihre Daten sind sicher.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
