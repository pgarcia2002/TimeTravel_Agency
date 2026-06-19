import { ArrowDown, Sparkles } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';
import TypewriterText from './TypewriterText';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with Ken Burns zoom */}
      <div className="absolute inset-0 hero-bg-zoom">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0f]" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08)_0%,transparent_70%)]" />

      {/* Particles */}
      <ParticleCanvas />

      {/* Rotating ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="w-full h-full rounded-full border border-gold/10 spin-slow" />
        <div className="absolute inset-8 rounded-full border border-gold/5 spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
      </div>

      {/* Animated light streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="light-streak light-streak-1" />
        <div className="light-streak light-streak-2" />
        <div className="light-streak light-streak-3" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-12 bg-gold/60" />
          <span className="flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase font-medium">
            <Sparkles size={12} />
            Voyages Extraordinaires
            <Sparkles size={12} />
          </span>
          <div className="h-px w-12 bg-gold/60" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
          Voyagez à travers
          <br />
          <span className="shimmer">le temps</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 font-light mb-4 leading-relaxed">
          Des expériences{' '}
          <TypewriterText />
        </p>

        <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Découvrez des destinations temporelles soigneusement sélectionnées par nos experts.
          De la Belle Époque parisienne aux jungles du Crétacé, chaque voyage est unique.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#destinations"
            className="group flex items-center gap-3 px-8 py-4 gradient-gold text-black font-semibold rounded-full text-base hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105"
          >
            Découvrir les destinations
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#quiz"
            className="flex items-center gap-3 px-8 py-4 border border-gold/50 text-gold font-medium rounded-full text-base hover:border-gold hover:bg-gold/10 transition-all duration-300"
          >
            Trouver ma destination
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-10">
          {[
            { value: '3', label: 'Époques explorées' },
            { value: '2,400+', label: 'Voyageurs satisfaits' },
            { value: '100%', label: 'Retour garanti' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-gold">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs tracking-widest uppercase">
        <span>Défiler</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
