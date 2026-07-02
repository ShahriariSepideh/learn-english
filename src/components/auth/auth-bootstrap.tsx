"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "@/services/auth.service";
import { clearUser, setHydrated, setUser } from "@/store/slices/auth-slice";
import type { RootState } from "@/store";

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const { user, isHydrated } = useSelector(
        (state: RootState) => state.auth
    );

    const ran = useRef(false);

    useEffect(() => {
        if (ran.current) return;
        ran.current = true;

        authService
            .me()
            .then((u) => dispatch(setUser(u)))
            .catch(() => dispatch(clearUser()))
            .finally(() => dispatch(setHydrated(true)));
    }, [dispatch]);

    useEffect(() => {
        if (!isHydrated) return;

        const isPublic =
            pathname === "/" ||
            pathname.startsWith("/courses") ||
            pathname.startsWith("/blog") ||
            pathname.startsWith("/tutors") ||
            pathname.startsWith("/login") ||
            pathname.startsWith("/register");

        const isDashboard = pathname.startsWith("/dashboard");

        if (isDashboard && !user) {
            router.replace("/login");
            return;
        }

        if ((pathname === "/login" || pathname.startsWith("/register")) && user) {
            router.replace(
                user.is_teacher
                    ? "/dashboard/tutor"
                    : "/dashboard/student"
            );
        }
    }, [isHydrated, pathname, user, router]);

    return <>{children}</>;
}