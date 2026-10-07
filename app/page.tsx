import Link from "next/link";
import { getCurrentUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

const positions = [
  {
    number: "01",
    title: "دروازه‌بان",
    english: "GOALKEEPER",
    description: "آخرین خط دفاعی و شروع‌کننده بسیاری از حملات.",
  },
  {
    number: "02",
    title: "مدافع",
    english: "DEFENDER",
    description: "کنترل فضا، بازیکن حریف و ساختار دفاعی.",
  },
  {
    number: "03",
    title: "مهاجم",
    english: "ATTACKER",
    description: "ساخت موقعیت و تبدیل فرصت‌ها به گل.",
  },
];

const gameSteps = [
  { number: "01", title: "SWIM", description: "حرکت در آب" },
  { number: "02", title: "PASS", description: "ساختن بازی" },
  { number: "03", title: "MOVE", description: "پیدا کردن فضا" },
  { number: "04", title: "SCORE", description: "تمام کردن حمله" },
];

const positionLabels: Record<string, string> = {
  GOALKEEPER: "دروازه‌بان",
  DEFENDER: "مدافع",
  ATTACKER: "مهاجم",
};

export default async function Home() {
  const user = await getCurrentUser();

  const players = await prisma.playerProfile.findMany({
    where: {
      user: {
        role: "PLAYER",
        playerApplicationStatus: "APPROVED",
      },
    },
    select: {
      id: true,
      name: true,
      capNumber: true,
      position: true,
      imageUrl: true,
    },
    orderBy: {
      capNumber: "asc",
    },
  });

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-white text-slate-950"
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 top-24 h-72 w-72 rounded-full bg-cyan-100/40 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -left-32 top-[45%] h-72 w-72 rounded-full bg-sky-100/30 blur-3xl sm:h-96 sm:w-96" />
      </div>

      {/* ================= NAVBAR ================= */}
      <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-slate-200/70 bg-white/85 px-3 py-3 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-black tracking-[-0.06em] sm:text-xl">
              WATER<span className="text-cyan-500">.</span>
            </span>
            <span className="hidden h-5 w-px bg-slate-200 sm:block" />
            <span className="hidden text-xs font-bold text-slate-400 sm:block">
              طلایه‌داران
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 text-[13px] font-bold text-slate-500 lg:flex">
            <Link href="#learn" className="transition hover:text-cyan-500">
              واترپلو
            </Link>
            <Link href="#game" className="transition hover:text-cyan-500">
              بازی
            </Link>
            <Link href="#positions" className="transition hover:text-cyan-500">
              پست‌ها
            </Link>
            <Link href="#players" className="transition hover:text-cyan-500">
              بازیکنان
            </Link>
            <Link href="#matches" className="transition hover:text-cyan-500">
              مسابقات
            </Link>
            <Link href="#team" className="transition hover:text-cyan-500">
              تیم
            </Link>
          </div>

          {/* Desktop Account */}
          <div className="hidden items-center gap-2 sm:flex">
            {user ? (
              <>
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-cyan-500"
                  >
                    پنل مدیریت
                  </Link>
                )}
                {user.role === "PLAYER" && (
                  <Link
                    href="/dashboard"
                    className="rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-600"
                  >
                    داشبورد
                  </Link>
                )}
                {user.role === "USER" && (
                  <Link
                    href="/dashboard"
                    className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-cyan-500"
                  >
                    حساب من
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-xs font-black text-slate-600 transition hover:text-cyan-500"
                >
                  ورود
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-cyan-500"
                >
                  عضویت
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <details className="relative sm:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-cyan-200 hover:text-cyan-500 [&::-webkit-details-marker]:hidden">
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-4 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </div>
            </summary>

            <div className="absolute left-0 top-14 w-[calc(100vw-24px)] max-w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10">
              <div className="flex flex-col">
                {[
                  { href: "#learn", label: "واترپلو" },
                  { href: "#game", label: "بازی" },
                  { href: "#positions", label: "پست‌ها" },
                  { href: "#players", label: "بازیکنان" },
                  { href: "#matches", label: "مسابقات" },
                  { href: "#team", label: "تیم" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-4 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-cyan-50 hover:text-cyan-500"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="my-1 border-t border-slate-100" />

                {user ? (
                  <>
                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        className="m-1 rounded-xl bg-slate-950 px-4 py-3 text-center text-xs font-black text-white"
                      >
                        پنل مدیریت
                      </Link>
                    )}
                    <Link
                      href="/dashboard"
                      className="m-1 rounded-xl bg-cyan-500 px-4 py-3 text-center text-xs font-black text-white"
                    >
                      داشبورد من
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="m-1 rounded-xl px-4 py-3 text-center text-xs font-black text-slate-700"
                    >
                      ورود
                    </Link>
                    <Link
                      href="/register"
                      className="m-1 rounded-xl bg-slate-950 px-4 py-3 text-center text-xs font-black text-white"
                    >
                      ساخت حساب
                    </Link>
                  </>
                )}
              </div>
            </div>
          </details>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[18%] h-[420px] w-[420px] rounded-full bg-cyan-100/60 blur-[110px]" />

          <div className="absolute right-[-8%] top-[12%] h-[520px] w-[520px] rounded-full bg-sky-100/70 blur-[120px]" />

          <div className="absolute bottom-[-15%] left-[35%] h-[360px] w-[520px] rounded-full bg-cyan-50 blur-[100px]" />

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_.85fr]">
          {/* Main content */}
          <div className="max-w-5xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-12 bg-cyan-500" />

              <span className="text-[11px] font-black tracking-[0.32em] text-cyan-500">
                WATER POLO
              </span>

              <span className="h-px w-8 bg-slate-200" />
            </div>

            <div className="relative">
              <h1 className="text-[clamp(4.5rem,11vw,9.5rem)] font-black leading-[0.78] tracking-[-0.09em] text-slate-950">
                بیشتر از
                <br />
                <span className="relative inline-block text-cyan-500">
                  یک ورزش
                  <span className="absolute -bottom-2 left-1 h-1 w-20 rounded-full bg-cyan-500/20 sm:-bottom-3 sm:w-28" />
                </span>
                <span className="text-slate-950">.</span>
              </h1>

              <div className="absolute -right-2 top-0 hidden text-[10px] font-black tracking-[0.3em] text-slate-300 lg:block">
                01 / 04
              </div>
            </div>

            <p className="mt-10 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
              سرعت، قدرت، استراتژی و کار تیمی؛
              <br className="hidden sm:block" />
              همه در چند متر آب.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="#learn"
                className="group inline-flex items-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-bold text-white shadow-[0_15px_40px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-cyan-500 hover:shadow-[0_15px_40px_rgba(6,182,212,0.2)]"
              >
                <span>واترپلو را بشناس</span>

                <span className="mr-3 transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
              </Link>

              <Link
                href="#players"
                className="group inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-7 py-3.5 text-sm font-bold text-slate-700 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:text-cyan-500"
              >
                <span>بازیکنان تیم</span>

                <span className="mr-3 transition-transform duration-300 group-hover:-translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* B&B STUDIO signature */}
            <div className="mt-16 flex items-center gap-4">
              <div className="h-px w-12 bg-slate-200" />

              <div>
                <div className="text-[9px] font-black tracking-[0.32em] text-slate-300">
                  DESIGNED & DEVELOPED BY
                </div>

                <div className="mt-1 text-xs font-black tracking-[0.18em] text-slate-950">
                  B&B <span className="text-cyan-500">STUDIO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual side */}
          <div className="relative hidden min-h-[560px] items-center justify-center lg:flex">
            {/* Main rings */}
            <div className="absolute h-[440px] w-[440px] rounded-full border border-slate-200/80" />

            <div className="absolute h-[350px] w-[350px] rounded-full border border-slate-200/70" />

            <div className="absolute h-[260px] w-[260px] rounded-full border border-cyan-200/80" />

            <div className="absolute h-[170px] w-[170px] rounded-full border border-cyan-100" />

            {/* Center */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-200 bg-white/70 shadow-[0_20px_70px_rgba(6,182,212,0.15)] backdrop-blur-xl">
              <div className="h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_0_14px_rgba(6,182,212,0.08)]" />

              <div className="absolute inset-4 rounded-full border border-cyan-100" />
            </div>

            {/* Top stat */}
            <div className="absolute right-[5%] top-[12%] text-right">
              <div className="text-5xl font-black tracking-[-0.07em] text-slate-950">
                7 + 6
              </div>

              <div className="mt-2 text-[9px] font-black tracking-[0.3em] text-slate-400">
                PLAYERS IN THE WATER
              </div>
            </div>

            {/* Bottom stat */}
            <div className="absolute bottom-[16%] left-[5%]">
              <div className="text-6xl font-black tracking-[-0.08em] text-cyan-500">
                4
              </div>

              <div className="mt-1 text-[9px] font-black tracking-[0.3em] text-slate-400">
                QUARTERS
              </div>
            </div>

            {/* Small floating labels */}
            <div className="absolute left-[18%] top-[24%] rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-[9px] font-black tracking-[0.22em] text-slate-400 backdrop-blur-md">
              TEAMWORK
            </div>

            <div className="absolute bottom-[31%] right-[7%] rounded-full border border-cyan-100 bg-cyan-50/60 px-4 py-2 text-[9px] font-black tracking-[0.22em] text-cyan-500 backdrop-blur-md">
              STRATEGY
            </div>

            <div className="absolute bottom-[5%] right-[18%] text-[9px] font-black tracking-[0.35em] text-slate-300">
              DIVE INTO THE GAME
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[9px] font-black tracking-[0.3em] text-slate-300 md:flex">
          <span>SCROLL</span>
          <span className="h-8 w-px bg-slate-200" />
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section
        id="learn"
        className="border-y border-slate-100 bg-slate-50/70 px-5 py-20 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
            <div>
              <span className="text-[9px] font-black tracking-[0.3em] text-cyan-500 sm:text-[10px]">
                THE SPORT
              </span>
              <h2 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:mt-4 sm:text-6xl">
                بازی در آب،
                <br />
                با قوانین خودش.
              </h2>
            </div>

            <div className="text-sm leading-8 text-slate-500 sm:text-lg sm:leading-9">
              <p>
                واترپلو ترکیبی از شنا، پاس‌کاری، دفاع، حمله و تصمیم‌گیری سریع
                است.
              </p>
              <p className="mt-4 sm:mt-6">
                در طلایه‌داران، هدف فقط بازی کردن نیست؛ ساختن یک تیم، شناختن
                بازی و رشد کردن در کنار یکدیگر است.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GAME ================= */}
      <section id="game" className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
            <div>
              <span className="text-[9px] font-black tracking-[0.3em] text-cyan-500 sm:text-[10px]">
                THE GAME
              </span>
              <h2 className="mt-4 text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl">
                Swim.
                <br />
                Pass.
                <br />
                Move.
                <br />
                <span className="text-cyan-500">Score.</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
                چهار مرحله ساده که درون هرکدام، صدها تصمیم کوچک شکل می‌گیرد.
              </p>
            </div>

            <div className="border-t border-slate-200">
              {gameSteps.map((step) => (
                <div
                  key={step.number}
                  className="grid grid-cols-[38px_1fr_20px] items-center gap-3 border-b border-slate-200 py-5 sm:grid-cols-[50px_1fr_30px] sm:gap-5 sm:py-7"
                >
                  <span className="text-[10px] font-black text-slate-300 sm:text-xs">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-black tracking-tight sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
                      {step.description}
                    </p>
                  </div>
                  <span className="text-slate-300">←</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= POSITIONS ================= */}
      <section
        id="positions"
        className="bg-slate-50 px-5 py-20 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div>
            <span className="text-[9px] font-black tracking-[0.3em] text-cyan-500 sm:text-[10px]">
              POSITIONS
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              هر بازیکن،
              <br />
              یک نقش.
            </h2>
          </div>

          <div className="-mx-5 mt-9 flex snap-x gap-3 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0">
            {positions.map((position) => (
              <article
                key={position.number}
                className="group relative min-w-[82vw] snap-center overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm sm:min-w-0 sm:rounded-[2rem] sm:p-7"
              >
                <div className="absolute -left-5 -top-8 text-[150px] font-black leading-none tracking-[-0.15em] text-slate-50">
                  {position.number}
                </div>

                <div className="relative flex min-h-[280px] flex-col justify-between sm:min-h-[330px]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-cyan-500">
                      {position.number}
                    </span>
                    <span className="text-[8px] font-black tracking-[0.2em] text-slate-300">
                      {position.english}
                    </span>
                  </div>

                  <div className="mt-16">
                    <h3 className="text-2xl font-black sm:text-3xl">
                      {position.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-7 text-slate-500">
                      {position.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <span className="text-[8px] font-black tracking-[0.2em] text-slate-300">
                      WATER POLO ROLE
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-2 text-center text-[9px] font-bold text-slate-300 sm:hidden">
            ← برای دیدن پست بعدی بکشید →
          </div>
        </div>
      </section>

      {/* ================= PLAYERS ================= */}
      <section id="players" className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-[9px] font-black tracking-[0.3em] text-cyan-500 sm:text-[10px]">
                PLAYERS
              </span>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                بازیکنان
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                بازیکنانی که بخشی از این بازی، این تیم و این جامعه هستند.
              </p>
            </div>

            <div className="text-sm font-bold text-slate-300">
              {String(players.length).padStart(2, "0")} PLAYERS
            </div>
          </div>

          {players.length === 0 ? (
            <div className="mt-14 border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-black text-slate-200 shadow-sm">
                +
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-900">
                هنوز بازیکنی ثبت نشده است
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-400">
                به‌زودی پروفایل بازیکنان تأییدشده تیم در این بخش نمایش داده
                می‌شود.
              </p>
            </div>
          ) : (
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {players.map((player) => {
                const number = String(player.capNumber).padStart(2, "0");

                return (
                  <article
                    key={player.id}
                    className="group relative min-h-[430px] overflow-hidden rounded-[1.7rem] border border-slate-200 bg-slate-50 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_25px_70px_rgba(6,182,212,0.12)]"
                  >
                    <div className="pointer-events-none absolute -right-5 -top-8 text-[180px] font-black leading-none tracking-[-0.12em] text-white transition-all duration-500 group-hover:text-cyan-50">
                      {number}
                    </div>

                    <div className="relative mx-5 mt-5 h-64 overflow-hidden rounded-[1.3rem] bg-slate-200">
                      {player.imageUrl ? (
                        <img
                          src={player.imageUrl}
                          alt={player.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-white/10" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/60 bg-white/70 text-3xl font-black text-slate-300 backdrop-blur-sm">
                              {number}
                            </div>
                          </div>
                        </>
                      )}

                      <div className="absolute bottom-4 left-4 text-[10px] font-black tracking-[0.25em] text-white/80">
                        PLAYER
                      </div>
                    </div>

                    <div className="relative p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[10px] font-black tracking-[0.25em] text-cyan-500">
                            CAP {number}
                          </div>
                          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                            {player.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-400">
                            {positionLabels[player.position] || "بازیکن"}
                          </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-300 transition-all duration-300 group-hover:border-cyan-300 group-hover:text-cyan-500">
                          ↗
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-slate-300">
                          PLAYER PROFILE
                        </span>
                        <span className="text-xs font-bold text-cyan-500">
                          →
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 text-sm sm:flex-row sm:items-center">
            <p className="text-slate-400">
              پروفایل بازیکنان تأییدشده به‌صورت خودکار در این بخش نمایش داده
              می‌شود.
            </p>
            <Link
              href="#players"
              className="w-fit font-black text-slate-950 transition hover:text-cyan-500"
            >
              بازیکنان تیم →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= MATCHES ================= */}
      <section id="matches" className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-slate-950 px-5 py-9 text-white shadow-2xl shadow-slate-950/10 sm:rounded-[2.5rem] sm:px-12 sm:py-16">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-[9px] font-black tracking-[0.3em] text-cyan-400 sm:text-[10px]">
                  MATCH CENTER
                </span>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                  مسابقه بعدی
                </h2>
              </div>
              <span className="w-fit rounded-full border border-white/10 px-3 py-2 text-[8px] font-black tracking-[0.2em] text-white/40">
                COMING SOON
              </span>
            </div>

            <div className="mt-9 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:mt-12 sm:rounded-none sm:border-x-0 sm:bg-transparent sm:p-0">
              <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-3 sm:gap-8">
                <div className="text-center sm:text-right">
                  <div className="text-[8px] font-black tracking-[0.25em] text-white/30">
                    HOME
                  </div>
                  <div className="mt-2 text-xl font-black sm:text-2xl">
                    طلایه‌داران
                  </div>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm font-black text-cyan-400">
                    VS
                  </div>
                  <div className="mt-3 text-[11px] text-white/30">
                    مسابقه بعدی به‌زودی
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <div className="text-[8px] font-black tracking-[0.25em] text-white/30">
                    AWAY
                  </div>
                  <div className="mt-2 text-xl font-black sm:text-2xl">
                    حریف آینده
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section id="team" className="px-5 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-100 bg-cyan-50/60 px-6 py-12 sm:rounded-[2.5rem] sm:px-14 sm:py-20">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/80 blur-3xl" />

            <div className="relative max-w-3xl">
              <span className="text-[9px] font-black tracking-[0.3em] text-cyan-600 sm:text-[10px]">
                OUR TEAM
              </span>
              <h2 className="mt-4 text-5xl font-black tracking-[-0.08em] sm:text-8xl">
                طلایه‌داران
                <span className="text-cyan-500">.</span>
              </h2>
              <p className="mt-6 text-sm leading-8 text-slate-500 sm:mt-7 sm:text-lg sm:leading-9">
                یک تیم، یک مسیر و مجموعه‌ای از آدم‌هایی که برای بهتر شدن کنار
                هم قرار گرفته‌اند.
              </p>
              <Link
                href="#players"
                className="mt-7 flex h-14 items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 text-sm font-black text-white transition active:scale-[0.98] sm:mt-9 sm:inline-flex sm:h-auto sm:py-4"
              >
                مشاهده بازیکنان
                <span>←</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section
        id="gallery"
        className="bg-slate-50 px-5 py-20 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <span className="text-[9px] font-black tracking-[0.3em] text-cyan-500 sm:text-[10px]">
            GALLERY
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
            لحظه‌های بازی
          </h2>

          <div className="mt-9 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
            <div className="relative h-56 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cyan-100 to-slate-200 sm:h-80 sm:rounded-[2rem]">
              <div className="absolute bottom-5 right-5 text-[9px] font-black text-slate-600">
                WATER / 01
              </div>
            </div>
            <div className="relative h-56 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-cyan-50 sm:h-80 sm:translate-y-8 sm:rounded-[2rem]">
              <div className="absolute bottom-5 right-5 text-[9px] font-black text-slate-600">
                TEAM / 02
              </div>
            </div>
            <div className="relative h-56 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-200 to-cyan-100 sm:h-80 sm:rounded-[2rem]">
              <div className="absolute bottom-5 right-5 text-[9px] font-black text-slate-600">
                GAME / 03
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white px-5 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-9 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <Link
                href="/"
                className="text-2xl font-black tracking-[-0.06em]"
              >
                WATER<span className="text-cyan-500">.</span>
              </Link>
              <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
                جامعه و وب‌سایت تیم واترپلو طلایه‌داران.
              </p>
            </div>

            <div>
              <div className="text-[9px] font-black tracking-[0.25em] text-slate-300">
                NAVIGATION
              </div>
              <div className="mt-4 flex flex-col gap-3 text-sm font-bold text-slate-500">
                <Link href="#learn" className="hover:text-cyan-500">
                  واترپلو
                </Link>
                <Link href="#players" className="hover:text-cyan-500">
                  بازیکنان
                </Link>
                <Link href="#matches" className="hover:text-cyan-500">
                  مسابقات
                </Link>
              </div>
            </div>

            <div>
              <div className="text-[9px] font-black tracking-[0.25em] text-slate-300">
                DEVELOPED BY
              </div>
              <div className="mt-4">
                <div className="text-lg font-black tracking-[-0.04em]">
                  B&B STUDIO
                </div>
                <p className="mt-2 text-xs leading-6 text-slate-400">
                  کاری از گروه توسعه B&B STUDIO
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-[9px] font-bold text-slate-300 sm:flex-row sm:items-center sm:justify-between">
            <span>طلایه‌داران × WATER POLO</span>
            <span>© 2026 B&B STUDIO</span>
          </div>
        </div>
      </footer>
    </main>
  );
}