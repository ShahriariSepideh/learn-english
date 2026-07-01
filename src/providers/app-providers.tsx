"use client";

import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/query-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthBootstrap } from "@/components/auth/auth-bootstrap";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <QueryProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthBootstrap>
                        {children}
                        <Toaster richColors position="top-center" />
                    </AuthBootstrap>
                </ThemeProvider>
            </QueryProvider>
        </ReduxProvider>
    );
}