import Image from "next/image"
import Link from "next/link"
import { Character } from "@/types/character"

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link
      href={`/character/${character.id}`}
      className="group relative overflow-hidden rounded-lg border bg-background transition-colors hover:border-primary"
    >
      <div className="aspect-square">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
        <div className="space-y-1">
          <h3 className="font-heading text-lg font-medium leading-tight">
            {character.name}
          </h3>
          <p className="text-sm text-gray-200">
            Location: {character.location.name}
          </p>
          <p className="text-xs text-gray-300">#{character.id}</p>
        </div>
      </div>
    </Link>
  )
}
