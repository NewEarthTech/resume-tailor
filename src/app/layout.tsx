import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Tailor",
  description: "Build a resume with your whole history",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${inter.className} flex min-h-screen flex-col items-center justify-center bg-background text-foreground`}
        >
          {children}
          <Toaster />
          <Analytics />
        </body>
      </Providers>
    </html>
  );
}
