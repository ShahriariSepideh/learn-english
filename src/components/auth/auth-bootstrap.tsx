"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "@/services/auth.service";
import { clearUser, setHydrated, setUser } from "@/store/slices/auth-slice";
import type { RootState } from "@/store";

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const { user, isHydrated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isHydrated) return;

        let cancelled = false;

        authService
            .me()
            .then((currentUser) => {
                if (!cancelled) dispatch(setUser(currentUser));
            })
            .catch(() => {
                if (!cancelled) dispatch(clearUser());
            })
            .finally(() => {
                if (!cancelled) dispatch(setHydrated(true));
            });

        return () => {
            cancelled = true;
        };
    }, [dispatch, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;

        const isAuthPage =
            pathname === "/login" || pathname.startsWith("/register");
        const isDashboardPage = pathname.startsWith("/dashboard");

        if (isDashboardPage && !user) {
            router.replace("/login");
            return;
        }

        if (isAuthPage && user) {
            router.replace(user.is_teacher ? "/dashboard/tutor" : "/dashboard/student");
        }
    }, [isHydrated, pathname, router, user]);

    return <>{children}</>;
}