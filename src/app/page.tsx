import { SportCardCarousel } from "@/components/sport-cards/SportCardCarousel";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Rick and Morty Trading Cards
        </h1>

        <SportCardCarousel />
      </div>
    </main>
  );
}
