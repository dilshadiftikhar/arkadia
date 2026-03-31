"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { OpenTableBadge } from "@/components/booking/OpenTableBadge";
import { BookingForm } from "@/components/booking/BookingForm";
import {
  formatDate,
  formatTime,
  formatPrice,
  getEventStatusLabel,
} from "@/lib/utils";
import type { Event, ApiResponse } from "@/types";
import { Calendar, Clock, Users, Star } from "lucide-react";

async function fetchEvent(id: string): Promise<Event> {
  const res = await fetch(`/api/events/${id}`);
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error("Erreur de chargement");
  const json: ApiResponse<Event> = await res.json();
  return json.data!;
}

interface EventDetailProps {
  id: string;
}

export function EventDetail({ id }: EventDetailProps) {
  const { data: event, isLoading, isError } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
    staleTime: 30_000,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Impossible de charger cet événement.
      </div>
    );
  }

  const statusInfo = getEventStatusLabel(event.status);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Main content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Hero image */}
        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-arkadia-crimson-900/60 to-arkadia-dark-300">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-7xl opacity-20">🎲</span>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          </div>
        </div>

        {/* Title + meta */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">{event.title}</h1>
          <p className="text-muted-foreground text-sm">
            Jeu : <span className="text-foreground font-medium">{event.gameName}</span>
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Separator />

        {/* Description */}
        <div>
          <h2 className="font-semibold text-foreground mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {event.description}
          </p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Info card */}
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(event.price)}
            </span>
            <OpenTableBadge current={event.currentPlayers} max={event.maxPlayers} />
          </div>

          <Separator />

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 shrink-0" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              <span>
                {formatTime(event.startDate)} – {formatTime(event.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 shrink-0" />
              <span>
                {event.minPlayers}–{event.maxPlayers} joueurs
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4 shrink-0" />
              <span>Difficulté : {event.difficulty}/5</span>
            </div>
          </div>

          <Separator />

          {/* Host */}
          <div className="flex items-center gap-3">
            {event.hostAvatar ? (
              <img
                src={event.hostAvatar}
                alt={event.hostName}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                {event.hostName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">Animé par</p>
              <p className="text-sm font-medium text-foreground">{event.hostName}</p>
            </div>
          </div>

          <Separator />

          <BookingForm event={event} />
        </div>
      </div>
    </div>
  );
}
