"use client";

import { SiteHeader } from "@/components/layout/site-header";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function TutorDashboardPage() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
            <SiteHeader />
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        Tutor Dashboard
                    </p>
                    <h1 className="mt-3 text-3xl font-black">داشبورد استاد</h1>

                    <p className="mt-4 text-slate-600 dark:text-slate-300">
                        {user ? `${user.first_name} ${user.last_name}` : "در حال بارگذاری اطلاعات کاربر..."}
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                            <p className="text-sm text-slate-500 dark:text-slate-400">پروفایل استاد</p>
                            <p className="mt-2 font-bold">
                                {user?.has_tutor_profile ? "تکمیل شده" : "تکمیل نشده"}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                            <p className="text-sm text-slate-500 dark:text-slate-400">وضعیت تایید</p>
                            <p className="mt-2 font-bold">
                                {user?.tutor_approved === true
                                    ? "تایید شده"
                                    : user?.tutor_approved === false
                                        ? "رد شده"
                                        : "در انتظار تایید"}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                            <p className="text-sm text-slate-500 dark:text-slate-400">دسترسی</p>
                            <p className="mt-2 font-bold">فعلا محدود تا تکمیل و تایید پروفایل</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}