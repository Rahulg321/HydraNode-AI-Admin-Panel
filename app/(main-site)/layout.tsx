import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import "../globals.css";
import Header from "@/components/Header";
import { auth } from "@/auth";

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
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          GeistSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-8 right-6">
            <ModeToggle />
          </div>
          <Header session={session} />
          <main className="container">{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
