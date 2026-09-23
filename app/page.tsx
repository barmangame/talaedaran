import Link from "next/link";
import PoolExperience from "@/components/water-polo/PoolExperience";

const positions = [
  {
    number: "01",
    title: "دروازه‌بان",
    english: "GOALKEEPER",
    description: "آخرین خط دفاعی و شروع‌کننده حمله.",
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

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      {/* Navbar */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-xl">
          <Link href="/" className="text-lg font-black tracking-tight">
            WATER<span className="text-cyan-500">.</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-500 md:flex">
            <Link href="/" className="font-semibold text-slate-950">
              خانه
            </Link>
            <Link href="#learn" className="transition hover:text-cyan-600">
              واترپلو
            </Link>
            <Link href="#positions" className="transition hover:text-cyan-600">
              پست‌ها
            </Link>
            <Link href="#players" className="transition hover:text-cyan-600">
              بازیکنان
            </Link>
            <Link href="#matches" className="transition hover:text-cyan-600">
              مسابقات
            </Link>
            <Link href="#gallery" className="transition hover:text-cyan-600">
              گالری
            </Link>
          </div>

          <Link
            href="#team"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-600"
          >
            تیم ما
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[45%] top-10 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-cyan-200/40 blur-[140px] animate-pulse" />
          <div className="absolute -right-40 top-[35%] h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-[120px]" />

          {/* Moving light */}
          <div className="absolute left-[-20%] top-[20%] h-40 w-[70%] rotate-[-12deg] rounded-full bg-white/50 blur-3xl animate-[waterLight_9s_ease-in-out_infinite]" />
        </div>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          {/* Hero content */}
          <div className="relative z-10 text-center lg:text-right">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/70 px-4 py-2 text-xs font-semibold text-cyan-700 shadow-sm backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>
              دنیای واترپلو
            </div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              بیشتر از
              <br />
              <span className="relative inline-block text-cyan-500">
                یک ورزش.
                <span className="absolute -bottom-2 left-0 h-1 w-1/2 rounded-full bg-cyan-300/60" />
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-slate-500 sm:text-lg lg:mx-0">
              سرعت، قدرت، استراتژی و کار تیمی؛ همه در چند متر آب.
              اینجا همه‌چیز درباره واترپلو است.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="#learn"
                className="group rounded-full bg-slate-950 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:bg-cyan-600 hover:shadow-xl hover:shadow-cyan-500/20"
              >
                واترپلو را بشناس
                <span className="mr-2 inline-block transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
              </Link>

              <Link
                href="#positions"
                className="rounded-full border border-slate-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:text-cyan-600 hover:shadow-lg"
              >
                پست‌های بازی
              </Link>
            </div>

            {/* Mini stats */}
            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-7 text-right lg:mx-0 lg:justify-start">
              <div>
                <div className="text-xl font-black text-slate-900">7 + 6</div>
                <div className="mt-1 text-[10px] font-bold tracking-widest text-slate-400">
                  PLAYERS
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div>
                <div className="text-xl font-black text-slate-900">4</div>
                <div className="mt-1 text-[10px] font-bold tracking-widest text-slate-400">
                  QUARTERS
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div>
                <div className="text-xl font-black text-cyan-500">∞</div>
                <div className="mt-1 text-[10px] font-bold tracking-widest text-slate-400">
                  ENERGY
                </div>
              </div>
            </div>
          </div>

          {/* Water visual */}
          <div className="relative mx-auto h-[470px] w-full max-w-[590px]">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-[3rem] bg-cyan-400/20 blur-3xl" />

            {/* Main water card */}
            <div className="absolute inset-5 overflow-hidden rounded-[3rem] border border-white/80 bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-600 shadow-2xl shadow-cyan-500/25">
              {/* Water texture */}
              <div className="absolute inset-0 opacity-70">
                <div className="absolute -left-[20%] top-[18%] h-32 w-[140%] rotate-[-5deg] rounded-[50%] border-t-2 border-white/30 animate-[wave_7s_ease-in-out_infinite]" />
                <div className="absolute -left-[20%] top-[42%] h-36 w-[140%] rotate-[3deg] rounded-[50%] border-t-2 border-white/30 animate-[wave_9s_ease-in-out_infinite_reverse]" />
                <div className="absolute -left-[20%] top-[68%] h-32 w-[140%] rotate-[-3deg] rounded-[50%] border-t border-white/20 animate-[wave_8s_ease-in-out_infinite]" />
              </div>

              {/* Light reflection */}
              <div className="absolute -left-20 top-20 h-48 w-96 rotate-[-25deg] rounded-full bg-white/20 blur-3xl animate-[waterLight_8s_ease-in-out_infinite]" />

              {/* Bubbles */}
              <span className="absolute left-[18%] top-[25%] h-3 w-3 rounded-full border border-white/60 bg-white/20 animate-[bubble_5s_ease-in-out_infinite]" />
              <span className="absolute left-[30%] top-[60%] h-2 w-2 rounded-full border border-white/50 bg-white/20 animate-[bubble_6s_ease-in-out_infinite_1s]" />
              <span className="absolute right-[22%] top-[35%] h-4 w-4 rounded-full border border-white/50 bg-white/20 animate-[bubble_7s_ease-in-out_infinite_2s]" />
              <span className="absolute right-[32%] bottom-[22%] h-2 w-2 rounded-full border border-white/50 bg-white/20 animate-[bubble_5s_ease-in-out_infinite_1.5s]" />

              {/* Center */}
              <div className="absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/10 shadow-2xl backdrop-blur-md transition duration-700 hover:scale-105">
                <div className="absolute inset-3 rounded-full border border-white/20" />
                <div className="text-center text-white">
                  <div className="text-7xl font-black tracking-tighter">WP</div>
                  <div className="mt-1 text-[9px] font-bold tracking-[0.35em] text-white/70">
                    WATER POLO
                  </div>
                </div>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-[10px] font-bold tracking-[0.35em] text-white/60">
                  WATER POLO
                </div>
                <div className="mt-1 text-2xl font-black">
                  Dive into the game.
                </div>
              </div>

              {/* Top right label */}
              <div className="absolute right-7 top-7 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-widest text-white backdrop-blur-md">
                EST. 2026
              </div>
            </div>

            {/* Floating card — players */}
            <div className="absolute -bottom-3 -left-2 rounded-2xl border border-white bg-white/90 px-5 py-4 shadow-xl backdrop-blur-xl animate-[float_5s_ease-in-out_infinite]">
              <div className="text-[10px] font-bold tracking-widest text-slate-400">
                PLAYERS
              </div>
              <div className="mt-1 text-2xl font-black text-slate-900">
                7 + 6
              </div>
            </div>

            {/* Floating card — game */}
            <div className="absolute right-0 top-12 rounded-2xl border border-white bg-white/90 px-5 py-4 shadow-xl backdrop-blur-xl animate-[float_6s_ease-in-out_infinite_1s]">
              <div className="text-[10px] font-bold tracking-widest text-slate-400">
                GAME
              </div>
              <div className="mt-1 font-black text-cyan-600">
                4 QUARTERS
              </div>
            </div>

            {/* Floating ball */}
            <div className="absolute -right-3 bottom-20 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white/80 bg-white shadow-2xl animate-[ballFloat_4s_ease-in-out_infinite]">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 shadow-inner" />
            </div>
          </div>
        </div>
      </section>
      <PoolExperience />
      {/* Introduction */}
      <section id="learn" className="border-t border-slate-200 bg-white px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-black tracking-[0.3em] text-cyan-500">
                WATER POLO
              </span>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                بازی در آب،
                <br />
                با قوانین خودش.
              </h2>
            </div>

            <div className="text-lg leading-9 text-slate-500">
              <p>
                واترپلو یک ورزش تیمی سریع و پرتحرک است که بازیکنان باید هم‌زمان
                شنا، پاس‌کاری، دفاع و حمله را مدیریت کنند.
              </p>
              <p className="mt-5">
                اگر تازه با واترپلو آشنا شده‌ای، اینجا می‌توانی از قوانین و
                پست‌های مختلف تا مسابقات و بازیکنان را بشناسی.
              </p>
            </div>
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
            <h2 className="mt-3 text-4xl font-black">پست‌های بازی</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {positions.map((position) => (
              <article
                key={position.number}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10"
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
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="text-xs font-black tracking-[0.3em] text-cyan-500">
                PLAYERS
              </span>
              <h2 className="mt-3 text-4xl font-black">بازیکنان</h2>
            </div>
            <span className="hidden text-sm text-slate-400 sm:block">
              بازیکنان معرفی‌شده
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((player) => (
              <article
                key={player.number}
                className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition hover:border-cyan-200"
              >
                <div className="text-7xl font-black text-cyan-500/10">
                  {player.number}
                </div>

                <div className="mt-16">
                  <h3 className="text-xl font-black">{player.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {player.position}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Matches */}
      <section id="matches" className="bg-slate-950 px-6 py-28 text-white">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-black tracking-[0.3em] text-cyan-400">
            MATCH CENTER
          </span>
          <h2 className="mt-3 text-4xl font-black">مسابقات</h2>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 sm:p-12">
            <div className="grid items-center gap-8 text-center md:grid-cols-3">
              <div>
                <div className="text-xs text-white/30">HOME</div>
                <div className="mt-3 text-2xl font-black">طلایه‌داران</div>
              </div>

              <div>
                <div className="text-4xl font-black text-cyan-400">VS</div>
                <div className="mt-3 text-sm text-white/40">
                  مسابقه بعدی به‌زودی
                </div>
              </div>

              <div>
                <div className="text-xs text-white/30">AWAY</div>
                <div className="mt-3 text-2xl font-black">حریف آینده</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-white px-6 py-28">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-xs font-black tracking-[0.3em] text-cyan-500">
            OUR TEAM
          </span>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">طلایه‌داران</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-slate-500">
            یک تیم جوان که مسیر خودش را در واترپلو شروع کرده است. این بخش
            مخصوص معرفی تیم و بازیکنان آن است.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-black tracking-[0.3em] text-cyan-500">
            GALLERY
          </span>
          <h2 className="mt-3 text-4xl font-black">لحظه‌های بازی</h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="h-72 rounded-[2rem] bg-gradient-to-br from-cyan-300 to-blue-500 shadow-xl shadow-cyan-500/10" />
            <div className="h-72 rounded-[2rem] bg-gradient-to-br from-sky-200 to-cyan-400 shadow-xl shadow-cyan-500/10 md:translate-y-8" />
            <div className="h-72 rounded-[2rem] bg-gradient-to-br from-blue-300 to-cyan-500 shadow-xl shadow-cyan-500/10" />
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