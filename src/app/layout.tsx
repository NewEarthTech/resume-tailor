import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono, GeistSans } from "geist/font";

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/toaster";

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
      <ClerkProvider>
        <body
          // className={`${inter.className} flex min-h-screen flex-col items-center justify-center bg-background text-foreground`}
          className={`${inter.className} ${GeistSans.variable} ${GeistMono.variable}`}
        >
          {children}
          <Toaster />
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
