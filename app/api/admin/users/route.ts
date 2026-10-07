import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "برای دسترسی باید وارد حساب شوید." },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز است." },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        playerApplicationStatus: true,
        createdAt: true,
        player: {
          select: {
            id: true,
            name: true,
            capNumber: true,
            position: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      users,
    });
  } catch (error) {
    console.error("ADMIN_USERS_ERROR:", error);

    return NextResponse.json(
      { error: "خطایی در دریافت کاربران رخ داد." },
      { status: 500 }
    );
  }
}