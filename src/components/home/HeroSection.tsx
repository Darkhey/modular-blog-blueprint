
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, BookOpen } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { useBlogStats } from '@/hooks/useBlogStats';

const HeroSection = () => {
  const { data: stats } = useBlogStats();

  return (
    <section className="relative min-h-[520px] flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/40 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-400/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full bg-teal-400/20 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative max-w-5xl mx-auto px-4 py-20 text-center z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-emerald-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Ihr unabhängiger Sanierungsratgeber
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight text-shadow-lg animate-fade-in">
          Sanierung <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">smart</span> planen
        </h1>

        <p className="text-lg md:text-xl text-emerald-100/90 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '150ms' }}>
          {siteConfig.siteMeta.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-glow"
          >
            <BookOpen className="w-5 h-5" />
            Ratgeber entdecken
          </Link>
          <Link
            to="/heizkostenrechner"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all"
          >
            <Calculator className="w-5 h-5" />
            Zum Rechner
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '450ms' }}>
          <div className="glass rounded-xl px-5 py-3 text-center">
            <div className="text-2xl font-bold text-white">{stats?.totalPosts ? `${stats.totalPosts}+` : '40+'}</div>
            <div className="text-xs text-emerald-200">Ratgeber-Artikel</div>
          </div>
          <div className="glass rounded-xl px-5 py-3 text-center">
            <div className="text-2xl font-bold text-white">bis 30%</div>
            <div className="text-xs text-emerald-200">Energiekosten sparen</div>
          </div>
          <div className="glass rounded-xl px-5 py-3 text-center">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-xs text-emerald-200">Begleitete Projekte</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
