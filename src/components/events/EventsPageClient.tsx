"use client";

import { useState, useMemo } from "react";
import { getISOWeek, getYear, startOfWeek, isThisWeek, format } from "date-fns";
import { fr } from "date-fns/locale";
import { EventCard, type EventCardData } from "./EventCard";
import { cn } from "@/lib/utils";

const LEVELS = [
  { value: "all",           label: "Tous" },
  { value: "debutant",      label: "Débutant" },
  { value: "intermediaire", label: "Intermédiaire" },
  { value: "confirme",      label: "Confirmé" },
] as const;

const AVAILABLE_TAGS = ["Coopératif", "Stratégie", "Famille", "Tournoi", "Ambiance"];

function getWeekLabel(isoString: string): string {
  const date = new Date(isoString);
  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return "— Cette semaine —";
  }
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  return `— Semaine du ${format(weekStart, "d MMM", { locale: fr })} —`;
}

function groupByWeek(events: EventCardData[]): { key: string; label: string; events: EventCardData[] }[] {
  const map = new Map<string, { label: string; events: EventCardData[] }>();

  for (const event of events) {
    const date = new Date(event.scheduledAt);
    const key = `${getYear(date)}-W${String(getISOWeek(date)).padStart(2, "0")}`;
    if (!map.has(key)) {
      map.set(key, { label: getWeekLabel(event.scheduledAt), events: [] });
    }
    map.get(key)!.events.push(event);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => ({ key, ...val }));
}

interface EventsPageClientProps {
  events: EventCardData[];
}

export function EventsPageClient({ events }: EventsPageClientProps) {
  const [activeLevel, setActiveLevel] = useState<string>("all");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    return events.filter((event) => {
      if (activeLevel !== "all" && event.level !== activeLevel) return false;
      if (activeTags.length > 0 && !activeTags.some((t) => event.tags.includes(t))) return false;
      return true;
    });
  }, [events, activeLevel, activeTags]);

  const groups = useMemo(() => groupByWeek(filtered), [filtered]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* ── Filters ── */}
      <aside className="md:w-56 lg:w-64 shrink-0">
        <h3 className="font-cinzel text-sm text-copper-light uppercase tracking-widest mb-4">
          Filtrer
        </h3>

        {/* Level */}
        <div className="mb-6">
          <p className="font-sans text-xs text-parchment-muted uppercase tracking-wider mb-2">
            Niveau
          </p>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((lvl) => (
              <button
                key={lvl.value}
                onClick={() => setActiveLevel(lvl.value)}
                className={cn(
                  "font-sans text-xs px-3 py-1.5 rounded-md border transition-colors duration-150",
                  activeLevel === lvl.value
                    ? "bg-copper-base text-parchment border-copper-base"
                    : "bg-ink-700 text-parchment-dim border-ink-600 hover:border-copper-muted"
                )}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="font-sans text-xs text-parchment-muted uppercase tracking-wider mb-2">
            Thèmes
          </p>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "badge transition-colors duration-150 cursor-pointer",
                  activeTags.includes(tag)
                    ? "bg-copper-base text-parchment border border-copper-base"
                    : "bg-ink-700 text-parchment-dim border border-ink-600 hover:border-copper-muted"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Events List ── */}
      <div className="flex-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl mb-4 opacity-30">🎲</span>
            <p className="font-cinzel text-parchment-dim">Aucun événement pour ces filtres</p>
            <button
              onClick={() => { setActiveLevel("all"); setActiveTags([]); }}
              className="btn-secondary mt-4 text-sm py-2 px-4"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {groups.map((group) => (
              <section key={group.key}>
                {/* Week separator */}
                <div className="separator-copper mb-6">
                  <span className="font-cinzel text-xs text-copper-light uppercase tracking-widest whitespace-nowrap px-2">
                    {group.label}
                  </span>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {group.events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
