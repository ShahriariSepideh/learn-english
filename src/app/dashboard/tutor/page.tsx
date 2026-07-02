"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { SiteHeader } from "@/components/layout/site-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { TutorProfileForm } from "@/components/auth/tutor-profile-form";
import { tutorService } from "@/services/tutor.service";
import type { RootState } from "@/store";

export default function TutorDashboardPage() {
    const user = useSelector((state: RootState) => state.auth.user);

    const dashboardQuery = useQuery({
        queryKey: ["tutor-dashboard"],
        queryFn: tutorService.getDashboard,
        enabled: Boolean(user?.has_tutor_profile && user?.tutor_approved === true),
        retry: false,
    });

    const hasProfile = Boolean(user?.has_tutor_profile);
    const approved = user?.tutor_approved === true;
    const pendingApproval = hasProfile && !approved;

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
            <SiteHeader />

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8 max-w-3xl">
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        Tutor Dashboard
                    </p>
                    <h1 className="mt-3 text-3xl font-black sm:text-5xl">
                        داشبورد استاد
                    </h1>
                    <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                        اگر پروفایل استاد کامل نشده باشد، فرم تکمیل پروفایل نمایش داده می‌شود.
                        بعد از تایید ادمین، امکانات کامل مدیریت دوره‌ها فعال می‌شود.
                    </p>
                </div>

                {!hasProfile ? (
                    <div className="grid gap-6">
                        <EmptyState message="پروفایل استاد هنوز ساخته نشده است. فرم زیر را تکمیل کنید." />
                        <TutorProfileForm />
                    </div>
                ) : null}

                {pendingApproval ? (
                    <div className="grid gap-6">
                        <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100">
                            <h2 className="text-xl font-bold">پروفایل شما در انتظار تایید ادمین است</h2>
                            <p className="mt-3 leading-8">
                                بعد از تایید، امکان استفاده از داشبورد کامل، ایجاد دوره و مدیریت کلاس‌ها فعال می‌شود.
                            </p>
                        </div>

                        <TutorProfileForm />
                    </div>
                ) : null}

                {approved ? (
                    <>
                        {dashboardQuery.isLoading ? (
                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <Skeleton key={index} className="h-40 rounded-[2rem]" />
                                ))}
                            </div>
                        ) : null}

                        {dashboardQuery.isError ? (
                            <EmptyState message="اطلاعات داشبورد استاد دریافت نشد." />
                        ) : null}

                        {!dashboardQuery.isLoading && !dashboardQuery.isError && dashboardQuery.data ? (
                            <div className="grid gap-5">
                                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                                    <StatCard title="دوره‌های فعال" value={dashboardQuery.data.active_courses_count ?? 0} />
                                    <StatCard title="تعداد دانش‌آموزان" value={dashboardQuery.data.students_count ?? 0} />
                                    <StatCard title="نظرات" value={dashboardQuery.data.reviews_count ?? 0} />
                                    <StatCard title="میانگین رضایت" value={dashboardQuery.data.average_rating ?? 0} />
                                </div>

                                <div className="grid gap-5 lg:grid-cols-2">
                                    <Panel title="دوره‌ها">
                                        {dashboardQuery.data.courses?.length ? (
                                            <ul className="space-y-3">
                                                {dashboardQuery.data.courses?.map((course: {
                                                    id: number | string;
                                                    title?: string;
                                                    status?: string;
                                                }) => (
                                                    <li
                                                        key={course.id}
                                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
                                                    >
                                                        <div className="flex items-center justify-between gap-3">
                                                            <p className="font-semibold">{course.title ?? "Course"}</p>
                                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {course.status ?? "draft"}
                              </span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                هنوز دوره‌ای ثبت نشده است.
                                            </p>
                                        )}
                                    </Panel>

                                    <Panel title="بازخوردها">
                                        {dashboardQuery.data.reviews?.length ? (
                                            <ul className="space-y-3">
                                                {dashboardQuery.data.reviews?.map((review: {
                                                    id: number | string;
                                                    review_text?: string;
                                                    rating?: number;
                                                    review_date?: string;
                                                }) => (
                                                    <li
                                                        key={review.id}
                                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
                                                    >
                                                        <div className="flex items-center justify-between gap-3">
                                                            <p className="font-semibold">{review.review_text ?? "Review"}</p>
                                                            <span className="text-xs text-indigo-600 dark:text-indigo-400">
                                {review.rating ?? "-"} / 5
                              </span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                هنوز بازخوردی وجود ندارد.
                                            </p>
                                        )}
                                    </Panel>
                                </div>

                                <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="text-lg font-bold">Course Management</h2>
                                        <Link
                                            href="/courses"
                                            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                        >
                                            مدیریت دوره‌ها
                                        </Link>
                                    </div>
                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                        بعد از تایید استاد، امکان ساخت، ویرایش و حذف دوره‌ها باید از همین بخش اضافه شود.
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : null}
            </section>
        </main>
    );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
    return (
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="mt-2 text-2xl font-black">{value}</p>
        </div>
    );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold">{title}</h2>
            <div className="mt-4">{children}</div>
        </div>
    );
}



