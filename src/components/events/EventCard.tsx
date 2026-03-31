import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OpenTableBadge } from "@/components/booking/OpenTableBadge";
import { formatDate, formatTime, formatPrice, getEventStatusLabel } from "@/lib/utils";
import type { Event } from "@/types";
import { Calendar, Clock, Users } from "lucide-react";

interface EventCardProps {
  event: Event;
}

const CATEGORY_LABELS: Record<string, string> = {
  strategy: "Stratégie",
  family: "Famille",
  party: "Party Game",
  roleplay: "Jeu de rôle",
  cooperative: "Coopératif",
  card: "Cartes",
  dice: "Dés",
  dungeon: "Dungeon",
};

const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Débutant",
  2: "Facile",
  3: "Intermédiaire",
  4: "Expert",
  5: "Maître",
};

export function EventCard({ event }: EventCardProps) {
  const statusInfo = getEventStatusLabel(event.status);

  return (
    <Link href={`/events/${event.id}`} className="block group">
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-border group-hover:bg-card/80 overflow-hidden">
        {/* Image placeholder */}
        <div className="relative h-40 bg-gradient-to-br from-arkadia-crimson-900/60 to-arkadia-dark-300 overflow-hidden">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-4xl opacity-30">🎲</span>
            </div>
          )}
          {/* Status badge overlay */}
          <div className="absolute top-2 right-2">
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-card-foreground leading-tight line-clamp-2">
                {event.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{event.gameName}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            <Badge variant="outline" className="text-xs">
              {CATEGORY_LABELS[event.category] ?? event.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {DIFFICULTY_LABELS[event.difficulty] ?? `Niv. ${event.difficulty}`}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.shortDescription}
          </p>

          <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>
                {formatTime(event.startDate)} – {formatTime(event.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 shrink-0" />
              <span>
                {event.currentPlayers}/{event.maxPlayers} joueurs
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-2">
          <span className="font-semibold text-sm text-foreground">
            {formatPrice(event.price)}
          </span>
          <OpenTableBadge current={event.currentPlayers} max={event.maxPlayers} />
        </CardFooter>
      </Card>
    </Link>
  );
}
