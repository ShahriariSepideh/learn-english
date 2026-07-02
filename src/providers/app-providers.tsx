"use client";

import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/query-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthBootstrap } from "@/components/auth/auth-bootstrap";
import { usePathname } from "next/navigation";

export function AppProviders({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isAuthRoute =
        pathname.startsWith("/login") ||
        pathname.startsWith("/register");

    const isPublicRoute =
        pathname === "/" ||
        pathname.startsWith("/courses") ||
        pathname.startsWith("/blog") ||
        pathname.startsWith("/tutors");

    const shouldRunAuth = !isPublicRoute && !isAuthRoute;

    return (
        <ReduxProvider>
            <QueryProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {shouldRunAuth ? (
                        <AuthBootstrap>{children}</AuthBootstrap>
                    ) : (
                        children
                    )}

                    <Toaster richColors position="top-center" />
                </ThemeProvider>
            </QueryProvider>
        </ReduxProvider>
    );
}