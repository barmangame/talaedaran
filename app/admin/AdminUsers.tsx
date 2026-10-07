"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PlayerStats = {
  matches: number;
  goals: number;
  assists: number;
  saves: number;
  steals: number;
};

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
    bio: string | null;
    imageUrl: string | null;
    stats: PlayerStats | null;
  } | null;
};

type Props = {
  users: User[];
};

const positionLabels: Record<string, string> = {
  GOALKEEPER: "دروازه‌بان",
  DEFENDER: "مدافع",
  ATTACKER: "مهاجم",
};

const roleLabels: Record<string, string> = {
  USER: "کاربر",
  PLAYER: "بازیکن",
  ADMIN: "مدیر",
};

export default function AdminUsers({ users }: Props) {
  const router = useRouter();

  const [loadingUser, setLoadingUser] =
    useState<string | null>(null);

  const [editingPlayer, setEditingPlayer] =
    useState<User["player"] | null>(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const pendingUsers = users.filter(
    (user) =>
      user.playerApplicationStatus === "PENDING"
  );

  const players = users.filter(
    (user) => user.role === "PLAYER" && user.player
  );

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.replace("/login");
      router.refresh();
    } catch {
      setError("خروج از حساب انجام نشد.");
    }
  }

  async function handleRequest(
    userId: string,
    action: "APPROVE" | "REJECT"
  ) {
    setError("");
    setMessage("");
    setLoadingUser(userId);

    try {
      const response = await fetch(
        "/api/admin/player-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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

      setMessage(
        data.message ||
          "عملیات با موفقیت انجام شد."
      );

      router.refresh();
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoadingUser(null);
    }
  }

  async function savePlayer(
    player: NonNullable<User["player"]>
  ) {
    setError("");
    setMessage("");
    setLoadingUser(player.id);

    try {
      const response = await fetch(
        "/api/admin/players",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            playerId: player.id,
            name: player.name,
            capNumber: player.capNumber,
            position: player.position,
            bio: player.bio,
            imageUrl: player.imageUrl,

            matches:
              player.stats?.matches ?? 0,

            goals:
              player.stats?.goals ?? 0,

            assists:
              player.stats?.assists ?? 0,

            saves:
              player.stats?.saves ?? 0,

            steals:
              player.stats?.steals ?? 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "ذخیره اطلاعات انجام نشد."
        );
        return;
      }

      setMessage(
        "اطلاعات بازیکن با موفقیت ذخیره شد."
      );

      setEditingPlayer(null);
      router.refresh();
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoadingUser(null);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7fafb] text-slate-950"
    >
      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black tracking-tight text-white">
              BB
            </div>

            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] text-cyan-600">
                ADMIN CONTROL
              </p>

              <p className="font-black">
                WATER<span className="text-cyan-500">.</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
            >
              <span>بازگشت به سایت</span>
              <span className="transition-transform group-hover:-translate-x-1">
                →
              </span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:border-red-200 hover:bg-red-100"
            >
              <span>خروج از حساب</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        {/* HERO */}

        <section className="mb-8 overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl shadow-slate-200 sm:p-10">
          <div className="relative">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-300">
                مدیریت کامل تیم
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                مرکز کنترل
                <br />
                طلایه‌داران
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                مدیریت کاربران، بازیکنان، شماره کلاه‌ها،
                پست‌ها و آمار تیم از یک مکان.
              </p>
            </div>

            <div className="absolute -left-20 -top-32 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -bottom-40 right-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          </div>
        </section>

        {/* ALERTS */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
            {message}
          </div>
        )}

        {/* QUICK STATS */}

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="کل کاربران"
            value={users.length}
            icon="01"
          />

          <StatCard
            label="بازیکنان تیم"
            value={players.length}
            icon="02"
          />

          <StatCard
            label="درخواست‌های جدید"
            value={pendingUsers.length}
            icon="03"
            highlight
          />

          <StatCard
            label="مدیران"
            value={
              users.filter(
                (user) => user.role === "ADMIN"
              ).length
            }
            icon="04"
          />
        </section>

        {/* MANAGEMENT GRID */}

        <section className="mb-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <ControlCard
            icon="👥"
            title="کاربران"
            text="مدیریت حساب‌های سایت"
          />

          <ControlCard
            icon="🏊"
            title="بازیکنان"
            text="مدیریت اعضای تیم"
          />

          <ControlCard
            icon="🏆"
            title="مسابقات"
            text="مدیریت بازی‌ها"
            disabled
          />

          <ControlCard
            icon="📰"
            title="پست‌ها"
            text="مدیریت اخبار و محتوا"
            disabled
          />
        </section>

        {/* PLAYER REQUESTS */}

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader
            title="درخواست‌های بازیکن شدن"
            description="درخواست‌هایی که منتظر بررسی مدیر هستند."
            badge={
              pendingUsers.length > 0
                ? `${pendingUsers.length} درخواست`
                : undefined
            }
          />

          {pendingUsers.length === 0 ? (
            <EmptyState text="در حال حاضر درخواست جدیدی وجود ندارد." />
          ) : (
            <div className="space-y-3">
              {pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:border-cyan-200 hover:bg-cyan-50/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white">
                        {user.username
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-black">
                          {user.username}
                        </p>

                        <p className="text-sm text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                      درخواست عضویت در تیم
                    </p>
                  </div>

                  <div className="flex gap-2">
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
                      className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:opacity-50"
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
                      className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    >
                      رد
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* PLAYERS */}

        <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader
            title="مدیریت بازیکنان"
            description="اطلاعات بازیکنان، پست، شماره کلاه و آمار."
            badge={`${players.length} بازیکن`}
          />

          {players.length === 0 ? (
            <EmptyState text="هنوز بازیکن تأییدشده‌ای وجود ندارد." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {players.map((user) => {
                const player = user.player!;

                return (
                  <div
                    key={player.id}
                    className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white">
                          {String(
                            player.capNumber
                          ).padStart(2, "0")}
                        </div>

                        <div>
                          <p className="font-black">
                            {player.name}
                          </p>

                          <p className="mt-1 text-xs text-cyan-600">
                            {positionLabels[
                              player.position
                            ] ||
                              player.position}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setEditingPlayer({
                            ...player,
                            stats:
                              player.stats
                                ? {
                                    ...player.stats,
                                  }
                                : {
                                    matches: 0,
                                    goals: 0,
                                    assists: 0,
                                    saves: 0,
                                    steals: 0,
                                  },
                          })
                        }
                        className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
                      >
                        ویرایش
                      </button>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                      <InfoPill
                        label="کلاه"
                        value={String(
                          player.capNumber
                        )}
                      />

                      <InfoPill
                        label="پست"
                        value={
                          positionLabels[
                            player.position
                          ] ||
                          player.position
                        }
                      />

                      <InfoPill
                        label="بازی"
                        value={String(
                          player.stats
                            ?.matches ?? 0
                        )}
                      />

                      <InfoPill
                        label="گل"
                        value={String(
                          player.stats
                            ?.goals ?? 0
                        )}
                      />
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                      حساب: {user.username}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ALL USERS */}

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader
            title="تمام کاربران"
            description="تمام حساب‌های ثبت‌شده در سایت."
          />

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            {users.map((user, index) => (
              <div
                key={user.id}
                className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between ${
                  index !== users.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div>
                  <p className="font-bold">
                    {user.username}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span
                    className={`rounded-full px-3 py-1.5 font-bold ${
                      user.role === "ADMIN"
                        ? "bg-slate-950 text-white"
                        : user.role === "PLAYER"
                          ? "bg-cyan-50 text-cyan-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {roleLabels[user.role] ||
                      user.role}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">
                    {user.playerApplicationStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}

        <footer className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-center sm:flex-row sm:text-right">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-[10px] font-black text-white">
              BB
            </div>

            <div>
              <p className="text-sm font-black">
                B&B STUDIO
              </p>

              <p className="text-xs text-slate-400">
                کاری از گروه توسعه B&B STUDIO
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="text-sm font-bold text-cyan-600 hover:text-cyan-700"
          >
            رفتن به سایت ←
          </Link>
        </footer>
      </div>

      {/* EDIT MODAL */}

      {editingPlayer && (
        <EditPlayerModal
          player={editingPlayer}
          saving={loadingUser === editingPlayer.id}
          onClose={() => setEditingPlayer(null)}
          onSave={savePlayer}
          onChange={setEditingPlayer}
        />
      )}
    </main>
  );
}

/* -------------------------------- */
/* COMPONENTS */
/* -------------------------------- */

function StatCard({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: number;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.5rem] border p-6 ${
        highlight
          ? "border-cyan-200 bg-cyan-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-black tracking-widest text-slate-400">
          {icon}
        </span>

        <span className="h-2 w-2 rounded-full bg-cyan-400" />
      </div>

      <p className="mt-6 text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-3xl font-black">
        {value}
      </p>
    </div>
  );
}

function ControlCard({
  icon,
  title,
  text,
  disabled = false,
}: {
  icon: string;
  title: string;
  text: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.5rem] border bg-white p-5 transition ${
        disabled
          ? "border-slate-200 opacity-60"
          : "border-slate-200 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100/40"
      }`}
    >
      <div className="mb-4 text-2xl">
        {icon}
      </div>

      <p className="font-black">{title}</p>

      <p className="mt-1 text-xs leading-6 text-slate-500">
        {text}
      </p>

      {disabled && (
        <span className="mt-3 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-400">
          به‌زودی
        </span>
      )}
    </div>
  );
}

function SectionHeader({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-xl font-black">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      {badge && (
        <span className="w-fit rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-bold text-cyan-700">
          {badge}
        </span>
      )}
    </div>
  );
}

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 px-5 py-10 text-center text-sm text-slate-400">
      {text}
    </div>
  );
}

function InfoPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2">
      <span className="text-slate-400">
        {label}
      </span>

      <span className="mr-1 font-bold text-slate-700">
        {value}
      </span>
    </div>
  );
}

/* -------------------------------- */
/* EDIT PLAYER MODAL */
/* -------------------------------- */

function EditPlayerModal({
  player,
  saving,
  onClose,
  onSave,
  onChange,
}: {
  player: NonNullable<User["player"]>;
  saving: boolean;
  onClose: () => void;
  onSave: (
    player: NonNullable<User["player"]>
  ) => void;
  onChange: (
    player: NonNullable<User["player"]>
  ) => void;
}) {
  function update(
    changes: Partial<
      NonNullable<User["player"]>
    >
  ) {
    onChange({
      ...player,
      ...changes,
    });
  }

  function updateStats(
    changes: Partial<PlayerStats>
  ) {
    onChange({
      ...player,
      stats: {
        matches:
          player.stats?.matches ?? 0,
        goals:
          player.stats?.goals ?? 0,
        assists:
          player.stats?.assists ?? 0,
        saves:
          player.stats?.saves ?? 0,
        steals:
          player.stats?.steals ?? 0,
        ...changes,
      },
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-2xl rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <p className="text-xs font-bold tracking-widest text-cyan-600">
              PLAYER CONTROL
            </p>

            <h2 className="mt-1 text-xl font-black">
              ویرایش بازیکن
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          >
            ×
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="نام بازیکن"
              value={player.name}
              onChange={(value) =>
                update({ name: value })
              }
            />

            <Field
              label="شماره کلاه"
              type="number"
              value={String(player.capNumber)}
              onChange={(value) =>
                update({
                  capNumber: Number(value),
                })
              }
            />

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">
                پست بازیکن
              </span>

              <select
                value={player.position}
                onChange={(event) =>
                  update({
                    position: event.target
                      .value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50"
              >
                <option value="GOALKEEPER">
                  دروازه‌بان
                </option>

                <option value="DEFENDER">
                  مدافع
                </option>

                <option value="ATTACKER">
                  مهاجم
                </option>
              </select>
            </label>

            <Field
              label="آدرس تصویر"
              value={player.imageUrl || ""}
              onChange={(value) =>
                update({
                  imageUrl: value,
                })
              }
              placeholder="https://..."
            />
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold text-slate-700">
              بیوگرافی
            </span>

            <textarea
              value={player.bio || ""}
              onChange={(event) =>
                update({
                  bio: event.target.value,
                })
              }
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50"
              placeholder="درباره بازیکن..."
            />
          </label>

          <div className="mt-8">
            <h3 className="mb-4 font-black">
              آمار بازیکن
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <NumberField
                label="بازی"
                value={
                  player.stats?.matches ?? 0
                }
                onChange={(value) =>
                  updateStats({
                    matches: value,
                  })
                }
              />

              <NumberField
                label="گل"
                value={
                  player.stats?.goals ?? 0
                }
                onChange={(value) =>
                  updateStats({
                    goals: value,
                  })
                }
              />

              <NumberField
                label="پاس گل"
                value={
                  player.stats?.assists ?? 0
                }
                onChange={(value) =>
                  updateStats({
                    assists: value,
                  })
                }
              />

              <NumberField
                label="سیو"
                value={
                  player.stats?.saves ?? 0
                }
                onChange={(value) =>
                  updateStats({
                    saves: value,
                  })
                }
              />

              <NumberField
                label="توپ‌گیری"
                value={
                  player.stats?.steals ?? 0
                }
                onChange={(value) =>
                  updateStats({
                    steals: value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 p-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            انصراف
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => onSave(player)}
            className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "در حال ذخیره..."
              : "ذخیره تغییرات"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-500">
        {label}
      </span>

      <input
        type="number"
        min="0"
        value={value}
        onChange={(event) =>
          onChange(
            Math.max(
              0,
              Number(event.target.value)
            )
          )
        }
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50"
      />
    </label>
  );
}