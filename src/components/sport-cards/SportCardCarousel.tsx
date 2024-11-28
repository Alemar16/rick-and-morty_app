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
    <div className="relative h-[600px] w-full overflow-visible">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[900px] h-[500px]">
          {characters.map((character, index) => (
            <div
              key={`${character.id}-${positions[index]}`}
              className="absolute"
              style={{
                left: index === 0 ? '0px' : index === 1 ? '300px' : '600px',
                zIndex: index === 1 ? 2 : 1,
                transform: `scale(${index === 1 ? 1 : 0.8})`,
                transition: 'all 0.5s ease-in-out'
              }}
            >
              <SportCharacterCard
                character={character}
                isCenter={index === 1}
                position={positions[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
