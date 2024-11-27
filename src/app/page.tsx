import { Character } from "@/types/character"
import { CharactersGrid } from "@/components/characters/characters-grid"

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

  return <CharactersGrid characters={characters} />
}