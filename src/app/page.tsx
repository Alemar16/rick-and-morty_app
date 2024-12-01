import { SportCardCarousel } from "@/components/sport-cards/SportCardCarousel";
import Link from "next/link";
import { FaSearch, FaIdCard, FaFilter } from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-2 gap-16">
      {/* Header Section - Existing Code */}
      <header className="relative">
        <h1 
          className="flex items-baseline mb-8 text-[#5AE65A] drop-shadow-[0_0_10px_rgba(90,230,90,0.8)] transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer z-10 hover:z-20" 
          style={{ fontFamily: "'Get Schwifty', sans-serif" }}
        >
          <span className="text-9xl hover:text-[#7FFF7F]">R</span>
          <span className="text-8xl hover:text-[#7FFF7F]">ick</span>
          <span className="text-6xl mx-3 hover:text-[#7FFF7F]">and</span>
          <span className="text-9xl hover:text-[#7FFF7F]">M</span>
          <span className="text-8xl hover:text-[#7FFF7F]">orty</span>
        </h1>
        <div className="w-full flex justify-end -mt-4">
          <p className="text-2xl font-bold text-white z-0" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 900 }}>
            Character Collection
          </p>
        </div>
      </header>

      {/* Existing Content Section */}
      <div className="flex w-full max-w-5xl items-center justify-between gap-4">
        <div className="w-1/2">
          <p className="text-2xl">
            This project is a didactic example of how to use the Rick and Morty API
            in a Next.js 15 project with server actions. The goal is to demonstrate
            how to fetch data from the API and display it in a carousel component
            using server-side rendering.
          </p>
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
