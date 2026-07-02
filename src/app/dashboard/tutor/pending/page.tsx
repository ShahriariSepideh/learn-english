import { SiteHeader } from "@/components/layout/site-header";

export default function PendingPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white">
            <SiteHeader />

            <div className="mx-auto max-w-2xl px-4 py-20 text-center">
                <div className="rounded-2xl border bg-white dark:bg-slate-900 p-8 shadow-sm">

                    <h1 className="text-2xl font-bold text-amber-600">
                        پروفایل شما ارسال شد
                    </h1>

                    <p className="mt-4 text-slate-600 dark:text-slate-300 leading-7">
                        پروفایل شما در حال بررسی توسط ادمین است.
                        بعد از تایید، داشبورد کامل استاد فعال خواهد شد.
                    </p>

                    <div className="mt-6 animate-pulse text-sm text-slate-500">
                        در انتظار تایید...
                    </div>

                </div>
            </div>
        </main>
    );
}