'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { SportCharacter, CarouselState } from '@/components/sport-cards/types';
import { getRandomCharacters } from '@/services/sport-card-service';

const ROTATION_INTERVAL = 3000;
const BUFFER_SIZE = 20;
const INITIAL_INDEX = 0;

const initialState: CarouselState = {
  allCards: [],
  currentIndex: INITIAL_INDEX,
  isTransitioning: false,
};

export function useSportCarousel() {
  const [state, setState] = useState<CarouselState>(initialState);
  const [isPlaying, setIsPlaying] = useState(true);

  // Cargar tarjetas iniciales
  useEffect(() => {
    const loadInitialCards = async () => {
      const cards = await getRandomCharacters(BUFFER_SIZE);
      setState(prev => ({
        ...prev,
        allCards: cards,
        currentIndex: INITIAL_INDEX
      }));
    };
    loadInitialCards();
  }, []);

  // Obtener las tres tarjetas visibles actuales
  const visibleCards = useMemo(() => {
    if (state.allCards.length < 3) return [];
    return [
      state.allCards[state.currentIndex],
      state.allCards[state.currentIndex + 1],
      state.allCards[state.currentIndex + 2],
    ];
  }, [state.allCards, state.currentIndex]);

  // Función para rotar las tarjetas
  const rotateCards = useCallback((direction: 'left' | 'right') => {
    if (state.isTransitioning) return;

    setState(prev => {
      const newIndex = direction === 'right' 
        ? Math.min(prev.currentIndex + 1, prev.allCards.length - 3)
        : Math.max(0, prev.currentIndex - 1);

      return {
        ...prev,
        currentIndex: newIndex,
        isTransitioning: true
      };
    });

    // Finalizar la transición después de la animación
    setTimeout(() => {
      setState(prev => ({ ...prev, isTransitioning: false }));
    }, 500);
  }, [state.isTransitioning]);

  // Manejadores de control
  const handleNext = useCallback(() => {
    if (state.currentIndex < state.allCards.length - 3) {
      rotateCards('right');
    }
  }, [state.currentIndex, state.allCards.length, rotateCards]);

  const handlePrev = useCallback(() => {
    if (state.currentIndex > 0) {
      rotateCards('left');
    }
  }, [state.currentIndex, rotateCards]);

  const handleHover = useCallback((hovering: boolean) => {
    setIsPlaying(!hovering);
  }, []);

  // Rotación automática
  useEffect(() => {
    if (!isPlaying || visibleCards.length < 3) return;

    const interval = setInterval(() => {
      if (state.currentIndex < state.allCards.length - 3) {
        rotateCards('right');
      } else {
        setState(prev => ({ ...prev, currentIndex: 0 }));
      }
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isPlaying, rotateCards, state.currentIndex, state.allCards.length, visibleCards.length]);

  return {
    characters: visibleCards,
    isTransitioning: state.isTransitioning,
    handleNext,
    handlePrev,
    handleHover,
    currentIndex: state.currentIndex,
    totalCards: state.allCards.length
  };
}
