import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import type { ApiResponse, Booking } from "@/types";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const bookings = await db.booking.findMany({
      where: { userId },
      include: { event: true },
      orderBy: { createdAt: "desc" },
    });

    const response: ApiResponse<Booking[]> = {
      data: bookings as unknown as Booking[],
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("[GET /api/bookings]", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des réservations." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const body = await request.json();
    const { eventId, numberOfSeats = 1, notes } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: "L'identifiant de l'événement est requis." },
        { status: 400 }
      );
    }

    const event = await db.event.findUnique({ where: { id: eventId } });

    if (!event) {
      return NextResponse.json(
        { error: "Événement introuvable." },
        { status: 404 }
      );
    }

    if (event.currentPlayers + numberOfSeats > event.maxPlayers) {
      return NextResponse.json(
        { error: "Plus assez de places disponibles." },
        { status: 409 }
      );
    }

    const totalPrice = event.price * numberOfSeats;

    const [booking] = await db.$transaction([
      db.booking.create({
        data: {
          eventId,
          userId,
          numberOfSeats,
          totalPrice,
          notes,
          status: "confirmed",
        },
        include: { event: true },
      }),
      db.event.update({
        where: { id: eventId },
        data: { currentPlayers: { increment: numberOfSeats } },
      }),
    ]);

    const response: ApiResponse<Booking> = {
      data: booking as unknown as Booking,
      message: "Réservation confirmée !",
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint")
    ) {
      return NextResponse.json(
        { error: "Vous avez déjà une réservation pour cet événement." },
        { status: 409 }
      );
    }
    console.error("[POST /api/bookings]", error);
    return NextResponse.json(
      { error: "Erreur lors de la réservation." },
      { status: 500 }
    );
  }
}
