import { useState } from 'react';
import { Send, CheckCircle, CalendarDays, User, Mail, Phone } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DESTINATIONS } from './Destinations';

interface FormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  date: string;
  guests: string;
  message: string;
}

const EMPTY: FormData = { name: '', email: '', phone: '', destination: '', date: '', guests: '1', message: '' };

export default function Contact({ preselected }: { preselected?: string }) {
  const [form, setForm] = useState<FormData>({ ...EMPTY, destination: preselected || '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const titleRef = useScrollReveal();

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputClass =
    'w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-gold/50 transition-colors text-sm';

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <div ref={titleRef} className="fade-up text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/40" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase flex items-center gap-2">
              <CalendarDays size={12} /> Réservation
            </span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Prêt à voyager
            <br />
            <span className="text-gold">dans le temps ?</span>
          </h2>
          <p className="text-gray-400">
            Complétez le formulaire ci-dessous. Notre équipe vous contactera sous 24h.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-gold" />
              </div>
              <h3 className="font-display text-2xl text-white font-bold mb-3">
                Demande envoyée !
              </h3>
              <p className="text-gray-400 mb-2">
                Merci <strong className="text-white">{form.name}</strong>. Votre dossier de voyage est entre de bonnes mains.
              </p>
              <p className="text-gray-500 text-sm">
                Notre équipe vous contactera à <span className="text-gold">{form.email}</span> sous 24h.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm(EMPTY); }}
                className="mt-8 px-6 py-3 border border-gold/40 text-gold hover:bg-gold/10 rounded-full text-sm transition-colors"
              >
                Nouvelle demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    required
                    placeholder="Votre nom complet"
                    value={form.name}
                    onChange={set('name')}
                    className={inputClass + ' pl-10'}
                  />
                </div>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={set('email')}
                    className={inputClass + ' pl-10'}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    placeholder="Téléphone"
                    value={form.phone}
                    onChange={set('phone')}
                    className={inputClass + ' pl-10'}
                  />
                </div>
                <select
                  required
                  value={form.destination}
                  onChange={set('destination')}
                  className={inputClass + ' cursor-pointer'}
                >
                  <option value="">Choisir une destination</option>
                  {DESTINATIONS.map(d => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={set('date')}
                  min={new Date().toISOString().split('T')[0]}
                  className={inputClass}
                />
                <select
                  value={form.guests}
                  onChange={set('guests')}
                  className={inputClass + ' cursor-pointer'}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n} voyageur{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder="Message optionnel ou questions particulières..."
                value={form.message}
                onChange={set('message')}
                rows={3}
                className={inputClass + ' resize-none'}
              />

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-4 gradient-gold text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Envoyer ma demande
                  </>
                )}
              </button>

              <p className="text-center text-gray-600 text-xs">
                En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
