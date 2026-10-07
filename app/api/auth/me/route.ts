import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          authenticated: false,
          user: null,
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        playerApplicationStatus:
          user.playerApplicationStatus,
        player: user.player,
      },
    });
  } catch (error) {
    console.error("ME_ERROR:", error);

    return NextResponse.json(
      {
        error: "خطایی در دریافت اطلاعات کاربر رخ داد.",
      },
      { status: 500 }
    );
  }
}