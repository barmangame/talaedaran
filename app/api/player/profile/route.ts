import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "برای انجام این کار باید وارد حساب شوید." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const capNumber = Number(body.capNumber);

    const position =
      typeof body.position === "string"
        ? body.position
        : "";

    const bio =
      typeof body.bio === "string"
        ? body.bio.trim()
        : "";

    const imageUrl =
      typeof body.imageUrl === "string"
        ? body.imageUrl.trim()
        : "";

    if (!name) {
      return NextResponse.json(
        { error: "نام بازیکن الزامی است." },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(capNumber) ||
      capNumber < 0 ||
      capNumber > 99
    ) {
      return NextResponse.json(
        { error: "شماره کلاه باید بین ۰ تا ۹۹ باشد." },
        { status: 400 }
      );
    }

    if (
      position !== "GOALKEEPER" &&
      position !== "DEFENDER" &&
      position !== "ATTACKER"
    ) {
      return NextResponse.json(
        { error: "پست بازیکن معتبر نیست." },
        { status: 400 }
      );
    }

    const existingProfile =
      await prisma.playerProfile.findUnique({
        where: {
          userId: user.id,
        },
      });

    if (!existingProfile) {
      const player = await prisma.playerProfile.create({
        data: {
          userId: user.id,
          name,
          capNumber,
          position,
          bio: bio || null,
          imageUrl: imageUrl || null,
        },
        include: {
          stats: true,
        },
      });

      return NextResponse.json(
        {
          message: "پروفایل بازیکن با موفقیت ساخته شد.",
          player,
        },
        { status: 201 }
      );
    }

    const player =
      await prisma.playerProfile.update({
        where: {
          userId: user.id,
        },
        data: {
          name,
          capNumber,
          position,
          bio: bio || null,
          imageUrl: imageUrl || null,
        },
        include: {
          stats: true,
        },
      });

    return NextResponse.json({
      message: "پروفایل بازیکن با موفقیت ویرایش شد.",
      player,
    });
  } catch (error) {
    console.error("PLAYER_PROFILE_ERROR:", error);

    return NextResponse.json(
      { error: "خطایی در ذخیره پروفایل بازیکن رخ داد." },
      { status: 500 }
    );
  }
}