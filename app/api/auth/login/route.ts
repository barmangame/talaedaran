import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const identifier =
      typeof body.identifier === "string"
        ? body.identifier.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!identifier || !password) {
      return NextResponse.json(
        {
          error: "نام کاربری یا ایمیل و رمز عبور الزامی است.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "اطلاعات ورود صحیح نیست.",
        },
        { status: 401 }
      );
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordIsValid) {
      return NextResponse.json(
        {
          error: "اطلاعات ورود صحیح نیست.",
        },
        { status: 401 }
      );
    }

    const token = randomBytes(32).toString("hex");

    const expiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 30
    );

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    const response = NextResponse.json(
      {
        message: "ورود با موفقیت انجام شد.",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set("talaedaran_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error("LOGIN_ERROR:", error);

    return NextResponse.json(
      {
        error: "خطایی در ورود به حساب رخ داد.",
      },
      { status: 500 }
    );
  }
}