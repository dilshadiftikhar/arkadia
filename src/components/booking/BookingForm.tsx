"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import type { Event } from "@/types";
import { Loader2 } from "lucide-react";

interface BookingFormProps {
  event: Event;
}

export function BookingForm({ event }: BookingFormProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [seats, setSeats] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const available = event.maxPlayers - event.currentPlayers;
  const isFull = available === 0;
  const isCancelled = event.status === "cancelled";
  const totalPrice = event.price * seats;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event.id, numberOfSeats: seats, notes }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Une erreur est survenue.");
        return;
      }

      toast.success(data.message ?? "Réservation confirmée !");
      router.push("/dashboard");
    } catch {
      toast.error("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  if (isCancelled) {
    return (
      <p className="text-sm text-muted-foreground text-center py-2">
        Cet événement a été annulé.
      </p>
    );
  }

  if (isFull) {
    return (
      <Button className="w-full" disabled>
        Complet
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="seats">Nombre de places</Label>
        <Input
          id="seats"
          type="number"
          min={1}
          max={Math.min(available, 4)}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Maximum {Math.min(available, 4)} place{Math.min(available, 4) > 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Note (optionnelle)</Label>
        <Input
          id="notes"
          placeholder="Allergies, accessibilité..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-muted-foreground">Total</span>
        <span className="text-foreground">{formatPrice(totalPrice)}</span>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Réservation en cours...
          </>
        ) : isSignedIn ? (
          "Réserver ma place"
        ) : (
          "Se connecter pour réserver"
        )}
      </Button>
    </form>
  );
}
