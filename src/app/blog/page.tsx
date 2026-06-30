"use client";

import { useQuery } from "@tanstack/react-query";
import { BlogCard } from "@/components/cards/blog-card";
import { SiteHeader } from "@/components/layout/site-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { blogService } from "@/services/blog.service";

export default function BlogPage() {
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Blog
          </p>
          <h1 className="mt-2 text-3xl font-bold">مقالات آموزشی</h1>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-48" />
            ))}
          </div>
        ) : null}

        {isError ? (
          <EmptyState message="خطا در دریافت لیست مقالات. بک‌اند یا آدرس API را بررسی کنید." />
        ) : null}

        {!isLoading && !isError && posts.length === 0 ? (
          <EmptyState message="هنوز مقاله‌ای ثبت نشده است." />
        ) : null}

        {!isLoading && !isError && posts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
