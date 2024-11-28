'use client';

import { useSportCarousel } from "@/hooks/useSportCarousel";
import { SportCharacterCard } from "./SportCharacterCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Character } from "@/types/character";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

export function SportCardCarousel() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const {
    characters,
    isTransitioning,
    isLoading,
    handleNext,
    handlePrev,
    handleHover,
    currentIndex,
    totalCards,
  } = useSportCarousel();

  const getCardPosition = (index: number): number => {
    const centerIndex = Math.floor(characters.length / 2);
    return index - centerIndex;
  };

  const getCardStyle = (position: number) => {
    const baseTransform = 'translateX(-50%)';
    const xOffset = position * 140;
    const zOffset = Math.abs(position) * 100;
    const scale = Math.max(0.8, 1 - Math.abs(position) * 0.15);
    
    return {
      transform: `${baseTransform} translateX(${xOffset}px) translateZ(${-zOffset}px) scale(${scale})`,
      zIndex: 10 - Math.abs(position),
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'absolute',
      left: '50%',
      opacity: Math.max(0.4, 1 - Math.abs(position) * 0.3),
    } as React.CSSProperties;
  };

  return (
    <div className="relative h-[600px] w-full">
      {/* Efectos de luz ambiental */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Luz principal desde arriba */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/30 blur-[120px] opacity-70" />
        
        {/* Luces laterales para profundidad */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-primary/20 blur-[100px] opacity-40 rotate-[-15deg]" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-primary/20 blur-[100px] opacity-40 rotate-[15deg]" />
        
        {/* Reflejo en el suelo */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] opacity-50"
          style={{
            background: 'linear-gradient(to top, var(--primary) / 0.3, transparent)',
            filter: 'blur(70px)',
          }}
        />

        {/* Efecto de brillo adicional en el centro */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 blur-[150px] opacity-40 animate-pulse" />
      </div>

      {/* Contenedor del carrusel con perspectiva */}
      <div 
        className="relative h-full w-full overflow-hidden"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {characters.map((character, index) => {
            const position = getCardPosition(index);
            return (
              <div
                key={character.id}
                style={getCardStyle(position)}
                className={cn(
                  "transform-gpu",
                  position < 0 ? "shadow-[12px_0_20px_rgba(0,0,0,0.35)]" : "",
                  position > 0 ? "shadow-[-12px_0_20px_rgba(0,0,0,0.35)]" : "",
                  position === 0 ? "shadow-[0_0_25px_rgba(0,0,0,0.45)]" : ""
                )}
              >
                <SportCharacterCard
                  character={character}
                  isCenter={position === 0}
                  position={position}
                  onCardClick={() => position === 0 && setSelectedCharacter(character)}
                />
              </div>
            );
          })}
        </div>

        {/* Botones de navegación */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={currentIndex === 0 || isTransitioning}
            className="bg-background/70 backdrop-blur-md hover:bg-background/80 shadow-lg border-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex >= totalCards - characters.length || isTransitioning}
            className="bg-background/70 backdrop-blur-md hover:bg-background/80 shadow-lg border-white/20"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Modal de personaje */}
      <Dialog open={!!selectedCharacter} onOpenChange={() => setSelectedCharacter(null)}>
        <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl">
          {selectedCharacter && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedCharacter.name}</DialogTitle>
                <DialogDescription className="text-foreground/70">
                  {selectedCharacter.species} - {selectedCharacter.status}
                </DialogDescription>
              </DialogHeader>
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden my-4">
                <Image
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Origin</h4>
                    <p className="text-sm text-foreground/70">{selectedCharacter.origin.name}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <p className="text-sm text-foreground/70">{selectedCharacter.location.name}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Gender</h4>
                  <p className="text-sm text-foreground/70">{selectedCharacter.gender}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
