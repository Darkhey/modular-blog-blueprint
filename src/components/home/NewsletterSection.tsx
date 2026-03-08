
import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useInView } from '@/hooks/useInView';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { ref, isInView } = useInView();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({ email });
      if (error) {
        if (error.code === '23505') {
          toast.info('Diese E-Mail ist bereits angemeldet.');
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        setEmail('');
        toast.success('Erfolgreich angemeldet!');
      }
    } catch {
      toast.error('Fehler bei der Anmeldung. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className={`relative max-w-2xl mx-auto px-4 text-center ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Newsletter abonnieren
        </h2>
        <p className="text-emerald-100/80 mb-8">
          Bleiben Sie über neue Ratgeber, Fördermöglichkeiten und Spar-Tipps informiert.
        </p>

        {isSuccess ? (
          <div className="flex items-center justify-center gap-3 text-emerald-200 animate-fade-in">
            <CheckCircle className="w-6 h-6" />
            <span className="text-lg font-medium">Vielen Dank! Sie erhalten bald unsere Updates.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ihre E-Mail-Adresse"
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-emerald-800 font-semibold rounded-xl hover:bg-emerald-50 transition-colors disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? 'Wird gesendet…' : 'Anmelden'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
