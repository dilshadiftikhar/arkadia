"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EventCard } from "./EventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Event, PaginatedResponse, ApiResponse } from "@/types";
import { Search } from "lucide-react";

async function fetchEvents(params: {
  search?: string;
  category?: string;
  status?: string;
}): Promise<PaginatedResponse<Event>> {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category && params.category !== "all") query.set("category", params.category);
  if (params.status && params.status !== "all") query.set("status", params.status);

  const res = await fetch(`/api/events?${query.toString()}`);
  if (!res.ok) throw new Error("Erreur de chargement");
  const json: ApiResponse<PaginatedResponse<Event>> = await res.json();
  return json.data!;
}

export function EventList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events", search, category, status],
    queryFn: () => fetchEvents({ search, category, status }),
    staleTime: 30_000,
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un événement ou un jeu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes catégories</SelectItem>
            <SelectItem value="strategy">Stratégie</SelectItem>
            <SelectItem value="family">Famille</SelectItem>
            <SelectItem value="party">Party Game</SelectItem>
            <SelectItem value="roleplay">Jeu de rôle</SelectItem>
            <SelectItem value="cooperative">Coopératif</SelectItem>
            <SelectItem value="card">Cartes</SelectItem>
            <SelectItem value="dice">Dés</SelectItem>
            <SelectItem value="dungeon">Dungeon</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={(v) => setStatus(v ?? "all")}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            <SelectItem value="upcoming">À venir</SelectItem>
            <SelectItem value="ongoing">En cours</SelectItem>
            <SelectItem value="full">Complet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground">
            Impossible de charger les événements.
          </p>
        </div>
      )}

      {data && data.data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🎲</span>
          <p className="text-muted-foreground">
            Aucun événement ne correspond à votre recherche.
          </p>
        </div>
      )}

      {data && data.data.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">
            {data.total} événement{data.total > 1 ? "s" : ""} trouvé{data.total > 1 ? "s" : ""}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.data.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
