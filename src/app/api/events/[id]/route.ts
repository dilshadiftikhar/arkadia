import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { ApiResponse, Event } from "@/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await db.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Événement introuvable." },
        { status: 404 }
      );
    }

    const response: ApiResponse<Event> = { data: event as unknown as Event };
    return NextResponse.json(response);
  } catch (error) {
    console.error("[GET /api/events/:id]", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement de l'événement." },
      { status: 500 }
    );
  }
}
