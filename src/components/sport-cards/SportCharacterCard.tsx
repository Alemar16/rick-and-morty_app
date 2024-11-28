'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { SportCardProps } from './types';

export function SportCharacterCard({ character, isCenter, position }: SportCardProps) {
  return (
    <Card className={`relative overflow-hidden bg-gradient-to-b from-muted/50 to-muted p-2 w-[280px] ${
      isCenter ? 'cursor-pointer' : 'cursor-default'
    }`}>
      <AspectRatio ratio={2/3} className="bg-muted">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0"
          initial={false}
          animate={{ opacity: isCenter ? 1 : 0.5 }}
        />
        <motion.img
          src={character.image}
          alt={character.name}
          className="object-cover w-full h-full rounded-sm"
          initial={false}
          animate={{ 
            scale: isCenter ? 1.05 : 1,
            filter: isCenter ? 'brightness(1)' : 'brightness(0.8)'
          }}
          transition={{ duration: 0.5 }}
        />
      </AspectRatio>
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 text-white"
        initial={false}
        animate={{ 
          y: isCenter ? 0 : 10,
          opacity: isCenter ? 1 : 0.7
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xs font-bold uppercase tracking-wide mb-1">
          #{character.id.toString().padStart(3, '0')}
        </div>
        <h3 className="text-lg font-bold leading-tight mb-1">
          {character.name}
        </h3>
        <div className="text-sm opacity-90">
          {character.species}
        </div>
      </motion.div>
    </Card>
  );
}
