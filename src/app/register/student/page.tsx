import { RegisterForm } from "@/components/auth/register-form";
import { SiteHeader } from "@/components/layout/site-header";

export default function StudentRegisterPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
            <SiteHeader />
            <RegisterForm isTeacher={false} />
        </main>
    );
}