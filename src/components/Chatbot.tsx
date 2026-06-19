import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

const SYSTEM_CONTEXT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.

Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Destinations disponibles :
1. Paris 1889 — Belle Époque, inauguration de la Tour Eiffel, Exposition Universelle. Prix : 12 500 €, 7 jours. Idéal pour les amateurs de culture, d'élégance et d'histoire moderne.
2. Crétacé -65 000 000 — Safari dinosaures en Gondwana. Prix : 28 900 €, 5 jours. Pour les aventuriers et amoureux de la nature primordiale.
3. Florence 1504 — Renaissance italienne, atelier de Michel-Ange, palais médicéens. Prix : 18 200 €, 6 jours. Pour les passionnés d'art et d'architecture.

Informations pratiques :
- Toutes les réservations incluent un briefing de 48h
- Sécurité assurée par protocoles ITF (Institut Temporel Français)
- Devis personnalisés disponibles
- Groupes de 2 à 8 personnes maximum

Tu dois rester dans l'univers fictif mais crédible du voyage temporel. Réponds en français, de manière concise (2-4 phrases max).`;

const QUICK_QUESTIONS = [
  'Quelle destination me conseillez-vous ?',
  'Quels sont vos prix ?',
  'Comment fonctionne la sécurité ?',
  'Durée des voyages ?',
];

function getBotResponse(userText: string): string {
  const text = userText.toLowerCase();

  if (text.includes('prix') || text.includes('coût') || text.includes('tarif') || text.includes('combien')) {
    return 'Nos tarifs varient selon la destination : Paris 1889 est à 12 500 €/personne (7 jours), Florence 1504 à 18 200 € (6 jours), et notre safari Crétacé à 28 900 € (5 jours). Tous nos voyages incluent le briefing complet, l\'équipement temporel et l\'hébergement selon les standards de l\'époque.';
  }

  if (text.includes('dinosaure') || text.includes('crétacé') || text.includes('préhistoire')) {
    return 'Notre safari au Crétacé est une expérience absolument unique ! Vous observerez des titanosaures, des ptérosaures et une végétation d\'une beauté primordiale depuis un campement sécurisé par nos ingénieurs ITF. C\'est notre destination la plus aventureuse, idéale pour les esprits curieux et courageux.';
  }

  if (text.includes('paris') || text.includes('eiffel') || text.includes('belle époque')) {
    return 'Paris 1889 est notre destination phare ! Vous vivrez l\'inauguration de la Tour Eiffel, visiterez l\'Exposition Universelle et fréquenterez les cafés de la Belle Époque. C\'est l\'idéal pour ceux qui aiment l\'élégance française et la naissance de la modernité.';
  }

  if (text.includes('florence') || text.includes('renaissance') || text.includes('michel-ange')) {
    return 'Florence 1504, c\'est le cœur de la Renaissance italienne ! Visitez l\'atelier de Michel-Ange pendant la création du David, participez à des banquets médicéens et admirez des fresques que peu d\'yeux ont contemplées depuis. Une expérience culturelle incomparable.';
  }

  if (text.includes('sécurité') || text.includes('sécurisé') || text.includes('danger')) {
    return 'La sécurité est notre priorité absolue. Tous nos voyages suivent les protocoles certifiés de l\'Institut Temporel Français (ITF). Chaque groupe est accompagné d\'un guide expert et d\'un technicien temporel. Le retour est garanti à 100%, quoi qu\'il arrive.';
  }

  if (text.includes('durée') || text.includes('combien de temps') || text.includes('jours')) {
    return 'Nos voyages durent de 5 à 7 jours selon la destination, auxquels s\'ajoutent 48h de briefing pré-voyage. Paris 1889 : 7 jours, Florence 1504 : 6 jours, Safari Crétacé : 5 jours. Des extensions sont possibles sur demande.';
  }

  if (text.includes('réserver') || text.includes('réservation') || text.includes('booking')) {
    return 'Pour réserver, remplissez notre formulaire de contact avec la destination choisie et vos dates souhaitées. Notre équipe vous contactera sous 24h pour valider votre profil et vous transmettre un devis détaillé. Les réservations se font au minimum 3 mois à l\'avance.';
  }

  if (text.includes('bonjour') || text.includes('salut') || text.includes('hello') || text.includes('bonsoir')) {
    return 'Bonjour et bienvenue chez TimeTravel Agency ! Je suis ravi de vous accueillir. Nous proposons des voyages temporels vers Paris 1889, la Florence de la Renaissance et le Crétacé. Comment puis-je vous aider à choisir votre aventure à travers le temps ?';
  }

  if (text.includes('conseil') || text.includes('recommand') || text.includes('choisir') || text.includes('quelle')) {
    return 'Mon conseil dépend de vos préférences ! Si vous aimez l\'art et l\'élégance → Paris 1889. Pour la culture et l\'architecture → Florence 1504. Pour l\'aventure pure → le Crétacé. Notre quiz de recommandation sur la page peut aussi vous aider à choisir en 4 questions !';
  }

  if (text.includes('groupe') || text.includes('famille') || text.includes('ami')) {
    return 'Nous accueillons des groupes de 2 à 8 personnes maximum pour garantir une expérience intime et sécurisée. Des tarifs groupe sont disponibles à partir de 4 personnes. Les enfants de moins de 16 ans ne sont pas admis pour des raisons de sécurité temporelle.';
  }

  return 'Excellente question ! Chez TimeTravel Agency, nous nous efforçons de rendre chaque voyage inoubliable. N\'hésitez pas à me poser des questions sur nos destinations (Paris 1889, Florence 1504, Crétacé), nos tarifs, ou les modalités de réservation. Je suis là pour vous guider vers l\'époque de vos rêves !';
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: "Bienvenue chez TimeTravel Agency ! Je suis votre conseiller en voyages temporels. Comment puis-je vous aider à choisir votre prochaine aventure à travers le temps ?",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    const userMsg: Message = { id: Date.now(), role: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);
    setTimeout(() => {
      const response = getBotResponse(msg);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: response }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 gradient-gold rounded-full flex items-center justify-center shadow-2xl shadow-gold/30 hover:scale-110 transition-transform duration-300 relative pulse-ring"
        aria-label="Ouvrir le chat"
      >
        {open ? <X size={22} className="text-black" /> : <MessageCircle size={22} className="text-black" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-gold/20 chat-enter flex flex-col bg-[#0e0e16]">
          {/* Header */}
          <div className="gradient-gold p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black/20 rounded-full flex items-center justify-center">
                <Bot size={18} className="text-black" />
              </div>
              <div>
                <div className="font-semibold text-black text-sm">Chrono — IA Conseiller</div>
                <div className="flex items-center gap-1.5 text-xs text-black/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-800 animate-pulse" />
                  En ligne
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-black/60 hover:text-black transition-colors">
              <Minimize2 size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <Bot size={12} className="text-gold" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gold text-black font-medium rounded-br-sm'
                      : 'bg-white/8 text-gray-200 border border-white/10 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <Bot size={12} className="text-gold" />
                </div>
                <div className="bg-white/8 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs text-gold/80 border border-gold/20 hover:border-gold/60 hover:text-gold px-3 py-1.5 rounded-full transition-all duration-200"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 pt-2 border-t border-white/10">
            <form
              onSubmit={e => { e.preventDefault(); sendMessage(); }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="w-10 h-10 gradient-gold rounded-xl flex items-center justify-center disabled:opacity-40 transition-opacity hover:scale-105"
              >
                <Send size={15} className="text-black" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
