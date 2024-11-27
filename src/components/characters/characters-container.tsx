import { getRandomCharacters } from "@/services/character.service"
import { CharactersGrid } from "./characters-grid"

export async function CharactersContainer() {
  const characters = await getRandomCharacters()
  return <CharactersGrid characters={characters} />
}
