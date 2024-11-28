'use client';

import { useState, useEffect, useCallback } from 'react';
import { SportCharacter } from '@/components/sport-cards/types';
import { getRandomCharacters, getNextCharacter } from '@/services/sport-card-service';

const ROTATION_INTERVAL = 3000; // 3 segundos

export function useSportCarousel() {
  const [characters, setCharacters] = useState<SportCharacter[]>([]);
  const [activeIndex, setActiveIndex] = useState(1); // Comienza con el elemento central
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Cargar personajes iniciales
  useEffect(() => {
    const loadInitialCharacters = async () => {
      const initialCharacters = await getRandomCharacters(3);
      setCharacters(initialCharacters);
    };
    loadInitialCharacters();
  }, []);

  // Función para rotar los personajes
  const rotateCharacters = useCallback(async () => {
    if (isTransitioning || characters.length < 3) return;

    setIsTransitioning(true);
    try {
      const nextCharacter = await getNextCharacter();
      
      setCharacters(prev => {
        const newCharacters = [...prev];
        newCharacters.shift(); // Eliminar el primer personaje
        newCharacters.push(nextCharacter); // Añadir el nuevo personaje al final
        return newCharacters;
      });
    } catch (error) {
      console.error('Error rotating characters:', error);
    } finally {
      setIsTransitioning(false);
    }
  }, [characters.length, isTransitioning]);

  // Rotación automática
  useEffect(() => {
    const interval = setInterval(rotateCharacters, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [rotateCharacters]);

  return {
    characters,
    activeIndex,
    isTransitioning,
  };
}
