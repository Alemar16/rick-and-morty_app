'use client';

import { useState } from 'react';
import { useSportCarousel } from '@/hooks/useSportCarousel';
import { SportCharacterCard } from './SportCharacterCard';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CharacterModal } from '@/components/modals/character-modal';
import { Character } from '@/types/character';

export function SportCardCarousel() {
  const [modalCharacter, setModalCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    characters,
    isTransitioning,
    handleNext,
    handlePrev,
    handleHover,
    currentIndex,
    totalCards
  } = useSportCarousel();

  if (characters.length < 3) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const positions: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];
  const showPrevButton = currentIndex > 0;
  const showNextButton = currentIndex < totalCards - 3;

  const handleCardClick = (character: Character, isCenter: boolean) => {
    if (isCenter) {
      setModalCharacter(character);
      setIsModalOpen(true);
      handleHover(true); // Pausar el carrusel
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleHover(false); // Reanudar el carrusel
    setModalCharacter(null);
  };

  return (
    <div className="relative h-[600px] w-full overflow-visible">
      {/* Fondo con efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background" />
      
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[800px] h-[500px]">
          {characters.map((character, index) => (
            <div
              key={`${character.id}-${positions[index]}`}
              className="absolute transition-all duration-500 ease-in-out"
              style={{
                left: index === 0 ? '50px' : index === 1 ? '260px' : '470px',
                zIndex: index === 1 ? 2 : 1,
                transform: `scale(${index === 1 ? 1 : 0.85})`,
                opacity: index === 1 ? 1 : 0.9,
              }}
            >
              <SportCharacterCard
                character={character}
                isCenter={index === 1}
                position={positions[index]}
                onCardClick={() => handleCardClick(character, index === 1)}
              />
            </div>
          ))}

          {/* Controles laterales integrados */}
          {showPrevButton && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 z-10"
              onClick={handlePrev}
              disabled={isTransitioning || isModalOpen}
              aria-label="Previous character"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          {showNextButton && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 z-10"
              onClick={handleNext}
              disabled={isTransitioning || isModalOpen}
              aria-label="Next character"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalCharacter && (
        <CharacterModal
          character={modalCharacter}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
