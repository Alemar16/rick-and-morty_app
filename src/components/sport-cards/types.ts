import { Character } from "@/types/character";

export interface SportCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface CarouselState {
  allCards: Character[];      // Buffer completo de tarjetas
  currentIndex: number;           // Índice actual en el buffer
  isTransitioning: boolean;
}

export interface SportCardProps {
  character: Character;
  isCenter: boolean;
  position: 'left' | 'center' | 'right';
  onCardClick?: () => void;
}
