import { SportCardCarousel } from "@/components/sport-cards/SportCardCarousel";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
          <header className="relative">
            <h1 
              className="flex items-baseline mb-8 text-[#5AE65A] drop-shadow-[0_0_10px_rgba(90,230,90,0.8)] transition-all duration-300 ease-in-out hover: cursor-pointer z-10 hover:z-20" 
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
    </main>
  );
}
