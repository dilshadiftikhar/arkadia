import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import type { ApiResponse, PaginatedResponse, Event } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize") ?? 12)));
    const category = searchParams.get("category") ?? undefined;
    const status = searchParams.get("status") ?? undefined;
    const search = searchParams.get("search") ?? undefined;

    const where = {
      ...(category && { category: category as never }),
      ...(status && { status: status as never }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { gameName: { contains: search, mode: "insensitive" as const } },
          { shortDescription: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [events, total] = await Promise.all([
      db.event.findMany({
        where,
        orderBy: { startDate: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.event.count({ where }),
    ]);

    const response: ApiResponse<PaginatedResponse<Event>> = {
      data: {
        data: events as unknown as Event[],
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[GET /api/events]", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des événements." },
      { status: 500 }
    );
  }
}
