import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";

export const metadata: Metadata = {
  title: "Hydranode Admin Panel Authentication",
  description: "Welcome to HydraNode Admin Panel Authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("anatialised", GeistSans.variable)}
      suppressHydrationWarning
    >
      <body>
        <main className="">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
