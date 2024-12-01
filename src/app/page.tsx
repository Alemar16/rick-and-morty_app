import { SportCardCarousel } from "@/components/sport-cards/SportCardCarousel";
import Link from "next/link";
import { FaSearch, FaIdCard, FaFilter, FaRocket, FaCode, FaServer, FaDatabase, FaImages, FaArrowRight } from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-2 gap-10 mt-5">
      {/* Header Section */}
      <header className="flex flex-col pl-8 mb-6 ">
        <h1 
          className="flex items-baseline text-[#5AE65A] drop-shadow-[0_0_10px_rgba(90,230,90,0.8)] transition-all duration-300 ease-in-out cursor-pointer" 
          style={{ fontFamily: "'Get Schwifty', sans-serif" }}
        >
          <span className="text-8xl hover:text-[#7FFF7F]">R</span>
          <span className="text-7xl hover:text-[#7FFF7F]">ick</span>
          <span className="text-4xl mx-2 hover:text-[#7FFF7F]">and</span>
          <span className="text-8xl hover:text-[#7FFF7F]">M</span>
          <span className="text-7xl hover:text-[#7FFF7F]">orty</span>
        </h1>
        <div className="ml-2">
          <p className="text-lg font-roboto font-black text-white/90">
            Character Collection
          </p>
        </div>
      </header>

      {/* Description Section with Enhanced Typography and Layout */}
      <div className="flex w-900 max-w-7xl mx-auto px-4 gap-16 mb-16">
        <div className="w-1/2 space-y-4">
          <div className="space-y-3">
            <h2 className="font-get-schwifty text-2xl text-[#5AE65A] flex items-center gap-3">
              <FaRocket className="text-xl" />
              Project Overview
            </h2>
            
            <p className="font-poppins text-lg leading-relaxed">
              This is a didactic exploration of building modern web applications using{' '}
              <Link href="https://nextjs.org/blog/next-15" className="text-[#5AE65A] hover:text-[#7FFF7F] font-semibold underline decoration-dotted">
                Next.js 15
              </Link>{' '}
              and the{' '}
              <Link href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer" className="text-[#5AE65A] hover:text-[#7FFF7F] font-semibold underline decoration-dotted">
                Rick and Morty API
              </Link>.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-roboto text-lg font-bold flex items-center gap-2">
              <FaCode className="text-[#5AE65A]" />
              Key Features
            </h3>
            <ul className="space-y-1.5 font-poppins">
              <li className="flex items-center gap-2">
                <FaServer className="text-[#5AE65A]" />
                <span>Server-side rendering for optimal performance</span>
              </li>
              <li className="flex items-center gap-2">
                <FaDatabase className="text-[#5AE65A]" />
                <span>Integration with Rick and Morty API</span>
              </li>
              <li className="flex items-center gap-2">
                <FaImages className="text-[#5AE65A]" />
                <span>Interactive character carousel display</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <Link href="/tech" className="inline-flex items-center gap-2 text-[#5AE65A] hover:text-[#7FFF7F] font-roboto font-medium">
              <span>Explore Tech Stack</span>
              <FaArrowRight className="text-sm animate-pulse" />
            </Link>
          </div>
        </div>

        <div className="w-1/2">
          <SportCardCarousel />
        </div>
      </div>

      {/* Search Feature Section */}
      <section className="w-full max-w-6xl mx-auto px-4">
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-[#5AE65A]">Find Your Favorite Characters</h2>
            <p className="text-xl text-white/90">
              Explore the Rick and Morty multiverse with our interactive character finder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <div className="text-[#5AE65A] text-4xl mb-4">
                <FaSearch className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-[#5AE65A] mb-3">Search by Name</h3>
              <p className="text-white/80">
                Find characters using their full or partial name
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <div className="text-[#5AE65A] text-4xl mb-4">
                <FaIdCard className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-[#5AE65A] mb-3">Unique ID</h3>
              <p className="text-white/80">
                Access directly using the character's identifier number
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
              <div className="text-[#5AE65A] text-4xl mb-4">
                <FaFilter className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-[#5AE65A] mb-3">Advanced Filters</h3>
              <p className="text-white/80">
                Refine your search by status, species, gender and more
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/characters" className="inline-block">
              <button className="bg-[#5AE65A] hover:bg-[#7FFF7F] text-black font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 flex items-center gap-2">
                <span>Start Searching</span>
                <FaSearch className="text-lg" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
