import { SportCardCarousel } from "@/components/sport-cards/SportCardCarousel";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
          <header>
            <h1 className="text-4xl font-bold my-8">
              Rick and Morty Trading Cards
            </h1>
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

