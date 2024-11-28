export interface SportCharacter {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
}

export interface CarouselState {
  activeIndex: number;
  isTransitioning: boolean;
  direction: 'forward' | 'backward';
}

export interface SportCardProps {
  character: SportCharacter;
  isCenter: boolean;
  position: 'left' | 'center' | 'right';
}
