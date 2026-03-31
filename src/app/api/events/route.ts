import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize") ?? 12)));
    const level = searchParams.get("level") ?? undefined;
    const status = searchParams.get("status") ?? undefined;
    const search = searchParams.get("search") ?? undefined;

    const where = {
      ...(level && { level }),
      ...(status ? { status } : { status: { not: "cancelled" } }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { shortDesc: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [events, total] = await Promise.all([
      db.event.findMany({
        where,
        orderBy: { scheduledAt: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          bookings: {
            where: { status: "confirmed" },
            select: { groupSize: true, isOpenTable: true },
          },
        },
      }),
      db.event.count({ where }),
    ]);

    const data = events.map((event) => {
      const bookedSeats = event.bookings.reduce((sum, b) => sum + b.groupSize, 0);
      const hasOpenTable = event.bookings.some((b) => b.isOpenTable);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { bookings: _bookings, ...rest } = event;
      return { ...rest, bookedSeats, hasOpenTable };
    });

    return NextResponse.json({ data: { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) } });
  } catch (error) {
    console.error("[GET /api/events]", error);
    return NextResponse.json({ error: "Erreur lors du chargement des événements." }, { status: 500 });
  }
}
