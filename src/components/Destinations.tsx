import { MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export interface Destination {
  id: string;
  epoch: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  difficulty: string;
  rating: number;
  badge: string;
  badgeColor: string;
  accentColor: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'paris-1889',
    epoch: '1889',
    title: 'Paris, Belle Époque',
    subtitle: "L'inauguration de la Tour Eiffel",
    image: '/hero-paris.jpg',
    description:
      "Vivez l'effervescence de l'Exposition Universelle de 1889. Assistez à l'inauguration de la Tour Eiffel, fréquentez les cafés du Marais et croisez Gustave Eiffel lui-même dans ce Paris de rêve.",
    features: ['Exposition Universelle', 'Cabaret Moulin Rouge', 'Ateliers Impressionnistes', 'Haute Gastronomie'],
    price: '12 500 €',
    duration: '7 jours',
    difficulty: 'Accessible',
    rating: 4.9,
    badge: 'Coup de Coeur',
    badgeColor: 'bg-amber-500',
    accentColor: '#c9a84c',
  },
  {
    id: 'cretaceous',
    epoch: '-65 000 000',
    title: 'Crétacé, Gondwana',
    subtitle: 'À la rencontre des dinosaures',
    image: '/dest-cretace.jpg',
    description:
      "Une expérience unique en son genre : observez les titanosaures et les ptérosaures dans leur milieu naturel. Un safari préhistorique encadré par nos guides experts en paléontologie.",
    features: ['Safari Dinosaures', 'Forêt Tropicale Primordiale', 'Observation Ptérosaures', 'Campement Sécurisé'],
    price: '28 900 €',
    duration: '5 jours',
    difficulty: 'Aventureux',
    rating: 4.7,
    badge: 'Exclusif',
    badgeColor: 'bg-emerald-600',
    accentColor: '#4ade80',
  },
  {
    id: 'florence-1504',
    epoch: '1504',
    title: 'Florence, Renaissance',
    subtitle: "L'atelier de Michel-Ange",
    image: '/dest-florence.jpg',
    description:
      "Plongez au coeur de la Renaissance italienne. Visitez l'atelier de Michel-Ange, participez à des banquets médicéens et admirez la création du David dans sa gloire originelle.",
    features: ["Atelier de Michel-Ange", 'Palais Médicis', 'Marché des Épices', 'Fresque Secrète'],
    price: '18 200 €',
    duration: '6 jours',
    difficulty: 'Culturel',
    rating: 4.8,
    badge: 'Prestige',
    badgeColor: 'bg-rose-600',
    accentColor: '#f87171',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          className={i <= Math.floor(rating) ? 'text-gold fill-gold' : 'text-gray-600'}
        />
      ))}
      <span className="text-gray-400 text-xs ml-1">{rating}</span>
    </div>
  );
}

function DestinationCard({
  dest,
  index,
  onSelect,
}: {
  dest: Destination;
  index: number;
  onSelect: (d: Destination) => void;
}) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="fade-up card-hover cursor-pointer group"
      style={{ transitionDelay: `${index * 0.15}s` }}
      onClick={() => onSelect(dest)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111118]">
        {/* Image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={dest.image}
            alt={dest.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 card-overlay" />

          {/* Badge */}
          <div className={`absolute top-4 left-4 ${dest.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {dest.badge}
          </div>

          {/* Epoch */}
          <div className="absolute top-4 right-4 glass text-xs text-gray-300 px-3 py-1 rounded-full">
            <Clock size={10} className="inline mr-1 text-gold" />
            {parseInt(dest.epoch) < 0
              ? `${Math.abs(parseInt(dest.epoch)).toLocaleString()} av. J.-C.`
              : dest.epoch}
          </div>

          {/* Rating */}
          <div className="absolute bottom-4 right-4">
            <StarRating rating={dest.rating} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold text-white mb-1">{dest.title}</h3>
          <p className="text-gold text-sm mb-3">{dest.subtitle}</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{dest.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-5">
            {dest.features.slice(0, 3).map(f => (
              <span
                key={f}
                className="text-xs text-gray-400 border border-white/10 px-2.5 py-1 rounded-full"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <div className="text-gold font-semibold text-lg">{dest.price}</div>
              <div className="flex items-center gap-3 text-gray-500 text-xs mt-0.5">
                <span className="flex items-center gap-1">
                  <Clock size={10} /> {dest.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={10} /> {dest.difficulty}
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gold/40 text-gold text-sm rounded-full group-hover:bg-gold group-hover:text-black transition-all duration-300">
              Voir plus
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Destinations({
  onSelectDestination,
}: {
  onSelectDestination: (d: Destination) => void;
}) {
  const titleRef = useScrollReveal();

  return (
    <section id="destinations" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="fade-up text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gold/40" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase flex items-center gap-2">
              <MapPin size={12} /> Nos Destinations
            </span>
            <div className="h-px w-16 bg-gold/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Trois époques,
            <br />
            <span className="text-gold">infinies possibilités</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Chaque destination est soigneusement préparée par nos experts historiens et paléontologues pour une immersion totale et sécurisée.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest, i) => (
            <DestinationCard key={dest.id} dest={dest} index={i} onSelect={onSelectDestination} />
          ))}
        </div>
      </div>
    </section>
  );
}
