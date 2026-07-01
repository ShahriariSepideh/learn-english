"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SiteHeader } from "@/components/layout/site-header";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { authService } from "@/services/auth.service";
import { setUser } from "@/store/slices/auth-slice";

const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر وارد کنید."),
  password: z.string().min(1, "رمز عبور را وارد کنید."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      await authService.login(values);
      return authService.me();
    },
    onSuccess: (user) => {
      dispatch(setUser(user));
      toast.success("ورود با موفقیت انجام شد.");
      router.replace(user.is_teacher ? "/dashboard/tutor" : "/dashboard/student");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  return (
      <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
        <SiteHeader />

        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center px-4 py-10">
          <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Login
              </p>
              <h1 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
                ورود به حساب کاربری
              </h1>
              <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">
                با ایمیل و رمز عبور وارد شوید تا به بخش‌های کاربری دسترسی داشته باشید.
              </p>
            </div>

            <form
                className="grid gap-5"
                onSubmit={form.handleSubmit((values) => loginMutation.mutate(values))}
            >
              <div className="grid gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  ایمیل
                </label>
                <input
                    {...form.register("email")}
                    type="email"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
                    placeholder="example@email.com"
                    dir="ltr"
                />
                {form.formState.errors.email ? (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  رمز عبور
                </label>
                <input
                    {...form.register("password")}
                    type="password"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
                    placeholder="رمز عبور"
                    dir="ltr"
                />
                {form.formState.errors.password ? (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.password.message}
                    </p>
                ) : null}
              </div>

              <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="mt-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loginMutation.isPending ? "در حال ورود..." : "ورود"}
              </button>
            </form>

            <div className="mt-6 grid gap-2 text-center text-sm text-slate-500 dark:text-slate-400">
              <p>
                حساب ندارید؟{" "}
                <Link href="/register/student" className="font-bold text-indigo-600 dark:text-indigo-400">
                  ثبت‌نام دانش‌آموز
                </Link>
              </p>

              <p>
                می‌خواهید استاد شوید؟{" "}
                <Link href="/register/tutor" className="font-bold text-indigo-600 dark:text-indigo-400">
                  ثبت‌نام استاد
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
  );
}