import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/src/lib/prisma";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("talaedaran_session")?.value;

    if (token) {
      await prisma.session.deleteMany({
        where: {
          token,
        },
      });
    }

    const response = NextResponse.json({
      message: "با موفقیت از حساب خارج شدید.",
    });

    response.cookies.set("talaedaran_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("LOGOUT_ERROR:", error);

    return NextResponse.json(
      {
        error: "خطایی هنگام خروج از حساب رخ داد.",
      },
      { status: 500 }
    );
  }
}