import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export type EventCardData = {
  id: string;
  title: string;
  shortDesc: string;
  scheduledAt: string; // ISO string (serialized from server)
  durationMinutes: number;
  capacity: number;
  status: string; // open | full | cancelled
  level: string;  // tous | debutant | intermediaire | confirme
  animatorName: string | null;
  tags: string[];
  price: number; // centimes
  bookedSeats: number;
  hasOpenTable: boolean;
};

const LEVEL_BAND: Record<string, string> = {
  debutant:      "bg-forest-base",
  intermediaire: "bg-copper-dark",
  confirme:      "bg-ink-500",
  tous:          "bg-copper-gradient",
};

const LEVEL_BADGE: Record<string, string> = {
  debutant:      "badge-level-beginner",
  intermediaire: "badge-level-mid",
  confirme:      "badge-level-expert",
  tous:          "badge-all",
};

const LEVEL_LABEL: Record<string, string> = {
  debutant:      "Débutant",
  intermediaire: "Intermédiaire",
  confirme:      "Confirmé",
  tous:          "Tous niveaux",
};

function formatEventDate(isoString: string): string {
  const date = new Date(isoString);
  const str = format(date, "EEE d MMM · HH'h'mm", { locale: fr });
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function EventCard({ event }: { event: EventCardData }) {
  const date = new Date(event.scheduledAt);
  const now = new Date();
  const isPast = date < now;
  const isFull = event.status === "full" || event.bookedSeats >= event.capacity;
  const pct = Math.min((event.bookedSeats / event.capacity) * 100, 100);

  const fillClass = isFull
    ? "full"
    : pct >= 70
    ? "nearly-full"
    : "";

  const bandClass = LEVEL_BAND[event.level] ?? "bg-copper-base";
  const badgeClass = LEVEL_BADGE[event.level] ?? "badge-all";
  const levelLabel = LEVEL_LABEL[event.level] ?? event.level;

  return (
    <Link href={`/events/${event.id}`} className="card-event block">
      {/* Level color band */}
      <div className={`h-1 w-full ${bandClass}`} />

      {/* Body */}
      <div className="p-5">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-copper-light text-sm font-sans">
          <Calendar size={14} className="shrink-0" />
          <span>{formatEventDate(event.scheduledAt)}</span>
        </div>

        {/* Title */}
        <h3 className="font-cinzel text-lg font-semibold text-parchment mt-1 leading-tight">
          {event.title}
        </h3>

        {/* Short desc */}
        <p className="font-sans text-sm text-parchment-dim mt-1 line-clamp-2">
          {event.shortDesc}
        </p>

        {/* Badges */}
        <div className="mt-3 flex gap-2 flex-wrap">
          <span className={badgeClass}>{levelLabel}</span>
          {event.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="badge bg-ink-700 text-parchment-dim">
              {tag}
            </span>
          ))}
          {event.hasOpenTable && (
            <span className="badge-open-table">
              <Users size={10} className="mr-1" />
              Table ouverte
            </span>
          )}
        </div>

        {/* Capacity */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-parchment-muted">
              {event.bookedSeats} / {event.capacity} places
            </span>
            {isFull && (
              <span className="badge-full">Complet</span>
            )}
          </div>
          <div className="capacity-bar">
            <div
              className={`capacity-fill ${fillClass}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center">
          <span className="font-cinzel text-copper-light font-semibold">
            {event.price === 0 ? "Gratuit" : `${event.price / 100} €`}
          </span>
          {isPast ? (
            <span className="text-sm text-parchment-muted">Terminé</span>
          ) : isFull ? (
            <span className="btn-secondary text-sm py-2 px-4">
              Liste d&apos;attente
            </span>
          ) : (
            <span className="btn-primary text-sm py-2 px-4">
              Je réserve →
            </span>
          )}
        </div>

        {/* Animator */}
        {event.animatorName && (
          <p className="mt-3 text-xs text-parchment-muted italic">
            Animé par {event.animatorName}
          </p>
        )}
      </div>
    </Link>
  );
}
