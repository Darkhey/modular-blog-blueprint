
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site.config';

const NewsletterSection = () => (
    <section className="py-12 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4 animate-fade-in">
                {siteConfig.newsletter.title}
            </h2>
            <p className="text-gray-700 mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                {siteConfig.newsletter.description}
            </p>
            <Link
                to={siteConfig.socialLinks.newsletter}
                className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors animate-fade-in"
                style={{ animationDelay: '400ms' }}
            >
                Zum Newsletter anmelden
            </Link>
        </div>
    </section>
);

export default NewsletterSection;
