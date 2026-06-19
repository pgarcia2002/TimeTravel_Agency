import { Clock, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center">
                <Clock size={18} className="text-gold" />
              </div>
              <div>
                <span className="font-display text-lg font-semibold text-white block leading-none">TimeTravel</span>
                <span className="text-gold text-xs tracking-[0.2em] uppercase font-light">Agency</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              Depuis 2012, nous ouvrons les portes du temps pour offrir des expériences uniques et inoubliables à travers les époques.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-gold hover:border-gold/40 transition-all cursor-pointer"
                >
                  <Icon size={15} />
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Destinations</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              {['Paris 1889', 'Crétacé -65M', 'Florence 1504', 'Prochaines destinations'].map(l => (
                <li key={l}>
                  <a href="#destinations" className="hover:text-gold transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="text-gold flex-shrink-0" />
                contact@timetravel.agency
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="text-gold flex-shrink-0" />
                +33 1 42 00 00 00
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="text-gold flex-shrink-0 mt-0.5" />
                12 Rue du Temps, 75008 Paris
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-gold mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
          <span>© 2024 TimeTravel Agency — Projet pédagogique M1/M2 Digital & IA</span>
          <div className="flex gap-6">
            <span className="hover:text-gold transition-colors cursor-pointer">Mentions légales</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Confidentialité</span>
            <span className="hover:text-gold transition-colors cursor-pointer">CGV</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
