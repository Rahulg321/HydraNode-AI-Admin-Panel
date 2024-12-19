import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import "../globals.css";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ViewTransitions } from "next-view-transitions";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "HydraNode Admin Panel",
  description: "Welcome to HydraNode Admin Panel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          GeistSans.className
        )}
      >
        <SessionProvider>
          <TooltipProvider>
            <main className="">
              <Header session={session} />
              {children}
            </main>
          </TooltipProvider>
        </SessionProvider>

        <Toaster />
      </body>
    </html>
  );
}
