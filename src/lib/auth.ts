import { cookies } from "next/headers";
import { prisma } from "@/src/lib/prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("talaedaran_session")?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: {
      token,
    },
    include: {
      user: {
        include: {
          player: {
            include: {
              stats: true,
            },
          },
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return session.user;
} 