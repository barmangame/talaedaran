"use client";

import { useEffect, useState } from "react";

type PlayerPosition = "GOALKEEPER" | "DEFENDER" | "ATTACKER";

type Player = {
  id: string;
  name: string;
  capNumber: number;
  position: PlayerPosition;
  imageUrl: string | null;
};

const positionLabels: Record<PlayerPosition, string> = {
  GOALKEEPER: "دروازه‌بان",
  DEFENDER: "مدافع",
  ATTACKER: "مهاجم",
};

function PlayerSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white sm:rounded-[2rem]">
      <div className="m-2.5 h-64 animate-pulse rounded-[1.35rem] bg-slate-100 sm:m-3 sm:h-72 sm:rounded-[1.5rem]" />

      <div className="p-5 sm:p-6">
        <div className="h-2.5 w-20 animate-pulse rounded-full bg-slate-100" />

        <div className="mt-3 h-7 w-36 animate-pulse rounded-lg bg-slate-100" />

        <div className="mt-6 border-t border-slate-100 pt-5">
          <div className="h-2 w-24 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export default function PlayersSection() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadPlayers() {
      try {
        const response = await fetch("/api/players", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load players");
        }

        const data = await response.json();

        if (active) {
          setPlayers(data);
        }
      } catch {
        if (active) {
          setError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPlayers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="players" className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[9px] font-black tracking-[0.3em] text-cyan-500 sm:text-[10px]">
              OUR PLAYERS
            </span>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              بازیکنان تیم
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
              اعضایی که داخل آب، بخشی از یک تیم هستند.
            </p>
          </div>

          <div className="w-fit rounded-full border border-slate-200 px-4 py-2 text-[9px] font-black tracking-[0.2em] text-slate-400">
            {loading
              ? "-- PLAYERS"
              : `${players.length.toString().padStart(2, "0")} PLAYERS`}
          </div>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            <PlayerSkeleton />
            <PlayerSkeleton />
            <PlayerSkeleton />
          </div>
        ) : error ? (
          <div className="mt-10 rounded-[1.7rem] border border-dashed border-slate-200 bg-slate-50 px-5 py-16 text-center sm:mt-14 sm:rounded-[2rem]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white font-black text-cyan-500 shadow-sm">
              W
            </div>

            <h3 className="mt-5 text-lg font-black">
              بازیکنان فعلاً در دسترس نیستند
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              صفحه بدون مشکل در حال اجراست؛ اطلاعات بازیکنان بعداً قابل دریافت
              است.
            </p>
          </div>
        ) : players.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {players.map((player) => (
              <article
                key={player.id}
                className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white transition-all duration-500 sm:rounded-[2rem] sm:hover:-translate-y-2 sm:hover:border-cyan-200 sm:hover:shadow-[0_30px_80px_rgba(15,23,42,0.08)]"
              >
                <div className="relative mx-2.5 mt-2.5 h-64 overflow-hidden rounded-[1.35rem] bg-slate-100 sm:mx-3 sm:mt-3 sm:h-72 sm:rounded-[1.5rem]">
                  {player.imageUrl ? (
                    <img
                      src={player.imageUrl}
                      alt={player.name}
                      className="h-full w-full object-cover transition duration-700 sm:group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-slate-100 to-slate-200" />

                      <div className="absolute -bottom-12 -left-5 text-[160px] font-black leading-none tracking-[-0.15em] text-white/80">
                        {player.capNumber}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-white/70 bg-white/60 text-2xl font-black text-cyan-500 shadow-xl backdrop-blur sm:h-28 sm:w-28 sm:text-3xl">
                          {player.capNumber}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-black text-slate-900 shadow-lg backdrop-blur sm:right-4 sm:top-4">
                    CAP {player.capNumber}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="text-[8px] font-black tracking-[0.25em] text-cyan-500 sm:text-[9px]">
                    {positionLabels[player.position] ?? "بازیکن"}
                  </div>

                  <h3 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">
                    {player.name}
                  </h3>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 sm:mt-6 sm:pt-5">
                    <span className="text-[8px] font-black tracking-[0.2em] text-slate-300">
                      TEAM PLAYER
                    </span>

                    <span className="text-cyan-500">←</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.7rem] border border-dashed border-slate-200 bg-slate-50 px-5 py-16 text-center sm:mt-14 sm:rounded-[2rem]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white font-black text-cyan-500 shadow-sm">
              W
            </div>

            <h3 className="mt-5 text-lg font-black">
              هنوز بازیکنی اضافه نشده است
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              به‌زودی بازیکنان تیم اینجا نمایش داده می‌شوند.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}