import { Shield, Award, Globe, Zap } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const STATS = [
  { icon: Globe, value: '3', label: 'Destinations', desc: 'Époques soigneusement choisies' },
  { icon: Award, value: '12 ans', label: "D'expérience", desc: 'Pionniers du voyage temporel' },
  { icon: Shield, value: '100%', label: 'Sécurité', desc: 'Protocoles certifiés ITF' },
  { icon: Zap, value: '48h', label: 'Préparation', desc: 'Briefing complet inclus' },
];

export default function About() {
  const titleRef = useScrollReveal();
  const contentRef = useScrollReveal();

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="divider-gold mb-24" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div ref={titleRef} className="fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold/50" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase">À propos</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Les pionniers du{' '}
              <span className="text-gold">voyage temporel</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Fondée en 2012, TimeTravel Agency est la première agence mondiale spécialisée dans le
              tourisme temporel de luxe. Nos équipes d'historiens, de physiciens et de guides
              d'aventure créent des expériences uniques, sécurisées et inoubliables.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Chaque voyage est minutieusement préparé pour vous offrir une immersion totale dans
              une époque choisie, avec tout le confort et la sécurité des standards contemporains.
            </p>
            <a
              href="#quiz"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors group"
            >
              Trouver votre époque idéale
              <span className="h-px w-8 bg-gold group-hover:w-16 transition-all duration-300" />
            </a>
          </div>

          {/* Right: stats grid */}
          <div ref={contentRef} className="fade-up grid grid-cols-2 gap-4">
            {STATS.map(({ icon: Icon, value, label, desc }) => (
              <div
                key={label}
                className="glass rounded-2xl p-6 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <div className="font-display text-3xl font-bold text-gold mb-1">{value}</div>
                <div className="text-white font-medium text-sm mb-1">{label}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider-gold mt-24" />
    </section>
  );
}
