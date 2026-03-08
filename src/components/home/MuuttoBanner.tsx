import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const MuuttoBanner = () => (
  <section className="relative bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
    </div>

    <div className="relative max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Image */}
        <div className="w-full md:w-2/5 flex-shrink-0">
          <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 transform md:-rotate-1 hover:rotate-0 transition-transform duration-500">
            <img
              src="/images/muutto-app-screenshot.jpeg"
              alt="Muutto App – Umzug digital planen"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-white text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Tipp der Redaktion
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">
            Umzug planen mit Muutto – stressfrei & digital
          </h2>
          <p className="text-white/85 text-sm md:text-base mb-5 max-w-lg">
            Checklisten, Zeitpläne und Helfer-Koordination in einer App. 
            So behalten Sie bei Ihrem Umzug den Überblick.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <Link
              to="/blog/umzug-planen-muutto-app"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-emerald-800 font-semibold rounded-lg hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Zum Ratgeber <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://app.muutto.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              App starten →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MuuttoBanner;
