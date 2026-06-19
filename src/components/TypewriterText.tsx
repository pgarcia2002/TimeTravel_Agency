import { useEffect, useRef, useState } from 'react';

const WORDS = ['temporels', 'inoubliables', 'légendaires', 'extraordinaires'];

export default function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const current = WORDS[wordIndex];
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex(i => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, wordIndex]);

  return (
    <span className="text-gold-light">
      {displayed}
      <span className="cursor-blink text-gold">|</span>
    </span>
  );
}
