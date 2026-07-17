// src/components/MiuraHero/MiuraHeroSplineWrapper.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Spline } from '@splinetool/react';

export default function MiuraHeroSplineWrapper({ onOpen, initialFold = 0 }) {
  const splineRef = useRef(null);
  const [foldProgress, setFoldProgress] = useState(initialFold);

  useEffect(() => {
    const onScroll = () => {
      const t = Math.min(1, window.scrollY / window.innerHeight);
      setFoldProgress(t);
      if (t >= 0.5 && onOpen) onOpen();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onOpen]);

  useEffect(() => {
    if (!splineRef.current) return;
    // Sync foldProgress to the Spline scene variable
    splineRef.current.setVariable('foldProgress', foldProgress);
  }, [foldProgress]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Spline
        scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
        ref={splineRef}
      />
    </div>
  );
}
