'use client';

import { useCallback, useState } from 'react';
import { CharacterSearch } from './CharacterSearch';
import { CharacterSearchGrid } from './CharacterSearchGrid';
import { useCharacterSearch } from '@/hooks/useCharacterSearch';
import { SearchFilters } from '@/types/filters';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const initialFilters: SearchFilters = {
  name: '',
  status: '',
  species: '',
  gender: '',
  page: 1
};

export function CharacterSearchContainer() {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, isError } = useCharacterSearch(filters, hasSearched);

  const handleSearch = useCallback((newFilters: SearchFilters) => {
    const hasActiveFilters = 
      (newFilters.name?.trim() || '') !== '' || 
      (newFilters.status || '') !== '' || 
      (newFilters.species || '') !== '' || 
      (newFilters.gender || '') !== '';

    if (!hasActiveFilters) {
      return;
    }

    setFilters({ 
      name: newFilters.name || '',
      status: newFilters.status || '',
      species: newFilters.species || '',
      gender: newFilters.gender || '',
      page: 1 
    });
    setHasSearched(true);
  }, []);

  const handleReset = useCallback(() => {
    setFilters(initialFilters);
    setHasSearched(false);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  }, []);

  const currentPage = filters.page || 1;
  const totalPages = data?.info?.pages || 0;

  return (
    <div className="space-y-6">
      <CharacterSearch 
        onSearch={handleSearch}
        onReset={handleReset}
      />
      {!hasSearched && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Utiliza el buscador y los filtros para encontrar personajes de Rick and Morty
          </AlertDescription>
        </Alert>
      )}
      {hasSearched && data?.results && (
        <CharacterSearchGrid
          characters={data.results}
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          isError={isError}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
