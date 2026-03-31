import type { Metadata } from "next";
import { EventList } from "@/components/events/EventList";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Événements",
  description: "Découvrez tous les événements jeux de société chez Arkadia.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Événements
          </h1>
          <p className="text-muted-foreground">
            Découvrez nos prochaines soirées jeux et réservez votre place.
          </p>
        </div>
        <EventList />
      </main>
      <Footer />
    </div>
  );
}
