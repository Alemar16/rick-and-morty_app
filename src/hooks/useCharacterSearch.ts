import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { CharacterFilters, CharacterResponse } from '@/server/models/character.model';
import { RickMortyService } from '@/server/services/rick-morty.service';
import { SearchFilters } from '@/types/filters';

export function useCharacterSearch(
  filters: SearchFilters
): UseQueryResult<CharacterResponse, Error> {
  const searchTerm = filters.name?.trim() || '';
  
  // Determinar si el término de búsqueda es un ID
  const isSearchById = /^\d+$/.test(searchTerm);
  
  return useQuery({
    queryKey: ['characters', filters],
    queryFn: async () => {
      try {
        // Si es una búsqueda por ID, ajustar la URL
        if (isSearchById) {
          const response = await fetch(`https://rickandmortyapi.com/api/character/${searchTerm}`);
          if (!response.ok) {
            if (response.status === 404) {
              return {
                results: [],
                info: { pages: 0, count: 0 }
              };
            }
            throw new Error('Error en la búsqueda');
          }
          const character = await response.json();
          return {
            results: [character],
            info: { pages: 1, count: 1 }
          };
        }
        
        // Búsqueda normal por nombre y filtros
        return await RickMortyService.getCharacters(filters);
      } catch (error) {
        if ((error as any)?.response?.status === 404) {
          return {
            results: [],
            info: { pages: 0, count: 0 }
          };
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  });
}
