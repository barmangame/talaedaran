
import Link from "next/link";

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

const players = [
  { number: "07", name: "بازیکن شماره ۷", position: "بازیکن" },
  { number: "10", name: "بازیکن شماره ۱۰", position: "بازیکن" },
  { number: "12", name: "بازیکن شماره ۱۲", position: "بازیکن" },
];

const gameSteps = [
  {
    number: "01",
    title: "SWIM",
    description: "حرکت در آب",
  },
  {
    number: "02",
    title: "PASS",
    description: "ساختن بازی",
  },
  {
    number: "03",
    title: "MOVE",
    description: "پیدا کردن فضا",
  },
  {
    number: "04",
    title: "SCORE",
    description: "تمام کردن حمله",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      {/* Navbar */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="text-lg font-black tracking-[-0.04em] transition hover:text-cyan-500"
          >
            WATER<span className="text-cyan-500">.</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-500 md:flex">
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

          <Link
            href="#team"
            className="text-sm font-bold text-slate-950 transition hover:text-cyan-500"
          >
            تیم ما →
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center px-6 pb-20 pt-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[8%] top-[22%] h-64 w-64 rounded-full bg-cyan-100/50 blur-3xl" />

          <div className="absolute right-[-10%] top-[30%] h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />

          <div className="absolute bottom-[8%] left-[35%] h-40 w-[35%] rounded-full bg-cyan-50 blur-3xl" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div className="max-w-4xl">
            <div className="mb-8 flex items-center gap-3 text-xs font-black tracking-[0.3em] text-cyan-500">
              <span className="h-px w-10 bg-cyan-400" />
              WATER POLO
            </div>

            <h1 className="text-[clamp(4rem,11vw,9rem)] font-black leading-[0.82] tracking-[-0.08em]">
              بیشتر از
              <br />
              <span className="text-cyan-500">یک ورزش.</span>
            </h1>

            <p className="mt-10 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
              سرعت، قدرت، استراتژی و کار تیمی؛
              <br className="hidden sm:block" />
              همه در چند متر آب.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#learn"
                className="rounded-full bg-slate-950 px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-cyan-500"
              >
                واترپلو را بشناس
                <span className="mr-2">←</span>
              </Link>

              <Link
                href="#game"
                className="rounded-full border border-slate-200 px-7 py-3.5 text-sm font-bold text-slate-700 transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:text-cyan-500"
              >
                بازی را ببین
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[500px] items-center justify-center lg:flex">
            <div className="absolute h-[380px] w-[380px] rounded-full border border-slate-200" />

            <div className="absolute h-[300px] w-[300px] rounded-full border border-slate-200/80" />

            <div className="absolute h-[220px] w-[220px] rounded-full border border-cyan-200" />

            <div className="absolute h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_0_12px_rgba(6,182,212,0.08)]" />

            <div className="absolute right-[12%] top-[20%] text-right">
              <div className="text-5xl font-black tracking-[-0.06em] text-slate-950">
                7 + 6
              </div>
              <div className="mt-1 text-[10px] font-bold tracking-[0.25em] text-slate-400">
                PLAYERS
              </div>
            </div>

            <div className="absolute bottom-[20%] left-[10%]">
              <div className="text-5xl font-black tracking-[-0.06em] text-cyan-500">
                4
              </div>
              <div className="mt-1 text-[10px] font-bold tracking-[0.25em] text-slate-400">
                QUARTERS
              </div>
            </div>

            <div className="absolute bottom-[8%] right-[18%] text-xs font-bold tracking-[0.3em] text-slate-300">
              DIVE INTO THE GAME
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section
        id="learn"
        className="border-t border-slate-100 bg-slate-50/60 px-6 py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-black tracking-[0.3em] text-cyan-500">
                THE SPORT
              </span>

              <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                بازی در آب،
                <br />
                با قوانین خودش.
              </h2>
            </div>

            <div className="max-w-xl text-lg leading-9 text-slate-500">
              <p>
                واترپلو ترکیبی از شنا، پاس‌کاری، دفاع، حمله و تصمیم‌گیری سریع
                است.
              </p>

              <p className="mt-6">
                اینجا می‌توانی با دنیای واترپلو، پست‌های بازی، بازیکنان،
                مسابقات و جامعه این ورزش آشنا شوی.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game */}
      <section id="game" className="bg-white px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-black tracking-[0.3em] text-cyan-500">
                THE GAME
              </span>

              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                Swim.
                <br />
                Pass.
                <br />
                Move.
                <br />
                <span className="text-cyan-500">Score.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-400">
              چهار حرکت ساده، اما هزاران تصمیم درون آن‌هاست.
            </p>
          </div>

          <div className="mt-20 border-t border-slate-200">
            {gameSteps.map((step) => (
              <div
                key={step.number}
                className="group grid grid-cols-[60px_1fr_auto] items-center gap-6 border-b border-slate-200 py-7 transition hover:px-4"
              >
                <span className="text-xs font-bold text-slate-300">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-2xl font-black tracking-tight transition group-hover:text-cyan-500 sm:text-4xl">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {step.description}
                  </p>
                </div>

                <span className="text-xl text-slate-300 transition group-hover:-translate-x-2 group-hover:text-cyan-500">
                  ←
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positions */}
      <section id="positions" className="bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="text-xs font-black tracking-[0.3em] text-cyan-500">
              POSITIONS
            </span>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              پست‌های بازی
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {positions.map((position) => (
              <article
                key={position.number}
                className="group border-t border-slate-300 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-bold text-cyan-500">
                    {position.number}
                  </span>

                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-300">
                    {position.english}
                  </span>
                </div>

                <div className="mt-20">
                  <h3 className="text-2xl font-black">{position.title}</h3>

                  <p className="mt-3 leading-7 text-slate-500">
                    {position.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Players */}
    <section id="players" className="bg-white px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-black tracking-[0.3em] text-cyan-500">
              PLAYERS
            </span>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
              بازیکنان
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
              بازیکنانی که بخشی از این بازی، این تیم و این جامعه هستند.
            </p>
          </div>

          <div className="text-sm font-bold text-slate-300">
            03 PLAYERS
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <article
              key={player.number}
              className="group relative min-h-[430px] overflow-hidden border border-slate-200 bg-slate-50 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_25px_70px_rgba(6,182,212,0.12)]"
            >
              {/* Background number */}
              <div className="pointer-events-none absolute -right-5 -top-8 text-[180px] font-black leading-none tracking-[-0.12em] text-white transition-all duration-500 group-hover:text-cyan-50">
                {player.number}
              </div>

              {/* Photo placeholder */}
              <div className="relative mx-5 mt-5 h-64 overflow-hidden bg-slate-200">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-white/10" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/60 bg-white/70 text-3xl font-black text-slate-300 backdrop-blur-sm">
                    {player.number}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 text-[10px] font-black tracking-[0.25em] text-white/80">
                  PLAYER
                </div>
              </div>

              {/* Player info */}
              <div className="relative p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black tracking-[0.25em] text-cyan-500">
                      CAP {player.number}
                    </div>

                    <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                      {player.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {player.position}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-300 transition-all duration-300 group-hover:border-cyan-300 group-hover:text-cyan-500">
                    ↗
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-300">
                    VIEW PROFILE
                  </span>

                  <span className="text-xs font-bold text-cyan-500">
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Future player system */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 text-sm sm:flex-row sm:items-center">
          <p className="text-slate-400">
            پروفایل هر بازیکن در آینده می‌تواند شامل آمار، عکس و اطلاعات کامل‌تر باشد.
          </p>

          <button
            type="button"
            className="w-fit font-black text-slate-950 transition hover:text-cyan-500"
          >
            همه بازیکنان →
          </button>
        </div>
      </div>
    </section>

      {/* Matches */}
      <section id="matches" className="bg-slate-950 px-6 py-28 text-white">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-black tracking-[0.3em] text-cyan-400">
            MATCH CENTER
          </span>

          <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl">
              مسابقات
            </h2>

            <span className="text-sm text-white/30">
              اطلاعات مسابقات به‌زودی
            </span>
          </div>

          <div className="mt-14 border-y border-white/10 py-10">
            <div className="grid items-center gap-8 md:grid-cols-3">
              <div>
                <div className="text-[10px] font-bold tracking-[0.25em] text-white/30">
                  HOME
                </div>

                <div className="mt-3 text-2xl font-black">
                  طلایه‌داران
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-black text-cyan-400">
                  VS
                </div>

                <div className="mt-2 text-sm text-white/30">
                  مسابقه بعدی به‌زودی
                </div>
              </div>

              <div className="md:text-right">
                <div className="text-[10px] font-bold tracking-[0.25em] text-white/30">
                  AWAY
                </div>

                <div className="mt-3 text-2xl font-black">
                  حریف آینده
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-white px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <span className="text-xs font-black tracking-[0.3em] text-cyan-500">
              OUR TEAM
            </span>

            <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] sm:text-7xl">
              طلایه‌داران
              <span className="text-cyan-500">.</span>
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-500">
              بخشی از جامعه واترپلو؛ جایی برای معرفی تیم، بازیکنان و مسیر
              مشترک ما در این ورزش.
            </p>

            <Link
              href="#players"
              className="mt-8 inline-flex items-center text-sm font-black text-slate-950 transition hover:text-cyan-500"
            >
              مشاهده بازیکنان
              <span className="mr-2">←</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-black tracking-[0.3em] text-cyan-500">
            GALLERY
          </span>

          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            لحظه‌های بازی
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="h-72 bg-slate-200 transition hover:bg-cyan-100" />

            <div className="h-72 bg-slate-100 transition hover:bg-cyan-100 md:translate-y-8" />

            <div className="h-72 bg-slate-200 transition hover:bg-cyan-100" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
          <div className="font-black text-slate-900">
            WATER<span className="text-cyan-500">.</span>
          </div>

          <div>Water Polo Community</div>

          <div>© 2026</div>
        </div>
      </footer>
    </main>
  );
}
