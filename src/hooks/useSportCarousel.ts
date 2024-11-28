'use client';

import { useState, useEffect, useCallback } from 'react';
import { SportCharacter } from '@/components/sport-cards/types';
import { getRandomCharacters, getNextCharacter } from '@/services/sport-card-service';

const ROTATION_INTERVAL = 3000; // 3 segundos
const PAUSE_DURATION = 2000; // 2 segundos de pausa después de control manual

export function useSportCarousel() {
  const [characters, setCharacters] = useState<SportCharacter[]>([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Cargar personajes iniciales
  useEffect(() => {
    const loadInitialCharacters = async () => {
      const initialCharacters = await getRandomCharacters(3);
      setCharacters(initialCharacters);
    };
    loadInitialCharacters();
  }, []);

  // Función para rotar los personajes
  const rotateCharacters = useCallback(async (direction: 'next' | 'prev') => {
    if (isTransitioning || characters.length < 3) return;

    setIsTransitioning(true);
    try {
      const nextCharacter = await getNextCharacter();
      
      setCharacters(prev => {
        const newCharacters = [...prev];
        if (direction === 'next') {
          newCharacters.shift();
          newCharacters.push(nextCharacter);
        } else {
          newCharacters.pop();
          newCharacters.unshift(nextCharacter);
        }
        return newCharacters;
      });
    } catch (error) {
      console.error('Error rotating characters:', error);
    } finally {
      setIsTransitioning(false);
    }
  }, [characters.length, isTransitioning]);

  // Control manual
  const handleNext = useCallback(() => {
    setIsPlaying(false);
    rotateCharacters('next');
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
      setIsPlaying(true);
    }, PAUSE_DURATION);
  }, [rotateCharacters]);

  const handlePrev = useCallback(() => {
    setIsPlaying(false);
    rotateCharacters('prev');
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
      setIsPlaying(true);
    }, PAUSE_DURATION);
  }, [rotateCharacters]);

  const handleHover = useCallback((hovering: boolean) => {
    setIsPlaying(!hovering);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
    setIsPaused(false);
  }, []);

  // Rotación automática
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      rotateCharacters('next');
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, rotateCharacters]);

  return {
    characters,
    activeIndex,
    isTransitioning,
    isPlaying,
    handleNext,
    handlePrev,
    handleHover,
    togglePlay
  };
}
