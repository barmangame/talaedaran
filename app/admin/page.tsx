import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import AdminUsers from "./AdminUsers";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      playerApplicationStatus: true,
      createdAt: true,

      player: {
        select: {
          id: true,
          name: true,
          capNumber: true,
          position: true,
          bio: true,
          imageUrl: true,

          stats: {
            select: {
              matches: true,
              goals: true,
              assists: true,
              saves: true,
              steals: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const serializedUsers = users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  }));

  return <AdminUsers users={serializedUsers} />;
}