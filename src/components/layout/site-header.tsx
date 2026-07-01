"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authService } from "@/services/auth.service";
import { clearUser } from "@/store/slices/auth-slice";
import type { RootState } from "@/store";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/courses", label: "دوره‌ها" },
  { href: "/tutors", label: "اساتید" },
  { href: "/blog", label: "بلاگ" },
];

export function SiteHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const dashboardHref = user?.is_teacher ? "/dashboard/tutor" : "/dashboard/student";

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // حتی اگر بک‌اند خطا بدهد، state فرانت را پاک می‌کنیم
    } finally {
      dispatch(clearUser());
      toast.success("خروج با موفقیت انجام شد.");
      router.replace("/");
    }
  };

  return (
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

            {user ? (
                <>
                  <Link
                      href={dashboardHref}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    داشبورد
                  </Link>
                  <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    خروج
                  </button>
                </>
            ) : (
                <Link
                    href="/login"
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ورود و ثبت نام
                </Link>
            )}
          </div>
        </div>
      </header>
  );
}