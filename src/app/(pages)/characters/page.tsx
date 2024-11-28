import { CharactersContainer } from "@/components/characters/characters-container";

export default function CharactersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Characters</h1>
      <p className="text-lg text-muted-foreground">
        Explore the vast universe of Rick and Morty characters. From the main cast to the most obscure background characters,
        discover their stories, origins, and unique characteristics.
      </p>
      <CharactersContainer />
    </div>
  );
}
