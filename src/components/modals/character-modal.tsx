"use client"

import { Character } from "@/types/character"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, User, Activity, Ghost, Calendar } from "lucide-react"
import Image from "next/image"

interface CharacterModalProps {
  character: Character
  isOpen: boolean
  onClose: () => void
}

export function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  if (!character) return null

  const statusColor = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-gray-500",
  }[character.status] || "bg-gray-500"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">
          Character Details for {character.name}
        </DialogTitle>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Imagen del lado izquierdo */}
          <div className="relative h-[400px] md:h-[600px]">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Información del lado derecho */}
          <div className="p-6">
            <ScrollArea className="h-[400px] md:h-[600px] pr-4">
              <div className="space-y-6">
                {/* Nombre y Status */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${statusColor}`} />
                    <span>{character.status} - {character.species}</span>
                  </div>
                </div>

                {/* Información Principal */}
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <User className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p>{character.gender}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Last Known Location</p>
                      <p>{character.location.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Ghost className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Origin</p>
                      <p>{character.origin.name}</p>
                    </div>
                  </div>

                  {character.type && (
                    <div className="flex items-start gap-2">
                      <Activity className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p>{character.type}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">First Seen</p>
                      <p>{new Date(character.created).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Episodios */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Featured Episodes</h3>
                  <div className="flex flex-wrap gap-2">
                    {character.episode.map((ep) => {
                      const episodeNumber = ep.split('/').pop()
                      return (
                        <Badge key={ep} variant="secondary">
                          EP.{episodeNumber}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
