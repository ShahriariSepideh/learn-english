"use client";

import { SiteHeader } from "@/components/layout/site-header";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function StudentDashboardPage() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
            <SiteHeader />
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        Student Dashboard
                    </p>
                    <h1 className="mt-3 text-3xl font-black">داشبورد دانش‌آموز</h1>
                    <p className="mt-4 text-slate-600 dark:text-slate-300">
                        {user ? `${user.first_name} ${user.last_name}` : "در حال بارگذاری اطلاعات کاربر..."}
                    </p>
                </div>
            </section>
        </main>
    );
}