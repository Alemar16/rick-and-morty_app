'use client';

import { useState } from 'react';
import { CharacterSearch } from './CharacterSearch';
import { CharacterSearchGrid } from './CharacterSearchGrid';
import { useCharacterSearch } from '@/hooks/useCharacterSearch';
import { SearchFilters } from '@/types/filters';

const initialFilters: SearchFilters = {
  name: '',
  status: '',
  species: '',
  gender: '',
  page: 1
};

export function CharacterSearchContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const { data, isLoading, isError } = useCharacterSearch({
    ...filters,
    page: currentPage
  });

  const handleSearch = (newFilters: SearchFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
  };

  const handleReset = () => {
    setCurrentPage(1);
    setFilters(initialFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <CharacterSearch 
        onSearch={handleSearch}
        onReset={handleReset}
      />
      <CharacterSearchGrid
        characters={data?.results || []}
        currentPage={currentPage}
        totalPages={data?.info?.pages || 0}
        isLoading={isLoading}
        isError={isError}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
