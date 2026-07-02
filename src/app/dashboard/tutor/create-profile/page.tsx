// import { SiteHeader } from "@/components/layout/site-header";
// import { TutorProfileForm } from "@/components/auth/tutor-profile-form";
//
// export default function TutorCreateProfilePage() {
//     return (
//         <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
//             <SiteHeader />
//             <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
//                 <TutorProfileForm />
//             </section>
//         </main>
//     );
// }


"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { TutorProfileForm } from "@/components/auth/tutor-profile-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TutorCreateProfilePage() {
    const router = useRouter();

    // 🔒 guard ساده (اختیاری ولی مهم)
    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            router.push("/login");
        }
    }, [router]);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">

            {/* Header */}
            <SiteHeader />

            {/* Page Content */}
            <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">

                {/* عنوان صفحه */}
                <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h1 className="text-2xl font-bold">
                        تکمیل پروفایل استاد
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        لطفاً اطلاعات زیر را برای فعال شدن حساب استاد تکمیل کنید
                    </p>
                </div>

                {/* فرم اصلی */}
                <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <TutorProfileForm />
                </div>

            </section>
        </main>
    );
}