"use client";

import { useQuery } from "@tanstack/react-query";
import { CourseCard } from "@/components/cards/course-card";
import { SiteHeader } from "@/components/layout/site-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { coursesService } from "@/services/courses.service";

export default function CoursesPage() {
  const { data: courses = [], isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: coursesService.getAll,
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Courses
          </p>
          <h1 className="mt-2 text-3xl font-bold">دوره‌های آموزشی</h1>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-72" />
            ))}
          </div>
        ) : null}

        {isError ? (
          <EmptyState message="خطا در دریافت لیست دوره‌ها. بک‌اند یا آدرس API را بررسی کنید." />
        ) : null}

        {!isLoading && !isError && courses.length === 0 ? (
          <EmptyState message="هنوز دوره‌ای ثبت نشده است." />
        ) : null}

        {!isLoading && !isError && courses.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
