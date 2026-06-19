import { Clock, Compass, Star, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'À propos', href: '#about' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark py-3 shadow-2xl' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Clock size={18} className="text-gold" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold opacity-70 group-hover:animate-ping" />
          </div>
          <div>
            <span className="font-display text-lg font-semibold text-white leading-none block">
              TimeTravel
            </span>
            <span className="text-gold text-xs tracking-[0.2em] uppercase font-light">
              Agency
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 hover:text-gold transition-colors duration-300 tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#quiz"
            className="flex items-center gap-2 px-5 py-2.5 border border-gold text-gold text-sm font-medium rounded-full hover:bg-gold hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
          >
            <Compass size={15} />
            Explorer
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-5 py-2.5 gradient-gold text-black text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 hover:scale-105"
          >
            <Star size={15} />
            Réserver
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gold p-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-dark mt-2 mx-4 rounded-2xl p-6 space-y-4">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-gold transition-colors py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block text-center mt-4 px-6 py-3 gradient-gold text-black font-semibold rounded-full"
          >
            Réserver maintenant
          </a>
        </div>
      )}
    </header>
  );
}
