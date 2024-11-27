"use client"

import { Character } from "@/types/character"
import { CharacterCard } from "../cards/character-card"

interface CharactersGridProps {
  characters: Character[]
}

export function CharactersGrid({ characters }: CharactersGridProps) {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-3xl font-bold">Random Characters</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </section>
  )
}
