// src/App.jsx
import React from 'react';
import MiuraHeroThreeWrapper from './components/MiuraHero/MiuraHeroThreeWrapper.jsx';

export default function App() {
  return (
    <main>
      <MiuraHeroThreeWrapper
        onOpen={() => console.log('Hero fully unfolded – entering the atelier')}
      />
    </main>
  );
}
