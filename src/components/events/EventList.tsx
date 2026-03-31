"use client";

import { useQuery } from "@tanstack/react-query";
import { EventCard, type EventCardData } from "./EventCard";
import { EventCardSkeletonGrid } from "./EventCardSkeleton";

async function fetchEvents(): Promise<EventCardData[]> {
  const res = await fetch("/api/events");
  if (!res.ok) throw new Error("Erreur de chargement");
  const json = await res.json();
  return json.data?.data ?? [];
}

export function EventList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 30_000,
  });

  if (isLoading) return <EventCardSkeletonGrid count={6} />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-parchment-muted font-sans">Impossible de charger les événements.</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4 opacity-30">🎲</span>
        <p className="text-parchment-dim font-sans">Aucun événement à venir.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {data.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
