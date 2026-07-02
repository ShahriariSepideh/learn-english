"use client";

import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/layout/site-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { studentService } from "@/services/student.service";

import type {
    StudentEnrollment,
    StudentHomework,
} from "@/types/student";

export default function StudentDashboardPage() {
    const dashboardQuery = useQuery({
        queryKey: ["student-dashboard"],
        queryFn: studentService.getDashboard,
    });

    const data = dashboardQuery.data;

    const student = data?.student;
    const enrollments: StudentEnrollment[] = data?.enrollments ?? [];
    const completedHomeworks: StudentHomework[] =
        student?.student_homework_completed ?? [];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
            <SiteHeader />

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 max-w-3xl">
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        Student Dashboard
                    </p>

                    <h1 className="mt-3 text-3xl font-black sm:text-5xl">
                        داشبورد دانش‌آموز
                    </h1>

                    <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                        مشاهده پروفایل، دوره‌های ثبت‌نام‌شده، وضعیت پرداخت‌ها و تکالیف.
                    </p>
                </div>

                {/* Loading */}
                {dashboardQuery.isLoading && (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-40 rounded-[2rem]" />
                        ))}
                    </div>
                )}

                {/* Error */}
                {dashboardQuery.isError && (
                    <EmptyState message="خطا در دریافت اطلاعات داشبورد دانش‌آموز" />
                )}

                {/* Content */}
                {!dashboardQuery.isLoading &&
                    !dashboardQuery.isError &&
                    data && (
                        <div className="grid gap-5">
                            {/* Stats */}
                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                                <StatCard
                                    title="وضعیت حساب"
                                    value={student?.student_active ? "فعال" : "غیرفعال"}
                                />

                                <StatCard
                                    title="دوره‌های در حال یادگیری"
                                    value={student?.courses_list?.length ?? 0}
                                />

                                <StatCard
                                    title="ثبت‌نام‌ها"
                                    value={enrollments.length}
                                />

                                <StatCard
                                    title="دوره‌های تایید شده"
                                    value={data.approved_courses?.length ?? 0}
                                />
                            </div>

                            {/* Panels */}
                            <div className="grid gap-5 lg:grid-cols-2">
                                {/* Profile */}
                                <Panel title="پروفایل">
                                    <InfoRow
                                        label="User ID"
                                        value={String(student?.user ?? "-")}
                                    />

                                    <InfoRow
                                        label="Homeworks"
                                        value={String(completedHomeworks.length)}
                                    />

                                    <InfoRow
                                        label="Favourite tutors"
                                        value={String(
                                            student?.favourite_tutors?.length ?? 0
                                        )}
                                    />
                                </Panel>

                                {/* Enrollments */}
                                <Panel title="پرداخت‌ها / ثبت‌نام‌ها">
                                    {enrollments.length ? (
                                        <ul className="space-y-3">
                                            {enrollments.map((enrollment: StudentEnrollment) => (
                                                <li
                                                    key={enrollment.id}
                                                    className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold">
                                                            {enrollment.course?.title ?? "Course"}
                                                        </p>

                                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                              {enrollment.status}
                            </span>
                                                    </div>

                                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                                        {enrollment.payment_amount} {enrollment.currency}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-slate-500">
                                            هنوز ثبت‌نامی وجود ندارد
                                        </p>
                                    )}
                                </Panel>
                            </div>

                            {/* Homeworks */}
                            <Panel title="Homeworks">
                                {completedHomeworks.length ? (
                                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                        {completedHomeworks.map(
                                            (homework: StudentHomework, index: number) => (
                                                <div
                                                    key={homework.id ?? index}
                                                    className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                                                >
                                                    <p className="font-semibold">
                                                        {homework.title ?? `Homework ${index + 1}`}
                                                    </p>

                                                    <p className="mt-2 text-sm text-slate-500">
                                                        {homework.due_date ?? "بدون تاریخ"}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        تکلیفی ثبت نشده است
                                    </p>
                                )}
                            </Panel>
                        </div>
                    )}
            </section>
        </main>
    );
}

/* ================= UI COMPONENTS ================= */

function StatCard({
                      title,
                      value,
                  }: {
    title: string;
    value: string | number;
}) {
    return (
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-2 text-2xl font-black">{value}</p>
        </div>
    );
}

function Panel({
                   title,
                   children,
               }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold">{title}</h2>
            <div className="mt-4">{children}</div>
        </div>
    );
}

function InfoRow({
                     label,
                     value,
                 }: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex justify-between border-b border-slate-100 py-3 last:border-b-0 dark:border-slate-800">
            <span className="text-sm text-slate-500">{label}</span>
            <span className="text-sm font-semibold">{value}</span>
        </div>
    );
}