'use client';

import { useSportCarousel } from '@/hooks/useSportCarousel';
import { SportCharacterCard } from './SportCharacterCard';

export function SportCardCarousel() {
  const { characters, activeIndex, isTransitioning } = useSportCarousel();

  if (characters.length < 3) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const positions: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {characters.map((character, index) => (
          <SportCharacterCard
            key={`${character.id}-${positions[index]}`}
            character={character}
            isCenter={index === 1}
            position={positions[index]}
          />
        ))}
      </div>
    </div>
  );
}
