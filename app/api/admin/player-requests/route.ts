import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const admin = await getCurrentUser();

    if (!admin) {
      return NextResponse.json(
        { error: "برای انجام این کار باید وارد حساب شوید." },
        { status: 401 }
      );
    }

    if (admin.role !== "ADMIN") {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز." },
        { status: 403 }
      );
    }

    const body = await req.json();

    const userId = body.userId;
    const action = body.action;

    if (!userId || !action) {
      return NextResponse.json(
        { error: "اطلاعات درخواست ناقص است." },
        { status: 400 }
      );
    }

    if (action !== "APPROVE" && action !== "REJECT") {
      return NextResponse.json(
        { error: "عملیات نامعتبر است." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "کاربر پیدا نشد." },
        { status: 404 }
      );
    }

    if (action === "APPROVE") {
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
        message: "درخواست بازیکن با موفقیت تأیید شد.",
        user: updatedUser,
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "USER",
        playerApplicationStatus: "REJECTED",
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
      message: "درخواست بازیکن رد شد.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("ADMIN_PLAYER_REQUEST_ERROR:", error);

    return NextResponse.json(
      { error: "خطایی هنگام پردازش درخواست رخ داد." },
      { status: 500 }
    );
  }
}