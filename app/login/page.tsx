"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "ورود انجام نشد.");
        return;
      }

      setMessage("با موفقیت وارد حساب شدی.");

      router.replace("/dashboard");
      router.refresh();
      // فعلاً فقط ورود را تست می‌کنیم.
      // بعداً کاربر را به داشبورد منتقل می‌کنیم.
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white px-5 py-12 text-slate-900"
    >
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <section className="w-full">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white shadow-lg">
              ط
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              ورود به حساب
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              وارد حساب بازیکن خودت شو و پروفایلت را مدیریت کن.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="identifier"
                  className="mb-2 block text-sm font-medium"
                >
                  ایمیل یا نام کاربری
                </label>

                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(event) =>
                    setIdentifier(event.target.value)
                  }
                  placeholder="ایمیل یا نام کاربری"
                  autoComplete="username"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  رمز عبور
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="رمز عبور"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "در حال ورود..." : "ورود به حساب"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs leading-6 text-slate-400">
              بعد از ورود می‌توانی پروفایل بازیکن خودت را بسازی.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}