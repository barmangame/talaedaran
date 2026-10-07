import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const admin = await getCurrentUser();

    if (!admin) {
      return NextResponse.json(
        { error: "برای دسترسی باید وارد حساب شوید." },
        { status: 401 }
      );
    }

    if (admin.role !== "ADMIN") {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز است." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const userId =
      typeof body.userId === "string"
        ? body.userId
        : "";

    const action =
      typeof body.action === "string"
        ? body.action
        : "";

    if (!userId) {
      return NextResponse.json(
        { error: "شناسه کاربر ارسال نشده است." },
        { status: 400 }
      );
    }

    if (action !== "APPROVE" && action !== "REJECT") {
      return NextResponse.json(
        { error: "عملیات نامعتبر است." },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "کاربر پیدا نشد." },
        { status: 404 }
      );
    }

    if (targetUser.playerApplicationStatus !== "PENDING") {
      return NextResponse.json(
        { error: "این درخواست در وضعیت انتظار بررسی نیست." },
        { status: 400 }
      );
    }

    if (action === "REJECT") {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          playerApplicationStatus: "REJECTED",
          role: "USER",
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
        message: "درخواست بازیکن شدن رد شد.",
        user: updatedUser,
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "PLAYER",
        playerApplicationStatus: "APPROVED",
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
      message: "درخواست با موفقیت تأیید شد.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("ADMIN_PLAYER_REQUEST_ERROR:", error);

    return NextResponse.json(
      { error: "خطایی هنگام بررسی درخواست رخ داد." },
      { status: 500 }
    );
  }
}