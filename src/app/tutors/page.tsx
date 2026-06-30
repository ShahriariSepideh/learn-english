"use client";

import { useQuery } from "@tanstack/react-query";
import { TutorCard } from "@/components/cards/tutor-card";
import { SiteHeader } from "@/components/layout/site-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { tutorsService } from "@/services/tutors.service";

export default function TutorsPage() {
  const tututorsQuery = useQuery({
    queryKey: ["tutors"],
    queryFn: tutorsService.getAll,
  });

  const tutors = tututorsQuery.data ?? [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Tutors
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            اساتید زبان
          </h1>
        </div>

        {tututorsQuery.isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-64 rounded-3xl" />
            ))}
          </div>
        ) : null}

        {tututorsQuery.isError ? (
          <EmptyState message="خطا در دریافت لیست اساتید از بک‌اند." />
        ) : null}

        {!tututorsQuery.isLoading && !tututorsQuery.isError && tutors.length === 0 ? (
          <EmptyState message="هنوز استادی برای نمایش وجود ندارد." />
        ) : null}

        {!tututorsQuery.isLoading && !tututorsQuery.isError && tutors.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
