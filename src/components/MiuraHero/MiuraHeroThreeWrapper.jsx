// src/components/MiuraHero/MiuraHeroThreeWrapper.jsx
import React, { useEffect, useState } from 'react';
import MiuraHeroThree from './MiuraHeroThree.jsx';

export default function MiuraHeroThreeWrapper({ onOpen }) {
  const [foldProgress, setFoldProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const t = Math.min(1, window.scrollY / window.innerHeight);
      setFoldProgress(t);
      if (t >= 0.5 && onOpen) onOpen();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onOpen]);

  return <MiuraHeroThree foldProgress={foldProgress} />;
}
