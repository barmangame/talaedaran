import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function POST() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "برای انجام این کار باید وارد حساب شوید." },
        { status: 401 }
      );
    }

    if (user.role !== "USER") {
      return NextResponse.json(
        { error: "این درخواست فقط برای کاربران عادی قابل ثبت است." },
        { status: 400 }
      );
    }

    if (user.playerApplicationStatus === "PENDING") {
      return NextResponse.json(
        { error: "درخواست شما قبلاً ثبت شده و در حال بررسی است." },
        { status: 400 }
      );
    }

    if (user.playerApplicationStatus === "APPROVED") {
      return NextResponse.json(
        { error: "درخواست شما قبلاً تأیید شده است." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        playerApplicationStatus: "PENDING",
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        playerApplicationStatus: true,
      },
    });

    return NextResponse.json({
      message: "درخواست بازیکن شدن با موفقیت ثبت شد.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("PLAYER_APPLY_ERROR:", error);

    return NextResponse.json(
      { error: "خطایی هنگام ثبت درخواست رخ داد." },
      { status: 500 }
    );
  }
}