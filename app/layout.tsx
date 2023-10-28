import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import { NavBar } from "@/components/layout/nav-bar";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-muted md:p-5`}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
