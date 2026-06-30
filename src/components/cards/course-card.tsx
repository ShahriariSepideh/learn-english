import Image from "next/image";
import type { Course } from "@/types/course";

export function CourseCard({ course }: { course: Course }) {
  const price = course.price_per_toman || course.price_per_hour;
  const imageUrl = course.image;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-44 bg-gradient-to-br from-indigo-100 to-sky-100 dark:from-indigo-950 dark:to-slate-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-black text-indigo-600 dark:text-indigo-300">
            EN
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2 text-xs">
          {course.language ? (
            <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {course.language}
            </span>
          ) : null}

          {course.level ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              سطح {course.level}
            </span>
          ) : null}
        </div>

        <h3 className="line-clamp-2 text-lg font-bold text-slate-950 dark:text-white">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {course.description || "توضیحی برای این دوره ثبت نشده است."}
        </p>

        <div className="mt-5 grid gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <div className="flex items-center justify-between">
            <span>زمان</span>
            <span dir="ltr">
              {course.schedule_start || "--"} - {course.schedule_end || "--"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>ظرفیت</span>
            <span>{course.capacity ?? "--"}</span>
          </div>

          {price ? (
            <div className="flex items-center justify-between">
              <span>قیمت</span>
              <span>{price}</span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
