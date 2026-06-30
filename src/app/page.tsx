export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Learn English
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          پلتفرم آموزش زبان انگلیسی
        </h1>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold">دوره‌ها</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              نمایش دوره‌ها و امکان ثبت‌نام دانش‌آموز
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold">اساتید</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              نمایش اساتید تایید شده و اطلاعات آموزشی آن‌ها
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold">بلاگ</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              نمایش آخرین مقاله‌های آموزشی
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
