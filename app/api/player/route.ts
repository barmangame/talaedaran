import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const players = await prisma.playerProfile.findMany({
      where: {
        user: {
          role: "PLAYER",
          playerApplicationStatus: "APPROVED",
        },
      },
      select: {
        id: true,
        name: true,
        capNumber: true,
        position: true,
        imageUrl: true,
      },
      orderBy: {
        capNumber: "asc",
      },
    });

    return NextResponse.json(players);
  } catch {
    return NextResponse.json(
      { error: "دریافت بازیکنان انجام نشد." },
      { status: 500 }
    );
  }
}