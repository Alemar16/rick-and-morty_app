import React from 'react'
import { CharacterCard } from "@/components/cards/character-card"
import { Character } from "@/types/character"

async function getRandomCharacters(count: number = 20): Promise<Character[]> {
  // Generate random IDs between 1 and 826 (total number of characters in the API)
  const randomIds = Array.from({ length: count }, () =>
    Math.floor(Math.random() * 826) + 1
  )

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${randomIds.join(",")}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error("Failed to fetch characters")
    }

    const data = await response.json()
    return Array.isArray(data) ? data : [data]
  } catch (error) {
    console.error("Error fetching characters:", error)
    return []
  }
}

export default async function HomePage() {
  const characters = await getRandomCharacters()

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