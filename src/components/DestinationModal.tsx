import { X, Clock, Users, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Destination } from './Destinations';

export default function DestinationModal({
  destination,
  onClose,
  onBook,
}: {
  destination: Destination;
  onClose: () => void;
  onBook: (d: Destination) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111118] border border-white/10 chat-enter">
        {/* Hero image */}
        <div className="relative h-64">
          <img
            src={destination.image}
            alt={destination.title}
            className="w-full h-full object-cover rounded-t-3xl"
          />
          <div className="absolute inset-0 card-overlay rounded-t-3xl" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 glass rounded-full flex items-center justify-center text-white hover:text-gold transition-colors"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-4 left-6">
            <h2 className="font-display text-2xl font-bold text-white">{destination.title}</h2>
            <p className="text-gold text-sm">{destination.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-300 leading-relaxed mb-6">{destination.description}</p>

          {/* Highlights */}
          <h3 className="text-white font-semibold mb-4">Ce qui vous attend</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {destination.features.map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={14} className="text-gold flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 rounded-2xl bg-white/5">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Clock size={14} className="text-gold" />
              Durée : <strong className="text-white ml-1">{destination.duration}</strong>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Users size={14} className="text-gold" />
              Niveau : <strong className="text-white ml-1">{destination.difficulty}</strong>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Star size={14} className="text-gold fill-gold" />
              Note : <strong className="text-white ml-1">{destination.rating}/5</strong>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gold font-bold text-2xl">{destination.price}</div>
              <div className="text-gray-500 text-xs">par voyageur, tout inclus</div>
            </div>
            <button
              onClick={() => onBook(destination)}
              className="flex items-center gap-2 px-6 py-3 gradient-gold text-black font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 hover:scale-105"
            >
              Réserver ce voyage
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
