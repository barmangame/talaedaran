import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const username =
      typeof body.username === "string"
        ? body.username.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email || !username || !password) {
      return NextResponse.json(
        {
          error: "ایمیل، نام کاربری و رمز عبور الزامی هستند.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error: "رمز عبور باید حداقل ۸ کاراکتر باشد.",
        },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        {
          error: "نام کاربری باید حداقل ۳ کاراکتر باشد.",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
      select: {
        email: true,
        username: true,
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          {
            error: "این ایمیل قبلاً ثبت شده است.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          error: "این نام کاربری قبلاً استفاده شده است.",
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        role: "USER",
        playerApplicationStatus: "NONE",
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "حساب کاربری با موفقیت ساخته شد.",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER_ERROR:", error);

    return NextResponse.json(
      {
        error: "خطایی در ساخت حساب کاربری رخ داد.",
      },
      { status: 500 }
    );
  }
}