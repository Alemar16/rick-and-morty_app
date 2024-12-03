import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CharacterHistory, RecentCharacter } from '@/types/history';

interface CharacterHistoryState extends CharacterHistory {
  addCharacter: (character: RecentCharacter) => void;
  removeCharacter: (id: number) => void;
  clearHistory: () => void;
}

const MAX_HISTORY_ITEMS = 20;

export const useCharacterHistory = create<CharacterHistoryState>()(
  persist(
    (set) => ({
      recentCharacters: [],
      maxItems: MAX_HISTORY_ITEMS,

      addCharacter: (character) =>
        set((state) => {
          // Evitar duplicados
          const filtered = state.recentCharacters.filter((c) => c.id !== character.id);
          
          // Añadir al principio y limitar la cantidad
          const updated = [character, ...filtered].slice(0, state.maxItems);
          
          return { recentCharacters: updated };
        }),

      removeCharacter: (id) =>
        set((state) => ({
          recentCharacters: state.recentCharacters.filter((c) => c.id !== id),
        })),

      clearHistory: () => set({ recentCharacters: [] }),
    }),
    {
      name: 'character-history',
      skipHydration: true,
    }
  )
);
