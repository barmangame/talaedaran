"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  username: string;
  email: string;
  role: "USER" | "PLAYER" | "ADMIN";
  playerApplicationStatus:
    | "NONE"
    | "PENDING"
    | "APPROVED"
    | "REJECTED";
  createdAt: string;
  player: {
    id: string;
    name: string;
    capNumber: number;
    position: string;
  } | null;
};

export default function AdminUsers({
  users,
}: {
  users: User[];
}) {
  const router = useRouter();

  const [loadingUser, setLoadingUser] =
    useState<string | null>(null);

  const [loggingOut, setLoggingOut] =
    useState(false);

  const [error, setError] = useState("");

  const pendingUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.playerApplicationStatus ===
          "PENDING"
      ),
    [users]
  );

  const players = useMemo(
    () =>
      users.filter(
        (user) => user.role === "PLAYER"
      ),
    [users]
  );

  async function handleRequest(
    userId: string,
    action: "APPROVE" | "REJECT"
  ) {
    setError("");
    setLoadingUser(userId);

    try {
      const response = await fetch(
        "/api/admin/player-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            action,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || "عملیات انجام نشد."
        );
        return;
      }

      router.refresh();
    } catch {
      setError(
        "ارتباط با سرور برقرار نشد."
      );
    } finally {
      setLoadingUser(null);
    }
  }

  async function handleLogout() {
    if (loggingOut) return;

    setError("");
    setLoggingOut(true);

    try {
      const response = await fetch(
        "/api/auth/logout",
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setError(
        "خروج از حساب انجام نشد. دوباره تلاش کنید."
      );
      setLoggingOut(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 sm:py-10"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-bold tracking-wide text-cyan-600">
              WATER POLO
            </p>

            <h1 className="text-xl font-black tracking-tight sm:text-2xl">
              پنل مدیریت
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              مدیریت کاربران و درخواست‌های عضویت
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              بازگشت به سایت
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loggingOut
                ? "در حال خروج..."
                : "خروج از حساب"}
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              کل کاربران
            </p>

            <p className="mt-2 text-3xl font-bold">
              {users.length}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              درخواست‌های در انتظار
            </p>

            <p className="mt-2 text-3xl font-bold">
              {pendingUsers.length}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              بازیکنان تأییدشده
            </p>

            <p className="mt-2 text-3xl font-bold">
              {players.length}
            </p>
          </div>
        </div>

        {/* Pending Requests */}
        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold">
              درخواست‌های بازیکن شدن
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              درخواست‌هایی که نیاز به بررسی دارند
            </p>
          </div>

          {pendingUsers.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
              در حال حاضر درخواست جدیدی وجود ندارد.
            </div>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-5 rounded-2xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {user.username}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      disabled={
                        loadingUser === user.id
                      }
                      onClick={() =>
                        handleRequest(
                          user.id,
                          "APPROVE"
                        )
                      }
                      className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      تأیید
                    </button>

                    <button
                      type="button"
                      disabled={
                        loadingUser === user.id
                      }
                      onClick={() =>
                        handleRequest(
                          user.id,
                          "REJECT"
                        )
                      }
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      رد درخواست
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Users */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold">
              کاربران
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              تمام حساب‌های ثبت‌شده در سایت
            </p>
          </div>

          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold">
                    {user.username}
                  </p>

                  <p className="text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-slate-100 px-3 py-1.5">
                    {user.role}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5">
                    {user.playerApplicationStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}