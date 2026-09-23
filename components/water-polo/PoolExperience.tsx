"use client";

import { useState } from "react";

const zones = [
  {
    id: "center",
    label: "مرکز زمین",
    english: "CENTER",
    description: "نقطه شروع بازی و محل شکل‌گیری بسیاری از حملات.",
  },
  {
    id: "six",
    label: "خط ۶ متر",
    english: "6M LINE",
    description: "محدوده مهم برای شکل‌گیری موقعیت‌های هجومی.",
  },
  {
    id: "two",
    label: "خط ۲ متر",
    english: "2M LINE",
    description: "منطقه نزدیک دروازه که موقعیت بازیکنان در آن اهمیت زیادی دارد.",
  },
];

export default function PoolExperience() {
  const [activeZone, setActiveZone] = useState("center");

  const active = zones.find((zone) => zone.id === activeZone) ?? zones[0];

  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-28 text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px),radial-gradient(circle_at_80%_70%,white_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <div className="text-xs font-black tracking-[0.35em] text-cyan-400">
            POOL EXPERIENCE
          </div>

          <h2 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
            وارد آب شو.
            <br />
            <span className="text-cyan-400">بازی را ببین.</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/50 sm:text-lg">
            زمین واترپلو را کشف کن و با حرکت روی نقاط مختلف، با بخش‌های مهم
            بازی آشنا شو.
          </p>
        </div>

        {/* Experience */}
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Pool */}
          <div className="relative min-h-[580px] overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-cyan-500 via-sky-600 to-blue-800 p-4 shadow-2xl shadow-cyan-950/40">
            {/* Water */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -left-[10%] top-[15%] h-28 w-[120%] rotate-[-3deg] rounded-[50%] border-t-2 border-white/20 animate-[poolWave_8s_ease-in-out_infinite]" />

              <div className="absolute -left-[10%] top-[38%] h-32 w-[120%] rotate-[2deg] rounded-[50%] border-t-2 border-white/15 animate-[poolWave_10s_ease-in-out_infinite_reverse]" />

              <div className="absolute -left-[10%] top-[63%] h-28 w-[120%] rotate-[-2deg] rounded-[50%] border-t border-white/10 animate-[poolWave_7s_ease-in-out_infinite]" />
            </div>

            {/* Pool */}
            <div className="relative h-full min-h-[548px] overflow-hidden rounded-[2.5rem] border border-white/30 bg-white/[0.05] shadow-inner backdrop-blur-sm">
              {/* Pool lines */}
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />

              {/* 6 meter */}
              <button
                onMouseEnter={() => setActiveZone("six")}
                onFocus={() => setActiveZone("six")}
                className="absolute left-0 right-0 top-[28%] h-12 border-y border-dashed border-white/40 transition hover:bg-white/10"
              >
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black tracking-widest text-white/60 backdrop-blur">
                  6M
                </span>
              </button>

              {/* 2 meter */}
              <button
                onMouseEnter={() => setActiveZone("two")}
                onFocus={() => setActiveZone("two")}
                className="absolute left-0 right-0 top-[38%] h-10 border-y border-dashed border-yellow-200/50 transition hover:bg-yellow-200/10"
              >
                <span className="rounded-full bg-yellow-200/10 px-3 py-1 text-[10px] font-black tracking-widest text-yellow-100/80 backdrop-blur">
                  2M
                </span>
              </button>

              {/* Center */}
              <button
                onMouseEnter={() => setActiveZone("center")}
                onFocus={() => setActiveZone("center")}
                className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/10 transition duration-300 hover:scale-110 hover:bg-white/20"
              >
                <span className="text-[10px] font-black tracking-[0.25em] text-white/80">
                  CENTER
                </span>
              </button>

              {/* Goals */}
              <div className="absolute left-1/2 top-4 h-10 w-44 -translate-x-1/2 rounded-b-xl border-x-4 border-b-4 border-white/80 bg-white/5" />

              <div className="absolute bottom-4 left-1/2 h-10 w-44 -translate-x-1/2 rounded-t-xl border-x-4 border-t-4 border-white/80 bg-white/5" />

              {/* Players */}
              <div className="absolute left-[22%] top-[46%] flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 bg-cyan-400 shadow-lg shadow-cyan-300/30 transition hover:scale-125">
                <span className="text-xs font-black">7</span>
              </div>

              <div className="absolute left-[35%] top-[34%] flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/60 bg-blue-400 transition hover:scale-125">
                <span className="text-xs font-black">10</span>
              </div>

              <div className="absolute right-[28%] top-[48%] flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/60 bg-sky-300 transition hover:scale-125">
                <span className="text-xs font-black text-blue-950">12</span>
              </div>

              <div className="absolute right-[18%] bottom-[30%] flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/60 bg-cyan-300 transition hover:scale-125">
                <span className="text-xs font-black text-blue-950">4</span>
              </div>

              {/* Ball */}
              <div className="absolute left-[48%] top-[44%] h-5 w-5 rounded-full bg-orange-400 shadow-lg shadow-orange-300/40 animate-[ballPulse_2s_ease-in-out_infinite]" />

              {/* Pool labels */}
              <div className="absolute left-6 top-6 text-[10px] font-black tracking-[0.3em] text-white/40">
                WATER POLO
              </div>

              <div className="absolute bottom-6 right-6 text-[10px] font-black tracking-[0.3em] text-white/40">
                EXPLORE THE POOL
              </div>
            </div>
          </div>

          {/* Information panel */}
          <div className="flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
            <div className="text-[10px] font-black tracking-[0.3em] text-cyan-400">
              EXPLORE
            </div>

            <div className="mt-8">
              <div className="text-sm font-bold text-white/40">
                {active.english}
              </div>

              <h3 className="mt-2 text-3xl font-black">
                {active.label}
              </h3>

              <p className="mt-5 text-sm leading-8 text-white/50">
                {active.description}
              </p>
            </div>

            <div className="mt-auto pt-12">
              <div className="mb-3 text-[10px] font-bold tracking-widest text-white/30">
                MOVE THROUGH THE GAME
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-cyan-400 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 sm:flex-row">
          <div>
            <div className="text-xl font-black">
              آماده‌ای بازی را شروع کنی؟
            </div>

            <div className="mt-1 text-sm text-white/40">
              مرحله بعدی: قوانین و تاکتیک‌های بازی
            </div>
          </div>

          <button className="group rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-300">
            PLAY THE GAME
            <span className="mr-2 inline-block transition-transform group-hover:-translate-x-1">
              ←
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}