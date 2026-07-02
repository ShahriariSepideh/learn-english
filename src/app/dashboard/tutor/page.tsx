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

/* ================= TYPES (FIX ESLINT ANY) ================= */

type TutorCourse = {
    id: number | string;
    title?: string;
    status?: string;
};

type TutorReview = {
    id: number | string;
    review_text?: string;
    rating?: number;
};

export default function TutorDashboardPage() {
    const user = useSelector((state: RootState) => state.auth.user);

    const hasProfile = Boolean(user?.has_tutor_profile);
    const approved = Boolean(user?.tutor_approved);
    const pendingApproval = hasProfile && !approved;

    const dashboardQuery = useQuery({
        queryKey: ["tutor-dashboard"],
        queryFn: tutorService.getDashboard,
        enabled: hasProfile && approved,
        retry: false,
    });

    const data = dashboardQuery.data;

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
                </div>

                {/* NO PROFILE */}
                {!hasProfile && (
                    <TutorProfileForm />
                )}

                {/* PENDING */}
                {pendingApproval && (
                    <EmptyState message="پروفایل در انتظار تایید است" />
                )}

                {/* APPROVED */}
                {hasProfile && approved && (
                    <>
                        {dashboardQuery.isLoading && (
                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="h-40 rounded-[2rem]" />
                                ))}
                            </div>
                        )}

                        {dashboardQuery.isError && (
                            <EmptyState message="خطا در دریافت داشبورد" />
                        )}

                        {data && (
                            <div className="grid gap-5">

                                {/* COURSES */}
                                <Panel title="دوره‌ها">
                                    {data.courses?.length ? (
                                        <ul className="space-y-3">
                                            {data.courses.map((course: TutorCourse) => (
                                                <li
                                                    key={course.id}
                                                    className="rounded-2xl border p-4"
                                                >
                                                    <p className="font-semibold">
                                                        {course.title ?? "Course"}
                                                    </p>
                                                    <span className="text-xs text-slate-500">
                                                        {course.status ?? "draft"}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-slate-500">
                                            دوره‌ای وجود ندارد
                                        </p>
                                    )}
                                </Panel>

                                {/* REVIEWS */}
                                <Panel title="بازخوردها">
                                    {data.reviews?.length ? (
                                        <ul className="space-y-3">
                                            {data.reviews.map((review: TutorReview) => (
                                                <li
                                                    key={review.id}
                                                    className="rounded-2xl border p-4"
                                                >
                                                    <p>{review.review_text ?? "Review"}</p>
                                                    <span className="text-indigo-600">
                                                        {review.rating ?? 0} / 5
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-slate-500">
                                            هنوز بازخوردی وجود ندارد
                                        </p>
                                    )}
                                </Panel>

                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}

/* ================= UI ================= */

function Panel({
                   title,
                   children,
               }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border bg-white p-5 dark:bg-slate-900">
            <h2 className="font-bold">{title}</h2>
            <div className="mt-4">{children}</div>
        </div>
    );
}