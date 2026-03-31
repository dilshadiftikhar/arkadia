import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await db.event.findUnique({
      where: { id: params.id },
      include: {
        bookings: {
          where: { status: { in: ["confirmed", "waitlist"] } },
          select: { id: true, groupSize: true, isOpenTable: true, status: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Événement introuvable." }, { status: 404 });
    }

    const confirmedBookings = event.bookings.filter((b) => b.status === "confirmed");
    const bookedSeats = confirmedBookings.reduce((sum, b) => sum + b.groupSize, 0);
    const hasOpenTable = confirmedBookings.some((b) => b.isOpenTable);
    const waitlistCount = event.bookings.filter((b) => b.status === "waitlist").length;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { bookings: _bookings, ...rest } = event;
    return NextResponse.json({
      data: { ...rest, bookedSeats, hasOpenTable, waitlistCount },
    });
  } catch (error) {
    console.error("[GET /api/events/:id]", error);
    return NextResponse.json({ error: "Erreur lors du chargement de l'événement." }, { status: 500 });
  }
}
