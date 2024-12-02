'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

type Status = 'alive' | 'dead' | 'unknown';
type Gender = 'female' | 'male' | 'genderless' | 'unknown';

interface CharacterFilters {
  name?: string;
  status?: Status;
  species?: string;
  gender?: Gender;
}

interface CharacterSearchProps {
  onSearch: (filters: CharacterFilters) => void;
  onReset: () => void;
}

export function CharacterSearch({ onSearch, onReset }: CharacterSearchProps) {
  const [filters, setFilters] = useState<CharacterFilters>({
    name: '',
    status: undefined,
    species: '',
    gender: undefined,
  });

  const debouncedFilters = useDebounce(filters, 300);

  useEffect(() => {
    onSearch(debouncedFilters);
  }, [debouncedFilters, onSearch]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, name: e.target.value }));
  };

  const handleStatusChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      status: value === "none" ? undefined : value as Status
    }));
  };

  const handleSpeciesChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      species: value === "none" ? "" : value
    }));
  };

  const handleGenderChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      gender: value === "none" ? undefined : value as Gender
    }));
  };

  const handleReset = () => {
    setFilters({
      name: '',
      status: undefined,
      species: '',
      gender: undefined,
    });
    onReset();
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nombre, apellido o ID..."
            value={filters.name}
            onChange={handleNameChange}
            className="w-full"
          />
        </div>
        <Select
          value={filters.status || "none"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Todos</SelectItem>
            <SelectItem value="alive">Vivo</SelectItem>
            <SelectItem value="dead">Muerto</SelectItem>
            <SelectItem value="unknown">Desconocido</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.species || "none"}
          onValueChange={handleSpeciesChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Especie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Todas</SelectItem>
            <SelectItem value="human">Humano</SelectItem>
            <SelectItem value="alien">Alien</SelectItem>
            <SelectItem value="robot">Robot</SelectItem>
            <SelectItem value="humanoid">Humanoide</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.gender || "none"}
          onValueChange={handleGenderChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Todos</SelectItem>
            <SelectItem value="male">Masculino</SelectItem>
            <SelectItem value="female">Femenino</SelectItem>
            <SelectItem value="genderless">Sin género</SelectItem>
            <SelectItem value="unknown">Desconocido</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={handleReset}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Limpiar
        </Button>
      </div>
    </div>
  );
}
