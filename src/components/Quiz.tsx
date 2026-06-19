import { useState } from 'react';
import { Compass, ChevronRight, RefreshCw, Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DESTINATIONS, Destination } from './Destinations';

const QUESTIONS = [
  {
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: 'Culturelle et artistique', value: 'culture' },
      { label: 'Aventure et nature', value: 'adventure' },
      { label: 'Élégance et raffinement', value: 'elegance' },
    ],
  },
  {
    question: 'Votre période préférée ?',
    options: [
      { label: 'Histoire moderne (XIXe-XXe siècle)', value: 'modern' },
      { label: 'Temps anciens et origines', value: 'ancient' },
      { label: 'Renaissance et classicisme', value: 'renaissance' },
    ],
  },
  {
    question: 'Vous préférez :',
    options: [
      { label: "L'effervescence urbaine", value: 'urban' },
      { label: 'La nature sauvage', value: 'nature' },
      { label: "L'art et l'architecture", value: 'art' },
    ],
  },
  {
    question: 'Votre activité idéale :',
    options: [
      { label: 'Visiter des monuments', value: 'monuments' },
      { label: 'Observer la faune', value: 'fauna' },
      { label: "Explorer des musées", value: 'museums' },
    ],
  },
];

const SCORING: Record<string, Record<string, number>> = {
  culture: { 'paris-1889': 2, 'florence-1504': 3, cretaceous: 0 },
  adventure: { 'paris-1889': 1, 'florence-1504': 1, cretaceous: 3 },
  elegance: { 'paris-1889': 3, 'florence-1504': 2, cretaceous: 0 },
  modern: { 'paris-1889': 3, 'florence-1504': 1, cretaceous: 1 },
  ancient: { 'paris-1889': 0, 'florence-1504': 1, cretaceous: 3 },
  renaissance: { 'paris-1889': 1, 'florence-1504': 3, cretaceous: 0 },
  urban: { 'paris-1889': 3, 'florence-1504': 2, cretaceous: 0 },
  nature: { 'paris-1889': 0, 'florence-1504': 0, cretaceous: 3 },
  art: { 'paris-1889': 2, 'florence-1504': 3, cretaceous: 0 },
  monuments: { 'paris-1889': 3, 'florence-1504': 2, cretaceous: 0 },
  fauna: { 'paris-1889': 0, 'florence-1504': 0, cretaceous: 3 },
  museums: { 'paris-1889': 2, 'florence-1504': 3, cretaceous: 1 },
};

const EXPLANATIONS: Record<string, string> = {
  'paris-1889':
    "Vous appréciez l'élégance, la culture et l'effervescence des grandes villes. Paris 1889 est votre destination idéale : l'inauguration de la Tour Eiffel, les cafés du Marais, et la naissance de la modernité vous attendent.",
  cretaceous:
    "L'aventure et la nature sauvage vous appellent. Le Crétacé vous offre une expérience sans pareille : observer les dinosaures dans leur habitat naturel, une aventure que seuls les plus audacieux ont vécue.",
  'florence-1504':
    "L'art, l'architecture et le raffinement culturel définissent vos aspirations. Florence 1504 est votre époque : les ateliers de Michel-Ange, les palais médicéens et la beauté de la Renaissance vous combleront.",
};

export default function Quiz({
  onSelectDestination,
}: {
  onSelectDestination: (d: Destination) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Destination | null>(null);
  const titleRef = useScrollReveal();

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    if (step < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setStep(s => s + 1);
    } else {
      const scores: Record<string, number> = { 'paris-1889': 0, cretaceous: 0, 'florence-1504': 0 };
      newAnswers.forEach(a => {
        const s = SCORING[a];
        if (s) Object.keys(s).forEach(k => (scores[k] += s[k]));
      });
      const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      setResult(DESTINATIONS.find(d => d.id === best) || DESTINATIONS[0]);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  const progress = ((step + (answers.length > step ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <section id="quiz" className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <div ref={titleRef} className="fade-up text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/40" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase flex items-center gap-2">
              <Compass size={12} /> Recommandation personnalisée
            </span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Quelle époque vous
            <br />
            <span className="text-gold">correspond ?</span>
          </h2>
          <p className="text-gray-400">
            Répondez à 4 questions pour découvrir votre destination temporelle idéale.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-10">
          {!result ? (
            <>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Question {step + 1} / {QUESTIONS.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-white mb-6">
                {QUESTIONS[step].question}
              </h3>

              <div className="space-y-3">
                {QUESTIONS[step].options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-4 rounded-2xl border border-white/10 hover:border-gold/50 hover:bg-gold/5 text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <ChevronRight
                      size={16}
                      className="text-gold opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                    />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Star size={16} className="text-gold fill-gold" />
                <span className="text-gold text-sm tracking-widest uppercase font-medium">
                  Votre destination idéale
                </span>
                <Star size={16} className="text-gold fill-gold" />
              </div>

              <div className="relative rounded-2xl overflow-hidden mb-6">
                <img
                  src={result.image}
                  alt={result.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 card-overlay" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-display text-2xl font-bold text-white">{result.title}</h3>
                  <p className="text-gold text-sm">{result.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-8">
                {EXPLANATIONS[result.id]}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onSelectDestination(result)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 gradient-gold text-black font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
                >
                  Voir cette destination
                </button>
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-gray-400 hover:text-white hover:border-white/40 rounded-full transition-all duration-300"
                >
                  <RefreshCw size={14} />
                  Recommencer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
