import Image from "next/image";
import type { Tutor, TutorLanguage } from "@/types/tutor";

function getTutorName(tutor: Tutor) {
  const firstName = tutor.user?.first_name || "";
  const lastName = tutor.user?.last_name || "";
  const fullName = `${firstName} ${lastName}`.trim();

  return fullName || tutor.user?.email || "استاد زبان";
}

function formatLanguages(languages: Tutor["languages_spoken"]) {
  if (!languages) return "ثبت نشده";

  if (Array.isArray(languages)) {
    return languages
      .map((item: TutorLanguage) => {
        if (typeof item === "string") return item;
        return [item.language, item.level].filter(Boolean).join(" - ");
      })
      .filter(Boolean)
      .join("، ");
  }

  return Object.entries(languages)
    .map(([language, level]) => `${language} - ${level}`)
    .join("، ");
}

export function TutorCard({ tutor }: { tutor: Tutor }) {
  const name = getTutorName(tutor);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-950">
          {tutor.profile_picture ? (
            <Image
              src={tutor.profile_picture}
              alt={name}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-indigo-700 dark:text-indigo-300">
              {name.slice(0, 1)}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-bold text-slate-950 dark:text-white">{name}</h3>
          <p className="mt-1 text-xs text-slate-400">
            {tutor.country || "کشور ثبت نشده"}
          </p>
        </div>
      </div>

      <p className="line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {tutor.bio || tutor.description || "معرفی کوتاهی برای این استاد ثبت نشده است."}
      </p>

      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        زبان‌ها: {formatLanguages(tutor.languages_spoken)}
      </div>

      {tutor.subjects?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {tutor.subjects.slice(0, 3).map((subject) => (
            <span
              key={subject}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {subject}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
