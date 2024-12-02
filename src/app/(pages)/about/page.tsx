'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import AboutSection from '@/components/AboutSection/SeasonShowcase'
import Image from "next/image";
import { SiHbo } from "react-icons/si";
import { FaAmazon, FaPlay } from "react-icons/fa";
import Link from "next/link";

const heroImages = [
  {
    url: "https://wallpapercave.com/wp/wp2429240.png",
    title: "Welcome to the Multiverse",
  },
  {
    url: "https://wallpapercave.com/wp/wp3277757.jpg",
    title: "Infinite Dimensions",
  },
  {
    url: "https://wallpapercave.com/wp/wp2166957.jpg",
    title: "Epic Adventures",
  },
  {
    url: "https://wallpapercave.com/wp/wp3277700.jpg",
    title: "Wubba Lubba Dub Dub!",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

export default function AboutPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [])

  // Prevent hydration mismatch by returning a loading state
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900" />
  }

  const bgClass = theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-[calc(100vh-4rem)]"
      >
        <motion.div 
          className="w-full h-full relative"
          style={{
            backgroundImage: `url(${heroImages[currentImage].url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Gradiente para mejorar contraste */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" 
          />
          
          {/* Contenedor del texto */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent">
            <div className="container mx-auto px-6 py-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4
                }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                Explora el Multiverso de Rick and Morty
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  bounce: 0.4
                }}
                className="text-lg sm:text-xl md:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                Sumérgete en las aventuras interdimensionales más locas de la televisión
              </motion.p>
            </div>
          </div>

          {/* Efecto de partículas flotantes */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#5AE65A] rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  scale: 0
                }}
                animate={{
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Content Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        {/* About Section Component */}
        <motion.div variants={itemVariants}>
          <AboutSection />
        </motion.div>

        {/* Cultural Impact Section */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className={`p-8 rounded-2xl ${bgClass} backdrop-blur-lg shadow-xl`}>
            <h2 className="text-3xl font-bold mb-6 text-[#5AE65A]">Impacto Cultural</h2>
            <p className="text-lg leading-relaxed">
              Rick and Morty ha dejado una huella indeleble en la cultura pop moderna. 
              La serie ha inspirado innumerables memes, referencias culturales y ha 
              influido en la forma en que la animación para adultos aborda temas 
              complejos como la existencia, la familia y la moralidad.
            </p>
          </div>
        </motion.section>

        {/* Streaming Section */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className={`p-8 rounded-2xl ${bgClass} backdrop-blur-lg shadow-xl`}>
            <h2 className="text-3xl font-bold mb-6 text-[#5AE65A]">¿Dónde Ver?</h2>
            <p className="text-lg leading-relaxed mb-6">
              Disfruta de todas las temporadas de Rick and Morty en las principales 
              plataformas de streaming. Nuevos episodios se estrenan primero en 
              Adult Swim y luego están disponibles en servicios de streaming seleccionados.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://www.hbomax.com/es/es/series/rick-and-morty"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <SiHbo className="text-xl" />
                <span>HBO Max</span>
              </Link>
              <Link
                href="https://www.primevideo.com/detail/Rick-and-Morty/0GQFN8LO3PW344U8TXCMQHH0JB"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaAmazon className="text-xl" />
                <span>Prime Video</span>
              </Link>
              <Link
                href="https://ver.movistarplus.es/ficha/rick-y-morty"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaPlay className="text-xl" />
                <span>Movistar Plus</span>
              </Link>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}
