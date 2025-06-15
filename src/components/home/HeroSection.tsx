
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site.config';

const HeroSection = () => (
  <section className="relative bg-gray-800 text-white py-32 text-center overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop')" }}
    ></div>
    <div className="absolute inset-0 bg-black/60 z-0"></div>
    
    <div className="relative max-w-4xl mx-auto px-4 z-10">
      <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight text-shadow-lg animate-fade-in">
        {siteConfig.projectName}
      </h1>
      <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
        {siteConfig.siteMeta.description}
      </p>
      <Link
        to="/blog"
        className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in"
        style={{ animationDelay: '400ms' }}
      >
        Zu den Artikeln
      </Link>
    </div>
  </section>
);

export default HeroSection;
