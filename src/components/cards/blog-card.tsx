import Image from "next/image";
import type { BlogPost } from "@/types/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-40 bg-gradient-to-br from-slate-100 to-indigo-100 dark:from-slate-800 dark:to-indigo-950">
        {post.picture ? (
          <Image
            src={post.picture}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl font-black text-indigo-600 dark:text-indigo-300">
            Blog
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2 text-xs">
          {post.category ? (
            <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {post.category}
            </span>
          ) : null}

          {post.difficulty_level ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {post.difficulty_level}
            </span>
          ) : null}
        </div>

        <h3 className="line-clamp-2 text-lg font-bold text-slate-950 dark:text-white">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {post.description || post.content || "خلاصه‌ای برای این مقاله ثبت نشده است."}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>{post.author || "نویسنده نامشخص"}</span>
          <span>
            {post.created_at ? new Date(post.created_at).toLocaleDateString("fa-IR") : ""}
          </span>
        </div>
      </div>
    </article>
  );
}
