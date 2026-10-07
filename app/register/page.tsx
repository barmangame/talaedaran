"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function updateField(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "ثبت‌نام انجام نشد.");
        return;
      }

      setMessage("حساب کاربری با موفقیت ساخته شد.");

      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.replace("/login");
      }, 800);
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
              ساخت حساب بازیکن
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              حساب خودت را بساز و بعد پروفایل بازیکنت را تکمیل کن.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium"
                >
                  نام کاربری
                </label>

                <input
                  id="username"
                  type="text"
                  value={form.username}
                  onChange={(event) =>
                    updateField("username", event.target.value)
                  }
                  placeholder="مثلاً barman7"
                  autoComplete="username"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  ایمیل
                </label>

                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  placeholder="example@email.com"
                  autoComplete="email"
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
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  placeholder="حداقل ۸ کاراکتر"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium"
                >
                  تکرار رمز عبور
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) =>
                    updateField("confirmPassword", event.target.value)
                  }
                  placeholder="رمز عبور را دوباره وارد کن"
                  autoComplete="new-password"
                  required
                  minLength={8}
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
                {loading ? "در حال ساخت حساب..." : "ساخت حساب"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs leading-6 text-slate-400">
              با ساخت حساب، می‌توانی بعداً پروفایل بازیکن خودت را تکمیل کنی.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}