import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, Users, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { db } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface EventPageProps {
  params: { id: string };
}

async function getEvent(id: string) {
  const event = await db.event.findUnique({
    where: { id },
    include: {
      bookings: {
        where: { status: { in: ["confirmed", "waitlist"] } },
        select: { id: true, groupSize: true, isOpenTable: true, status: true },
      },
    },
  });
  return event;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await db.event.findUnique({
    where: { id: params.id },
    select: { title: true, shortDesc: true },
  });
  if (!event) return { title: "Événement introuvable" };
  return { title: event.title, description: event.shortDesc };
}

const LEVEL_LABEL: Record<string, string> = {
  debutant:      "Débutant",
  intermediaire: "Intermédiaire",
  confirme:      "Confirmé",
  tous:          "Tous niveaux",
};

const LEVEL_BADGE: Record<string, string> = {
  debutant:      "badge-level-beginner",
  intermediaire: "badge-level-mid",
  confirme:      "badge-level-expert",
  tous:          "badge-all",
};

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEvent(params.id);
  if (!event) notFound();

  const confirmedBookings = event.bookings.filter((b) => b.status === "confirmed");
  const waitlistBookings = event.bookings.filter((b) => b.status === "waitlist");
  const bookedSeats = confirmedBookings.reduce((sum, b) => sum + b.groupSize, 0);
  const hasOpenTable = confirmedBookings.some((b) => b.isOpenTable);
  const isFull = event.status === "full" || bookedSeats >= event.capacity;
  const pct = Math.min((bookedSeats / event.capacity) * 100, 100);
  const fillClass = isFull ? "full" : pct >= 70 ? "nearly-full" : "";
  const isPast = event.scheduledAt < new Date();

  const formattedDate = format(event.scheduledAt, "EEEE d MMMM yyyy", { locale: fr });
  const formattedDateCap = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  const formattedTime = format(event.scheduledAt, "HH'h'mm", { locale: fr });
  const durationH = Math.floor(event.durationMinutes / 60);
  const durationM = event.durationMinutes % 60;
  const durationLabel = durationM > 0
    ? `${durationH}h${String(durationM).padStart(2, "0")}`
    : `${durationH}h`;

  const animatorInitials = event.animatorName
    ? event.animatorName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const levelBadge = LEVEL_BADGE[event.level] ?? "badge-all";
  const levelLabel = LEVEL_LABEL[event.level] ?? event.level;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page header */}
      <div className="bg-gradient-to-b from-ink-800 to-ink-950 border-b border-ink-700 py-10 px-4">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(162, 87, 58, 0.12) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto max-w-5xl relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-parchment-muted mb-4">
            <Link href="/events" className="hover:text-copper-light transition-colors">
              Événements
            </Link>
            <ChevronRight size={12} />
            <span className="text-parchment-dim line-clamp-1">{event.title}</span>
          </nav>

          {/* Title */}
          <h1 className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-semibold text-parchment max-w-3xl">
            {event.title}
          </h1>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-copper-light">
            <div className="flex items-center gap-1.5">
              <Calendar size={15} />
              <span>{formattedDateCap}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={15} />
              <span>{formattedTime} · {durationLabel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={15} />
              <span>Arkadia, Paris</span>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={levelBadge}>{levelLabel}</span>
            {event.tags.map((tag) => (
              <span key={tag} className="badge bg-ink-700 text-parchment-dim">
                {tag}
              </span>
            ))}
          </div>

          {/* Capacity bar */}
          <div className="mt-5 max-w-xs">
            <div className="flex justify-between text-xs text-parchment-muted mb-1">
              <span>{bookedSeats} / {event.capacity} places</span>
              {isFull && <span className="badge-full">Complet</span>}
            </div>
            <div className="capacity-bar h-2">
              <div
                className={`capacity-fill ${fillClass}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 container mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Left column ── */}
          <div className="flex-1 space-y-8">
            {/* Description */}
            <section>
              <h2 className="font-cinzel text-sm text-copper-light uppercase tracking-widest mb-4">
                À propos
              </h2>
              <p className="font-sans text-parchment-dim leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </section>

            {/* Animator */}
            {event.animatorName && (
              <section className="bg-ink-800 rounded-lg p-6 border border-ink-600">
                <h2 className="font-cinzel text-sm text-copper-light uppercase tracking-widest mb-4">
                  Votre animateur
                </h2>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-forest-base flex items-center justify-center shrink-0">
                    <span className="font-cinzel text-sm font-bold text-copper-light">
                      {animatorInitials}
                    </span>
                  </div>
                  <div>
                    <p className="font-cinzel text-base text-parchment">{event.animatorName}</p>
                    {event.animatorNote && (
                      <p
                        className="mt-1 text-sm text-parchment-dim"
                        style={{ fontFamily: "var(--font-crimson), 'Crimson Text', serif", fontStyle: "italic" }}
                      >
                        &ldquo;{event.animatorNote}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Participants */}
            <section>
              <h2 className="font-cinzel text-sm text-copper-light uppercase tracking-widest mb-4">
                Participants
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {Array.from({ length: Math.min(confirmedBookings.length, 5) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-ink-600 border border-ink-500 flex items-center justify-center -ml-2 first:ml-0"
                    >
                      <span className="text-xs font-medium text-parchment-dim">
                        {String.fromCharCode(65 + i)}
                      </span>
                    </div>
                  ))}
                  {confirmedBookings.length > 5 && (
                    <div className="w-8 h-8 rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center -ml-2">
                      <span className="text-xs text-parchment-muted">
                        +{confirmedBookings.length - 5}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-sm text-parchment-dim">
                  {bookedSeats} joueur{bookedSeats > 1 ? "s" : ""} inscrit{bookedSeats > 1 ? "s" : ""}
                </span>
              </div>

              {/* Open table CTA */}
              {hasOpenTable && !isFull && (
                <div className="rounded-lg border border-forest-base/30 bg-forest-base/10 p-4">
                  <div className="flex items-start gap-3">
                    <Users size={18} className="text-forest-light shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-sm font-medium text-parchment">
                        Vous venez seul·e ? Rejoignez une table ouverte
                      </p>
                      <p className="text-xs text-parchment-muted mt-1">
                        Des joueurs cherchent des partenaires — votre place est à la table.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Waitlist info */}
              {waitlistBookings.length > 0 && (
                <p className="text-xs text-parchment-muted mt-3">
                  {waitlistBookings.length} personne{waitlistBookings.length > 1 ? "s" : ""} en liste
                  d&apos;attente
                </p>
              )}
            </section>
          </div>

          {/* ── Booking panel (sticky) ── */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-24 bg-ink-800 border border-ink-600 rounded-lg p-6 shadow-copper-sm">
              {/* Price */}
              <div className="text-center mb-4">
                <span className="font-cinzel text-2xl text-copper-light font-semibold">
                  {event.price === 0 ? "Gratuit" : `${event.price / 100} €`}
                </span>
                <p className="text-xs text-parchment-muted mt-0.5">par personne</p>
              </div>

              {/* Capacity */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-parchment-muted mb-1">
                  <span>{bookedSeats} / {event.capacity} places</span>
                  <span>{Math.round(100 - pct)}% disponible</span>
                </div>
                <div className="capacity-bar h-1.5">
                  <div
                    className={`capacity-fill ${fillClass}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Booking form placeholder */}
              <div className="rounded-md border border-ink-600/50 bg-ink-900/50 p-4 text-center mb-5">
                <p className="text-xs text-parchment-muted">
                  Formulaire de réservation — disponible prochainement
                </p>
              </div>

              {/* CTA button */}
              {isPast ? (
                <button disabled className="btn-primary w-full justify-center opacity-40 cursor-not-allowed">
                  Événement terminé
                </button>
              ) : isFull ? (
                <button className="btn-secondary w-full justify-center">
                  Rejoindre la liste d&apos;attente
                </button>
              ) : (
                <button className="btn-primary w-full justify-center">
                  Réserver ma place
                </button>
              )}

              {/* Meta info */}
              <div className="mt-4 space-y-2 text-xs text-parchment-muted">
                <div className="flex items-center gap-2">
                  <Clock size={12} />
                  <span>Durée : {durationLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={12} />
                  <span>Capacité max : {event.capacity} places</span>
                </div>
                {event.isRecurring && (
                  <div className="flex items-center gap-2">
                    <Calendar size={12} />
                    <span>Événement récurrent</span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
