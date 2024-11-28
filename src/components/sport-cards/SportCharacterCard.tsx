'use client';

import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SportCardProps } from "./types";
import Image from "next/image";
import { CharacterModal } from "@/components/modals/character-modal";

export function SportCharacterCard({ character, isCenter, position, onCardClick }: SportCardProps) {
  return (
    <>
      <div 
        className="group"
        onMouseEnter={(e) => {
          e.stopPropagation();
        }}
        onClick={onCardClick}
      >
        <Card className={`
          relative w-[280px] rounded-lg overflow-hidden
          ${isCenter ? 'cursor-pointer' : 'cursor-default'}
          transition-all duration-500 ease-in-out
          transform-gpu
          hover:scale-105
          before:absolute before:inset-0 before:z-[-1]
          before:bg-gradient-to-r before:from-primary/20 before:via-primary/10 before:to-primary/20
          before:blur-xl before:opacity-75
          after:absolute after:inset-0 after:z-[-2]
          after:bg-gradient-to-b after:from-background/50 after:to-background
          after:blur-3xl after:opacity-90
          shadow-[0_0_15px_rgba(0,0,0,0.2)]
          border border-white/10
          backdrop-blur-sm
        `}>
          <CardContent className="p-0">
            <AspectRatio ratio={2/3}>
              <div className="relative w-full h-full">
                {/* Efecto de brillo de fondo */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 opacity-50" />
                
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover"
                  sizes="280px"
                  priority={isCenter}
                />

                {/* Overlay para tarjetas laterales */}
                {!isCenter && (
                  <div className={`
                    absolute inset-0 
                    ${position === 'left' 
                      ? 'bg-gradient-to-r from-black/80 via-black/60 to-transparent' 
                      : 'bg-gradient-to-l from-black/80 via-black/60 to-transparent'
                    }
                  `} />
                )}

                {/* Información del personaje */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-white font-bold truncate text-lg">{character.name}</h3>
                  <p className="text-white/80 text-sm">
                    {character.species} - {character.status}
                  </p>
                </div>

                {/* Efecto de borde brillante */}
                <div className="absolute inset-0 border border-white/20 rounded-lg" />
              </div>
            </AspectRatio>
          </CardContent>
        </Card>
      </div>

      {/* Modal del personaje */}
      <CharacterModal
        character={character}
        isOpen={false}
        onClose={() => {}}
      />
    </>
  );
}
