import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventsPageClient } from "@/components/events/EventsPageClient";
import type { EventCardData } from "@/components/events/EventCard";

export const metadata: Metadata = {
  title: "Événements",
  description: "Découvrez tous les événements jeux de société chez Arkadia.",
};

async function getEvents(): Promise<EventCardData[]> {
  const events = await db.event.findMany({
    where: { status: { not: "cancelled" } },
    orderBy: { scheduledAt: "asc" },
    include: {
      bookings: {
        where: { status: "confirmed" },
        select: { groupSize: true, isOpenTable: true },
      },
    },
  });

  return events.map((event) => {
    const bookedSeats = event.bookings.reduce((sum, b) => sum + b.groupSize, 0);
    const hasOpenTable = event.bookings.some((b) => b.isOpenTable);
    return {
      id: event.id,
      title: event.title,
      shortDesc: event.shortDesc,
      scheduledAt: event.scheduledAt.toISOString(),
      durationMinutes: event.durationMinutes,
      capacity: event.capacity,
      status: event.status,
      level: event.level,
      animatorName: event.animatorName,
      tags: event.tags,
      price: event.price,
      bookedSeats,
      hasOpenTable,
    };
  });
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="hero-gradient py-14 px-4 text-center border-b border-ink-700">
        <h1 className="font-cinzel text-3xl md:text-4xl font-semibold text-parchment tracking-wide">
          Votre prochaine soirée commence ici
        </h1>
        <p
          className="mt-3 text-lg text-parchment-dim"
          style={{ fontFamily: "var(--font-crimson), 'Crimson Text', serif", fontStyle: "italic" }}
        >
          Des événements chaque semaine, pour tous les niveaux
        </p>
      </section>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-10">
        <EventsPageClient events={events} />
      </main>

      <Footer />
    </div>
  );
}
