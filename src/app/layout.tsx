import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/providers/app-providers";

export const metadata: Metadata = {
    title: "Learn English",
    description: "English learning platform",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fa" dir="rtl" suppressHydrationWarning>
        <body>
        <AppProviders>{children}</AppProviders>
        </body>
        </html>
    );
}