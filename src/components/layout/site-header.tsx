import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/courses", label: "دوره‌ها" },
  { href: "/tutors", label: "اساتید" },
  { href: "/blog", label: "بلاگ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          Learn English
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 sm:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-indigo-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            ورود
          </Link>
        </div>
      </div>
    </header>
  );
}
