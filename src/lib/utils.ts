import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isTomorrow, isThisWeek } from "date-fns";
import { fr } from "date-fns/locale";
import type { EventStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isToday(d)) return "Aujourd'hui";
  if (isTomorrow(d)) return "Demain";
  if (isThisWeek(d)) return format(d, "EEEE", { locale: fr });
  return format(d, "d MMMM yyyy", { locale: fr });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "HH:mm", { locale: fr });
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} à ${formatTime(date)}`;
}

export function formatPrice(priceInCents: number): string {
  if (priceInCents === 0) return "Gratuit";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(priceInCents / 100);
}

export function getEventStatusLabel(status: EventStatus): {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
} {
  switch (status) {
    case "upcoming":
      return { label: "À venir", variant: "default" };
    case "ongoing":
      return { label: "En cours", variant: "secondary" };
    case "full":
      return { label: "Complet", variant: "destructive" };
    case "cancelled":
      return { label: "Annulé", variant: "destructive" };
    case "completed":
      return { label: "Terminé", variant: "outline" };
    default:
      return { label: status, variant: "outline" };
  }
}

export function getSpotsLeft(max: number, current: number): string {
  const left = max - current;
  if (left === 0) return "Complet";
  if (left === 1) return "1 place restante";
  return `${left} places restantes`;
}
