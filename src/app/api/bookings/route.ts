import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

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

    return NextResponse.json({ data: bookings });
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
    const { eventId, groupSize = 1, specialNote, isOpenTable = false } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: "L'identifiant de l'événement est requis." },
        { status: 400 }
      );
    }

    const event = await db.event.findUnique({
      where: { id: eventId },
      include: {
        bookings: {
          where: { status: "confirmed" },
          select: { groupSize: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Événement introuvable." }, { status: 404 });
    }

    const bookedSeats = event.bookings.reduce((sum, b) => sum + b.groupSize, 0);
    if (event.status === "full" || bookedSeats + groupSize > event.capacity) {
      return NextResponse.json(
        { error: "Plus assez de places disponibles." },
        { status: 409 }
      );
    }

    const booking = await db.booking.create({
      data: {
        eventId,
        userId,
        groupSize,
        specialNote,
        isOpenTable,
        status: "confirmed",
      },
      include: { event: true },
    });

    return NextResponse.json(
      { data: booking, message: "Réservation confirmée !" },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes("Unique constraint")) {
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
