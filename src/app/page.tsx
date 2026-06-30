"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { BlogCard } from "@/components/cards/blog-card";
import { CourseCard } from "@/components/cards/course-card";
import { TutorCard } from "@/components/cards/tutor-card";
import { SiteHeader } from "@/components/layout/site-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { blogService } from "@/services/blog.service";
import { coursesService } from "@/services/courses.service";
import { tutorsService } from "@/services/tutors.service";

export default function Home() {
  const coursesQuery = useQuery({
    queryKey: ["home", "courses"],
    queryFn: coursesService.getAll,
  });

  const tutorsQuery = useQuery({
    queryKey: ["home", "tutors"],
    queryFn: tutorsService.getAll,
  });

  const blogsQuery = useQuery({
    queryKey: ["home", "blogs"],
    queryFn: blogService.getAll,
  });

  const popularCourses = [...(coursesQuery.data ?? [])]
    .sort((a, b) => (b.active_students ?? 0) - (a.active_students ?? 0))
    .slice(0, 3);

  const selectedTutors = [...(tutorsQuery.data ?? [])]
    .filter((tutor) => Boolean(tutor.user))
    .slice(0, 3);

  const latestPosts = [...(blogsQuery.data ?? [])]
    .sort((a, b) => {
      const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
      return bDate - aDate;
    })
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Learn English Platform
              </p>

              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                یادگیری زبان انگلیسی با دوره‌ها و اساتید حرفه‌ای
              </h1>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/courses"
                  className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  مشاهده دوره‌ها
                </Link>

                <Link
                  href="/register/student"
                  className="rounded-full border border-slate-300 bg-slate-50 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ثبت‌نام دانش‌آموز
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-gradient-to-br from-indigo-50 via-sky-50 to-white p-6 dark:from-indigo-950 dark:via-slate-900 dark:to-slate-950">
              <div className="grid gap-4">
                <StatCard label="دوره‌های فعال" value={coursesQuery.data?.length ?? 0} />
                <StatCard label="اساتید" value={tutorsQuery.data?.length ?? 0} />
                <StatCard label="مقالات آموزشی" value={blogsQuery.data?.length ?? 0} />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Explore
            </p>
          </div>

          <div className="grid gap-10">
            <PreviewSection
              title="دوره‌های محبوب"
              href="/courses"
              items={popularCourses}
              isLoading={coursesQuery.isLoading}
              isError={coursesQuery.isError}
              errorMessage="خطا در دریافت دوره‌ها از بک‌اند."
              emptyMessage="هنوز دوره‌ای برای نمایش وجود ندارد."
              renderItem={(course) => <CourseCard key={course.id} course={course} />}
            />

            <PreviewSection
              title="اساتید منتخب"
              href="/tutors"
              items={selectedTutors}
              isLoading={tutorsQuery.isLoading}
              isError={tutorsQuery.isError}
              errorMessage="خطا در دریافت اساتید از بک‌اند."
              emptyMessage="هنوز استادی برای نمایش وجود ندارد."
              renderItem={(tutor) => <TutorCard key={tutor.id} tutor={tutor} />}
            />

            <PreviewSection
              title="آخرین مقالات بلاگ"
              href="/blog"
              items={latestPosts}
              isLoading={blogsQuery.isLoading}
              isError={blogsQuery.isError}
              errorMessage="خطا در دریافت مقالات از بک‌اند."
              emptyMessage="هنوز مقاله‌ای برای نمایش وجود ندارد."
              renderItem={(post) => <BlogCard key={post.id} post={post} />}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}

function PreviewSection<T>({
  title,
  href,
  items,
  isLoading,
  isError,
  errorMessage,
  emptyMessage,
  renderItem,
}: {
  title: string;
  href: string;
  items: T[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  emptyMessage: string;
  renderItem: (item: T) => React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
        <Link href={href} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          مشاهده همه
        </Link>
      </div>

      {isLoading ? <LoadingGrid /> : null}

      {isError ? <EmptyState message={errorMessage} /> : null}

      {!isLoading && !isError && items.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : null}

      {!isLoading && !isError && items.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => renderItem(item))}
        </div>
      ) : null}
    </section>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-80 rounded-3xl" />
      ))}
    </div>
  );
}
