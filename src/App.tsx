import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import DestinationModal from './components/DestinationModal';
import About from './components/About';
import Quiz from './components/Quiz';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { Destination } from './components/Destinations';

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [preselectedBooking, setPreselectedBooking] = useState<string>('');

  const handleSelectDestination = (d: Destination) => setSelectedDestination(d);

  const handleBook = (d: Destination) => {
    setSelectedDestination(null);
    setPreselectedBooking(d.id);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Header />
      <main>
        <Hero />
        <Destinations onSelectDestination={handleSelectDestination} />
        <About />
        <Quiz onSelectDestination={handleSelectDestination} />
        <Contact preselected={preselectedBooking} />
      </main>
      <Footer />
      <Chatbot />

      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onBook={handleBook}
        />
      )}
    </div>
  );
}
