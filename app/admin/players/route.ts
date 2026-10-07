import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

const positions = [
  "GOALKEEPER",
  "DEFENDER",
  "ATTACKER",
] as const;

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "ابتدا وارد حساب شوید." },
        { status: 401 }
      );
    }

    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز." },
        { status: 403 }
      );
    }

    const body = await req.json();

    const {
      playerId,
      name,
      capNumber,
      position,
      bio,
      imageUrl,
      matches,
      goals,
      assists,
      saves,
      steals,
    } = body;

    if (!playerId) {
      return NextResponse.json(
        { error: "شناسه بازیکن ارسال نشده است." },
        { status: 400 }
      );
    }

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "نام بازیکن الزامی است." },
        { status: 400 }
      );
    }

    const parsedCapNumber = Number(capNumber);

    if (
      !Number.isInteger(parsedCapNumber) ||
      parsedCapNumber < 1 ||
      parsedCapNumber > 99
    ) {
      return NextResponse.json(
        { error: "شماره کلاه باید بین ۱ تا ۹۹ باشد." },
        { status: 400 }
      );
    }

    if (!positions.includes(position)) {
      return NextResponse.json(
        { error: "پست بازیکن معتبر نیست." },
        { status: 400 }
      );
    }

    const existingPlayer =
      await prisma.playerProfile.findUnique({
        where: {
          id: playerId,
        },
        include: {
          stats: true,
          user: true,
        },
      });

    if (!existingPlayer) {
      return NextResponse.json(
        { error: "بازیکن پیدا نشد." },
        { status: 404 }
      );
    }

    const capOwner =
      await prisma.playerProfile.findUnique({
        where: {
          capNumber: parsedCapNumber,
        },
      });

    if (
      capOwner &&
      capOwner.id !== existingPlayer.id
    ) {
      return NextResponse.json(
        {
          error:
            "این شماره کلاه قبلاً برای بازیکن دیگری ثبت شده است.",
        },
        { status: 409 }
      );
    }

    const toSafeNumber = (value: unknown) => {
      const number = Number(value);

      if (!Number.isFinite(number) || number < 0) {
        return 0;
      }

      return Math.floor(number);
    };

    const updatedPlayer =
      await prisma.playerProfile.update({
        where: {
          id: playerId,
        },
        data: {
          name: name.trim(),
          capNumber: parsedCapNumber,
          position,
          bio:
            typeof bio === "string" && bio.trim()
              ? bio.trim()
              : null,
          imageUrl:
            typeof imageUrl === "string" &&
            imageUrl.trim()
              ? imageUrl.trim()
              : null,

          stats: {
            upsert: {
              create: {
                matches: toSafeNumber(matches),
                goals: toSafeNumber(goals),
                assists: toSafeNumber(assists),
                saves: toSafeNumber(saves),
                steals: toSafeNumber(steals),
              },
              update: {
                matches: toSafeNumber(matches),
                goals: toSafeNumber(goals),
                assists: toSafeNumber(assists),
                saves: toSafeNumber(saves),
                steals: toSafeNumber(steals),
              },
            },
          },
        },
        include: {
          stats: true,
        },
      });

    return NextResponse.json({
      success: true,
      message: "اطلاعات بازیکن با موفقیت به‌روزرسانی شد.",
      player: updatedPlayer,
    });
  } catch (error) {
    console.error("ADMIN PLAYER UPDATE ERROR:", error);

    return NextResponse.json(
      {
        error:
          "خطایی هنگام به‌روزرسانی بازیکن رخ داد.",
      },
      { status: 500 }
    );
  }
}