import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/Header";
import { Suspense } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "BuildInvest",
    description: "Inversiones en proyectos inmobiliarios sin complicaciones.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
            >
                <SidebarProvider defaultOpen={true}>
                    <Suspense>
                        <Header />
                    </Suspense>
                    <AppSidebar />
                    <SidebarInset>{children}</SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    );
}
