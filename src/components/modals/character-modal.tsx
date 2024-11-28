"use client"

import { Character } from "@/types/character"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, User, Ghost, Calendar } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border border-border/50 rounded-lg">
        <DialogTitle className="sr-only">
          Character Details for {character.name}
        </DialogTitle>
        <div className="grid md:grid-cols-2 h-[516px]">
          {/* Imagen del lado izquierdo con fondo glass */}
          <div className="h-full bg-background/30 backdrop-blur-md flex items-center justify-center">
            <div className="p-6">
              <Image
                src={character.image}
                alt={character.name}
                width={400}
                height={400}
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Información del lado derecho */}
          <div className="bg-background p-8 h-full">
            <ScrollArea className="h-[516px] pr-4">
              <div className="space-y-8 flex flex-col items-end">
                {/* ID, Nombre y Status */}
                <div className="w-full">
                  <span className="text-3xl font-bold text-muted-foreground">#{character.id}</span>
                  <div className="space-y-2 text-right mt-4">
                    <h2 className="text-4xl font-bold">{character.name}</h2>
                    <div className="flex items-center justify-end gap-2">
                      <span>{character.status} - {character.species}</span>
                      <span className={cn("h-2 w-2 rounded-full", statusColor)} />
                    </div>
                  </div>
                </div>

                {/* Información Principal en Grid */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="flex flex-col items-end gap-2 p-3 rounded-lg border border-border/50 bg-background/50">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-medium">{character.gender}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 p-3 rounded-lg border border-border/50 bg-background/50">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Last Known Location</p>
                      <p className="font-medium">{character.location.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 p-3 rounded-lg border border-border/50 bg-background/50">
                    <Ghost className="w-5 h-5 text-muted-foreground" />
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Origin</p>
                      <p className="font-medium">{character.origin.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 p-3 rounded-lg border border-border/50 bg-background/50">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">First Seen</p>
                      <p className="font-medium">{new Date(character.created).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Episodios */}
                <div className="text-right">
                  <h3 className="text-lg font-semibold mb-3">Featured Episodes</h3>
                  <div className="flex flex-wrap gap-2 justify-end">
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
