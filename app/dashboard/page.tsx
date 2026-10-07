"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PlayerPosition =
  | "GOALKEEPER"
  | "DEFENDER"
  | "ATTACKER";

type PlayerStats = {
  matches: number;
  goals: number;
  assists: number;
  saves: number;
  steals: number;
};

type Player = {
  id: string;
  name: string;
  capNumber: number;
  position: PlayerPosition;
  bio: string | null;
  imageUrl: string | null;
  stats?: PlayerStats | null;
};

type UserData = {
  id: string;
  username: string;
  email: string;
  role: "USER" | "PLAYER" | "ADMIN";
  playerApplicationStatus:
    | "NONE"
    | "PENDING"
    | "APPROVED"
    | "REJECTED";
  player: Player | null;
};

const positionLabels: Record<PlayerPosition, string> = {
  GOALKEEPER: "دروازه‌بان",
  DEFENDER: "مدافع",
  ATTACKER: "مهاجم",
};

const roleLabels = {
  USER: "کاربر",
  PLAYER: "بازیکن",
  ADMIN: "مدیر",
};

const statItems = [
  { key: "matches", label: "بازی", short: "M" },
  { key: "goals", label: "گل", short: "G" },
  { key: "assists", label: "پاس گل", short: "A" },
  { key: "saves", label: "سیو", short: "S" },
  { key: "steals", label: "توپ‌ربایی", short: "ST" },
] as const;

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [editing, setEditing] = useState(false);
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [capNumber, setCapNumber] = useState("");
  const [position, setPosition] =
    useState<PlayerPosition>("ATTACKER");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.authenticated) {
        router.replace("/login");
        return;
      }

      setUser(data.user);

      if (data.user.player) {
        setName(data.user.player.name);
        setCapNumber(String(data.user.player.capNumber));
        setPosition(data.user.player.position);
        setBio(data.user.player.bio || "");
        setImageUrl(data.user.player.imageUrl || "");
      }
    } catch {
      setError("دریافت اطلاعات حساب انجام نشد.");
    } finally {
      setLoadingUser(false);
    }
  }, [router]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  async function handlePlayerApplication() {
    setError("");
    setMessage("");
    setApplying(true);

    try {
      const response = await fetch("/api/player/apply", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "ثبت درخواست انجام نشد.");
        return;
      }

      setMessage(
        data.message || "درخواست شما با موفقیت ثبت شد."
      );

      await loadUser();
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setApplying(false);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");
    setSaving(true);

    try {
      const response = await fetch("/api/player/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          capNumber: Number(capNumber),
          position,
          bio,
          imageUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || "ذخیره پروفایل انجام نشد."
        );
        return;
      }

      setMessage(
        data.message || "پروفایل با موفقیت ذخیره شد."
      );

      await loadUser();
      setEditing(false);
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        setError("خروج از حساب انجام نشد.");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    }
  }

  function startEditing() {
    setError("");
    setMessage("");
    setEditing(true);
  }

  function cancelEditing() {
    if (user?.player) {
      setName(user.player.name);
      setCapNumber(String(user.player.capNumber));
      setPosition(user.player.position);
      setBio(user.player.bio || "");
      setImageUrl(user.player.imageUrl || "");
    }

    setError("");
    setEditing(false);
  }

  const profileCompletion = useMemo(() => {
    if (!user?.player) return 0;

    const values = [
      user.player.name,
      user.player.capNumber,
      user.player.position,
      user.player.bio,
      user.player.imageUrl,
    ];

    const completed = values.filter(Boolean).length;

    return Math.round((completed / values.length) * 100);
  }, [user]);

  if (loadingUser) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-5 py-8">
          <div className="animate-pulse">
            <div className="h-14 w-full rounded-2xl bg-white" />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <div className="h-64 rounded-3xl bg-white lg:col-span-2" />
              <div className="h-64 rounded-3xl bg-white" />
            </div>

            <div className="mt-5 h-40 rounded-3xl bg-white" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const hasPlayer = Boolean(user.player);

  const stats: PlayerStats = {
    matches: user.player?.stats?.matches ?? 0,
    goals: user.player?.stats?.goals ?? 0,
    assists: user.player?.stats?.assists ?? 0,
    saves: user.player?.stats?.saves ?? 0,
    steals: user.player?.stats?.steals ?? 0,
  };

  const statusText =
    user.role === "ADMIN"
      ? "مدیر سیستم"
      : user.role === "PLAYER"
        ? "بازیکن تأییدشده"
        : user.playerApplicationStatus === "PENDING"
          ? "در انتظار بررسی"
          : user.playerApplicationStatus === "REJECTED"
            ? "درخواست رد شده"
            : "حساب فعال";

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7fafc] text-slate-950"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-sm">
              W
            </div>

            <div>
              <p className="text-[10px] font-black tracking-[0.28em] text-cyan-600">
                WATER
              </p>

              <p className="text-sm font-black">
                طلایه‌داران
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:block"
            >
              بازگشت به سایت
            </Link>

            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="hidden rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 sm:block"
              >
                پنل مدیریت
              </Link>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
              خروج
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-cyan-100/60 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-xs font-bold text-cyan-700">
                  {roleLabels[user.role]}
                </span>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                  {statusText}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                سلام، {user.username} 👋
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-500 sm:text-base">
                اینجا مرکز شخصی تو در سایت طلایه‌داران است.
                وضعیت حساب، پروفایل و اطلاعات بازیکنی خودت را
                از اینجا مدیریت کن.
              </p>
            </div>

            <div className="flex items-center gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <svg
                  className="absolute inset-0 h-20 w-20 -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-slate-200"
                  />

                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${profileCompletion}, 100`}
                    className="text-cyan-500"
                    strokeLinecap="round"
                  />
                </svg>

                <span className="text-sm font-black">
                  {profileCompletion}%
                </span>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400">
                  تکمیل پروفایل
                </p>

                <p className="mt-1 font-black text-slate-900">
                  {hasPlayer
                    ? profileCompletion === 100
                      ? "کامل شده"
                      : "در حال تکمیل"
                    : "هنوز ساخته نشده"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MESSAGES */}
        {error && (
          <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm leading-7 text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-700">
            {message}
          </div>
        )}

        {/* ACCOUNT INFO */}
        <section className="mt-5 grid gap-4 md:grid-cols-3">
          <InfoCard
            label="نام کاربری"
            value={user.username}
            icon="01"
          />

          <InfoCard
            label="ایمیل"
            value={user.email}
            icon="02"
          />

          <InfoCard
            label="وضعیت حساب"
            value={statusText}
            icon="03"
          />
        </section>

        {/* PLAYER STATS */}
        {user.role === "PLAYER" && (
          <section className="mt-5">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-black tracking-[0.2em] text-cyan-600">
                  PLAYER STATS
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  آمار بازیکن
                </h2>
              </div>

              <span className="hidden text-xs text-slate-400 sm:block">
                آمار ثبت‌شده در سیستم تیم
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {statItems.map((item) => (
                <div
                  key={item.key}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-300">
                      {item.short}
                    </span>

                    <div className="h-2 w-2 rounded-full bg-cyan-500 opacity-60 transition group-hover:opacity-100" />
                  </div>

                  <p className="mt-7 text-3xl font-black tracking-tight">
                    {stats[item.key]}
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MAIN GRID */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
          {/* PLAYER CARD */}
          {user.role === "PLAYER" && (
            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] text-cyan-600">
                      PLAYER CARD
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      کارت بازیکن
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={startEditing}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    ویرایش
                  </button>
                </div>
              </div>

              {hasPlayer ? (
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[2rem] bg-slate-100 ring-1 ring-slate-200">
                      {user.player?.imageUrl ? (
                        <img
                          src={user.player.imageUrl}
                          alt={user.player.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl font-black text-slate-300">
                          {user.player?.capNumber}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
                          #{user.player?.capNumber}
                        </span>

                        <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">
                          {user.player
                            ? positionLabels[
                                user.player.position
                              ]
                            : "-"}
                        </span>
                      </div>

                      <h3 className="mt-3 text-2xl font-black">
                        {user.player?.name}
                      </h3>

                      {user.player?.bio && (
                        <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
                          {user.player.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <Field
                      label="نام"
                      value={user.player?.name || "-"}
                    />

                    <Field
                      label="شماره کلاه"
                      value={
                        user.player
                          ? `#${user.player.capNumber}`
                          : "-"
                      }
                    />

                    <Field
                      label="پست"
                      value={
                        user.player
                          ? positionLabels[user.player.position]
                          : "-"
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="p-8">
                  <div className="rounded-3xl bg-slate-50 p-7 text-center">
                    <p className="text-lg font-black">
                      کارت بازیکن هنوز ساخته نشده
                    </p>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                      اطلاعات بازیکنی خودت را ثبت کن تا کارتت
                      در سایت نمایش داده شود.
                    </p>

                    <button
                      type="button"
                      onClick={startEditing}
                      className="mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                    >
                      ساخت کارت بازیکن
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* QUICK ACTIONS */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-black tracking-[0.2em] text-cyan-600">
              QUICK ACTIONS
            </p>

            <h2 className="mt-1 text-2xl font-black">
              دسترسی سریع
            </h2>

            <div className="mt-6 space-y-3">
              {user.role === "PLAYER" && (
                <>
                  <QuickAction
                    title="ویرایش پروفایل"
                    description="اطلاعات کارت بازیکن"
                    onClick={startEditing}
                  />

                  <Link
                    href="/#players"
                    className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-200 hover:bg-cyan-50"
                  >
                    <p className="text-sm font-black">
                      مشاهده بازیکنان
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      مشاهده کارت‌های تیم
                    </p>
                  </Link>
                </>
              )}

              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-200 hover:bg-cyan-50"
                >
                  <p className="text-sm font-black">
                    پنل مدیریت
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    مدیریت کاربران و بازیکنان
                  </p>
                </Link>
              )}

              <Link
                href="/"
                className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-200 hover:bg-cyan-50"
              >
                <p className="text-sm font-black">
                  صفحه اصلی
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  بازگشت به سایت تیم
                </p>
              </Link>
            </div>
          </section>
        </div>

        {/* USER MEMBERSHIP */}
        {user.role === "USER" && (
          <section className="mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-black tracking-[0.2em] text-cyan-600">
                TEAM MEMBERSHIP
              </p>

              <h2 className="mt-1 text-2xl font-black">
                عضویت در تیم
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                برای ساخت کارت بازیکن، ابتدا باید درخواست
                عضویت به عنوان بازیکن ارسال شود. مدیر تیم
                درخواست را بررسی می‌کند.
              </p>

              <div className="mt-6 rounded-3xl bg-slate-50 p-6">
                {user.playerApplicationStatus ===
                  "PENDING" && (
                  <StatusBox
                    title="درخواست در حال بررسی است"
                    description="درخواستت ثبت شده و منتظر بررسی مدیر تیم است."
                    type="pending"
                  />
                )}

                {user.playerApplicationStatus ===
                  "REJECTED" && (
                  <StatusBox
                    title="درخواست قبلی رد شده است"
                    description="اگر هنوز مایل به عضویت در تیم هستی، می‌توانی دوباره درخواست ارسال کنی."
                    type="rejected"
                    action={
                      <button
                        type="button"
                        onClick={handlePlayerApplication}
                        disabled={applying}
                        className="mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
                      >
                        {applying
                          ? "در حال ارسال..."
                          : "ارسال دوباره درخواست"}
                      </button>
                    }
                  />
                )}

                {user.playerApplicationStatus === "NONE" && (
                  <StatusBox
                    title="هنوز درخواست عضویت ثبت نکرده‌ای"
                    description="درخواست بازیکن شدن را ارسال کن تا مدیر تیم آن را بررسی کند."
                    type="neutral"
                    action={
                      <button
                        type="button"
                        onClick={handlePlayerApplication}
                        disabled={applying}
                        className="mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
                      >
                        {applying
                          ? "در حال ارسال..."
                          : "درخواست بازیکن شدن"}
                      </button>
                    }
                  />
                )}

                {user.playerApplicationStatus ===
                  "APPROVED" && (
                  <StatusBox
                    title="درخواست شما تأیید شده است"
                    description="دسترسی بازیکن برای حساب شما فعال شده است."
                    type="approved"
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {/* PLAYER EDIT FORM */}
        {user.role === "PLAYER" &&
          editing && (
            <section className="mt-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-8">
                <p className="text-xs font-black tracking-[0.2em] text-cyan-600">
                  PROFILE SETTINGS
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  {hasPlayer
                    ? "ویرایش پروفایل"
                    : "ساخت پروفایل"}
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  اطلاعاتی که روی کارت بازیکن سایت نمایش داده
                  می‌شود.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-5 md:grid-cols-2"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold"
                  >
                    نام بازیکن
                  </label>

                  <input
                    id="name"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="مثلاً بارمان"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="capNumber"
                    className="mb-2 block text-sm font-bold"
                  >
                    شماره کلاه
                  </label>

                  <input
                    id="capNumber"
                    type="number"
                    min="1"
                    max="99"
                    value={capNumber}
                    onChange={(event) =>
                      setCapNumber(event.target.value)
                    }
                    placeholder="مثلاً 7"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="mb-2 block text-sm font-bold"
                  >
                    پست بازیکن
                  </label>

                  <select
                    id="position"
                    value={position}
                    onChange={(event) =>
                      setPosition(
                        event.target.value as PlayerPosition
                      )
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-50"
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
                </div>

                <div>
                  <label
                    htmlFor="imageUrl"
                    className="mb-2 block text-sm font-bold"
                  >
                    لینک عکس
                  </label>

                  <input
                    id="imageUrl"
                    type="url"
                    value={imageUrl}
                    onChange={(event) =>
                      setImageUrl(event.target.value)
                    }
                    placeholder="https://..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="bio"
                    className="mb-2 block text-sm font-bold"
                  >
                    معرفی کوتاه
                  </label>

                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(event) =>
                      setBio(event.target.value)
                    }
                    placeholder="یک معرفی کوتاه از خودت..."
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-50"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row md:col-span-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "در حال ذخیره..."
                      : hasPlayer
                        ? "ذخیره تغییرات"
                        : "ساخت پروفایل"}
                  </button>

                  {hasPlayer && (
                    <button
                      type="button"
                      onClick={cancelEditing}
                      disabled={saving}
                      className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                    >
                      انصراف
                    </button>
                  )}
                </div>
              </form>
            </section>
          )}

        {/* FOOTER */}
        <footer className="mt-10 border-t border-slate-200 py-8">
          <div className="flex flex-col gap-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-bold">
              طلایه‌داران · پنل کاربری
            </p>

            <p>
              B&B STUDIO · Team Management System
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-400">
          {label}
        </p>

        <span className="text-[10px] font-black text-cyan-500">
          {icon}
        </span>
      </div>

      <p className="mt-3 truncate text-sm font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-black text-slate-800">
        {value}
      </p>
    </div>
  );
}

function QuickAction({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-right transition hover:border-cyan-200 hover:bg-cyan-50"
    >
      <p className="text-sm font-black">{title}</p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </button>
  );
}

function StatusBox({
  title,
  description,
  type,
  action,
}: {
  title: string;
  description: string;
  type: "pending" | "rejected" | "approved" | "neutral";
  action?: React.ReactNode;
}) {
  const styles = {
    pending: "border-amber-100 bg-amber-50",
    rejected: "border-red-100 bg-red-50",
    approved: "border-emerald-100 bg-emerald-50",
    neutral: "border-slate-200 bg-white",
  };

  const titleStyles = {
    pending: "text-amber-800",
    rejected: "text-red-700",
    approved: "text-emerald-700",
    neutral: "text-slate-900",
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${styles[type]}`}
    >
      <p
        className={`font-black ${titleStyles[type]}`}
      >
        {title}
      </p>

      <p className="mt-2 text-sm leading-7 text-slate-500">
        {description}
      </p>

      {action}
    </div>
  );
}