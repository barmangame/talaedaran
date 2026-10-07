export default function DashboardLoading() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7fafc] px-4 py-5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-16 rounded-2xl bg-white shadow-sm" />
        <div className="mt-6 rounded-[2rem] bg-white p-8">
          <div className="h-12 w-12 rounded-2xl bg-slate-100" />
          <div className="mt-5 h-10 w-64 rounded-xl bg-slate-100" />
          <div className="mt-3 h-5 w-full max-w-xl rounded-xl bg-slate-100" />
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div className="h-32 rounded-[2rem] bg-white" />
          <div className="h-32 rounded-[2rem] bg-white" />
          <div className="h-32 rounded-[2rem] bg-white" />
        </div>
        <div className="mt-5 h-72 rounded-[2rem] bg-white" />
      </div>
    </main>
  );
}
