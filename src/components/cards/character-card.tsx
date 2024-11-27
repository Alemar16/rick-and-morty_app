"use client"

import Image from "next/image"
import Link from "next/link"
import { Character } from "@/types/character"
import { useTheme } from "next-themes"

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <Link
      href={`/character/${character.id}`}
      className="group relative aspect-square overflow-hidden rounded-xl bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      {/* ID Badge */}
      <div className="absolute left-3 top-3 z-10">
        <span className="font-heading text-2xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          {character.id}
        </span>
      </div>

      {/* Character Image */}
      <div className="h-full w-full">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
          priority
        />
      </div>

      {/* Hover Info Overlay with Extended Coverage */}
      <div 
        className={`absolute inset-x-0 bottom-0 translate-y-[calc(100%-2px)] transform transition-all duration-300 group-hover:translate-y-0`}
        style={{
          height: 'calc(60% - 3rem)',
          background: isLight
            ? 'linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 60%, rgba(255, 255, 255, 0) 100%)'
            : 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.85) 60%, rgba(0, 0, 0, 0) 100%)',
          paddingTop: '2rem'
        }}
      >
        <div className="absolute bottom-0 w-full space-y-2 p-4">
          <h3 className={`font-heading text-lg font-bold leading-tight ${
            isLight ? 'text-gray-800' : 'text-white'
          }`}>
            {character.name}
          </h3>
          <div className={`flex items-center gap-2 ${
            isLight ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <svg 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            <p className="font-medium text-sm tracking-wide">
              {character.location.name}
            </p>
          </div>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute bottom-2 right-2 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <svg 
          className={`h-6 w-6 drop-shadow-lg ${
            isLight ? 'text-gray-800' : 'text-white'
          }`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 7l5 5m0 0l-5 5m5-5H6" 
          />
        </svg>
      </div>
    </Link>
  )
}
