"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { authService } from "@/services/auth.service";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { setUser } from "@/store/slices/auth-slice";

const registerSchema = z.object({
  first_name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد."),
  last_name: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد."),
  email: z.string().email("ایمیل معتبر وارد کنید."),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm({ isTeacher }: { isTeacher: boolean }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (values: RegisterFormValues) => {
      return authService.register({
        ...values,
        is_teacher: isTeacher,
      });
    },
    onSuccess: (user) => {
      dispatch(setUser(user));
      toast.success("ثبت‌نام با موفقیت انجام شد.");
      router.replace(user.is_teacher ? "/dashboard/tutor" : "/dashboard/student");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  return (
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center px-4 py-10">
        <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Register
            </p>
            <h1 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
              {isTeacher ? "ثبت‌نام استاد" : "ثبت‌نام دانش‌آموز"}
            </h1>
            <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">
              {isTeacher
                  ? "برای تدریس در پلتفرم، حساب استاد بسازید."
                  : "برای شرکت در دوره‌ها، حساب دانش‌آموز بسازید."}
            </p>
          </div>

          <form
              className="grid gap-5"
              onSubmit={form.handleSubmit((values) => registerMutation.mutate(values))}
          >
            <Field label="نام" error={form.formState.errors.first_name?.message}>
              <input
                  {...form.register("first_name")}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
                  placeholder="مثلا Sepideh"
              />
            </Field>

            <Field label="نام خانوادگی" error={form.formState.errors.last_name?.message}>
              <input
                  {...form.register("last_name")}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
                  placeholder="مثلا Shahriari"
              />
            </Field>

            <Field label="ایمیل" error={form.formState.errors.email?.message}>
              <input
                  {...form.register("email")}
                  type="email"
                  dir="ltr"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
                  placeholder="example@email.com"
              />
            </Field>

            <Field label="رمز عبور" error={form.formState.errors.password?.message}>
              <input
                  {...form.register("password")}
                  type="password"
                  dir="ltr"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
                  placeholder="حداقل ۸ کاراکتر"
              />
            </Field>

            <button
                type="submit"
                disabled={registerMutation.isPending}
                className="mt-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {registerMutation.isPending
                  ? "در حال ثبت‌نام..."
                  : isTeacher
                      ? "ثبت‌نام استاد"
                      : "ثبت‌نام دانش‌آموز"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            قبلا حساب ساخته‌اید؟{" "}
            <Link href="/login" className="font-bold text-indigo-600 dark:text-indigo-400">
              ورود
            </Link>
          </p>
        </div>
      </div>
  );
}

function Field({
                 label,
                 error,
                 children,
               }: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
      <div className="grid gap-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {label}
        </label>
        {children}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </div>
  );
}